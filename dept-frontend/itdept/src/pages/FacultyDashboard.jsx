import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    BarChart3,
    Bookmark,
    CheckCheck,
    LayoutDashboard,
    LogOut,
    PanelLeftClose,
    PanelLeftOpen,
    PencilLine,
    ScrollText,
    SquarePen,
} from 'lucide-react';
import { apiRequest } from '../lib/api';
import { clearAuthSession, getAuthSession } from '../lib/auth';
import BlogSpotDashboard from './blogspot/BlogSpotDashboard';
import CreateBlogSection from './blogspot/CreateBlogSection';
import AllBlogsSection from './blogspot/AllBlogsSection';
import MyBlogsSection from './blogspot/MyBlogsSection';
import SavedBlogsSection from './blogspot/SavedBlogsSection';
import Stats from './blogspot/Stats';
import HandleBlogsSection from './blogspot/HandleBlogsSection';

const sidebarItems = [
    { key: 'create', label: 'Create Blog', icon: SquarePen },
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'all', label: 'All Blogs', icon: ScrollText },
    { key: 'mine', label: 'My Blogs', icon: PencilLine },
    { key: 'saved', label: 'Saved Blogs', icon: Bookmark },
    { key: 'handle', label: 'Handle Blogs', icon: CheckCheck },
    { key: 'stats', label: 'Stats', icon: BarChart3 },
];

const ANALYSIS_MIN_WORDS = 40;

export default function FacultyDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const session = useMemo(() => getAuthSession(), []);

    const [theme, setTheme] = useState(() => localStorage.getItem('blogspot-theme') || 'light');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
        const storedValue = localStorage.getItem('blogspot-sidebar-collapsed');
        if (storedValue === 'true' || storedValue === 'false') {
            return storedValue === 'true';
        }

        if (typeof window !== 'undefined') {
            return window.innerWidth < 1024;
        }

        return false;
    });

    const [activeView, setActiveView] = useState('dashboard');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [feedSort, setFeedSort] = useState('date');
    const [statusFilter, setStatusFilter] = useState('ALL');

    const [allBlogs, setAllBlogs] = useState([]);
    const [feed, setFeed] = useState([]);
    const [myBlogs, setMyBlogs] = useState([]);
    const [savedBlogs, setSavedBlogs] = useState(() => {
        try {
            const saved = localStorage.getItem(`saved-blogs-${session?.email || 'default'}`);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    const likedBlogsStorageKey = `liked-blogs-${session?.email || 'default'}`;
    const readLikedBlogIds = useCallback(() => {
        try {
            const stored = localStorage.getItem(likedBlogsStorageKey);
            if (!stored) {
                return [];
            }

            const parsed = JSON.parse(stored);
            return Array.isArray(parsed) ? parsed.map((id) => Number(id)).filter(Number.isFinite) : [];
        } catch {
            return [];
        }
    }, [likedBlogsStorageKey]);

    const [likedBlogIds, setLikedBlogIds] = useState(() => readLikedBlogIds());

    const [stats, setStats] = useState({
        totalBlogsCreated: 0,
        totalLikesReceived: 0,
        totalLikesGiven: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalViews: null,
        averageLikesPerBlog: 0,
    });

    const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [analysisError, setAnalysisError] = useState('');
    const [likingBlogId, setLikingBlogId] = useState(null);
    const [busyId, setBusyId] = useState(null);
    const [error, setError] = useState('');

    const token = session?.token;
    const isDark = theme === 'dark';
    const sharedView = useMemo(() => new URLSearchParams(location.search).get('view'), [location.search]);

    const countWords = useCallback((text) => {
        if (!text || !text.trim()) {
            return 0;
        }

        return text.trim().split(/\s+/).filter(Boolean).length;
    }, []);

    const analyzeDraft = useCallback(async (draftTitle, draftContent, options = {}) => {
        const { showLoading = true } = options;
        if (!token) {
            return null;
        }

        const trimmedTitle = (draftTitle || '').trim();
        const trimmedContent = (draftContent || '').trim();
        if (countWords(trimmedContent) < ANALYSIS_MIN_WORDS) {
            setAnalysis(null);
            setAnalysisError('');
            return null;
        }

        if (showLoading) {
            setAnalyzing(true);
        }
        setAnalysisError('');

        try {
            const response = await apiRequest('/api/blogs/analyze', {
                method: 'POST',
                token,
                body: {
                    title: trimmedTitle,
                    content: trimmedContent,
                },
            });
            setAnalysis(response || null);
            return response || null;
        } catch (err) {
            const message = err?.message || 'Unable to analyze content right now.';
            setAnalysisError(message);
            return null;
        } finally {
            if (showLoading) {
                setAnalyzing(false);
            }
        }
    }, [countWords, token]);

    const displayName = useMemo(() => {
        const fromSession = (session?.name || '').trim();
        if (fromSession) {
            return fromSession;
        }

        const emailPrefix = (session?.email || '').split('@')[0];
        return emailPrefix || 'Faculty';
    }, [session]);

    useEffect(() => {
        if (!session?.token || (session?.role !== 'STAFF' && session?.role !== 'ADMIN')) {
            clearAuthSession();
            navigate('/login/faculty', { replace: true });
        }
    }, [session, navigate]);

    useEffect(() => {
        localStorage.setItem('blogspot-theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('blogspot-sidebar-collapsed', String(isSidebarCollapsed));
    }, [isSidebarCollapsed]);

    useEffect(() => {
        localStorage.setItem(likedBlogsStorageKey, JSON.stringify(likedBlogIds));
    }, [likedBlogIds, likedBlogsStorageKey]);

    const applyLikedState = useCallback((blogs, likedIds) => {
        const likedIdSet = likedIds instanceof Set ? likedIds : new Set(likedIds);

        return Array.isArray(blogs)
            ? blogs.map((blog) => ({
                ...blog,
                likedByCurrentUser: likedIdSet.has(Number(blog.id)),
            }))
            : [];
    }, []);

    const sortBlogs = useCallback((blogs, sort) => {
        const cloned = [...blogs];

        if (sort === 'likes') {
            return cloned.sort((a, b) => Number(b.likesCount || 0) - Number(a.likesCount || 0));
        }

        return cloned.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
    }, []);

    const loadData = useCallback(async (sort) => {
        if (!token) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            const allBlogsDataRaw = await apiRequest('/api/blogs/all/faculty', { token });
            const allBlogsData = Array.isArray(allBlogsDataRaw) ? allBlogsDataRaw : [];
            const selectedSort = sort || 'date';

            const approvedFeed = allBlogsData.filter(
                (blog) => String(blog.status || '').toUpperCase() === 'APPROVED',
            );

            const myBlogsData = allBlogsData
                .filter((blog) => {
                    const authorName = String(blog.authorName || '').trim().toLowerCase();
                    const userName = String(displayName || '').trim().toLowerCase();

                    return userName && authorName === userName;
                })
                .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

            const likedIdSet = new Set(readLikedBlogIds());

            setAllBlogs(applyLikedState(sortBlogs(allBlogsData, selectedSort), likedIdSet));
            setFeed(applyLikedState(sortBlogs(approvedFeed, selectedSort), likedIdSet));
            setMyBlogs(applyLikedState(myBlogsData, likedIdSet));

            const likesReceived = myBlogsData.reduce((sum, blog) => sum + Number(blog.likesCount || 0), 0);
            const avgLikes = myBlogsData.length ? likesReceived / myBlogsData.length : 0;

            setStats({
                totalBlogsCreated: myBlogsData.length,
                totalLikesReceived: likesReceived,
                totalLikesGiven: 0,
                currentStreak: 0,
                longestStreak: 0,
                totalViews: null,
                averageLikesPerBlog: avgLikes,
            });
        } catch (err) {
            if (err?.status === 401 || err?.status === 403) {
                clearAuthSession();
                setError('Your session expired or access changed. Please log in again.');
                navigate('/login/faculty', { replace: true });
                return;
            }
            setError(err.message || 'Failed to load faculty blog data.');
        } finally {
            setLoading(false);
        }
    }, [applyLikedState, displayName, navigate, readLikedBlogIds, sortBlogs, token]);

    useEffect(() => {
        loadData(feedSort);
    }, [feedSort, loadData]);

    useEffect(() => {
        const allowedViews = new Set(['create', 'dashboard', 'all', 'mine', 'saved', 'stats', 'handle']);

        if (sharedView && allowedViews.has(sharedView)) {
            setActiveView(sharedView);
        }
    }, [sharedView]);

    useEffect(() => {
        if (activeView !== 'create') {
            return;
        }

        const timer = setTimeout(() => {
            analyzeDraft(title, content);
        }, 650);

        return () => clearTimeout(timer);
    }, [activeView, analyzeDraft, content, title]);

    const recentBlogs = useMemo(() => {
        return [...myBlogs]
            .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
            .slice(0, 4);
    }, [myBlogs]);

    const trendingBlogs = useMemo(() => {
        return [...feed]
            .sort((a, b) => Number(b.likesCount || 0) - Number(a.likesCount || 0))
            .slice(0, 3);
    }, [feed]);

    const studentBlogsForHandling = useMemo(() => {
        const currentUserName = String(displayName || '').trim().toLowerCase();

        const studentOnly = allBlogs.filter((blog) => {
            const authorRole = String(blog.authorRole || '').toUpperCase();
            const authorName = String(blog.authorName || '').trim().toLowerCase();

            if (authorRole === 'STUDENT') {
                return true;
            }

            if (authorRole === 'STAFF' || authorRole === 'ADMIN') {
                return false;
            }

            // Backward-compatible fallback for older API payloads that do not include role.
            return authorName && authorName !== currentUserName;
        });

        if (statusFilter === 'ALL') {
            return studentOnly;
        }

        return studentOnly.filter(
            (blog) => String(blog.status || '').toUpperCase() === statusFilter,
        );
    }, [allBlogs, statusFilter, displayName]);

    async function handlePost(e) {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            return;
        }

        if (countWords(content) < ANALYSIS_MIN_WORDS) {
            setError(`Write at least ${ANALYSIS_MIN_WORDS} words for analysis before publishing.`);
            return;
        }

        setPosting(true);
        setError('');
        setAnalyzing(true);

        try {
            const latestAnalysis = await analyzeDraft(title, content, { showLoading: false });

            if (!latestAnalysis) {
                setError('Unable to analyze content. Please try again.');
                return;
            }

            if (!latestAnalysis.publishAllowed) {
                setError(latestAnalysis.message || 'Publishing blocked by AI/plagiarism policy.');
                return;
            }

            const createdBlog = await apiRequest('/api/blogs/create', {
                method: 'POST',
                token,
                body: { title: title.trim(), content: content.trim() },
            });

            // Fallback safeguard: if backend returns pending for faculty, approve immediately.
            if (createdBlog?.id && String(createdBlog?.status || '').toUpperCase() !== 'APPROVED') {
                await apiRequest(`/api/blogs/${createdBlog.id}/approve`, {
                    method: 'PUT',
                    token,
                });
            }

            setTitle('');
            setContent('');
            setAnalysis(null);
            setAnalysisError('');
            setActiveView('mine');
            await loadData(feedSort);
        } catch (err) {
            setError(err.message || 'Unable to create blog.');
        } finally {
            setAnalyzing(false);
            setPosting(false);
        }
    }

    const publishBlockReason = useMemo(() => {
        if (countWords(content) < ANALYSIS_MIN_WORDS) {
            return `Write at least ${ANALYSIS_MIN_WORDS} words for reliable analysis.`;
        }

        if (analysisError) {
            return analysisError;
        }

        if (analysis && analysis.publishAllowed === false) {
            return analysis.message || 'Publishing blocked by AI/plagiarism policy.';
        }

        if (!analysis) {
            return 'Waiting for live analysis...';
        }

        return '';
    }, [analysis, analysisError, content, countWords]);

    const publishDisabled = posting || analyzing || Boolean(publishBlockReason);

    async function handleLike(blogId) {
        setLikingBlogId(blogId);
        setError('');

        const currentLikedIds = new Set(readLikedBlogIds());
        const isCurrentlyLiked = currentLikedIds.has(Number(blogId));
        const likeDelta = isCurrentlyLiked ? -1 : 1;

        try {
            await apiRequest(`/api/blogs/${blogId}/like`, {
                method: 'POST',
                token,
            });

            setLikedBlogIds((prev) => {
                const next = new Set(prev.map((id) => Number(id)));
                if (isCurrentlyLiked) {
                    next.delete(Number(blogId));
                } else {
                    next.add(Number(blogId));
                }
                return Array.from(next);
            });
            const toggleUpdater = (blog) => {
                if (Number(blog.id) !== Number(blogId)) {
                    return blog;
                }

                return {
                    ...blog,
                    likesCount: Math.max(0, Number(blog.likesCount || 0) + likeDelta),
                    likedByCurrentUser: !isCurrentlyLiked,
                };
            };

            setAllBlogs((prev) => prev.map(toggleUpdater));
            setFeed((prev) => prev.map(toggleUpdater));
            setMyBlogs((prev) => prev.map(toggleUpdater));
            setSavedBlogs((prev) => prev.map(toggleUpdater));
            setStats((prev) => ({
                ...prev,
                totalLikesGiven: Math.max(0, Number(prev.totalLikesGiven || 0) + likeDelta),
            }));
        } catch (err) {
            setError(err.message || 'Unable to update like.');
        } finally {
            setLikingBlogId(null);
        }
    }

    function handleSave(blogId) {
        setSavedBlogs((prev) => {
            const isSaved = prev.some((b) => b.id === blogId);
            let updated;

            if (isSaved) {
                updated = prev.filter((b) => b.id !== blogId);
            } else {
                const blogToSave = feed.find((b) => b.id === blogId) || myBlogs.find((b) => b.id === blogId);

                if (blogToSave) {
                    updated = [...prev, blogToSave];
                } else {
                    return prev;
                }
            }

            try {
                localStorage.setItem(`saved-blogs-${session?.email || 'default'}`, JSON.stringify(updated));
            } catch {
                return prev;
            }

            return updated;
        });
    }

    async function moderateBlog(blogId, action) {
        setBusyId(blogId);
        setError('');

        try {
            if (action === 'approve') {
                await apiRequest(`/api/blogs/${blogId}/approve`, { method: 'PUT', token });
            } else if (action === 'reject') {
                await apiRequest(`/api/blogs/${blogId}/reject`, { method: 'PUT', token });
            } else if (action === 'delete') {
                await apiRequest(`/api/blogs/${blogId}`, { method: 'DELETE', token });
            }

            await loadData(feedSort);
        } catch (err) {
            setError(err.message || 'Unable to update blog status.');
        } finally {
            setBusyId(null);
        }
    }

    function handleLogout() {
        clearAuthSession();
        navigate('/portal');
    }

    function renderContent() {
        if (loading) {
            return (
                <section
                    className={`rounded-2xl border p-4 ${isDark
                        ? 'border-orange-400/30 bg-slate-900/70 text-slate-100'
                        : 'border-slate-200 bg-white/90 text-slate-700'
                        }`}
                >
                    Loading data...
                </section>
            );
        }

        if (activeView === 'create') {
            return (
                <CreateBlogSection
                    title={title}
                    setTitle={setTitle}
                    content={content}
                    setContent={setContent}
                    posting={posting}
                    handlePost={handlePost}
                    analysis={analysis}
                    analyzing={analyzing}
                    analysisError={analysisError}
                    publishDisabled={publishDisabled}
                    publishBlockReason={publishBlockReason}
                    minimumWords={ANALYSIS_MIN_WORDS}
                    theme={theme}
                />
            );
        }

        if (activeView === 'all') {
            return (
                <AllBlogsSection
                    feed={feed}
                    feedSort={feedSort}
                    setFeedSort={setFeedSort}
                    handleLike={handleLike}
                    likingBlogId={likingBlogId}
                    handleSave={handleSave}
                    savedBlogs={savedBlogs}
                    token={token}
                    onRefresh={() => loadData(feedSort)}
                    onAuthError={() => {
                        clearAuthSession();
                        navigate('/login/faculty', { replace: true });
                    }}
                    theme={theme}
                />
            );
        }

        if (activeView === 'mine') {
            return (
                <MyBlogsSection
                    myBlogs={myBlogs}
                    handleLike={handleLike}
                    likingBlogId={likingBlogId}
                    handleSave={handleSave}
                    savedBlogs={savedBlogs}
                    token={token}
                    onRefresh={() => loadData(feedSort)}
                    onAuthError={() => {
                        clearAuthSession();
                        navigate('/login/faculty', { replace: true });
                    }}
                    theme={theme}
                />
            );
        }

        if (activeView === 'saved') {
            return (
                <SavedBlogsSection
                    savedBlogs={savedBlogs}
                    handleLike={handleLike}
                    likingBlogId={likingBlogId}
                    handleSave={handleSave}
                    token={token}
                    onRefresh={() => loadData(feedSort)}
                    onAuthError={() => {
                        clearAuthSession();
                        navigate('/login/faculty', { replace: true });
                    }}
                    theme={theme}
                />
            );
        }

        if (activeView === 'handle') {
            return (
                <HandleBlogsSection
                    blogs={studentBlogsForHandling}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    moderateBlog={moderateBlog}
                    busyId={busyId}
                    theme={theme}
                />
            );
        }

        if (activeView === 'stats') {
            return <Stats stats={stats} theme={theme} />;
        }

        return (
            <BlogSpotDashboard
                displayName={displayName}
                stats={stats}
                recentBlogs={recentBlogs}
                trendingBlogs={trendingBlogs}
                setActiveView={setActiveView}
                theme={theme}
            />
        );
    }

    const currentTitle = sidebarItems.find((item) => item.key === activeView)?.label || 'Dashboard';

    return (
        <main
            className={`blogspot-dashboard-shell min-h-screen h-auto overflow-visible bg-gradient-to-b p-2 sm:p-4 md:h-screen md:overflow-hidden ${isDark ? 'from-slate-700 to-slate-800 text-slate-100' : 'from-slate-100 to-slate-200 text-slate-900'
                }`}
        >
            <div
                className={`grid grid-cols-1 gap-4 transition-all duration-300 md:h-full ${isSidebarCollapsed ? 'md:grid-cols-[88px_minmax(0,1fr)]' : 'md:grid-cols-[280px_minmax(0,1fr)]'
                    }`}
            >
                <aside
                    className={`hidden rounded-2xl border p-3 shadow-lg backdrop-blur md:block ${isDark ? 'border-orange-400/30 bg-slate-900/80' : 'border-slate-200 bg-white/90'
                        }`}
                >
                    <div className="flex h-full flex-col justify-between">
                        <div>
                            <div className="mb-3 flex items-start justify-between gap-2">
                                <div className={isSidebarCollapsed ? 'hidden' : ''}>
                                    <p
                                        className={`text-xs font-extrabold uppercase tracking-[0.14em] ${isDark ? 'text-orange-300' : 'text-orange-600'
                                            }`}
                                    >
                                        Faculty Space
                                    </p>
                                    <h2 className="mt-1 text-2xl font-extrabold pb-5">BlogSpot</h2>
                                    <p className={`mt-1 text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                        {displayName}
                                    </p>
                                    <p className={`mt-0.5 text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                        {session?.email}
                                    </p>
                                    <p className={`mt-1 text-xs font-semibold uppercase tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                        Faculty
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border transition ${isDark
                                        ? 'border-slate-600 bg-slate-800 text-slate-100 hover:border-orange-400'
                                        : 'border-slate-200 bg-white text-slate-700 hover:border-orange-300'
                                        }`}
                                    onClick={() => setIsSidebarCollapsed((prev) => !prev)}
                                    aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Minimize sidebar'}
                                    title={isSidebarCollapsed ? 'Expand sidebar' : 'Minimize sidebar'}
                                >
                                    {isSidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
                                </button>
                            </div>

                            {isSidebarCollapsed ? (
                                <button
                                    type="button"
                                    className={`mb-3 hidden w-full items-center justify-center gap-1 rounded-lg border px-2 py-1.5 text-xs font-bold transition md:inline-flex ${isDark
                                        ? 'border-orange-400/40 bg-orange-500/20 text-orange-200 hover:bg-orange-500/30'
                                        : 'border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-100'
                                        }`}
                                    onClick={() => setIsSidebarCollapsed(false)}
                                    title="Expand sidebar"
                                    aria-label="Expand sidebar"
                                >
                                    <PanelLeftOpen size={14} />
                                    Expand
                                </button>
                            ) : null}

                            <nav className="grid gap-5">
                                {sidebarItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = activeView === item.key;

                                    return (
                                        <button
                                            key={item.key}
                                            type="button"
                                            className={`inline-flex items-center gap-4 rounded-xl border px-4 py-3 text-sm font-bold transition ${isSidebarCollapsed ? 'justify-center md:px-2' : 'justify-start'
                                                } ${isActive
                                                    ? 'border-orange-500 bg-gradient-to-r from-orange-500 to-orange-600 text-orange-50'
                                                    : isDark
                                                        ? 'border-slate-600 bg-slate-800/80 text-slate-100 hover:border-orange-400'
                                                        : 'border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50'
                                                }`}
                                            onClick={() => setActiveView(item.key)}
                                            title={item.label}
                                        >
                                            <Icon size={16} />
                                            <span className={isSidebarCollapsed ? 'hidden' : ''}>{item.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        <button
                            type="button"
                            className={`mt-3 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold transition ${isSidebarCollapsed ? 'justify-center md:px-2' : ''
                                } ${isDark
                                    ? 'border-rose-400/50 bg-rose-500/15 text-rose-200 hover:bg-rose-500/25'
                                    : 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'
                                }`}
                            onClick={handleLogout}
                        >
                            <LogOut size={16} />
                            <span className={isSidebarCollapsed ? 'hidden' : ''}>Logout</span>
                        </button>
                    </div>
                </aside>

                <section className="min-h-0 space-y-3 overflow-visible pr-0 md:overflow-y-auto md:pr-1">
                    <div className={`rounded-2xl border px-4 py-3 md:hidden ${isDark ? 'border-orange-400/30 bg-slate-900/75' : 'border-slate-200 bg-white/90'}`}>
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className={`text-sm font-extrabold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{displayName}</p>
                                <p className={`mt-0.5 text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{session?.email}</p>
                            </div>
                            <button
                                type="button"
                                className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-bold transition ${isDark ? 'border-rose-400/50 bg-rose-500/15 text-rose-200 hover:bg-rose-500/25' : 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'}`}
                                onClick={handleLogout}
                            >
                                <LogOut size={14} />
                                Logout
                            </button>
                        </div>
                    </div>

                    <header
                        className={`rounded-2xl border px-4 py-3 backdrop-blur ${isDark ? 'border-orange-400/30 bg-slate-900/75' : 'border-slate-200 bg-white/90'
                            }`}
                    >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p
                                    className={`text-xs font-extrabold uppercase tracking-[0.14em] ${isDark ? 'text-orange-300' : 'text-orange-600'
                                        }`}
                                >
                                    BlogSpot Pages
                                </p>
                                <h1 className="mt-1 text-2xl font-extrabold">{currentTitle}</h1>
                            </div>

                            <button
                                type="button"
                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-bold transition ${isDark
                                    ? 'border-slate-600 bg-slate-800 text-slate-100 hover:border-orange-400'
                                    : 'border-slate-200 bg-white text-slate-700 hover:border-orange-300'
                                    }`}
                                onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
                                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                <span className={`h-2.5 w-2.5 rounded-full ${theme === 'dark' ? 'bg-slate-100' : 'bg-orange-500'}`} />
                                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                            </button>
                        </div>
                    </header>

                    {error ? (
                        <p
                            className={`rounded-xl border px-4 py-3 text-sm font-semibold ${isDark
                                ? 'border-rose-400/50 bg-rose-500/15 text-rose-200'
                                : 'border-rose-200 bg-rose-50 text-rose-700'
                                }`}
                        >
                            {error}
                        </p>
                    ) : null}

                    {renderContent()}
                </section>
            </div>
        </main>
    );
}
