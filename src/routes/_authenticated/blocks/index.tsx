import { createFileRoute } from '@tanstack/react-router'
import { Page } from '@/components/layout/page'

export const Route = createFileRoute('/_authenticated/blocks/')({
  component: BlocksRoute,
})

function BlocksRoute() {
  return (
    <Page title='Blocks'>
      <div className='flex flex-1 items-center justify-center text-muted-foreground'>
        Coming soon
      </div>
    </Page>
  )
}
