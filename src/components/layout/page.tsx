import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Main } from '@/components/layout/main'

export type PageBreadcrumbItem = {
  label: string
  to?: string
}

type PageProps = {
  title: string
  breadcrumb?: PageBreadcrumbItem[]
  description?: string
  actions?: React.ReactNode
  variant?: 'default' | 'map'
  fixed?: boolean
  fluid?: boolean
  className?: string
  children?: React.ReactNode
}

export function Page({
  title,
  breadcrumb,
  description,
  actions,
  variant = 'default',
  fixed,
  fluid,
  className,
  children,
}: PageProps) {
  return (
    <Main
      fixed={fixed}
      fluid={fluid}
      className={cn(
        'flex flex-1 flex-col',
        variant === 'default' && 'gap-4 sm:gap-6',
        variant === 'map' && 'p-0',
        className
      )}
    >
      <PageHeader
        title={title}
        breadcrumb={breadcrumb}
        description={description}
        actions={actions}
        className={cn(variant === 'map' && 'px-4 py-6')}
      />
      {variant === 'map' ? (
        <div className='flex flex-1 overflow-hidden'>{children}</div>
      ) : (
        children
      )}
    </Main>
  )
}

type PageHeaderProps = {
  title: string
  breadcrumb?: PageBreadcrumbItem[]
  description?: string
  actions?: React.ReactNode
  className?: string
}

function PageHeader({
  title,
  breadcrumb,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('flex flex-wrap items-end justify-between gap-2', className)}>
      <div className='flex flex-col gap-1'>
        {breadcrumb && breadcrumb.length > 0 && (
          <div className='text-sm text-muted-foreground'>
            {breadcrumb.map((item, index) => (
              <span key={`${item.label}-${index}`}>
                {index > 0 && ' / '}
                {item.to ? (
                  <Link to={item.to} className='hover:text-foreground'>
                    {item.label}
                  </Link>
                ) : (
                  <span className='text-foreground'>{item.label}</span>
                )}
              </span>
            ))}
          </div>
        )}
        <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
        {description && <p className='text-muted-foreground'>{description}</p>}
      </div>
      {actions ? <div className='flex items-center gap-2'>{actions}</div> : null}
    </div>
  )
}
