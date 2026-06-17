export const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse p-3 sm:p-4 md:p-6 space-y-6">

      {/* Header Skeleton */}
      <header className="flex items-center justify-between">
        {/* Left */}
        <div className="flex flex-col space-y-2">
          <div className="h-4 w-40 sm:w-52 rounded bg-[rgb(var(--surface))]" />
          <div className="h-3 w-28 sm:w-36 rounded bg-[rgb(var(--surface))]" />
        </div>

        {/* Right Button Skeleton */}
        <div className="flex items-center gap-2 rounded-lg px-3 py-2 bg-[rgb(var(--surface))]">
          <div className="h-4 w-4 rounded bg-[rgb(var(--surface))]" />
          <div className="h-4 w-20 rounded bg-[rgb(var(--surface))]" />
        </div>
      </header>
      {/* Stats (compact like StatCard) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl bg-[rgb(var(--surface))] p-4 sm:p-5"
          >
            <div className="flex items-center gap-3">

              {/* icon placeholder */}
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-[rgb(var(--card))]" />

              {/* text */}
              <div className="space-y-2 flex-1">
                <div className="h-2.5 w-16 sm:w-20 rounded bg-[rgb(var(--card))]" />
                <div className="h-5 sm:h-6 w-20 sm:w-24 rounded bg-[rgb(var(--card))]" />
                <div className="h-2 w-12 sm:w-16 rounded bg-[rgb(var(--card))]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">

        {/* Donut */}
        <div className="rounded-xl bg-[rgb(var(--surface))] p-4 sm:p-5">
          <div className="h-4 sm:h-5 w-28 sm:w-36 rounded bg-[rgb(var(--card))] mb-4 sm:mb-6" />

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">

            {/* donut smaller */}
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[rgb(var(--card))]" />

            {/* legend */}
            <div className="flex-1 space-y-3 w-full">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-3 sm:h-4 rounded bg-[rgb(var(--card))]"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Line */}
        <div className="rounded-xl bg-[rgb(var(--surface))] p-4 sm:p-5">
          <div className="h-4 sm:h-5 w-24 sm:w-32 rounded bg-[rgb(var(--card))] mb-4 sm:mb-6" />

          <div className="h-40 sm:h-52 md:h-64 rounded-lg bg-[rgb(var(--card))]" />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;