
import { TaskHeader } from "../task/components/Taskheader";
import { ChangeNameEmail } from "./components/ChangeNameEmail";
import { ChangePassword } from "./components/ChangePassword";
import { NotificationPreferences } from "./components/NotificationPreferences";

export default function ConfigurationPage() {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <TaskHeader 
        eyebrow="Configurações" 
        title="Da Sua" 
        highlight="Conta." 
      />

      <div className="mt-10 space-y-8 w-full">
        <ChangeNameEmail />
        <ChangePassword />
        <NotificationPreferences />
      </div>
    </div>
  );
}