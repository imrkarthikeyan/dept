export default function EmptyState({ text, theme = 'light' }) {
    const isDark = theme === 'dark';

    return (
        <p className={`mt-3 rounded-xl border px-4 py-3 text-sm font-semibold ${isDark ? 'border-slate-700 bg-slate-900/50 text-slate-300' : 'border-slate-200 bg-white/80 text-slate-500'}`}>
            {text}
        </p>
    );
}
