import { Lock, ShieldCheck } from "lucide-react";

const SecuritySettings = () => {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[rgb(var(--text))]">
            Security
          </h2>
          <p className="text-sm text-[rgb(var(--muted))]">
            Manage your password and account security settings
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-[rgb(var(--success))]/20 bg-[rgb(var(--success))]/10 px-3 py-1.5 text-xs text-[rgb(var(--success))]">
          <ShieldCheck size={14} />
          Secure
        </div>
      </div>

      {/* Card */}
      <div className="rounded-xl  ">
        {/* Body */}
        <div className="space-y-5 p-3">
          {/* Current Password */}
          <div>
            <label className="mb-2 block text-xs text-[rgb(var(--muted))]">
              Current Password
            </label>

            <div className="flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] px-3 py-2">
              <Lock size={16} className="text-[rgb(var(--muted))]" />
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full bg-transparent text-sm outline-none text-[rgb(var(--text))]"
              />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="mb-2 block text-xs text-[rgb(var(--muted))]">
              New Password
            </label>

            <div className="flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] px-3 py-2">
              <Lock size={16} className="text-[rgb(var(--muted))]" />
              <input
                type="password"
                placeholder="Create new password"
                className="w-full bg-transparent text-sm outline-none text-[rgb(var(--text))]"
              />
            </div>

            <p className="mt-1 text-[11px] text-[rgb(var(--muted))]">
              Use 8+ characters with letters, numbers & symbols
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-xs text-[rgb(var(--muted))]">
              Confirm Password
            </label>

            <div className="flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] px-3 py-2">
              <Lock size={16} className="text-[rgb(var(--muted))]" />
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full bg-transparent text-sm outline-none text-[rgb(var(--text))]"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[rgb(var(--border))] px-5 py-3">
          <p className="text-xs text-[rgb(var(--muted))]">
            Last updated: never
          </p>

          <button className="rounded-lg bg-[rgb(var(--primary))] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;