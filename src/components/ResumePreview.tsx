import { useEffect, useRef } from 'react';
import { Resume, TemplateId } from '../types';
import html2pdf from 'html2pdf.js';
import MinimalistTemplate from './templates/MinimalistTemplate';
import CorporateTemplate from './templates/CorporateTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ModernTemplate from './templates/ModernTemplate';
import AtsTemplate from './templates/AtsTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import TechTemplate from './templates/TechTemplate';
import BoldTemplate from './templates/BoldTemplate';
import ElegantTemplate from './templates/ElegantTemplate';
import GridTemplate from './templates/GridTemplate';
import SiennaTemplate from './templates/SiennaTemplate';
import OchreTemplate from './templates/OchreTemplate';

interface Props {
  resume: Resume;
}

export default function ResumePreview({ resume }: Props) {
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleExport = async () => {
      if (!resumeRef.current) return;
      
      // Small delay to ensure any layout changes settle
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const element = resumeRef.current;
      const opt = {
        margin: [0, 0, 0, 0],
        filename: `${resume.title.replace(/\s+/g, '_') || 'Resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          letterRendering: true,
          logging: false,
          scrollY: -window.scrollY,
          onclone: (clonedDoc) => {
            // Remove any style tags that might contain oklab/oklch triggers
            // or explicitly override them for the cloned preview
            const styles = clonedDoc.getElementsByTagName('style');
            for (let i = 0; i < styles.length; i++) {
              let css = styles[i].innerHTML;
              if (css.includes('oklch') || css.includes('oklab')) {
                // Brute force replacement of oklch/oklab with safe fallbacks
                styles[i].innerHTML = css.replace(/oklch\([^)]+\)/g, 'rgba(0,0,0,0.1)')
                                         .replace(/oklab\([^)]+\)/g, 'rgba(0,0,0,0.1)');
              }
            }
          }
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      try {
        await html2pdf().from(element).set(opt).save();
      } catch (error) {
        console.error('PDF Export failed:', error);
        alert('Failed to export PDF. Please try again.');
      } finally {
        window.dispatchEvent(new CustomEvent('pdf-complete'));
      }
    };

    window.addEventListener('export-pdf', handleExport);
    return () => window.removeEventListener('export-pdf', handleExport);
  }, [resume]);

  const renderTemplate = () => {
    switch (resume.templateId as TemplateId) {
      case 'sienna':
        return <SiennaTemplate resume={resume} />;
      case 'ochre':
        return <OchreTemplate resume={resume} />;
      case 'executive':
        return <ExecutiveTemplate resume={resume} />;
      case 'tech':
        return <TechTemplate resume={resume} />;
      case 'bold':
        return <BoldTemplate resume={resume} />;
      case 'elegant':
        return <ElegantTemplate resume={resume} />;
      case 'grid':
        return <GridTemplate resume={resume} />;
      case 'corporate':
        return <CorporateTemplate resume={resume} />;
      case 'creative':
        return <CreativeTemplate resume={resume} />;
      case 'modern':
        return <ModernTemplate resume={resume} />;
      case 'ats-friendly':
        return <AtsTemplate resume={resume} />;
      case 'minimalist':
      default:
        return <MinimalistTemplate resume={resume} />;
    }
  };

  return (
    <div className="w-full h-full flex justify-center p-8 bg-slate-100/50">
      <div 
        ref={resumeRef}
        className="w-full max-w-[850px] bg-white shadow-2xl overflow-hidden border border-slate-200 ring-1 ring-slate-900/5"
        style={{ minHeight: '1123px' }} 
      >
        {renderTemplate()}
      </div>
    </div>
  );
}
