export function IconLabel({
  icon,
  label,
}: {
  icon: JSX.Element
  label: string | number
}) {
  return (
    <div className="flex items-center gap-12">
      <span>{icon}</span>
      <p className="text-nowrap">{label}</p>
    </div>
  )
}
