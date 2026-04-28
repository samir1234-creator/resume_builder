import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { Resume } from '../types';

export const exportToDocx = async (resume: Resume) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: resume.personalInfo.fullName || 'Your Name',
              bold: true,
              size: 32,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: [
                resume.personalInfo.location,
                resume.personalInfo.phone,
                resume.personalInfo.email,
                resume.personalInfo.website
              ].filter(Boolean).join(' | '),
              size: 20,
            }),
          ],
        }),

        // Summary
        ...(resume.personalInfo.summary ? [
          new Paragraph({ text: '', spacing: { before: 200 } }),
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun({ text: 'SUMMARY', bold: true, size: 24 })],
          }),
          new Paragraph({
            children: [new TextRun({ text: resume.personalInfo.summary, size: 20 })],
          }),
        ] : []),

        // Experience
        ...(resume.experience.length > 0 ? [
          new Paragraph({ text: '', spacing: { before: 200 } }),
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun({ text: 'EXPERIENCE', bold: true, size: 24 })],
          }),
          ...resume.experience.flatMap(exp => [
            new Paragraph({
              children: [
                new TextRun({ text: `${exp.position} | ${exp.company}`, bold: true, size: 22 }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `${exp.startDate} – ${exp.endDate || 'Present'}`, italics: true, size: 20 }),
              ],
            }),
            new Paragraph({
              children: [new TextRun({ text: exp.description, size: 20 })],
            }),
            new Paragraph({ text: '' }),
          ])
        ] : []),

        // Education
        ...(resume.education.length > 0 ? [
          new Paragraph({ text: '', spacing: { before: 200 } }),
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun({ text: 'EDUCATION', bold: true, size: 24 })],
          }),
          ...resume.education.flatMap(edu => [
            new Paragraph({
              children: [
                new TextRun({ text: `${edu.degree} | ${edu.institution}`, bold: true, size: 22 }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `${edu.startDate} – ${edu.endDate}`, italics: true, size: 20 }),
              ],
            }),
            new Paragraph({ text: '' }),
          ])
        ] : []),

        // Projects
        ...(resume.projects && resume.projects.length > 0 ? [
          new Paragraph({ text: '', spacing: { before: 200 } }),
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun({ text: 'PROJECTS', bold: true, size: 24 })],
          }),
          ...resume.projects.flatMap(proj => [
            new Paragraph({
              children: [
                new TextRun({ text: proj.name, bold: true, size: 22 }),
              ],
            }),
            ...(proj.link ? [
              new Paragraph({
                children: [
                   new TextRun({ text: proj.link, color: '0000FF', size: 20 }),
                ],
              }),
            ] : []),
            new Paragraph({
              children: [new TextRun({ text: proj.description, size: 20 })],
            }),
            new Paragraph({ text: '' }),
          ])
        ] : []),

        // Achievements
        ...(resume.achievements && resume.achievements.length > 0 ? [
          new Paragraph({ text: '', spacing: { before: 200 } }),
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun({ text: 'ACHIEVEMENTS', bold: true, size: 24 })],
          }),
          ...resume.achievements.map(ach => 
            new Paragraph({
              bullet: { level: 0 },
              children: [new TextRun({ text: ach, size: 20 })],
            })
          )
        ] : []),

        // Skills
        ...(resume.skills.length > 0 ? [
          new Paragraph({ text: '', spacing: { before: 200 } }),
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun({ text: 'SKILLS', bold: true, size: 24 })],
          }),
          new Paragraph({
            children: [new TextRun({ text: resume.skills.join(', '), size: 20 })],
          }),
        ] : []),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${resume.title.replace(/\s+/g, '_')}.docx`);
};
