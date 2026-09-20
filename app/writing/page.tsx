import WritingList from '@/components/writing-list';
import { writing } from '@/lib/writing';

export default function WritingPage() {
  return <WritingList posts={writing} />;
}