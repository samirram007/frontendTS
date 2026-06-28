## Rules

### Path Alias

Always use `@/` for imports from `src/`. Never use relative `../../` across feature boundaries.

### Data Flow — every route must follow this chain

```
Route loader  →  queryOptions factory  →  service API  →  dataClient
     ↓
useSuspenseQuery → Module page component (receives typed data as props)
```

1. **Route** (`src/routes/…/index.tsx`) — `loader` calls `context.queryClient.ensureQueryData(...)`, component calls `useSuspenseQuery` with the same options.
2. **Query options** (`src/features/modules/<entity>/data/queryOptions.ts`) — export a `queryOptions()` factory; set `staleTime: 1000 * 60 * 5` and `retry: 1`.
3. **Service** (`src/features/modules/<entity>/data/api.ts` or `src/features/masters/<domain>/services/apis.tsx`) — thin wrapper over `getData` / `postData` / `putData` / `deleteData` from `src/utils/dataClient.tsx`. No business logic here. **Important:** `postData` and `putData` swallow errors internally (they do not rethrow); `getData` and `deleteData` do throw. Do not rely on a rejected promise from mutation helpers.
4. **Module page** (`src/features/modules/<entity>/index.tsx`) — receives data as typed props, never fetches directly.

### Schema Rules

- Define Zod schemas in `data/schema.ts` for both the entity shape and the form.
- Export inferred types (`z.infer<typeof ...>`) alongside schemas.
- Use `z.lazy()` for self-referential schemas (e.g. tree/parent structures).

### Form Rules

- Use React Hook Form with `@hookform/resolvers/zod` for all forms.
- Keep form schema separate from the entity schema (add `isEdit: z.boolean()` to form schema when needed).

### Module Structure (new entity checklist)

```
src/features/modules/<entity>/
  index.tsx              ← page component, props-only
  components/
    <entity>-columns.tsx
    <entity>-table.tsx
    <entity>-dialogs.tsx
    <entity>-action-dialog.tsx
    <entity>-primary-buttons.tsx
  data/
    schema.ts
    queryOptions.ts
    api.ts
  contexts/              ← only if the module needs shared local state
```

### UI Components

- Add shadcn components with `pnpx shadcn@latest add <component>`. Never hand-write Radix primitives directly.
- Icon library is `@tabler/icons-react`. Use `lucide-react` only when a Tabler equivalent doesn't exist.

### Error / Loading in Routes

Always provide both `errorComponent` and `pendingComponent` on route definitions that have a loader.
