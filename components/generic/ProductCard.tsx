import Link from 'next/link'

export default function ProductCard({
  title,
  description,
  price,
  termsLink,
  purchaseLink,
}) {
  return (
    <div className="flex h-96 flex-col rounded-lg bg-white p-4 shadow-md w-72 items-center justify-between">
      <h2 className="text-xl font-bold text-center">{title}</h2>
      <p className="text-gray-600 text-center">{description}</p>
      <p className="mt-4 text-lg font-bold">{price}</p>
      <Link href={termsLink} className="text-blue-500 underline text-xs">
        Scope, Terms & Conditions
      </Link>
      <Link href={purchaseLink}>
        <button className="mt-4 rounded-full bg-dao-red py-2 px-4 text-white">
          Purchase
        </button>
      </Link>
    </div>
  )
}
