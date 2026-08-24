import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '../common/Button';

interface NavbarProps {
  onOpenInquiry: (projectReference?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work', index: '01' },
    { label: 'Services', href: '#services', index: '02' },
    { label: 'Principles', href: '#principles', index: '03' },
    { label: 'Process', href: '#process', index: '04' },
    { label: 'FAQ', href: '#faq', index: '05' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-canvas/90 backdrop-blur-md border-b border-border-hairline py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="wibsity home"
          >
            <span className="font-sans text-xl sm:text-2xl font-extrabold tracking-tightest text-fg group-hover:text-neutral-300 transition-colors">
              wibsity
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 border border-border-hairline bg-canvas-surface text-[10px] font-mono uppercase tracking-wider text-fg-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Accepting Projects
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-sans font-medium tracking-wide text-fg-muted hover:text-fg transition-colors flex items-center gap-1.5 py-1"
              >
                <span className="font-mono text-fg-faint text-[10px]">{link.index}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onOpenInquiry()}
              icon={<ArrowUpRight size={14} />}
            >
              Start a Project
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onOpenInquiry()}
              className="text-xs px-3 py-1.5"
            >
              Inquire
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-fg-muted hover:text-fg focus:outline-none border border-border-hairline bg-canvas-surface"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="sm:hidden bg-canvas-surface border-b border-border-hairline px-4 pt-4 pb-6 overflow-hidden"
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 border-b border-border-hairline text-sm font-sans text-fg-muted hover:text-fg"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-fg-faint">{link.index}</span>
                </a>
              ))}
              <div className="pt-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInquiry();
                  }}
                  className="w-full justify-center"
                  icon={<ArrowUpRight size={16} />}
                >
                  Start a Project
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
