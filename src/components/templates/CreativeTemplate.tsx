import { Resume } from '../../types';
import ProfilePhoto from '../ProfilePhoto';

export default function CreativeTemplate({ resume }: { resume: Resume }) {
  const { personalInfo, education, experience, skills, projects, socialLinks } = resume;

  return (
    <div className="p-10 font-sans text-slate-800 leading-relaxed max-w-[850px] mx-auto bg-white min-h-screen relative overflow-hidden border border-slate-200">
      {/* Abstract Background Element */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-slate-50/50 rounded-full blur-3xl opacity-50" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-slate-50/30 rounded-full blur-3xl opacity-50" />

      <div className="relative z-10 grid grid-cols-12 gap-10">
        {/* Left Col - Header & Summary */}
        <div className="col-span-12 md:col-span-8 flex flex-col justify-center min-h-[250px] font-serif">
          <h1 className="text-7xl font-black tracking-tight text-slate-900 mb-6 leading-[0.85] uppercase">
            {personalInfo.fullName?.split(' ')[0] || 'YOUR'} <br/>
            <span className="italic text-slate-400 font-light">{personalInfo.fullName?.split(' ').slice(1).join(' ') || 'NAME'}</span>
          </h1>
          <p className="text-xl font-medium text-slate-700 italic max-w-md border-l-2 border-slate-900 pl-6">
            {personalInfo.summary || 'A creative professional dedicated to building impactful digital experiences.'}
          </p>
          {socialLinks && socialLinks.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3 font-sans">
              {socialLinks.map((link) => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-slate-800 transition-colors">
                  {link.platform}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right Col - Contact */}
        <div className="col-span-12 md:col-span-4 flex flex-col justify-end text-right space-y-6">
           <ProfilePhoto personalInfo={personalInfo} className="w-24 h-24 mb-2 shadow-lg ml-auto" />
           <div className="space-y-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em]">
              <p className="text-slate-900">{personalInfo.email}</p>
              <p>{personalInfo.phone}</p>
              <p>{personalInfo.location}</p>
              {personalInfo.website && <p className="text-slate-900 border-b border-slate-900 inline-block">{personalInfo.website}</p>}
           </div>
        </div>

        {/* Sections */}
        <div className="col-span-12 grid grid-cols-12 gap-10 border-t border-slate-100 pt-16">
           <div className="col-span-12 md:col-span-4 space-y-16">
              {skills.length > 0 && (
                <section>
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300 mb-8">
                    Abilities
                  </h2>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {skills.map((skill, i) => (
                      <span key={i} className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-1">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {education.length > 0 && (
                <section>
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300 mb-8">
                    Background
                  </h2>
                  <div className="space-y-8">
                    {education.map((edu) => (
                      <div key={edu.id} className="space-y-1 font-serif">
                        <h3 className="font-bold text-base text-slate-900 italic">{edu.degree}</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{edu.institution}</p>
                        <p className="text-[10px] text-slate-300 font-bold tracking-widest">{edu.startDate} — {edu.endDate}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {resume.projects && resume.projects.length > 0 && (
                <section>
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300 mb-8">
                    Portfolio
                  </h2>
                  <div className="space-y-8">
                    {resume.projects.map((proj) => (
                      <div key={proj.id} className="space-y-2">
                        <h3 className="font-bold text-base text-slate-900 underline decoration-slate-100 group-hover:decoration-slate-900 transition-all">{proj.name}</h3>
                        <p className="text-[11px] text-slate-500 italic leading-relaxed line-clamp-4">{proj.description}</p>
                        {proj.link && <p className="text-[9px] font-bold text-slate-400 truncate">{proj.link}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {resume.achievements && resume.achievements.length > 0 && (
                <section>
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300 mb-8">
                    Distinctions
                  </h2>
                  <div className="space-y-6">
                    {resume.achievements.map((ach, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="w-1 h-px bg-slate-900 mt-2 shrink-0 group-hover:w-4 transition-all" />
                        <p className="text-xs font-bold text-slate-900 leading-relaxed uppercase tracking-tighter italic">{ach}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
           </div>

           <div className="col-span-12 md:col-span-8 space-y-16">
              {experience.length > 0 && (
                <section>
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300 mb-12">
                    Case Studies & Exp.
                  </h2>
                  <div className="space-y-16">
                    {experience.map((exp) => (
                      <div key={exp.id} className="group">
                        <div className="flex justify-between items-baseline mb-4">
                          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none">{exp.position}</h3>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{exp.startDate} — {exp.endDate || 'Present'}</span>
                        </div>
                        <div className="text-xs font-bold text-slate-400 mb-6 tracking-[0.2em] uppercase">{exp.company}</div>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium italic border-l border-slate-50 pl-6">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
