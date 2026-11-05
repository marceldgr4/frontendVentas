# 🚀 FRONTEND MASTER PLAN: CompraVenta System

This document serves as the **Single Source of Truth** for the development of the CompraVenta Frontend. Use this file to synchronize context when working with AI assistants or new developers.

## 📌 1. Project Overview
- **Project Name:** FrontCompraVenta
- **Root Directory:** `/Users/marceldiazgranadosrobayo/WebstormProjects/FrontCompraVenta`
- **Purpose:** Modern web interface for a Pawn Shop and Purchase management system, connecting to the professionalized Spring Boot Backend.
- **Architecture:** Next.js App Router (Client & Server Components).

---

## 🛠️ 2. Tech Stack (The "Golden Stack")
| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | **Next.js 14/15 (App Router)** | Core framework and routing |
| **Language** | **TypeScript** | Type safety and API contract enforcement |
| **Styling** | **Tailwind CSS** | Utility-first responsive design |
| **UI Components** | **shadcn/ui** | High-quality, accessible component primitives |
| **State/Data** | **TanStack Query (React Query)** | Server state management, caching, and sync |
| **HTTP Client** | **Axios** | API requests with interceptors for JWT |
| **Auth** | **JWT (Bearer Token)** | Secure session management |
| **Icons** | **Lucide React** | Consistent and modern iconography |

---

## 📂 3. Professional Folder Structure
```text
src/
├── app/                      # Next.js App Router (Pages & Layouts)
│   ├── (auth)/               # Route Group: Login, Register, Forgot Password
│   ├── (dashboard)/           # Route Group: Protected layout for the app
│   │   ├── articles/         # Article management pages
│   │   ├── pawns/            # Pawn management pages
│   │   ├── sales/            # Sales flow pages
│   │   ├── purchases/        # Purchase flow pages
│   │   ├── employees/         # Staff management
│   │   └── page.tsx          # Main Dashboard view
│   ├── api/                  # Route handlers (if needed for proxying)
│   └── layout.tsx            # Global layout (Providers, Theme, etc.)
├── components/               # Atomic Design
│   ├── ui/                   # shadcn/ui base components (Button, Input, etc.)
│   ├── shared/               # Reusable components (Navbar, Sidebar, Footer)
│   └── modules/             # Feature-specific components (e.g., ArticleTable)
├── hooks/                    # Custom React hooks (e.g., useAuth, useArticles)
├── lib/                      # Core utilities and configurations
│   ├── api-client.ts          # Axios instance with interceptors
│   ├── utils.ts              # Tailwind merge and helper functions
│   └── validators.ts         # Zod or Yup schemas for forms
├── services/                 # API service layer (encapsulates axios calls)
│   ├── auth.service.ts
│   ├── article.service.ts
│   └── dashboard.service.ts
├── store/                    # Global state (Zustand or Context API)
│   └── use-auth-store.ts      # Session and user profile state
└── types/                    # TypeScript interfaces matching Backend DTOs
    ├── api.ts                # Common API response types
    └── modules/              # Module-specific types (Article, Pawn, etc.)
```

---

## 🔑 4. Environment Variables (`.env.local`)
Create a `.env.local` file in the root with the following:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_APP_NAME="CompraVenta System"
# Other keys as needed for analytics or third-party services
```

---

## 🛣️ 5. Route Map & API Integration
| Page | Route | Backend Endpoint | Primary Action |
| :--- | :--- | :--- | :--- |
| **Login** | `/login` | `POST /auth/login` | Authenticate & Store JWT |
| **Dashboard** | `/` | `GET /dashboard/summary` | Load KPIs and Alerts |
| **Articles** | `/articles` | `GET /articles` | List/Search Inventory |
| **Pawns** | `/pawns` | `GET /pawns` | Manage Pawn lifecycle |
| **Sales** | `/sales` | `POST /sales` | Create New Sale |
| **Purchases**| `/purchases` | `POST /purchases` | Register Purchase |
| **Staff** | `/employees`| `GET /employees` | Manage Employees (Admin only) |

---

## 🔄 6. Authentication Flow (JWT)
1. **Login:** User sends credentials $\rightarrow$ Backend returns `AccessToken` and `RefreshToken`.
2. **Storage:** Store `AccessToken` in memory/state and `RefreshToken` in a secure HttpOnly cookie (via backend) or encrypted storage.
3. **Interception:** `api-client.ts` adds `Authorization: Bearer <token>` to every request.
4. **Expiry:** If API returns `401`, the interceptor calls `/auth/refresh` to get a new token. If that fails, redirect to `/login`.

---

## 🎨 7. UI/UX Guidelines
- **Color Palette:** Professional "Enterprise" look.
  - Primary: Deep Blue/Indigo (Trust and Stability).
  - Secondary: Slate/Gray (Cleanliness).
  - Accents: Emerald (Success), Rose (Critical/Expired), Amber (Warning/Low Stock).
- **Components:** Use a consistent Grid system. Dashboards should use "KpiCards" for metrics and "DataTables" for lists.
- **Responsiveness:** Mobile-first approach using Tailwind `sm:`, `md:`, `lg:`.

---

## 🚀 8. Implementation Roadmap
1. **Phase 1: Foundation** $\rightarrow$ Install Next.js, Tailwind, shadcn/ui, and configure `api-client.ts`.
2. **Phase 2: Auth** $\rightarrow$ Implement Login page and JWT session management.
3. **Phase 3: Dashboard** $\rightarrow$ Build the main view using `KpiMetricDto` and `InventoryAlertDto`.
4. **Phase 4: Business Modules** $\rightarrow$ Develop Articles, Pawns, Sales, and Purchases sequentially.
5. **Phase 5: Polishing** $\rightarrow$ Final UI/UX review, error handling, and performance optimization.
