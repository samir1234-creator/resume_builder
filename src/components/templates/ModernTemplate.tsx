import { Resume } from '../../types';
import ProfilePhoto from '../ProfilePhoto';

export default function ModernTemplate({ resume }: { resume: Resume }) {
  const { personalInfo, education, experience, skills, projects, achievements, socialLinks } = resume;

  return (
    <div className="p-10 font-sans text-slate-800 leading-relaxed max-w-[850px] mx-auto bg-white min-h-screen border border-slate-200">
      {/* Header Grid */}
      <header className="grid grid-cols-12 gap-8 mb-16 border-b-2 border-slate-900 pb-12">
        <div className="col-span-12 md:col-span-8 flex flex-col justify-center">
          <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter mb-4">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-xl font-bold text-slate-500 uppercase tracking-widest">Digital Architect</p>
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex gap-4 mt-6">
              {socialLinks.map((link) => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-slate-900 transition-colors underline decoration-slate-100 underline-offset-4">{link.platform}</a>
              ))}
            </div>
          )}
        </div>
        <div className="col-span-12 md:col-span-4 flex flex-col justify-center items-end text-right md:border-l-2 border-slate-100 pl-8 space-y-4">
           <ProfilePhoto personalInfo={personalInfo} className="w-24 h-24 mb-2 shadow-xl" />
           <div className="space-y-1 text-sm font-bold text-slate-400">
              <p>{personalInfo.email}</p>
              <p>{personalInfo.phone}</p>
              <p>{personalInfo.location}</p>
              <p className="text-slate-900">{personalInfo.website}</p>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="col-span-12 md:col-span-8 space-y-12">
           {experience.length > 0 && (
             <section>
               <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-8 px-4 py-1 bg-slate-100 inline-block">Experience</h2>
               <div className="space-y-12 px-4">
                  {experience.map((exp) => (
                    <div key={exp.id} className="grid grid-cols-12 gap-4">
                       <div className="col-span-4">
                          <p className="text-xs font-black text-slate-400 uppercase">{exp.startDate} - {exp.endDate || 'Present'}</p>
                       </div>
                       <div className="col-span-8 space-y-3">
                          <h3 className="text-lg font-black text-slate-900 uppercase leading-none">{exp.position}</h3>
                          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{exp.company}</p>
                          <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                       </div>
                    </div>
                  ))}
               </div>
             </section>
           )}

           {projects.length > 0 && (
             <section>
               <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-8 px-4 py-1 bg-slate-100 inline-block">Projects</h2>
               <div className="grid grid-cols-2 gap-8 px-4">
                  {projects.map((proj) => (
                    <div key={proj.id} className="space-y-3 p-6 border border-slate-100 rounded-2xl hover:border-slate-900 transition-all group">
                       <h3 className="font-black text-slate-900 uppercase">{proj.name}</h3>
                       <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{proj.description}</p>
                       {proj.link && <p className="text-[10px] font-black text-slate-400 truncate border-b border-slate-100 inline-block">{proj.link}</p>}
                    </div>
                  ))}
               </div>
             </section>
           )}
        </div>

        {/* Sidebar */}
        <div className="col-span-12 md:col-span-4 space-y-12">
           {personalInfo.summary && (
             <section className="bg-slate-900 text-white p-8 rounded-3xl">
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">About</h2>
                <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                  "{personalInfo.summary}"
                </p>
             </section>
           )}

           {skills.length > 0 && (
             <section className="px-4">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">Discovery</h2>
                <div className="flex flex-col gap-4">
                   {skills.map((skill, i) => (
                     <div key={i} className="group cursor-default">
                        <div className="flex justify-between items-center mb-1.5">
                           <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{skill}</span>
                        </div>
                        <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                           <div className="h-full bg-slate-900 w-full transition-all origin-left" />
                        </div>
                     </div>
                   ))}
                </div>
             </section>
           )}

           {education.length > 0 && (
              <section className="px-4">
                 <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">Education</h2>
                 <div className="space-y-6">
                    {education.map((edu) => (
                      <div key={edu.id} className="space-y-1">
                         <h3 className="text-xs font-black text-slate-900 uppercase">{edu.degree}</h3>
                         <p className="text-[10px] font-bold text-slate-500">{edu.institution}</p>
                         <p className="text-[10px] font-black text-slate-400 italic">{edu.startDate} - {edu.endDate}</p>
                      </div>
                    ))}
                 </div>
              </section>
           )}

           {achievements && achievements.length > 0 && (
              <section className="px-4">
                 <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">Milestones</h2>
                 <div className="space-y-4">
                    {achievements.map((ach, i) => (
                      <div key={i} className="flex gap-3 items-start">
                         <div className="w-1.5 h-1.5 bg-slate-200 mt-1.5 shrink-0" />
                         <p className="text-xs font-bold text-slate-500 uppercase leading-relaxed tracking-tighter">{ach}</p>
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
