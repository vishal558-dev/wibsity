import type { ProcessStep } from '../types';

export const processData: ProcessStep[] = [
  {
    step: '01',
    code: 'PHASE_01',
    name: 'Discovery & Architecture Blueprint',
    duration: 'Week 1',
    description: 'We align on your business objectives, target audience expectations, key service offerings, and conversion pathways. We produce a structured sitemap, content architecture, and technical specification.',
    deliverables: [
      'Site Architecture & Content Blueprint',
      'User Journey & Conversion Funnel Map',
      'Technical Scope & Milestone Calendar',
    ],
  },
  {
    step: '02',
    code: 'PHASE_02',
    name: 'Interactive Design & Typography Craft',
    duration: 'Weeks 1 – 2',
    description: 'We develop high-fidelity visual layouts grounded in our Swiss editorial aesthetic—refining typography, responsive grid structures, spacing, and micro-interactions. You review and approve the exact look and feel.',
    deliverables: [
      'High-Fidelity Desktop & Mobile Layouts',
      'Design System & Component Library Preview',
      'Interactive Prototype Review Session',
    ],
  },
  {
    step: '03',
    code: 'PHASE_03',
    name: 'Clean Code Engineering & Optimization',
    duration: 'Weeks 2 – 4',
    description: 'We translate approved designs into clean, modular, accessible code. We implement responsive viewports, fast-loading asset pipelines, smooth interactive states, and search engine optimization.',
    deliverables: [
      'Production React / TypeScript Codebase',
      'Mobile-First Responsive Verification',
      'Core Web Vitals & Sub-Second Speed Tuning',
      'Form & Lead Routing Integration',
    ],
  },
  {
    step: '04',
    code: 'PHASE_04',
    name: 'Quality Assurance, Launch & Full Handover',
    duration: 'Launch Week',
    description: 'Comprehensive testing across browsers and screen sizes, domain DNS setup, SSL configuration, and full repository/asset handover. You maintain 100% ownership with zero lock-in.',
    deliverables: [
      'Cross-Browser & Device QA Audit',
      'DNS & Custom Domain Launch Assistance',
      'Full Source Code & Asset Handover',
      'Client Walkthrough & Video Reference Guide',
    ],
  },
];
