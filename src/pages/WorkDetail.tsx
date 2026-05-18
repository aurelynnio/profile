import React, {
  useEffect,
  useState,
} from 'react';
import {
  useParams,
  useNavigate,
  Link,
} from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
import Section from '../components/Section';
import { useLanguage } from '../context/LanguageContext';
import {
  getPostBySlug,
  MarkdownPost,
} from '../utils/markdown';
import MarkdownRenderer from '../components/MarkdownRenderer';

const WorkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [project, setProject] =
    useState<MarkdownPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        const data = await getPostBySlug(
          'works',
          id,
        );
        setProject(data);
      }
      setLoading(false);
    };
    fetchProject();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="pt-20 text-center">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-20 text-center">
        Project not found
      </div>
    );
  }

  return (
    <div className="pt-4 pb-20">
      <Section>
        <div className="flex items-center gap-1.5 mb-8 text-sm font-medium">
          <Link
            to="/works"
            className="text-jade hover:underline transition-colors"
          >
            Works
          </Link>
          <span className="text-stone-400 opacity-50 px-1">
            &gt;
          </span>
          <h1 className="text-xl font-bold text-ink dark:text-stone-100">
            {project.title}
          </h1>
          <span className="bg-stone-200/50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-1.5 py-0.5 rounded text-[10px] font-mono ml-1">
            {project.yearBadge ||
              `${new Date(project.date).getFullYear()}-`}
          </span>
        </div>
      </Section>

      <Section delay={0.1}>
        <div className="mb-12">
          <p className="text-lg text-stone-700 dark:text-stone-300 font-light leading-relaxed mb-8 max-w-3xl">
            {project.description}
          </p>

          <div className="space-y-3">
            {project.link && (
              <div className="flex items-center gap-4">
                <span className="bg-[#E4F2E1] dark:bg-[#2D5A27]/30 text-[#2D5A27] dark:text-[#E4F2E1] px-1.5 py-0.5 rounded-[3px] text-[10px] font-bold uppercase tracking-wider shrink-0 w-20 text-center">
                  WEBSITE
                </span>
                <a
                  href={project.link}
                  className="text-jade hover:underline text-sm flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.link}{' '}
                  <ExternalLink size={12} />
                </a>
              </div>
            )}
            {project['Current Status'] && (
              <div className="flex items-center gap-4">
                <span className="bg-[#E4F2E1] dark:bg-[#2D5A27]/30 text-[#2D5A27] dark:text-[#E4F2E1] px-1.5 py-0.5 rounded-[3px] text-[10px] font-bold uppercase tracking-wider shrink-0 w-20 text-center">
                  STATUS
                </span>
                <span className="text-stone-700 dark:text-stone-300 text-sm">
                  {project['Current Status']}
                </span>
              </div>
            )}
            {project['Role'] && (
              <div className="flex items-center gap-4">
                <span className="bg-[#E4F2E1] dark:bg-[#2D5A27]/30 text-[#2D5A27] dark:text-[#E4F2E1] px-1.5 py-0.5 rounded-[3px] text-[10px] font-bold uppercase tracking-wider shrink-0 w-20 text-center">
                  ROLE
                </span>
                <span className="text-stone-700 dark:text-stone-300 text-sm">
                  {project['Role']}
                </span>
              </div>
            )}
            {project.platform && (
              <div className="flex items-center gap-4">
                <span className="bg-[#E4F2E1] dark:bg-[#2D5A27]/30 text-[#2D5A27] dark:text-[#E4F2E1] px-1.5 py-0.5 rounded-[3px] text-[10px] font-bold uppercase tracking-wider shrink-0 w-20 text-center">
                  PLATFORM
                </span>
                <span className="text-stone-700 dark:text-stone-300 text-sm">
                  {project.platform}
                </span>
              </div>
            )}
            {project.stack && (
              <div className="flex items-center gap-4">
                <span className="bg-[#E4F2E1] dark:bg-[#2D5A27]/30 text-[#2D5A27] dark:text-[#E4F2E1] px-1.5 py-0.5 rounded-[3px] text-[10px] font-bold uppercase tracking-wider shrink-0 w-20 text-center">
                  STACK
                </span>
                <span className="text-stone-700 dark:text-stone-300 text-sm">
                  {project.stack}
                </span>
              </div>
            )}
            {project.source && (
              <div className="flex items-center gap-4">
                <span className="bg-[#E4F2E1] dark:bg-[#2D5A27]/30 text-[#2D5A27] dark:text-[#E4F2E1] px-1.5 py-0.5 rounded-[3px] text-[10px] font-bold uppercase tracking-wider shrink-0 w-20 text-center">
                  SOURCE
                </span>
                <a
                  href={project.source}
                  className="text-jade hover:underline text-sm flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source Code{' '}
                  <ExternalLink size={12} />
                </a>
              </div>
            )}
            {project.blogpost && (
              <div className="flex items-center gap-4">
                <span className="bg-[#E4F2E1] dark:bg-[#2D5A27]/30 text-[#2D5A27] dark:text-[#E4F2E1] px-1.5 py-0.5 rounded-[3px] text-[10px] font-bold uppercase tracking-wider shrink-0 w-20 text-center">
                  BLOGPOST
                </span>
                <a
                  href={project.blogpost}
                  className="text-jade hover:underline text-sm flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Related Article{' '}
                  <ExternalLink size={12} />
                </a>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section delay={0.2}>
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-md border border-stone-200 dark:border-white/10 mb-10">
          <img
            src={
              project.thumbnail ||
              '/images/placeholder.jpg'
            }
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Section>

      <Section delay={0.3}>
        <MarkdownRenderer
          content={project.body}
        />

        {project.link && (
          <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800 flex justify-center">
            <a
              href={project.link}
              className="flex items-center gap-2 bg-ink dark:bg-stone-700 text-white px-6 py-3 rounded-full font-medium hover:bg-jade dark:hover:bg-jade transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Live <ExternalLink size={16} />
            </a>
          </div>
        )}
      </Section>
    </div>
  );
};

export default WorkDetail;
