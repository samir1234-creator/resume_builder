import { Resume } from '../../types';
import ProfilePhoto from '../ProfilePhoto';

export default function CorporateTemplate({ resume }: { resume: Resume }) {
  const { personalInfo, education, experience, skills, projects, socialLinks } = resume;

  return (
    <div className="flex min-h-screen font-sans text-slate-800 leading-relaxed max-w-[850px] mx-auto bg-white border border-slate-200">
      {/* Sidebar */}
      <aside className="w-1/3 bg-slate-900 text-white p-8 space-y-10">
        <div className="space-y-4">
           <ProfilePhoto personalInfo={personalInfo} className="w-32 h-32 mx-auto border-4 border-slate-800" />
           <div className="space-y-1">
             <h1 className="text-xl font-black uppercase tracking-tight text-white text-center">{personalInfo.fullName || 'Your Name'}</h1>
             <p className="text-[10px] text-slate-400 text-center font-bold tracking-widest uppercase">Expert Perspective</p>
           </div>
        </div>

        <section className="space-y-4">
           <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-slate-800 pb-2">Contact</h2>
           <div className="space-y-3 text-sm text-slate-300 font-sans">
             {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
             {personalInfo.phone && <div>{personalInfo.phone}</div>}
             {personalInfo.location && <div>{personalInfo.location}</div>}
             {personalInfo.website && <div className="text-white border-b border-white inline-block text-xs">{personalInfo.website}</div>}
           </div>
        </section>

        {socialLinks && socialLinks.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-slate-800 pb-2">Platforms</h2>
            <div className="space-y-3 text-xs text-slate-300 font-sans font-bold uppercase tracking-widest">
              {socialLinks.map((link) => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">{link.platform}</a>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-slate-800 pb-2">Expertise</h2>
            <div className="flex flex-col gap-2">
              {skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300">
                  <div className="w-1 h-1 rounded-full bg-slate-500" />
                  {skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 border-b border-slate-700 pb-2">Education</h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <h3 className="font-bold text-sm text-white leading-tight">{edu.degree}</h3>
                  <p className="text-xs text-slate-400">{edu.institution}</p>
                  <p className="text-[10px] text-slate-500">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 space-y-10">
        {personalInfo.summary && (
          <section>
            <h2 className="text-lg font-bold text-slate-900 border-b-2 border-slate-100 pb-2 mb-4">Executive Summary</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-lg font-black uppercase tracking-tight text-slate-900 border-b border-slate-100 pb-2 mb-6">Professional Experience</h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l border-slate-200">
                  <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-slate-900" />
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-900">{exp.position}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{exp.startDate} — {exp.endDate || 'Present'}</span>
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">{exp.company}</div>
                  <p className="text-sm text-slate-600 leading-relaxed italic whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-slate-900 border-b-2 border-slate-100 pb-2 mb-6">Key Projects</h2>
            <div className="grid grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-slate-50 p-4 rounded-xl space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">{proj.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{proj.description}</p>
                  {proj.link && <span className="text-[10px] text-blue-600 font-bold block">{proj.link}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {resume.achievements && resume.achievements.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-slate-900 border-b-2 border-slate-100 pb-2 mb-6">Notable Achievements</h2>
            <ul className="space-y-4">
              {resume.achievements.map((ach, i) => (
                <li key={i} className="flex items-start gap-4 text-sm text-slate-600">
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
                   {ach}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
