import {
  Coffee,
  Mail,
  Link,
  Globe,

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

    <div className="space-y-8">
      {/* Hero */}
      <div className="flex flex-col gap-8 md:flex-row md:items-center">

        {/* LEFT: IMAGE */}
        <div className="w-full md:w-70 shrink-0">
          <div className="aspect-square w-full overflow-hidden rounded-2xl border border-[rgb(var(--border))]">
            <img
              src="https://res.cloudinary.com/eroma/image/upload/v1771235429/princeport_l2fgml.jpg"
              alt="profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        {/* RIGHT: CONTENT */}
        <div className="flex-1 space-y-3">
          <span className="inline-block px-4 py-1 rounded-2xl text-xs font-semibold uppercase tracking-widest border border-[rgb(var(--border))] text-[rgb(var(--primary))]">
            Founder & Developer
          </span>
          <h1 className="text-3xl font-bold text-[rgb(var(--text))] mt-2">
            Prince Singh
          </h1>
          <p className="text-lg text-[rgb(var(--muted))]">
            Software Developer
          </p>
          <p className="max-w-2xl leading-7 text-[rgb(var(--muted))]">
            Building modern web applications, AI-powered products,
            finance management systems, portfolio builders and scalable
            full-stack solutions with a strong focus on performance,
            user experience and clean design.
          </p>

          {/* STATS */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-[rgb(var(--surface))] p-4">
              <h3 className="text-2xl font-bold text-[rgb(var(--text))]">
                10+
              </h3>
              <p className="text-xs text-[rgb(var(--muted))]">Projects</p>
            </div>

            <div className="rounded-xl bg-[rgb(var(--surface))] p-4">
              <h3 className="text-2xl font-bold text-[rgb(var(--text))]">
                Full
              </h3>
              <p className="text-xs text-[rgb(var(--muted))]">Stack</p>
            </div>

            <div className="rounded-xl bg-[rgb(var(--surface))] p-4">
              <h3 className="text-2xl font-bold text-[rgb(var(--text))]">
                AI
              </h3>
              <p className="text-xs text-[rgb(var(--muted))]">Integrations</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
        {/* Header */}
        <h2 className="text-xl font-semibold text-[rgb(var(--text))]">
          About Developer
        </h2>
        {/* Content */}
        <p className="mt-3 leading-7 text-[rgb(var(--muted))]">
          Hi 👋 I'm Prince Singh, a Backend-focused Software Developer
          specializing in building scalable and secure applications using
          .NET, ASP.NET Core, and REST APIs. I work with database systems,
          authentication, and backend architecture, while also using React
          and Tailwind CSS to build clean and responsive user interfaces
          for full-stack applications.
        </p>
      </div>


      {/* Tech Stack */}
      <div className="rounded-2xl border border-[rgb(var(--border))] p-6">
        <h2 className="mb-4 text-xl font-semibold text-[rgb(var(--text))]">
          Tech Stack
        </h2>

        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-1.5 text-sm text-[rgb(var(--text))]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Portfolio */}
      <div className="rounded-2xl border border-[rgb(var(--border))] p-6">
        <div className="flex items-start gap-4">
          <Globe size={22} className="mt-1 text-[rgb(var(--primary))]" />

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-[rgb(var(--text))]">
              Portfolio
            </h2>

            <p className="mt-2 text-sm text-[rgb(var(--muted))]">
              Explore my projects, experience, and real-world work.
            </p>

            <button className="mt-4 rounded-lg bg-[rgb(var(--primary))] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
              Visit Portfolio
            </button>
          </div>
        </div>
      </div>


      {/* Support */}
      <div className="rounded-2xl border border-[rgb(var(--warning))]/30 bg-[rgb(var(--warning))]/5 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(var(--warning))]/10 text-[rgb(var(--warning))]">
            <Coffee size={18} />
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold text-[rgb(var(--text))]">
              Support Development ☕
            </h2>

            <p className="mt-2 text-sm text-[rgb(var(--muted))]">
              Enjoying this project? Support future updates and new features.
            </p>

            <button className="mt-4 rounded-lg bg-[rgb(var(--warning))] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 active:scale-[0.98]">
              Support Developer
            </button>
          </div>
        </div>
      </div>


      <div className="rounded-2xl border border-[rgb(var(--border))] p-6">
        <h2 className="mb-4 text-xl font-semibold text-[rgb(var(--text))]">
          Connect With Me
        </h2>

        <div className="flex flex-wrap gap-2">
          <button
            className=" flex items-center justify-center gap-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-1.5 text-sm text-[rgb(var(--text))]"
          >
            <Link size={16} />
            GitHub
          </button>
          <button
            className=" flex items-center justify-center gap-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-1.5 text-sm text-[rgb(var(--text))]"
          >
            <Globe size={16} />
            LinkedIn
          </button>
          <button
            className=" flex items-center justify-center gap-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-1.5 text-sm text-[rgb(var(--text))]"
          >
            <Mail size={16} />
            Email
          </button>
        </div>
      </div>
    </div>

  );
};

export default DeveloperSettings;