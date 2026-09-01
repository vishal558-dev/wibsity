import React from 'react';
import { m } from 'motion/react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Phone, Mail, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { CONTACT_INFO, engagementPoints } from '../data/contact';

export const ContactPage: React.FC = () => {
  const whatsappUrl = CONTACT_INFO.whatsappUrl;

  return (
    <div className="pt-32 pb-24 bg-canvas min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <div>
          <SectionHeading
            as="h1"
            tag="DIRECT INITIATION HUB"
            title="Start a conversation about your website."
            description="We collaborate with businesses, founders, and modern practices looking for clean design and fast performance. Reach out directly through your preferred channel."
          />
        </div>

        {/* Contact Monolith Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Direct Channels Box (7 cols) */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 border border-border-hairline bg-canvas-subtle p-5 sm:p-10 lg:p-12 space-y-6 sm:space-y-8"
          >
            {/* Live Availability Status */}
            <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-border-hairline">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-sans text-xs text-fg uppercase tracking-wider font-semibold">
                  Currently Accepting Projects
                </span>
              </div>
              <span className="font-sans text-xs text-fg-muted font-medium">
                Sprint Slots Open
              </span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-fg tracking-tight leading-tight">
                Connect directly with the studio.
              </h2>
              <p className="text-sm sm:text-base text-fg-muted leading-relaxed">
                Whether you have a specific brief ready, want to redesign an existing website, or want to discuss feasibility for a new concept, we respond within hours.
              </p>
            </div>

            {/* Direct Action Cards */}
            <div className="space-y-3 sm:space-y-4 pt-2">
              {/* WhatsApp Card */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-border-hairline bg-canvas p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-accent/60 transition-colors block"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 bg-canvas-surface border border-border-hairline text-accent-light group-hover:text-accent-light group-hover:border-accent/50 transition-colors shrink-0">
                    <WhatsAppIcon size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-fg-faint uppercase tracking-wider block">
                      FASTEST RESPONSE
                    </span>
                    <h3 className="text-base font-bold text-fg">
                      Chat on WhatsApp
                    </h3>
                    <p className="text-xs text-fg-muted mt-0.5">
                      Direct messaging with the founder for instant project inquiries.
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-mono text-accent-light group-hover:translate-x-1 transition-transform shrink-0">
                  <span>Open Chat</span>
                  <ArrowUpRight size={14} />
                </div>
              </a>

              {/* Phone Card */}
              <a
                href={CONTACT_INFO.phoneHref}
                className="group border border-border-hairline bg-canvas p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-accent/60 transition-colors block"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 bg-canvas-surface border border-border-hairline text-accent-light group-hover:text-accent-light group-hover:border-accent/50 transition-colors shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-fg-faint uppercase tracking-wider block">
                      VOICE CONSULTATION
                    </span>
                    <h3 className="text-base font-bold text-fg">
                      Call Us: {CONTACT_INFO.phoneDisplay}
                    </h3>
                    <p className="text-xs text-fg-muted mt-0.5">
                      Discuss your scope and requirements over a direct phone call.
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-mono text-accent-light group-hover:translate-x-1 transition-transform shrink-0">
                  <span>Call Now</span>
                  <ArrowUpRight size={14} />
                </div>
              </a>

              {/* Email Card */}
              <a
                href={CONTACT_INFO.emailHref}
                className="group border border-border-hairline bg-canvas p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-accent/60 transition-colors block"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 bg-canvas-surface border border-border-hairline text-accent-light group-hover:text-accent-light group-hover:border-accent/50 transition-colors shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-fg-faint uppercase tracking-wider block">
                      WRITTEN BRIEF
                    </span>
                    <h3 className="text-base font-bold text-fg font-mono text-xs sm:text-sm">
                      {CONTACT_INFO.email}
                    </h3>
                    <p className="text-xs text-fg-muted mt-0.5">
                      Send your RFP, requirements document, or project summary.
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-mono text-accent-light group-hover:translate-x-1 transition-transform shrink-0">
                  <span>Send Email</span>
                  <ArrowUpRight size={14} />
                </div>
              </a>
            </div>
          </m.div>

          {/* Engagement Standards Box (5 cols) */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="border border-border-hairline bg-canvas p-6 sm:p-8 space-y-6">
              <span className="font-mono text-[11px] text-fg-faint uppercase tracking-wider block">
                // WHAT TO EXPECT
              </span>
              <h3 className="text-xl font-bold text-fg">
                No high-pressure sales. Straightforward technical collaboration.
              </h3>
              <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
                When you contact wibsity, you speak directly with the engineer responsible for your build. We review your requirements, recommend the most effective scope, and provide a clear timeline.
              </p>

              <div className="space-y-4 pt-4 border-t border-border-hairline">
                {engagementPoints.map((pt) => (
                  <div key={pt.title} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-fg shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-fg font-sans">
                        {pt.title}
                      </h4>
                      <p className="text-[11px] text-fg-muted mt-0.5 leading-relaxed">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </div>
  );
};
