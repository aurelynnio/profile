'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-serif font-bold text-ink dark:text-stone-100 mb-4">
        Something went wrong
      </h2>
      <p className="text-stone-600 dark:text-stone-400 mb-8">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <div className="flex gap-3">
        <button onClick={reset} className="button-primary">
          Try again
        </button>
        <Link href="/" className="button-secondary">
          Return Home
        </Link>
      </div>
    </div>
  );
}
