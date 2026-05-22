const LoadingSpinner = () => {
  return (
    <div className="flex h-96 items-center justify-center">
      <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
    </div>
  )
}

export default LoadingSpinner
