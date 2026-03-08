import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./private/components/AppLayout";
import TaskPage from "./private/page/task/page";
import ConfigurationPage from "./private/page/configurantion/page";
import { NotFoundPage } from "./private/page/not-found";
import LoginPage from "./public/login/page";
import RegisterPage from "./public/register/page";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/404" element={<NotFoundPage />} />

        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/configuration" element={<ConfigurationPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}