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
    'works.read_more': 'View Details',
    'posts.title': 'Writing',
    'posts.read_more': 'Read Article',
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
    'works.read_more': '查看详情',
    'posts.title': '随笔',
    'posts.read_more': '阅读全文',
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
