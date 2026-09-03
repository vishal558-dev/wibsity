export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/myeyjlye';

export const budgetOptions = ['Under ₹15,000', '₹20,000 – ₹50,000', '₹50,000+', 'Not sure yet'] as const;

export const projectTypeOptions = [
  { id: 'business-website', title: 'Business Website', tagline: 'A multi-page site that builds trust and captures inquiries.', iconName: 'Layout' },
  { id: 'landing-page', title: 'Landing Page', tagline: 'A focused single page for a launch or campaign.', iconName: 'Layers' },
  { id: 'website-redesign', title: 'Website Redesign', tagline: 'A modern overhaul of an existing website.', iconName: 'RefreshCw' },
  { id: 'ecommerce-website', title: 'E-commerce Website', tagline: 'A storefront built to sell products online.', iconName: 'ShoppingCart' },
  { id: 'custom-experience', title: 'Custom Experience', tagline: 'A tailored interactive tool, booking flow, or portal.', iconName: 'Sliders' },
  { id: 'not-sure', title: 'Not sure yet', tagline: "Let's figure it out together.", iconName: 'HelpCircle' },
] as const;
