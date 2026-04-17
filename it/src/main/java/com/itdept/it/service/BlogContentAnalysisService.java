package com.itdept.it.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.itdept.it.dto.BlogContentAnalysisResponse;
import com.itdept.it.model.Blog;
import com.itdept.it.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.OffsetDateTime;
import java.time.Instant;
import java.util.Base64;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class BlogContentAnalysisService {

    private static final Pattern WORD_PATTERN = Pattern.compile("[A-Za-z']+");

    private final BlogRepository blogRepository;
    private final ObjectMapper objectMapper;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(8))
            .build();

    @Value("${app.content-analysis.ai-threshold:15}")
    private double aiThreshold;

    @Value("${app.content-analysis.plagiarism-threshold:5}")
    private double plagiarismThreshold;

    @Value("${app.content-analysis.custom-provider-url:}")
    private String customProviderUrl;

    @Value("${app.content-analysis.custom-provider-api-key:}")
    private String customProviderApiKey;

    @Value("${app.content-analysis.copyleaks.enabled:true}")
    private boolean copyleaksEnabled;

    @Value("${app.content-analysis.copyleaks.email:}")
    private String copyleaksEmail;

    @Value("${app.content-analysis.copyleaks.key:}")
    private String copyleaksKey;

    @Value("${app.content-analysis.copyleaks.use-sandbox:false}")
    private boolean copyleaksUseSandbox;

    @Value("${app.content-analysis.minimum-words:40}")
    private int minimumWords;

    private volatile String cachedCopyleaksToken;
    private volatile Instant cachedCopyleaksTokenExpiresAt;

    public BlogContentAnalysisService(BlogRepository blogRepository, ObjectMapper objectMapper) {
        this.blogRepository = blogRepository;
        this.objectMapper = objectMapper;
    }

    public BlogContentAnalysisResponse analyzeContent(String title, String content) {
        String safeTitle = title == null ? "" : title.trim();
        String safeContent = content == null ? "" : content.trim();

        if (safeContent.isBlank()) {
            return blockedResponse(0.0, 0.0, "Content cannot be empty.", "none");
        }

        int wordsCount = extractWords(safeContent).size();
        if (wordsCount < minimumWords) {
            String message = "Write at least " + minimumWords + " words for reliable AI/plagiarism analysis.";
            return blockedResponse(0.0, 0.0, message, "none");
        }

        BlogContentAnalysisResponse fromExternal = analyzeWithCopyleaks(safeTitle, safeContent);
        if (fromExternal != null) {
            return withDecision(fromExternal);
        }

        fromExternal = analyzeWithExternalProvider(safeTitle, safeContent);
        if (fromExternal != null) {
            return withDecision(fromExternal);
        }

        double aiPercent = round2(calculateAiLikelihoodHeuristic(safeContent));
        double plagiarismPercent = round2(calculatePlagiarismHeuristic(safeTitle, safeContent));
        double humanPercent = round2(Math.max(0, 100 - aiPercent));

        return withDecision(new BlogContentAnalysisResponse(
                aiPercent,
                plagiarismPercent,
                humanPercent,
                false,
                aiThreshold,
                plagiarismThreshold,
                "heuristic",
                ""
        ));
    }

    public boolean isPublishAllowed(BlogContentAnalysisResponse response) {
        return response != null
                && response.getAiContentPercent() <= aiThreshold
                && response.getPlagiarismPercent() <= plagiarismThreshold;
    }

    private BlogContentAnalysisResponse analyzeWithExternalProvider(String title, String content) {
        if (customProviderUrl == null || customProviderUrl.isBlank()) {
            return null;
        }

        try {
            Map<String, Object> payload = new HashMap<>();
            payload.put("title", title);
            payload.put("content", content);

            HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                    .uri(URI.create(customProviderUrl))
                    .timeout(Duration.ofSeconds(12))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(payload)));

            if (customProviderApiKey != null && !customProviderApiKey.isBlank()) {
                requestBuilder.header("x-api-key", customProviderApiKey);
                requestBuilder.header("Authorization", "Bearer " + customProviderApiKey);
            }

            HttpResponse<String> response = httpClient.send(requestBuilder.build(), HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() < 200 || response.statusCode() > 299 || response.body() == null || response.body().isBlank()) {
                return null;
            }

            Map<String, Object> body = objectMapper.readValue(response.body(), new TypeReference<>() {
            });

            double aiPercent = toPercent(extractScore(body,
                    "aiContentPercent", "ai_percent", "aiScore", "ai_score", "aiProbability", "ai_probability"));
            double plagiarismPercent = toPercent(extractScore(body,
                    "plagiarismPercent", "plagiarism_percent", "plagiarismScore", "plagiarism_score", "copiedPercent", "copied_percent"));
            double humanPercent = toPercent(extractScore(body,
                    "humanContentPercent", "human_percent", "humanScore", "human_score", "originality_percent"));

            if (humanPercent < 0) {
                humanPercent = Math.max(0, 100 - aiPercent);
            }

            return new BlogContentAnalysisResponse(
                    round2(aiPercent),
                    round2(plagiarismPercent),
                    round2(humanPercent),
                    false,
                    aiThreshold,
                    plagiarismThreshold,
                    "external",
                    ""
            );
        } catch (IOException | InterruptedException ignored) {
            return null;
        }
    }

    private BlogContentAnalysisResponse analyzeWithCopyleaks(String title, String content) {
        if (!copyleaksEnabled || isBlank(copyleaksEmail) || isBlank(copyleaksKey)) {
            return null;
        }

        try {
            String token = getCopyleaksToken();
            if (isBlank(token)) {
                return null;
            }

            double aiPercent = fetchCopyleaksAiPercent(token, content);
            double plagiarismPercent = fetchCopyleaksPlagiarismPercent(token, title, content);

            if (aiPercent < 0 && plagiarismPercent < 0) {
                return null;
            }

            if (aiPercent < 0) {
                aiPercent = calculateAiLikelihoodHeuristic(content);
            }

            if (plagiarismPercent < 0) {
                plagiarismPercent = calculatePlagiarismHeuristic(title, content);
            }

            double humanPercent = Math.max(0, 100 - aiPercent);
            return new BlogContentAnalysisResponse(
                    round2(aiPercent),
                    round2(plagiarismPercent),
                    round2(humanPercent),
                    false,
                    aiThreshold,
                    plagiarismThreshold,
                    "copyleaks",
                    ""
            );
        } catch (IOException | InterruptedException ignored) {
            return null;
        }
    }

    private synchronized String getCopyleaksToken() throws IOException, InterruptedException {
        if (!isBlank(cachedCopyleaksToken) && cachedCopyleaksTokenExpiresAt != null
                && Instant.now().isBefore(cachedCopyleaksTokenExpiresAt.minusSeconds(90))) {
            return cachedCopyleaksToken;
        }

        Map<String, Object> body = new HashMap<>();
        body.put("email", copyleaksEmail);
        body.put("key", copyleaksKey);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://id.copyleaks.com/v3/account/login/api"))
                .timeout(Duration.ofSeconds(15))
                .header("Content-Type", "application/json")
                .header("Accept", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(body)))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() < 200 || response.statusCode() > 299 || isBlank(response.body())) {
            return null;
        }

        Map<String, Object> payload = objectMapper.readValue(response.body(), new TypeReference<>() {
        });

        String token = stringValue(payload.get("access_token"));
        if (isBlank(token)) {
            return null;
        }

        String expiresAt = stringValue(payload.get(".expires"));
        Instant parsedExpiry = null;
        if (!isBlank(expiresAt)) {
            try {
                parsedExpiry = OffsetDateTime.parse(expiresAt).toInstant();
            } catch (RuntimeException ignored) {
                parsedExpiry = null;
            }
        }

        cachedCopyleaksToken = token;
        cachedCopyleaksTokenExpiresAt = parsedExpiry != null ? parsedExpiry : Instant.now().plus(Duration.ofHours(46));
        return token;
    }

    private double fetchCopyleaksAiPercent(String token, String content) throws IOException, InterruptedException {
        String normalizedContent = content == null ? "" : content.trim();
        if (normalizedContent.length() < 255) {
            return -1;
        }

        Map<String, Object> body = new HashMap<>();
        body.put("text", normalizedContent.length() > 25000 ? normalizedContent.substring(0, 25000) : normalizedContent);
        body.put("sandbox", copyleaksUseSandbox);
        body.put("sensitivity", 2);

        String scanId = createScanId("ai");
        String endpoint = "https://api.copyleaks.com/v2/writer-detector/" + scanId + "/check";

        Map<String, Object> payload = postJsonForMap(endpoint, token, body);
        if (payload == null || payload.isEmpty()) {
            return -1;
        }

        double directAi = toPercent(extractScore(payload,
                "ai", "aiScore", "ai_score", "aiProbability", "averageAiProbability", "average_ai_probability"));
        if (directAi >= 0) {
            return clamp(directAi, 0, 100);
        }

        Object summaryObj = payload.get("summary");
        if (summaryObj instanceof Map<?, ?> summaryRaw) {
            Map<String, Object> summary = castToStringObjectMap(summaryRaw);
            double summaryAi = toPercent(extractScore(summary,
                    "ai", "aiScore", "ai_score", "aiProbability", "averageAiProbability", "average_ai_probability"));
            if (summaryAi >= 0) {
                return clamp(summaryAi, 0, 100);
            }
        }

        Object resultsObj = payload.get("results");
        if (resultsObj instanceof List<?> results && !results.isEmpty()) {
            double bestAiConfidence = -1;
            double bestHumanConfidence = -1;

            for (Object resultItem : results) {
                if (!(resultItem instanceof Map<?, ?> rawMap)) {
                    continue;
                }

                Map<String, Object> row = castToStringObjectMap(rawMap);
                double probability = extractScore(row, "probability", "score", "confidence");
                if (probability > 1) {
                    probability = probability / 100.0;
                }

                int classification = toInt(row.get("classification"));
                if (classification == 2) {
                    bestAiConfidence = Math.max(bestAiConfidence, probability);
                }
                if (classification == 1) {
                    bestHumanConfidence = Math.max(bestHumanConfidence, probability);
                }
            }

            if (bestAiConfidence >= 0) {
                return clamp(bestAiConfidence * 100.0, 0, 100);
            }
            if (bestHumanConfidence >= 0) {
                return clamp((1 - bestHumanConfidence) * 100.0, 0, 100);
            }
        }

        return -1;
    }

    private double fetchCopyleaksPlagiarismPercent(String token, String title, String content) throws IOException, InterruptedException {
        String scanId = createScanId("pl");
        String endpoint = "https://api.copyleaks.com/v3/scans/submit/file/" + scanId;
        String textToSubmit = (title == null ? "" : title.trim()) + "\n\n" + (content == null ? "" : content.trim());

        Map<String, Object> properties = new HashMap<>();
        properties.put("sandbox", copyleaksUseSandbox);

        Map<String, Object> body = new HashMap<>();
        body.put("base64", Base64.getEncoder().encodeToString(textToSubmit.getBytes(StandardCharsets.UTF_8)));
        body.put("filename", "blog-content.txt");
        body.put("properties", properties);

        Map<String, Object> payload = putJsonForMap(endpoint, token, body);
        if (payload == null || payload.isEmpty()) {
            return -1;
        }

        double plagiarism = toPercent(extractScore(payload,
                "plagiarismPercent", "plagiarism_score", "plagiarismScore", "copiedPercent", "copied_percent"));
        if (plagiarism >= 0) {
            return clamp(plagiarism, 0, 100);
        }

        Object resultsObj = payload.get("results");
        if (resultsObj instanceof Map<?, ?> rawResults) {
            Map<String, Object> results = castToStringObjectMap(rawResults);
            double resultsScore = toPercent(extractScore(results,
                    "score", "plagiarism", "plagiarismScore", "identicalWords", "identical_words", "internet"));
            if (resultsScore >= 0) {
                return clamp(resultsScore, 0, 100);
            }
        }

        return -1;
    }

    private Map<String, Object> postJsonForMap(String url, String token, Map<String, Object> body) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .timeout(Duration.ofSeconds(20))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + token)
                .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(body)))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() < 200 || response.statusCode() > 299 || isBlank(response.body())) {
            return null;
        }
        return objectMapper.readValue(response.body(), new TypeReference<>() {
        });
    }

    private Map<String, Object> putJsonForMap(String url, String token, Map<String, Object> body) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .timeout(Duration.ofSeconds(20))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + token)
                .PUT(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(body)))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() < 200 || response.statusCode() > 299 || isBlank(response.body())) {
            return null;
        }
        return objectMapper.readValue(response.body(), new TypeReference<>() {
        });
    }

    private static String createScanId(String prefix) {
        String compactUuid = UUID.randomUUID().toString().replace("-", "");
        return (prefix + compactUuid).toLowerCase(Locale.ROOT);
    }

    private static String stringValue(Object value) {
        return value == null ? "" : String.valueOf(value).trim();
    }

    private static boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

    private static int toInt(Object value) {
        if (value instanceof Number number) {
            return number.intValue();
        }
        if (value instanceof String text) {
            try {
                return Integer.parseInt(text.trim());
            } catch (NumberFormatException ignored) {
                return -1;
            }
        }
        return -1;
    }

    private static Map<String, Object> castToStringObjectMap(Map<?, ?> source) {
        Map<String, Object> result = new HashMap<>();
        for (Map.Entry<?, ?> entry : source.entrySet()) {
            if (entry.getKey() != null) {
                result.put(String.valueOf(entry.getKey()), entry.getValue());
            }
        }
        return result;
    }

    private double calculateAiLikelihoodHeuristic(String content) {
        List<String> words = extractWords(content);
        if (words.isEmpty()) {
            return 0;
        }

        Set<String> unique = new HashSet<>(words);
        double lexicalDiversity = unique.size() / (double) words.size();

        List<Integer> sentenceLengths = extractSentenceLengths(content);
        double avgSentenceLength = sentenceLengths.stream().mapToInt(Integer::intValue).average().orElse(0);
        double sentenceStdDev = stdDev(sentenceLengths, avgSentenceLength);
        double burstiness = avgSentenceLength > 0 ? sentenceStdDev / avgSentenceLength : 0;

        double repetitionRatio = 1 - lexicalDiversity;
        double transitionDensity = countTransitionPhrases(content) / Math.max(1.0, words.size());
        double punctuationDensity = countChars(content, ',', ';', ':') / Math.max(1.0, words.size());

        double score = 0;
        score += clamp((0.52 - lexicalDiversity) * 140, 0, 34);
        score += clamp((0.70 - burstiness) * 42, 0, 22);
        score += clamp((repetitionRatio - 0.12) * 120, 0, 20);
        score += clamp((transitionDensity - 0.016) * 850, 0, 16);
        score += clamp((0.03 - punctuationDensity) * 420, 0, 8);

        if (avgSentenceLength >= 16 && avgSentenceLength <= 24 && burstiness < 0.45) {
            score += 7;
        }
        if (lexicalDiversity > 0.72) {
            score -= 10;
        }

        return clamp(score, 2, 98);
    }

    private double calculatePlagiarismHeuristic(String title, String content) {
        Set<String> draftShingles = shingles(extractWords(title + " " + content), 4);
        if (draftShingles.isEmpty()) {
            return 0;
        }

        double maxSimilarity = 0;
        double secondarySimilarity = 0;

        for (Blog existing : blogRepository.findAll()) {
            String existingText = (existing.getTitle() == null ? "" : existing.getTitle())
                    + " "
                    + (existing.getContent() == null ? "" : existing.getContent());

            Set<String> existingShingles = shingles(extractWords(existingText), 4);
            if (existingShingles.isEmpty()) {
                continue;
            }

            double similarity = jaccard(draftShingles, existingShingles);
            if (similarity > maxSimilarity) {
                secondarySimilarity = maxSimilarity;
                maxSimilarity = similarity;
            } else if (similarity > secondarySimilarity) {
                secondarySimilarity = similarity;
            }
        }

        double weightedSimilarity = (maxSimilarity * 0.8) + (secondarySimilarity * 0.2);
        return clamp(weightedSimilarity * 100, 0, 100);
    }

    private BlogContentAnalysisResponse withDecision(BlogContentAnalysisResponse response) {
        boolean allowed = isPublishAllowed(response);
        response.setPublishAllowed(allowed);
        response.setMaxAllowedAiPercent(aiThreshold);
        response.setMaxAllowedPlagiarismPercent(plagiarismThreshold);

        if (allowed) {
            response.setMessage("Ready to publish. AI and plagiarism are within allowed limits.");
        } else {
            response.setMessage(
                    "Publishing blocked: AI content must be <= " + round2(aiThreshold)
                    + "% and plagiarism must be <= " + round2(plagiarismThreshold) + "%."
            );
        }

        return response;
    }

    private BlogContentAnalysisResponse blockedResponse(double aiPercent, double plagiarismPercent, String message, String provider) {
        return new BlogContentAnalysisResponse(
                round2(aiPercent),
                round2(plagiarismPercent),
                round2(Math.max(0, 100 - aiPercent)),
                false,
                aiThreshold,
                plagiarismThreshold,
                provider,
                message
        );
    }

    private static double extractScore(Map<String, Object> source, String... keys) {
        for (String key : keys) {
            if (source.containsKey(key)) {
                Object value = source.get(key);
                if (value instanceof Number number) {
                    return number.doubleValue();
                }
                if (value instanceof String text) {
                    try {
                        return Double.parseDouble(text.trim());
                    } catch (NumberFormatException ignored) {
                        return -1;
                    }
                }
            }
        }
        return -1;
    }

    private static double toPercent(double value) {
        if (value < 0) {
            return value;
        }
        if (value <= 1) {
            return value * 100;
        }
        return value;
    }

    private static List<String> extractWords(String text) {
        List<String> words = new ArrayList<>();
        Matcher matcher = WORD_PATTERN.matcher(text.toLowerCase(Locale.ROOT));
        while (matcher.find()) {
            words.add(matcher.group());
        }
        return words;
    }

    private static List<Integer> extractSentenceLengths(String text) {
        String[] rawSentences = text.split("[.!?]+");
        List<Integer> lengths = new ArrayList<>();
        for (String sentence : rawSentences) {
            int size = extractWords(sentence).size();
            if (size > 0) {
                lengths.add(size);
            }
        }

        if (lengths.isEmpty()) {
            lengths.add(extractWords(text).size());
        }

        return lengths;
    }

    private static Set<String> shingles(List<String> words, int n) {
        Set<String> result = new HashSet<>();
        if (words.size() < n) {
            return result;
        }

        for (int i = 0; i <= words.size() - n; i++) {
            result.add(String.join(" ", words.subList(i, i + n)));
        }
        return result;
    }

    private static double jaccard(Set<String> a, Set<String> b) {
        if (a.isEmpty() || b.isEmpty()) {
            return 0;
        }

        int intersection = 0;
        for (String token : a) {
            if (b.contains(token)) {
                intersection++;
            }
        }

        int union = a.size() + b.size() - intersection;
        return union == 0 ? 0 : (double) intersection / union;
    }

    private static double stdDev(List<Integer> numbers, double mean) {
        if (numbers.isEmpty()) {
            return 0;
        }

        double variance = 0;
        for (int value : numbers) {
            double delta = value - mean;
            variance += delta * delta;
        }
        return Math.sqrt(variance / numbers.size());
    }

    private static int countTransitionPhrases(String text) {
        String normalized = text.toLowerCase(Locale.ROOT);
        String[] transitions = {
            "in conclusion",
            "in summary",
            "moreover",
            "furthermore",
            "additionally",
            "therefore",
            "thus",
            "overall",
            "it is important to note"
        };

        int count = 0;
        for (String token : transitions) {
            if (normalized.contains(token)) {
                count++;
            }
        }
        return count;
    }

    private static int countChars(String text, char... chars) {
        int count = 0;
        for (char current : text.toCharArray()) {
            for (char target : chars) {
                if (current == target) {
                    count++;
                    break;
                }
            }
        }
        return count;
    }

    private static double clamp(double value, double min, double max) {
        return Math.max(min, Math.min(max, value));
    }

    private static double round2(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}
