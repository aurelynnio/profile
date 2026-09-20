'use client';

import React from 'react';
import type { Project } from '@/lib/content-types';
import { useUiStore, useTranslation } from '@/stores/ui-store';

interface MetadataRow {
  label: string;
  value?: string;
}

const ProjectMetadata: React.FC<{
  project: Project;
}> = ({ project }) => {
  const t = useTranslation();
  const language = useUiStore((s) => s.language);

  const rows: MetadataRow[] = [
    { label: t('meta.category'), value: project.experiment?.name },
    { label: t('meta.theme'), value: project.experiment?.theme },
    { label: t('meta.duration'), value: project.experiment?.duration },
    { label: t('meta.status'), value: project.status?.[language] },
    { label: t('meta.role'), value: project.role?.[language] },
    { label: t('meta.platform'), value: project.platform },
    { label: t('meta.stack'), value: project.stack },
  ];

  return (
    <dl className="grid gap-3">
      {rows
        .filter((row) => row.value)
        .map((row) => (
          <div className="flex items-start gap-4" key={row.label}>
            <dt className="meta-label">{row.label}</dt>
            <dd className="min-w-0 pt-0.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
              {row.value}
            </dd>
          </div>
        ))}
    </dl>
  );
};

export default ProjectMetadata;
