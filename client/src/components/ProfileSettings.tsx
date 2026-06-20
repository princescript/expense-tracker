import { Camera, Check, Mail, Phone, User, X } from "lucide-react";
import { useEffect, useState } from "react";

const currencies = ["INR", "USD", "EUR"] as const;
type Currency = (typeof currencies)[number];

const ProfileSettings = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Currency>("INR");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold text-[rgb(var(--text))]">
            Profile
          </h2>
          <p className="text-sm text-[rgb(var(--muted))]">
            Manage your personal information
          </p>
        </div>

        {/* Profile Header Card */}
        <div className="flex items-center justify-between rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(var(--primary))] text-white">
              D

              <button className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
                <Camera size={12} />
              </button>
            </div>

            <div>
              <p className="text-sm font-medium text-[rgb(var(--text))]">
                Devil
              </p>
              <p className="text-xs text-[rgb(var(--muted))]">
                devil@gmail.com
              </p>
            </div>
          </div>

          <button className="rounded-lg border border-[rgb(var(--border))] px-3 py-1.5 text-xs">
            Change
          </button>
        </div>

        {/* Form */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* Name */}
          <div>
            <label className="mb-2 block text-xs text-[rgb(var(--muted))]">
              Full Name
            </label>

            <div className="flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] px-3 py-2">
              <User size={16} className="text-[rgb(var(--muted))]" />
              <input
                defaultValue="Devil"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-xs text-[rgb(var(--muted))]">
              Email
            </label>

            <div className="flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] px-3 py-2">
              <Mail size={16} className="text-[rgb(var(--muted))]" />
              <input
                defaultValue="devil@gmail.com"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-xs text-[rgb(var(--muted))]">
              Phone
            </label>

            <div className="flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] px-3 py-2">
              <Phone size={16} className="text-[rgb(var(--muted))]" />
              <input
                defaultValue="+91 9876543210"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          {/* Currency */}
          <div>
            <label className="mb-2 block text-xs text-[rgb(var(--muted))]">
              Currency
            </label>

            <button
              onClick={() => setOpen(true)}
              className="w-full rounded-lg border border-[rgb(var(--border))] px-3 py-2 text-left text-sm text-[rgb(var(--text))]"
            >
              {selected}
            </button>

            {/* Overlay */}
            {open && (
              <div
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-80 scale-100 animate-in fade-in zoom-in-95 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-xl"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-[rgb(var(--border))] px-4 py-3">
                    <h3 className="text-sm font-semibold text-[rgb(var(--text))]">
                      Select Currency
                    </h3>

                    <button
                      onClick={() => setOpen(false)}
                      className="rounded-md p-1 bg-[rgb(var(--danger))]/10"
                    >
                      <X
                        size={18}
                        className="text-[rgb(var(--muted))] hover:text-[rgb(var(--danger))] transition"
                      />
                    </button>
                  </div>

                  {/* Options */}
                  <div className="p-2">
                    {currencies.map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setSelected(c);
                          setOpen(false);
                        }}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-[rgb(var(--text))] hover:bg-[rgb(var(--surface))]"
                      >
                        {c}

                        {selected === c && (
                          <Check
                            size={16}
                            className="text-[rgb(var(--primary))]"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button className="rounded-lg bg-[rgb(var(--primary))] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
            Save Changes
          </button>
        </div>
      </div>
  );
};

export default ProfileSettings;