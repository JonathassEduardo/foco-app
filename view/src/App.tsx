import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./private/components/AppLayout";
import TaskPage from "./private/page/task/page";
import ConfigurationPage from "./private/page/configurantion/page";
import { NotFoundPage } from "./private/page/not-found";
import LoginPage from "./public/login/page";
import RegisterPage from "./public/register/page";
import { useAuth } from "./private/hooks/useAuth";
import { ProtectedRoute } from "./private/config/ProtectedRoute";


export default function App() {
  const { user } = useAuth();
  const isAuthenticated = !!user;
 return (
    <BrowserRouter>
      <Routes>
        {/* Páginas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/404" element={<NotFoundPage />} />

        {/* Rotas protegidas */}
        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/tasks" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <TaskPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/configuration"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ConfigurationPage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}