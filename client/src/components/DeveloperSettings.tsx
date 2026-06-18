import {
  Mail,
  Briefcase,
  Coffee,
  GitBranchPlus,
  ConeIcon,
} from "lucide-react";

const DeveloperSettings = () => {
  const techStack = [
    "HTML",
    "CSS",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "JavaScript",
    "Tailwind CSS",
    "Firebase",
    "REST APIs",
    "Git",
    "AI Integration",
    "C++",
    "Python",
    "NumPy",
    "Pandas",
    "Matplotlib",
  ];

  return (
    <div className="max-w-5xl space-y-8">
      {/* Hero */}
      <div className="rounded-2xl border border-[rgb(var(--border))] p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[rgb(var(--primary))] text-3xl font-bold text-white">
            SM
          </div>

          <div className="flex-1">
            <p className="text-xs font-semibold tracking-widest text-[rgb(var(--primary))] uppercase">
              Founder & Developer
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Prince Singh
            </h1>

            <p className="mt-1 text-lg text-[rgb(var(--muted-foreground))]">
              Softwere Developer
            </p>

            <p className="mt-4 max-w-3xl leading-7 text-[rgb(var(--muted-foreground))]">
              Building modern web applications, AI-powered products,
              finance management systems, portfolio builders and
              scalable full-stack solutions with a strong focus on
              performance, user experience and clean design.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-[rgb(var(--border))] p-4 text-center">
            <h3 className="text-2xl font-bold">10+</h3>
            <p className="text-sm text-[rgb(var(--muted-foreground))]">
              Projects
            </p>
          </div>

          <div className="rounded-xl border border-[rgb(var(--border))] p-4 text-center">
            <h3 className="text-2xl font-bold">Full</h3>
            <p className="text-sm text-[rgb(var(--muted-foreground))]">
              Stack
            </p>
          </div>

          <div className="rounded-xl border border-[rgb(var(--border))] p-4 text-center">
            <h3 className="text-2xl font-bold">AI</h3>
            <p className="text-sm text-[rgb(var(--muted-foreground))]">
              Integrations
            </p>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="rounded-2xl border border-[rgb(var(--border))] p-6">
        <h2 className="mb-4 text-xl font-semibold">
          About Developer
        </h2>

        <p className="leading-7 text-[rgb(var(--muted-foreground))]">
          Hi 👋 I'm Prince Singh, a Softwere Developer focused
          on creating beautiful, fast, and scalable applications.
          I enjoy working with React, Node.js, MongoDB, Express,
          Tailwind CSS, AI integrations, and modern web
          technologies.
        </p>
      </div>

      {/* Tech Stack */}
      <div className="rounded-2xl border border-[rgb(var(--border))] p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Tech Stack
        </h2>

        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[rgb(var(--border))] px-3 py-1.5 text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Portfolio */}
      <div className="rounded-2xl border border-[rgb(var(--border))] p-6">
        <div className="flex items-start gap-4">
          <Briefcase
            size={24}
            className="mt-1 text-[rgb(var(--primary))]"
          />

          <div className="flex-1">
            <h2 className="text-xl font-semibold">
              Portfolio
            </h2>

            <p className="mt-2 text-[rgb(var(--muted-foreground))]">
              Explore my projects, experience, and latest work.
            </p>

            <button className="mt-4 rounded-lg bg-[rgb(var(--primary))] px-5 py-2.5 font-medium text-white transition hover:opacity-90">
              Visit Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="rounded-2xl border border-[rgb(var(--border))] p-6">
        <div className="flex items-start gap-4">
          <Coffee
            size={24}
            className="mt-1 text-[rgb(var(--primary))]"
          />

          <div className="flex-1">
            <h2 className="text-xl font-semibold">
              Support Development ☕
            </h2>

            <p className="mt-2 text-[rgb(var(--muted-foreground))]">
              Enjoying Expense Tracker? Support future updates and
              help bring new features to life.
            </p>

            <button className="mt-4 rounded-lg bg-[rgb(var(--primary))] px-5 py-2.5 font-medium text-white transition hover:opacity-90">
              Support Developer
            </button>
          </div>
        </div>
      </div>

      {/* Connect */}
      <div className="rounded-2xl border border-[rgb(var(--border))] p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Connect With Me
        </h2>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] px-4 py-2 hover:bg-[rgb(var(--surface-hover))]">
            <GitBranchPlus size={18} />
            GitHub
          </button>

          <button className="flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] px-4 py-2 hover:bg-[rgb(var(--surface-hover))]">
            <ConeIcon size={18} />
            LinkedIn
          </button>

          <button className="flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] px-4 py-2 hover:bg-[rgb(var(--surface-hover))]">
            <Mail size={18} />
            Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeveloperSettings;