import { notFound } from 'next/navigation';
import ProjectDetail from '@/components/project-detail';
import { getWork, works } from '@/lib/works';

export const dynamicParams = false;

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWork(slug);

  if (!work) {
    notFound();
  }

  return <ProjectDetail project={work} backHref="/works" backLabelKey="nav.works" />;
}