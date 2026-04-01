import { type ColumnDef } from '@tanstack/react-table'
import { Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { type Customer, type CustomerStatus, type CustomerTier, type WalletStatus } from '../data/schema'

const statusStyles = new Map<CustomerStatus, string>([
  ['verified', 'border-0 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200'],
  ['pending', 'border-0 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200'],
  ['unverified', 'border-0 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-200'],
])

const tierLabels = new Map<CustomerTier, string>([
  ['new', 'New Customer'],
  ['gold', 'Gold'],
  ['bronze', 'Bronze'],
  ['silver', 'Silver'],
])

const walletStyles = new Map<WalletStatus, string>([
  ['valid', 'border-0 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200'],
  ['suspended', 'border-0 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200'],
  ['frozen', 'border-0 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200'],
  ['closed', 'border-0 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-200'],
])

const walletLabels = new Map<WalletStatus, string>([
  ['valid', 'Valid'],
  ['suspended', 'Suspended'],
  ['frozen', 'Frozen'],
  ['closed', 'Closed'],
])

const statusLabels = new Map<CustomerStatus, string>([
  ['verified', 'Verified'],
  ['pending', 'Pending'],
  ['unverified', 'Unverified'],
])

export const customersColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'pk',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Pk' />,
    cell: ({ row }) => <span className='text-sm'>{row.getValue('pk')}</span>,
    meta: { thClassName: 'w-[72px]' },
    enableSorting: false,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phone' />
    ),
    cell: ({ row }) => (
      <Link
        to='/customers/details'
        search={{ pk: row.original.pk }}
        className='text-sm text-foreground no-underline hover:no-underline focus-visible:no-underline active:no-underline'
      >
        {row.getValue('phone')}
      </Link>
    ),
    meta: { thClassName: 'border-s border-border/60', tdClassName: 'border-s border-border/60' },
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const value = row.original.status
      return (
        <Badge
          variant='secondary'
          className={cn('px-2.5 py-0.5 text-xs font-medium', statusStyles.get(value))}
        >
          {statusLabels.get(value)}
        </Badge>
      )
    },
    meta: { thClassName: 'border-s border-border/60', tdClassName: 'border-s border-border/60' },
    filterFn: (row, id, value) => {
      return row.getValue(id) === value
    },
    enableSorting: false,
  },
  {
    accessorKey: 'tier',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Tier' />,
    cell: ({ row }) => {
      const value = row.original.tier
      return <span className='text-sm'>{tierLabels.get(value)}</span>
    },
    meta: { thClassName: 'border-s border-border/60', tdClassName: 'border-s border-border/60' },
    filterFn: (row, id, value) => {
      return row.getValue(id) === value
    },
    enableSorting: false,
  },
  {
    accessorKey: 'wallet',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Wallet' />
    ),
    cell: ({ row }) => {
      const value = row.original.wallet
      return (
        <Badge
          variant='secondary'
          className={cn('px-2.5 py-0.5 text-xs font-medium', walletStyles.get(value))}
        >
          {walletLabels.get(value)}
        </Badge>
      )
    },
    meta: { thClassName: 'border-s border-border/60', tdClassName: 'border-s border-border/60' },
    filterFn: (row, id, value) => {
      return row.getValue(id) === value
    },
    enableSorting: false,
  },
  {
    accessorKey: 'dateJoined',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date Joined' />
    ),
    cell: ({ row }) => {
      const value = row.original.dateJoined
      return (
        <span className='text-sm text-muted-foreground'>
          {format(value, 'MMMM d, yyyy, h:mm a')}
        </span>
      )
    },
    meta: { thClassName: 'border-s border-border/60', tdClassName: 'border-s border-border/60' },
    enableSorting: false,
  },
]
