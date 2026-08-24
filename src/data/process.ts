import type { ProcessStep } from '../types';

export const processData: ProcessStep[] = [
  {
    step: '01',
    code: 'STEP_01',
    name: 'Understanding Your Business & Goals',
    duration: 'Week 1',
    description: 'We align on what your business offers, who your ideal clients are, and what action you want visitors to take. We define the sitemap, page structure, and clear milestone dates.',
    deliverables: [
      'Sitemap & Page Structure Blueprint',
      'Content Outline & Conversion Pathways',
      'Project Milestones & Delivery Schedule',
    ],
  },
  {
    step: '02',
    code: 'STEP_02',
    name: 'Layout & Visual Design',
    duration: 'Weeks 1 – 2',
    description: 'We design high-fidelity desktop and mobile layouts tailored to your brand. You review and approve the exact typography, structure, and look before we begin development.',
    deliverables: [
      'Desktop & Mobile Visual Designs',
      'Typography & Color System Specification',
      'Interactive Design Review & Approval',
    ],
  },
  {
    step: '03',
    code: 'STEP_03',
    name: 'Fast, Mobile-First Development',
    duration: 'Weeks 2 – 4',
    description: 'We build your website using modern, lightweight code. We optimize every page for instant loading speed, clean responsive behavior on all devices, and search visibility.',
    deliverables: [
      'Clean React & TypeScript Codebase',
      'Mobile-First Responsive Testing',
      'Speed & Performance Optimization',
      'Contact Form & Lead Routing Setup',
    ],
  },
  {
    step: '04',
    code: 'STEP_04',
    name: 'Testing, Launch & Full Handover',
    duration: 'Launch Week',
    description: 'We conduct final cross-device testing, connect your custom domain and SSL, and transfer full ownership of the codebase and assets to you with zero lock-in.',
    deliverables: [
      'Cross-Device & Browser Quality Check',
      'Custom Domain & SSL Setup Assistance',
      'Full Source Code & Asset Transfer',
      'Client Walkthrough & Documentation',
    ],
  },
];
