import { Resume } from '../../types';
import ProfilePhoto from '../ProfilePhoto';

export default function TechTemplate({ resume }: { resume: Resume }) {
  const { personalInfo, education, experience, skills, projects } = resume;

  return (
    <div className="p-10 font-mono text-slate-800 bg-white min-h-screen border border-slate-200">
      <div className="border border-slate-900 overflow-hidden">
        <header className="grid grid-cols-12 border-b border-slate-900 bg-slate-900 text-white">
          <div className="col-span-8 p-10 border-r border-slate-800">
             <h1 className="text-4xl font-bold tracking-tight mb-2">{personalInfo.fullName || 'SYS.ADMIN'}</h1>
             <p className="text-sm opacity-60 uppercase tracking-[0.2em]">{personalInfo.location} / {personalInfo.email}</p>
             {resume.socialLinks && resume.socialLinks.length > 0 && (
                <div className="flex gap-4 mt-4 text-[10px] font-black underline uppercase tracking-tighter">
                   {resume.socialLinks.map((link) => (
                      <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-all">
                        {link.platform}
                      </a>
                   ))}
                </div>
             )}
          </div>
          <div className="col-span-4 p-10 flex flex-col justify-center items-end text-right space-y-4">
             <ProfilePhoto personalInfo={personalInfo} className="w-20 h-20 border-2 border-slate-800" />
             <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-slate-500">Contact Protocol</p>
                <p className="text-xs">{personalInfo.phone}</p>
                {personalInfo.website && <p className="text-xs underline">{personalInfo.website}</p>}
             </div>
          </div>
        </header>

        <section className="grid grid-cols-12 border-b border-slate-900">
          <div className="col-span-2 p-6 bg-slate-50 border-r border-slate-900 flex items-center justify-center">
            <span className="text-xs font-bold rotate-90 uppercase tracking-[0.5em] whitespace-nowrap">Summary</span>
          </div>
          <div className="col-span-10 p-10 text-sm leading-relaxed">
            {personalInfo.summary}
          </div>
        </section>

        <section className="grid grid-cols-12 border-b border-slate-900">
          <div className="col-span-2 p-6 bg-slate-50 border-r border-slate-900 flex items-center justify-center">
            <span className="text-xs font-bold rotate-90 uppercase tracking-[0.5em] whitespace-nowrap">Expertise</span>
          </div>
          <div className="col-span-10 p-10 flex flex-wrap gap-4">
             {skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-slate-100 border border-slate-300 text-[10px] font-bold">
                   {skill}
                </span>
             ))}
          </div>
        </section>

        <section className="grid grid-cols-12">
          <div className="col-span-2 p-6 bg-slate-50 border-r border-slate-900 flex items-center justify-center">
            <span className="text-xs font-bold rotate-90 uppercase tracking-[0.5em] whitespace-nowrap">History</span>
          </div>
          <div className="col-span-10 divide-y divide-slate-200">
             {experience.map((exp) => (
                <div key={exp.id} className="p-10 space-y-4">
                  <div className="flex justify-between items-baseline underline underline-offset-4">
                    <h3 className="text-lg font-bold">{exp.position}</h3>
                    <span className="text-[10px]">{exp.startDate} - {exp.endDate || 'INF'}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-400 capitalize">{exp.company}</p>
                  <p className="text-xs leading-relaxed text-slate-600 whitespace-pre-wrap">{exp.description}</p>
                </div>
             ))}
          </div>
        </section>

        {resume.projects && resume.projects.length > 0 && (
          <section className="grid grid-cols-12 border-t border-slate-900 border-b">
            <div className="col-span-2 p-6 bg-slate-50 border-r border-slate-900 flex items-center justify-center">
              <span className="text-xs font-bold rotate-90 uppercase tracking-[0.5em] whitespace-nowrap">Projects</span>
            </div>
            <div className="col-span-10 p-10 grid grid-cols-3 gap-8">
               {resume.projects.map((proj) => (
                  <div key={proj.id} className="space-y-2 group">
                    <h4 className="font-bold text-xs underline decoration-slate-300 group-hover:decoration-slate-900">{proj.name}</h4>
                    <p className="text-[10px] text-slate-500 line-clamp-4">{proj.description}</p>
                    {proj.link && <p className="text-[9px] font-bold text-slate-900 truncate">LINK: {proj.link}</p>}
                  </div>
               ))}
            </div>
          </section>
        )}
        
        {education.length > 0 && (
          <section className="grid grid-cols-12 border-t border-slate-900">
            <div className="col-span-2 p-6 bg-slate-50 border-r border-slate-900 flex items-center justify-center">
              <span className="text-xs font-bold rotate-90 uppercase tracking-[0.5em] whitespace-nowrap">Academic</span>
            </div>
            <div className="col-span-10 p-10 grid grid-cols-2 gap-10">
               {education.map((edu) => (
                  <div key={edu.id} className="space-y-2">
                    <h4 className="font-bold text-sm">{edu.degree}</h4>
                    <p className="text-[10px] text-slate-400">{edu.institution}</p>
                    <p className="text-[10px]">{edu.startDate} - {edu.endDate}</p>
                  </div>
               ))}
            </div>
          </section>
        )}

        {resume.achievements && resume.achievements.length > 0 && (
           <section className="grid grid-cols-12 border-t border-slate-900">
             <div className="col-span-2 p-6 bg-slate-50 border-r border-slate-900 flex items-center justify-center">
               <span className="text-xs font-bold rotate-90 uppercase tracking-[0.5em] whitespace-nowrap">Distinction</span>
             </div>
             <div className="col-span-10 p-10 space-y-4">
                {resume.achievements.map((ach, i) => (
                   <div key={i} className="flex gap-4 items-start">
                     <span className="text-[10px] font-bold text-slate-300 min-w-[40px]">[{String(i+1).padStart(3, '0')}]</span>
                     <p className="text-xs font-bold text-slate-800 leading-relaxed uppercase">{ach}</p>
                   </div>
                ))}
             </div>
           </section>
        )}
      </div>
      <div className="mt-6 flex items-center justify-between opacity-30 text-[9px] font-bold uppercase tracking-widest">
         <span>Version: PR-2026.04.12</span>
         <span>Checksum: 8XF7...92AA</span>
      </div>
    </div>
  );
}
