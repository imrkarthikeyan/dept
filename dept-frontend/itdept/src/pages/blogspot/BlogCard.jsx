import { Bookmark, Heart } from 'lucide-react';

export default function BlogCard({
    blog,
    onLike,
    likeLoading,
    showLike = true,
    onSave,
    isSaved = false,
    showStatus = true,
    theme = 'light',
}) {
    const isDark = theme === 'dark';

    const getAuthorTag = (authorRole) => {
        const role = String(authorRole || '').toUpperCase();
        if (role === 'STUDENT') {
            return 'Student author';
        }
        if (role === 'STAFF' || role === 'ADMIN') {
            return 'Faculty author';
        }
        return 'Author';
    };

    const cardClass = isDark
        ? 'border-slate-700/80 bg-slate-900/70 text-slate-100 hover:border-orange-400/70'
        : 'border-slate-200 bg-white/95 text-slate-900 hover:border-orange-300';

    const subtleText = isDark ? 'text-slate-300' : 'text-slate-600';

    const statusClass = {
        approved: isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700',
        pending: isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-700',
        rejected: isDark ? 'bg-rose-500/20 text-rose-300' : 'bg-rose-100 text-rose-700',
    };

    const normalizedStatus = String(blog.status || 'PENDING').toLowerCase();

    return (
        <article className={`rounded-2xl border ml-20 mr-20 p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md ${cardClass}`}>
            <div className="mb-3 flex flex-col items-center gap-2 text-center">
                <h3 className="text-lg font-bold leading-tight">{blog.title}</h3>
                {showStatus ? (
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${statusClass[normalizedStatus] || statusClass.pending}`}>
                        {blog.status || 'PENDING'}
                    </span>
                ) : null}
            </div>

            <p className={`whitespace-pre-wrap text-sm leading-7 ${subtleText}`}>{blog.content || ''}</p>

            <div className="mt-4 flex items-end justify-between gap-3">
                <div className="flex items-center gap-2">
                    {showLike ? (
                        <button
                            type="button"
                            className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm font-semibold transition ${isDark ? 'border-slate-600 bg-slate-800 text-slate-100 hover:border-orange-400' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-orange-300 hover:bg-orange-50'}`}
                            onClick={() => onLike(blog.id)}
                            disabled={likeLoading}
                        >
                            <Heart size={14} />
                            {likeLoading ? 'Updating...' : (blog.likesCount || 0)}
                        </button>
                    ) : null}

                    {onSave ? (
                        <button
                            type="button"
                            className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm font-semibold transition ${isSaved
                                ? (isDark ? 'border-orange-400 bg-orange-500/20 text-orange-200' : 'border-orange-300 bg-orange-50 text-orange-700')
                                : (isDark ? 'border-slate-600 bg-slate-800 text-slate-100 hover:border-orange-400' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-orange-300 hover:bg-orange-50')}`}
                            onClick={() => onSave(blog.id)}
                            title={isSaved ? 'Remove from saved' : 'Save blog'}
                        >
                            <Bookmark size={14} />
                            Save
                        </button>
                    ) : null}
                </div>

                <p className={`text-right text-xs font-semibold ${subtleText}`}>
                    {blog.authorName || 'Unknown'} • {getAuthorTag(blog.authorRole)}
                    <br />
                    {blog.date || '-'}
                </p>
            </div>
        </article>
    );
}
