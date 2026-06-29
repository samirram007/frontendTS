# Dashboard Layout — Full Recreation Context

Use this document as a prompt to an LLM to recreate the exact dashboard layout in a new project. Copy the entire file as context.

---

## Stack

| Concern | Library |
|---|---|
| Framework | React 19 + TypeScript |
| Routing | TanStack Router (file-based) |
| UI | shadcn/ui (Radix UI + Tailwind v4) |
| Sidebar | shadcn `sidebar` component |
| Icons | `@tabler/icons-react` (primary) + `lucide-react` (fallback) |
| Toasts | `sonner` |

---

## Folder Structure to Create

```
src/
├── main.tsx                          # Provider bootstrap
├── AppRouter.tsx                     # RouterProvider + auth gate
├── router.tsx                        # createRouter()
├── styles.css                        # Tailwind base import
│
├── core/
│   └── contexts/
│       ├── MyRouterContext.tsx        # Router context type
│       ├── ThemeContextProvider.tsx   # Theme context + provider
│       └── search-context.tsx        # ⌘K search context + CommandMenu mount
│
├── features/
│   └── auth/
│       └── contexts/
│           └── AuthContext.tsx       # Auth state (user, login, logout)
│
├── layouts/
│   ├── AdminLayout.tsx               # Root authenticated shell
│   └── components/
│       ├── app-sidebar.tsx           # Sidebar shell (uses sidebarData)
│       ├── header.tsx                # <Header> primitive (SidebarTrigger + children)
│       ├── HeaderComponent.tsx       # Assembled header (TopNav + Search + Theme + Profile)
│       ├── top-nav.tsx               # Horizontal tab links + mobile dropdown
│       ├── nav-group.tsx             # Renders one navGroup from sidebarData
│       ├── nav-user.tsx              # Sidebar footer user menu with logout
│       ├── footer.tsx                # Simple footer
│       ├── command-menu.tsx          # ⌘K CommandDialog (reads sidebarData)
│       └── data/
│           ├── sidebar-data.ts       # Navigation config object
│           └── types.ts              # TypeScript types for nav config
│
└── components/
    ├── search.tsx                    # Search trigger button (opens ⌘K)
    ├── theme-switch.tsx              # Light/dark/system dropdown
    ├── profile-dropdown.tsx          # Avatar dropdown with logout
    └── skip-to-main.tsx              # Accessibility skip link
```

---

## 1. Types — `src/layouts/components/data/types.ts`

```ts
import type { LinkProps } from '@tanstack/react-router'

interface User {
  name: string
  email: string
  avatar: string
  visible: boolean
}

interface Team {
  name: string
  visible: boolean
  logo: React.ElementType
  plan: string
}

interface BaseNavItem {
  title: string
  badge?: string
  icon?: React.ElementType
  visible?: boolean
}

type NavLink = BaseNavItem & {
  url: LinkProps['to']
  items?: never
}

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps['to'] })[]
  url?: never
}

type NavItem = NavCollapsible | NavLink

interface NavGroup {
  title: string
  visible: boolean
  items: NavItem[]
}

interface Header {
  logo: React.ElementType
  title: string
  visible: boolean
  subtitle: string
}

interface SidebarData {
  user: User
  header: Header
  teams: Team[]
  navGroups: NavGroup[]
}

export type { NavCollapsible, NavGroup, NavItem, NavLink, SidebarData }
```

---

## 2. Sidebar Data — `src/layouts/components/data/sidebar-data.ts`

```ts
import { IconLayoutDashboard, IconSettings, IconUserCog } from '@tabler/icons-react'
import { GalleryVerticalEnd } from 'lucide-react'
import type { SidebarData } from '../types'

const APP_NAME = import.meta.env.VITE_APP_NAME || 'MyApp'
const APP_SUBTITLE = import.meta.env.VITE_APP_SUBTITLE || 'Admin Dashboard'

export const sidebarData: SidebarData = {
  user: {
    name: 'Admin User',
    visible: true,
    email: 'admin@example.com',
    avatar: '/avatars/user.jpg',
  },
  header: {
    logo: GalleryVerticalEnd,   // any React component (SVG icon)
    visible: true,
    title: APP_NAME,
    subtitle: APP_SUBTITLE,
  },
  teams: [],                    // unused unless TeamSwitcher is enabled
  navGroups: [
    {
      title: 'General',
      visible: true,
      items: [
        {
          title: 'Dashboard',
          visible: true,
          url: '/dashboard',
          icon: IconLayoutDashboard,
        },
      ],
    },
    {
      title: 'Administration',
      visible: true,
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          // collapsible — has items array instead of url
          items: [
            { title: 'Profile',  url: '/settings',             icon: IconUserCog },
            { title: 'Account',  url: '/settings/account',     icon: IconUserCog },
          ],
        },
      ],
    },
  ],
}
```

**Key rules:**
- A nav item with `url` is a **leaf link** (`NavLink`).
- A nav item with `items[]` is a **collapsible section** (`NavCollapsible`) — no `url`.
- Set `visible: false` on any group or leaf to hide it without deleting.
- `badge` adds a pill badge next to the title.

---

## 3. Router Context — `src/core/contexts/MyRouterContext.tsx`

```tsx
import type { AuthContextType } from '@/features/auth/contexts/AuthContext'
import { QueryClient } from '@tanstack/react-query'

export interface MyRouterContext {
  queryClient: QueryClient
  auth: AuthContextType
}
```

---

## 4. Auth Context — `src/features/auth/contexts/AuthContext.tsx`

```tsx
import React, { createContext, useContext, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { flushSync } from 'react-dom'

export type LoginProps = { email: string; password: string }

export interface AuthContextType {
  user: Record<string, any> | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (props: LoginProps) => Promise<void>
  logout: () => Promise<void>
  fetchProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Record<string, any> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  const fetchProfile = async () => {
    setIsLoading(true)
    try {
      // GET /auth/profile — replace with your API call
      const res = await fetch('/api/auth/profile', { credentials: 'include' })
      const data = await res.json()
      flushSync(() => setUser(data?.data ?? null))
    } catch {
      flushSync(() => setUser(null))
    } finally {
      setIsLoading(false)
    }
  }

  const login = React.useCallback(async ({ email, password }: LoginProps) => {
    setIsLoading(true)
    // POST /auth/login — replace with your API call
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (data?.status === 'success') {
      await fetchProfile()
    } else {
      flushSync(() => setUser(null))
    }
    setIsLoading(false)
  }, [])

  const logout = React.useCallback(async () => {
    setIsLoading(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
      flushSync(() => { queryClient.clear(); setUser(null) })
    } catch (e) {
      console.error('Logout failed:', e)
    } finally {
      setIsLoading(false)
    }
  }, [queryClient])

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
```

---

## 5. Search Context — `src/core/contexts/search-context.tsx`

```tsx
import { CommandMenu } from '@/layouts/components/command-menu'
import React from 'react'

interface SearchContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchContext = React.createContext<SearchContextType | null>(null)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <SearchContext.Provider value={{ open, setOpen }}>
      {children}
      <CommandMenu />   {/* CommandMenu reads sidebarData directly */}
    </SearchContext.Provider>
  )
}

export const useSearch = () => {
  const ctx = React.useContext(SearchContext)
  if (!ctx) throw new Error('useSearch must be used within SearchProvider')
  return ctx
}
```

---

## 6. Admin Layout — `src/layouts/AdminLayout.tsx`

```tsx
import SkipToMain from '@/components/skip-to-main'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { SearchProvider } from '@/core/contexts/search-context'
import { Outlet } from '@tanstack/react-router'
import { Suspense } from 'react'
import { AppSidebar } from './components/app-sidebar'
import Footer from './components/footer'
import HeaderComponent from './components/HeaderComponent'

const AdminLayout = () => (
  <SearchProvider>
    <SidebarProvider>
      <SkipToMain />
      <div className='flex'>
        <div className='max-w-screen relative flex h-screen w-full overflow-hidden'>
          <AppSidebar />

          <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
            <div className='min-h-dvh grid grid-rows-[auto_1fr_auto]'>
              <HeaderComponent />

              <main>
                <div className='mx-auto max-w-screen-2xl px-0 md:px-6 2xl:px-10'>
                  <Suspense fallback={<Toaster />}>
                    <Outlet />
                  </Suspense>
                </div>
              </main>

              <Footer />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  </SearchProvider>
)

export default AdminLayout
```

**Layout structure:**
```
SidebarProvider
└── flex row
    ├── AppSidebar            (collapsible, icon mode)
    └── flex-1 column
        └── grid-rows[auto / 1fr / auto]
            ├── HeaderComponent   (h-16 sticky-ish header)
            ├── <main>            (scrollable content)
            └── Footer
```

---

## 7. App Sidebar — `src/layouts/components/app-sidebar.tsx`

```tsx
import {
  Sidebar, SidebarContent, SidebarFooter,
  SidebarHeader, SidebarRail, useSidebar,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Link } from '@tanstack/react-router'
import { sidebarData } from './data/sidebar-data'
import { NavGroup } from './nav-group'
import { NavUser } from './nav-user'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const sidebar = useSidebar()

  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarHeader>
        <div className='flex flex-col items-center justify-between'>
          {/* Logo row: 40px icon col + title col */}
          <div className='grid grid-cols-[40px_1fr] w-full items-center'>
            <div className='flex items-center justify-center'>
              <sidebarData.header.logo className='h-5 w-5' />
            </div>
            <div className={sidebar.open ? 'flex flex-col' : 'hidden'}>
              <h1 className='text-lg font-semibold text-sidebar-foreground'>
                <Link to='/'>{sidebarData.header.title.toUpperCase()}</Link>
              </h1>
            </div>
          </div>

          {/* Subtitle / collapsed logo */}
          <div className={cn(
            'w-full pl-2 text-xs font-bold text-pink-400 flex mt-2',
            !sidebar.open && 'pl-0 justify-center'
          )}>
            {sidebar.open
              ? sidebarData.header.subtitle
              : <Link to='/'>{sidebarData.header.title.toUpperCase()}</Link>
            }
          </div>
        </div>
        <Separator className='mb-2 h-px bg-sidebar-border' />
      </SidebarHeader>

      <SidebarContent>
        {sidebarData.navGroups.map((group) =>
          group.visible && <NavGroup key={group.title} {...group} />
        )}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
```

**Sidebar behaviour:**
- `collapsible='icon'` — collapses to icon-only rail, never fully hidden on desktop.
- `variant='floating'` — sidebar has rounded floating card style.
- `SidebarRail` — drag handle to resize.

---

## 8. Nav Group — `src/layouts/components/nav-group.tsx`

Renders one section. Auto-switches between collapsible tree (expanded) and dropdown (collapsed icon mode).

```tsx
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup, SidebarGroupLabel, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem, SidebarMenuSub,
  SidebarMenuSubButton, SidebarMenuSubItem, useSidebar,
} from '@/components/ui/sidebar'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { ChevronRight } from 'lucide-react'
import { Link, useLocation } from '@tanstack/react-router'
import type { NavCollapsible, NavGroup, NavItem, NavLink } from './types'

// Active-check: exact match OR child match OR same first segment
function checkIsActive(href: string, item: NavItem, mainNav = false) {
  return (
    href === item.url ||
    href.split('?')[0] === item.url ||
    !!item?.items?.filter((i) => i.url === href).length ||
    (mainNav && href.split('/')[1] !== '' && href.split('/')[1] === item?.url?.split('/')[1])
  )
}

const NavBadge = ({ children }: { children: React.ReactNode }) => (
  <Badge className='rounded-full px-1 py-0 text-xs'>{children}</Badge>
)

export function NavGroup({ title, items }: NavGroup) {
  const { state } = useSidebar()
  const { pathname: href } = useLocation()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const key = `${item.title}-${item.url}`
          if (!item.items) return <SidebarMenuLink key={key} item={item as NavLink} href={href} />
          if (state === 'collapsed') return <SidebarMenuCollapsedDropdown key={key} item={item as NavCollapsible} href={href} />
          return <SidebarMenuCollapsible key={key} item={item as NavCollapsible} href={href} />
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

// Leaf link
const SidebarMenuLink = ({ item, href }: { item: NavLink; href: string }) => {
  const { setOpenMobile } = useSidebar()
  if (!item.visible) return null
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={checkIsActive(href, item)} tooltip={item.title}>
        <Link to={item.url} onClick={() => setOpenMobile(false)}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
          {item.badge && <NavBadge>{item.badge}</NavBadge>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

// Expanded collapsible (tree)
const SidebarMenuCollapsible = ({ item, href }: { item: NavCollapsible; href: string }) => {
  const { setOpenMobile } = useSidebar()
  return (
    <Collapsible asChild defaultOpen={checkIsActive(href, item, true)} className='group/collapsible'>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((sub) => (
              <SidebarMenuSubItem key={sub.title}>
                <SidebarMenuSubButton asChild isActive={checkIsActive(href, sub)}>
                  <Link to={sub.url} onClick={() => setOpenMobile(false)}>
                    {sub.icon && <sub.icon />}
                    <span>{sub.title}</span>
                    {sub.badge && <NavBadge>{sub.badge}</NavBadge>}
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

// Collapsed dropdown (icon-only mode)
const SidebarMenuCollapsedDropdown = ({ item, href }: { item: NavCollapsible; href: string }) => (
  <SidebarMenuItem>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton tooltip={item.title} isActive={checkIsActive(href, item)}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
          <ChevronRight className='ml-auto' />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='right' align='start' sideOffset={4}>
        <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {item.items.map((sub) => (
          <DropdownMenuItem key={`${sub.title}-${sub.url}`} asChild>
            <Link to={sub.url} className={checkIsActive(href, sub) ? 'bg-secondary' : ''}>
              {sub.icon && <sub.icon />}
              <span className='max-w-52 text-wrap'>{sub.title}</span>
              {sub.badge && <span className='ml-auto text-xs'>{sub.badge}</span>}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </SidebarMenuItem>
)
```

---

## 9. Nav User (Sidebar Footer) — `src/layouts/components/nav-user.tsx`

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { useAuth } from '@/features/auth/contexts/AuthContext'
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from 'lucide-react'

export function NavUser({ user }: { user: { name: string; email: string; avatar: string } }) {
  const { isMobile } = useSidebar()
  const { logout } = useAuth()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent'>
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className='rounded-lg'>
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{user.name}</span>
                <span className='truncate text-xs'>{user.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className='rounded-lg'>{user.name.slice(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{user.name}</span>
                  <span className='truncate text-xs'>{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem><Sparkles className='mr-2 h-4 w-4' /> Upgrade to Pro</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem><BadgeCheck className='mr-2 h-4 w-4' /> Account</DropdownMenuItem>
              <DropdownMenuItem><CreditCard className='mr-2 h-4 w-4' /> Billing</DropdownMenuItem>
              <DropdownMenuItem><Bell className='mr-2 h-4 w-4' /> Notifications</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className='mr-2 h-4 w-4' /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
```

---

## 10. Header Primitive — `src/layouts/components/header.tsx`

```tsx
import React from 'react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean
}

export const Header = ({ className, fixed, children, ...props }: HeaderProps) => {
  const [offset, setOffset] = React.useState(0)

  React.useEffect(() => {
    const onScroll = () =>
      setOffset(document.body.scrollTop || document.documentElement.scrollTop)
    document.addEventListener('scroll', onScroll, { passive: true })
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'flex h-16 items-center gap-3 bg-background p-4 sm:gap-4',
        fixed && 'header-fixed peer/header fixed z-50 w-[inherit] rounded-md',
        offset > 10 && fixed ? 'shadow' : 'shadow-none',
        className
      )}
      {...props}
    >
      {/* Hamburger to toggle sidebar */}
      <SidebarTrigger variant='outline' className='scale-125 sm:scale-100' />
      <Separator orientation='vertical' className='h-6' />
      {children}
    </header>
  )
}
```

---

## 11. Assembled Header — `src/layouts/components/HeaderComponent.tsx`

```tsx
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Header } from './header'
import { TopNav } from './top-nav'

// Define your top horizontal nav links here
const topNav = [
  { title: 'Overview', href: '/dashboard', isActive: true,  disabled: false },
  { title: 'Reports',  href: '/reports',   isActive: false, disabled: false },
]

export default function HeaderComponent() {
  return (
    <Header className='bg-blue-600/5 dark:bg-violet-400/10'>
      <TopNav links={topNav} />
      <div className='ml-auto flex items-center space-x-0 lg:space-x-4'>
        <Search />
        <ThemeSwitch />
        <ProfileDropdown />
      </div>
    </Header>
  )
}
```

---

## 12. Top Nav — `src/layouts/components/top-nav.tsx`

Horizontal links on desktop; collapses to dropdown on mobile.

```tsx
import { Button } from '@/components/ui/button'
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { IconMenu } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'

interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
  links: { title: string; href: string; isActive: boolean; disabled?: boolean }[]
}

export function TopNav({ className, links, ...props }: TopNavProps) {
  return (
    <>
      {/* Mobile: hamburger dropdown */}
      <div className='lg:hidden'>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size='icon' variant='outline'><IconMenu /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='bottom' align='start'>
            {links.map(({ title, href, isActive }) => (
              <DropdownMenuItem key={`${title}-${href}`} asChild>
                <Link to={href} className={!isActive ? 'text-muted-foreground' : ''}>{title}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop: inline links */}
      <nav className={cn('hidden items-center space-x-4 lg:flex lg:space-x-6', className)} {...props}>
        {links.map(({ title, href, isActive }) => (
          <Link
            key={`${title}-${href}`}
            to={href}
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? '' : 'text-muted-foreground'}`}
          >
            {title}
          </Link>
        ))}
      </nav>
    </>
  )
}
```

---

## 13. Search Button — `src/components/search.tsx`

Opens the ⌘K command palette.

```tsx
import { cn } from '@/lib/utils'
import { IconSearch } from '@tabler/icons-react'
import { useSearch } from '@/core/contexts/search-context'
import { Button } from './ui/button'

export function Search({ className = '' }: { className?: string }) {
  const { setOpen } = useSearch()
  return (
    <Button
      variant='outline'
      className={cn(
        'relative h-8 w-full flex-1 justify-start rounded-md bg-muted/25 text-sm font-normal text-muted-foreground shadow-none hover:bg-muted/50 sm:pr-12 md:w-40 md:flex-none lg:w-56 xl:w-64',
        className
      )}
      onClick={() => setOpen(true)}
    >
      <IconSearch className='absolute left-1.5 top-1/2 -translate-y-1/2' aria-hidden />
      <span className='ml-3'>Search</span>
      <kbd className='pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
        <span className='text-xs'>⌘</span>K
      </kbd>
    </Button>
  )
}
```

---

## 14. Command Menu — `src/layouts/components/command-menu.tsx`

⌘K dialog. Reads `sidebarData` to auto-populate navigation items + theme switcher.

```tsx
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput,
  CommandItem, CommandList, CommandSeparator,
} from '@/components/ui/command'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSearch } from '@/core/contexts/search-context'
import { useTheme } from '@/core/contexts/ThemeContextProvider'
import { IconArrowRightDashed, IconDeviceLaptop, IconMoon, IconSun } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'
import React from 'react'
import { sidebarData } from './data/sidebar-data'

export function CommandMenu() {
  const navigate = useNavigate()
  const { setTheme } = useTheme()
  const { open, setOpen } = useSearch()

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [setOpen])

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <ScrollArea type='hover' className='h-72 pr-1'>
          <CommandEmpty>No results found.</CommandEmpty>
          {sidebarData.navGroups.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((navItem, i) => {
                if (navItem.url)
                  return (
                    <CommandItem
                      key={`${navItem.url}-${i}`}
                      value={navItem.title}
                      onSelect={() => runCommand(() => navigate({ to: navItem.url }))}
                    >
                      <IconArrowRightDashed className='mr-2 size-3 text-muted-foreground/80' />
                      {navItem.title}
                    </CommandItem>
                  )
                return navItem.items?.map((sub, j) => (
                  <CommandItem
                    key={`${sub.url}-${j}`}
                    value={sub.title}
                    onSelect={() => runCommand(() => navigate({ to: sub.url }))}
                  >
                    <IconArrowRightDashed className='mr-2 size-3 text-muted-foreground/80' />
                    {sub.title}
                  </CommandItem>
                ))
              })}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading='Theme'>
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}><IconSun className='mr-2' /> Light</CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}><IconMoon className='mr-2' /> Dark</CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}><IconDeviceLaptop className='mr-2' /> System</CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )
}
```

---

## 15. Theme Switch — `src/components/theme-switch.tsx`

```tsx
import { cn } from '@/lib/utils'
import { IconCheck, IconMoon, IconSun } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/core/contexts/ThemeContextProvider'

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='scale-95 rounded-full'>
          <IconSun className='size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <IconMoon className='absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light <IconCheck size={14} className={cn('ml-auto', theme !== 'light' && 'hidden')} />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark <IconCheck size={14} className={cn('ml-auto', theme !== 'dark' && 'hidden')} />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System <IconCheck size={14} className={cn('ml-auto', theme !== 'system' && 'hidden')} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

---

## 16. Profile Dropdown — `src/components/profile-dropdown.tsx`

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuShortcut, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/features/auth/contexts/AuthContext'

export function ProfileDropdown() {
  const { logout, user } = useAuth()
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src='/avatars/user.jpg' />
            <AvatarFallback>{(user?.name ?? 'U').slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{user?.name ?? 'User'}</p>
            <p className='text-xs leading-none text-muted-foreground'>{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut></DropdownMenuItem>
          <DropdownMenuItem>Settings <DropdownMenuShortcut>⌘S</DropdownMenuShortcut></DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          Log out <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

---

## 17. Footer — `src/layouts/components/footer.tsx`

```tsx
export default function Footer() {
  return (
    <footer className='p-2 min-h-20 mt-10 rounded-sm flex gap-2 bg-blue-600/10 justify-between items-center'>
      <span className='text-sm text-muted-foreground'>© 2025 MyApp</span>
    </footer>
  )
}
```

---

## 18. Skip to Main — `src/components/skip-to-main.tsx`

```tsx
export default function SkipToMain() {
  return (
    <a
      href='#main-content'
      className='sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow'
    >
      Skip to main content
    </a>
  )
}
```

---

## 19. Root Provider Bootstrap — `src/main.tsx`

```tsx
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './AppRouter'
import { Toaster } from './components/ui/sonner'
import { ThemeContextProvider } from './core/contexts/ThemeContextProvider'
import { AuthProvider } from './features/auth/contexts/AuthContext'
import * as TanstackQuery from './integrations/tanstack-query/root-provider'
import './styles.css'

const rootElement = document.getElementById('app')!
ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <TanstackQuery.Provider>
      <ThemeContextProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <AuthProvider>
          <Toaster position='top-center' richColors />
          <AppRouter />
        </AuthProvider>
      </ThemeContextProvider>
    </TanstackQuery.Provider>
  </StrictMode>
)
```

**Provider order matters:**
1. `TanstackQuery.Provider` — must wrap everything (AuthContext uses `useQueryClient`)
2. `ThemeContextProvider` — theme state
3. `AuthProvider` — user state
4. `AppRouter` — router reads auth + queryClient via context

---

## 20. App Router — `src/AppRouter.tsx`

```tsx
import { RouterProvider } from '@tanstack/react-router'
import { useAuth } from './features/auth/contexts/AuthContext'
import * as TanstackQuery from './integrations/tanstack-query/root-provider'
import { createAppRouter } from './router'

const router = createAppRouter()

declare module '@tanstack/react-router' {
  interface Register { router: typeof router }
}

export function AppRouter() {
  const auth = useAuth()
  const { queryClient } = TanstackQuery.getContext()

  // Show spinner while auth loads (if profile fetch is enabled on mount)
  if (auth.isLoading) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <div className='size-10 rounded-full border-4 border-gray-200 border-t-foreground animate-spin' />
      </div>
    )
  }

  return <RouterProvider router={router} context={{ auth, queryClient }} />
}
```

---

## 21. Auth-Guard Route — `src/routes/_authenticated.tsx`

```tsx
import AdminLayout from '@/layouts/AdminLayout'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    if (!context.auth?.isAuthenticated) {
      throw redirect({ to: '/' })   // '/' is the login page
    }
  },
  component: AdminLayout,
  notFoundComponent: () => <div>Page not found</div>,
})
```

---

## 22. Required shadcn Components

Install with `pnpx shadcn@latest add <name>`:

```
sidebar
avatar
badge
button
collapsible
command
dropdown-menu
scroll-area
separator
sonner
```

---

## 23. Required npm Packages

```
@tabler/icons-react
@tanstack/react-router
@tanstack/react-query
lucide-react
sonner
tailwindcss   (v4)
```

---

## How It All Connects (Data Flow)

```
main.tsx
  └─ TanstackQuery.Provider
      └─ ThemeContextProvider
          └─ AuthProvider  (user state: null until login)
              └─ AppRouter
                  └─ RouterProvider  (context = { auth, queryClient })
                      └─ __root.tsx  (NavigationProgress + Outlet)
                          ├─ /           → sign-in page  (beforeLoad: redirect if logged in)
                          └─ /_authenticated  (beforeLoad: redirect to / if NOT logged in)
                              └─ AdminLayout
                                  └─ SearchProvider  (⌘K context + CommandMenu)
                                      └─ SidebarProvider  (sidebar open/close state)
                                          ├─ AppSidebar
                                          │   ├─ sidebarData.navGroups → NavGroup[]
                                          │   └─ NavUser (footer, logout button)
                                          └─ Content area
                                              ├─ HeaderComponent
                                              │   ├─ TopNav (horizontal links)
                                              │   ├─ Search (opens ⌘K)
                                              │   ├─ ThemeSwitch
                                              │   └─ ProfileDropdown
                                              ├─ <Outlet />  ← route pages render here
                                              └─ Footer
```

---

## Customisation Checklist for a New Project

- [ ] Replace `sidebarData` in `sidebar-data.ts` with your app's nav groups and routes
- [ ] Replace `topNav` array in `HeaderComponent.tsx` with your top-level tabs
- [ ] Update `APP_NAME` / `APP_SUBTITLE` env vars or hardcode in `sidebar-data.ts`
- [ ] Swap `header.logo` to your brand icon (any React component)
- [ ] Wire `login`, `logout`, `fetchProfile` in `AuthContext` to your real API endpoints
- [ ] Update `user.name` / `user.email` / `user.avatar` in `sidebar-data.ts` (or drive from `useAuth().user`)
- [ ] Set the redirect target in `_authenticated.tsx` and `index.tsx` to match your route names
