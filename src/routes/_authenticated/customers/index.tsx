import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Customers } from '@/features/customers/index'
import { customerStatusValues, customerTierValues, walletStatusValues } from '@/features/customers/data/schema'

const customersSearchSchema = z
  .object({
    page: z.number().optional().catch(1),
    pageSize: z.number().optional().catch(10),
    filter: z.string().optional().catch(''),
    status: z.enum(customerStatusValues).optional(),
    tier: z.enum(customerTierValues).optional(),
    wallet: z.enum(walletStatusValues).optional(),
  })
  .catch({
    page: 1,
    pageSize: 10,
    filter: '',
    status: undefined,
    tier: undefined,
    wallet: undefined,
  })

export const Route = createFileRoute('/_authenticated/customers/')({
  validateSearch: customersSearchSchema,
  component: Customers,
})
