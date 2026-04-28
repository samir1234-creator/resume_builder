import { signInWithPopup } from 'firebase/auth';
import { motion } from 'motion/react';
import { FileText, Github, Chrome, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../lib/firebase';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login with Google');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 space-y-8 relative overflow-hidden border border-slate-100"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-900" />
        
        <div className="flex flex-col items-center text-center space-y-2">
          <Link to="/" className="absolute top-8 left-8 text-slate-400 hover:text-slate-950 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center shadow-lg rotate-12 mb-4">
             <span className="text-3xl font-black text-white italic -rotate-12">E</span>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-950">Elevate CV</h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">Access your workstation</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-xl text-center">
            {error}
          </div>
        )}

        <div className="space-y-4 pt-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-4 border border-slate-200 rounded-2xl font-bold text-xs uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <Chrome className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Continue with Google
          </button>
        </div>

        <div className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-300">
          Crafted with love by Samir
        </div>

        {loading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-3xl">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </motion.div>
    </div>
  );
}
