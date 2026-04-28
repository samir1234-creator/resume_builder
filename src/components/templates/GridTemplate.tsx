import { Resume } from '../../types';
import ProfilePhoto from '../ProfilePhoto';

export default function GridTemplate({ resume }: { resume: Resume }) {
  const { personalInfo, education, experience, skills, projects } = resume;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 border-[20px] border-slate-900">
      <div className="grid grid-cols-12 min-h-[calc(100vh-40px)]">
        {/* Sidebar / Left column */}
        <div className="col-span-12 md:col-span-4 border-b md:border-b-0 md:border-r border-slate-200 p-12 flex flex-col justify-between">
           <div className="space-y-12">
              <div>
                <h1 className="text-5xl font-black uppercase tracking-tighter leading-[0.8] mb-4">
                  {personalInfo.fullName?.split(' ')[0] || 'FIRST'} <br/>
                  <span className="text-slate-400">{personalInfo.fullName?.split(' ').slice(1).join(' ') || 'LAST'}</span>
                </h1>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-300">Modern Professional</p>
              </div>

              <section>
                 <div className="mb-6">
                    <ProfilePhoto personalInfo={personalInfo} className="w-24 h-24 shadow-lg" />
                 </div>
                 <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 mb-6 px-3 py-1 bg-slate-100 inline-block">Contact</h2>
                 <div className="space-y-3 text-sm font-medium text-slate-500">
                    <p>{personalInfo.email}</p>
                    <p>{personalInfo.phone}</p>
                    <p>{personalInfo.location}</p>
                    {personalInfo.website && <p className="text-slate-900 font-bold underline underline-offset-4">{personalInfo.website}</p>}
                 </div>
              </section>

              <section>
                 <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 mb-6 px-3 py-1 bg-slate-100 inline-block">Competencies</h2>
                 <div className="flex flex-col gap-2">
                    {skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-slate-900">
                         <div className="w-1.5 h-1.5 bg-slate-900" />
                         {skill}
                      </div>
                    ))}
                 </div>
              </section>
           </div>

           <div className="pt-12">
              <p className="text-[9px] font-bold text-slate-200 tracking-[0.3em] uppercase">Built with ProResume / ver 4.0</p>
           </div>
        </div>

        {/* Main column */}
        <div className="col-span-12 md:col-span-8">
           <section className="p-12 border-b border-slate-200">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-8">Executive Summary</h2>
              <p className="text-2xl font-bold tracking-tight leading-tight text-slate-800">
                {personalInfo.summary}
              </p>
           </section>

           <div className="divide-y divide-slate-200">
              {experience.map((exp) => (
                <div key={exp.id} className="p-12 group hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-3xl font-black uppercase tracking-tighter group-hover:text-slate-900 transition-colors">{exp.position}</h3>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest whitespace-nowrap ml-4">{exp.startDate} – {exp.endDate || 'NOW'}</span>
                  </div>
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">{exp.company}</div>
                  <p className="text-base leading-relaxed text-slate-600 font-medium italic border-l-2 border-slate-100 pl-8 group-hover:border-slate-900 transition-all">
                    {exp.description}
                  </p>
                </div>
              ))}
           </div>

           {resume.projects && resume.projects.length > 0 && (
             <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-slate-200 border-b border-slate-200">
                {resume.projects.map((proj) => (
                  <div key={proj.id} className="p-12 space-y-4">
                    <h3 className="text-xl font-black uppercase tracking-tighter">{proj.name}</h3>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed italic">{proj.description}</p>
                    {proj.link && <p className="text-[10px] font-black text-slate-900 border-b border-slate-900 inline-block">{proj.link}</p>}
                  </div>
                ))}
             </div>
           )}

           {education.length > 0 && (
             <div className="p-12 bg-slate-900 text-white grid grid-cols-1 md:grid-cols-2 gap-10">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-1">
                    <h4 className="text-lg font-black uppercase tracking-tight">{edu.degree}</h4>
                    <p className="text-xs font-bold text-slate-400 mb-2">{edu.institution}</p>
                    <p className="text-[10px] font-bold tracking-widest text-slate-600 uppercase">{edu.startDate} — {edu.endDate}</p>
                  </div>
                ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
