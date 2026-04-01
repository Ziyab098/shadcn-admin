import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { type Customer } from '@/features/customers/data/schema'

type CustomerProfileTabProps = {
  customer?: Customer
}

export function CustomerProfileTab({ customer }: CustomerProfileTabProps) {
  return (
    <div className='grid gap-4 sm:grid-cols-2'>
      <Card className='rounded-sm border-0 bg-card shadow-none'>
        <CardContent className='p-0'>
          <DetailCell label='PK' value={customer?.pk ?? '—'} />
        </CardContent>
      </Card>
      <Card className='rounded-sm border-0 bg-card shadow-none'>
        <CardContent className='p-0'>
          <DetailCell
            label='Date Joined'
            value={
              customer?.dateJoined
                ? format(customer.dateJoined, 'MMMM d, yyyy, h:mm aaaa')
                : '—'
            }
          />
        </CardContent>
      </Card>
      <Card className='rounded-sm border-0 bg-card shadow-none'>
        <CardContent className='p-0'>
          <DetailCell label='Phone' value={customer?.phone ?? '—'} />
        </CardContent>
      </Card>
      <Card className='rounded-sm border-0 bg-card shadow-none'>
        <CardContent className='p-0'>
          <DetailCell label='Name' value='Abdullah Al-Mutairi' />
        </CardContent>
      </Card>
      <Card className='rounded-sm border-0 bg-card shadow-none'>
        <CardContent className='p-0'>
          <DetailCell label='Email' value='abd.ak@gmail.com' />
        </CardContent>
      </Card>
      <Card className='rounded-sm border-0 bg-card shadow-none'>
        <CardContent className='p-0'>
          <DetailCell label='Gender' value='Male' />
        </CardContent>
      </Card>
    </div>
  )
}

function DetailCell({
  label,
  value,
  className,
}: {
  label: string
  value: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-1 p-4', className)}>
      <div className='text-base font-bold'>{value}</div>
      <div className='text-sm font-medium text-muted-foreground'>{label}</div>
    </div>
  )
}
