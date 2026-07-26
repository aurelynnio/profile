import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Long-form notes on engineering, design, and craft.',
  openGraph: {
    title: 'Writing | GuoYing',
    description: 'Long-form notes on engineering, design, and craft.',
    type: 'website',
  },
};

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
