import React from 'react';
import { AlertCircle, LoaderCircle } from 'lucide-react';

interface PageStateProps {
  title: string;
  description: string;
  tone?: 'loading' | 'error' | 'empty';
  action?: React.ReactNode;
}

const iconMap = {
  loading: LoaderCircle,
  error: AlertCircle,
  empty: AlertCircle,
} as const;

const PageState: React.FC<PageStateProps> = ({
  title,
  description,
  tone = 'empty',
  action,
}) => {
  const Icon = iconMap[tone];

  return (
    <div className="empty-state">
      <div className="max-w-md">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-stone-100/80 text-cinnabar dark:bg-stone-800/80 dark:text-cinnabar-light">
          <Icon
            size={20}
            className={
              tone === 'loading'
                ? 'animate-spin'
                : undefined
            }
          />
        </div>
        <h2 className="font-serif text-3xl text-ink dark:text-stone-100">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-muted">
          {description}
        </p>
        {action ? (
          <div className="mt-6">{action}</div>
        ) : null}
      </div>
    </div>
  );
};

export default PageState;
