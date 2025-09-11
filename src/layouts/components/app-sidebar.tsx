import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';

import { cn } from '@/lib/utils';
import { Separator } from '@radix-ui/react-separator';
import { Link } from '@tanstack/react-router';
import { capitalizeAllWords, upperCase } from '../../utils/removeEmptyStrings';
import { sidebarData } from './data/sidebar-data';
import { NavGroup } from './nav-group';
import { NavUser } from './nav-user';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const sidebar = useSidebar()
  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarHeader>
        <div className='flex flex-col items-center justify-between'>
          <div className="grid grid-cols-[40px_1fr] justify-center w-full items-center ">

            <div className="flex flex-row items-start justify-center w-full h-5 ">
              <sidebarData.header.logo />
            </div>
            <div className={` ${sidebar.open ? 'flex flex-col' : 'hidden'} `}>

              <h1 className='text-lg font-semibold text-sidebar-foreground'>
                <Link to={'/'}>
                {upperCase(sidebarData.header.title)}
                </Link>
              </h1>

            </div>

          </div>
          <div className={cn('w-full pl-2 font-bold flex flex-row justify-start mt-2 text-xs text-sidebar-muted text-pink-400', !sidebar.open && 'pl-0 justify-center')}>
            {
              sidebar.open ? (
                capitalizeAllWords(sidebarData.header.subtitle)
              ) : (
                  <Link to={'/'}>
                    {
                upperCase(sidebarData.header.title)
                    }
                  </Link>
              )
            }
          </div>
        </div>
        <Separator className='mb-2 h-px bg-sidebar-border' />
        {/* <TeamSwitcher teams={sidebarData.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          props.visible && <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar >
  )
}
