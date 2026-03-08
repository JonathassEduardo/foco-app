import axios from "axios";
import type {
  Task,
  CreateTaskPayload,
  UpdateTaskPayload,
} from "@/types/task";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
   withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const taskService = {
  list(): Promise<Task[]> {
    return api.get<Task[]>("/tasks").then((r) => r.data);
  },

  create(payload: CreateTaskPayload): Promise<Task> {
    return api.post<Task>("/tasks", payload).then((r) => r.data);
  },

  update(id: string, payload: UpdateTaskPayload): Promise<Task> {
    return api.put<Task>(`/tasks/${id}`, payload).then((r) => r.data);
  },

  remove(id: string): Promise<void> {
    return api.delete(`/tasks/${id}`).then(() => undefined);
  },
};