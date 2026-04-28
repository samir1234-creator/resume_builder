import { User, GraduationCap, Briefcase, Code, Award, Target, Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Check, Share2, Camera, Image as ImageIcon, Frame, CheckCircle2, Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Resume, Education, Experience, Project } from '../types';
import { cn } from '../lib/utils';

interface Props {
  resume: Resume;
  onUpdate: (data: Partial<Resume>) => void;
}

type SectionKey = 'personal' | 'education' | 'experience' | 'skills' | 'projects' | 'achievements' | 'social';

export default function ResumeForm({ resume, onUpdate }: Props) {
  const [openSection, setOpenSection] = useState<SectionKey>('personal');
  const [savedEntries, setSavedEntries] = useState<Record<string, boolean>>({});

  const toggleSection = (section: SectionKey) => {
    setOpenSection(openSection === section ? 'personal' : section);
  };

  const markAsSaved = (id: string) => {
    setSavedEntries(prev => ({ ...prev, [id]: true }));
    // Automatically hide after some time or keep it hidden until next change
  };

  const handleFieldChange = (id: string) => {
    if (savedEntries[id]) {
      setSavedEntries(prev => ({ ...prev, [id]: false }));
    }
  };

  const updatePersonalInfo = (field: string, value: any) => {
    onUpdate({
      personalInfo: { ...resume.personalInfo, [field]: value }
    });
  };

  const updatePersonalInfoMulti = (updates: any) => {
    onUpdate({
      personalInfo: { ...resume.personalInfo, ...updates }
    });
  };

  const compressImage = (dataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400; // Profile pics don't need to be huge
        const MAX_HEIGHT = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8)); // High quality compression
      };
      img.src = dataUrl;
    });
  };

  const addItem = (key: 'education' | 'experience' | 'projects' | 'socialLinks') => {
    const newItem: any = { id: crypto.randomUUID() };
    if (key === 'education') {
      newItem.institution = '';
      newItem.degree = '';
      newItem.startDate = '';
      newItem.endDate = '';
      newItem.description = '';
    } else if (key === 'experience') {
      newItem.company = '';
      newItem.position = '';
      newItem.startDate = '';
      newItem.endDate = '';
      newItem.description = '';
    } else if (key === 'projects') {
      newItem.name = '';
      newItem.description = '';
      newItem.link = '';
    } else if (key === 'socialLinks') {
      newItem.platform = '';
      newItem.url = '';
    }
    onUpdate({ [key]: [...(resume[key] || []), newItem] });
  };

  const updateItem = (key: 'education' | 'experience' | 'projects' | 'socialLinks', id: string, data: any) => {
    const newList = ((resume[key] || []) as any[]).map(item => item.id === id ? { ...item, ...data } : item);
    onUpdate({ [key]: newList });
  };

  const removeItem = (key: 'education' | 'experience' | 'projects' | 'socialLinks' | 'skills' | 'achievements', indexOrId: string | number) => {
    if (typeof indexOrId === 'string') {
      const newList = (resume[key as any] as any[]).filter(item => item.id !== indexOrId);
      onUpdate({ [key]: newList });
    } else {
      const newList = [...(resume[key as any] as any[])];
      newList.splice(indexOrId, 1);
      onUpdate({ [key]: newList });
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-10 py-4 space-y-2">
      <div className="py-8 mb-4">
        <h2 className="text-3xl font-serif italic text-slate-900">Editor</h2>
        <p className="text-sm text-slate-400 font-medium">Refine your professional credentials.</p>
      </div>
      {/* Personal Info */}
      <CollapsibleSection 
        title="Personal Information" 
        icon={User} 
        isOpen={openSection === 'personal'} 
        onToggle={() => toggleSection('personal')}
      >
        <div className="grid grid-cols-1 gap-6 p-1">
          <Input label="Full Name" value={resume.personalInfo.fullName} onChange={(v) => { updatePersonalInfo('fullName', v); handleFieldChange('personal'); }} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Email Address" value={resume.personalInfo.email} onChange={(v) => { updatePersonalInfo('email', v); handleFieldChange('personal'); }} />
            <Input label="Phone Number" value={resume.personalInfo.phone} onChange={(v) => { updatePersonalInfo('phone', v); handleFieldChange('personal'); }} />
          </div>
          <Input label="Location" value={resume.personalInfo.location} onChange={(v) => { updatePersonalInfo('location', v); handleFieldChange('personal'); }} />
          <Input label="Website / Link" value={resume.personalInfo.website} onChange={(v) => { updatePersonalInfo('website', v); handleFieldChange('personal'); }} />
          <TextArea label="Professional Overview" value={resume.personalInfo.summary} onChange={(v) => { updatePersonalInfo('summary', v); handleFieldChange('personal'); }} />
          
          <div className="space-y-6 pt-6 border-t border-slate-50">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                      <Camera className="w-4 h-4" />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">Image Settings</span>
                </div>
                <div 
                   onClick={() => { updatePersonalInfo('showPhoto', !resume.personalInfo.showPhoto); handleFieldChange('personal'); }}
                   className="flex items-center gap-3 cursor-pointer group"
                >
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-900 transition-colors">Show on resume</span>
                   <div 
                      className={cn(
                         "w-10 h-5 rounded-full transition-all relative",
                         resume.personalInfo.showPhoto ? "bg-slate-900" : "bg-slate-200"
                      )}
                   >
                      <div className={cn(
                         "absolute top-1 w-3 h-3 rounded-full bg-white transition-all",
                         resume.personalInfo.showPhoto ? "left-6" : "left-1"
                      )} />
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Upload */}
                <div className="space-y-4">
                   <div 
                      className={cn(
                         "aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 hover:border-slate-900 hover:bg-slate-50 transition-all cursor-pointer relative overflow-hidden group",
                         resume.personalInfo.photoURL && "border-solid border-slate-100"
                      )}
                      onClick={() => document.getElementById('photo-upload')?.click()}
                   >
                      {resume.personalInfo.photoURL ? (
                         <>
                            <img 
                               src={resume.personalInfo.photoURL} 
                               alt="Profile" 
                               className={cn(
                                  "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                                  resume.personalInfo.photoFrame === 'circle' ? "rounded-full" : 
                                  resume.personalInfo.photoFrame === 'rounded' ? "rounded-3xl" : "rounded-none"
                               )}
                            />
                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-900">
                                  <Upload className="w-4 h-4" />
                               </div>
                               <div 
                                  onClick={(e) => { e.stopPropagation(); updatePersonalInfo('photoURL', ''); }}
                                  className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white"
                               >
                                  <Trash2 className="w-4 h-4" />
                               </div>
                            </div>
                         </>
                      ) : (
                         <>
                            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-colors">
                               <ImageIcon className="w-6 h-6" />
                            </div>
                            <div className="text-center">
                               <p className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Upload Photo</p>
                               <p className="text-[9px] text-slate-400 mt-1 uppercase tracking-tight">JPG, PNG up to 2MB</p>
                            </div>
                         </>
                      )}
                      <input 
                         id="photo-upload"
                         type="file" 
                         accept="image/*" 
                         className="hidden" 
                         onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                               const reader = new FileReader();
                               reader.onloadend = async () => {
                                  const compressed = await compressImage(reader.result as string);
                                  updatePersonalInfoMulti({
                                     photoURL: compressed,
                                     showPhoto: true,
                                     photoFrame: resume.personalInfo.photoFrame || 'circle'
                                  });
                                  handleFieldChange('personal');
                               };
                               reader.readAsDataURL(file);
                            }
                         }}
                      />
                   </div>
                </div>

                {/* Frame Selection */}
                <div className="space-y-6">
                   <div className="space-y-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Frame Style</p>
                      <div className="grid grid-cols-1 gap-3">
                         {[
                            { id: 'circle', label: 'Circle', desc: 'Modern & Clean' },
                            { id: 'rounded', label: 'Rounded', desc: 'Soft & Friendly' },
                            { id: 'square', label: 'Square', desc: 'Classic & Bold' }
                         ].map((frame) => (
                            <button
                               key={frame.id}
                               onClick={() => updatePersonalInfo('photoFrame', frame.id)}
                               className={cn(
                                  "flex items-center gap-4 p-4 rounded-xl border transition-all text-left group",
                                  resume.personalInfo.photoFrame === frame.id 
                                     ? "border-slate-900 bg-slate-900 text-white shadow-lg" 
                                     : "border-slate-100 bg-white hover:border-slate-200"
                               )}
                            >
                               <div className={cn(
                                  "w-10 h-10 border-2 shrink-0 transition-all",
                                  resume.personalInfo.photoFrame === frame.id ? "border-white/20" : "border-slate-100 group-hover:border-slate-200",
                                  frame.id === 'circle' ? "rounded-full" : 
                                  frame.id === 'rounded' ? "rounded-lg" : "rounded-none"
                               )} />
                               <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest">{frame.label}</p>
                                  <p className={cn(
                                     "text-[9px] mt-0.5 uppercase tracking-tight",
                                     resume.personalInfo.photoFrame === frame.id ? "text-slate-400" : "text-slate-400"
                                  )}>{frame.desc}</p>
                               </div>
                               {resume.personalInfo.photoFrame === frame.id && (
                                  <CheckCircle2 className="w-4 h-4 ml-auto text-white" />
                                )}
                            </button>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>
          
          <AnimatePresence>
            {!savedEntries['personal'] && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex justify-end pt-4"
              >
                <button 
                  onClick={() => markAsSaved('personal')}
                  className="px-8 py-3 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg"
                >
                  <Check className="w-3.5 h-3.5" /> Save Profile
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CollapsibleSection>

      {/* Experience */}
      <CollapsibleSection 
        title="Experience" 
        icon={Briefcase} 
        isOpen={openSection === 'experience'} 
        onToggle={() => toggleSection('experience')}
      >
        <div className="space-y-10">
          {resume.experience.map((exp) => (
            <div key={exp.id} className="relative space-y-6 pt-4 border-t border-slate-50 first:border-0 first:pt-0 group">
              <button 
                onClick={() => removeItem('experience', exp.id)}
                className="absolute top-4 right-0 p-2 text-slate-200 hover:text-red-500 transition-colors"
                title="Remove position"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <Input label="Position Title" value={exp.position} onChange={(v) => { updateItem('experience', exp.id, { position: v }); handleFieldChange(exp.id); }} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Input label="Company" value={exp.company} onChange={(v) => { updateItem('experience', exp.id, { company: v }); handleFieldChange(exp.id); }} />
                 <div className="flex gap-4">
                    <div className="flex-1">
                       <Input label="Start Date" value={exp.startDate} onChange={(v) => { updateItem('experience', exp.id, { startDate: v }); handleFieldChange(exp.id); }} />
                    </div>
                    <div className="flex-1">
                       <Input label="End Date" value={exp.endDate} onChange={(v) => { updateItem('experience', exp.id, { endDate: v }); handleFieldChange(exp.id); }} />
                    </div>
                 </div>
              </div>
              <TextArea label="Responsibilities & Impact" value={exp.description} onChange={(v) => { updateItem('experience', exp.id, { description: v }); handleFieldChange(exp.id); }} />
              
              <AnimatePresence>
                {!savedEntries[exp.id] && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex justify-end pt-2"
                  >
                    <button 
                      onClick={() => markAsSaved(exp.id)}
                      className="px-6 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-slate-800 transition-all flex items-center gap-2"
                    >
                      <Check className="w-3 h-3" /> Save Entry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <button 
            onClick={() => addItem('experience')}
            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:border-slate-900 hover:text-slate-900 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Position
          </button>
        </div>
      </CollapsibleSection>

      {/* Education */}
      <CollapsibleSection 
        title="Education" 
        icon={GraduationCap} 
        isOpen={openSection === 'education'} 
        onToggle={() => toggleSection('education')}
      >
        <div className="space-y-10">
          {resume.education.map((edu) => (
            <div key={edu.id} className="relative space-y-6 group p-1">
              <button 
                onClick={() => removeItem('education', edu.id)}
                className="absolute top-0 right-0 p-2 text-slate-200 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <Input label="Degree / Certification" value={edu.degree} onChange={(v) => { updateItem('education', edu.id, { degree: v }); handleFieldChange(edu.id); }} />
              <Input label="Institution" value={edu.institution} onChange={(v) => { updateItem('education', edu.id, { institution: v }); handleFieldChange(edu.id); }} />
              <div className="grid grid-cols-2 gap-6">
                <Input label="Start Date" value={edu.startDate} onChange={(v) => { updateItem('education', edu.id, { startDate: v }); handleFieldChange(edu.id); }} />
                <Input label="End Date" value={edu.endDate} onChange={(v) => { updateItem('education', edu.id, { endDate: v }); handleFieldChange(edu.id); }} />
              </div>
              
              <AnimatePresence>
                {!savedEntries[edu.id] && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-end pt-2"
                  >
                    <button 
                      onClick={() => markAsSaved(edu.id)}
                      className="px-6 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-slate-800 transition-all flex items-center gap-2"
                    >
                      <Check className="w-3 h-3" /> Save Entry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <button 
            onClick={() => addItem('education')}
            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:border-slate-900 hover:text-slate-900 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Academic Credential
          </button>
        </div>
      </CollapsibleSection>

      {/* Skills */}
      <CollapsibleSection 
        title="Core Focus" 
        icon={Code} 
        isOpen={openSection === 'skills'} 
        onToggle={() => toggleSection('skills')}
      >
        <div className="space-y-6">
           <div className="flex flex-wrap gap-2 pt-2">
              {resume.skills.map((skill, i) => (
                <div key={i} className="bg-slate-900 text-white px-4 py-2 rounded-full flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest group">
                  {skill}
                  <button onClick={() => removeItem('skills', i)} className="text-white/40 hover:text-white"><Trash2 className="w-3 h-3" /></button>
                </div>
              ))}
           </div>
           <div className="group">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-slate-900 transition-colors">Add Competency</label>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  placeholder="Type a skill..."
                  className="flex-1 bg-white border-b border-slate-200 py-3 text-base font-medium focus:border-slate-900 outline-none transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const val = (e.target as HTMLInputElement).value.trim();
                      if (val) {
                        onUpdate({ skills: [...resume.skills, val] });
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
                <button 
                   onClick={(e) => {
                     const input = (e.currentTarget.previousSibling as HTMLInputElement);
                     const val = input.value.trim();
                     if (val) {
                        onUpdate({ skills: [...resume.skills, val] });
                        input.value = '';
                     }
                   }}
                   className="px-6 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-slate-800 transition-all flex items-center gap-2 shrink-0"
                >
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>
           </div>
        </div>
      </CollapsibleSection>

      {/* Projects */}
      <CollapsibleSection 
        title="Projects" 
        icon={Target} 
        isOpen={openSection === 'projects'} 
        onToggle={() => toggleSection('projects')}
      >
        <div className="space-y-6">
          {resume.projects.map((proj) => (
            <div key={proj.id} className="relative p-6 border rounded-2xl bg-white space-y-4 group">
              <button 
                onClick={() => removeItem('projects', proj.id)}
                className="absolute -top-2 -right-2 p-1.5 bg-red-50 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all border border-red-100 hover:bg-red-500 hover:text-white"
              >
                <Trash2 className="w-3 h-3" />
              </button>
              <Input label="Project Name" value={proj.name} onChange={(v) => { updateItem('projects', proj.id, { name: v }); handleFieldChange(proj.id); }} />
              <Input label="Link" value={proj.link} onChange={(v) => { updateItem('projects', proj.id, { link: v }); handleFieldChange(proj.id); }} />
              <TextArea label="Description" value={proj.description} onChange={(v) => { updateItem('projects', proj.id, { description: v }); handleFieldChange(proj.id); }} />
              
              <AnimatePresence>
                {!savedEntries[proj.id] && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-end pt-2"
                  >
                    <button 
                      onClick={() => markAsSaved(proj.id)}
                      className="px-6 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-slate-800 transition-all flex items-center gap-2"
                    >
                      <Check className="w-3 h-3" /> Save Entry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <button 
            onClick={() => addItem('projects')}
            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:border-slate-900 hover:text-slate-900 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
      </CollapsibleSection>

      {/* Achievements */}
      <CollapsibleSection 
        title="Distinctions" 
        icon={Award} 
        isOpen={openSection === 'achievements'} 
        onToggle={() => toggleSection('achievements')}
      >
        <div className="space-y-6">
           <div className="flex flex-col gap-3">
              {resume.achievements?.map((ach, i) => (
                <div key={i} className="flex items-center gap-4 group bg-slate-50 p-4 rounded-xl border border-transparent hover:border-slate-200 transition-all">
                  <div className="w-2 h-2 rounded-full bg-slate-900 shrink-0" />
                  <span className="text-sm font-medium text-slate-700 flex-1">{ach}</span>
                  <button 
                    onClick={() => removeItem('achievements', i)} 
                    className="p-1 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
           </div>
           <div className="group">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-slate-900 transition-colors">Add Achievement</label>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  placeholder="Honors, awards, or key results..."
                  className="flex-1 bg-white border-b border-slate-200 py-3 text-base font-medium focus:border-slate-900 outline-none transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const val = (e.target as HTMLInputElement).value.trim();
                      if (val) {
                        onUpdate({ achievements: [...(resume.achievements || []), val] });
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
                <button 
                   onClick={(e) => {
                     const input = (e.currentTarget.previousSibling as HTMLInputElement);
                     const val = input.value.trim();
                     if (val) {
                        onUpdate({ achievements: [...(resume.achievements || []), val] });
                        input.value = '';
                     }
                   }}
                   className="px-6 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-slate-800 transition-all flex items-center gap-2 shrink-0"
                >
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>
           </div>
        </div>
      </CollapsibleSection>

      {/* Social Links */}
      <CollapsibleSection 
        title="Social Profiles" 
        icon={Share2} 
        isOpen={openSection === 'social'} 
        onToggle={() => toggleSection('social')}
      >
        <div className="space-y-8">
          {resume.socialLinks?.map((link) => (
            <div key={link.id} className="relative space-y-6 group p-1 border-b border-slate-50 pb-8 last:border-0 last:pb-0">
              <button 
                onClick={() => removeItem('socialLinks', link.id)}
                className="absolute top-0 right-0 p-2 text-slate-200 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Platform Name (e.g. LinkedIn)" 
                  value={link.platform} 
                  onChange={(v: string) => { updateItem('socialLinks', link.id, { platform: v }); handleFieldChange(link.id); }} 
                />
                <Input 
                  label="Profile URL" 
                  value={link.url} 
                  onChange={(v: string) => { updateItem('socialLinks', link.id, { url: v }); handleFieldChange(link.id); }} 
                />
              </div>
              
              <AnimatePresence>
                {!savedEntries[link.id] && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-end pt-2"
                  >
                    <button 
                      onClick={() => markAsSaved(link.id)}
                      className="px-6 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-slate-800 transition-all flex items-center gap-2"
                    >
                      <Check className="w-3 h-3" /> Save Link
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <button 
            type="button"
            onClick={() => addItem('socialLinks')}
            className="w-full py-4 border-2 border-dashed border-slate-100 rounded-2xl text-slate-300 hover:border-slate-900 hover:text-slate-900 transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
          >
            <Plus className="w-4 h-4" /> Add Social Profile
          </button>
        </div>
      </CollapsibleSection>
    </div>
  );
}

function CollapsibleSection({ title, icon: Icon, isOpen, onToggle, children }: any) {
  return (
    <div className={cn("border-b border-slate-100 transition-all", isOpen ? "bg-white" : "bg-white")}>
      <button 
        onClick={onToggle}
        className="w-full py-8 flex items-center justify-between group"
      >
        <div className="flex items-center gap-6">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-all", isOpen ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 group-hover:text-slate-900 group-hover:bg-slate-100")}>
            <Icon className="w-5 h-5" />
          </div>
          <span className={cn("text-xl font-serif italic transition-colors", isOpen ? "text-slate-900" : "text-slate-400 group-hover:text-slate-900")}>{title}</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-300" /> : <ChevronDown className="w-4 h-4 text-slate-300" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pb-10 pt-2 animate-in fade-in slide-in-from-top-2 duration-500">
               {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Input({ label, value, onChange, placeholder }: any) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-slate-900 transition-colors">{label}</label>
      <input 
        type="text" 
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border-b border-slate-200 py-3 text-base font-medium focus:border-slate-900 outline-none transition-colors placeholder:text-slate-200"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder }: any) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-slate-900 transition-colors">{label}</label>
      <textarea 
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-sm font-medium focus:border-slate-900 focus:bg-white outline-none transition-all resize-none placeholder:text-slate-300 leading-relaxed"
      />
    </div>
  );
}
