import * as z from "zod";

export const CurrencySchema = z.object({
  id: z.number().gt(0),
  code: z.string().max(4),
  symbol: z.string().max(4),
  name: z.string().max(64)
});

export type Currency = z.infer<typeof CurrencySchema>;