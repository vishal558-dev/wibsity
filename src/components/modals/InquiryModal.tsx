import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight, Send, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  projectReference?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialService = '',
  projectReference = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    serviceInterest: initialService || 'Business Website',
    projectReference: projectReference || '',
    timeline: '3 – 5 Weeks',
    brief: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Update prefill when props change
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceInterest: initialService }));
    }
    if (projectReference) {
      setFormData((prev) => ({ ...prev, projectReference }));
    }
  }, [initialService, projectReference]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.brief.trim()) {
      setError('Please fill in all required fields (Name, Email, Project Brief).');
      return;
    }
    setError('');
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      businessName: '',
      serviceInterest: 'Business Website',
      projectReference: '',
      timeline: '3 – 5 Weeks',
      brief: '',
    });
    onClose();
  };

  const servicesList = [
    'Business Website',
    'High-Converting Landing Page',
    'Website Redesign & Modernization',
    'Custom Web Experience / Portal',
  ];

  const timelineList = ['Urgent (< 2 Weeks)', 'Standard (3 – 5 Weeks)', 'Flexible (Next Quarter)'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-canvas/85 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-canvas border border-border-hairline shadow-2xl p-6 sm:p-10 my-8 z-10 max-h-[90vh] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-border-hairline">
            <div className="flex items-center gap-2">
              <Badge variant="outline" size="sm">00 / INTAKE</Badge>
              <span className="font-sans text-xs font-semibold text-fg-muted uppercase tracking-wider">
                Project Conversation
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 border border-border-hairline bg-canvas-surface text-fg-muted hover:text-fg hover:border-fg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {!isSubmitted ? (
            <div>
              <div className="mb-8">
                <h3 id="modal-title" className="text-2xl sm:text-3xl font-bold text-fg tracking-tight font-sans">
                  Start your project brief.
                </h3>
                <p className="mt-2 text-sm text-fg-muted leading-relaxed font-sans">
                  Tell us about your company and project requirements. We review every submission directly and respond within 24 hours with an actionable roadmap.
                </p>

                {formData.projectReference && (
                  <div className="mt-4 p-3 bg-canvas-surface border border-border-hairline flex items-center justify-between font-sans">
                    <span className="text-xs text-fg-muted">
                      Attached Reference: <strong className="text-fg">{formData.projectReference}</strong>
                    </span>
                    <button
                      onClick={() => setFormData({ ...formData, projectReference: '' })}
                      className="text-xs text-fg-faint hover:text-fg underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {error && (
                <div className="mb-6 p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs font-sans flex items-center gap-2">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-fg uppercase tracking-wider mb-2">
                      Your Name <span className="text-neutral-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-canvas-surface border border-border-hairline px-4 py-2.5 text-sm text-fg placeholder:text-fg-faint focus:border-fg focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-fg uppercase tracking-wider mb-2">
                      Work Email <span className="text-neutral-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-canvas-surface border border-border-hairline px-4 py-2.5 text-sm text-fg placeholder:text-fg-faint focus:border-fg focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-fg uppercase tracking-wider mb-2">
                    Company / Practice / Brand Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mercer Architecture & Design"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full bg-canvas-surface border border-border-hairline px-4 py-2.5 text-sm text-fg placeholder:text-fg-faint focus:border-fg focus:outline-none transition-colors"
                  />
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-medium text-fg uppercase tracking-wider mb-2">
                    Primary Service Focus
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {servicesList.map((svc) => (
                      <button
                        type="button"
                        key={svc}
                        onClick={() => setFormData({ ...formData, serviceInterest: svc })}
                        className={`text-left p-3 border text-xs font-medium transition-colors cursor-pointer ${
                          formData.serviceInterest === svc
                            ? 'bg-fg text-canvas border-fg font-semibold'
                            : 'bg-canvas-surface border-border-hairline text-fg-muted hover:text-fg'
                        }`}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline Selection */}
                <div>
                  <label className="block text-xs font-medium text-fg uppercase tracking-wider mb-2">
                    Target Launch Window
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {timelineList.map((time) => (
                      <button
                        type="button"
                        key={time}
                        onClick={() => setFormData({ ...formData, timeline: time })}
                        className={`text-center p-2.5 border text-xs font-medium transition-colors cursor-pointer ${
                          formData.timeline === time
                            ? 'bg-fg text-canvas border-fg font-semibold'
                            : 'bg-canvas-surface border-border-hairline text-fg-muted hover:text-fg'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Brief */}
                <div>
                  <label className="block text-xs font-medium text-fg uppercase tracking-wider mb-2">
                    Project Brief & Goals <span className="text-neutral-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your current business goals, existing website URL (if any), target audience, and desired deliverables..."
                    value={formData.brief}
                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                    className="w-full bg-canvas-surface border border-border-hairline p-4 text-sm text-fg placeholder:text-fg-faint focus:border-fg focus:outline-none transition-colors resize-y"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-border-hairline flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-fg-faint font-sans">
                    Direct founder review. 24-hour response.
                  </span>
                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    icon={<Send size={16} />}
                  >
                    Submit Project Brief
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-6 font-sans"
            >
              <div className="inline-flex p-4 border border-border-hairline bg-canvas-surface text-fg mb-2">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-fg tracking-tight">
                Project Brief Received.
              </h3>
              <p className="text-sm sm:text-base text-fg-muted max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. We have received your submission for <strong>{formData.businessName || 'your project'}</strong>. Our team will review your brief and follow up at <strong>{formData.email}</strong> within 24 business hours.
              </p>

              <div className="pt-6 border-t border-border-hairline flex justify-center">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleReset}
                  icon={<ArrowRight size={16} />}
                >
                  Return to Website
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
