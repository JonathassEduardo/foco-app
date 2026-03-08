import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import "./styles/index.css";
import App from "./App";
import { ThemeProvider } from "./private/components/shared/ThemeProvider";
import { AuthProvider } from "./private/hooks/useAuth";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);