import type { Project } from './content-types';

// ─────────────────────────────────────────────────────────────
// Web experiments — UI prototypes and side builds. Replace the
// placeholder demo / GitHub links with your real pages.
// ─────────────────────────────────────────────────────────────

export const experiments: Project[] = [
  {
    slug: 'seat-board-realtime',
    kind: 'experiment',
    title: 'Seat Board — Realtime Trip List',
    subtitle: {
      en: 'A live trip board where seat counts update without a page reload.',
      zh: '一块实时车次牌——余座数量无需刷新页面即可更新。',
    },
    date: '2026-01-20',
    yearBadge: '2026',
    cover: '/img-work/vietrailway/search.png',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/cyhinverse',
    role: { en: 'Solo — code & design', zh: '独立 —— 程序 / 设计' },
    platform: 'Web (responsive)',
    stack: 'Next.js · TypeScript · SSE · Tailwind CSS',
    tags: ['Realtime', 'UI', 'Next.js'],
    experiment: {
      name: 'UI Experiment',
      theme: 'Live data, no reload',
      duration: '~2 weeks',
    },
    description: {
      en: 'Every trip card on the board shows a live "seats left" count. The experiment: can a booking UI feel alive with server-sent events instead of polling or WebSockets? Spoiler: yes, and it is far simpler to operate.',
      zh: '车次牌上的每张卡片都显示实时"剩余座位"数。实验目的：购票 UI 能否用 SSE 而非轮询或 WebSocket 就让人感觉"活"起来？剧透：可以，而且运维简单得多。',
    },
    body: {
      en: `Built to answer one question: **does a booking list need WebSockets?** For a screen that only ever shows "here is the current state", the answer is no — server-sent events are one HTTP connection, one event stream, and zero protocol bookkeeping.

\`\`\`ts
// Server: one connection, many updates.
const encoder = new TextEncoder();
const stream = new ReadableStream({
  start(controller) {
    trips.forEach((trip) => {
      controller.enqueue(encoder.encode(\`data: \${JSON.stringify(trip)}\\n\\n\`));
    });
  },
});
\`\`\`

**What went right:** the UI stays a plain render of state. No room for drift between "what the client thinks" and "what the server has".

**What went wrong:** reconnect handling is the hidden cost. A dropped connection needs an idempotent refetch, or the board silently freezes. That one bug took longer than the whole stream setup.`,
      zh: `用来回答一个问题：**购票列表真的需要 WebSocket 吗？**对于一个只展示"当前状态"的屏幕，答案是否定的——SSE 是一条 HTTP 连接、一条事件流，零协议记账。

\`\`\`ts
// 服务端：一条连接，多次更新。
const encoder = new TextEncoder();
const stream = new ReadableStream({
  start(controller) {
    trips.forEach((trip) => {
      controller.enqueue(encoder.encode(\`data: \${JSON.stringify(trip)}\\n\\n\`));
    });
  },
});
\`\`\`

**做对的事：** UI 始终保持为状态的纯渲染。"客户端以为的"和"服务端拥有的"之间没有漂移空间。

**做错的事：** 重连处理是隐藏成本。断开的连接需要幂等重拉，否则车次牌会悄悄冻结。这一个 bug 花的时间比整条流的搭建还长。`,
    },
  },
  {
    slug: 'category-filter-lab',
    kind: 'experiment',
    title: 'Category & Filter Lab',
    subtitle: {
      en: 'A single-page filter system: category pills, price slider, and rating — with live result counts.',
      zh: '单页筛选系统：分类胶囊、价格滑块与评分——带实时结果计数。',
    },
    date: '2025-07-02',
    yearBadge: '2025',
    cover: '/img-work/ecommerce_2.png',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/cyhinverse',
    role: { en: 'Solo — everything', zh: '独立 —— 全部' },
    platform: 'Web (responsive)',
    stack: 'React · TypeScript · Zustand · Tailwind CSS',
    tags: ['Search', 'Filters', 'React'],
    experiment: {
      name: 'UI Experiment',
      theme: 'Search & filters',
      duration: '~1 week',
    },
    description: {
      en: 'The category page as a single coherent view: scrollable category pills, a dual-handle price slider, star-rating filters, and sort tabs — all wired to one query state that reports how many products match at every step.',
      zh: '把分类页做成一个连贯的整体视图：可滚动的分类胶囊、双端价格滑块、星级筛选与排序标签——全部接入同一个查询状态，每一步都告诉你当前命中多少商品。',
    },
    body: {
      en: `The question: **can filters feel like one machine instead of a pile of checkboxes?**

Every control writes into a single filter object; every read derives the visible list. There is exactly one source of truth, so "clear filters" is one line — \`setFilters({})\` — and the result count is always correct because it is always computed, never cached.

\`\`\`ts
const [filters, setFilters] = useState<Filters>({});
const results = useMemo(
  () => products.filter(matches(filters)),
  [products, filters],
);
\`\`\`

**What went right:** URL sync. \`?category=&price_min=&price_max=\` means a filtered view is shareable and survives a refresh for free.

**What went wrong:** the price slider. Dual-handle drag with \`₫\` formatting, debounced writes, and no feedback loop into the input boxes took three rewrites. Sliders are deceptively hard.`,
      zh: `问题：**筛选能不能像一台机器，而不是一堆复选框？**

每个控件写入同一个筛选对象；每次读取都派生可见列表。只有唯一真相源，所以"清除筛选"只有一行——\`setFilters({})\`——而结果计数永远正确，因为它永远被计算，从不缓存。

\`\`\`ts
const [filters, setFilters] = useState<Filters>({});
const results = useMemo(
  () => products.filter(matches(filters)),
  [products, filters],
);
\`\`\`

**做对的事：** URL 同步。\`?category=&price_min=&price_max=\` 意味着一个筛选视图可分享，而且刷新后白赚一次保留。

**做错的事：** 价格滑块。双端拖拽 + \`₫\` 格式化 + 防抖写入 + 与输入框双向反馈，整整重写了三次。滑块是个看似简单实则很难的组件。`,
    },
  },
  {
    slug: 'dark-feed-prototype',
    kind: 'experiment',
    title: 'Dark Feed — Social Layout Prototype',
    subtitle: {
      en: 'A dark-first social feed: tabs, compose, engagement, trending — and one inverted premium card.',
      zh: '暗色优先的社交信息流：标签页、发帖、互动、热榜——以及一张反白的会员卡。',
    },
    date: '2025-11-05',
    yearBadge: '2025',
    cover: '/img-work/yibu_2.png',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/cyhinverse',
    role: { en: 'Solo — code & design', zh: '独立 —— 程序 / 设计' },
    platform: 'Web (responsive)',
    stack: 'Next.js · TypeScript · Tailwind CSS',
    tags: ['Social', 'Dark UI', 'Next.js'],
    experiment: {
      name: 'UI Experiment',
      theme: 'Social feed layout',
      duration: '~1 week',
    },
    description: {
      en: 'A three-column social layout that became the visual core of Yibu: icon-only sidebar, tabbed feed with a compose box, and a right rail for trending and suggestions. Specced dark-first; every surface defined before any light-mode class existed.',
      zh: '一个三栏社交布局，后来成了 Yibu 的视觉核心：纯图标侧边栏、带发帖框的标签页信息流，以及放热榜与推荐的右栏。暗色优先设计——在任何一个亮色 class 存在之前，每一块表面都已定义完毕。',
    },
    body: {
      en: `The layout experiment behind **Yibu**'s feed. Three columns, one rule: **the middle column is the product; the side columns must never out-shout it.**

**The tab bar is a query key.** \`For You\` / \`Following\` / \`Latest\` are different queries with different cursors, not local UI state — switching tabs is a fetch, so back-button and URL state work for free.

**Empty states are designed, not leftover.** "You've seen all posts", "No suggestions" — these were specced before any real data existed. A feed that knows how to end feels finished; a feed that breaks feels broken.

**The one inverted surface.** The premium card is the only white element in the whole dark layout. On purpose: a single contrast event reads as an offer; a dozen read as noise.`,
      zh: `这是 **Yibu** 信息流背后的布局实验。三栏，一条规则：**中间栏才是产品；侧栏绝不能抢它的戏。**

**标签栏就是一个查询键。** \`为你推荐\` / \`关注\` / \`最新\` 是携带不同游标的不同查询，而不是本地 UI 状态——切换标签就是一次拉取，所以返回按钮和 URL 状态都白赚到了。

**空状态是设计出来的，不是剩下的。** "已看完所有动态"、"暂无推荐"——这些在任何真实数据存在之前就已写好。一条知道如何结束的信息流显得完整；一条会崩的信息流显得破败。

**唯一一块反白表面。** 会员卡是整个暗色布局里唯一的白色元素。故意的：一次单独的对比事件读起来像"offer"；十次读起来像噪音。`,
    },
  },
  {
    slug: 'booking-search-flow',
    kind: 'experiment',
    title: 'Booking Flow — Multi-Field Search',
    subtitle: {
      en: 'Eight search parameters, one coherent results page: from station pair to carriage and seat type.',
      zh: '八个搜索参数，一页连贯的结果页：从站点对到车厢与席别。',
    },
    date: '2026-02-08',
    yearBadge: '2026',
    cover: '/img-work/vietrailway/ticket-detail.png',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/cyhinverse',
    role: { en: 'Solo — code & design', zh: '独立 —— 程序 / 设计' },
    platform: 'Web (responsive)',
    stack: 'Next.js · TypeScript · PostgreSQL · Prisma',
    tags: ['Search', 'Full-stack', 'UX'],
    experiment: {
      name: 'Flow Experiment',
      theme: 'Multi-parameter search',
      duration: '~2 weeks',
    },
    description: {
      en: 'The deep-search experiment that grew into VietRailway’s search page: station, carriage, seat class, seat type, and price ceiling on one form, with "clear filters", "my tickets", and sort — plus a results card that explains its own price.',
      zh: '这个深度搜索实验后来长成了 VietRailway 的搜索页：站点、车厢、席别、席位类型与价格上限放在同一个表单里，还有"清除筛选"、"我的车票"与排序——以及一张会解释自己价格的结果卡。',
    },
    body: {
      en: `The form that forced a schema. Eight fields can be combined 8! ways — the backend could not special-case each one, so the query had to be **built**, not written:

\`\`\`ts
function buildTripQuery(f: SearchFilters) {
  return {
    where: {
      route: { stations: { some: { name: f.from ?? undefined } } },
      departsAt: f.date ? { gte: startOfDay(f.date) } : undefined,
      classes: { some: { type: f.seatType ?? undefined } },
      minPrice: { lte: f.maxPrice ?? Number.MAX_SAFE_INTEGER },
    },
    orderBy: f.sort === 'price' ? { minPrice: 'asc' } : undefined,
  };
}
\`\`\`

**What went right:** the results card states *why* it is cheap — "from 450,000 ₫, 2 carriage/class configurations" — so the cheapest result never looks like an error.

**What went wrong:** placeholder-as-label inputs. "For example: Hà Nội" as a label is a hint wearing a costume; real labels + \`<datalist>\` suggestions beat clever placeholders every time.`,
      zh: `这个表单逼出了一个 schema。八个字段可以有 8! 种组合——后端不可能为每种组合特判，所以查询必须被**构造**，而不是被手写：

\`\`\`ts
function buildTripQuery(f: SearchFilters) {
  return {
    where: {
      route: { stations: { some: { name: f.from ?? undefined } } },
      departsAt: f.date ? { gte: startOfDay(f.date) } : undefined,
      classes: { some: { type: f.seatType ?? undefined } },
      minPrice: { lte: f.maxPrice ?? Number.MAX_SAFE_INTEGER } },
    orderBy: f.sort === 'price' ? { minPrice: 'asc' } : undefined,
  };
}
\`\`\`

**做对的事：** 结果卡会说明自己为什么便宜——"450,000 ₫ 起，2 种车厢/席别配置"——于是最便宜的结果永远不会像报错。

**做错的事：** 占位符当标签的输入框。"例如：河内"这种占位符是穿着戏服的提示；真正的标签 + \`<datalist>\` 建议，每次都胜过花哨的占位符。`,
    },
  },
];

export function getExperiment(slug: string): Project | undefined {
  return experiments.find((experiment) => experiment.slug === slug);
}
