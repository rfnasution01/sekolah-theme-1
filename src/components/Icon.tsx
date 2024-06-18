export function IconComponent({
  icon,
  title,
}: {
  icon: JSX.Element
  title: string
}) {
  return (
    <div className="flex items-center gap-x-8">
      {icon}
      <p>{title}</p>
    </div>
  )
}
