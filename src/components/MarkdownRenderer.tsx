import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<
  MarkdownRendererProps
> = ({ content }) => {
  return (
    <div className="editorial-prose max-w-none">
      <ReactMarkdown
        components={{
          img: ({ node, ...props }) => (
            <img
              {...props}
              className="my-8 w-full rounded-[1.5rem] border border-stone-200/80 object-cover shadow-lg dark:border-stone-700/80"
              loading="lazy"
            />
          ),
          h1: ({ node, ...props }) => (
            <h1
              {...props}
              className="mb-5 mt-10 text-4xl font-serif text-ink dark:text-stone-100"
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              {...props}
              className="mb-4 mt-10 text-3xl font-serif text-ink dark:text-stone-100"
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              {...props}
              className="mb-3 mt-8 text-2xl font-serif text-ink dark:text-stone-100"
            />
          ),
          strong: ({ node, ...props }) => (
            <strong
              {...props}
              className="rounded-sm bg-cinnabar/5 px-1 font-bold text-cinnabar dark:bg-cinnabar/10 dark:text-cinnabar-light"
            />
          ),
          code: ({ node, ...props }) => {
            const isInline =
              !node || !props.className;
            if (isInline) {
              return (
                <code
                  {...props}
                  className="rounded-md border border-stone-200 bg-stone-100 px-1.5 py-0.5 font-mono text-[0.9em] text-cinnabar dark:border-stone-700 dark:bg-stone-800 dark:text-cinnabar-light"
                />
              );
            }
            return <code {...props} />;
          },
          p: ({ node, ...props }) => (
            <p
              {...props}
              className="mb-5 leading-8 text-stone-700 dark:text-stone-300"
            />
          ),
          ul: ({ node, ...props }) => (
            <ul
              {...props}
              className="mb-5 list-disc space-y-2 pl-6 text-stone-700 dark:text-stone-300"
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              {...props}
              className="mb-5 list-decimal space-y-2 pl-6 text-stone-700 dark:text-stone-300"
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              {...props}
              className="my-8 rounded-r-2xl border-l-4 border-jade bg-jade/5 px-5 py-4 italic text-stone-600 dark:bg-jade/10 dark:text-stone-400"
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
                className="font-medium text-jade underline decoration-jade/30 underline-offset-4 hover:text-jade-light"
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
