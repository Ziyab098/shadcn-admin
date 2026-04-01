import { type Customer } from './schema'

export const customers: Customer[] = [
  {
    pk: 181,
    phone: '+965902020',
    status: 'verified',
    tier: 'new',
    wallet: 'valid',
    dateJoined: new Date('2026-03-13T03:57:00'),
  },
  {
    pk: 127,
    phone: '+965902020',
    status: 'pending',
    tier: 'gold',
    wallet: 'suspended',
    dateJoined: new Date('2026-03-13T03:57:00'),
  },
  {
    pk: 328,
    phone: '+965902020',
    status: 'unverified',
    tier: 'bronze',
    wallet: 'frozen',
    dateJoined: new Date('2026-03-13T03:57:00'),
  },
  {
    pk: 329,
    phone: '+965902020',
    status: 'unverified',
    tier: 'silver',
    wallet: 'closed',
    dateJoined: new Date('2026-03-13T03:57:00'),
  },
]
