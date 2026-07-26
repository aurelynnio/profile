'use client';

import React from 'react';
import Link from 'next/link';

interface ContentStateProps {
  title: string;
  description?: string;
  action?: { label: string; to: string };
}

export const LoadingState: React.FC<{
  label?: string;
}> = ({ label = 'Loading content…' }) => (
  <div
    className="flex min-h-48 items-center justify-center"
    aria-live="polite"
  >
    <div className="flex items-center gap-3 text-sm text-stone-500 dark:text-stone-300">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-stone-300 border-t-cinnabar dark:border-stone-600" />
      {label}
    </div>
  </div>
);

export const EmptyState: React.FC<
  ContentStateProps
> = ({ title, description, action }) => (
  <div className="surface-card flex min-h-48 flex-col items-center justify-center px-6 py-10 text-center">
    <h2 className="font-serif text-xl font-bold text-ink dark:text-stone-100">
      {title}
    </h2>
    {description && (
      <p className="mt-2 max-w-md text-sm leading-relaxed text-stone-600 dark:text-stone-300">
        {description}
      </p>
    )}
    {action && (
      <Link
        className="button-primary mt-6"
        href={action.to}
      >
        {action.label}
      </Link>
    )}
  </div>
);
