## Architecture

**AIPT** (Accounts | Inventory | Payroll | Tax) — React 19 SPA backed by a Laravel API.

### Core Stack

| Concern | Library |
|---|---|
| Routing | TanStack Router (file-based, auto code-splitting) |
| Data fetching | TanStack Query + route loaders |
| UI primitives | shadcn/ui (Radix UI + Tailwind v4) |
| Forms | React Hook Form + Zod |
| HTTP | Axios (`src/utils/axios-client.ts`) |
| Toasts | Sonner |

### Bootstrapping (`src/main.tsx`)

Providers wrap in this order:
1. `TanstackQuery.Provider`
2. `ThemeContextProvider`
3. `FontProvider`
4. `AuthProvider`

`AppRouter.tsx` creates the router and injects `{ auth, queryClient }` as router context (typed in `src/core/contexts/MyRouterContext.tsx`).

### Route Tree

```
src/routes/
├── __root.tsx            # NavigationProgress + Outlet
├── _authenticated.tsx    # Auth guard → AdminLayout (sidebar + header + footer)
├── _authenticated/
│   ├── masters/          # accounts, party, inventory, org, payroll, statutory, administration
│   ├── transactions/     # booking, vouchers, day_book
│   └── reports/          # business-report, profit_loss, balance_sheet, stock_summary
├── (auth)/               # sign-in, sign-up, otp, forgot-password
└── (errors)/             # error pages
```

### Masters vs Modules

`src/features/masters/<domain>/` — layout shells only (sidebar nav, context provider, `<Outlet />`). No business logic.

`src/features/modules/<entity>/` — actual feature logic: page component, table, dialogs, schema, query options.

### Auth

`AuthContext` fetches `/auth/profile` on mount. `isAuthenticated = !!user`. The axios client auto-refreshes via `/auth/refresh` on 401 and retries the original request; redirects to `/sign-in` if refresh fails.

### Shared Global Components (`src/features/global/`)

- **`components/data-table/`** — reusable TanStack Table primitives (toolbar, pagination, column header, faceted filter, row actions, view options). Import from here instead of rewriting per module.
- **`components/sidebar-inner/`** — `<SidebarInner items={...}>` used by every master layout shell.
- **`contexts/patient-global-context.tsx`** — cross-module patient context shared between booking and patho flows.

### Core Hooks (`src/core/hooks/`)

- **`useDialogState<T>()`** — manages open/close state for dialogs. Returns `[open, setOpen]`; toggling the same value closes. Use for action-type dialogs: `useDialogState<"add" | "edit" | "delete">()`.
- **`useEnum(enumName)`** from `src/features/enums/api.ts` — fetches a string array from `/enums/<enumName>` via React Query. Use for populating dropdowns from backend enum values.

### Complex Modules — Nested Feature Pattern

Modules with multiple distinct views (e.g., `booking`) use a `features/` sub-directory instead of the flat module structure:

```
src/features/modules/booking/
  features/
    NewBooking/          ← each sub-feature has its own data/, context/, components/
    BookingList/
    BookingDetails/
    Cancellations/
    Refunds/
  pages/                 ← thin page wrappers that mount the sub-features
```

Apply this pattern when a module has multiple independent views that each own their own data fetching.
