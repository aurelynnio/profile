import React from 'react';
import { ExternalLink } from 'lucide-react';
import { MarkdownPost } from '../utils/markdown';

interface MetadataRow {
  label: string;
  value?: string;
  href?: string;
}

const ProjectMetadata: React.FC<{
  project: MarkdownPost;
}> = ({ project }) => {
  const rows: MetadataRow[] = [
    {
      label: 'Website',
      value: project.link,
      href: project.link,
    },
    {
      label: 'Status',
      value: project['Current Status'],
    },
    { label: 'Role', value: project.Role },
    {
      label: 'Platform',
      value: project.platform,
    },
    { label: 'Stack', value: project.stack },
    {
      label: 'Source',
      value: project.source
        ? 'Source code'
        : undefined,
      href: project.source,
    },
    {
      label: 'Article',
      value: project.blogpost
        ? 'Related article'
        : undefined,
      href: project.blogpost,
    },
  ];

  return (
    <dl className="grid gap-3">
      {rows
        .filter((row) => row.value)
        .map((row) => (
          <div
            className="flex items-start gap-4"
            key={row.label}
          >
            <dt className="meta-label">
              {row.label}
            </dt>
            <dd className="min-w-0 pt-0.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
              {row.href ? (
                <a
                  href={row.href}
                  className="inline-flex break-all text-jade hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {row.value}{' '}
                  <ExternalLink
                    className="ml-1 mt-0.5 shrink-0"
                    size={12}
                  />
                </a>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
    </dl>
  );
};

export default ProjectMetadata;
