import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Works',
  description: 'Selected projects and systems I have designed and built.',
  openGraph: {
    title: 'Works | GuoYing',
    description: 'Selected projects and systems I have designed and built.',
    type: 'website',
  },
};

export default function WorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
