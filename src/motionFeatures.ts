// Loaded async by App.tsx's LazyMotion boundary (see the loadFeatures function
// there) instead of being part of the eager entry bundle. domMax (not the
// smaller domAnimation) is required because Navbar's active-nav indicator
// uses layoutId, which needs the full layout-animation feature set.
export { domMax as default } from 'motion/react';
