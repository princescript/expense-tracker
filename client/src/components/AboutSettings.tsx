import {
  CheckCircle2,
  Code2,
  Heart,
} from "lucide-react";

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
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[rgb(var(--primary))] text-xl font-bold text-white">
            ET
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              Expense Tracker
            </h2>
            <p className="text-sm text-[rgb(var(--muted-foreground))]">
              Version 1.0.0
            </p>
          </div>
        </div>

        <p className="mt-6 leading-7 text-[rgb(var(--muted-foreground))]">
          Expense Tracker is a modern personal finance management
          application designed to help users monitor income,
          expenses, budgets, savings goals, and financial growth
          in a simple and beautiful way.
        </p>
      </div>

      {/* Features */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">
          Features
        </h3>

        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3 rounded-lg border border-[rgb(var(--border))] p-3"
            >
              <CheckCircle2
                size={18}
                className="text-[rgb(var(--primary))]"
              />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">
          Technology Stack
        </h3>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[rgb(var(--border))] px-3 py-1 text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Application Details */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">
          Application Details
        </h3>

        <div className="overflow-hidden rounded-xl border border-[rgb(var(--border))]">
          <div className="grid grid-cols-2 border-b border-[rgb(var(--border))] p-4">
            <span className="text-[rgb(var(--muted-foreground))]">
              Application
            </span>
            <span className="font-medium">Expense Tracker</span>
          </div>

          <div className="grid grid-cols-2 border-b border-[rgb(var(--border))] p-4">
            <span className="text-[rgb(var(--muted-foreground))]">
              Version
            </span>
            <span className="font-medium">v1.0.0</span>
          </div>

          <div className="grid grid-cols-2 border-b border-[rgb(var(--border))] p-4">
            <span className="text-[rgb(var(--muted-foreground))]">
              Developer
            </span>
            <span className="font-medium">Prince Singh</span>
          </div>

          <div className="grid grid-cols-2 border-b border-[rgb(var(--border))] p-4">
            <span className="text-[rgb(var(--muted-foreground))]">
              License
            </span>
            <span className="font-medium">Personal Project</span>
          </div>

          <div className="grid grid-cols-2 p-4">
            <span className="text-[rgb(var(--muted-foreground))]">
              Release
            </span>
            <span className="font-medium">2026</span>
          </div>
        </div>
      </div>

      {/* Developer Message */}
      <div className="rounded-xl border border-[rgb(var(--border))] p-6">
        <div className="mb-4 flex items-center gap-2">
          <Heart
            size={18}
            className="text-[rgb(var(--primary))]"
          />
          <h3 className="font-semibold">
            Message From Developer
          </h3>
        </div>

        <p className="leading-7 text-[rgb(var(--muted-foreground))]">
          Thank you for using Expense Tracker. This project was
          built to provide a clean, secure, and intuitive finance
          management experience. Future updates will include
          AI-powered insights, advanced analytics, recurring
          transactions, and cloud backup.
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 text-sm text-[rgb(var(--muted-foreground))]">
        <Code2 size={16} />
        Built with passion for modern finance management
      </div>
    </div>
  );
};

export default AboutSettings;