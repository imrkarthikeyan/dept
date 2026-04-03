import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Bookmark, CircleUserRound, Heart, MessageCircle, MoreVertical, SendHorizontal } from 'lucide-react';
import { apiRequest } from '../../lib/api';
import EmptyState from './EmptyState';
import { LikesModal } from './LikesModal';

export default function AllBlogsSection({
    feed,
    feedSort,
    setFeedSort,
    handleLike,
    likingBlogId,
    handleSave,
    savedBlogs,
    token,
    onRefresh,
    onAuthError,
    theme = 'light',
}) {
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [commentInput, setCommentInput] = useState('');
    const [commentError, setCommentError] = useState('');
    const [commentPosting, setCommentPosting] = useState(false);
    const [showLikesModal, setShowLikesModal] = useState(false);
    const [selectedBlogForLikes, setSelectedBlogForLikes] = useState(null);
    const [blogLikes, setBlogLikes] = useState({});

    const openLikesModal = async (blogId) => {
        setSelectedBlogForLikes(blogId);
        setShowLikesModal(true);
    };

    const isDark = theme === 'dark';
    const panelClass = isDark
        ? 'border-orange-400/30 bg-slate-900/70 text-slate-100'
        : 'border-slate-200 bg-white/95 text-slate-900';

    const selectClass = isDark
        ? 'border-slate-600 bg-slate-800 text-slate-100'
        : 'border-slate-200 bg-white text-slate-700';

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

    const selectedBlog = useMemo(
        () => feed.find((blog) => blog.id === selectedBlogId) || null,
        [feed, selectedBlogId],
    );

    useEffect(() => {
        if (!selectedBlogId) {
            return;
        }

        if (!selectedBlog) {
            setSelectedBlogId(null);
        }
    }, [selectedBlog, selectedBlogId]);

    useEffect(() => {
        if (!selectedBlogId || !token) {
            return;
        }

        let isMounted = true;

        const loadComments = async () => {
            setCommentsLoading(true);
            setCommentError('');

            try {
                const response = await apiRequest(`/api/blogs/${selectedBlogId}/comments`, { token });
                if (isMounted) {
                    setComments(Array.isArray(response) ? response : []);
                }
            } catch (err) {
                if (err?.status === 401 || err?.status === 403) {
                    if (onAuthError) {
                        onAuthError();
                    }
                    return;
                }
                if (isMounted) {
                    setCommentError(err.message || 'Unable to load comments.');
                }
            } finally {
                if (isMounted) {
                    setCommentsLoading(false);
                }
            }
        };

        loadComments();

        return () => {
            isMounted = false;
        };
    }, [selectedBlogId, token, onAuthError]);

    async function handleSubmitComment(e) {
        e.preventDefault();
        const nextComment = commentInput.trim();

        if (!nextComment || !selectedBlogId || !token) {
            return;
        }

        setCommentPosting(true);
        setCommentError('');

        try {
            await apiRequest(`/api/blogs/${selectedBlogId}/comments`, {
                method: 'POST',
                token,
                body: { content: nextComment },
            });

            setCommentInput('');
            const refreshedComments = await apiRequest(`/api/blogs/${selectedBlogId}/comments`, { token });
            setComments(Array.isArray(refreshedComments) ? refreshedComments : []);

            if (onRefresh) {
                await onRefresh();
            }
        } catch (err) {
            if (err?.status === 401 || err?.status === 403) {
                if (onAuthError) {
                    onAuthError();
                }
                return;
            }
            setCommentError(err.message || 'Unable to post comment.');
        } finally {
            setCommentPosting(false);
        }
    }

    const detailCardClass = isDark
        ? 'border-slate-700 bg-slate-950/70'
        : 'border-slate-200 bg-white';

    const helperTextClass = isDark ? 'text-slate-300' : 'text-slate-600';

    if (selectedBlog) {
        return (
            <section className={`rounded-2xl border p-4 shadow-sm ${panelClass}`}>
                <button
                    type="button"
                    onClick={() => {
                        setSelectedBlogId(null);
                        setCommentInput('');
                        setCommentError('');
                    }}
                    className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition hover:-translate-y-0.5 ${isDark ? 'border-slate-600 bg-slate-800 text-slate-100 hover:border-orange-400' : 'border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50'}`}
                >
                    <ArrowLeft size={16} />
                    Back to blogs
                </button>

                <article className={`rounded-2xl border p-5 shadow-sm ${detailCardClass}`}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <CircleUserRound size={36} className={isDark ? 'text-orange-300' : 'text-blue-700'} />
                            <div>
                                <p className="text-sm font-semibold">{selectedBlog.authorName || 'Unknown User'}</p>
                                <p className={`text-xs font-semibold ${helperTextClass}`}>{getAuthorTag(selectedBlog.authorRole)}</p>
                            </div>
                        </div>
                        <p className={`text-sm font-semibold ${helperTextClass}`}>{selectedBlog.date || '-'}</p>
                    </div>

                    <h3 className="mt-4 text-3xl font-semibold tracking-tight">{selectedBlog.title}</h3>
                    <p className={`mt-4 whitespace-pre-wrap text-base leading-8 ${helperTextClass}`}>{selectedBlog.content || ''}</p>

                    <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-300/30 pt-4">
                        <button
                            type="button"
                            onClick={() => handleLike(selectedBlog.id)}
                            disabled={likingBlogId === selectedBlog.id}
                            className={`inline-flex items-center gap-1 rounded-md border px-4 py-1.5 text-sm font-semibold transition hover:-translate-y-0.5 ${isDark ? 'border-slate-600 bg-slate-800 text-slate-100 hover:border-orange-400' : 'border-slate-300 bg-white text-slate-700 hover:border-orange-300 hover:bg-slate-50'}`}
                        >
                            <Heart size={14} />
                            {likingBlogId === selectedBlog.id ? 'Updating...' : `Like ${selectedBlog.likesCount || 0}`}
                        </button>

                        <button
                            type="button"
                            onClick={() => handleSave(selectedBlog.id)}
                            className={`rounded-md border px-4 py-1.5 text-sm font-semibold transition hover:-translate-y-0.5 ${isDark
                                ? savedBlogs.some((b) => b.id === selectedBlog.id)
                                    ? 'border-orange-400 bg-orange-100 text-orange-700'
                                    : 'border-slate-600 bg-slate-800 text-slate-100 hover:border-orange-400'
                                : savedBlogs.some((b) => b.id === selectedBlog.id)
                                    ? 'border-orange-300 bg-orange-50 text-orange-700'
                                    : 'border-slate-300 bg-white text-slate-700 hover:border-orange-300 hover:bg-slate-50'}`}
                            title={savedBlogs.some((b) => b.id === selectedBlog.id) ? 'Remove from saved' : 'Save blog'}
                        >
                            <span className="inline-flex items-center gap-1">
                                <Bookmark size={14} />
                                {savedBlogs.some((b) => b.id === selectedBlog.id) ? 'Saved' : 'Save'}
                            </span>
                        </button>

                        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${isDark ? 'bg-orange-500/20 text-orange-200' : 'bg-orange-100 text-orange-700'}`}>
                            <MessageCircle size={14} />
                            {selectedBlog.commentsCount || 0} comments
                        </span>
                    </div>
                </article>

                <section className={`mt-4 rounded-2xl border p-4 ${detailCardClass}`}>
                    <div className="mb-3 flex items-center justify-between gap-2">
                        <h4 className="text-lg font-bold">Comments</h4>
                        <span className={`text-sm font-semibold ${helperTextClass}`}>{comments.length} total</span>
                    </div>

                    <form onSubmit={handleSubmitComment} className="grid gap-3">
                        <textarea
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            rows={3}
                            placeholder="Write a comment..."
                            className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${isDark ? 'border-slate-600 bg-slate-900 text-slate-100 placeholder:text-slate-400 focus:border-orange-400' : 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-orange-300'}`}
                        />
                        <div className="flex items-center justify-between gap-2">
                            <p className={`text-xs font-medium ${helperTextClass}`}>Keep comments respectful and helpful.</p>
                            <button
                                type="submit"
                                disabled={commentPosting || !commentInput.trim()}
                                className={`inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-bold transition ${isDark ? 'bg-orange-500 text-orange-50 hover:bg-orange-400 disabled:bg-slate-700' : 'bg-orange-600 text-orange-50 hover:bg-orange-500 disabled:bg-slate-400'} disabled:cursor-not-allowed`}
                            >
                                <SendHorizontal size={14} />
                                {commentPosting ? 'Posting...' : 'Post comment'}
                            </button>
                        </div>
                    </form>

                    {commentError ? (
                        <p className={`mt-3 rounded-lg border px-3 py-2 text-sm font-semibold ${isDark ? 'border-rose-400/50 bg-rose-500/15 text-rose-200' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
                            {commentError}
                        </p>
                    ) : null}

                    {commentsLoading ? (
                        <p className={`mt-4 text-sm font-semibold ${helperTextClass}`}>Loading comments...</p>
                    ) : null}

                    {!commentsLoading && comments.length === 0 ? (
                        <p className={`mt-4 text-sm font-semibold ${helperTextClass}`}>No comments yet. Be the first to comment.</p>
                    ) : null}

                    <div className="mt-4 grid gap-3">
                        {comments.map((comment) => (
                            <article
                                key={`comment-${comment.id}`}
                                className={`rounded-xl border px-3 py-2 ${isDark ? 'border-slate-700 bg-slate-900/70' : 'border-slate-200 bg-slate-50'}`}
                            >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-sm font-bold">{comment.authorName || 'Unknown'}</p>
                                    <p className={`text-xs font-semibold ${helperTextClass}`}>{comment.createdAt || '-'}</p>
                                </div>
                                <p className={`mt-1 text-xs font-semibold uppercase tracking-wide ${helperTextClass}`}>
                                    {getAuthorTag(comment.authorRole)}
                                </p>
                                <p className={`mt-2 whitespace-pre-wrap text-sm leading-6 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                                    {comment.content}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            </section>
        );
    }

    return (
        <section className={`rounded-2xl border p-4 shadow-sm  ${panelClass}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-bold">All Blogs Feed</h2>
                <div className="flex items-center gap-2">
                    <label htmlFor="feedSort" className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        Sort
                    </label>
                    <select
                        id="feedSort"
                        value={feedSort}
                        onChange={(e) => setFeedSort(e.target.value)}
                        className={`rounded-xl border px-3 py-1.5 text-sm font-semibold outline-none ${selectClass}`}
                    >
                        <option value="date">Latest</option>
                        <option value="likes">Most Liked</option>
                    </select>
                </div>
            </div>

            {feed.length === 0 ? <EmptyState text="No blogs in feed yet." theme={theme} /> : null}
            <div className="mt-5 grid gap-10">
                {feed.map((blog) => (
                    <article
                        key={`feed-${blog.id}`}
                        className={`mx-auto w-full max-w-4xl rounded-2xl border pt-8 pb-8 lg:pl-15 lg:pr-15 shadow-sm transition duration-300 hover:shadow-md ${isDark
                            ? 'border-gray-300 bg-white'
                            : 'border-slate-200 bg-slate-50'}`}
                    >
                        <div className="flex flex-wrap items-start justify-between gap-3 pb-3">
                            <div className="flex items-center gap-3">
                                <CircleUserRound size={34} className={isDark ? 'text-blue-600' : 'text-blue-600'} />
                                <div>
                                    <p className={`text-sm font-semibold ${isDark ? 'text-slate-900' : 'text-blue-700'}`}>
                                        {blog.authorName || 'Unknown User'}
                                    </p>
                                    <p className={`text-xs font-semibold ${isDark ? 'text-slate-600' : 'text-slate-500'}`}>{getAuthorTag(blog.authorRole)}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <p className={`text-sm font-semibold ${isDark ? 'text-slate-600' : 'text-slate-600'}`}>{blog.date || '-'}</p>
                                <button
                                    type="button"
                                    className={`rounded-full border p-1.5 transition ${isDark
                                        ? 'border-slate-300 text-slate-600 hover:border-orange-400 hover:text-orange-600'
                                        : 'border-slate-300 text-slate-600 hover:border-orange-300 hover:text-orange-700'}`}
                                    aria-label="More options"
                                    title="More options"
                                >
                                    <MoreVertical size={16} />
                                </button>
                            </div>
                        </div>

                        <h3 className={`mt-5 text-4xl font-medium tracking-tight ${isDark ? 'text-slate-900' : 'text-slate-900'}`}>
                            {blog.title}
                        </h3>

                        <p className={`mt-5 whitespace-pre-wrap text-[1.05rem] leading-9 ${isDark ? 'text-slate-800' : 'text-slate-800'}`}>
                            {blog.content || ''}
                        </p>

                        {blog.likesCount > 0 && (
                            <button
                                type="button"
                                onClick={() => openLikesModal(blog.id)}
                                className={`mt-4 text-sm font-semibold transition hover:opacity-70 ${isDark ? 'text-orange-500' : 'text-blue-600'}`}
                            >
                                👍 {blog.likesCount === 1 ? '1 person liked' : `${blog.likesCount} people liked`} this
                            </button>
                        )}

                        <div className="mt-7 flex flex-wrap items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setSelectedBlogId(blog.id)}
                                className={`inline-flex items-center gap-1 rounded-md border px-4 py-1.5 text-sm font-semibold transition hover:-translate-y-0.5 ${isDark
                                    ? 'border-gray-300 bg-slate-100 text-slate-900 hover:border-orange-400'
                                    : 'border-slate-300 bg-white text-slate-700 hover:border-orange-300 hover:bg-slate-50'}`}
                            >
                                <MessageCircle size={14} />
                                Comments {blog.commentsCount || 0}
                            </button>

                            <button
                                type="button"
                                onClick={() => handleLike(blog.id)}
                                disabled={likingBlogId === blog.id}
                                className={`inline-flex items-center gap-1 rounded-md border px-4 py-1.5 text-sm font-semibold transition hover:-translate-y-0.5 ${isDark
                                    ? 'border-gray-300 bg-slate-100 text-slate-900 hover:border-orange-400'
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
                                        ? 'border-orange-400 bg-orange-100 text-orange-700'
                                        : 'border-gray-300 bg-slate-100 text-slate-900 hover:border-orange-400'
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

            <LikesModal
                isOpen={showLikesModal}
                onClose={() => setShowLikesModal(false)}
                blogId={selectedBlogForLikes}
                token={token}
                onAuthError={onAuthError}
                theme={theme}
            />
        </section>
    );
}
