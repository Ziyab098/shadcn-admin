import { z } from 'zod'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { ArrowLeft, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Page } from '@/components/layout/page'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { customers } from '@/features/customers/data/customers'
import { CustomerAddressesTab } from '@/routes/_authenticated/customers/details-tabs/-addresses-tab'
import { CustomerBookingsTab } from '@/routes/_authenticated/customers/details-tabs/-bookings-tab'
import { CustomerCarsTab } from '@/routes/_authenticated/customers/details-tabs/-cars-tab'
import { CustomerProfileTab } from '@/routes/_authenticated/customers/details-tabs/-profile-tab'

const customerDetailsTabs = [
  'profile',
  'cars',
  'addresses',
  'bookings',
  'wallet',
] as const

const customerDetailsSearchSchema = z
  .object({
    pk: z.number().optional().catch(undefined),
    tab: z.enum(customerDetailsTabs).optional().catch(undefined),
  })

export const Route = createFileRoute('/_authenticated/customers/details')({
  validateSearch: customerDetailsSearchSchema,
  component: CustomerDetailsRoute,
})

function CustomerDetailsRoute() {
  const { history } = useRouter()
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const customer = customers.find((c) => c.pk === search.pk)
  const tab = search.tab ?? 'profile'

  return (
    <Page
      title='Details'
      fluid
      className='font-inter px-4 py-4 sm:px-6 sm:py-5 lg:px-10 [&>div>div>h1]:sr-only'
    >
      <div className='flex flex-col gap-4 sm:gap-6'>
        <button
          type='button'
          onClick={() => history.go(-1)}
          className='flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
        >
          <ArrowLeft className='size-4' />
          Back
        </button>

        <Card className='rounded-sm border-0 bg-card shadow-none'>
          <CardContent className='flex items-center gap-4 p-4'>
            <div className='flex size-9 items-center justify-center rounded-full border bg-background'>
              <User className='size-4 text-muted-foreground' />
            </div>
            <div className='flex flex-col gap-1'>
              <div className='text-base font-medium'>{customer?.phone ?? '—'}</div>
              <div className='flex items-center gap-2'>
                <Badge
                  variant='secondary'
                  className={cn(
                    'rounded-full border-0 bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700',
                    'dark:bg-emerald-500/20 dark:text-emerald-200'
                  )}
                >
                  {customer?.status === 'pending'
                    ? 'Pending'
                    : customer?.status === 'unverified'
                      ? 'Unverified'
                      : 'Verified'}
                </Badge>
                <Badge
                  variant='secondary'
                  className={cn(
                    'rounded-full border-0 bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700',
                    'dark:bg-emerald-500/20 dark:text-emerald-200'
                  )}
                >
                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='grid gap-4 sm:grid-cols-4'>
          <SummaryCard value='2' label='Total Bookings' />
          <SummaryCard value='2' label='Cars' />
          <SummaryCard value='1' label='Addresses' />
          <SummaryCard value='120 SAR' label='Total paid' />
        </div>

        <Tabs
          value={tab}
          onValueChange={(nextTab) =>
            navigate({
              search: (prev) => ({
                ...prev,
                tab:
                  nextTab === 'profile'
                    ? undefined
                    : (nextTab as (typeof customerDetailsTabs)[number]),
              }),
            })
          }
          className='gap-4'
        >
          <TabsList className='rounded-sm bg-slate-100 dark:bg-muted/60'>
            <TabsTrigger value='profile' className='rounded-sm font-medium'>
              Profile
            </TabsTrigger>
            <TabsTrigger value='cars' className='rounded-sm font-medium'>
              Cars
            </TabsTrigger>
            <TabsTrigger value='addresses' className='rounded-sm font-medium'>
              Addresses
            </TabsTrigger>
            <TabsTrigger value='bookings' className='rounded-sm font-medium'>
              Bookings
            </TabsTrigger>
            <TabsTrigger value='wallet' className='rounded-sm font-medium'>
              Wallet
            </TabsTrigger>
          </TabsList>

          <TabsContent value='profile'>
            <CustomerProfileTab customer={customer} />
          </TabsContent>

          <TabsContent value='cars'>
            <CustomerCarsTab />
          </TabsContent>
          <TabsContent value='addresses'>
            <CustomerAddressesTab />
          </TabsContent>
          <TabsContent value='bookings'>
            <CustomerBookingsTab />
          </TabsContent>
          <TabsContent value='wallet'>
            <div className='flex h-40 items-center justify-center rounded-none border bg-card text-sm text-muted-foreground'>
              Coming soon
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Page>
  )
}

function SummaryCard({ value, label }: { value: string; label: string }) {
  return (
    <Card className='rounded-sm border-0 bg-card py-4 shadow-none'>
      <CardContent className='px-4'>
        <div className='flex flex-col gap-1'>
          <div className='text-base font-medium'>{value}</div>
          <div className='text-sm font-normal text-muted-foreground'>{label}</div>
        </div>
      </CardContent>
    </Card>
  )
}
