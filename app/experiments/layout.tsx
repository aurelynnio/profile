import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experiments',
  description:
    'Week-long web experiments — real-time UIs, search & filter systems, and booking flows that grew into features.',
  openGraph: {
    title: 'Experiments | GuoYing',
    description:
      'Week-long web experiments — real-time UIs, search & filter systems, and booking flows that grew into features.',
    type: 'website',
  },
};

export default function ExperimentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
