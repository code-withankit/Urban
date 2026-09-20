import { z } from 'zod';

export const addressSchema = z.object({
    name: z.enum(['home', 'office', 'secondary'], 'Address Name shall be home, office or secondary'),
    addressLine1: z.string().trim().min(3, 'Address Line 1 shall be min 3 letters'),
    addressLine2: z.string().trim().nullable(),
    city: z.string().trim().min(3, 'City shall be min 3 letters'),
    state: z.string().trim().min(3, 'State shall be min 3 letters'),
    postalCode: z.string().trim().length(6, 'Postal Code shall be 6 digits'),
    isDefault: z.boolean().default(false)
})