import { Resume } from '../../types';
import ProfilePhoto from '../ProfilePhoto';

export default function AtsTemplate({ resume }: { resume: Resume }) {
  const { personalInfo, education, experience, skills, projects, socialLinks } = resume;

  return (
    <div className="p-12 font-serif text-slate-900 leading-snug max-w-[850px] mx-auto bg-white min-h-screen border border-slate-200">
      {/* Header */}
      <header className="flex justify-between items-start mb-12 border-b border-slate-900 pb-8">
        <div className="flex-1 text-center pl-24">
          <h1 className="text-4xl font-black uppercase tracking-tight mb-4 leading-none">{personalInfo.fullName || 'Your Name'}</h1>
          <div className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-slate-400">
            {[
              personalInfo.location,
              personalInfo.phone,
              personalInfo.email,
              personalInfo.website
            ].filter(Boolean).join('  /  ')}
          </div>
          {socialLinks && socialLinks.length > 0 && (
            <div className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-slate-400 mt-2">
              {socialLinks.map((link, i) => (
                <span key={link.id}>
                  {i > 0 && <span className="mx-2">/</span>}
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors uppercase">{link.platform}</a>
                </span>
              ))}
            </div>
          )}
        </div>
        <ProfilePhoto personalInfo={personalInfo} className="w-24 h-24 shadow-sm" />
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-10">
          <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-slate-300 border-b border-slate-50 mb-4 pb-1">Professional Overview</h2>
          <p className="text-sm text-justify italic leading-relaxed text-slate-700">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-slate-300 border-b border-slate-50 mb-6 pb-1">Experience</h2>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-[14px] uppercase tracking-wide">
                  <span>{exp.company}</span>
                  <span className="font-sans text-[10px] text-slate-400">{exp.location || ''}</span>
                </div>
                <div className="flex justify-between italic text-[13px] mb-2 text-slate-500">
                  <span>{exp.position}</span>
                  <span className="font-sans font-bold text-[10px] not-italic tracking-widest">{exp.startDate} – {exp.endDate || 'Present'}</span>
                </div>
                <p className="text-[14px] leading-relaxed whitespace-pre-wrap text-slate-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-4">Education</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between font-bold text-sm">
                  <span>{edu.institution}</span>
                  <span>{edu.location || ''}</span>
                </div>
                <div className="flex justify-between italic text-sm">
                  <span>{edu.degree}</span>
                  <span>{edu.startDate} – {edu.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Skills</h2>
          <p className="text-sm">
            <span className="font-bold">Technical Skills:</span> {skills.join(', ')}
          </p>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-4">Projects</h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="font-bold text-sm">{proj.name} {proj.link && <span className="font-normal text-xs">| {proj.link}</span>}</div>
                <p className="text-sm">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {resume.achievements && resume.achievements.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Honors & Awards</h2>
          <ul className="list-disc list-inside text-sm">
            {resume.achievements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
