import { createFileRoute } from '@tanstack/react-router'
import { Page } from '@/components/layout/page'

export const Route = createFileRoute('/_authenticated/campaigns/')({
  component: CampaignsRoute,
})

function CampaignsRoute() {
  return (
    <Page
      title='Campaigns'
      breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Campaigns' }]}
    >
      <div className='flex flex-1 items-center justify-center text-muted-foreground'>
        Coming soon
      </div>
    </Page>
  )
}
