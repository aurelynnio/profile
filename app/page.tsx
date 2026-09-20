import HomeContent from '@/components/home-content';
import { works } from '@/lib/works';
import { experiments } from '@/lib/experiments';

export default function HomePage() {
  return <HomeContent works={works} experiments={experiments} />;
}