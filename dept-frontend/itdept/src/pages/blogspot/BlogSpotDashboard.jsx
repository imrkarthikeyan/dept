import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CircleUserRound, Heart, Bookmark, MessageCircle, MoreVertical, ArrowLeft, SendHorizontal } from 'lucide-react';
import { apiRequest } from '../../lib/api';
import { shareBlogToWhatsApp } from '../../lib/share';
import EmptyState from './EmptyState';
import { LikesModal } from './LikesModal';

export default function BlogSpotDashboard({
    displayName,
    stats,
    recentBlogs,
    trendingBlogs,
    setActiveView,
    theme = 'light',
    handleLike,
    handleSave,
    savedBlogs = [],
    likingBlogId,
    token,
    onRefresh,
    onAuthError,
}) {
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [commentInput, setCommentInput] = useState('');
    const [commentError, setCommentError] = useState('');
    const [commentPosting, setCommentPosting] = useState(false);
    const [showLikesModal, setShowLikesModal] = useState(false);
    const [selectedBlogForLikes, setSelectedBlogForLikes] = useState(null);
    const [shareMenuBlogId, setShareMenuBlogId] = useState(null);

    const openLikesModal = (blogId) => {
        setSelectedBlogForLikes(blogId);
        setShowLikesModal(true);
    };

    const toggleShareMenu = (blogId) => {
        setShareMenuBlogId((prev) => (prev === blogId ? null : blogId));
    };

    const handleShareLink = (blog) => {
        shareBlogToWhatsApp(blog);
        setShareMenuBlogId(null);
    };

    const isDark = theme === 'dark';

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

    const panelClass = isDark
        ? 'border-orange-400/30 bg-slate-900/70 text-slate-100'
        : 'border-slate-200 bg-white/95 text-slate-900';

    const tileClass = isDark
        ? 'border-orange-400/30 bg-slate-900/80 text-slate-100'
        : 'border-slate-200 bg-white text-slate-900';

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

    const blogCardClass = isDark
        ? 'border-gray-300 bg-white'
        : 'border-slate-200 bg-slate-50';

    const blogTextDark = isDark ? 'text-slate-900' : 'text-slate-900';
    const blogAuthorDark = isDark ? 'text-slate-900' : 'text-blue-700';
    const blogMetaDark = isDark ? 'text-slate-600' : 'text-slate-500';
    const blogButtonDark = isDark
        ? 'border-gray-300 bg-slate-100 text-slate-900 hover:border-orange-400'
        : 'border-slate-300 bg-white text-slate-700 hover:border-orange-300 hover:bg-slate-50';

    const helperTextClass = isDark ? 'text-slate-300' : 'text-slate-600';

    const detailCardClass = isDark
        ? 'border-slate-700 bg-slate-950/70'
        : 'border-slate-200 bg-white';

    const selectedBlog = [...trendingBlogs, ...recentBlogs].find((blog) => blog.id === selectedBlogId) || null;

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
                    Back to dashboard
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

                        {selectedBlog.likesCount > 0 && (
                            <button
                                type="button"
                                onClick={() => openLikesModal(selectedBlog.id)}
                                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold transition hover:opacity-70 ${isDark ? 'bg-orange-500/20 text-orange-200' : 'bg-orange-100 text-orange-700'}`}
                            >
                                👍 {selectedBlog.likesCount === 1 ? '1 person liked' : `${selectedBlog.likesCount} people liked`} this
                            </button>
                        )}

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
                transition={{ duration: 0.42, delay: 0.08 }}
            >
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-xl font-bold">Trending Blogs</h2>
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-700">
                        Top 3 Last 10 Days
                    </span>
                </div>

                {trendingBlogs.length === 0 ? <EmptyState text="No blogs trending in the last 10 days yet." theme={theme} /> : null}
                <div className="mt-5 grid gap-10">
                    {trendingBlogs.map((blog, index) => (
                        <motion.article
                            key={`trend-${blog.id}`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.28, delay: 0.06 * index }}
                            className={`mx-auto w-full max-w-4xl rounded-2xl border pt-8 pb-8 px-8 lg:pl-15 lg:pr-15 shadow-sm transition duration-300 hover:shadow-md ${blogCardClass}`}
                        >
                            <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <CircleUserRound size={34} className="text-blue-600" />
                                    <div>
                                        <p className={`text-sm font-semibold ${blogAuthorDark}`}>
                                            {blog.authorName || 'Unknown User'}
                                        </p>
                                        <p className={`text-xs font-semibold ${blogMetaDark}`}>{getAuthorTag(blog.authorRole)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <p className={`text-sm font-semibold ${blogMetaDark}`}>{blog.date || '-'}</p>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => toggleShareMenu(blog.id)}
                                            className={`rounded-full border p-1.5 transition ${isDark
                                                ? 'border-slate-300 text-slate-600 hover:border-orange-400 hover:text-orange-600'
                                                : 'border-slate-300 text-slate-600 hover:border-orange-300 hover:text-orange-700'}`}
                                            aria-label="More options"
                                            title="More options"
                                        >
                                            <MoreVertical size={16} />
                                        </button>

                                        {shareMenuBlogId === blog.id ? (
                                            <div className={`absolute right-0 top-10 z-20 min-w-[130px] rounded-lg border p-1 shadow-lg ${isDark ? 'border-slate-600 bg-slate-800' : 'border-slate-200 bg-white'}`}>
                                                <button
                                                    type="button"
                                                    onClick={() => handleShareLink(blog)}
                                                    className={`w-full rounded-md px-3 py-1.5 text-left text-sm font-semibold transition ${isDark ? 'text-slate-100 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-100'}`}
                                                >
                                                    Share link
                                                </button>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3 flex items-center gap-2">
                                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${isDark ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-600'}`}>
                                    #{index + 1} Trending
                                </span>
                            </div>

                            <h3 className={`text-4xl font-medium tracking-tight ${blogTextDark}`}>
                                {blog.title}
                            </h3>

                            <p className={`mt-5 whitespace-pre-wrap text-[1.05rem] leading-9 ${blogTextDark}`}>
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
                        </motion.article>
                    ))}
                </div>
            </motion.section>

            <motion.section
                className={`rounded-2xl border p-4 shadow-sm ${panelClass}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.14 }}
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
                <div className="mt-5 grid gap-10">
                    {recentBlogs.map((blog, index) => (
                        <motion.article
                            key={`recent-${blog.id}`}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.28, delay: 0.06 * index }}
                            className={`mx-auto w-full max-w-4xl rounded-2xl border pt-8 pb-8 px-8 lg:pl-15 lg:pr-15 shadow-sm transition duration-300 hover:shadow-md ${blogCardClass}`}
                        >
                            <div className="flex flex-wrap items-start justify-between gap-3 pb-3">
                                <div className="flex items-center gap-3">
                                    <CircleUserRound size={34} className="text-blue-600" />
                                    <div>
                                        <p className={`text-sm font-semibold ${blogAuthorDark}`}>
                                            {blog.authorName || 'Unknown User'}
                                        </p>
                                        <p className={`text-xs font-semibold ${blogMetaDark}`}>{getAuthorTag(blog.authorRole)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <p className={`text-sm font-semibold ${blogMetaDark}`}>{blog.date || '-'}</p>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => toggleShareMenu(blog.id)}
                                            className={`rounded-full border p-1.5 transition ${isDark
                                                ? 'border-slate-300 text-slate-600 hover:border-orange-400 hover:text-orange-600'
                                                : 'border-slate-300 text-slate-600 hover:border-orange-300 hover:text-orange-700'}`}
                                            aria-label="More options"
                                            title="More options"
                                        >
                                            <MoreVertical size={16} />
                                        </button>

                                        {shareMenuBlogId === blog.id ? (
                                            <div className={`absolute right-0 top-10 z-20 min-w-[130px] rounded-lg border p-1 shadow-lg ${isDark ? 'border-slate-600 bg-slate-800' : 'border-slate-200 bg-white'}`}>
                                                <button
                                                    type="button"
                                                    onClick={() => handleShareLink(blog)}
                                                    className={`w-full rounded-md px-3 py-1.5 text-left text-sm font-semibold transition ${isDark ? 'text-slate-100 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-100'}`}
                                                >
                                                    Share link
                                                </button>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <h3 className={`mt-5 text-4xl font-medium tracking-tight ${blogTextDark}`}>
                                {blog.title}
                            </h3>

                            <p className={`mt-5 whitespace-pre-wrap text-[1.05rem] leading-9 ${blogTextDark}`}>
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
                        </motion.article>
                    ))}
                </div>
            </motion.section>

            <LikesModal
                isOpen={showLikesModal}
                onClose={() => setShowLikesModal(false)}
                blogId={selectedBlogForLikes}
                token={token}
                onAuthError={onAuthError}
                theme={theme}
            />
        </div>
    );
}
