import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Works',
  description:
    'Three full-stack web applications — an e-commerce marketplace, a railway ticketing platform, and a social platform — each with its own architecture story.',
  openGraph: {
    title: 'Works | GuoYing',
    description:
      'Three full-stack web applications — an e-commerce marketplace, a railway ticketing platform, and a social platform — each with its own architecture story.',
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
