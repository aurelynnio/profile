import type { Post } from './content-types';

// ─────────────────────────────────────────────────────────────
// Technical blog. Bilingual markdown bodies.
// ─────────────────────────────────────────────────────────────

export const writing: Post[] = [
  {
    slug: 'clean-architecture-nextjs',
    title: {
      en: 'Clean Architecture in a Next.js Codebase',
      zh: '在 Next.js 代码库里实践整洁架构',
    },
    date: '2025-09-02',
    tags: ['Architecture', 'Next.js', 'TypeScript'],
    relatedProject: 'ecommerce-platform',
    summary: {
      en: 'How Nantian stays coherent as the feature list grows: presentation, domain, and data layers — and why the boundary between them is the actual deliverable.',
      zh: 'Nantian 在功能清单不断膨胀时如何保持内聚：表示层、领域层与数据层——以及为什么它们之间的边界才是真正的交付物。',
    },
    body: {
      en: `![Layer diagram](/images/uploads/clean-architecture.jpg)

## The problem with "just put it in components"

Components start small and honest, then attract every dependency in the app. After six months the checkout flow has a \`fetch\` inside the button handler and a date-formatting util in the page file. It works — until it stops working, and nothing can be tested in isolation.

## The three layers I actually keep

1. **Presentation** — components, hooks, and styling. Knows about "screen", not "world".
2. **Domain** — types, rules, and pure functions: \`Cart\`, \`isEligibleForVoucher()\`, price math. Zero imports from Next.js.
3. **Data** — API clients and queries. The only layer allowed to touch \`fetch\`.

\`\`\`ts
// domain/cart.ts — no React, no fetch.
export function isEligibleForVoucher(
  cart: Cart,
  voucher: Voucher,
): boolean {
  return cart.total >= voucher.minSpend && voucher.unusedBy <= cart.userId;
}
\`\`\`

## The rule that keeps it honest

**Dependencies point inward.** Domain imports nothing; presentation imports domain; data implements the contracts domain defines. The moment a pull request violates that, the review stops. It is one sentence to write and the entire discipline to enforce.

> Layers are not folders. A folder of \`domain/\`, \`data/\`, \`components/\` with imports crossing in both directions is just a nicer-looking mess.`,
      zh: `![分层图](/images/uploads/clean-architecture.jpg)

## "直接放进组件里"的问题

组件一开始小而诚实，然后会吸引应用里的每一个依赖。六个月后，结账流程的按钮处理器里藏着一个 \`fetch\`，页面文件里躺着一个日期格式化工具。它还能跑——直到它跑不了，而且没有任何东西可以被隔离测试。

## 我真正保留的三层

1. **表示层** —— 组件、hooks 与样式。它知道"屏幕"，不知道"世界"。
2. **领域层** —— 类型、规则与纯函数：\`Cart\`、\`isEligibleForVoucher()\`、价格计算。零 Next.js 导入。
3. **数据层** —— API 客户端与查询。唯一被允许碰 \`fetch\` 的层。

\`\`\`ts
// domain/cart.ts —— 无 React，无 fetch。
export function isEligibleForVoucher(
  cart: Cart,
  voucher: Voucher,
): boolean {
  return cart.total >= voucher.minSpend && voucher.unusedBy <= cart.userId;
}
\`\`\`

## 让它保持诚实的规则

**依赖向内指。** 领域层不导入任何东西；表示层导入领域层；数据层实现领域层定义的契约。一旦 PR 违反这一点，评审立刻停止。保持纪律只需要一句话，执行它却需要全部功夫。

> 分层不是文件夹。一个 \`domain/\`、\`data/\`、\`components/\` 文件夹但导入双向乱穿的仓库，只是包装得更好看的混乱。`,
    },
  },
  {
    slug: 'sql-vs-nosql',
    title: {
      en: 'SQL vs NoSQL: Choosing a Database for a Booking System',
      zh: 'SQL 还是 NoSQL：为购票系统选型数据库',
    },
    date: '2026-01-15',
    tags: ['Database', 'PostgreSQL', 'Architecture'],
    relatedProject: 'vietrailway-ticketing-platform',
    summary: {
      en: 'Why VietRailway uses Postgres with row-level locks for seat availability, where a document store would have been simpler, and the one query that settled the argument.',
      zh: '为什么 VietRailway 用带行锁的 Postgres 处理余座、文档型数据库在哪里会更简单，以及一锤定音的那条查询。',
    },
    body: {
      en: `![SQL vs NoSQL](/images/uploads/sql-vs-nosql.jpg)

## The question that decides it

**Can two writes touch the same record?** If yes — seats, orders, balances — you want transactions. If no — analytics, catalogs, activity feeds — you can store documents and stay happy.

## The query that settled it

Book a seat, atomically, or fail:

\`\`\`sql
UPDATE seats
   SET status = 'LOCKED', locked_by = $1
 WHERE id = $2 AND status = 'FREE'
RETURNING id;
-- rows === 1 ? booked : taken
\`\`\`

This is one statement in Postgres. In a document store, the same guarantee needs optimistic concurrency, a version field, and a retry loop in application code. Postgres wins for the booking core — not because NoSQL is bad, but because *this problem is a transaction*.

## Where I would go NoSQL

Read-heavy, write-once data: the product catalog, search indexes, cached feed slices. There the flexible schema and horizontal scaling are genuinely better.

## The honest takeaway

The choice is rarely "SQL or NoSQL". It is "**transactional core, document edges**" — and the boundary is drawn by the queries, not the hype.`,
      zh: `![SQL vs NoSQL](/images/uploads/sql-vs-nosql.jpg)

## 一锤定音的问题

**两个写操作会不会碰到同一条记录？** 会——座位、订单、余额——你需要事务。不会——分析、目录、动态流——你可以存文档并保持快乐。

## 一锤定音的查询

原子地订一个座位，否则失败：

\`\`\`sql
UPDATE seats
   SET status = 'LOCKED', locked_by = $1
 WHERE id = $2 AND status = 'FREE'
RETURNING id;
-- rows === 1 ? 订到了 : 已被占用
\`\`\`

这在 Postgres 里是一条语句。在文档型存储里，同样的保证需要乐观并发、版本字段和应用层重试循环。购票核心选 Postgres——不是因为 NoSQL 不好，而是因为**这个问题本身就是个事务**。

## 什么地方我会用 NoSQL

读多写少、一次写入的数据：商品目录、搜索索引、缓存的动态切片。在那里，灵活的 schema 与横向扩展才真正占优。

## 诚实的结论

选择很少是"SQL 还是 NoSQL"。它是"**事务核心，文档边缘**"——而边界由查询画出来，不是由炒作画出来。`,
    },
  },
  {
    slug: 'why-typescript',
    title: {
      en: 'Why I Write Every Project in TypeScript',
      zh: '为什么我每个项目都用 TypeScript 写',
    },
    date: '2025-05-11',
    tags: ['TypeScript', 'JavaScript', 'DX'],
    relatedProject: 'yibu-app',
    summary: {
      en: 'The bugs TypeScript caught before my users did, what the migration actually cost, and why the "extra ceremony" pays for itself in week one.',
      zh: 'TypeScript 在用户之前帮我拦下的 bug、迁移的真实成本，以及为什么"多出来的仪式感"第一周就回本了。',
    },
    body: {
      en: `![JS vs TS](/images/uploads/js-vs-ts.jpg)

## The bug that converted me

A feed page rendered fine locally and broke in production: \`post.author.name\` — where \`author\` was sometimes \`undefined\`. JavaScript said "cannot read properties of undefined", the user saw a white screen, and the stack trace pointed at a file I had not touched in a month. TypeScript would have refused to compile the very first version of that code.

## What the migration cost

Three evenings. Not because it was hard — because it was *mechanical*, and mechanical work is where you discover how badly you needed types. JSDoc hints, \`any\` patches, and one marathon session fixing the places that had been wrong for years.

## What you actually get

\`\`\`ts
type Post = {
  id: string;
  author?: User; // nullable, on purpose
  body: string;
};

function renderAuthor(post: Post) {
  return post.author?.name ?? 'deleted user'; // compiler checks the path
}
\`\`\`

The type is documentation that *runs*. Refactoring becomes a search-and-replace the compiler audits for you. And when a colleague opens the repo, the shape of the data is the first thing they see — not the fifth thing they discover by reading the docs.

> The best time to add types is the first commit. The second best time is right now.`,
      zh: `![JS vs TS](/images/uploads/js-vs-ts.jpg)

## 让我皈依的那个 bug

一个信息流页面本地渲染正常，一到生产就崩：\`post.author.name\`——而 \`author\` 有时是 \`undefined\`。JavaScript 说 "cannot read properties of undefined"，用户看到白屏，堆栈指向一个我一个月没碰过的文件。TypeScript 会在那段代码的第一个版本就拒绝编译。

## 迁移花了什么

三个晚上。不是因为难——而是因为它是**机械劳动**，而机械劳动正是你发现自己有多需要类型的地方。JSDoc 提示、\`any\` 补丁，外加一个马拉松式的晚上，修掉那些错了多年的地方。

## 你真正得到的东西

\`\`\`ts
type Post = {
  id: string;
  author?: User; // 可空，故意为之
  body: string;
};

function renderAuthor(post: Post) {
  return post.author?.name ?? 'deleted user'; // 编译器检查这条路径
}
\`\`\`

类型是**会运行**的文档。重构变成编译器替你审计的查找替换。而当同事打开仓库时，数据的样子是第一眼就能看到的——而不是读文档读到第五遍才发现的。

> 加类型最好的时机是第一次提交。第二好的时机就是现在。`,
    },
  },
  {
    slug: 'aws-serverless',
    title: {
      en: 'Deploying a Student Project on AWS: What I Actually Learned',
      zh: '把学生项目部署到 AWS：我真正学到的东西',
    },
    date: '2025-03-28',
    tags: ['AWS', 'Deployment', 'Serverless'],
    summary: {
      en: 'EC2, RDS, S3, Lambda, DynamoDB, CloudFront — I deployed with all of them so you can skip half of them. The services that earned their keep and the ones that were a detour.',
      zh: 'EC2、RDS、S3、Lambda、DynamoDB、CloudFront——我用了个遍，好让你能跳过其中一半。哪些服务物有所值，哪些纯属绕路。',
    },
    body: {
      en: `![AWS learning path](/images/uploads/aws-2026.jpg)

## What I actually deployed

A Next.js app, a Postgres database, user-uploaded images, and a scheduled job. Six services later, the architecture is: **Next.js on EC2, Postgres on RDS, images in S3 behind CloudFront, and one Lambda** for the cron job. That is four services doing real work.

## What earned its keep

- **RDS + EC2 in the same VPC.** Private subnet, security groups, no public exposure. This pairing is the single most underrated setup in cloud learning.
- **S3 + CloudFront.** Images served from a CDN with long cache headers — instant page loads, near-zero cost.
- **One Lambda on a schedule.** The nightly "release locked seats" job. Pay-per-invocation beats paying for a server that sleeps.

## What was a detour

**DynamoDB.** My data is relational; a document store was a second database with worse joins. **API Gateway.** The app talks to my own API — an ALB does the same job with less configuration.

## The lesson that stuck

> Cloud services are not a menu to order from — they are a toolbox, and the tool you skip is a decision too. I spent two weeks integrating a service I removed in two hours.

[The message-queues post](/writing/message-queues) is the sibling lesson on the backend side.`,
      zh: `![AWS 学习路径](/images/uploads/aws-2026.jpg)

## 我实际部署的东西

一个 Next.js 应用、一个 Postgres 数据库、用户上传的图片，以及一个定时任务。六个服务之后，架构是：**Next.js 跑在 EC2，Postgres 跑在 RDS，图片放 S3 走 CloudFront，外加一个 Lambda** 负责 cron。真正干活的只有四个服务。

## 什么物有所值

- **同一个 VPC 里的 RDS + EC2。** 私有子网、安全组、不暴露公网。这个组合是云学习里最被低估的配置，没有之一。
- **S3 + CloudFront。** 图片从 CDN 出发，带长缓存头——页面秒开，成本趋近于零。
- **一个按计划触发的 Lambda。** 每晚"释放锁定座位"的任务。按调用付费，胜过为一张睡觉的服务器付费。

## 什么纯属绕路

**DynamoDB。** 我的数据是关系型的；文档型存储等于第二套数据库加更烂的 JOIN。**API Gateway。** 应用只调自己的 API——一个 ALB 用更少的配置就能做到同样的事。

## 留下来的教训

> 云服务不是一份可以随便点的菜单——它们是一箱工具，而你跳过的那个工具同样是个决定。我花了两周集成一个两小时就删掉的服务。

[消息队列一文](/writing/message-queues)是后端那一侧的同款教训。`,
    },
  },
  {
    slug: 'message-queues',
    title: {
      en: 'Message Queues 101: RabbitMQ, Kafka, Redis',
      zh: '消息队列入门：RabbitMQ、Kafka 与 Redis',
    },
    date: '2025-02-20',
    tags: ['Backend', 'Messaging', 'Redis'],
    summary: {
      en: 'When a queue actually helps, when it is overhead, and why Redis pub/sub covers most of what a solo project needs.',
      zh: '队列什么时候真的有用、什么时候是负担，以及为什么 Redis 发布/订阅能覆盖独立项目的绝大部分需求。',
    },
    body: {
      en: `![RabbitMQ vs Kafka vs Redis](/images/uploads/rabbitmq-kafka-redis.jpg)

## First: the honest question

A queue adds a moving part. Before choosing one, answer: **do you need to decouple timing?** If the producer and consumer can live in the same request, you do not need a queue — you need a function call.

## When you genuinely need one

- **The producer is faster than the consumer.** Uploads → thumbnails; orders → emails.
- **The consumer may fail and you must not lose the work.** The "send the receipt" job retries until it succeeds.
- **Multiple consumers want the same event.** Audit + analytics + notifications, each with its own pace.

## What I actually run

**Redis pub/sub.** Not because it is the most powerful — because it is the least moving parts that still decouples. One process, one data structure, zero protocol.

\`\`\`ts
// publish
await redis.publish('order.placed', JSON.stringify(order));

// subscribe (in a worker)
const sub = redis.duplicate();
await sub.subscribe('order.placed');
sub.on('message', (channel, message) => handleOrder(JSON.parse(message)));
\`\`\`

**RabbitMQ** earns its keep when you need routing and per-queue retries. **Kafka** earns its keep when you need replay and high throughput at scale — a problem most teams never actually have.

> Start with Redis. Move to RabbitMQ when the routing hurts. Move to Kafka when the volume is real. The queue is not the product; the reliability is.`,
      zh: `![RabbitMQ vs Kafka vs Redis](/images/uploads/rabbitmq-kafka-redis.jpg)

## 首先：一个诚实的问题

队列是一个活动部件。在选型之前回答它：**你需要解耦时机吗？** 如果生产者和消费者能活在同一个请求里，你就不需要队列——你需要一次函数调用。

## 真正需要队列的场景

- **生产者比消费者快。** 上传 → 缩略图；订单 → 邮件。
- **消费者可能失败，而且你不能丢活。** "发送回执"任务会一直重试直到成功。
- **多个消费者想要同一事件。** 审计 + 分析 + 通知，各按各的节奏。

## 我实际跑的是什么

**Redis 发布/订阅。** 不是因为它最强大——而是因为它是解耦的同时活动部件最少的方案。一个进程、一个数据结构、零协议。

\`\`\`ts
// 发布
await redis.publish('order.placed', JSON.stringify(order));

// 订阅（在 worker 里）
const sub = redis.duplicate();
await sub.subscribe('order.placed');
sub.on('message', (channel, message) => handleOrder(JSON.parse(message)));
\`\`\`

**RabbitMQ** 在你需要路由和按队列重试时物有所值。**Kafka** 在你需要重放和高吞吐规模化时物有所值——而这是大多数团队实际从未遇到的问题。

> 从 Redis 开始。路由开始痛的时候换 RabbitMQ。流量真实变大的时候再换 Kafka。队列不是产品，可靠性才是。`,
    },
  },
];

export function getPost(slug: string): Post | undefined {
  return writing.find((post) => post.slug === slug);
}
