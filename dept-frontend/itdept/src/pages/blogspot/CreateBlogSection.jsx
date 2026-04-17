export default function CreateBlogSection({
    title,
    setTitle,
    content,
    setContent,
    posting,
    handlePost,
    analysis,
    analyzing,
    analysisError,
    publishDisabled,
    publishBlockReason,
    minimumWords = 40,
    theme = 'light',
}) {
    const isDark = theme === 'dark';

    const panelClass = isDark
        ? 'border-orange-400/30 bg-slate-900/75 text-slate-100'
        : 'border-slate-200 bg-white/95 text-slate-900';

    const fieldClass = isDark
        ? 'border-slate-600 bg-slate-800/80 text-slate-100 placeholder:text-slate-400 focus:border-orange-400 focus:ring-orange-400/30'
        : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-orange-400 focus:ring-orange-300/40';

    const subtleClass = isDark ? 'text-slate-300' : 'text-slate-600';
    const previewClass = isDark
        ? 'border-slate-700 bg-slate-950/60 text-slate-200'
        : 'border-slate-200 bg-slate-50 text-slate-700';

    const scoreCardClass = isDark
        ? 'border-slate-700 bg-slate-900/70'
        : 'border-slate-200 bg-white/80';

    const wordCount = content.trim() ? content.trim().split(/\s+/).filter(Boolean).length : 0;
    const hasAnalysis = analysis && Number.isFinite(Number(analysis.aiContentPercent));

    function renderMeter(label, value, colorClass) {
        const safeValue = Math.max(0, Math.min(100, Number(value || 0)));

        return (
            <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                    <span className={subtleClass}>{label}</span>
                    <span>{safeValue.toFixed(2)}%</span>
                </div>
                <div className={`h-2 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                    <div
                        className={`h-2 rounded-full transition-all ${colorClass}`}
                        style={{ width: `${safeValue}%` }}
                    />
                </div>
            </div>
        );
    }

    return (
        <section className={`min-h-[calc(100vh-13rem)] rounded-3xl border p-5 shadow-lg ${panelClass}`}>
            <div className="grid h-full gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="flex min-h-0 flex-col">
                    <h2 className="text-2xl font-extrabold tracking-tight">Create Blog</h2>
                    <p className={`mt-1 text-sm ${subtleClass}`}>
                        Write and publish your post to keep your streak alive.
                    </p>

                    <form onSubmit={handlePost} className="mt-5 flex min-h-0 flex-1 flex-col gap-4">
                        <div className="space-y-1.5">
                            <label htmlFor="blogTitle" className={`text-xs font-bold uppercase tracking-wider ${subtleClass}`}>
                                Blog Title
                            </label>
                            <input
                                id="blogTitle"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                placeholder="Give your story a strong title"
                                className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ring-0 transition focus:ring ${fieldClass}`}
                                maxLength={120}
                                required
                            />
                            <p className={`text-right text-xs font-semibold ${subtleClass}`}>{title.length}/120</p>
                        </div>

                        <div className="flex min-h-0 flex-1 flex-col space-y-1.5">
                            <label htmlFor="blogContent" className={`text-xs font-bold uppercase tracking-wider ${subtleClass}`}>
                                Blog Content
                            </label>
                            <textarea
                                id="blogContent"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Share your ideas, lessons, and experience..."
                                className={`min-h-[14rem] flex-1 rounded-xl border px-3 py-2.5 text-sm leading-7 outline-none ring-0 transition focus:ring ${fieldClass}`}
                                required
                            />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <p className={`text-xs font-semibold ${subtleClass}`}>
                                Tip: clear title + readable paragraphs gets more engagement.
                            </p>
                            <button
                                type="submit"
                                className="inline-flex items-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-bold text-orange-50 shadow transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                                disabled={posting || publishDisabled}
                            >
                                {posting ? 'Posting...' : 'Publish Blog'}
                            </button>
                        </div>

                        <div className={`rounded-xl border p-3 text-sm ${scoreCardClass}`}>
                            <div className="flex items-center justify-between gap-3">
                                <p className="font-bold">Live AI & Plagiarism Check</p>
                                <p className={`text-xs font-semibold ${subtleClass}`}>Words: {wordCount}</p>
                            </div>

                            {analyzing ? <p className={`mt-2 text-xs ${subtleClass}`}>Analyzing content...</p> : null}
                            {analysisError ? <p className="mt-2 text-xs font-semibold text-red-500">{analysisError}</p> : null}

                            {hasAnalysis ? (
                                <div className="mt-3 space-y-3">
                                    {renderMeter('AI Content', analysis.aiContentPercent, 'bg-red-500')}
                                    {renderMeter('Plagiarism', analysis.plagiarismPercent, 'bg-amber-500')}
                                    {renderMeter('Human Content', analysis.humanContentPercent, 'bg-emerald-500')}

                                    <p className={`text-xs font-semibold ${analysis.publishAllowed ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {analysis.message}
                                    </p>
                                </div>
                            ) : (
                                <p className={`mt-2 text-xs ${subtleClass}`}>
                                    Write at least {minimumWords} words to calculate AI, plagiarism, and human content scores.
                                </p>
                            )}

                            {publishDisabled && publishBlockReason ? (
                                <p className="mt-2 text-xs font-semibold text-red-500">{publishBlockReason}</p>
                            ) : null}
                        </div>
                    </form>
                </div>

                <aside className={`rounded-2xl border p-4 ${previewClass}`}>
                    <h3 className="text-lg font-bold">Live Preview</h3>
                    <p className={`mt-1 text-xs font-semibold uppercase tracking-wider ${subtleClass}`}>
                        This is how your post card starts looking
                    </p>

                    <div className={`mt-4 rounded-2xl border p-4 ${isDark ? 'border-slate-700 bg-slate-900/80' : 'border-slate-200 bg-white'}`}>
                        <h4 className="text-base font-extrabold">{title.trim() || 'Your blog title appears here'}</h4>
                        <p className={`mt-2 whitespace-pre-wrap text-sm leading-7 ${subtleClass}`}>
                            {content.trim() || 'Start writing your content to preview paragraph spacing and readability.'}
                        </p>
                    </div>

                    <div className={`mt-4 space-y-2 rounded-xl border p-3 text-sm ${isDark ? 'border-slate-700 bg-slate-900/70' : 'border-slate-200 bg-white/80'}`}>
                        <p className="font-bold">Quick Checklist</p>
                        <p className={subtleClass}>- Use a short and clear title.</p>
                        <p className={subtleClass}>- Break content into small paragraphs.</p>
                        <p className={subtleClass}>- End with a useful takeaway.</p>
                    </div>
                </aside>
            </div>
        </section>
    );
}
