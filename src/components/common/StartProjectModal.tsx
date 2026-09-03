import React, { useId, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import {
  X,
  ArrowLeft,
  Layout,
  Layers,
  RefreshCw,
  Sliders,
  ShoppingCart,
  HelpCircle,
  Loader2,
  CheckCircle2,
  AlertCircle,
  type LucideIcon,
} from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { cn } from '../../utils/cn';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { FORMSPREE_ENDPOINT, budgetOptions, projectTypeOptions } from '../../data/projectInquiry';

interface Answers {
  name: string;
  phone: string;
  budget: string;
  projectType: string;
}

const initialAnswers: Answers = {
  name: '',
  phone: '',
  budget: '',
  projectType: '',
};

type Phase = 'form' | 'submitting' | 'success' | 'confirm-discard';

const projectTypeIcons: Record<string, LucideIcon> = {
  Layout,
  Layers,
  RefreshCw,
  ShoppingCart,
  Sliders,
  HelpCircle,
};

const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 24 : -24 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -24 : 24 }),
};

export interface StartProjectModalProps {
  open: boolean;
  onClose: () => void;
}

export const StartProjectModal: React.FC<StartProjectModalProps> = ({ open, onClose }) => {
  const titleId = useId();
  const prefersReduced = useReducedMotion();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [phase, setPhase] = useState<Phase>('form');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const hasAnswers = Object.values(answers).some((v) => v.trim().length > 0);

  const closeAndReset = () => {
    setStep(1);
    setDirection(1);
    setAnswers(initialAnswers);
    setPhase('form');
    setSubmitError(null);
    onClose();
  };

  const requestClose = () => {
    if (phase === 'submitting') return;
    if (phase !== 'success' && hasAnswers) {
      setPhase('confirm-discard');
      return;
    }
    closeAndReset();
  };

  const goTo = (nextStep: number) => {
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  };

  const canAdvanceStep1 = answers.name.trim().length > 0;
  const canAdvanceStep2 = answers.phone.trim().length > 0;
  const canSubmit = answers.projectType.trim().length > 0;

  const selectBudget = (value: string) => {
    setAnswers((a) => ({ ...a, budget: value }));
    goTo(4);
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setPhase('submitting');
    setSubmitError(null);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(answers),
      });
      if (!res.ok) throw new Error('Submission failed');
      setPhase('success');
    } catch {
      setSubmitError('Something went wrong sending your inquiry. Please try again, or reach us directly on WhatsApp.');
      setPhase('form');
    }
  };

  const handleStep1KeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    if (canAdvanceStep1) goTo(2);
  };

  const handleStep2KeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    if (canAdvanceStep2) goTo(3);
  };

  return (
    <Modal open={open} onClose={requestClose} labelledBy={titleId}>
      <div className="p-5 sm:p-8">
        {phase === 'confirm-discard' ? (
          <div className="space-y-6 py-4 text-center">
            <h2 id={titleId} className="text-lg font-bold text-fg">
              Discard your answers?
            </h2>
            <p className="text-sm text-fg-muted">
              You've started your inquiry. Closing now will lose what you've entered.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button variant="ghost" size="md" onClick={() => setPhase('form')}>
                Keep editing
              </Button>
              <Button variant="secondary" size="md" onClick={closeAndReset}>
                Discard
              </Button>
            </div>
          </div>
        ) : phase === 'success' ? (
          <div className="space-y-4 py-6 text-center">
            <CheckCircle2 size={40} className="mx-auto text-accent-light" aria-hidden="true" />
            <h2 id={titleId} className="text-lg font-bold text-fg">
              Inquiry sent.
            </h2>
            <p className="text-sm text-fg-muted max-w-sm mx-auto">
              Thanks — we've received your project details and will get back to you within hours.
            </p>
            <Button variant="primary" size="md" onClick={closeAndReset} className="mt-2">
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 id={titleId} className="text-lg font-bold text-fg">
                  Start a project
                </h2>
                <p className="text-xs text-fg-muted mt-0.5">Step {step} of 4</p>
              </div>
              <button
                type="button"
                onClick={requestClose}
                aria-label="Close"
                className="p-2 -m-2 text-fg-muted hover:text-accent-light transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex gap-1.5 mb-8" aria-hidden="true">
              {[1, 2, 3, 4].map((s) => (
                <span
                  key={s}
                  className={cn('h-1 flex-1 rounded-full transition-colors', s <= step ? 'bg-accent' : 'bg-border-hairline')}
                />
              ))}
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <m.div
                key={step}
                custom={direction}
                variants={prefersReduced ? undefined : stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: prefersReduced ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-fg mb-2">
                        What's your name?
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={answers.name}
                        onChange={(e) => setAnswers((a) => ({ ...a, name: e.target.value }))}
                        onKeyDown={handleStep1KeyDown}
                        className="w-full border border-border-hairline bg-canvas text-fg text-sm px-4 py-2.5 focus-visible:border-accent"
                      />
                    </div>
                    <Button
                      variant="primary"
                      size="md"
                      disabled={!canAdvanceStep1}
                      onClick={() => canAdvanceStep1 && goTo(2)}
                      className="w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continue
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-fg mb-2">
                        What's your phone number?
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={answers.phone}
                        onChange={(e) => setAnswers((a) => ({ ...a, phone: e.target.value }))}
                        onKeyDown={handleStep2KeyDown}
                        className="w-full border border-border-hairline bg-canvas text-fg text-sm px-4 py-2.5 focus-visible:border-accent"
                      />
                    </div>
                    <Button
                      variant="primary"
                      size="md"
                      disabled={!canAdvanceStep2}
                      onClick={() => canAdvanceStep2 && goTo(3)}
                      className="w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continue
                    </Button>
                  </div>
                )}

                {step === 3 && (
                  <fieldset>
                    <legend className="text-sm font-semibold text-fg mb-4">What's your budget?</legend>
                    <div className="flex flex-wrap gap-2">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => selectBudget(opt)}
                          aria-pressed={answers.budget === opt}
                          className={cn(
                            'px-4 py-2 text-xs font-medium border transition-colors',
                            answers.budget === opt
                              ? 'border-accent bg-accent/6 text-fg'
                              : 'border-border-hairline bg-canvas text-fg-muted hover:border-accent/50 hover:text-fg'
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                )}

                {step === 4 && (
                  <div className="space-y-5">
                    <fieldset>
                      <legend className="text-sm font-semibold text-fg mb-4">What are you looking to build?</legend>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {projectTypeOptions.map((opt) => {
                          const Icon = projectTypeIcons[opt.iconName];
                          const selected = answers.projectType === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setAnswers((a) => ({ ...a, projectType: opt.id }))}
                              aria-pressed={selected}
                              className={cn(
                                'text-left border p-4 transition-colors',
                                selected
                                  ? 'border-accent bg-accent/6 text-fg'
                                  : 'border-border-hairline bg-canvas text-fg hover:border-accent/50'
                              )}
                            >
                              <Icon size={18} className="text-accent-light mb-2" aria-hidden="true" />
                              <span className="block text-sm font-semibold">{opt.title}</span>
                              <span className="block text-xs text-fg-muted mt-1 leading-snug">{opt.tagline}</span>
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>

                    {submitError && (
                      <div className="flex items-start gap-2 border border-accent/40 bg-accent/6 p-3 text-xs text-fg-muted">
                        <AlertCircle size={15} className="text-accent-light shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <Button
                      variant="primary"
                      size="md"
                      disabled={!canSubmit || phase === 'submitting'}
                      onClick={handleSubmit}
                      icon={phase === 'submitting' ? <Loader2 size={16} className="animate-spin" /> : undefined}
                      iconPosition="left"
                      className="w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {phase === 'submitting' ? 'Sending…' : 'Send inquiry'}
                    </Button>
                  </div>
                )}
              </m.div>
            </AnimatePresence>

            {step > 1 && (
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-fg-muted hover:text-accent-light transition-colors mt-6 -ml-2 p-2"
              >
                <ArrowLeft size={13} />
                Back
              </button>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};
