import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { apiRequest } from '../../lib/api';

export function LikesModal({ isOpen, onClose, blogId, token, theme }) {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && blogId) {
      loadLikes();
    }
  }, [isOpen, blogId]);

  const loadLikes = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiRequest(`/api/blogs/${blogId}/likes`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLikes(Array.isArray(response) ? response : []);
    } catch (err) {
      setError('Failed to load likes');
      console.error('Error loading likes:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={`rounded-lg shadow-xl w-96 max-h-96 flex flex-col ${isDark ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-slate-200'
          }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-slate-700' : 'border-slate-200'
            }`}
        >
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            People who liked this
          </h3>
          <button
            onClick={onClose}
            className={`p-1 hover:opacity-60 transition-opacity ${isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className={`flex items-center justify-center py-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Loading...
            </div>
          ) : error ? (
            <div className={`flex items-center justify-center py-8 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
              {error}
            </div>
          ) : likes.length === 0 ? (
            <div className={`flex items-center justify-center py-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              No likes yet
            </div>
          ) : (
            <div className="divide-y" style={{ divideColor: isDark ? '#334155' : '#e2e8f0' }}>
              {likes.map((like) => (
                <div
                  key={like.id}
                  className={`p-4 flex items-center justify-between ${isDark
                      ? 'hover:bg-slate-800'
                      : 'hover:bg-slate-50'
                    } transition-colors`}
                >
                  <div>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {like.userName}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {like.userRole}
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${isDark
                        ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white'
                        : 'bg-gradient-to-br from-blue-400 to-blue-600 text-white'
                      }`}
                  >
                    {like.userName.charAt(0).toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
