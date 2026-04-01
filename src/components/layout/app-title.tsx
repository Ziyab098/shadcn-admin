import { Link } from '@tanstack/react-router'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Logo } from '@/assets/logo'

export function AppTitle() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='gap-0 py-0 hover:bg-transparent active:bg-transparent'
          asChild
        >
          <div className='flex items-center gap-3'>
            <div className='flex size-6 items-center justify-center'>
              <Logo className='size-6 text-sky-400' />
            </div>
            <Link
              to='/'
              className='grid flex-1 text-start text-sm leading-tight'
            >
              <span className='truncate font-bold'>Claro</span>
            </Link>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
