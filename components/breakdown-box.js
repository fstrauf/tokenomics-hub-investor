export default function BreakdownBox({ value, title }) {
  return (
    <div className="m-2">
      <label className="font-bold">{title}</label>
      <div className="dark:text-white">{value}</div>
    </div>
  )
}
