import { createFileRoute } from '@tanstack/react-router'
import { Page } from '@/components/layout/page'

export const Route = createFileRoute('/_authenticated/coverage-areas/')({
  component: CoverageAreasRoute,
})

function CoverageAreasRoute() {
  return (
    <Page
      title='Coverage areas'
      breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Coverage areas' }]}
      fixed
      fluid
      variant='map'
    >
      <div className='flex flex-1 items-center justify-center border-t bg-muted/10 text-muted-foreground'>
        Map view (coming soon)
      </div>
    </Page>
  )
}
