import { PersonalInfo } from '../types';
import { cn } from '../lib/utils';

export default function ProfilePhoto({ personalInfo, className }: { personalInfo: PersonalInfo, className?: string }) {
  // Only hide if showPhoto is explicitly false OR if there is no image at all
  if (personalInfo.showPhoto === false || !personalInfo.photoURL) return null;

  return (
    <div className={cn(
      "overflow-hidden bg-slate-50 shrink-0 border border-slate-100/50 shadow-inner",
      personalInfo.photoFrame === 'circle' ? "rounded-full" : 
      personalInfo.photoFrame === 'rounded' ? "rounded-2xl" : "rounded-none",
      className
    )}>
      <img 
        src={personalInfo.photoURL} 
        alt={personalInfo.fullName} 
        className="w-full h-full object-cover select-none"
      />
    </div>
  );
}
