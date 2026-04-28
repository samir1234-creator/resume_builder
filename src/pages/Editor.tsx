import { ChevronLeft, Download, FileText, Layout, Save, Settings, Share2, Eye, EyeOff, Loader2, Check, ExternalLink, FileOutput, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Resume, TemplateId } from '../types';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import { cn } from '../lib/utils';
import { exportToDocx } from '../lib/exportDocx';

const STORAGE_KEY = 'elevate_resumes';

export default function Editor() {
  const { id } = useParams<{ id: string }>();
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const navigate = useNavigate();
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
        setShowExportOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    const handleComplete = () => setIsGeneratingPdf(false);
    window.addEventListener('pdf-complete', handleComplete);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('pdf-complete', handleComplete);
    };
  }, []);

  useEffect(() => {
    const fetchResume = () => {
      if (!id) return;
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const data: Resume[] = stored ? JSON.parse(stored) : [];
        const found = data.find(r => r.id === id);
        if (found) {
          setResume(found);
        } else {
          navigate('/dashboard');
        }
      } catch (err) {
        console.error('Failed to fetch resume:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id, navigate]);

  const saveResume = (updatedResume: Resume) => {
    setSaving(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const data: Resume[] = stored ? JSON.parse(stored) : [];
      const updatedData = data.map(r => r.id === id ? { ...updatedResume, updatedAt: new Date().toISOString() } : r);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      setLastSaved(new Date());
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = (updatedData: Partial<Resume>) => {
    setResume(prev => {
      if (!prev) return null;
      const newState = { ...prev, ...updatedData };
      saveResume(newState);
      return newState;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="flex flex-col items-center gap-6">
           <div className="w-16 h-16 bg-white rounded-2xl rotate-12 flex items-center justify-center shadow-2xl relative animate-bounce">
              <span className="text-2xl font-black text-slate-950 -rotate-12 italic">E</span>
           </div>
           <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Restoring Workspace</p>
        </div>
      </div>
    );
  }

  if (!resume) return null;

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* Editor Header */}
      <header className="h-16 border-b border-slate-200 bg-white flex items-center px-8 shrink-0 z-50">
        <div className="flex items-center gap-6">
          <Link 
            to="/dashboard" 
            className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-900"
            title="Back to Dashboard"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="w-8 h-8 bg-slate-950 flex items-center justify-center text-white font-black rounded-xl rotate-12 italic text-sm shadow-lg shrink-0">E</div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold leading-tight">Document</span>
            <input 
              type="text" 
              value={resume.title}
              onChange={(e) => handleUpdate({ title: e.target.value })}
              className="font-semibold text-sm bg-transparent border-none focus:ring-0 w-40 sm:w-64 p-0 truncate"
            />
          </div>
        </div>

        <div className="flex-1 flex justify-center">
           <div className="bg-slate-100 p-1 rounded-full flex gap-1 sm:hidden">
              <button 
                onClick={() => setActiveTab('edit')}
                className={cn(
                  "px-5 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all",
                  activeTab === 'edit' ? "bg-slate-900 text-white shadow-lg" : "text-slate-400"
                )}
              >
                Edit
              </button>
              <button 
                onClick={() => setActiveTab('preview')}
                className={cn(
                  "px-5 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all",
                  activeTab === 'preview' ? "bg-slate-900 text-white shadow-lg" : "text-slate-400"
                )}
              >
                Preview
              </button>
           </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 mr-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
             {saving ? (
               <span className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse" />
                 Saving
               </span>
             ) : lastSaved ? (
               <span className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                 Ready
               </span>
             ) : null}
          </div>
          
          <button 
             onClick={() => setShowTemplates(!showTemplates)}
             className={cn(
               "p-2 text-xs font-bold uppercase tracking-widest transition-all",
               showTemplates ? "text-slate-900" : "text-slate-400 hover:text-slate-900"
             )}
             title="Switch Template"
          >
            Templates
          </button>

          <button 
             onClick={() => {
               navigator.clipboard.writeText(window.location.href);
               alert('Link copied to clipboard!');
             }}
             className="p-2 text-slate-400 hover:text-slate-900 transition-all"
             title="Share Workspace Link"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <div className="relative" ref={exportRef}>
            <button 
              onClick={() => setShowExportOptions(!showExportOptions)}
              disabled={isGeneratingPdf}
              className="bg-slate-900 text-white px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Generating...
                </>
              ) : 'Export PDF'}
            </button>

            <AnimatePresence>
              {showExportOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-[100]"
                >
                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => {
                        setIsGeneratingPdf(true);
                        window.dispatchEvent(new CustomEvent('export-pdf'));
                        setShowExportOptions(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 rounded-xl transition-colors text-left text-slate-900"
                    >
                      Export PDF
                      <FileText className="w-3 h-3 opacity-50" />
                    </button>
                    <button
                      onClick={() => {
                        exportToDocx(resume);
                        setShowExportOptions(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 rounded-xl transition-colors text-left text-slate-900"
                    >
                      Export DOCX
                      <FileOutput className="w-3 h-3 opacity-50" />
                    </button>
                    <div className="h-px bg-slate-100 my-1 mx-2" />
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this entire resume? This action cannot be undone.')) {
                          try {
                            const stored = localStorage.getItem(STORAGE_KEY);
                            const data: Resume[] = stored ? JSON.parse(stored) : [];
                            const updatedData = data.filter(r => r.id !== id);
                            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
                            navigate('/dashboard');
                          } catch (err) {
                            console.error(err);
                          }
                        }
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-red-50 text-red-500 rounded-xl transition-colors text-left"
                    >
                      Delete Resume
                      <Trash2 className="w-3 h-3 opacity-50" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Templates Overlay */}
        <AnimatePresence>
          {showTemplates && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="absolute left-0 top-0 bottom-0 w-80 bg-white border-r z-40 shadow-2xl p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg">Templates</h2>
                <button onClick={() => setShowTemplates(false)} className="text-slate-400 hover:text-slate-600">
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
              <TemplateSelector 
                selected={resume.templateId as TemplateId} 
                onSelect={(id) => handleUpdate({ templateId: id })} 
                onClose={() => setShowTemplates(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sidebar / Form */}
        <div className={cn(
          "flex-1 md:w-[480px] md:flex-none border-r border-slate-200 bg-white flex flex-col overflow-hidden",
          activeTab === 'preview' ? 'hidden sm:flex' : 'flex'
        )}>
           <ResumeForm resume={resume} onUpdate={handleUpdate} />
        </div>

        {/* Preview Area */}
        <div className={cn(
          "flex-1 bg-brand-bg overflow-y-auto p-12 scroll-smooth",
          activeTab === 'edit' ? 'hidden sm:block' : 'block'
        )}>
          <div className="max-w-[850px] mx-auto shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] bg-white origin-top">
            <ResumePreview resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
}
