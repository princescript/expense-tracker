import { CheckCircle2, Code2, Heart } from "lucide-react";

const AboutSettings = () => {
  const features = [
    "Income Tracking",
    "Expense Management",
    "Savings Goals",
    "Budget Planning",
    "Analytics Dashboard",
    "Wallet Management",
    "Dark Mode UI",
    "Secure Authentication",
  ];

  const technologies = [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind CSS",
    "JWT",
    "Axios",
    "Chart.js",
  ];

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[rgb(var(--primary))] text-xl font-bold text-white">
            ET
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[rgb(var(--text))]">
              Expense Tracker
            </h2>
            <p className="text-sm text-[rgb(var(--muted))]">
              Version 1.0.0
            </p>
          </div>
        </div>

        <p className="mt-5 leading-7 text-[rgb(var(--muted))]">
          Expense Tracker is a modern personal finance management application
          designed to help users monitor income, expenses, budgets, savings
          goals, and financial growth in a simple and beautiful way.
        </p>
      </div>
      {/* Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[rgb(var(--text))]">
          Features
        </h3>

        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4"
            >
              <CheckCircle2
                size={18}
                className="text-[rgb(var(--primary))]"
              />

              <span className="text-sm text-[rgb(var(--text))]">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Tech Stack */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[rgb(var(--text))]">
          Technology Stack
        </h3>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 py-1 text-sm text-[rgb(var(--text))]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* App Details */}
      <div>
        <h3 className="mb-5 text-lg font-semibold text-[rgb(var(--text))]">
          Application Details
        </h3>

        <div className="overflow-hidden rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))]">
          {[
            ["Application", "Expense Tracker"],
            ["Version", "v1.0.0"],
            ["Developer", "Prince Singh"],
            ["License", "Personal Project"],
            ["Release", "2026"],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={`flex justify-between p-4 ${index !== 4 ? "border-b border-[rgb(var(--border))]" : ""
                }`}
            >
              <span className="text-sm text-[rgb(var(--muted))]">
                {label}
              </span>
              <span className="text-sm font-medium text-[rgb(var(--text))]">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Message */}
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
        <div className="mb-4 flex items-center gap-2">
          <Heart size={18} className="text-[rgb(var(--primary))]" />
          <h3 className="font-semibold text-[rgb(var(--text))]">
            Message From Developer
          </h3>
        </div>

        <p className="leading-7 text-[rgb(var(--muted))]">
          Thank you for using Expense Tracker. This project was built to
          provide a clean, secure, and intuitive finance management experience.
          Future updates will include AI-powered insights, advanced analytics,
          recurring transactions, and cloud backup.
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 text-sm text-[rgb(var(--muted))]">
        <Code2 size={16} />
        Built with passion for modern finance management
      </div>

    </div>
  );
};

export default AboutSettings;