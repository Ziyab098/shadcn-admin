import { z } from 'zod'

export const customerStatusValues = ['verified', 'pending', 'unverified'] as const
export const customerTierValues = ['new', 'gold', 'bronze', 'silver'] as const
export const walletStatusValues = ['valid', 'suspended', 'frozen', 'closed'] as const

const customerStatusSchema = z.enum(customerStatusValues)
const customerTierSchema = z.enum(customerTierValues)
const walletStatusSchema = z.enum(walletStatusValues)

const _customerSchema = z.object({
  pk: z.number(),
  phone: z.string(),
  status: customerStatusSchema,
  tier: customerTierSchema,
  wallet: walletStatusSchema,
  dateJoined: z.coerce.date(),
})

export type Customer = z.infer<typeof _customerSchema>
export type CustomerStatus = z.infer<typeof customerStatusSchema>
export type CustomerTier = z.infer<typeof customerTierSchema>
export type WalletStatus = z.infer<typeof walletStatusSchema>
