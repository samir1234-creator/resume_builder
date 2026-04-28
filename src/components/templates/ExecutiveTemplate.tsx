import { Resume } from '../../types';
import ProfilePhoto from '../ProfilePhoto';

export default function ExecutiveTemplate({ resume }: { resume: Resume }) {
  const { personalInfo, education, experience, skills, projects } = resume;

  return (
    <div className="p-16 font-serif text-slate-900 bg-[#fbfaf8] min-h-screen relative shadow-2xl border border-slate-200">
      <header className="border-b-4 border-slate-900 pb-12 mb-16 flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-black uppercase tracking-tighter leading-none mb-4">{personalInfo.fullName || 'Executive Name'}</h1>
          <p className="text-lg italic text-slate-500 font-medium tracking-wide">Strategic Leader & Technical Architect</p>
          {resume.socialLinks && resume.socialLinks.length > 0 && (
            <div className="flex gap-4 mt-6">
              {resume.socialLinks.map((link) => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                  {link.platform}
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="text-right space-y-4 flex flex-col items-end text-sm font-sans font-bold uppercase tracking-widest text-slate-400">
           <ProfilePhoto personalInfo={personalInfo} className="w-24 h-24 mb-2 shadow-sm" />
           <div className="space-y-1">
             <p className="text-slate-900">{personalInfo.email}</p>
             <p>{personalInfo.phone}</p>
             <p>{personalInfo.location}</p>
             {personalInfo.website && <p className="text-slate-900 border-b border-slate-900 inline-block">{personalInfo.website}</p>}
           </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-16">
        <div className="col-span-8 space-y-16">
          <section>
            <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-slate-300 mb-8 pb-2 border-b border-slate-100">Executive Profile</h2>
            <p className="text-xl leading-relaxed text-slate-700 italic border-l-4 border-slate-900 pl-8">
              {personalInfo.summary}
            </p>
          </section>

          {resume.projects && resume.projects.length > 0 && (
            <section>
              <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-slate-300 mb-8 pb-2 border-b border-slate-100">Key Initiatives & Projects</h2>
              <div className="grid grid-cols-2 gap-8">
                {resume.projects.map((proj) => (
                  <div key={proj.id} className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">{proj.name}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed italic">{proj.description}</p>
                    {proj.link && <p className="text-[10px] font-bold text-slate-400 truncate">{proj.link}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-slate-300 mb-10 pb-2 border-b border-slate-100">Professional Tenure</h2>
            <div className="space-y-12">
              {experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="flex justify-between items-baseline mb-3">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{exp.position}</h3>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{exp.startDate} — {exp.endDate || 'Present'}</span>
                  </div>
                  <div className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">{exp.company}</div>
                  <div className="text-base leading-relaxed text-slate-600 whitespace-pre-wrap pl-6 border-l border-slate-200">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-4 space-y-16">
          <section>
            <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-slate-300 mb-8 pb-2 border-b border-slate-100">Expertise</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              {skills.map((skill, i) => (
                <span key={i} className="text-xs font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-200 pb-1">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-slate-300 mb-8 pb-2 border-b border-slate-100">Academic</h2>
            <div className="space-y-8">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{edu.degree}</h3>
                  <p className="text-sm italic text-slate-500 mb-1">{edu.institution}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>

          {resume.achievements && resume.achievements.length > 0 && (
            <section>
              <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-slate-300 mb-8 pb-2 border-b border-slate-100">Board Appointments & Honors</h2>
              <div className="space-y-4">
                 {resume.achievements.map((ach, i) => (
                    <div key={i} className="flex gap-4 group">
                       <span className="text-[10px] font-black text-slate-200 mt-0.5 shrink-0">0{i+1}</span>
                       <p className="text-xs font-bold text-slate-800 uppercase tracking-tighter leading-relaxed italic">{ach}</p>
                    </div>
                 ))}
              </div>
            </section>
          )}
        </div>
      </div>
      
      <footer className="mt-32 pt-12 border-t-2 border-slate-900 flex justify-between items-center opacity-20">
        <span className="text-[10px] font-black uppercase tracking-[0.5em]">CONFIDENTIAL DOCUMENT</span>
        <span className="text-[10px] font-bold">2026 EDITION</span>
      </footer>
    </div>
  );
}
