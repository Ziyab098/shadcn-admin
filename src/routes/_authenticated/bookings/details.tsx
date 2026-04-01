import { createFileRoute } from '@tanstack/react-router'
import { Page } from '@/components/layout/page'

export const Route = createFileRoute('/_authenticated/bookings/details')({
  component: BookingDetailsRoute,
})

function BookingDetailsRoute() {
  return (
    <Page title='Booking details'>
      <div className='flex flex-1 items-center justify-center text-muted-foreground'>
        Coming soon
      </div>
    </Page>
  )
}
