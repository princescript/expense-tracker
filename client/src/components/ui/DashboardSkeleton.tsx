export const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="h-8 w-48 rounded bg-card mb-2" />
          <div className="h-4 w-36 rounded bg-card" />
        </div>

        <div className="h-12 w-36 rounded-xl bg-card" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl p-5 bg-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface" />

              <div className="flex-1">
                <div className="h-4 w-20 rounded bg-surface mb-2" />
                <div className="h-8 w-32 rounded bg-surface mb-2" />
                <div className="h-3 w-16 rounded bg-surface" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Donut */}
        <div className="rounded-2xl p-5 bg-card">
          <div className="h-6 w-48 rounded bg-surface mb-6" />

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-52 h-52 rounded-full bg-surface" />

            <div className="flex-1 space-y-4 w-full">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-5 rounded bg-surface" />
              ))}
            </div>
          </div>
        </div>

        {/* Line */}
        <div className="rounded-2xl p-5 bg-card">
          <div className="h-6 w-40 rounded bg-surface mb-6" />

          <div className="h-75 rounded-xl bg-surface" />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;