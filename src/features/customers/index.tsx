import { getRouteApi } from '@tanstack/react-router'
import { Card, CardContent } from '@/components/ui/card'
import { Page } from '@/components/layout/page'
import { CustomersTable } from './components/customers-table'
import { customers } from './data/customers'

const route = getRouteApi('/_authenticated/customers/')

export function Customers() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  return (
    <Page
      title='Customers'
      fluid
      className='font-inter px-4 py-4 sm:px-6 sm:py-5 lg:px-10 [&>div>div>h1]:text-xl [&>div>div>h1]:font-semibold'
    >
      <div className='grid gap-4 sm:grid-cols-3'>
        <Card className='rounded-sm border-0 bg-card py-4 shadow-none'>
          <CardContent className='px-4'>
            <div className='flex flex-col gap-1'>
              <div className='text-base font-semibold'>454</div>
              <div className='text-sm text-muted-foreground'>Total Customers</div>
            </div>
          </CardContent>
        </Card>
        <Card className='rounded-sm border-0 bg-card py-4 shadow-none'>
          <CardContent className='px-4'>
            <div className='flex flex-col gap-1'>
              <div className='text-base font-semibold'>194</div>
              <div className='text-sm text-muted-foreground'>Total Bookings</div>
            </div>
          </CardContent>
        </Card>
        <Card className='rounded-sm border-0 bg-card py-4 shadow-none'>
          <CardContent className='px-4'>
            <div className='flex flex-col gap-1'>
              <div className='text-base font-semibold'>88</div>
              <div className='text-sm text-muted-foreground'>Total Cars</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <CustomersTable data={customers} search={search} navigate={navigate} />
    </Page>
  )
}
