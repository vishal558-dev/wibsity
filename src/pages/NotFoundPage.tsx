import React from 'react';
import { Button } from '../components/common/Button';
import { ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-canvas min-h-[80vh] flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <span className="text-xs font-sans font-semibold uppercase tracking-widest text-fg-muted block">
          404 — Route Not Found
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-fg tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-fg-muted max-w-md mx-auto leading-relaxed">
          The requested route does not exist or has been moved. Return to the homepage or explore our selected works archive.
        </p>
        <div className="pt-4 flex items-center justify-center gap-3">
          <Button variant="primary" size="md" to="/" icon={<Home size={15} />}>
            Return Home
          </Button>
          <Button variant="outline" size="md" to="/projects" icon={<ArrowLeft size={15} />}>
            View Projects
          </Button>
        </div>
      </div>
    </div>
  );
};
