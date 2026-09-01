import { Eye, Accessibility, Target, type LucideIcon } from 'lucide-react';

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
    icon: Accessibility,
    title: 'Accessible by Default',
    desc: 'Every build targets WCAG AA contrast and full keyboard navigation from day one — not a retrofit after launch, which is where most template sites stop.',
  },
  {
    index: '03',
    icon: Target,
    title: 'Clarity & Conversion',
    desc: 'Great web design makes it effortless for visitors to understand what you do and take action.',
  },
];
