import { Check, Trash2 } from 'lucide-react';
import { TemplateId } from '../types';
import { cn } from '../lib/utils';
import { useState } from 'react';

interface Props {
  selected: TemplateId;
  onSelect: (id: TemplateId) => void;
  onClose?: () => void;
}

const templates = [
  { id: 'sienna', name: 'Sienna', desc: 'Earth Tones', color: 'bg-[#7a5c46]' },
  { id: 'ochre', name: 'Ochre', desc: 'Warm Ivory', color: 'bg-[#d9c5b2]' },
  { id: 'minimalist', name: 'Editorial', desc: 'Serif focus', color: 'bg-white border-slate-900 border-l-4' },
  { id: 'executive', name: 'Executive', desc: 'High Impact', color: 'bg-[#fbfaf8] border-t-4 border-slate-900' },
  { id: 'tech', name: 'Terminal', desc: 'Mono Grid', color: 'bg-slate-900 text-white' },
  { id: 'bold', name: 'Impact', desc: 'Large Headlines', color: 'bg-white shadow-inner border shadow-xl' },
  { id: 'elegant', name: 'Elegant', desc: 'Luxury Serif', color: 'bg-[#fffcf5] border-[#b4a07d] border-t' },
  { id: 'grid', name: 'The Grid', desc: 'Brutalist', color: 'bg-white border-[6px] border-slate-900' },
  { id: 'corporate', name: 'Corporate', desc: 'Strong Sidebar', color: 'bg-slate-900 shadow-xl' },
  { id: 'creative', name: 'Creative', desc: 'Bold Layouts', color: 'bg-orange-500' },
  { id: 'modern', name: 'Modern', desc: 'Clean Grid', color: 'bg-slate-50 border border-slate-200' },
  { id: 'ats-friendly', name: 'Standard', desc: 'ATS Compliant', color: 'bg-white border-2 border-slate-900' },
];

export default function TemplateSelector({ selected, onSelect, onClose }: Props) {
  const [savedEntries, setSavedEntries] = useState<Record<string, boolean>>({});
  
  const handleSelect = (id: TemplateId) => {
    onSelect(id);
    if (savedEntries['template']) {
      setSavedEntries(prev => ({ ...prev, template: false }));
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => handleSelect(t.id as TemplateId)}
          className={cn(
            "group relative flex flex-col items-start p-6 rounded-2xl border transition-all text-left",
            selected === t.id 
              ? "border-slate-900 bg-white shadow-2xl scale-[1.02]" 
              : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
          )}
        >
          <div className="flex items-center justify-between w-full mb-4">
            <div className={cn("w-14 h-20 rounded shadow-sm", t.color)} />
            {selected === t.id && (
              <div className="flex flex-col items-end gap-2">
                <div className="w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center text-white">
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between items-end w-full">
            <div>
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-widest">{t.name}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{t.desc}</p>
            </div>
            {selected === t.id && (
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 pb-1 border-b-2 border-slate-900">
                Selected
              </span>
            )}
          </div>
        </button>
      ))}
      {selected && !savedEntries['template'] && (
        <div className="sticky bottom-6 mt-4">
          <button 
            className="w-full py-4 bg-slate-900 text-white rounded-xl shadow-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-slate-800 transition-all hover:translate-y-[-2px] active:translate-y-[0px] flex items-center justify-center gap-3"
            onClick={() => {
              setSavedEntries(prev => ({ ...prev, template: true }));
              if (onClose) {
                setTimeout(() => onClose(), 600);
              }
            }}
          >
            <Check className="w-4 h-4" /> Select Template
          </button>
        </div>
      )}
      {savedEntries['template'] && (
        <div className="mt-8 pt-8 border-t border-slate-100">
          <button 
            onClick={() => {
              onSelect('ats-friendly');
              setSavedEntries(prev => ({ ...prev, template: false }));
            }}
            className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-red-500 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-3.5 h-3.5" /> Remove Custom Template
          </button>
        </div>
      )}
    </div>
  );
}
