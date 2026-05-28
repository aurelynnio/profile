import { MarkdownPost } from '../utils/markdown';

export const writingData: MarkdownPost[] = [
  {
    slug: 'getting-started-with-react',
    title: 'Getting Started with React in 2025',
    date: '2025-05-01T00:00:00.000Z',
    description:
      'A comprehensive guide to starting your React journey with modern best practices.',
    summary:
      'Learn the fundamentals of React with hooks, TypeScript, and modern tooling.',
    body: `## Introduction

React continues to evolve and remains one of the most popular choices for building user interfaces. In this post, I'll share my experience and tips for getting started.

## Why React?

React's component-based architecture makes it intuitive to build complex UIs. With hooks and the latest features, the developer experience has never been better.

## Key Concepts

### Components
Everything in React is a component. Think of them as reusable building blocks for your UI.

### Hooks
Hooks like \`useState\` and \`useEffect\` let you use state and lifecycle features in functional components.

### TypeScript Integration
TypeScript adds type safety and better developer tooling, making your React code more maintainable.

## Getting Started

\`\`\`bash
npx create-vite my-app --template react-ts
cd my-app
npm install
npm run dev
\`\`\`

## Conclusion

The React ecosystem is mature and well-supported. Start building today and you'll find a wealth of resources to help you along the way.
`,
  },
  {
    slug: 'my-development-journey',
    title: 'My Development Journey',
    date: '2025-03-15T00:00:00.000Z',
    description:
      'Reflecting on my path as a developer and the lessons learned along the way.',
    summary:
      'A personal reflection on growth, challenges, and milestones in software development.',
    body: `## The Beginning

Every developer has a starting point. Mine began with curiosity and a desire to create.

## Lessons Learned

### Embrace the Struggle
Learning to code is challenging, but every bug fixed is a lesson learned.

### Build Projects
The best way to learn is by building. Start small and gradually increase complexity.

### Community Matters
The developer community is incredibly supportive. Don't hesitate to ask for help.

## Looking Forward

Technology moves fast, and there's always something new to learn. That's what makes this field exciting.
`,
  },
];
