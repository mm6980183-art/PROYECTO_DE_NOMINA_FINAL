const StatCard = ({ title, value, subtitle, icon }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900 leading-tight whitespace-normal break-words">{value}</p>
        </div>
        <div className="flex-none rounded-2xl bg-slate-100 p-2 text-slate-700 text-xl sm:p-3 sm:text-2xl">{icon}</div>
      </div>
      {subtitle && <p className="mt-4 text-sm text-slate-500">{subtitle}</p>}
    </div>
  )
}

export default StatCard
