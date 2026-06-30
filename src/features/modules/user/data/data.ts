import {
  IconCash,
  IconShield,
  IconUsersGroup,
  IconUserShield,
} from '@tabler/icons-react'

export const callTypes = new Map<string, string>([
  ['active', 'bg-teal-100/30 text-teal-900 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
  ['invited', 'bg-sky-200/40 text-sky-900 border-sky-300'],
  [
    'suspended',
    'bg-destructive/10 text-destructive border-destructive/10',
  ],
])

export const userTypes = [
  {
    label: 'Superadmin',
    value: 'superadmin',
    icon: IconShield,
  },
  {
    label: 'Admin',
    value: 'admin',
    icon: IconUserShield,
  },
  {
    label: 'Manager',
    value: 'manager',
    icon: IconUsersGroup,
  },
  {
    label: 'Cashier',
    value: 'cashier',
    icon: IconCash,
  },
] as const
