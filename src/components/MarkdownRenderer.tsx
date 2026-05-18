import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<
  MarkdownRendererProps
> = ({ content }) => {
  return (
    <div className="prose prose-stone dark:prose-invert max-w-none">
      <ReactMarkdown
        components={{
          img: ({ node, ...props }) => (
            <img
              {...props}
              className="rounded-lg shadow-md my-6 w-full object-cover max-h-[500px]"
              loading="lazy"
            />
          ),
          h1: ({ node, ...props }) => (
            <h1
              {...props}
              className="text-3xl font-serif font-bold mt-8 mb-4 text-ink dark:text-stone-100"
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              {...props}
              className="text-2xl font-serif font-bold mt-8 mb-4 text-ink dark:text-stone-100"
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              {...props}
              className="text-xl font-serif font-bold mt-6 mb-3 text-ink dark:text-stone-100"
            />
          ),
          strong: ({ node, ...props }) => (
            <strong
              {...props}
              className="font-bold text-cinnabar dark:text-cinnabar-light bg-cinnabar/5 dark:bg-cinnabar/10 px-1 rounded-sm"
            />
          ),
          code: ({ node, ...props }) => {
            const isInline =
              !node || !props.className;
            if (isInline) {
              return (
                <code
                  {...props}
                  className="bg-stone-100 dark:bg-stone-800 text-cinnabar dark:text-cinnabar-light px-1.5 py-0.5 rounded font-mono text-[0.9em] border border-stone-200 dark:border-stone-700"
                />
              );
            }
            return <code {...props} />;
          },
          p: ({ node, ...props }) => (
            <p
              {...props}
              className="mb-4 leading-relaxed text-stone-700 dark:text-stone-300"
            />
          ),
          ul: ({ node, ...props }) => (
            <ul
              {...props}
              className="list-disc list-inside mb-4 space-y-1 text-stone-700 dark:text-stone-300"
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              {...props}
              className="list-decimal list-inside mb-4 space-y-1 text-stone-700 dark:text-stone-300"
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              {...props}
              className="border-l-4 border-jade pl-4 italic my-4 text-stone-600 dark:text-stone-400"
            />
          ),
          a: ({ node, ...props }) => {
            const href = props.href || '';
            const children = props.children;

            // Link Hooks for Styling
            if (href === '#green') {
              return (
                <span className="bg-jade/20 text-jade font-medium rounded px-1">
                  {children}
                </span>
              );
            }
            if (href === '#purple') {
              return (
                <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-medium rounded px-1">
                  {children}
                </span>
              );
            }
            if (href === '#yellow') {
              return (
                <span className="bg-yellow-200 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-100 font-medium rounded px-1">
                  {children}
                </span>
              );
            }
            if (href === '#underline') {
              return (
                <span className="underline decoration-jade decoration-2 underline-offset-2">
                  {children}
                </span>
              );
            }
            if (href === '#highlight') {
              return (
                <mark className="bg-yellow-200 dark:bg-yellow-900/40 text-stone-900 dark:text-stone-100 px-1 rounded-sm">
                  {children}
                </mark>
              );
            }

            // Standard Link
            return (
              <a
                {...props}
                className="text-jade hover:underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
