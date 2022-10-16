export default function BreakdownBox({ value, title }) {
  return (
    <div className="flex items-center">
      <label title={title} />
      <div className="text-xl font-bold">{value}</div>
    </div>
  )
}
