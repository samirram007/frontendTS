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
  IconUserOff
} from '@tabler/icons-react'
import { AudioWaveform, Building2, Command, FileMinusCornerIcon, GalleryVerticalEnd, HandCoinsIcon, LandmarkIcon, NotebookTabsIcon, Users, WarehouseIcon } from 'lucide-react'
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
              title: 'Not Found..',
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
          icon: IconBook,
          items: [
            {
              title: 'Vouchers',
              url: '/transactions/vouchers',
              icon: IconClipboardList,
            },
            {
              title: 'Day Book',
              url: '/reports/day_book',
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
          title: 'Organization',
          visible: true,
          icon: Building2,
          items: [
            {
              title: 'Company',
              url: '/masters/organization/company',
              visible: true,
              icon: IconUserCog,
            },
            {
              title: 'Branch',
              url: '/masters/organization/branch',
              visible: false,
              icon: IconUserCog,
            },
            {
              title: 'Fiscal Year',
              url: '/masters/organization/fiscal_year',
              visible: false,
              icon: IconUserCog,
            },
            {
              title: 'Currency',
              url: '/masters/organization/currency',
              visible: true,
              icon: IconUserCog,
            },
            {
              title: 'Country',
              url: '/masters/organization/country',
              visible: true,
              icon: IconUserCog,
            },
            {
              title: 'State',
              url: '/masters/organization/state',
              visible: true,
              icon: IconUserCog,
            },

          ]
        },
        {
          title: 'Accounts',
          icon: NotebookTabsIcon,
          items: [

            {
              title: 'Chart of Accounts',
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
          title: 'Party',
          icon: Users,
          items: [
            {
              title: 'Distributor',
              url: '/masters/party/distributor',
              icon: IconUserCog,
            },
            {
              title: 'Supplier',
              url: '/masters/party/supplier',
              icon: IconUserCog,
            },
            {
              title: 'Transporter',
              url: '/masters/party/transporter',
              icon: IconUserCog,
            },

          ]
        },
        {
          title: 'Inventory',
          icon: WarehouseIcon,
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
        {
          title: 'Payroll',
          icon: HandCoinsIcon,
          items: [
            {
              title: 'Employee',
              url: '/masters/payroll/employee',
              icon: IconUserCog,
            },
            {
              title: 'Department',
              url: '/masters/payroll/department',
              icon: IconUserCog,
            },
            {
              title: 'Designation',
              url: '/masters/payroll/designation',
              icon: IconUserCog,
            },

          ]
        },
        {
          title: 'Statutory',
          icon: LandmarkIcon,
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
        {
          title: 'Miscellaneous',
          visible: true,
          icon: FileMinusCornerIcon,
          items: [
            {
              title: 'Delivery Places',
              url: '/masters/miscellaneous/delivery_places',
              icon: IconUserCog,
            },
            {
              title: 'Delivery Routes',
              url: '/masters/miscellaneous/delivery_routes',
              icon: IconUserCog,
            },

          ]
        },
      ],
    },
    {
      title: 'Administration',
      visible: false,
      items: [
        {
          title: 'User',
          url: '/administration/user',
          visible: true,
          icon: IconUserCog,
        },
        {
          title: 'App Module  ',
          url: '/administration/app_module',
          visible: true,
          icon: IconUserCog,
        },
      ],
    },

    {
      title: 'Reports',
      visible: false,
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
      visible: false,
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
