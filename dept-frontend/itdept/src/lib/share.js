export function buildBlogDeepLink(blogId) {
    return `${window.location.origin}/student/blogspot?view=all&blogId=${blogId}`;
}

export function shareBlogToWhatsApp(blog) {
    const blogId = Number(blog?.id);
    if (!Number.isFinite(blogId)) {
        return;
    }

    const link = buildBlogDeepLink(blogId);
    const title = String(blog?.title || 'Blog post').trim();
    const message = `Check this blog: ${title}\n${link}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}
