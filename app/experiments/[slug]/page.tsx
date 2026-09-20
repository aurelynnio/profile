import { notFound } from 'next/navigation';
import ProjectDetail from '@/components/project-detail';
import { experiments, getExperiment } from '@/lib/experiments';

export const dynamicParams = false;

export function generateStaticParams() {
  return experiments.map((experiment) => ({ slug: experiment.slug }));
}

export default async function ExperimentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experiment = getExperiment(slug);

  if (!experiment) {
    notFound();
  }

  return (
    <ProjectDetail
      project={experiment}
      backHref="/experiments"
      backLabelKey="nav.experiments"
    />
  );
}