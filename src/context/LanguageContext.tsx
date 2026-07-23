import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
} from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.about': 'Home',
    'nav.works': 'Works',
    'nav.posts': 'Writing',
    'nav.resume': 'Resume',
    'home.greeting':
      'Today’s technology, tomorrow’s intelligence.',
    'home.role':
      'Digital Craftsman ( Software Developer / Student )',
    'home.work_title': 'Work',
    'home.work_desc':
      'Hello everyone, my name is [Anh](#green). I am [21 years old](#purple) and currently pursuing my passion in [Software Development](#green). ' +
      'My goal is to become a [Software Engineer](#green) dedicated to [solving client needs](#yellow) and delivering [reliable technical solutions](#yellow) through code. ' +
      'I created this blog to share the [knowledge and experiences](#purple) I have gained over the years. Thank you for visiting my website—I sincerely appreciate your [support](#underline).',
    'home.portfolio_btn': 'My Portfolio',
    'home.bio_title': 'Bio',
    'home.born':
      'Born in HoChiMinh City (胡志明市), Vietnam.',
    'home.master':
      'Started my journey in Information Technology.',
    'home.freelance':
      'Started working as a Freelance Developer.',
    'home.love_title': 'I ♥',
    'home.love_desc':
      'Music, [Drawing](#green), Calligraphy, [Photography](#green).',
    'works.title': 'Works',
    'works.kicker': 'Selected projects',
    'works.description':
      'A selection of products and systems I have designed and built.',
    'works.read_more': 'View Details',
    'works.loading': 'Loading projects…',
    'works.empty_title': 'No projects yet',
    'works.empty_desc':
      'New work will appear here soon.',
    'posts.title': 'Writing',
    'posts.kicker': 'Notes and essays',
    'posts.description':
      'Thoughts on building software, learning, and the craft behind the work.',
    'posts.read_more': 'Read Article',
    'posts.loading': 'Loading writing…',
    'posts.empty_title':
      'No writing published yet',
    'posts.empty_desc': 'Please check back soon.',
    'project.loading': 'Loading project…',
    'project.missing_title': 'Project not found',
    'project.missing_desc':
      'This project may have moved or is no longer available.',
    'project.browse': 'Browse projects',
    'article.loading': 'Loading article…',
    'article.missing_title': 'Article not found',
    'article.missing_desc':
      'This article may have moved or is no longer available.',
    'article.browse': 'Browse writing',
    'content.unavailable_title':
      'Content is temporarily unavailable',
    'content.unavailable_desc':
      'Please make sure the content API is running, then try again.',
    'footer.text':
      '© 2025 Guo Ying. Made with morning silence.',
    back: 'Back',
    'not_found.title': 'Lost in the Mist',
    'not_found.desc':
      'The page you are looking for has drifted away.',
    'not_found.home_btn': 'Return Home',
  },
  zh: {
    'nav.about': '首页',
    'nav.works': '作品',
    'nav.posts': '随笔',
    'nav.resume': '简历',
    'home.greeting':
      '你好，我是一名现居越南的独立开发者！',
    'home.role': '数字工匠 ( 开发者 / 学生 )',
    'home.work_title': '工作',
    'home.work_desc':
      '大家好，我是 [Anh](#green)。我今年 [21岁](#purple)，对 [软件开发](#green) 充满热情。' +
      '我的职业目标是成为一名 [软件工程师](#green)，致力于通过代码 [解决客户需求](#yellow) 并提供 [可靠的技术解决方案](#yellow)。' +
      '这是我创建的博客，旨在分享我多年来积累的 [知识和学习经验](#purple)。感谢您访问我的网站，[真心感谢您的支持](#underline)。',
    'home.portfolio_btn': '作品集',
    'home.bio_title': '经历',
    'home.born': '出生于越南胡志明市。',
    'home.master': '开始学习信息技术。',
    'home.freelance': '成为自由开发者。',
    'home.love_title': '爱好',
    'home.love_desc': '艺术，音乐，绘画，书法。',
    'works.title': '精选作品',
    'works.kicker': '精选项目',
    'works.description':
      '我设计和开发的产品与系统选集。',
    'works.read_more': '查看详情',
    'works.loading': '正在加载项目…',
    'works.empty_title': '暂时没有项目',
    'works.empty_desc':
      '新的作品很快会出现在这里。',
    'posts.title': '随笔',
    'posts.kicker': '笔记与随笔',
    'posts.description':
      '关于软件构建、学习与创作过程中的思考。',
    'posts.read_more': '阅读全文',
    'posts.loading': '正在加载文章…',
    'posts.empty_title': '暂时没有文章',
    'posts.empty_desc': '请稍后再来查看。',
    'project.loading': '正在加载项目…',
    'project.missing_title': '未找到项目',
    'project.missing_desc':
      '该项目可能已迁移或不再提供。',
    'project.browse': '浏览项目',
    'article.loading': '正在加载文章…',
    'article.missing_title': '未找到文章',
    'article.missing_desc':
      '该文章可能已迁移或不再提供。',
    'article.browse': '浏览随笔',
    'content.unavailable_title': '内容暂时不可用',
    'content.unavailable_desc':
      '请确认内容 API 正在运行后再试。',
    'footer.text':
      '© 2025 Guo Ying. 于清晨静谧中制作。',
    back: '返回',
    'not_found.title': '迷失雾中',
    'not_found.desc': '你寻找的页面已随风飘散。',
    'not_found.home_btn': '返回首页',
  },
};

const LanguageContext = createContext<
  LanguageContextType | undefined
>(undefined);

export const LanguageProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [language, setLanguage] =
    useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) =>
      prev === 'en' ? 'zh' : 'en',
    );
  };

  const t = (key: string): string => {
    // @ts-ignore
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      'useLanguage must be used within a LanguageProvider',
    );
  }
  return context;
};
