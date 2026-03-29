import { Activity, Eye, Flame, Heart, Sparkles, Target, TrendingUp } from 'lucide-react';

export default function Stats({ stats, theme = 'light' }) {
    const isDark = theme === 'dark';

    const totalBlogs = Number(stats.totalBlogsCreated || 0);
    const likesReceived = Number(stats.totalLikesReceived || 0);
    const likesGiven = Number(stats.totalLikesGiven || 0);
    const currentStreak = Number(stats.currentStreak || 0);
    const longestStreak = Number(stats.longestStreak || 0);
    const totalViews = stats.totalViews ?? 'N/A';
    const avgLikes = Number(stats.averageLikesPerBlog || 0);

    const engagementScore = Math.min(
        100,
        Math.round(totalBlogs * 6 + likesReceived * 1.5 + likesGiven * 1.1 + currentStreak * 4),
    );
    const consistencyScore = Math.min(100, Math.round((currentStreak / Math.max(longestStreak || 1, 1)) * 100));
    const targetBlogs = 20;
    const targetProgress = Math.min(100, Math.round((totalBlogs / targetBlogs) * 100));
    const avgLikesFormatted = avgLikes.toFixed(2);

    const shellClass = isDark
        ? 'border-orange-400/30 bg-slate-900/75 text-slate-100'
        : 'border-slate-200 bg-white/95 text-slate-900';

    const cardClass = isDark
        ? 'border-slate-600 bg-slate-900/85'
        : 'border-slate-200 bg-white';

    const mutedText = isDark ? 'text-slate-300' : 'text-slate-600';
    const softText = isDark ? 'text-slate-400' : 'text-slate-500';

    const kpiCards = [
        {
            label: 'Blogs Created',
            value: totalBlogs,
            icon: Sparkles,
            tint: isDark ? 'from-cyan-500/20 to-blue-500/20 border-cyan-400/40' : 'from-cyan-50 to-blue-50 border-cyan-200',
        },
        {
            label: 'Likes Received',
            value: likesReceived,
            icon: Heart,
            tint: isDark ? 'from-rose-500/20 to-orange-500/20 border-rose-400/40' : 'from-rose-50 to-orange-50 border-rose-200',
        },
        {
            label: 'Likes Given',
            value: likesGiven,
            icon: Activity,
            tint: isDark ? 'from-emerald-500/20 to-teal-500/20 border-emerald-400/40' : 'from-emerald-50 to-teal-50 border-emerald-200',
        },
        {
            label: 'Total Views',
            value: totalViews,
            icon: Eye,
            tint: isDark ? 'from-violet-500/20 to-indigo-500/20 border-violet-400/40' : 'from-violet-50 to-indigo-50 border-violet-200',
        },
    ];

    return (
        <section className={`relative min-h-[calc(100vh-170px)] overflow-hidden rounded-2xl border p-5 shadow-xl md:p-6 ${shellClass}`}>
            <div className="pointer-events-none absolute inset-0">
                <div className={`absolute -top-14 -left-10 h-40 w-40 rounded-full blur-3xl ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-300/30'} motion-safe:animate-pulse`} />
                <div className={`absolute right-8 top-8 h-28 w-28 rounded-full blur-2xl ${isDark ? 'bg-orange-400/20' : 'bg-orange-300/30'} motion-safe:animate-[ping_3.5s_ease-in-out_infinite]`} />
            </div>

            <div className="relative z-10 space-y-5">
                <header className={`rounded-2xl border p-5 md:p-6 ${cardClass}`}>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <p className={`text-xs font-extrabold uppercase tracking-[0.14em] ${isDark ? 'text-orange-300' : 'text-orange-600'}`}>
                                Performance Center
                            </p>
                            <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">Stats Overview</h2>
                            <p className={`mt-2 max-w-2xl text-sm md:text-base ${mutedText}`}>
                                Full activity intelligence for your writing journey, including reach, streak momentum, and engagement depth.
                            </p>
                        </div>

                        <div className={`rounded-2xl border px-4 py-3 ${isDark ? 'border-orange-400/40 bg-orange-500/15' : 'border-orange-300 bg-orange-50'}`}>
                            <p className={`text-xs font-bold uppercase tracking-wide ${softText}`}>Engagement Score</p>
                            <p className="mt-1 text-3xl font-extrabold">{engagementScore}%</p>
                        </div>
                    </div>
                </header>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {kpiCards.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <article
                                key={item.label}
                                className={`rounded-2xl border bg-gradient-to-br p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${item.tint}`}
                                style={{ animationDelay: `${index * 90}ms` }}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <p className={`text-xs font-bold uppercase tracking-wide ${softText}`}>{item.label}</p>
                                    <Icon size={18} className={isDark ? 'text-slate-200' : 'text-slate-700'} />
                                </div>
                                <p className="mt-4 text-3xl font-extrabold leading-none md:text-4xl">{item.value}</p>
                            </article>
                        );
                    })}
                </div>

                <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
                    <article className={`rounded-2xl border p-5 ${cardClass}`}>
                        <div className="flex items-center gap-2">
                            <TrendingUp size={18} className={isDark ? 'text-emerald-300' : 'text-emerald-700'} />
                            <h3 className="text-lg font-bold">Growth and Consistency</h3>
                        </div>

                        <div className="mt-5 space-y-5">
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <p className={`text-sm font-semibold ${mutedText}`}>Blog Target Progress ({totalBlogs}/{targetBlogs})</p>
                                    <p className="text-sm font-extrabold">{targetProgress}%</p>
                                </div>
                                <div className={`h-3 w-full rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-700"
                                        style={{ width: `${targetProgress}%` }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <p className={`text-sm font-semibold ${mutedText}`}>Consistency Score</p>
                                    <p className="text-sm font-extrabold">{consistencyScore}%</p>
                                </div>
                                <div className={`h-3 w-full rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700"
                                        style={{ width: `${consistencyScore}%` }}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                <div className={`rounded-xl border p-3 ${isDark ? 'border-slate-600 bg-slate-800/80' : 'border-slate-200 bg-slate-50'}`}>
                                    <p className={`text-xs font-bold uppercase tracking-wide ${softText}`}>Current Streak</p>
                                    <p className="mt-1 text-2xl font-extrabold">{currentStreak} days</p>
                                </div>
                                <div className={`rounded-xl border p-3 ${isDark ? 'border-slate-600 bg-slate-800/80' : 'border-slate-200 bg-slate-50'}`}>
                                    <p className={`text-xs font-bold uppercase tracking-wide ${softText}`}>Longest Streak</p>
                                    <p className="mt-1 text-2xl font-extrabold">{longestStreak} days</p>
                                </div>
                                <div className={`rounded-xl border p-3 ${isDark ? 'border-slate-600 bg-slate-800/80' : 'border-slate-200 bg-slate-50'}`}>
                                    <p className={`text-xs font-bold uppercase tracking-wide ${softText}`}>Avg Likes/Blog</p>
                                    <p className="mt-1 text-2xl font-extrabold">{avgLikesFormatted}</p>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className={`rounded-2xl border p-5 ${cardClass}`}>
                        <div className="flex items-center gap-2">
                            <Target size={18} className={isDark ? 'text-orange-300' : 'text-orange-700'} />
                            <h3 className="text-lg font-bold">Insight Highlights</h3>
                        </div>

                        <div className="mt-4 space-y-3">
                            <div className={`rounded-xl border p-3 ${isDark ? 'border-slate-600 bg-slate-800/75' : 'border-slate-200 bg-slate-50'}`}>
                                <p className={`text-xs font-bold uppercase tracking-wide ${softText}`}>Momentum</p>
                                <p className={`mt-1 text-sm leading-6 ${mutedText}`}>
                                    {currentStreak >= 5
                                        ? 'Excellent momentum. Keep posting to convert this streak into long-term audience growth.'
                                        : 'Post consistently for a few more days to build stronger visibility and engagement momentum.'}
                                </p>
                            </div>

                            <div className={`rounded-xl border p-3 ${isDark ? 'border-slate-600 bg-slate-800/75' : 'border-slate-200 bg-slate-50'}`}>
                                <p className={`text-xs font-bold uppercase tracking-wide ${softText}`}>Engagement Quality</p>
                                <p className={`mt-1 text-sm leading-6 ${mutedText}`}>
                                    {avgLikes >= 5
                                        ? 'Your audience responds well to your content. Consider expanding into deeper topic series.'
                                        : 'Try sharper titles, stronger opening paragraphs, and clear calls-to-action to increase reactions.'}
                                </p>
                            </div>

                            <div className={`rounded-xl border p-3 ${isDark ? 'border-slate-600 bg-slate-800/75' : 'border-slate-200 bg-slate-50'}`}>
                                <div className="flex items-center gap-2">
                                    <Flame size={16} className={isDark ? 'text-amber-300' : 'text-amber-600'} />
                                    <p className="text-sm font-bold">Next Goal</p>
                                </div>
                                <p className={`mt-1 text-sm leading-6 ${mutedText}`}>
                                    Reach {Math.max(0, targetBlogs - totalBlogs)} more blog{Math.max(0, targetBlogs - totalBlogs) === 1 ? '' : 's'} to hit your monthly content benchmark.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
