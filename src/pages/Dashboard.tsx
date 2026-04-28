import { Plus, Search, FileText, MoreVertical, Trash2, Copy, Download, ExternalLink, LogOut, User as UserIcon } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Resume } from '../types';
import { cn, formatDate } from '../lib/utils';

const STORAGE_KEY = 'elevate_resumes';

export default function Dashboard() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const fetchResumes = () => {
    setLoading(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const data: Resume[] = stored ? JSON.parse(stored) : [];
      setResumes(data.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleCreate = async () => {
    setCreating(true);
    try {
      const newResume: Resume = {
        id: crypto.randomUUID(),
        userId: 'guest',
        title: 'New Resume',
        templateId: 'minimalist',
        personalInfo: {
          fullName: '',
          email: '',
          phone: '',
          location: '',
          website: '',
          summary: '',
        },
        education: [],
        experience: [],
        skills: [],
        projects: [],
        certifications: [],
        achievements: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const updatedResumes = [newResume, ...resumes];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResumes));
      navigate(`/editor/${newResume.id}`);
    } catch (err) {
      console.error('Failed to create resume:', err);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this resume?')) return;
    try {
      const updatedResumes = resumes.filter(r => r.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResumes));
      setResumes(updatedResumes);
    } catch (err) {
      console.error('Failed to delete resume:', err);
    }
  };

  const filteredResumes = resumes.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <header className="h-16 border-b border-slate-200 bg-white flex items-center px-8 sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <div className="w-8 h-8 bg-slate-950 flex items-center justify-center text-white font-black rounded-xl rotate-12 italic text-lg shadow-lg">E</div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black leading-tight">Elevate</span>
            <span className="text-sm font-bold tracking-tight">Console</span>
          </div>
        </div>

        <div className="flex-1 max-w-lg mx-auto px-6 hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-slate-900 focus:bg-white transition-all outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-6 ml-auto">
          <div className="flex items-center gap-3">
             <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center overflow-hidden border border-slate-200">
                <UserIcon className="w-4 h-4 text-white" />
             </div>
             <div className="hidden sm:block text-left">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">Guest</p>
                <p className="text-sm font-bold text-slate-900 mt-1">Local Session</p>
             </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-8 md:p-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-1">
            <h1 className="text-4xl font-serif italic leading-tight">My Documents</h1>
            <p className="text-slate-400 text-sm font-medium">Manage and curate your professional profiles.</p>
          </div>
          <button 
            onClick={handleCreate}
            disabled={creating}
            className="flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50"
          >
            {creating ? <LoadingSpinner size={16} /> : <Plus className="w-4 h-4" />}
            New Resume
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3].map(i => <CardLoading key={i} />)}
          </div>
        ) : filteredResumes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResumes.map((resume) => (
              <motion.div
                key={resume.id}
                layoutId={resume.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <Link to={`/editor/${resume.id}`} className="block">
                  <div className="aspect-[3/4] bg-slate-100 flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <div className="flex gap-2 w-full">
                         <div className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl py-2 px-3 text-xs font-bold text-center">
                            Edit Resume
                         </div>
                      </div>
                    </div>
                    {/* Placeholder for Resume Thumbnail */}
                    <div className="w-[120px] h-[160px] bg-white shadow-xl rounded-sm p-4 space-y-2 group-hover:scale-110 transition-transform duration-500">
                       <div className="h-2 w-1/2 bg-blue-100 rounded" />
                       <div className="space-y-1">
                          <div className="h-1 w-full bg-slate-50 rounded" />
                          <div className="h-1 w-full bg-slate-50 rounded" />
                          <div className="h-1 w-3/4 bg-slate-50 rounded" />
                       </div>
                       <div className="h-2 w-1/3 bg-slate-100 rounded" />
                       <div className="space-y-1">
                          <div className="h-1 w-full bg-slate-50 rounded" />
                          <div className="h-1 w-full bg-slate-50 rounded" />
                       </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-800 truncate mb-1">{resume.title}</h3>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                       <span className="bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 capitalize">{resume.templateId}</span>
                       <span>Updated {formatDate(resume.updatedAt)}</span>
                    </div>
                  </div>
                </Link>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => handleDelete(resume.id, e)}
                    className="p-2 bg-white/90 backdrop-blur-sm shadow-sm rounded-xl text-red-500 hover:bg-white hover:text-red-700 transition-all border border-slate-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-xl font-bold">No resumes found</h2>
            <p className="text-slate-500 max-w-xs">You haven't created any resumes yet. Click the button above to get started.</p>
          </div>
        )}
      </main>
    </div>
  );
}

function CardLoading() {
  return (
    <div className="border border-slate-200 rounded-3xl overflow-hidden bg-white">
      <div className="aspect-[3/4] bg-slate-50 animate-pulse" />
      <div className="p-5 space-y-2">
        <div className="h-4 w-2/3 bg-slate-200 rounded animate-pulse" />
        <div className="h-3 w-1/3 bg-slate-100 rounded animate-pulse" />
      </div>
    </div>
  );
}

function LoadingSpinner({ size = 20 }: { size?: number }) {
  return <div 
    className="border-2 border-current border-t-transparent rounded-full animate-spin" 
    style={{ width: size, height: size }}
  />;
}
