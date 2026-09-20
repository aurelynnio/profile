import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Architecture, databases, deployment, and the production side of building web applications.',
  openGraph: {
    title: 'Writing | GuoYing',
    description:
      'Architecture, databases, deployment, and the production side of building web applications.',
    type: 'website',
  },
};

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
