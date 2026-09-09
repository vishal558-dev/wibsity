import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LogoMark } from '../common/Logo';
import { IconMenu, IconClose, IconWhatsApp } from '../common/icons';
import { CONTACT_INFO } from '../../data/contact';
import { cn } from '../../utils/cn';

const MENU_ID = 'site-menu';

const navLinks = [
  { label: 'Services', to: '/services' },
  { label: 'Studio', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

/**
 * Tracks which section ground is behind the header, so the bar can adopt that
 * field and grow a hairline instead of dissolving into an identical dark band.
 *
 * Deliberately narrow, in the same shape as the hero's scroll handler: one
 * observer, one attribute, no per-frame work. The detection line is the
 * header's own bottom edge, expressed as a rootMargin that collapses the
 * viewport to a 1px band there.
 *
 * Re-runs on route change (keyed on `pathname`) since sections differ per
 * page. `header[data-over='petrol']` and `header[data-over='ink']` in
 * index.css style the states this hook tracks.
 */
function useGroundBehindHeader(pathname: string, headerHeight = 64) {
  const [ground, setGround] = useState('paper');

  useEffect(() => {
    const sections = document.querySelectorAll('section[data-field]');
    if (!sections.length) return;

    // Clamped rather than a bare subtraction: a viewport shorter than the
    // header (or not yet laid out — some embedded/automation contexts report
    // `innerHeight` as 0 on the very first tick) would otherwise produce a
    // negative-of-negative bottom margin, which the API rejects outright and
    // throws from inside the effect, taking the whole tree down with it.
    const bottomMargin = Math.max(window.innerHeight - headerHeight, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setGround(entry.target.getAttribute('data-field') ?? 'paper');
          }
        }
      },
      { rootMargin: `-${headerHeight - 1}px 0px -${bottomMargin}px 0px` }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname, headerHeight]);

  return ground;
}

/**
 * A sticky ink nameplate over a paper page.
 *
 * It uses the site's own inverted field rather than a new treatment, and it is
 * the single strongest identity move on the page — the brand sits in a solid
 * band of ink that travels with you, and everything below it is document. No
 * backdrop blur and no translucent colour-mix background: the previous
 * header's glass effect was both a generic tell and a per-frame compositing
 * cost on every scroll event.
 *
 * The theme toggle is gone. The site is light only now, so there was nothing
 * for it to switch, and the slot it occupied went to the CTA — the only
 * control up here with a job.
 *
 * Nav links get a rule that draws in from the left on hover, the same gesture
 * the section measures and the service index use. The active route's rule is
 * simply already drawn.
 *
 * Mobile is not a stacked version of this. The menu button opens a full-height
 * sheet with the routes set at display size — a composition designed for a
 * thumb rather than a desktop dropdown squeezed into a phone.
 */
export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const ground = useGroundBehindHeader(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Close the sheet on navigation. Derived during render rather than from an
  // effect: reading it from the location (instead of each link's onClick) means
  // it also closes on a browser back gesture, and adjusting the state here
  // avoids the extra committed render an effect would cause.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    // `main`/`footer` (not the header the sheet lives in) go `inert` so Tab
    // can't reach the page underneath a sheet that visually covers it —
    // without this, a keyboard user could tab past the overlay into content
    // that's hidden behind it. The toggle button itself stays reachable,
    // since it's how the sheet closes.
    const buried = document.querySelectorAll<HTMLElement>('#main, footer');
    buried.forEach((el) => el.setAttribute('inert', ''));
    firstLinkRef.current?.focus();
    // Captured now, not read from the ref in cleanup: the button is a
    // stable, always-rendered element, but the lint rule (correctly, in
    // general) can't know that a ref's `.current` won't have changed by the
    // time cleanup runs.
    const toggleEl = toggleRef.current;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      buried.forEach((el) => el.removeAttribute('inert'));
      // Closing via Escape or a route change would otherwise drop focus to
      // <body>; return it to the control that owns this sheet.
      toggleEl?.focus();
    };
  }, [open]);

  return (
    <header className="field-ink sticky top-0 z-40" data-over={ground}>
      <div className="mx-auto w-full max-w-[78rem] px-gutter">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link
            to="/"
            className="group flex h-16 items-center gap-2.5 shrink-0"
            aria-label="wibsity — home"
          >
            <LogoMark size={24} />
            <span
              className="widen font-sans text-lg font-semibold lowercase leading-none"
              style={{ letterSpacing: '-0.045em' }}
            >
              wibsity
            </span>
          </Link>

          <nav className="hidden md:flex items-stretch gap-9" aria-label="Main">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'nav-link relative flex h-16 items-center font-sans text-ui transition-colors',
                    isActive ? 'text-fg is-active' : 'text-fg-muted hover:text-fg'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* The label needs its own element: `.btn-primary::before` is the
                hover fill and paints over bare text nodes, which is exactly how
                this button spent one build rendering as an empty white box. */}
            <Link to="/contact" className="btn btn-primary btn-sm">
              <span>Start a project</span>
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden w-11 h-11 -mr-3 inline-flex items-center justify-center text-fg"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls={MENU_ID}
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Full-height sheet, not a dropdown. Rendered inside the header so it
          inherits the sticky context and needs no portal. */}
      {open && (
        <div
          id={MENU_ID}
          className="field-ink md:hidden fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto"
        >
          <div className="mx-auto w-full max-w-[78rem] px-gutter py-10 flex flex-col h-full">
            <nav className="flex flex-col" aria-label="Main">
              {navLinks.map((link, i) => (
                <NavLink
                  key={link.to}
                  ref={i === 0 ? firstLinkRef : undefined}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      'measure font-sans text-2xl py-6 tracking-tight',
                      isActive ? 'text-fg' : 'text-fg-muted'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto pt-10">
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full"
              >
                <IconWhatsApp size={17} className="whatsapp-icon" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
