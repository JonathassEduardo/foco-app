import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authService = {
  register(payload: RegisterPayload): Promise<AuthUser> {
    return api.post("/api/auth/register", payload).then((r) => r.data.user);
  },

  login(payload: LoginPayload): Promise<AuthUser> {
    return api.post("/api/auth/login", payload).then((r) => r.data.user);
  },

  logout(): Promise<void> {
    return api.post("/api/auth/logout").then(() => undefined);
  },

  me(): Promise<AuthUser> {
    return api.get("/api/auth/me").then((r) => r.data.user);
  },
};