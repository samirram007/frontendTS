import {
  IconAccessPoint,
  IconBarrierBlock,
  IconBook,
  IconBrowserCheck,
  IconBug,
  IconChecklist,
  IconClipboardList,
  IconError404,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconMessages,
  IconNotification,
  IconPackages,
  IconPalette,
  IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUserOff,
  IconUsers,
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { type SidebarData } from '../types'

const APP_NAME = import.meta.env.VITE_APP_NAME || 'Shadcn Admin'
const APP_SUBTITLE = import.meta.env.VITE_APP_SUBTITLE || 'Admin Dashboard'
export const sidebarData: SidebarData = {
  user: {
    name: 'samir',
    visible: true,
    email: 'samir.dev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  header: {
    logo: GalleryVerticalEnd,
    visible: true,
    title: APP_NAME,
    subtitle: APP_SUBTITLE,
  },
  teams: [
    {
      name: 'ShadcnAdminBike',
      visible: true,
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      visible: true,
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      visible: true,
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],

  navGroups: [

    {
      title: 'General',
      visible: true,
      items: [
        {
          title: 'Dashboard',
          visible: true,
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Tasks',
          visible: false,
          url: '/tasks',
          icon: IconChecklist,
        },
        {
          title: 'Apps',
          visible: false,
          url: '/apps',
          icon: IconPackages,
        },
        {
          title: 'Chats',
          visible: false,
          url: '/chats',
          badge: '3',
          icon: IconMessages,
        },
        {
          title: 'Users',
          visible: false,
          url: '/users',
          icon: IconUsers,
        },
      ],
    },
    {
      title: 'Pages',
      visible: false,
      items: [
        {
          title: 'Auth',
          icon: IconLockAccess,
          items: [
            {
              title: 'Sign In',
              url: '/sign-in',
            },
            {
              title: 'Sign In (2 Col)',
              url: '/sign-in-2',
            },
            {
              title: 'Sign Up',
              url: '/sign-up',
            },
            {
              title: 'Forgot Password',
              url: '/forgot-password',
            },
            {
              title: 'OTP',
              url: '/otp',
            },
          ],
        },
        {
          title: 'Errors',
          icon: IconBug,
          items: [
            {
              title: 'Unauthorized',
              url: '/401',
              icon: IconLock,
            },
            {
              title: 'Forbidden',
              url: '/403',
              icon: IconUserOff,
            },
            {
              title: 'Not Found',
              url: '/404',
              icon: IconError404,
            },
            {
              title: 'Internal Server Error',
              url: '/500',
              icon: IconServerOff,
            },
            {
              title: 'Maintenance Error',
              url: '/503',
              icon: IconBarrierBlock,
            },
          ],
        },
      ],
    },
    {
      title: 'Transactions',
      visible: true,
      items: [
        {
          title: 'Accounts',
          icon: IconAccessPoint,
          items: [
            {
              title: 'Vouchers',
              url: '/transactions/vouchers',
              icon: IconClipboardList,
            },
            {
              title: 'Day Book',
              url: '/transactions/day_book',
              icon: IconBook,
            },
          ],
        },

      ],

    },
    {
      title: 'Masters',
      visible: true,
      items: [
        {
          title: 'Accounts',
          icon: IconAccessPoint,
          items: [
            {
              title: 'Account Nature',
              url: '/masters/accounts/account_nature',
              icon: IconUserCog,
            },
            {
              title: 'Account Group',
              url: '/masters/accounts/account_group',
              icon: IconUserCog,
            },
            {
              title: 'Account Ledger',
              url: '/masters/accounts/account_ledger',
              icon: IconUserCog,
            },
            {
              title: 'Voucher Type',
              url: '/masters/accounts/voucher_type',
              icon: IconUserCog,
            },
          ]
        },
        {
          title: 'Inventory',
          icon: IconAccessPoint,
          items: [
            {
              title: 'Stock Item',
              url: '/masters/inventory/stock_item',
              icon: IconUserCog,
            },
            {
              title: 'Stock Group',
              url: '/masters/inventory/stock_group',
              icon: IconUserCog,
            },
            {
              title: 'Stock Category',
              url: '/masters/inventory/stock_category',
              icon: IconUserCog,
            },
            {
              title: 'Stock Unit',
              url: '/masters/inventory/stock_unit',
              icon: IconUserCog,
            },
            {
              title: 'Godown',
              url: '/masters/inventory/godown',
              icon: IconUserCog,
            },
          ]
        },
      ],
    },
    {
      title: 'Reports',
      visible: true,
      items: [
        {
          title: 'Balance Sheet',
          url: '/reports/balance_sheet',
          visible: true,
          icon: IconAccessPoint,
        },
        {
          title: 'Profit & Loss',
          url: '/reports/profit_loss',
          visible: true,
          icon: IconAccessPoint,
        },
        {
          title: 'Stock Summary',
          url: '/reports/stock_summary',
          visible: true,
          icon: IconAccessPoint,
        },
      ]
    },
    {
      title: 'Other',
      visible: true,
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: IconUserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: IconTool,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: IconPalette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: IconNotification,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: IconBrowserCheck,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
}
