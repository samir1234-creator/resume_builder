import { Resume } from '../../types';
import ProfilePhoto from '../ProfilePhoto';

export default function SiennaTemplate({ resume }: { resume: Resume }) {
  const { personalInfo, education, experience, skills, projects, socialLinks, achievements } = resume;

  return (
    <div className="p-16 font-sans text-[#3d2b1f] bg-[#fdfcfb] min-h-screen border border-slate-200 relative overflow-hidden">
      {/* Visual Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#7a5c46] opacity-5 -mr-32 -mt-32 rounded-full" />
      
      <header className="relative z-10 grid grid-cols-12 gap-8 mb-20">
        <div className="col-span-8">
           <h1 className="text-6xl font-black uppercase tracking-tighter leading-none mb-4 text-[#4a3728]">{personalInfo.fullName || 'Sienna Profile'}</h1>
           <p className="text-lg font-bold text-[#a68a73] tracking-widest uppercase">{personalInfo.location} — Professional Narrative</p>
           {socialLinks && socialLinks.length > 0 && (
             <div className="mt-4 flex gap-4">
                {socialLinks.map((link) => (
                  <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest text-[#7a5c46] border-b border-transparent hover:border-[#7a5c46] transition-all">
                    {link.platform}
                  </a>
                ))}
             </div>
           )}
        </div>
        <div className="col-span-4 text-right flex flex-col justify-end items-end space-y-4">
           <ProfilePhoto personalInfo={personalInfo} className="w-24 h-24 mb-2 shadow-xl border-2 border-white" />
           <div className="space-y-1">
              <p className="text-sm font-bold text-[#4a3728]">{personalInfo.email}</p>
              <p className="text-sm font-bold text-[#4a3728]">{personalInfo.phone}</p>
              {personalInfo.website && <p className="text-sm font-bold text-[#7a5c46] border-b border-[#7a5c46] inline-block ml-auto">{personalInfo.website}</p>}
           </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-12 border-t border-[#ede0d4] pt-12">
        <aside className="col-span-4 space-y-12">
           <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a68a73] mb-6">Expertise</h2>
              <div className="flex flex-col gap-3">
                 {skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#4a3728]">
                       <div className="w-2 h-2 bg-[#7a5c46]" />
                       {skill}
                    </div>
                 ))}
              </div>
           </section>

           <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a68a73] mb-6">Academic</h2>
              <div className="space-y-6">
                 {education.map((edu) => (
                    <div key={edu.id} className="space-y-1">
                       <h4 className="text-base font-bold text-[#4a3728]">{edu.degree}</h4>
                       <p className="text-xs text-[#a68a73] font-bold">{edu.institution}</p>
                       <p className="text-[10px] text-[#dac8b8] font-black uppercase">{edu.startDate} — {edu.endDate}</p>
                    </div>
                 ))}
              </div>
           </section>
        </aside>

        <main className="col-span-8 space-y-16">
           <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a68a73] mb-8 pb-1 border-b border-[#ede0d4]">Summary</h2>
              <p className="text-xl font-medium leading-relaxed italic text-[#5c4a3c]">
                {personalInfo.summary}
              </p>
           </section>

           <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a68a73] mb-10 pb-1 border-b border-[#ede0d4]">History</h2>
              <div className="space-y-12">
                 {experience.map((exp) => (
                    <div key={exp.id} className="group">
                       <div className="flex justify-between items-baseline mb-2">
                          <h3 className="text-2xl font-black uppercase tracking-tight text-[#4a3728]">{exp.position}</h3>
                          <span className="text-[10px] font-black text-[#a68a73] uppercase tracking-widest">{exp.startDate} - {exp.endDate || 'Present'}</span>
                       </div>
                       <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a5c46] mb-4">{exp.company}</p>
                       <p className="text-sm leading-relaxed text-[#5c4a3c] whitespace-pre-wrap pl-6 border-l-2 border-[#ede0d4] group-hover:border-[#7a5c46] transition-all">
                          {exp.description}
                       </p>
                    </div>
                 ))}
              </div>
           </section>

           {projects && projects.length > 0 && (
             <section>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a68a73] mb-10 pb-1 border-b border-[#ede0d4]">Works</h2>
                <div className="grid grid-cols-2 gap-8">
                   {projects.map((proj) => (
                      <div key={proj.id} className="space-y-2 p-6 bg-[#f4ebe1] rounded-2xl">
                         <h4 className="font-bold text-[#4a3728] underline decoration-[#dac8b8] group-hover:decoration-[#7a5c46]">{proj.name}</h4>
                         <p className="text-xs text-[#7a5c46] italic line-clamp-3">{proj.description}</p>
                         {proj.link && <p className="text-[9px] font-bold text-[#4a3728] truncate">{proj.link}</p>}
                      </div>
                   ))}
                </div>
             </section>
           )}
           {achievements && achievements.length > 0 && (
             <section>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a68a73] mb-10 pb-1 border-b border-[#ede0d4]">Distinctions</h2>
                <div className="space-y-4">
                   {achievements.map((ach, i) => (
                      <div key={i} className="flex gap-4 items-start">
                         <span className="text-[10px] font-black text-[#dac8b8] mt-1 shrink-0">[{i+1}]</span>
                         <p className="text-sm font-bold text-[#5c4a3c] italic uppercase tracking-tighter">{ach}</p>
                      </div>
                   ))}
                </div>
             </section>
           )}
        </main>
      </div>
      <footer className="mt-20 pt-8 border-t border-[#ede0d4] flex items-center justify-between opacity-40">
         <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#a68a73]">Elevate Edition</span>
         <span className="text-[10px] font-bold text-[#4a3728]">© 2026</span>
      </footer>
    </div>
  );
}
