import { z } from "zod";

export const TodoSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  isCompleted: z.boolean(),
});

export type TodoType = z.infer<typeof TodoSchema>;
