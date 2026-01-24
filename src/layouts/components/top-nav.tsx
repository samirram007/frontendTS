// import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { IconChevronDown, IconMenu } from '@tabler/icons-react'
import { Link, useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'


interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
  links: {
    title: string
    href: string
    hasSubmenu?: boolean,
    submenuItems?: any[],
    visible: boolean
    isActive: boolean
    disabled?: boolean
  }[]
}

export function TopNav({ className, links: arrayLinks, ...props }: TopNavProps) {
  const location = useLocation();
  const [links, setLinks] = useState([...arrayLinks]);
  useEffect(() => {

    setLinks((prev) =>
      prev.map((link) => ({
        ...link,
        isActive: location.pathname.includes(link.href),
      }))
    );
  }, [location.pathname]);
  return (
    <>
      <div className='lg:hidden'>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size='icon' variant='outline'>
              <IconMenu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='bottom' align='start'>
            {links.filter(link => link.visible).map(({ title, href, isActive }) => (
              <DropdownMenuItem key={`${title}-${href}`} asChild>
                <Link
                  to={href}
                  className={!isActive ? 'text-muted-foreground' : ''}

                >
                  {title}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav
        className={cn(
          'hidden items-center space-x-4 lg:flex lg:space-x-6',
          className
        )}
        {...props}
      >
        {links.filter(link => link.visible).map(({ hasSubmenu, submenuItems, title, href, isActive }) => (
          hasSubmenu ?
            (<DropdownMenu key={`${title}-${href}`} modal={false} >
              <DropdownMenuTrigger asChild>
                <span className={cn(
                  'flex cursor-pointer items-center text-sm font-medium transition-colors underline-offset-4 decoration-2 hover:text-primary hover:underline',
                  isActive ? '  animate-in  underline  decoration-red-500  text-primary' : 'text-muted-foreground decoration-red-200'
                )}>
                  {title}
                  <IconChevronDown size={16} className='ml-auto' />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent side='bottom' align='center' className='min-w-max '>

                <div className='flex flex-row bg-accent/10 px-4 space-x-8'>
                  {
                    submenuItems?.filter(submenu => submenu.visible).map((submenu, index) =>
                      <DropdownMenuItem key={`${title}-${submenu.title}`} asChild>

                        <div className='flex flex-col justify-start items-start'>
                          <div className=' min-w-[200px] font-semibold text-sm hover:underline hover:text-primary border-b border-gray-200 py-1' >
                            {submenu.title}
                          </div>
                          <div className=' flex flex-col'>
                            {
                              submenu.menus?.filter((item: any) => item.visible).map((item: any) =>
                                <Link
                                  key={`${submenu.title}-${item.title}-${index}`}
                                  to={item.href}
                                  className={cn(
                                    'w-full py-1 text-sm hover:underline hover:text-primary',
                                    location.pathname === (item.href) ? 'font-semibold text-primary underline underline-offset-4 decoration-2 decoration-red-500' : 'font-normal text-muted-foreground'
                                  )}
                                >
                                  {item.title}
                                </Link>
                              )
                            }
                          </div>
                        </div>

                      </DropdownMenuItem>
                    )
                  }
                </div>
              </DropdownMenuContent>
            </DropdownMenu>)
            : (
          <Link
            key={`${title}-${href}`}
            to={href}
            // disabled={disabled}
            className={`text-sm font-medium transition-colors underline-offset-4  decoration-2 hover:text-primary hover:underline ${isActive ? '  animate-in  underline  decoration-red-500  text-primary' : 'text-muted-foreground decoration-red-200'}`}
              >              {title}

          </Link>
            )))}
      </nav>
    </>
  )
}
