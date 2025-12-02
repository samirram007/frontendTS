// import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { IconMenu } from '@tabler/icons-react'
import { Link, useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'


interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
  links: {
    title: string
    href: string
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
        isActive: location.pathname === link.href,
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
        {links.filter(link => link.visible).map(({ title, href, isActive }) => (
          <Link
            key={`${title}-${href}`}
            to={href}
            // disabled={disabled}
            className={`text-sm font-medium transition-colors underline-offset-4  decoration-2 hover:text-primary hover:underline ${isActive ? '  animate-in  underline  decoration-red-500  text-primary' : 'text-muted-foreground decoration-red-200'}`}
          >
            {title}
          </Link>
        ))}
      </nav>
    </>
  )
}
