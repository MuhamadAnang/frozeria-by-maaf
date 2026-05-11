# Frozeria Inventory Dashboard

Frozeria is a Next.js dashboard application for managing frozen food inventory,
cold storage monitoring, and stock alerts. Aimed at admin users, the project
helps track items, categories, low-stock alerts, and product expiration data.

## Tech Stack

- **Next.js 16** with App Router
- **React 19**
- **TypeScript**
- **TailwindCSS 4**
- **shadcn/ui**
- **Clerk** for authentication
- **Drizzle ORM** with PostgreSQL
- **TanStack Query** for client-side data fetching
- **Zod** for schema validation
- **Jest** for testing

## Features

- Dashboard with stock statistics, low-stock alerts, and category summaries
- Frozen food item management with create, update, detail, and delete flows
- Category management with listing, filtering, and ownership tracking
- Image upload support for item photos
- Clerk-based admin authentication and protected routes
- Realtime inventory and cold storage monitoring experience
- Pagination, search, sorting, and filters for item/category listings

## Prerequisites

- **Node.js 22** or later
- **pnpm**
- **PostgreSQL** database
- **Clerk account** for authentication keys

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Create a `.env.local` file in the project root with required environment
   variables:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
NODE_ENV=development
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_JWT_KEY=your_clerk_jwt_key
NEXT_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_NODE_TZ=Asia/Jakarta
TZ=Asia/Jakarta
```

3. Run the development server:

```bash
pnpm dev
```

4. Open `http://localhost:3000` in your browser.

## Project Structure

```
.
├── app                      # Next.js App Router pages and layouts
│   ├── (authenticated)      # Protected admin routes
│   ├── (public)             # Public pages and landing UI
│   ├── api                  # API route handlers
│   ├── _components          # Shared page components
│   └── _hooks               # Custom React hooks
├── common                   # Shared config, constants, and permissions
├── drizzle                  # Database schema and migration config
├── lib                      # Helpers for requests, validation, pagination
├── middleware               # Request and auth middleware
├── public                   # Static assets, fonts, and images
├── server                   # Controllers, services, and repositories
├── tests                    # Unit and integration tests
└── types                    # Global TypeScript type definitions
```

## Environment Variables

Required variables are validated in `common/config/environtment.ts`:

- `DATABASE_URL`
- `NODE_ENV`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `CLERK_JWT_KEY`
- `NEXT_BASE_URL`
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_NODE_TZ`
- `TZ`

## Database

- Uses **Drizzle ORM** with PostgreSQL
- Schema definitions live in `drizzle/schema.ts`
- Migrations are stored under `drizzle/migrations`

## Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Run production build
- `pnpm lint`: Run ESLint
- `pnpm test`: Run Jest tests
- `pnpm format`: Format code with Prettier
- `pnpm drizzle:generate`: Generate Drizzle types and schema output
- `pnpm drizzle:migrate`: Run database migrations
- `pnpm drizzle:push`: Push schema to database
- `pnpm drizzle:studio`: Open Drizzle Studio

## Useful Pages

- `/`: Landing page for Frozeria admin portal
- `/sign-in`: Clerk sign-in page
- `/dashboard`: Admin dashboard overview
- `/items`: Frozen food item listing and management
- `/categories`: Category management
- `/help`: In-app help and usage guides

## Notes

- Authentication is powered by Clerk and configured in `app/layout.tsx`
- API routes use centralized controllers and services under `server/`
- Item and category input validation are defined using Zod schemas

## Resources

- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Clerk](https://clerk.com/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zod](https://zod.dev)
