import React, { useState, useEffect } from 'react';
import { Grid } from './Grid';
import { fetchUser } from './api';
import { LogIn, LogOut, CheckSquare } from 'lucide-react';

function App() {
  const [user, setUser] = useState<any>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    fetchUser().then((u) => {
      if (u) setUser(u);
    });
  }, []);

  const handleRateLimit = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/github';
  };

  const handleLogout = async () => {
    await fetch('http://localhost:3000/auth/logout', { method: 'POST', credentials: 'initiate' });
    setUser(null);
  };

  return (
    <div className="h-screen w-screen flex flex-col p-6 overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 z-10 relative">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg border border-primary/30">
            <CheckSquare className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              1 Million Checkboxes
            </h1>
            <p className="text-sm text-gray-400 font-medium tracking-wide">
              Realtime Collaborative Grid
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4 glass px-4 py-2 rounded-full">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-gray-300 font-medium">{user.username || 'Authenticated'}</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <button 
                onClick={handleLogout}
                className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="glass hover:bg-white/10 transition-colors px-6 py-2.5 rounded-full flex items-center gap-2 text-sm font-semibold text-white group"
            >
              <LogIn className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              Sign in with GitHub
            </button>
          )}
        </div>
      </header>

      {/* Main Grid Area */}
      <main className="flex-1 relative z-0">
        <Grid onRateLimit={handleRateLimit} user={user} />
      </main>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-red-500/20 border border-red-500/50 backdrop-blur-md text-red-100 px-6 py-3 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.2)] font-medium flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
