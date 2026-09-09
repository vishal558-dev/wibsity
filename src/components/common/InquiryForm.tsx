import React, { useEffect, useId, useRef, useState } from 'react';
import { IconArrowRight, IconCheck, IconSpinner, IconWhatsApp } from './icons';
import { CONTACT_INFO } from '../../data/contact';
import { FORMSPREE_ENDPOINT, budgetOptions, projectTypeOptions } from '../../data/projectInquiry';

/**
 * The project enquiry form.
 *
 * This replaced a four-step modal wizard that opened from a button and asked
 * for a name and phone number in steps one and two — before the visitor had
 * said anything about the project, and so before there was any reason to hand
 * over a phone number. Three things changed:
 *
 *  1. It is on the page, not behind a modal. A form you have to open converts
 *     worse than one you can already see, and the homepage now *ends* in it.
 *  2. One screen, not four. Six fields, four of which are one tap. There is no
 *     step counter and no progress bar, because there is no progress to report.
 *  3. The order is inverted. The two low-commitment questions come first;
 *     contact details are asked last, once somebody is already invested, and
 *     the phone field says why it is being asked.
 *
 * Validation is on submit rather than on every keystroke — being told a field
 * is wrong while still typing it is the single most irritating thing a form
 * can do. The first invalid field takes focus, and its message is wired up
 * through `aria-describedby`.
 */

type Phase = 'editing' | 'submitting' | 'confirming' | 'sent';

interface FieldErrors {
  projectType?: string;
  name?: string;
  phone?: string;
}

export interface InquiryFormProps {
  /** Rendered as the form's own heading, so the section around it does not
   *  need to repeat one. */
  headingId?: string;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({ headingId }) => {
  const uid = useId();
  const [projectType, setProjectType] = useState('');
  const [budget, setBudget] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [phase, setPhase] = useState<Phase>('editing');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const projectGroupRef = useRef<HTMLFieldSetElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  // The button holds on "Sent" for a beat before the confirmation panel
  // replaces the form — otherwise Send → Sending would jump straight to a
  // different view and the third state would never actually be seen.
  useEffect(() => {
    if (phase !== 'confirming') return;
    const timer = setTimeout(() => setPhase('sent'), 600);
    return () => clearTimeout(timer);
  }, [phase]);

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!projectType) next.projectType = 'Pick the closest option — it does not lock you in.';
    if (!name.trim()) next.name = 'Tell us what to call you.';
    // Deliberately loose: a length floor catches an empty or mistyped field
    // without rejecting the many legitimate ways a person writes a number.
    if (phone.replace(/\D/g, '').length < 7) next.phone = 'A number we can actually reach you on.';
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);

    if (found.projectType) {
      projectGroupRef.current?.querySelector<HTMLInputElement>('input')?.focus();
      return;
    }
    if (found.name) {
      nameRef.current?.focus();
      return;
    }
    if (found.phone) {
      phoneRef.current?.focus();
      return;
    }

    setPhase('submitting');
    setSubmitError(null);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          projectType,
          budget: budget || 'Not stated',
          name,
          phone,
          email: email || 'Not given',
          details: details || 'None',
          _subject: `Project enquiry — ${name}`,
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setPhase('confirming');
    } catch {
      setSubmitError(
        'That did not send. Try once more, or message on WhatsApp and it will reach the same place.'
      );
      setPhase('editing');
    }
  };

  if (phase === 'sent') {
    return (
      <div className="max-w-xl" role="status">
        <span className="inline-flex items-center justify-center w-11 h-11 border border-rule-strong">
          <IconCheck size={20} />
        </span>
        <h3 id={headingId} className="mt-6 text-2xl">
          That is with us.
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-fg-muted">
          You will hear back from the person who would build the site — usually the same
          day, and from a real reply rather than an autoresponder. If you would rather not
          wait, the WhatsApp thread reaches the same place.
        </p>
        <a
          href={CONTACT_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary mt-8"
        >
          <IconWhatsApp size={17} className="whatsapp-icon" />
          <span>Continue on WhatsApp</span>
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-2xl">
      {/* 1 — what -------------------------------------------------------- */}
      <fieldset ref={projectGroupRef} className="border-0 p-0 m-0">
        <legend className="font-sans text-lg mb-4 p-0">What do you need building?</legend>
        <div className="flex flex-wrap gap-2.5">
          {projectTypeOptions.map((opt) => (
            <label key={opt.id} className="chip">
              <input
                type="radio"
                name={`${uid}-type`}
                value={opt.id}
                checked={projectType === opt.id}
                onChange={() => {
                  setProjectType(opt.id);
                  setErrors((prev) => ({ ...prev, projectType: undefined }));
                }}
                className="sr-only"
                aria-describedby={errors.projectType ? `${uid}-type-error` : undefined}
              />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.projectType && (
          <p id={`${uid}-type-error`} className="mt-3 font-sans text-sm text-negative">
            {errors.projectType}
          </p>
        )}
      </fieldset>

      {/* 2 — budget ------------------------------------------------------ */}
      <fieldset className="border-0 p-0 m-0 mt-14">
        <legend className="font-sans text-lg mb-1.5 p-0">Roughly what budget?</legend>
        <p className="text-ui font-sans text-fg-muted mb-4">
          A range is enough. It is what decides the scope, not the quality.
        </p>
        <div className="flex flex-wrap gap-2.5">
          {budgetOptions.map((opt) => (
            <label key={opt} className="chip">
              <input
                type="radio"
                name={`${uid}-budget`}
                value={opt}
                checked={budget === opt}
                onChange={() => setBudget(opt)}
                className="sr-only"
              />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      {/* 3 — who --------------------------------------------------------- */}
      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className="block font-sans text-ui font-medium">
            Your name
          </label>
          <input
            ref={nameRef}
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
            className="control mt-1"
          />
          {errors.name && (
            <p id={`${uid}-name-error`} className="mt-2 font-sans text-sm text-negative">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${uid}-phone`} className="block font-sans text-ui font-medium">
            Phone
          </label>
          <input
            ref={phoneRef}
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
            }}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={`${uid}-phone-hint${errors.phone ? ` ${uid}-phone-error` : ''}`}
            className="control mt-1"
          />
          <p id={`${uid}-phone-hint`} className="mt-2 font-sans text-sm text-fg-muted">
            So the reply can come to you on WhatsApp.
          </p>
          {errors.phone && (
            <p id={`${uid}-phone-error`} className="mt-1 font-sans text-sm text-negative">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-email`} className="block font-sans text-ui font-medium">
            Email <span className="text-fg-subtle font-normal">— optional</span>
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="control mt-1"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-details`} className="block font-sans text-ui font-medium">
            Anything you want to add <span className="text-fg-subtle font-normal">— optional</span>
          </label>
          <textarea
            id={`${uid}-details`}
            name="details"
            rows={3}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="A link to your current site, a deadline, a rough idea — whatever is useful."
            className="control mt-1 resize-y"
          />
        </div>
      </div>

      {submitError && (
        <p
          role="alert"
          className="mt-8 border-l-2 border-negative pl-4 py-1 font-sans text-ui text-negative"
        >
          {submitError}
        </p>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={phase === 'submitting' || phase === 'confirming'}
        >
          <span key={phase} className="btn-content">
            {phase === 'submitting' && <IconSpinner size={17} />}
            {phase === 'confirming' && <IconCheck size={17} />}
            <span>
              {phase === 'submitting' ? 'Sending' : phase === 'confirming' ? 'Sent' : 'Send enquiry'}
            </span>
            {phase === 'editing' && <IconArrowRight size={17} />}
          </span>
        </button>
        <a
          href={CONTACT_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-ui link inline-flex items-center gap-2 -my-2.5 py-2.5"
        >
          <IconWhatsApp size={15} className="whatsapp-icon" />
          <span>or message on WhatsApp</span>
        </a>
      </div>
    </form>
  );
};
