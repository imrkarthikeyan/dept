import { Bookmark, CircleUserRound, Heart, MoreVertical } from 'lucide-react';
import EmptyState from './EmptyState';

export default function MyBlogsSection({ myBlogs, handleLike, likingBlogId, handleSave, savedBlogs, theme = 'light' }) {
    const isDark = theme === 'dark';
    const panelClass = isDark
        ? 'border-orange-400/30 bg-slate-900/70 text-slate-100'
        : 'border-slate-200 bg-white/95 text-slate-900';

    const statusClass = {
        approved: isDark ? 'border-emerald-400/40 bg-emerald-500/20 text-emerald-200' : 'border-emerald-300 bg-emerald-50 text-emerald-700',
        pending: isDark ? 'border-amber-400/40 bg-amber-500/20 text-amber-200' : 'border-amber-300 bg-amber-50 text-amber-700',
        rejected: isDark ? 'border-rose-400/40 bg-rose-500/20 text-rose-200' : 'border-rose-300 bg-rose-50 text-rose-700',
    };

    return (
        <section className={`rounded-2xl border p-4 shadow-sm ${panelClass}`}>
            <h2 className="text-xl font-bold">My Blogs</h2>
            {myBlogs.length === 0 ? <EmptyState text="You have not created any blogs yet." theme={theme} /> : null}
            <div className="mt-5 grid gap-10">
                {myBlogs.map((blog) => (
                    <article
                        key={`mine-${blog.id}`}
                        className={`mx-auto w-full max-w-4xl rounded-2xl border pt-8 pb-8 lg:pl-15 lg:pr-15 shadow-sm transition duration-300 hover:shadow-md ${isDark
                            ? 'border-slate-600 bg-slate-900/85'
                            : 'border-slate-200 bg-slate-50'}`}
                    >
                        <div className="flex flex-wrap items-start justify-between gap-3 pb-3">
                            <div className="flex items-center gap-3">
                                <CircleUserRound size={34} className={isDark ? 'text-blue-300' : 'text-blue-600'} />
                                <div>
                                    <p className={`text-sm font-semibold ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                                        {blog.authorName || 'Unknown User'}
                                    </p>
                                    <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Original Poster</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <span
                                    className={`rounded-full border px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${statusClass[String(blog.status || 'PENDING').toLowerCase()] || statusClass.pending}`}
                                >
                                    {blog.status || 'PENDING'}
                                </span>

                                <div className="flex items-center gap-2">
                                    <p className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{blog.date || '-'}</p>
                                    <button
                                        type="button"
                                        className={`rounded-full border p-1.5 transition ${isDark
                                            ? 'border-slate-600 text-slate-300 hover:border-orange-400 hover:text-orange-300'
                                            : 'border-slate-300 text-slate-600 hover:border-orange-300 hover:text-orange-700'}`}
                                        aria-label="More options"
                                        title="More options"
                                    >
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <h3 className={`mt-5 text-4xl font-medium tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                            {blog.title}
                        </h3>

                        <p className={`mt-5 whitespace-pre-wrap text-[1.05rem] leading-9 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                            {blog.content || ''}
                        </p>

                        <div className="mt-7 flex flex-wrap items-center gap-2">
                            <button
                                type="button"
                                onClick={() => handleLike(blog.id)}
                                disabled={likingBlogId === blog.id}
                                className={`inline-flex items-center gap-1 rounded-md border px-4 py-1.5 text-sm font-semibold transition hover:-translate-y-0.5 ${isDark
                                    ? 'border-slate-500 bg-slate-800 text-slate-100 hover:border-orange-400'
                                    : 'border-slate-300 bg-white text-slate-700 hover:border-orange-300 hover:bg-slate-50'}`}
                            >
                                <Heart size={14} />
                                {likingBlogId === blog.id ? 'Updating...' : `Like ${blog.likesCount || 0}`}
                            </button>

                            <button
                                type="button"
                                onClick={() => handleSave(blog.id)}
                                className={`rounded-md border px-4 py-1.5 text-sm font-semibold transition hover:-translate-y-0.5 ${isDark
                                    ? savedBlogs.some((b) => b.id === blog.id)
                                        ? 'border-orange-400 bg-orange-500/20 text-orange-200'
                                        : 'border-slate-500 bg-slate-800 text-slate-100 hover:border-orange-400'
                                    : savedBlogs.some((b) => b.id === blog.id)
                                        ? 'border-orange-300 bg-orange-50 text-orange-700'
                                        : 'border-slate-300 bg-white text-slate-700 hover:border-orange-300 hover:bg-slate-50'}`}
                                title={savedBlogs.some((b) => b.id === blog.id) ? 'Remove from saved' : 'Save blog'}
                            >
                                <span className="inline-flex items-center gap-1">
                                    <Bookmark size={14} />
                                    {savedBlogs.some((b) => b.id === blog.id) ? 'Saved' : 'Save'}
                                </span>
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
