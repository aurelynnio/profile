import type { Metadata } from 'next';
import { getExperiment } from '@/lib/experiments';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const experiment = getExperiment(slug);
  if (!experiment) return { title: 'Experiment not found' };

  return {
    title: experiment.title,
    description: experiment.description.en,
    openGraph: {
      title: `${experiment.title} | GuoYing`,
      description: experiment.description.en,
      type: 'article',
      images: [{ url: experiment.cover }],
    },
  };
}

export default function ExperimentDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}