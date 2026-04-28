import { Resume } from '../../types';
import ProfilePhoto from '../ProfilePhoto';

export default function OchreTemplate({ resume }: { resume: Resume }) {
  const { personalInfo, education, experience, skills, projects, socialLinks, achievements } = resume;

  return (
    <div className="p-20 font-serif text-[#433c33] bg-[#f9f7f2] min-h-screen border border-slate-200">
      <header className="max-w-4xl mx-auto mb-24 border-b-2 border-[#d9c5b2] pb-12 text-center">
        <ProfilePhoto personalInfo={personalInfo} className="w-28 h-28 mx-auto border-4 border-[#d9c5b2] p-1 bg-white mb-6" />
        <h1 className="text-6xl font-light tracking-widest uppercase mb-6 leading-none text-[#5c5449]">{personalInfo.fullName || 'Ochre Profile'}</h1>
        <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-[#938a7c]">
           <span>{personalInfo.location}</span>
           <span>/</span>
           <span>{personalInfo.email}</span>
           <span>/</span>
           <span>{personalInfo.phone}</span>
           {personalInfo.website && (
             <>
               <span>/</span>
               <span className="text-[#433c33] underline underline-offset-4">{personalInfo.website}</span>
             </>
           )}
        </div>
        {socialLinks && socialLinks.length > 0 && (
          <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-[9px] font-sans font-black uppercase tracking-[0.3em] text-[#d9c5b2] mt-6">
             {socialLinks.map((link) => (
               <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#433c33] transition-colors">{link.platform}</a>
             ))}
          </div>
        )}
      </header>

      <div className="max-w-4xl mx-auto space-y-24">
        <section className="flex gap-16 items-start">
           <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.5em] text-[#d9c5b2] rotate-180 [writing-mode:vertical-rl] mt-1 shrink-0">Statement</h2>
           <p className="text-3xl font-light italic leading-snug text-[#5c5449]">
             {personalInfo.summary}
           </p>
        </section>

        <section className="flex gap-16 items-start">
           <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.5em] text-[#d9c5b2] rotate-180 [writing-mode:vertical-rl] mt-1 shrink-0">Expertise</h2>
           <div className="flex flex-wrap gap-x-12 gap-y-6">
              {skills.map((skill, i) => (
                <span key={i} className="text-sm font-sans font-bold uppercase tracking-widest text-[#433c33] border-b border-[#d9c5b2] pb-0.5 px-1">
                   {skill}
                </span>
              ))}
           </div>
        </section>

        <section className="space-y-12">
           <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.5em] text-[#d9c5b2] border-b border-[#e9dfd3] pb-2">Experience</h2>
           <div className="space-y-16">
              {experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-12 gap-8">
                   <div className="col-span-3">
                      <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#938a7c] pt-1">{exp.startDate} – {exp.endDate || 'Now'}</p>
                   </div>
                   <div className="col-span-9 space-y-4">
                      <h3 className="text-2xl font-bold tracking-tight text-[#433c33]">{exp.position}</h3>
                      <p className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-[#d9c5b2]">{exp.company}</p>
                      <p className="text-[15px] leading-relaxed italic text-[#6f685e] whitespace-pre-wrap">{exp.description}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {projects && projects.length > 0 && (
          <section className="space-y-12">
             <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.5em] text-[#d9c5b2] border-b border-[#e9dfd3] pb-2">Selected Projects</h2>
             <div className="grid grid-cols-2 gap-12">
                {projects.map((proj) => (
                   <div key={proj.id} className="space-y-3">
                      <h4 className="text-xl font-bold text-[#433c33] italic">{proj.name}</h4>
                      <p className="text-sm leading-relaxed text-[#6f685e] line-clamp-3">{proj.description}</p>
                      {proj.link && <p className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#d9c5b2] underline underline-offset-4">{proj.link}</p>}
                   </div>
                ))}
             </div>
          </section>
        )}

        <section className="grid grid-cols-2 gap-20 border-t border-[#e9dfd3] pt-16">
           <div className="space-y-8">
              <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.5em] text-[#d9c5b2]">Background</h2>
              <div className="space-y-8">
                 {education.map((edu) => (
                    <div key={edu.id}>
                       <h4 className="text-lg font-bold text-[#433c33] mb-1">{edu.degree}</h4>
                       <p className="text-sm italic text-[#938a7c]">{edu.institution}</p>
                       <p className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#d9c5b2] mt-1">{edu.startDate} - {edu.endDate}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>
      </div>
      
      <footer className="mt-32 pt-12 border-t border-[#e9dfd3] flex justify-center opacity-20">
         <p className="text-[9px] font-sans font-bold uppercase tracking-[0.8em] text-[#938a7c]">Elevate Editorial System 2026</p>
      </footer>
    </div>
  );
}
