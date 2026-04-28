import { Resume } from '../../types';
import ProfilePhoto from '../ProfilePhoto';

export default function ElegantTemplate({ resume }: { resume: Resume }) {
  const { personalInfo, education, experience, skills, projects } = resume;

  return (
    <div className="p-20 font-serif text-[#2c2c2c] bg-[#fffcf5] min-h-screen border border-slate-200">
      <header className="max-w-4xl mx-auto text-center mb-20">
        <ProfilePhoto personalInfo={personalInfo} className="w-32 h-32 mx-auto rounded-full border-2 border-[#b4a07d] p-1 bg-white mb-8" />
        <p className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-[#b4a07d] mb-4">Curriculum Vitae</p>
        <h1 className="text-5xl font-light tracking-widest uppercase mb-6 leading-tight">{personalInfo.fullName || 'ELEGANT PROFILE'}</h1>
        <div className="flex justify-center items-center gap-6 text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#9a9a9a]">
           <span>{personalInfo.location}</span>
           <span className="w-1 h-1 rounded-full bg-[#b4a07d]" />
           <span>{personalInfo.email}</span>
           <span className="w-1 h-1 rounded-full bg-[#b4a07d]" />
           <span>{personalInfo.phone}</span>
           {personalInfo.website && (
             <>
               <span className="w-1 h-1 rounded-full bg-[#b4a07d]" />
               <span className="text-[#2c2c2c] border-b border-[#2c2c2c]">{personalInfo.website}</span>
             </>
           )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto grid grid-cols-12 gap-20">
        <div className="col-span-12">
           <section className="mb-24 flex gap-12 items-start">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#b4a07d] rotate-180 [writing-mode:vertical-rl] mt-2">NARRATIVE</span>
              <p className="text-2xl font-light leading-relaxed italic text-[#4a4a4a] border-l border-[#e5e0d4] pl-12">
                {personalInfo.summary}
              </p>
           </section>
        </div>

        <div className="col-span-12">
           <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.5em] text-[#b4a07d] mb-12 border-b border-[#e5e0d4] pb-2">Professional Experience</h2>
           <div className="space-y-16">
              {experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-12 gap-8">
                  <div className="col-span-3">
                     <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#9a9a9a]">{exp.startDate} – {exp.endDate || 'Present'}</span>
                  </div>
                  <div className="col-span-9 space-y-4">
                     <h3 className="text-xl font-bold tracking-tight text-[#1a1a1a]">{exp.position}</h3>
                     <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#b4a07d]">{exp.company}</p>
                     <p className="text-[15px] leading-relaxed text-[#5a5a5a] text-justify font-serif italic">{exp.description}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {resume.projects && resume.projects.length > 0 && (
          <div className="col-span-12">
            <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.5em] text-[#b4a07d] mb-12 border-b border-[#e5e0d4] pb-2">Significant Projects</h2>
            <div className="grid grid-cols-2 gap-x-12 gap-y-16">
              {resume.projects.map((proj) => (
                <div key={proj.id} className="flex gap-8 items-start">
                   <div className="w-12 h-12 bg-[#f4f1ea] flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-[#b4a07d]">PRJ</span>
                   </div>
                   <div className="space-y-2">
                     <h3 className="text-lg font-bold text-[#1a1a1a]">{proj.name}</h3>
                     <p className="text-sm italic text-[#6a6a6a] leading-relaxed line-clamp-3">{proj.description}</p>
                     {proj.link && <p className="text-[10px] text-[#b4a07d] underline underline-offset-4 font-bold">{proj.link}</p>}
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="col-span-12 grid grid-cols-2 gap-20 pt-16 border-t border-[#e5e0d4]">
           <section>
              <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-[#b4a07d] mb-10">Academic Portfolio</h2>
              <div className="space-y-8">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-1">
                    <h3 className="text-base font-bold text-[#1a1a1a]">{edu.degree}</h3>
                    <p className="text-sm italic text-[#9a9a9a]">{edu.institution}</p>
                    <p className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#b4a07d]">{edu.startDate} — {edu.endDate}</p>
                  </div>
                ))}
              </div>
           </section>
           
           <section>
              <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-[#b4a07d] mb-10">Core Expertise</h2>
              <div className="flex flex-wrap gap-x-6 gap-y-4">
                {skills.map((skill, i) => (
                  <span key={i} className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#1a1a1a] border-b border-[#b4a07d] pb-0.5">
                    {skill}
                  </span>
                ))}
              </div>
           </section>
        </div>
      </div>
      
      <footer className="max-w-4xl mx-auto mt-32 pt-12 border-t border-[#e5e0d4] flex justify-center opacity-30">
        <span className="text-[9px] font-sans font-bold uppercase tracking-[0.8em] text-[#9a9a9a]">ESTABLISHED 2026 PROFESSIONAL PORTFOLIO</span>
      </footer>
    </div>
  );
}
