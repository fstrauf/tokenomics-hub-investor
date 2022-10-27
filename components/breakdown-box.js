export default function BreakdownBox({ value, title }) {
  return (
    <div className="m-2">
      <label className="font-bold">{title}</label>
      <div className="">{value}</div>
    </div>
  )
}
