import { z } from "zod";

export const CatSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  reference_image_id: z.string().optional(),
});

export type CatType = z.infer<typeof CatSchema>;
