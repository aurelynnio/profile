import ExperimentsList from '@/components/experiments-list';
import { experiments } from '@/lib/experiments';

export default function ExperimentsPage() {
  return <ExperimentsList experiments={experiments} />;
}