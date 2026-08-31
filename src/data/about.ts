import { Eye, Zap, Target, type LucideIcon } from 'lucide-react';

export interface Principle {
  index: string;
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const principlesData: Principle[] = [
  {
    index: '01',
    icon: Eye,
    title: 'First Impressions Command Trust',
    desc: 'Clean typography, generous spacing, and modern design signal competence the moment a visitor lands on your site.',
  },
  {
    index: '02',
    icon: Zap,
    title: 'Speed & Mobile Performance',
    desc: 'Our code is lightweight and optimized for sub-second loading, so mobile visitors never bounce due to sluggish performance.',
  },
  {
    index: '03',
    icon: Target,
    title: 'Clarity & Conversion',
    desc: 'Great web design makes it effortless for visitors to understand what you do and take action.',
  },
];
