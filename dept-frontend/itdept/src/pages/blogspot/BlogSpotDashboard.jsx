import { motion } from 'framer-motion';
import EmptyState from './EmptyState';

export default function BlogSpotDashboard({
    displayName,
    stats,
    recentBlogs,
    trendingBlogs,
    setActiveView,
    theme = 'light',
}) {
    const isDark = theme === 'dark';

    const panelClass = isDark
        ? 'border-orange-400/30 bg-slate-900/70 text-slate-100'
        : 'border-slate-200 bg-white/95 text-slate-900';

    const tileClass = isDark
        ? 'border-orange-400/30 bg-slate-900/80 text-slate-100'
        : 'border-slate-200 bg-white text-slate-900';

    return (
        <div className="grid gap-4">
            <motion.section
                className={`rounded-2xl border p-4 shadow-sm ${panelClass}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
            >
                <h2 className="text-xl font-bold">Welcome, {displayName}</h2>
                <p className={`mt-1 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Your posting activity and shortcuts are available here.
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className={`rounded-xl border p-3 ${tileClass}`}>
                        <p className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>Total Blogs</p>
                        <strong className="mt-1 block text-2xl font-extrabold">{stats.totalBlogsCreated || 0}</strong>
                    </div>
                    <div className={`rounded-xl border p-3 ${tileClass}`}>
                        <p className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>Likes Received</p>
                        <strong className="mt-1 block text-2xl font-extrabold">{stats.totalLikesReceived || 0}</strong>
                    </div>
                    <div className={`rounded-xl border p-3 ${tileClass}`}>
                        <p className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>Current Streak</p>
                        <strong className="mt-1 block text-2xl font-extrabold">
                            {stats.currentStreak || 0} day{Number(stats.currentStreak) === 1 ? '' : 's'}
                        </strong>
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    <button
                        type="button"
                        className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm font-bold text-orange-50 shadow transition hover:-translate-y-0.5"
                        onClick={() => setActiveView('create')}
                    >
                        Create Blog
                    </button>
                    <button
                        type="button"
                        className={`rounded-xl border px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5 ${isDark ? 'border-slate-600 bg-slate-800 text-slate-100 hover:border-orange-400' : 'border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50'}`}
                        onClick={() => setActiveView('mine')}
                    >
                        View My Blogs
                    </button>
                </div>
            </motion.section>

            <motion.section
                className={`rounded-2xl border p-4 shadow-sm ${panelClass}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
            >
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-xl font-bold">Recent Blogs</h2>
                    <button
                        type="button"
                        onClick={() => setActiveView('all')}
                        className="rounded-full border border-orange-300 bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700 transition hover:-translate-y-0.5 hover:bg-orange-100"
                    >
                        See more blogs
                    </button>
                </div>

                {recentBlogs.length === 0 ? <EmptyState text="No blogs posted yet." theme={theme} /> : null}
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                    {recentBlogs.map((blog, index) => (
                        <motion.article
                            key={`recent-${blog.id}`}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.28, delay: 0.08 * index }}
                            className={`rounded-2xl border p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md ${isDark ? 'border-slate-700 bg-slate-900/70' : 'border-slate-200 bg-white/90'}`}
                        >
                            <div className="mb-2 flex items-start justify-between gap-2">
                                <h3 className={`line-clamp-1 text-base font-bold ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{blog.title}</h3>
                                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${isDark ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-600'}`}>
                                    {blog.status || 'PENDING'}
                                </span>
                            </div>
                            <p className={`mb-2 text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                                {blog.authorName || 'Unknown'} • {blog.date || '-'}
                            </p>
                            <p className={`line-clamp-3 text-sm leading-6 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{blog.content || ''}</p>
                            <div className="mt-3 flex items-center justify-between">
                                <button
                                    type="button"
                                    className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition ${isDark ? 'border-slate-600 text-slate-100 hover:border-orange-400' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                                    onClick={() => setActiveView('mine')}
                                >
                                    Open My Blogs
                                </button>
                                <span className="text-sm font-semibold text-orange-600">Like {blog.likesCount || 0}</span>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </motion.section>

            <motion.section
                className={`rounded-2xl border p-4 shadow-sm ${panelClass}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.14 }}
            >
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-xl font-bold">Trending Blogs</h2>
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-700">
                        Top 3 by Likes
                    </span>
                </div>

                {trendingBlogs.length === 0 ? <EmptyState text="No blogs in feed yet." theme={theme} /> : null}
                <div className="mt-3 grid gap-3">
                    {trendingBlogs.map((blog, index) => (
                        <motion.article
                            key={`trend-${blog.id}`}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.32, delay: 0.09 * index }}
                            className={`group rounded-2xl border p-4 transition duration-300 hover:shadow-md ${isDark ? 'border-orange-400/30 bg-slate-900/80 hover:border-orange-400/70' : 'border-orange-200/60 bg-gradient-to-r from-orange-50 to-white hover:border-orange-300'}`}
                        >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <h3 className={`line-clamp-1 text-base font-bold ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{blog.title}</h3>
                                <div className="flex items-center gap-2">
                                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${isDark ? 'bg-slate-700 text-slate-200' : 'bg-white text-slate-600 ring-1 ring-orange-200'}`}>
                                        #{index + 1}
                                    </span>
                                    <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-700">
                                        Like {blog.likesCount || 0}
                                    </span>
                                </div>
                            </div>
                            <p className={`mt-2 line-clamp-2 text-sm leading-6 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{blog.content || ''}</p>
                            <div className={`mt-3 flex items-center gap-2 text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                                <span>{blog.authorName || 'Unknown'}</span>
                                <span>•</span>
                                <span>{blog.date || '-'}</span>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </motion.section>
        </div>
    );
}
