import { createFileRoute } from '@tanstack/react-router'
import { Page } from '@/components/layout/page'

export const Route = createFileRoute('/_authenticated/live-activity/')({
  component: LiveActivityRoute,
})

function LiveActivityRoute() {
  return (
    <Page
      title='Live activity'
      breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Live activity' }]}
      fixed
      fluid
      variant='map'
    >
      <div className='flex flex-1 items-center justify-center border-t bg-muted/10 text-muted-foreground'>
        Live map / feed (coming soon)
      </div>
    </Page>
  )
}
