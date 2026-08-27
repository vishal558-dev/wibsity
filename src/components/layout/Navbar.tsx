import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { Button } from '../common/Button';
import { CONTACT_INFO } from '../../data/contact';
import { smoothScrollToTop } from '../../utils/scroll';

export const Navbar: React.FC = () => {
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
    { label: 'Home', to: '/', index: '00', end: true },
    { label: 'Services', to: '/services', index: '01' },
    { label: 'Studio', to: '/about', index: '02' },
    { label: 'Contact', to: '/contact', index: '03' },
  ];

  const whatsappUrl = CONTACT_INFO.whatsappUrl;

  const handleNavClick = () => {
    smoothScrollToTop(0.9);
  };

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
    smoothScrollToTop(0.9);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-canvas/90 backdrop-blur-md border-b border-border-hairline py-2.5 sm:py-3.5'
          : 'bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={handleNavClick}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="wibsity home"
          >
            <img
              src="/logo.png"
              alt="wibsity"
              className="h-6 sm:h-7 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
            />
            <span className="hidden sm:inline-flex items-center gap-2 text-xs font-sans font-medium text-fg-muted pl-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Accepting Projects
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `text-xs font-sans tracking-wide transition-all flex items-center gap-1.5 py-1 relative ${
                    isActive
                      ? 'text-fg font-semibold'
                      : 'text-fg-muted hover:text-fg font-medium'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`font-mono text-[10px] ${isActive ? 'text-accent-light' : 'text-fg-faint'}`}>
                      {link.index}
                    </span>
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gradient-to-r from-accent to-accent-light"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Actions: Clean Call & WhatsApp Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              href={CONTACT_INFO.phoneHref}
              icon={<Phone size={13} />}
              className="text-xs"
            >
              Call Us
            </Button>
            <Button
              variant="primary"
              size="sm"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={<WhatsAppIcon size={13} />}
              className="text-xs"
            >
              WhatsApp
            </Button>
          </div>

          {/* Mobile Quick Action Icons */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 shrink-0 border border-border-hairline bg-canvas-surface text-fg hover:border-fg transition-colors flex items-center justify-center"
              aria-label="WhatsApp wibsity"
            >
              <WhatsAppIcon size={16} />
            </a>
            <a
              href={CONTACT_INFO.phoneHref}
              className="w-9 h-9 shrink-0 border border-border-hairline bg-canvas-surface text-fg hover:border-fg transition-colors flex items-center justify-center"
              aria-label="Call wibsity"
            >
              <Phone size={16} />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 shrink-0 text-fg-muted hover:text-fg focus:outline-none border border-border-hairline bg-canvas-surface flex items-center justify-center cursor-pointer transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
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
            className="md:hidden bg-canvas-surface border-b border-border-hairline px-4 pt-4 pb-6 overflow-hidden"
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={handleMobileNavClick}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-2 border-b border-border-hairline text-sm font-sans ${
                      isActive ? 'text-fg font-semibold' : 'text-fg-muted hover:text-fg'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      <span className={`font-mono text-xs ${isActive ? 'text-accent-light' : 'text-fg-faint'}`}>
                        {link.index}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
              
              {/* Clean Call & WhatsApp Buttons in Mobile Drawer */}
              <div className="pt-3 space-y-2">
                <Button
                  variant="primary"
                  size="md"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full justify-center"
                  icon={<WhatsAppIcon size={16} />}
                >
                  Chat on WhatsApp
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  href={CONTACT_INFO.phoneHref}
                  className="w-full justify-center text-xs"
                  icon={<Phone size={15} />}
                >
                  Call Us
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
