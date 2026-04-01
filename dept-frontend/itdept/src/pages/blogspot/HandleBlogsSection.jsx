import { CircleUserRound, Trash2 } from 'lucide-react';
import EmptyState from './EmptyState';

export default function HandleBlogsSection({
    blogs,
    statusFilter,
    setStatusFilter,
    moderateBlog,
    busyId,
    theme = 'light',
}) {
    const isDark = theme === 'dark';

    const panelClass = isDark
        ? 'border-orange-400/30 bg-slate-900/70 text-slate-100'
        : 'border-slate-200 bg-white/95 text-slate-900';

    const selectClass = isDark
        ? 'border-slate-600 bg-slate-800 text-slate-100'
        : 'border-slate-200 bg-white text-slate-700';

    const statusClass = {
        approved: isDark
            ? 'border-emerald-400/40 bg-emerald-500/20 text-emerald-200'
            : 'border-emerald-300 bg-emerald-50 text-emerald-700',
        pending: isDark
            ? 'border-amber-400/40 bg-amber-500/20 text-amber-200'
            : 'border-amber-300 bg-amber-50 text-amber-700',
        rejected: isDark
            ? 'border-rose-400/40 bg-rose-500/20 text-rose-200'
            : 'border-rose-300 bg-rose-50 text-rose-700',
    };

    return (
        <section className={`rounded-2xl border p-4 shadow-sm ${panelClass}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-bold">Handle Blogs</h2>
                <div className="flex items-center gap-2">
                    <label
                        htmlFor="facultyStatusFilter"
                        className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
                    >
                        Filter
                    </label>
                    <select
                        id="facultyStatusFilter"
                        className={`rounded-xl border px-3 py-1.5 text-sm font-semibold outline-none ${selectClass}`}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="ALL">All</option>
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                    </select>
                </div>
            </div>

            {blogs.length === 0 ? <EmptyState text="No student blogs available for this filter." theme={theme} /> : null}

            <div className="mt-5 grid gap-10">
                {blogs.map((blog) => (
                    <article
                        key={`handle-${blog.id}`}
                        className={`mx-auto w-full max-w-4xl rounded-2xl border pt-8 pb-8 shadow-sm transition duration-300 hover:shadow-md lg:pl-15 lg:pr-15 ${isDark ? 'border-gray-300 bg-white' : 'border-slate-200 bg-slate-50'
                            }`}
                    >
                        <div className="flex flex-wrap items-start justify-between gap-3 pb-3">
                            <div className="flex items-center gap-3">
                                <CircleUserRound size={34} className={isDark ? 'text-blue-600' : 'text-blue-600'} />
                                <div>
                                    <p className={`text-sm font-semibold ${isDark ? 'text-slate-900' : 'text-blue-700'}`}>
                                        {blog.authorName || 'Unknown User'}
                                    </p>
                                    <p className={`text-xs font-semibold ${isDark ? 'text-slate-600' : 'text-slate-500'}`}>
                                        Student Author
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <span
                                    className={`rounded-full border px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${statusClass[String(blog.status || 'PENDING').toLowerCase()] || statusClass.pending
                                        }`}
                                >
                                    {blog.status || 'PENDING'}
                                </span>
                                <p className={`text-sm font-semibold ${isDark ? 'text-slate-600' : 'text-slate-600'}`}>
                                    {blog.date || '-'}
                                </p>
                            </div>
                        </div>

                        <h3 className={`mt-5 text-4xl font-medium tracking-tight ${isDark ? 'text-slate-900' : 'text-slate-900'}`}>
                            {blog.title}
                        </h3>

                        <p className={`mt-5 whitespace-pre-wrap text-[1.05rem] leading-9 ${isDark ? 'text-slate-800' : 'text-slate-800'}`}>
                            {blog.content || ''}
                        </p>

                        <div className="mt-7 flex flex-wrap items-center gap-2">
                            <button
                                type="button"
                                onClick={() => moderateBlog(blog.id, 'approve')}
                                disabled={busyId === blog.id}
                                className={`rounded-md border px-4 py-1.5 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 ${isDark
                                    ? 'border-emerald-400 bg-emerald-100 text-emerald-700'
                                    : 'border-emerald-300 bg-emerald-50 text-emerald-700'
                                    }`}
                            >
                                {busyId === blog.id ? 'Working...' : 'Approve'}
                            </button>

                            <button
                                type="button"
                                onClick={() => moderateBlog(blog.id, 'reject')}
                                disabled={busyId === blog.id}
                                className={`rounded-md border px-4 py-1.5 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 ${isDark
                                    ? 'border-amber-400 bg-amber-100 text-amber-700'
                                    : 'border-amber-300 bg-amber-50 text-amber-700'
                                    }`}
                            >
                                {busyId === blog.id ? 'Working...' : 'Reject'}
                            </button>

                            <button
                                type="button"
                                onClick={() => moderateBlog(blog.id, 'delete')}
                                disabled={busyId === blog.id}
                                className={`inline-flex items-center gap-1 rounded-md border px-4 py-1.5 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 ${isDark
                                    ? 'border-rose-400 bg-rose-100 text-rose-700'
                                    : 'border-rose-200 bg-rose-50 text-rose-700'
                                    }`}
                            >
                                <Trash2 size={14} />
                                {busyId === blog.id ? 'Working...' : 'Delete'}
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
