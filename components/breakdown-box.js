export default function BreakdownBox({ value, title }) {
  return (
    <div className="m-2">
      <label className="text-white font-bold">{title}</label>
      <div className="text-white">{value}</div>
    </div>
  )
}
