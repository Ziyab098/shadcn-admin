import { createFileRoute } from '@tanstack/react-router'
import { Page } from '@/components/layout/page'

export const Route = createFileRoute('/_authenticated/violations/')({
  component: ViolationsRoute,
})

function ViolationsRoute() {
  return (
    <Page title='Violations'>
      <div className='flex flex-1 items-center justify-center text-muted-foreground'>
        Coming soon
      </div>
    </Page>
  )
}
