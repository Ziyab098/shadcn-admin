import { createFileRoute } from '@tanstack/react-router'
import { Page } from '@/components/layout/page'

export const Route = createFileRoute('/_authenticated/partners/')({
  component: PartnersRoute,
})

function PartnersRoute() {
  return (
    <Page title='Partners' breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Partners' }]}>
      <div className='flex flex-1 items-center justify-center text-muted-foreground'>
        Coming soon
      </div>
    </Page>
  )
}
