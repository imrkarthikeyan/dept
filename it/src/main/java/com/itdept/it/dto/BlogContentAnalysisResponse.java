package com.itdept.it.dto;

public class BlogContentAnalysisResponse {

    private double aiContentPercent;
    private double plagiarismPercent;
    private double humanContentPercent;
    private boolean publishAllowed;
    private double maxAllowedAiPercent;
    private double maxAllowedPlagiarismPercent;
    private String provider;
    private String message;

    public BlogContentAnalysisResponse() {
    }

    public BlogContentAnalysisResponse(double aiContentPercent, double plagiarismPercent, double humanContentPercent,
            boolean publishAllowed, double maxAllowedAiPercent,
            double maxAllowedPlagiarismPercent, String provider, String message) {
        this.aiContentPercent = aiContentPercent;
        this.plagiarismPercent = plagiarismPercent;
        this.humanContentPercent = humanContentPercent;
        this.publishAllowed = publishAllowed;
        this.maxAllowedAiPercent = maxAllowedAiPercent;
        this.maxAllowedPlagiarismPercent = maxAllowedPlagiarismPercent;
        this.provider = provider;
        this.message = message;
    }

    public double getAiContentPercent() {
        return aiContentPercent;
    }

    public void setAiContentPercent(double aiContentPercent) {
        this.aiContentPercent = aiContentPercent;
    }

    public double getPlagiarismPercent() {
        return plagiarismPercent;
    }

    public void setPlagiarismPercent(double plagiarismPercent) {
        this.plagiarismPercent = plagiarismPercent;
    }

    public double getHumanContentPercent() {
        return humanContentPercent;
    }

    public void setHumanContentPercent(double humanContentPercent) {
        this.humanContentPercent = humanContentPercent;
    }

    public boolean isPublishAllowed() {
        return publishAllowed;
    }

    public void setPublishAllowed(boolean publishAllowed) {
        this.publishAllowed = publishAllowed;
    }

    public double getMaxAllowedAiPercent() {
        return maxAllowedAiPercent;
    }

    public void setMaxAllowedAiPercent(double maxAllowedAiPercent) {
        this.maxAllowedAiPercent = maxAllowedAiPercent;
    }

    public double getMaxAllowedPlagiarismPercent() {
        return maxAllowedPlagiarismPercent;
    }

    public void setMaxAllowedPlagiarismPercent(double maxAllowedPlagiarismPercent) {
        this.maxAllowedPlagiarismPercent = maxAllowedPlagiarismPercent;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
