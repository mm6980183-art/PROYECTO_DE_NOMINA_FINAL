const WidgetPanel = ({ title, children }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

export default WidgetPanel
