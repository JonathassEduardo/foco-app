import { Settings } from "lucide-react";
import { ChangeNameEmail } from "./ChangeNameEmail";
import { ChangePassword } from "./ChangePassword";
import { NotificationPreferences } from "./NotificationPreferences";

export function AccountSection() {
  return (
    <section className="space-y-6 p-6 bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold flex items-center gap-3 text-white">
        <Settings className="w-6 h-6" /> Conta
      </h2>

      <div className="flex flex-col gap-6">
        <ChangeNameEmail />
        <ChangePassword />
        <NotificationPreferences />
      </div>
    </section>
  );
}