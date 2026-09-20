import type { Project } from './content-types';

// ─────────────────────────────────────────────────────────────
// Featured web projects. Replace the placeholder URLs
// (live website, demo) with your real links — everything else
// ships as-is.
// ─────────────────────────────────────────────────────────────

export const works: Project[] = [
  {
    slug: 'ecommerce-platform',
    kind: 'work',
    title: 'Aura Commerce — E-commerce Marketplace',
    subtitle: {
      en: 'A multi-vendor marketplace for the Vietnamese market: storefront, seller portal and admin console on one catalogue.',
      zh: '面向越南市场的多商家电商平台：前台商城、商家端与运营后台共用同一套商品目录。',
    },
    date: '2025-06-15',
    yearBadge: '2025',
    cover: '/img-work/nantian/home.png',
    // TODO: replace with the live store URL.
    websiteUrl: 'https://example.com',
    githubUrl: 'https://github.com/cyhinverse',
    status: { en: 'In production', zh: '已上线' },
    role: { en: 'Full-stack developer', zh: '全栈开发' },
    platform: 'Web (responsive)',
    stack:
      'Next.js 16 · React 19 · TypeScript · Redux Toolkit · TanStack Query · Tailwind CSS · Express 5 · MongoDB · Redis · RabbitMQ · Socket.IO · VNPay · Mistral AI',
    tags: ['E-commerce', 'Marketplace', 'Event-driven', 'Full-stack'],
    description: {
      en: 'A Shopee-style marketplace serving the Vietnamese shopper, originally branded Nantian 南天: a storefront with flash sales and vouchers, a seller portal for shops, and an admin console covering 856 products, orders, permissions and banners. Express + MongoDB behind Next.js, with Redis, RabbitMQ workers and Socket.IO carrying the realtime parts.',
      zh: '面向越南消费者的 Shopee 风格电商平台（早期品牌为南天 Nantian）：带限时秒杀与优惠券的前台商城、商家端店铺后台，以及覆盖 856 个商品、订单、权限与横幅位的运营后台。Next.js 之后是 Express + MongoDB，实时部分由 Redis、RabbitMQ 工作进程与 Socket.IO 承担。',
    },
    body: {
      en: `## The product

**Aura Commerce** — the marketplace that started life as **Nantian 南天** — is a multi-vendor shop: buyers browse a catalogue of 856 products, sellers run their own storefront, and operators manage the whole system from one admin console. Three surfaces, one codebase, one catalogue.

## Flash sales are a data problem

The countdown on the homepage is not decoration — it has to agree with the price. The discount window lives on the product (price + discountPrice + campaign end), and the rail renders straight from the API payload, so a timer can never outlive its discount.

\`\`\`ts
// The campaign carries its own window; the UI renders what the API returns.
const { endsAt, items } = await getFlashSale('active');
// countdown → endsAt, prices → items[].price.discountPrice
\`\`\`

## Three audiences, one catalogue

Storefront, seller portal and admin console all read the same MongoDB catalogue through the same Express API. A product edited by a seller shows up in the storefront grid, the category page and the admin table without a sync job.

## Realtime without a second service

Chat and notifications run on Socket.IO with the Redis adapter, so any worker in the cluster can push an event to a customer connected to a different process.

## Workers, not requests

Order emails, notifications and AI jobs are RabbitMQ consumers with per-queue prefetch and dead-letter queues. The HTTP request returns as soon as the order is written; the slow parts retry behind it.

## AI on top of the catalogue

Mistral (through LangChain) does two jobs: a shopping assistant that answers product questions, and product embeddings stored in \`product_embeddings\` so search can match meaning instead of keywords.

## What the screens show

Every screen below was captured from the running app — Express 5 on MongoDB Atlas, Redis, RabbitMQ, and the Next.js client.`,
      zh: `## 产品

**Aura Commerce**——最初以 **南天 Nantian** 之名起步的电商平台——是一个多商家商城：买家浏览 856 个商品的目录，商家经营自己的店铺，运营人员在一个后台里管理整个系统。三个界面、一套代码、一份商品目录。

## 秒杀是一个数据问题

首页上的倒计时不是装饰——它必须与价格一致。折扣窗口挂在商品上（原价 + 折后价 + 活动结束时间），秒杀轨道直接渲染接口返回的数据，所以倒计时绝不会比折扣活得更久。

\`\`\`ts
// 活动自带时间窗口；前端只负责渲染接口返回的内容。
const { endsAt, items } = await getFlashSale('active');
// 倒计时 → endsAt，价格 → items[].price.discountPrice
\`\`\`

## 三种角色，一份目录

前台商城、商家端与运营后台读取的是同一份 MongoDB 商品目录、走同一个 Express 接口。商家改一个商品，前台网格、分类页与后台表格同时看到，不需要同步任务。

## 实时能力不必另起服务

聊天与通知跑在 Socket.IO 上并挂载 Redis 适配器，因此集群里任意一个工作进程都能把事件推送给连接在另一个进程上的顾客。

## 用工作进程，而不是请求

邮件、通知与 AI 任务都是 RabbitMQ 消费者，按队列配置 prefetch 与死信队列。订单写库后 HTTP 请求立即返回，慢的部分在背后重试。

## 目录之上再加一层 AI

Mistral（经 LangChain）承担两件事：回答商品问题的导购助手，以及存进 \`product_embeddings\` 的商品向量，让搜索匹配语义而非关键词。

## 下面的屏幕

每一张都截取自真实运行的应用——MongoDB Atlas 上的 Express 5、Redis、RabbitMQ 与 Next.js 客户端。`,
    },
    screens: [
      {
        src: '/img-work/nantian/home.png',
        route: '/',
        title: { en: 'Storefront home', zh: '商城首页' },
        description: {
          en: 'Hero carousel, a category rail, service guarantees and the flash-sale rail with its live countdown and discount badges.',
          zh: '主视觉轮播、分类快捷入口、服务保障，以及带实时倒计时与折扣角标的秒杀轨道。',
        },
        specs: [
          {
            en: 'Every rail is fed by one catalogue API; nothing on this page is hard-coded merchandising.',
            zh: '每一个货架都由同一个商品目录接口供给，页面里没有写死的运营位。',
          },
          {
            en: 'Client-side data fetching through TanStack Query, so returning to the page does not refetch what it already has.',
            zh: '客户端数据由 TanStack Query 负责，返回本页时不会重复拉取已有数据。',
          },
          {
            en: 'Red/ink palette with JD-style merchandising density — the visual language the whole store shares.',
            zh: '红黑配色与京东式的高密度陈列——整站共用的视觉语言。',
          },
        ],
      },
      {
        src: '/img-work/nantian/categories.png',
        route: '/categories',
        title: { en: 'Category index', zh: '分类总览' },
        description: {
          en: 'Top-level categories with their subcategory counts and a direct jump into each listing.',
          zh: '一级分类及其子分类数量，并可直达对应商品列表。',
        },
        specs: [
          {
            en: 'The tree comes from the categories collection and is shared by storefront, seller and admin.',
            zh: '分类树来自 categories 集合，前台、商家端与后台共用同一份数据。',
          },
          {
            en: 'Counts are aggregated server-side so the page needs a single round trip.',
            zh: '数量由服务端聚合，整页只需一次请求。',
          },
        ],
      },
      {
        src: '/img-work/nantian/category-detail.png',
        route: '/categories/:slug',
        title: { en: 'Category listing & filters', zh: '分类列表与筛选' },
        description: {
          en: 'The dense grid the marketplace is judged on: result count, category chips, price range, rating and brand filters, with four sort modes.',
          zh: '决定电商体验的高密度网格：结果数、分类胶囊、价格区间、评分与品牌筛选，四种排序方式。',
        },
        specs: [
          {
            en: 'Filters are query parameters, so any filtered view is a shareable URL.',
            zh: '筛选条件即查询参数，任何筛选结果都是可分享的链接。',
          },
          {
            en: 'Pagination and sorting are handled by the product service with indexed Mongo queries.',
            zh: '分页与排序由商品服务处理，走的是带索引的 Mongo 查询。',
          },
          {
            en: 'Skeleton cards while data is in flight; the grid keeps its layout so nothing jumps.',
            zh: '数据在途时显示骨架卡片，网格保持布局不跳动。',
          },
        ],
      },
      {
        src: '/img-work/nantian/product-detail.png',
        route: '/products/:slug',
        title: { en: 'Product detail', zh: '商品详情' },
        description: {
          en: 'Gallery with thumbnails, variant picker, live stock and sold counts, flash-sale price with the struck-through original, quantity stepper and the two CTAs.',
          zh: '带缩略图的商品图集、规格选择、实时库存与已售数、划掉原价的秒杀价、数量步进器与两个主按钮。',
        },
        specs: [
          {
            en: 'Variant selection drives price, stock and image together — one source of truth per combination.',
            zh: '规格选择同时决定价格、库存与主图——每个组合只有一个数据来源。',
          },
          {
            en: 'Add-to-cart writes to the server-side cart collection, so the basket survives a device change.',
            zh: '加购写入服务端购物车集合，换设备后购物车依然在。',
          },
          {
            en: 'Inventory is decremented by the inventory service, not by the client.',
            zh: '库存由 inventory 服务扣减，客户端不参与库存计算。',
          },
        ],
      },
      {
        src: '/img-work/nantian/flash-sale.png',
        route: '/flash-sale',
        title: { en: 'Flash-sale campaign', zh: '限时秒杀活动' },
        description: {
          en: 'Campaign hub with the session countdown, discount percentage per card, sold-progress bars and a full list of discounted products below.',
          zh: '活动页带场次倒计时、每张卡的折扣比例、已售进度条，下方是全部折扣商品列表。',
        },
        specs: [
          {
            en: 'The countdown renders from the campaign end time returned by the API — the client never invents a deadline.',
            zh: '倒计时渲染的是接口返回的活动结束时间，前端不会自己造一个截止时间。',
          },
          {
            en: 'Discount price and original price are both stored, so the strike-through is honest.',
            zh: '折后价与原价同时存储，划线价因此是诚实的。',
          },
          {
            en: 'A scheduler service opens and closes sessions server-side.',
            zh: '场次的开启与结束由 scheduler 服务在服务端控制。',
          },
        ],
      },
      {
        src: '/img-work/nantian/cart.png',
        route: '/cart',
        title: { en: 'Cart — grouped by shop', zh: '购物车——按店铺分组' },
        description: {
          en: 'Server-persisted basket grouped per shop, with per-line selection, quantity steppers, a free-shipping bar and a running total.',
          zh: '服务端保存的购物车按店铺分组，支持逐行勾选、数量增减、包邮进度条与实时合计。',
        },
        specs: [
          {
            en: 'Selection state is explicit: only ticked lines reach checkout, which keeps partial orders honest.',
            zh: '勾选状态是显式的：只有打勾的行才会进入结算，部分下单因此不会出错。',
          },
          {
            en: 'Totals are computed server-side from stored prices, never from values sent by the browser.',
            zh: '金额由服务端依据库中价格计算，绝不用浏览器传来的数值。',
          },
          {
            en: 'Free-shipping threshold renders as progress — a merchandising rule, not a hard-coded banner.',
            zh: '包邮门槛以进度条呈现，是运营规则而非写死的横幅。',
          },
        ],
      },
      {
        src: '/img-work/nantian/checkout.png',
        route: '/checkout',
        title: { en: 'Checkout — address, shipping, payment', zh: '结算——地址、运费、支付' },
        description: {
          en: 'Saved address with edit, per-shop order lines, shipping method and fee, voucher slot, COD or VNPay, and the final total with a place-order action.',
          zh: '可修改的收货地址、按店铺拆分的商品行、配送方式与运费、优惠券入口、COD 或 VNPay，以及最终金额与下单按钮。',
        },
        specs: [
          {
            en: 'Checkout is blocked until the account has a shipping address — the redirect sends the buyer to the address tab.',
            zh: '账户没有收货地址时无法结算——会被直接引导到地址设置页。',
          },
          {
            en: 'Shipping fee is calculated by the shipping service, and the order is written with an idempotent submission.',
            zh: '运费由配送服务计算，下单提交做幂等处理。',
          },
          {
            en: 'VNPay sandbox is wired through the payment service; COD skips the gateway entirely.',
            zh: 'VNPay 沙箱经支付服务接入；COD 完全绕过支付网关。',
          },
        ],
      },
      {
        src: '/img-work/nantian/profile.png',
        route: '/profile',
        title: { en: 'Account area', zh: '账户中心' },
        description: {
          en: 'Profile, verification badge, counters for orders and favourites, and the tabs leading to address book, shop tools and settings.',
          zh: '个人资料、验证徽标、订单与收藏计数，以及通往地址簿、店铺工具与设置的标签页。',
        },
        specs: [
          {
            en: 'Session state comes from a httpOnly cookie pair; the client never reads a token.',
            zh: '会话状态来自 httpOnly 双 Cookie，前端从不读取令牌。',
          },
          {
            en: 'Order / favourite counters are aggregated per user, not derived from the loaded page.',
            zh: '订单与收藏计数按用户聚合，而非由当前页面推算。',
          },
        ],
      },
      {
        src: '/img-work/nantian/login.png',
        route: '/login',
        title: { en: 'Sign in', zh: '登录' },
        description: {
          en: 'Split-screen sign-in: brand panel on the left, a quiet form on the right with password reveal and recovery link.',
          zh: '分屏登录：左侧品牌面板，右侧安静的表单，含密码显示与找回入口。',
        },
        specs: [
          {
            en: 'Access token (30 min) + refresh token (16 days) are issued as httpOnly cookies.',
            zh: '访问令牌（30 分钟）与刷新令牌（16 天）以 httpOnly Cookie 下发。',
          },
          {
            en: 'Accounts with 2FA enabled get an OTP challenge stored in Redis instead of a session.',
            zh: '启用两步验证的账号会先在 Redis 中生成 OTP 挑战，而不是直接建会话。',
          },
          {
            en: 'Login is rate limited and validation rejects malformed emails (no .local pseudo-domains).',
            zh: '登录接口限流，且校验会拒绝非法邮箱格式（不接受 .local 之类的伪域名）。',
          },
        ],
      },
      {
        src: '/img-work/nantian/admin-dashboard.png',
        route: '/admin/dashboard',
        title: { en: 'Admin — operations dashboard', zh: '后台——运营总览' },
        description: {
          en: 'Revenue, orders, customers and catalogue KPIs with revenue/order charts, recent orders and best-selling products below.',
          zh: '营收、订单、客户与商品四项指标，附营收 / 订单图表、最近订单与热销商品。',
        },
        specs: [
          {
            en: 'Each KPI is aggregated by the statistics service rather than by summing a paginated list.',
            zh: '每项指标由 statistics 服务聚合，而不是把分页列表加起来。',
          },
          {
            en: 'The whole /admin tree is role-guarded; the sidebar reflects the permissions the account actually holds.',
            zh: '整个 /admin 区域按角色鉴权，侧边栏反映账号真实拥有的权限。',
          },
        ],
      },
      {
        src: '/img-work/nantian/admin-products.png',
        route: '/admin/products',
        title: { en: 'Admin — catalogue management', zh: '后台——商品管理' },
        description: {
          en: '856 products with search, category, brand, price and status filters; each row exposes stock, sold count and inline actions.',
          zh: '856 个商品的表格，支持搜索与分类、品牌、价格、状态筛选；每行展示库存、已售与行内操作。',
        },
        specs: [
          {
            en: 'Server-side filtering and pagination keep the table responsive at catalogue scale.',
            zh: '服务端筛选与分页，让表格在目录规模下依然流畅。',
          },
          {
            en: 'Bulk dataset import runs through scripts/build-real-dataset.js, which is how the catalogue was seeded.',
            zh: '批量数据导入由 scripts/build-real-dataset.js 完成，目录就是这样灌进去的。',
          },
          {
            en: 'Permission changes are written to an audit trail by the permission service.',
            zh: '权限变更由 permission 服务写入审计记录。',
          },
        ],
      },
    ],
    systems: [
      {
        name: 'Cluster-mode Express API',
        summary: {
          en: 'The primary process forks a worker per core so the Node API uses the whole machine; Redis-backed rate limiting and a load-test switch keep the cluster honest.',
          zh: '主进程按核数 fork 工作进程，让 Node 接口吃满整机；基于 Redis 的限流与压测开关保证集群行为可控。',
        },
        where: 'server-ecommerce/src/server.js',
      },
      {
        name: 'Dual-token cookie auth',
        summary: {
          en: 'Short-lived access token plus a long-lived refresh token, both httpOnly; refresh hashes are rotated per session.',
          zh: '短期访问令牌 + 长期刷新令牌，均为 httpOnly；刷新令牌哈希按会话轮换。',
        },
        where: 'server-ecommerce/src/services/token.service.js',
      },
      {
        name: 'Two-factor + email OTP on Redis',
        summary: {
          en: 'Login challenges, email verification and password reset codes are one-time keys in Redis with a TTL — the API never stores a raw code.',
          zh: '登录挑战、邮箱验证与重置密码验证码都是 Redis 中带 TTL 的一次性键，接口不存储明文验证码。',
        },
        where: 'server-ecommerce/src/services/auth.service.js',
      },
      {
        name: 'RabbitMQ workers with prefetch + DLQ',
        summary: {
          en: 'Order and notification consumers run outside the request cycle with per-queue prefetch, retry and dead-letter queues.',
          zh: '订单与通知消费者在请求周期之外运行，按队列设置 prefetch、重试与死信队列。',
        },
        where: 'server-ecommerce/src/workers/order.worker.js',
      },
      {
        name: 'Transactional outbox',
        summary: {
          en: 'Domain events are written to an outbox collection in the same write as the state change, then published reliably.',
          zh: '领域事件与状态变更在同一次写入中落到 outbox 集合，之后再可靠地发布。',
        },
        where: 'server-ecommerce/src/services/outbox.service.js',
      },
      {
        name: 'Redis for cache, limits and fan-out',
        summary: {
          en: 'One Redis serves cached reads, distributed rate limiting, OTP storage and the Socket.IO adapter.',
          zh: '同一个 Redis 承担读缓存、分布式限流、验证码存储与 Socket.IO 适配器。',
        },
        where: 'server-ecommerce/src/services/redis.service.js',
      },
      {
        name: 'Socket.IO realtime chat',
        summary: {
          en: 'Buyer↔shop conversations and notifications are pushed over websockets, with the Redis adapter fanning events across workers.',
          zh: '买家与店铺的会话和通知通过 WebSocket 推送，Redis 适配器把事件分发到各个工作进程。',
        },
        where: 'server-ecommerce/src/socket',
      },
      {
        name: 'VNPay payments',
        summary: {
          en: 'Sandbox VNPay flow wired through the payment service, with return handling on the client.',
          zh: 'VNPay 沙箱流程接入支付服务，返回结果由客户端页面处理。',
        },
        where: 'server-ecommerce/src/services/payment.service.js',
      },
      {
        name: 'AI assistant & product embeddings',
        summary: {
          en: 'Mistral via LangChain powers the shopping assistant; embeddings stored per product back semantic search and recommendations.',
          zh: 'Mistral 经 LangChain 驱动导购助手；按商品存储的向量支撑语义搜索与推荐。',
        },
        where: 'server-ecommerce/src/services/embedding.service.js',
      },
      {
        name: 'Observability & audit trail',
        summary: {
          en: 'prom-client exposes metrics scraped by Prometheus with Grafana dashboards in Compose; permission changes land in an audit collection.',
          zh: 'prom-client 暴露指标供 Prometheus 抓取，Compose 内含 Grafana 面板；权限变更写入审计集合。',
        },
        where: 'server-ecommerce/src/monitoring',
      },
    ],
  },
  {
    slug: 'vietrailway-ticketing-platform',
    kind: 'work',
    title: 'Mekong Line — Railway Ticketing Platform',
    subtitle: {
      en: 'Book seats on Vietnam’s North–South railway, hold them for ten minutes, pay with VNPay, and board with a QR e-ticket.',
      zh: '预订越南南北铁路车票：锁座十分钟、VNPay 支付、凭二维码电子票上车。',
    },
    date: '2026-03-10',
    yearBadge: '2026',
    cover: '/img-work/vietrailway/home.png',
    // TODO: replace with the live site URL.
    websiteUrl: 'https://example.com',
    githubUrl: 'https://github.com/cyhinverse',
    status: { en: 'In production', zh: '已上线' },
    role: { en: 'Full-stack developer — design & code', zh: '全栈开发 —— 设计 / 程序' },
    platform: 'Web (responsive)',
    stack:
      'Next.js 16 · React 19 · TypeScript · Tailwind CSS · TanStack Query · NestJS · RabbitMQ · PostgreSQL · Prisma · Redis Sentinel · Docker · VNPay',
    tags: ['Booking', 'Microservices', 'Distributed systems', 'Full-stack'],
    description: {
      en: 'A full ticketing platform for Vietnam’s North–South railway: multi-parameter search across stations and seat classes, a seat-level booking wizard, ten-minute seat holds, VNPay checkout, QR e-tickets, and an operations console for trip inventory, orders, payments and vouchers. Six NestJS services behind one API gateway.',
      zh: '一套完整的越南南北铁路售票平台：按车站与席别多参数搜索、精确到座位的预订向导、十分钟锁座、VNPay 支付、二维码电子票，以及面向运营的车次库存 / 订单 / 支付 / 优惠券后台。六个 NestJS 服务统一挂在一个 API 网关上。',
    },
    body: {
      en: `## The product

**Mekong Line** sells seats on Vietnam's Bắc – Trung – Nam corridor. Two surfaces share one design system: a passenger storefront (search → seat map → booking wizard → VNPay → QR e-ticket) and an operations console for trip inventory, orders, payments, vouchers and users.

## Six services, one gateway

The browser only ever talks to \`api-gateway\` (NestJS). Behind it, \`auth-service\`, \`tickets-service\`, \`orders-service\`, \`payments-service\` and \`notification-service\` are independent apps that speak RabbitMQ commands and events. Each service owns its own PostgreSQL database — no shared tables, no cross-service joins.

\`\`\`text
client (Next.js 16)
  -> api-gateway        HTTP + cookie auth + rate limiting
    -> auth-service     accounts, sessions, roles
    -> tickets-service  trips, coaches, seats, search
    -> orders-service   checkout, order workflow, e-ticket
    -> payments-service payments + VNPay
    -> notification-service  email / in-app events
\`\`\`

## Holding a seat is the hard part

Two buyers, one last berth. The second must see "sold out" — never a double-booked train. A double layer handles it: Redlock (auto-extended, so the lock never expires mid-flow) as the UX-level hold, and \`SELECT ... FOR UPDATE\` row locks inside a short transaction as the source of truth.

\`\`\`ts
// tickets-service: the row lock decides, Redlock only smooths the UX.
await this.prisma.$transaction(async (tx) => {
  const [seat] = await tx.$queryRaw\`SELECT * FROM ticket_items WHERE id = \${id} FOR UPDATE\`;
  if (seat.status !== 'AVAILABLE') throw new SeatTakenError();
  await tx.ticketItem.update({ where: { id }, data: { status: 'RESERVED' } });
});
\`\`\`

Seats stay held for ten minutes. The countdown is not a cron job: the order id is published to \`orders_expiration_queue\` with \`x-message-ttl: 600000\`, and the dead-letter fan-out runs the compensation — release the seats, expire the order and its payment.

## Payment is a saga, not a transaction

A payment cannot be one ACID transaction across four databases, so it is a choreography: VNPay's IPN (server-to-server, the only source of truth) marks the payment paid and writes a \`payment.paid\` event into an **outbox table in the same commit**; a cron publisher drains the outbox; \`orders-service\` consumes the event and runs mark-paid → confirm → issue-ticket → email. Any failure on the way runs compensation instead of a rollback.

## Checkout is idempotent

Double-clicks and retries hit a unique \`idempotency_key\` on the order. A replayed key returns the original response instead of creating a second booking.

## What the screens below show

Every screen was captured from the running stack — Docker infrastructure, six services, and the Next.js client — not a mockup.`,
      zh: `## 产品

**Mekong Line** 售卖越南南北走廊的车票。两个界面共用一套设计系统：面向乘客的前台（搜索 → 选座 → 预订向导 → VNPay → 二维码电子票），以及面向运营的后台（车次库存、订单、支付、优惠券、用户）。

## 六个服务，一个网关

浏览器只与 \`api-gateway\`（NestJS）通信。其后的 \`auth-service\`、\`tickets-service\`、\`orders-service\`、\`payments-service\`、\`notification-service\` 都是独立应用，通过 RabbitMQ 的命令与事件通信。每个服务各自拥有一个 PostgreSQL 数据库——没有共享表，也没有跨服务 join。

\`\`\`text
client (Next.js 16)
  -> api-gateway        HTTP + Cookie 鉴权 + 限流
    -> auth-service     账号、会话、角色
    -> tickets-service  车次、车厢、座位、搜索
    -> orders-service   下单、订单流程、电子票
    -> payments-service 支付 + VNPay
    -> notification-service  邮件 / 站内事件
\`\`\`

## 锁座才是难点

两个买家抢最后一个铺位，第二位必须看到"已售罄"——绝不能出现重复售票。两层机制解决：Redlock（自动续期，流程再长也不会中途过期）负责体验层的占位，短事务内的 \`SELECT ... FOR UPDATE\` 行锁才是最终事实来源。

\`\`\`ts
// tickets-service：行锁做裁决，Redlock 只负责体验平滑。
await this.prisma.$transaction(async (tx) => {
  const [seat] = await tx.$queryRaw\`SELECT * FROM ticket_items WHERE id = \${id} FOR UPDATE\`;
  if (seat.status !== 'AVAILABLE') throw new SeatTakenError();
  await tx.ticketItem.update({ where: { id }, data: { status: 'RESERVED' } });
});
\`\`\`

座位保留十分钟。倒计时不是定时任务：订单号被投递到 \`orders_expiration_queue\`，带 \`x-message-ttl: 600000\`，TTL 到期后死信分流触发补偿——释放座位、让订单与其支付过期。

## 支付是 Saga，不是事务

一次支付无法跨越四个数据库做成一个 ACID 事务，于是它是一场编排：VNPay 的 IPN（服务器到服务器，唯一事实来源）把支付置为已付，并在**同一个提交里**把 \`payment.paid\` 事件写入 outbox 表；定时发布器把 outbox 投递出去；\`orders-service\` 消费事件并依次执行 mark-paid → confirm → issue-ticket → 发邮件。中途任何失败都走补偿，而不是回滚。

## 下单是幂等的

双击与重试都会撞上订单上唯一的 \`idempotency_key\`：重复的 key 返回原始响应，而不是再建一单。

## 下面的屏幕

每一张都是从一个真实运行的栈里截取的——Docker 基础设施、六个服务，以及 Next.js 客户端——不是效果图。`,
    },
    screens: [
      {
        src: '/img-work/vietrailway/home.png',
        route: '/',
        title: { en: 'Home — hero search & featured departure', zh: '首页——主搜索与本周推荐车次' },
        description: {
          en: 'Editorial hero, a station/date search card, live stats, then the week’s featured trip with its cheapest fare and remaining seats.',
          zh: '杂志式主视觉、车站 / 日期搜索卡、实时统计，随后是本周推荐车次，附最低票价与余座。',
        },
        specs: [
          {
            en: 'Server-first Next.js 16 App Router with client islands for interactive cards.',
            zh: 'Next.js 16 App Router 服务端优先，仅交互卡片为客户端组件。',
          },
          {
            en: 'Featured trip and fare come from GET /search/trips, so the homepage can never drift from inventory.',
            zh: '推荐车次与票价来自 GET /search/trips，首页数据不会与库存脱节。',
          },
          {
            en: 'Design language: deep teal surface, gold accents, stamp badges — border over shadow, no gradients.',
            zh: '设计语言：深青底、金色点缀、印章徽标——以描边代替阴影，不用渐变。',
          },
        ],
      },
      {
        src: '/img-work/vietrailway/search.png',
        route: '/search',
        title: { en: 'Search — multi-parameter trip results', zh: '搜索——多参数车次结果' },
        description: {
          en: 'Filter by origin, destination, date, sort order, departure time-of-day and seat class; results show schedule, duration and lowest price per trip.',
          zh: '按出发站、到达站、日期、排序、出发时段与席别筛选；结果展示时刻、历时与每趟最低价。',
        },
        specs: [
          {
            en: 'Filter state lives in the URL query, so any result page is shareable and back-navigation is free.',
            zh: '筛选状态放在 URL 查询参数里，任何结果页可分享，返回键天然可用。',
          },
          {
            en: 'Inputs run through useDeferredValue to keep typing smooth while a query is in flight.',
            zh: '输入经 useDeferredValue 处理，查询在途时打字依然顺滑。',
          },
          {
            en: 'The gateway validates every query parameter (enum sort, max limit 50) and rejects bad input with 400.',
            zh: '网关校验全部查询参数（排序枚举、limit 上限 50），非法输入直接 400。',
          },
        ],
      },
      {
        src: '/img-work/vietrailway/ticket-list.png',
        route: '/tickets',
        title: { en: 'Catalogue — every trip on sale', zh: '车次目录——所有在售车次' },
        description: {
          en: 'The public inventory list: each card carries train code, route, departure time, duration, seat availability badge and lowest fare.',
          zh: '公开的库存列表：每张卡片含车次代码、线路、发车时间、历时、余座徽标与最低票价。',
        },
        specs: [
          {
            en: 'Pagination, station filters and sorting all run against the same public GET /tickets endpoint the admin console uses.',
            zh: '分页、车站筛选与排序都走公开的 GET /tickets，与后台用的是同一接口。',
          },
          {
            en: 'Fares and seat counts are aggregated per trip from its ticket items — one round-trip per card grid.',
            zh: '票价与余座按车次聚合自其票项——卡片网格只需一次往返请求。',
          },
        ],
      },
      {
        src: '/img-work/vietrailway/ticket-detail.png',
        route: '/tickets/:id',
        title: { en: 'Ticket detail — booking wizard & seat map', zh: '车次详情——预订向导与选座图' },
        description: {
          en: 'Coach and seat-class cards with per-class fare and availability, a seat map with live seat states, and a sticky order summary that carries the running total.',
          zh: '车厢与席别卡片展示各自票价与余座，选座图实时反映座位状态，右侧粘性摘要持续累计金额。',
        },
        specs: [
          {
            en: 'Seat availability is queried per coach from GET /tickets/:id/seat-map — never stored as a counter column.',
            zh: '每个车厢的余座由 GET /tickets/:id/seat-map 实时查询，绝不用计数列代替。',
          },
          {
            en: 'Choosing seats calls the reserve endpoint, which takes the Redlock hold and the row lock before returning.',
            zh: '选座会调用占座接口，返回之前先取得 Redlock 与行锁。',
          },
          {
            en: 'Money is handled as integer VND end-to-end; totals multiply as BigInt to avoid float drift.',
            zh: '金额全程使用整数越南盾；总额用 BigInt 相乘，避免浮点误差。',
          },
        ],
      },
      {
        src: '/img-work/vietrailway/order-detail.png',
        route: '/orders/:id',
        title: { en: 'Order detail — paid booking', zh: '订单详情——已支付订单' },
        description: {
          en: 'The order as the system sees it: status, trip, coach and seat labels, passenger count, total and — when a payment fails late — the cancellation reason recorded by the compensation worker.',
          zh: '系统视角的订单：状态、车次、车厢与座位号、乘客数、总额；若支付迟到失败，还会记录补偿流程写入的取消原因。',
        },
        specs: [
          {
            en: 'Ownership is asserted server-side (403 for non-owners) — the UI never decides who may read an order.',
            zh: '归属校验在服务端完成（非本人 403），前端从不决定"谁可以读订单"。',
          },
          {
            en: 'Status transitions are driven by the saga, not by the client: mark-paid → confirm → issue-ticket.',
            zh: '状态流转由 Saga 驱动而非客户端：mark-paid → confirm → issue-ticket。',
          },
          {
            en: 'A late payment on an expired order is compensated instead of silently fulfilled.',
            zh: '已过期订单的迟到支付会走补偿，而不是被悄悄履约。',
          },
        ],
      },
      {
        src: '/img-work/vietrailway/e-tickets.png',
        route: '/profile/tickets',
        title: { en: 'E-ticket — QR boarding pass', zh: '电子票——二维码乘车凭证' },
        description: {
          en: 'Issued tickets land in the account with train, coach, seat and departure details plus the QR payload that staff scan at the gate.',
          zh: '已出票的电子票进入账户，包含车次、车厢、座位、发车信息，以及检票口扫描的二维码内容。',
        },
        specs: [
          {
            en: 'The ticket is issued by orders-service and carries a signed QR payload that the check-in screen verifies.',
            zh: '电子票由 orders-service 出票，二维码内容经签名，检票页面负责校验。',
          },
          {
            en: 'Ticket codes are generated server-side (TCK-…) and never reused across orders.',
            zh: '票号由服务端生成（TCK-…），不同订单之间不复用。',
          },
          {
            en: 'Rendering the QR is a client concern (qrcode), so the payload never has to be an image in the database.',
            zh: '二维码渲染属前端职责（qrcode），数据库里无需存图片。',
          },
        ],
      },
      {
        src: '/img-work/vietrailway/profile.png',
        route: '/profile',
        title: { en: 'Account — profile & security', zh: '账户——资料与安全' },
        description: {
          en: 'Signed-in account surface: profile details, verified badge, join date, and the tabs leading to orders, tickets and notifications.',
          zh: '登录后的账户界面：个人资料、已验证徽标、加入日期，以及通往订单、车票与通知的标签页。',
        },
        specs: [
          {
            en: 'The session is read once from GET /auth/session and cached by TanStack Query — the client never decodes tokens itself.',
            zh: '会话通过 GET /auth/session 读取一次并交给 TanStack Query 缓存，前端从不自行解析令牌。',
          },
          {
            en: 'Roles (USER / STAFF / ADMIN) drive which surfaces appear; the server still re-checks every request.',
            zh: '角色（USER / STAFF / ADMIN）决定界面可见范围，服务端依然对每个请求重新鉴权。',
          },
        ],
      },
      {
        src: '/img-work/vietrailway/notifications.png',
        route: '/notifications',
        title: { en: 'Notification inbox', zh: '通知中心' },
        description: {
          en: 'Promotions, booking confirmations and payment results land in one inbox, with read state kept per user.',
          zh: '优惠、订单确认与支付结果汇聚到同一个收件箱，已读状态按用户保存。',
        },
        specs: [
          {
            en: 'notification-service has no public HTTP surface — it only consumes events, which keeps the API attack surface small.',
            zh: 'notification-service 没有对外 HTTP 接口，只消费事件，从而缩小攻击面。',
          },
          {
            en: 'Queues are durable with manual acknowledgement and a dead-letter queue for failed handlers.',
            zh: '队列持久化、手动确认，处理失败的消息进入死信队列。',
          },
        ],
      },
      {
        src: '/img-work/vietrailway/route-map.png',
        route: '/route-map',
        title: { en: 'Route map — the network at a glance', zh: '线路图——一眼看懂路网' },
        description: {
          en: 'Stations and segments rendered from the station catalogue — the visual anchor of the "Tuyến đường" (journey line) design language.',
          zh: '由车站目录渲染的站点与区间，是"Tuyến đường"（旅程线）设计语言的视觉锚点。',
        },
        specs: [
          {
            en: 'Stations come from one typed catalogue shared by search, checkout and the map.',
            zh: '车站来自一份类型化目录，搜索、下单与线路图共用。',
          },
          {
            en: 'Animated with restraint — motion respects prefers-reduced-motion.',
            zh: '动效克制，并遵循 prefers-reduced-motion。',
          },
        ],
      },
      {
        src: '/img-work/vietrailway/admin-dashboard.png',
        route: '/admin',
        title: { en: 'Admin — operations dashboard', zh: '后台——运营总览' },
        description: {
          en: 'Ticket, order, user and payment counts with the latest orders listed underneath — the console an operator opens first.',
          zh: '车次、订单、用户与支付的数量统计，下方是最新订单列表——运营人员打开后台的第一屏。',
        },
        specs: [
          {
            en: 'Every /admin route is guarded by @Roles(ADMIN) on top of the global JWT guard.',
            zh: '所有 /admin 路由在全球 JWT 守卫之上再叠加 @Roles(ADMIN)。',
          },
          {
            en: 'Aggregates are read from each service’s own database through the gateway.',
            zh: '聚合数据经网关从各服务自己的数据库中读取。',
          },
        ],
      },
      {
        src: '/img-work/vietrailway/admin-tickets.png',
        route: '/admin/tickets',
        title: { en: 'Admin — trip inventory', zh: '后台——车次库存管理' },
        description: {
          en: 'Trip inventory with coaches and seat classes: create a trip, publish it, then manage its ticket items and seat rows.',
          zh: '含车厢与席别的车次库存：创建车次、发布上架，再管理其票项与座位行。',
        },
        specs: [
          {
            en: 'Validation rejects unknown fields (forbidNonWhitelisted) so inventory payloads stay exact.',
            zh: '校验拒绝未知字段（forbidNonWhitelisted），库存请求体保持精确。',
          },
          {
            en: 'Path parameters are validated as UUIDs before they reach Prisma, turning would-be 500s into 400s.',
            zh: '路径参数在抵达 Prisma 前先做 UUID 校验，把可能的 500 变成 400。',
          },
        ],
      },
      {
        src: '/img-work/vietrailway/login.png',
        route: '/login',
        title: { en: 'Sign in — cookie sessions', zh: '登录——Cookie 会话' },
        description: {
          en: 'Split-screen sign-in: the brand panel carries the product story while the form stays narrow and quiet.',
          zh: '分屏登录：左侧承载品牌叙事，右侧表单保持窄而安静。',
        },
        specs: [
          {
            en: 'The gateway sets HttpOnly accessToken/refreshToken cookies — no tokens in localStorage.',
            zh: '网关下发 HttpOnly 的 accessToken/refreshToken Cookie——localStorage 中不放任何令牌。',
          },
          {
            en: 'Auth endpoints are rate limited (login 10 req/min, reset flows 5 req/min).',
            zh: '认证接口限流（登录 10 次/分，重置类 5 次/分）。',
          },
          {
            en: 'Reset and verification tokens are stored hashed; the raw token only travels by email.',
            zh: '重置与验证令牌仅存哈希，明文只通过邮件传递。',
          },
        ],
      },
    ],
    systems: [
      {
        name: 'API gateway + global guard chain',
        summary: {
          en: 'Throttler → JWT → Roles run for every request; only endpoints marked @Public() bypass authentication.',
          zh: '每个请求都经过 限流 → JWT → 角色 三道守卫，只有标记 @Public() 的接口才放行。',
        },
        where: 'api-gateway/src/api-gateway.module.ts',
      },
      {
        name: 'Distributed locking (Redlock + fencing)',
        summary: {
          en: 'Prevents two buyers from holding the same seat; locks auto-extend so a long checkout cannot expire mid-flow.',
          zh: '防止两个买家占同一座位；锁自动续期，长流程不会中途失效。',
        },
        where: 'tickets-service/src/redis/redis.service.ts',
      },
      {
        name: 'Transactional outbox',
        summary: {
          en: 'payment.paid is written in the same transaction as the payment status, then published by a cron worker with exponential backoff.',
          zh: 'payment.paid 与支付状态在同一事务中写入，再由定时任务以指数退避发布。',
        },
        where: 'payments-service/src/payment/payment.service.ts',
      },
      {
        name: 'Saga choreography + compensation',
        summary: {
          en: 'payment.paid → markPaid → confirm → issueTicket → email; any failure runs compensation (release seats, cancel) instead of a two-phase commit.',
          zh: 'payment.paid → markPaid → confirm → issueTicket → 邮件；任一步失败即执行补偿（释放座位、取消订单），而非两阶段提交。',
        },
        where: 'orders-service/src/order/order.service.ts',
      },
      {
        name: 'Delayed queue (TTL + dead-letter)',
        summary: {
          en: 'The 10-minute seat hold is a message TTL, not a scheduled job: expiry dead-letters into the order-expiry consumer.',
          zh: '十分钟锁座是一个消息 TTL，而非定时任务：到期后死信进入订单过期消费者。',
        },
        where: 'orders-service/src/order/order.module.ts',
      },
      {
        name: 'Idempotency key',
        summary: {
          en: 'A unique key on checkout collapses double-clicks and retries into one order — a replayed key returns the original response.',
          zh: '下单接口的唯一幂等键把双击与重试收敛为一单——重复的 key 返回原始响应。',
        },
        where: 'orders-service/src/order/order.service.ts',
      },
      {
        name: 'Redis Sentinel HA cluster',
        summary: {
          en: 'One master, two replicas and three sentinels (quorum 2/3 against split-brain) with automatic failover; reads round-robin over replicas.',
          zh: '一主两从三哨兵（2/3 法定人数防止脑裂）自动故障转移；读请求在从库间轮询。',
        },
        where: 'infra/docker/docker-compose.yml',
      },
      {
        name: 'Database per service',
        summary: {
          en: 'PostgreSQL for auth, tickets, orders, payments and notifications; Redis for cache and locks. Seat mutations serialize through SELECT ... FOR UPDATE.',
          zh: '认证、车次、订单、支付、通知各用独立 PostgreSQL；Redis 负责缓存与锁。座位变更通过 SELECT ... FOR UPDATE 串行化。',
        },
        where: 'infra/docker/init-databases.sql',
      },
      {
        name: 'VNPay IPN integration',
        summary: {
          en: 'Server-to-server IPN is the source of truth (checksum verified, amount checked, status idempotent); the return URL only displays the result.',
          zh: '服务器到服务器的 IPN 是唯一事实来源（校验签名、核对金额、状态幂等）；返回页只负责展示结果。',
        },
        where: 'api-gateway/src/payment/vnpay.service.ts',
      },
      {
        name: 'Nginx reverse proxy + containers',
        summary: {
          en: 'One entry port routes /api/* to the gateway and everything else to Next.js, with gzip, security headers and two-layer rate limits; services run as non-root multi-stage images.',
          zh: '单一入口把 /api/* 转发到网关、其余交给 Next.js，附带 gzip、安全响应头与双层限流；服务以非 root 的多阶段镜像运行。',
        },
        where: 'infra/nginx/default.conf',
      },
      {
        name: 'Client state layer + refresh dedupe',
        summary: {
          en: 'TanStack Query holds server state; an axios interceptor collapses concurrent 401s into a single refresh call.',
          zh: '服务端状态交给 TanStack Query；axios 拦截器把并发的 401 收敛为一次刷新请求。',
        },
        where: 'client/lib/http.ts',
      },
    ],
  },
  {
    slug: 'yibu-app',
    kind: 'work',
    title: 'Yibu 一步 — Social Platform',
    subtitle: {
      en: 'A Twitter-style microblogging platform — profiles, posts, follows, and a dark-first feed.',
      zh: 'Twitter 风格微博客平台——个人主页、动态、关注，以及暗色优先的信息流。',
    },
    date: '2025-12-19',
    yearBadge: '2025',
    cover: '/img-work/yibu_1.png',
    // TODO: replace with the live site URL.
    websiteUrl: 'https://example.com',
    githubUrl: 'https://github.com/cyhinverse',
    status: { en: 'Prototype', zh: '原型' },
    role: { en: 'Full-stack developer', zh: '全栈开发' },
    platform: 'Web (responsive)',
    stack: 'Next.js · React · TypeScript · Tailwind CSS · WebSocket',
    tags: ['Social', 'Next.js', 'Real-time', 'Full-stack'],
    description: {
      en: '"Connect, share, and discover — your social experience reimagined." Profiles, a three-column feed with tabs, compose, likes and replies, trending, and a premium upsell card. Dark-first design with a light-mode sign-in split-screen.',
      zh: '"连接、分享、发现——重新想象你的社交体验。"个人主页、带标签页的三栏信息流、发帖、点赞与回复、热榜，以及一张会员升级卡。暗色优先设计，登录页则为明暗分屏。',
    },
    body: {
      en: `## The idea

**Yibu** ("one step") is a microblogging platform: post a thought, follow people, scroll a timeline. The familiar grammar — because the point is the product work around it, not the format.

## A feed is a pipeline

The feed is not a component, it is a pipeline: fetch → normalize → sort → virtualize. Every post is a typed \`Post\` record, the timeline is an infinite scroll over a cursor, and only visible rows are mounted as DOM nodes.

\`\`\`ts
type FeedRequest = { cursor: string | null; tab: 'for-you' | 'following' };
type FeedResponse = { posts: Post[]; nextCursor: string | null };

// The tab is part of the query key — switching tabs refetches,
// not recomputes.
queryKey: ['feed', tab, cursor],
\`\`\`

## Dark-first, deliberately

The default theme is dark. Every card, badge, and input was specced in dark mode first; light mode is the accent. The premium upsell card is deliberately inverted — one white surface in a black feed pulls the eye exactly once.

## The split-screen login

The sign-in page is two panels: the brand story on black, the form on white. It was the first place I put real design intent — and the last place I'd cut it. Login flows are a portfolio's most-read page; they deserve the budget.`,
      zh: `## 点子

**一步**是一个微博客平台：发布想法、关注他人、刷时间线。语法是熟悉的——因为重点在于围绕它的产品工作，而不是格式本身。

## 信息流是一条管线

信息流不是一个组件，而是一条管线：拉取 → 规范化 → 排序 → 虚拟化。每条动态都是一个类型化的 \`Post\` 记录，时间线基于游标无限滚动，只有可见的行才会挂载为 DOM 节点。

\`\`\`ts
type FeedRequest = { cursor: string | null; tab: 'for-you' | 'following' };
type FeedResponse = { posts: Post[]; nextCursor: string | null };

// tab 是查询键的一部分——切换标签会重新拉取，而不是重新计算。
queryKey: ['feed', tab, cursor],
\`\`\`

## 暗色优先，刻意为之

默认主题是暗色。每张卡片、徽章和输入框都先在暗色下设计；亮色是点缀。会员卡刻意反白——黑色信息流里唯一一块白色表面，恰好只吸引一次目光。

## 分屏登录页

登录页是两块面板：左边黑色讲品牌故事，右边白色放表单。这是我最先投入设计意图的地方——也是最后才会砍的地方。登录流程是作品集里被读得最多的页面，它值得这个预算。`,
    },
  },
];

export function getWork(slug: string): Project | undefined {
  return works.find((work) => work.slug === slug);
}
