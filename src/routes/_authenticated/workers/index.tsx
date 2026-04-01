import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { TriangleAlert, UserPlus } from 'lucide-react'
import { Page } from '@/components/layout/page'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/_authenticated/workers/')({
  component: WorkersRoute,
})

type WorkerStatus = 'verified' | 'pending' | 'unverified'
type WorkerState = 'active' | 'inactive' | 'blocked'

type Worker = {
  pk: number
  name: string
  phone: string
  status: WorkerStatus
  violations: number
  blocks: number
  state: WorkerState
  dateJoined: string
}

const workers: Worker[] = [
  {
    pk: 181,
    name: 'Shehab Eldin ghazy',
    phone: '+965902020',
    status: 'verified',
    violations: 2,
    blocks: 0,
    state: 'active',
    dateJoined: 'March 13, 2026, 3:57 a.m.',
  },
  {
    pk: 127,
    name: 'Milton Sheikh',
    phone: '+965902020',
    status: 'pending',
    violations: 6,
    blocks: 1,
    state: 'inactive',
    dateJoined: 'March 13, 2026, 3:57 a.m.',
  },
  {
    pk: 328,
    name: 'Forhad',
    phone: '+965902020',
    status: 'unverified',
    violations: 1,
    blocks: 2,
    state: 'blocked',
    dateJoined: 'March 13, 2026, 3:57 a.m.',
  },
]

const statusLabels: Record<WorkerStatus, string> = {
  verified: 'Verified',
  pending: 'Pending',
  unverified: 'Unverified',
}

const statusBadgeClasses: Record<WorkerStatus, string> = {
  verified:
    'rounded-full border-0 bg-emerald-100 px-2.5 py-0.5 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200',
  pending:
    'rounded-full border-0 bg-amber-100 px-2.5 py-0.5 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200',
  unverified:
    'rounded-full border-0 bg-slate-100 px-2.5 py-0.5 text-slate-600 dark:bg-slate-500/20 dark:text-slate-200',
}

const stateLabels: Record<WorkerState, string> = {
  active: 'Active',
  inactive: 'Inactive',
  blocked: 'Blocked',
}

const stateBadgeClasses: Record<WorkerState, string> = {
  active:
    'rounded-full border-0 bg-emerald-100 px-2.5 py-0.5 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200',
  inactive:
    'rounded-full border-0 bg-slate-100 px-2.5 py-0.5 text-slate-600 dark:bg-slate-500/20 dark:text-slate-200',
  blocked:
    'rounded-full border-0 bg-red-100 px-2.5 py-0.5 text-red-700 dark:bg-red-500/20 dark:text-red-200',
}

function WorkersRoute() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<WorkerStatus | 'all'>('all')
  const [state, setState] = useState<WorkerState | 'all'>('all')
  const [selected, setSelected] = useState<Record<number, boolean>>({})

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return workers.filter((w) => {
      if (status !== 'all' && w.status !== status) return false
      if (state !== 'all' && w.state !== state) return false

      if (!q) return true
      const pk = String(w.pk).toLowerCase()
      const phone = String(w.phone).toLowerCase()
      const name = String(w.name).toLowerCase()
      return pk.includes(q) || phone.includes(q) || name.includes(q)
    })
  }, [query, status, state])

  const summary = useMemo(() => {
    const activeWorkers = workers.filter((w) => w.state === 'active').length
    const blockedWorkers = workers.filter((w) => w.state === 'blocked').length
    const totalViolations = workers.reduce((acc, w) => acc + w.violations, 0)
    return { activeWorkers, blockedWorkers, totalViolations }
  }, [])

  const allChecked = filtered.length > 0 && filtered.every((w) => selected[w.pk])
  const someChecked = filtered.some((w) => selected[w.pk]) && !allChecked

  return (
    <Page
      title='Workers'
      fluid
      className='font-inter px-4 py-4 sm:px-6 sm:py-5 lg:px-10 [&>div>div>h1]:text-xl [&>div>div>h1]:font-semibold'
      actions={
        <>
          <Button variant='outline' className='h-9 gap-2 rounded-sm bg-card'>
            <UserPlus className='size-4' />
            Add Block
          </Button>
          <Button className='h-9 gap-2 rounded-sm bg-[rgb(24,24,27)] text-white hover:bg-[rgb(24,24,27)]/90'>
            <TriangleAlert className='size-4' />
            Add Violation
          </Button>
        </>
      }
    >
      <div className='grid gap-4 sm:grid-cols-3'>
        <SummaryCard value={String(summary.activeWorkers)} label='Active Workers' />
        <SummaryCard value={String(summary.blockedWorkers)} label='Blocked' />
        <SummaryCard value={String(summary.totalViolations)} label='Total Violations' />
      </div>

      <div className='flex flex-1 flex-col gap-4 text-sm'>
        <div className='grid gap-3 sm:grid-cols-[minmax(220px,360px)_repeat(2,120px)]'>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search by PK , Phone, Name'
            className='h-9 bg-card text-sm'
          />

          <Select
            value={status}
            onValueChange={(value) => setStatus(value as WorkerStatus | 'all')}
          >
            <SelectTrigger className='w-full bg-card text-sm'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Status</SelectItem>
              {(['verified', 'pending', 'unverified'] as const).map((s) => (
                <SelectItem key={s} value={s}>
                  {statusLabels[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={state}
            onValueChange={(value) => setState(value as WorkerState | 'all')}
          >
            <SelectTrigger className='w-full bg-card text-sm'>
              <SelectValue placeholder='State' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>State</SelectItem>
              {(['active', 'inactive', 'blocked'] as const).map((s) => (
                <SelectItem key={s} value={s}>
                  {stateLabels[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='overflow-hidden rounded-none border'>
          <Table className='[&_th]:h-10 [&_th]:px-4 [&_th]:text-sm [&_th]:font-semibold [&_th]:text-muted-foreground [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-sm'>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead className='w-10 bg-card'>
                  <Checkbox
                    checked={allChecked || (someChecked ? 'indeterminate' : false)}
                    onCheckedChange={(checked) => {
                      const isChecked = checked === true
                      setSelected((prev) => {
                        const next = { ...prev }
                        for (const w of filtered) {
                          next[w.pk] = isChecked
                        }
                        return next
                      })
                    }}
                    aria-label='Select all'
                  />
                </TableHead>
                <TableHead className='w-20 bg-card'>PK</TableHead>
                <TableHead className='min-w-[180px] bg-card'>Name</TableHead>
                <TableHead className='w-32 bg-card'>Status</TableHead>
                <TableHead className='w-24 bg-card'>Violations</TableHead>
                <TableHead className='w-24 bg-card'>Blocks</TableHead>
                <TableHead className='w-28 bg-card'>State</TableHead>
                <TableHead className='min-w-[180px] bg-card'>Date Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length > 0 ? (
                filtered.map((w) => (
                  <TableRow key={w.pk} className='hover:bg-transparent'>
                    <TableCell className='bg-card'>
                      <Checkbox
                        checked={Boolean(selected[w.pk])}
                        onCheckedChange={(checked) =>
                          setSelected((prev) => ({
                            ...prev,
                            [w.pk]: checked === true,
                          }))
                        }
                        aria-label={`Select worker ${w.pk}`}
                      />
                    </TableCell>
                    <TableCell className='bg-card'>{w.pk}</TableCell>
                    <TableCell className='bg-card'>
                      <div className='flex flex-col'>
                        <div className='font-medium text-foreground'>{w.name}</div>
                        <div className='text-muted-foreground'>{w.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell className='bg-card'>
                      <Badge
                        variant='secondary'
                        className={cn('font-medium', statusBadgeClasses[w.status])}
                      >
                        {statusLabels[w.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className='bg-card'>{w.violations}</TableCell>
                    <TableCell className='bg-card'>{w.blocks}</TableCell>
                    <TableCell className='bg-card'>
                      <Badge
                        variant='secondary'
                        className={cn('font-medium', stateBadgeClasses[w.state])}
                      >
                        {stateLabels[w.state]}
                      </Badge>
                    </TableCell>
                    <TableCell className='bg-card'>{w.dateJoined}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className='h-24 text-center'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Page>
  )
}

function SummaryCard({ value, label }: { value: string; label: string }) {
  return (
    <Card className='rounded-sm border-0 bg-card py-4 shadow-none'>
      <CardContent className='px-4'>
        <div className='flex flex-col gap-1'>
          <div className='text-base font-semibold'>{value}</div>
          <div className='text-sm text-muted-foreground'>{label}</div>
        </div>
      </CardContent>
    </Card>
  )
}
