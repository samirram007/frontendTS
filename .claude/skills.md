## Skills

### Add a New Protected Route

1. Create the file at `src/routes/_authenticated/<section>/<name>/index.tsx`.
2. TanStack Router auto-generates the route tree — no manual registration needed.
3. Boilerplate:

```tsx
import { createFileRoute } from '@tanstack/react-query'
import { useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import MyModule from '@/features/modules/my_entity'
import { fetchMyEntityService } from '@/features/modules/my_entity/data/api'

const myEntityQueryOptions = queryOptions({
  queryKey: ['myEntities'],
  queryFn: fetchMyEntityService,
  staleTime: 1000 * 60 * 5,
  retry: 1,
})

export const Route = createFileRoute('/_authenticated/<section>/<name>/')({
  loader: ({ context }) => context.queryClient.ensureQueryData(myEntityQueryOptions),
  component: () => {
    const { data } = useSuspenseQuery(myEntityQueryOptions)
    return <MyModule data={data?.data} />
  },
  errorComponent: () => <div>Error loading data.</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})
```

### Add a New Feature Module

1. Create `src/features/modules/<entity>/` with the structure from the **Module Structure** rule.
2. Define the Zod schema in `data/schema.ts`.
3. Add service functions in `data/api.ts` using `getData` / `postData` / `putData` / `deleteData`.
4. Export `queryOptions` from `data/queryOptions.ts`.
5. Build the page component in `index.tsx` — accept data as props.
6. Wire up a route file (see above).

### Add a New Master Domain (layout shell)

1. Create `src/features/masters/<domain>/index.tsx` — renders `<Main>` + `<SidebarInner items={...}>` + `<Outlet />`.
2. Add `src/routes/_authenticated/masters/<domain>/_layout.tsx` — wraps the shell in a domain-level context provider if needed.
3. Add child route files under `_layout/` for each sub-entity.

### Add a shadcn Component

```bash
pnpx shadcn@latest add <component-name>
```

The component lands in `src/components/ui/`. Import it from `@/components/ui/<name>`.

### Call an API

Use the helpers from `src/utils/dataClient.tsx`:

```ts
import { getData, postData, putData, deleteData } from '@/utils/dataClient'

// GET
const result = await getData('/endpoint')

// POST / PUT — empty strings are stripped automatically before sending
const result = await postData('/endpoint', payload)
const result = await putData(`/endpoint/${id}`, payload)

// DELETE
const result = await deleteData(`/endpoint/${id}`)
```

Success and error toasts are fired automatically by `dataClient`. Do not add duplicate toasts in service functions.
