import {
  BadgeAlert,
  Ban,
  CalendarClock,
  ClipboardList,
  Users,
  Command,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Claro',
      logo: Command,
      plan: 'Backoffice',
    },
  ],
  navGroups: [
    {
      title: 'Customers',
      items: [
        {
          title: 'Customers',
          url: '/customers',
          badge: '454',
          icon: Users,
        },
      ],
    },
    {
      title: 'Bookings',
      items: [
        {
          title: 'Booking details',
          url: '/bookings/details',
          badge: '454',
          icon: CalendarClock,
        },
      ],
    },
    {
      title: 'Workers',
      items: [
        {
          title: 'Workers',
          url: '/workers',
          badge: '33',
          icon: Users,
        },
        {
          title: 'Violations',
          url: '/violations',
          badge: '15',
          icon: BadgeAlert,
        },
        {
          title: 'Blocks',
          url: '/blocks',
          badge: '15',
          icon: Ban,
        },
      ],
    },
    {
      title: 'Tasks',
      items: [
        {
          title: 'Tasks',
          url: '/tasks',
          badge: '120',
          icon: ClipboardList,
        },
      ],
    },
  ],
}
