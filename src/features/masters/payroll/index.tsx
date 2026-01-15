import { Separator } from '@/components/ui/separator'
import { IconUser, IconUserCog } from '@tabler/icons-react'
import { Outlet } from '@tanstack/react-router'

import SidebarInner from '@/features/global/components/sidebar-inner'
import { Main } from '@/layouts/components/main'
import { usePayroll } from './context/payroll-context'

export default function Payroll() {
  const { sideBarOpen } = usePayroll()
  return (
    <>
      <Main fixed>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Payroll
          </h1>
          <p className="text-muted-foreground">
            Manage your employee, department, designation etc.
          </p>
        </div>
        <Separator className="my-4 lg:my-6" />
        <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
          {sideBarOpen && <SidebarInner items={sidebarNavItems} />}
          <div className="flex w-full overflow-y-hidden p-1">
            <Outlet />
          </div>
        </div>
      </Main>
    </>
  )
}
// Employee Master

// Department
// Designation
// Grade

// Bank_Master

// Salary

// Leave Types
//  Holiday List
//  Shifts
const sidebarNavItems = [
  {
    title: 'Employee',
    visible: true,
    icon: <IconUser size={18} />,
    href: '/masters/payroll/employee',
  },

  {
    title: 'Employee Group',
    visible: true,
    icon: <IconUser size={18} />,
    href: '/masters/payroll/employee_group',
  },
  {
    title: 'Department',
    visible: true,
    icon: <IconUser size={18} />,
    href: '/masters/payroll/department',
  },
  {
    title: 'Designation',
    visible: true,
    icon: <IconUser size={18} />,
    href: '/masters/payroll/designation',
  },
  {
    title: 'Grade',
    visible: true,
    icon: <IconUser size={18} />,
    href: '/masters/payroll/grade',
  },

  {
    title: 'Shift',
    visible: true,
    icon: <IconUserCog />,
    href: '/masters/payroll/shift',
  },
  {
    title: 'Bank Master',
    visible: false,
    icon: <IconUserCog />,
    href: '/masters/payroll/bank_master',
  },
  {
    title: 'Salary',
    visible: false,
    icon: <IconUserCog />,
    href: '/masters/payroll/salary',
  },
  {
    title: 'Leave Types',
    visible: false,
    icon: <IconUserCog />,
    href: '/masters/payroll/leave_type',
  },
  {
    title: 'Holiday List',
    visible: false,
    icon: <IconUserCog />,
    href: '/masters/payroll/holiday_list',
  },
]
