import { Resume } from '../../types';
import ProfilePhoto from '../ProfilePhoto';

export default function BoldTemplate({ resume }: { resume: Resume }) {
  const { personalInfo, education, experience, skills, projects } = resume;

  return (
    <div className="p-16 font-sans text-slate-900 bg-white min-h-screen relative overflow-hidden border border-slate-200">
      {/* Mega Background Initial */}
      <div className="absolute -bottom-20 -right-20 text-[25rem] font-black text-slate-50 leading-none select-none -z-0">
        {personalInfo.fullName?.charAt(0) || 'R'}
      </div>

      <div className="relative z-10">
        <header className="mb-20 grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-8">
            <h1 className="text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-6">
              {personalInfo.fullName?.split(' ')[0] || 'FIRST'} <br/>
              <span className="text-slate-400">{personalInfo.fullName?.split(' ').slice(1).join(' ') || 'LAST'}</span>
            </h1>
            <p className="text-2xl font-bold tracking-tight text-slate-800 italic max-w-xl">
              {personalInfo.summary}
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 text-right flex flex-col gap-4 justify-end pt-4 items-end">
             <ProfilePhoto personalInfo={personalInfo} className="w-24 h-24 mb-2 shadow-2xl" />
             <div className="flex flex-col gap-1">
               <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">Contact</p>
               <p className="text-sm font-black">{personalInfo.email}</p>
               <p className="text-sm font-black">{personalInfo.phone}</p>
               <p className="text-sm font-black">{personalInfo.location}</p>
               {personalInfo.website && <p className="text-sm font-black border-b border-slate-900 inline-block ml-auto">{personalInfo.website}</p>}
             </div>
             {resume.socialLinks && resume.socialLinks.length > 0 && (
                <div className="mt-4 flex flex-wrap justify-end gap-x-4 gap-y-1">
                   {resume.socialLinks.map((link) => (
                      <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="text-[9px] font-black uppercase tracking-widest text-slate-300 hover:text-slate-900 transition-all border-b border-transparent hover:border-slate-900">
                        {link.platform}
                      </a>
                   ))}
                </div>
             )}
          </div>
        </header>

        <section className="mb-24">
           <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-200 mb-12 flex items-center gap-4">
             <span className="flex-1 h-px bg-slate-100" />
             Professional History
             <span className="flex-1 h-px bg-slate-100" />
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-4">
                  <div className="flex justify-between items-baseline border-b-4 border-slate-900 pb-2">
                    <h3 className="text-xl font-black uppercase tracking-tight">{exp.position}</h3>
                    <span className="text-[10px] font-black text-slate-400">{exp.startDate} - {exp.endDate || 'NOW'}</span>
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{exp.company}</p>
                  <p className="text-sm leading-relaxed font-medium text-slate-600">{exp.description}</p>
                </div>
              ))}
           </div>
        </section>

        {resume.projects && resume.projects.length > 0 && (
          <section className="mb-24">
             <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-200 mb-12 flex items-center gap-4">
               <span className="flex-1 h-px bg-slate-100" />
               Selected Works
               <span className="flex-1 h-px bg-slate-100" />
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {resume.projects.map((proj) => (
                  <div key={proj.id} className="p-6 border border-slate-100 bg-slate-50/50 rounded-xl space-y-3">
                    <h3 className="text-base font-black uppercase tracking-tight">{proj.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium italic line-clamp-4">{proj.description}</p>
                    {proj.link && <p className="text-[10px] font-black text-slate-900 border-b border-slate-900 inline-block">{proj.link}</p>}
                  </div>
                ))}
             </div>
          </section>
        )}

        <div className="grid grid-cols-12 gap-20 border-t border-slate-50 pt-16">
          <section className="col-span-12 md:col-span-4">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300 mb-8">Competencies</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              {skills.map((skill, i) => (
                <span key={i} className="text-xs font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-200 pb-1">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="col-span-12 md:col-span-8">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300 mb-8">Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <h4 className="text-lg font-black uppercase tracking-tight leading-none">{edu.degree}</h4>
                  <p className="text-xs font-bold text-slate-400 italic mb-2">{edu.institution}</p>
                  <p className="text-[10px] font-black tracking-widest text-slate-300 uppercase">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>

          {resume.achievements && resume.achievements.length > 0 && (
            <section className="col-span-12 mt-12 mb-[-64px] bg-slate-900 text-white p-12 -mx-16">
               <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-500 mb-10 px-4 border-l-2 border-white">Distinctions & Honors</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 px-4">
                  {resume.achievements.map((ach, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                       <span className="text-2xl font-black text-slate-800 italic shrink-0 group-hover:text-slate-700 transition-colors">0{i+1}</span>
                       <p className="text-sm font-bold tracking-tight text-slate-100 leading-relaxed uppercase italic">{ach}</p>
                    </div>
                  ))}
               </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
