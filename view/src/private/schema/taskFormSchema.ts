import { z } from "zod";

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .min(3, "Title must be at least 3 characters."),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
});

export const editSchema = z.object({
  title: z
    .string()
    .min(1, "O título é obrigatório.")
    .min(3, "O título deve ter pelo menos 3 caracteres."),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["pending", "in_progress", "done"]),
});