import React, { useState, useEffect } from 'react';
import { LogIn, LogOut, CheckCircle2, User as UserIcon } from 'lucide-react';
import { Button } from './ui/Button';
import { apiService } from '../services/api';

interface GoogleAuthButtonProps {
  onSuccess?: (userData: any) => void;
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ onSuccess }) => {
  const [user, setUser] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('careerbridge_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleGoogleSignIn = async (simulatedProfile?: { name: string; email: string; picture?: string }) => {
    setIsLoading(true);
    try {
      const payloadProfile = simulatedProfile || {
        name: 'Aarav Sharma',
        email: 'aarav.sharma@gmail.com',
        picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      };

      const result = await apiService.loginWithGoogle('mock_google_id_token_xyz123', payloadProfile);
      setUser(result);
      if (onSuccess) onSuccess(result);
      setShowModal(false);
    } catch (err) {
      console.error('Google Auth Failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('careerbridge_token');
    localStorage.removeItem('careerbridge_user');
    setUser(null);
  };

  if (user) {
    return (
      <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 shadow-sm">
        <div className="relative">
          {user.picture ? (
            <img src={user.picture} alt={user.full_name} className="w-7 h-7 rounded-full object-cover border border-blue-500/50" />
          ) : (
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              {user.full_name?.charAt(0) || 'U'}
            </div>
          )}
          <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-slate-900" />
        </div>

        <div className="text-left hidden sm:block">
          <p className="text-xs font-bold text-slate-100 leading-tight">{user.full_name}</p>
          <p className="text-[10px] text-slate-400 leading-tight">{user.email}</p>
        </div>

        <button
          onClick={handleSignOut}
          title="Sign Out"
          className="text-slate-400 hover:text-rose-400 p-1 transition-colors rounded-lg hover:bg-slate-800"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-100 px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-md hover:border-slate-600 transition-all duration-200"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        Sign in with Google
      </button>

      {/* Google Auth Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-5 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">Google OAuth Account Sign In</h3>
                  <p className="text-xs text-slate-400">Select a Google Account to sign in with JWT</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-300">Choose an Account to Authenticate:</p>
              
              <button
                onClick={() =>
                  handleGoogleSignIn({
                    name: 'Aarav Sharma',
                    email: 'aarav.sharma@gmail.com',
                    picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                  })
                }
                className="w-full flex items-center justify-between p-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                    AS
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-100">Aarav Sharma</p>
                    <p className="text-[11px] text-slate-400">aarav.sharma@gmail.com</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-blue-400">Candidate</span>
              </button>

              <button
                onClick={() =>
                  handleGoogleSignIn({
                    name: 'Rajesh Kumar (MSME Owner)',
                    email: 'rajesh.apparel@gmail.com',
                    picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
                  })
                }
                className="w-full flex items-center justify-between p-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">
                    RK
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-100">Rajesh Kumar</p>
                    <p className="text-[11px] text-slate-400">rajesh.apparel@gmail.com</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400">MSME Enterprise</span>
              </button>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">🔐 Secure JWT Bearer Token</p>
              <p>Authenticating creates a signed 256-bit JWT access token stored in localStorage for secure API communication.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
