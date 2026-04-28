import { Resume } from '../../types';
import ProfilePhoto from '../ProfilePhoto';

export default function MinimalistTemplate({ resume }: { resume: Resume }) {
  const { personalInfo, education, experience, skills, projects, socialLinks } = resume;

  return (
    <div className="p-16 font-serif text-slate-900 leading-relaxed max-w-[850px] mx-auto bg-white min-h-screen relative overflow-hidden border border-slate-200">
      {/* Accent line like in the design */}
      <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-slate-900"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="flex justify-between items-start mb-16">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tight leading-[0.85] mb-4">
              {personalInfo.fullName?.split(' ').map((name, i) => (
                <span key={i} className="block">{name}</span>
              )) || 'YOUR NAME'}
            </h1>
            <p className="text-base italic text-slate-400 font-medium">Professional Narrative</p>
            {socialLinks && socialLinks.length > 0 && (
              <div className="mt-6 flex flex-col gap-1">
                {socialLinks.map((link) => (
                  <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-slate-300 hover:text-slate-900 transition-colors">
                    {link.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="text-right space-y-4 flex flex-col items-end">
            <ProfilePhoto personalInfo={personalInfo} className="w-24 h-24 mb-2 shadow-lg" />
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">Contact Details</p>
              <p className="text-[11px] uppercase font-bold tracking-widest text-slate-900">{personalInfo.email}</p>
              <p className="text-[11px] uppercase font-bold tracking-widest text-slate-900">{personalInfo.location}</p>
              <p className="text-[11px] uppercase font-bold tracking-widest text-slate-900">{personalInfo.phone}</p>
              {personalInfo.website && <p className="text-[11px] uppercase font-extrabold tracking-widest text-slate-900 border-b border-slate-900 inline-block">{personalInfo.website}</p>}
            </div>
          </div>
        </header>

        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-12">
             <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-200 mb-4 border-b border-slate-100 pb-2">Overview</h3>
             <p className="text-lg text-slate-700 leading-relaxed italic max-w-2xl">
               {personalInfo.summary}
             </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-12">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-200 mb-6 border-b border-slate-100 pb-2">Professional Journey</h3>
            <div className="space-y-10">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="text-xl font-bold text-slate-900">{exp.position}</h4>
                    <span className="text-sm italic text-slate-400">{exp.startDate} — {exp.endDate || 'Present'}</span>
                  </div>
                  <p className="text-[13px] font-sans font-bold uppercase tracking-widest text-slate-900 mb-3">{exp.company}</p>
                  <p className="text-[14px] font-sans leading-relaxed text-slate-600 whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Focus */}
        <div className="grid grid-cols-2 gap-16">
          {education.length > 0 && (
            <section>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-200 mb-6 border-b border-slate-100 pb-2">Academic</h3>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="text-base font-bold text-slate-900 mb-1">{edu.degree}</h4>
                    <p className="text-sm italic text-slate-400 mb-1">{edu.institution}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">{edu.startDate} — {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-200 mb-6 border-b border-slate-100 pb-2">Core Focus</h3>
               <div className="flex flex-wrap gap-x-6 gap-y-3">
                 {skills.map((skill, i) => (
                   <span key={i} className="text-[11px] uppercase font-bold tracking-[0.15em] text-slate-800">
                     {skill}
                   </span>
                 ))}
               </div>
            </section>
          )}
        </div>

        {resume.projects && resume.projects.length > 0 && (
          <section className="mb-12">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-200 mb-6 border-b border-slate-100 pb-2">Selected Works</h3>
            <div className="grid grid-cols-2 gap-x-12 gap-y-10">
              {resume.projects.map((proj) => (
                <div key={proj.id} className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900 italic underline underline-offset-4 decoration-slate-100">{proj.name}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{proj.description}</p>
                  {proj.link && <p className="text-[10px] font-sans font-bold text-slate-400">{proj.link}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {resume.achievements && resume.achievements.length > 0 && (
          <section className="mb-12">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-200 mb-6 border-b border-slate-100 pb-2">Distinctions</h3>
            <div className="space-y-4">
              {resume.achievements.map((ach, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="text-[10px] text-slate-300 font-bold tracking-widest mt-1 uppercase italic">[{String(i+1).padStart(2, '0')}]</span>
                  <p className="text-sm font-medium text-slate-700 italic leading-relaxed">{ach}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer decoration */}
        <footer className="mt-20 pt-8 border-t border-slate-50 flex justify-between items-center opacity-30 select-none">
          <span className="text-[9px] font-bold italic tracking-[0.3em] text-slate-400 uppercase">ELEVATE CV / CURRICULUM VITAE</span>
          <span className="text-[10px] font-bold text-slate-900">01</span>
        </footer>
      </div>
    </div>
  );
}
