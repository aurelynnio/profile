import WorksList from '@/components/works-list';
import { works } from '@/lib/works';

export default function WorksPage() {
  return <WorksList works={works} />;
}