export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  photoURL?: string;
  showPhoto?: boolean;
  photoFrame?: 'square' | 'rounded' | 'circle';
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
  location?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  location?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  templateId: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
  certifications: string[];
  achievements: string[];
  socialLinks?: { id: string; platform: string; url: string }[];
  createdAt: any;
  updatedAt: any;
}

export type TemplateId = 'minimalist' | 'corporate' | 'creative' | 'modern' | 'ats-friendly' | 'executive' | 'tech' | 'bold' | 'elegant' | 'grid' | 'sienna' | 'ochre';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: any;
}
