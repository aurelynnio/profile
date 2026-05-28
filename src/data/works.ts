import { MarkdownPost } from '../utils/markdown';

export const worksData: MarkdownPost[] = [
  {
    slug: 'ecommerce-platform',
    title: 'Nantian Marketplace',
    date: '2025-03-15T00:00:00.000Z',
    thumbnail: '/img-work/ecommerce_1.png',
    description:
      'A full-stack marketplace website with flash-sale merchandising, catalog filtering, and a complete shopping flow from discovery to purchase.',
    summary:
      'Marketplace storefront backed by a scalable full-stack commerce platform',
    body: `## Overview

Nantian is a marketplace-style e-commerce website I built and demoed from the full stack running in Docker. The product experience focuses on helping users discover items quickly, compare options clearly, and move from browsing to purchase with minimal friction.

## Website Experience

- **Homepage Merchandising**: category shortcuts, flash-sale modules, voucher highlights, recommendation rails, and account quick actions
- **Product Discovery**: search, category navigation, filter sidebar, and sorting options to handle larger catalogs without overwhelming the user
- **Product Detail Flow**: gallery images, variant selection, stock visibility, ratings, reviews, add-to-cart, and buy-now actions
- **Commerce Operations**: cart, wishlist, voucher flows, shop management, order processing, and payment integration
- **Realtime Support**: notification and chat flows backed by event-driven services for a more responsive shopping experience

## Tech Stack

Built with React on the frontend and Node.js, Express, and MongoDB on the backend. The wider platform also uses Redis, RabbitMQ, Socket.IO, Docker Compose, Prometheus/Grafana, and AI-assisted recommendation or chatbot services.

## Screenshots

![Homepage Demo](/img-work/ecommerce_1.png)

![Catalog Demo](/img-work/ecommerce_2.png)

![Product Detail Demo](/img-work/ecommerce_3.png)
`,
    link: '',
    platform: 'Web / Marketplace',
    stack:
      'React, TypeScript, Node.js, Express, MongoDB, Redis, RabbitMQ, Socket.IO, Docker',
    'Current Status': 'Active Development',
    Role: 'Full-stack Developer',
    yearBadge: '2025-',
  },
  {
    slug: 'vietrailway-ticketing-platform',
    title: 'VietRailway Ticketing Platform',
    date: '2026-05-28T00:00:00.000Z',
    thumbnail: '/img-work/railway_1.png',
    description:
      'A train ticket booking website for Bắc Trung Nam routes with route discovery, seat-class filtering, and a streamlined booking flow.',
    summary:
      'Railway ticket search and booking experience built for real route and seat inventory',
    body: `## Overview

VietRailway is a full-stack rail ticket booking product that combines a passenger-facing booking interface with a Spring-based microservices backend. The product is built around real route, coach, seat, and fare inventory so users can search trips, compare cabins, and continue to payment with less friction.

## Website Experience

- **Hero Search Flow**: fast lookup by route name, departure date, and target price directly from the homepage
- **Live Route Board**: featured departures, seat availability, and low-fare summaries for popular Bắc Trung Nam trips
- **Advanced Search Filters**: query by departure station, arrival station, coach code, seat class, seat type, departure date, and price ceiling
- **Booking-Ready Results**: route cards expose train number, duration, remaining seats, coach configurations, and fare ranges before users continue to booking
- **Full Journey Support**: the codebase also includes login, profile, booking, payment result, and admin pages for managing the end-to-end ticket flow

## Backend Architecture

- **Microservices Platform**: Spring Boot 4 and Spring Cloud split the system into api-gateway, user-service, ticket-service, search-service, order-service, and payment-service
- **Service Infrastructure**: Eureka discovery and Spring Cloud Config provide service registration and centralized configuration
- **Data Layer**: MySQL stores user, order, and payment domains, while MongoDB handles ticket and search data; Redis supports ticket-side caching and fast access patterns
- **Payment Flow**: VNPay integration is wired through the payment service with callback and result-page handling
- **Deployment Topology**: Docker Compose orchestrates the gateway, services, MySQL, MongoDB, and Redis for local integration runs

## Tech Stack

Frontend: React, TypeScript, React Router, TanStack Query, Zustand, TailwindCSS.

Backend: Java 21, Spring Boot 4, Spring Cloud, Spring WebFlux, Spring Data JPA, MySQL, MongoDB, Redis, Docker Compose, VNPay.

## Screenshots

![Homepage Hero](/img-work/railway_1.png)

![Route Board](/img-work/railway_2.png)

![Search Results](/img-work/railway_3.png)
`,
    link: '',
    platform: 'Web / Booking',
    stack:
      'React, TypeScript, Java 21, Spring Boot, Spring Cloud, MySQL, MongoDB, Redis, Docker, VNPay',
    'Current Status': 'Active Development',
    Role: 'Full-stack Developer',
    yearBadge: '2026-',
  },
  {
    slug: 'yibu-app',
    title: 'Yibu App',
    date: '2024-06-10T00:00:00.000Z',
    thumbnail: '/img-work/yibu_1.png',
    description:
      'A mobile-first application for daily task management and productivity tracking.',
    summary:
      'Mobile productivity and task management app',
    body: `## Overview

Yibu is a minimalist productivity app focused on helping users build better daily habits and manage tasks effectively.

## Features

- **Task Management**: Create, organize, and track daily tasks
- **Habit Tracking**: Build and maintain productive habits
- **Progress Dashboard**: Visual progress tracking and statistics
- **Notifications**: Smart reminders to keep you on track

## Tech Stack

Cross-platform mobile app built with modern web technologies.

![Screenshot 1](/img-work/yibu_1.png)

![Screenshot 2](/img-work/yibu_2.png)

![Screenshot 3](/img-work/yibu_3.png)
`,
    link: '',
    platform: 'Mobile / Web',
    stack: 'React Native, TypeScript',
    'Current Status': 'Completed',
    Role: 'Full-stack Developer',
    yearBadge: '2024-',
  },
];
