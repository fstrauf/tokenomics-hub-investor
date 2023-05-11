import Link from 'next/link'

export default function ProductCard({
  title,
  description,
  price,
  termsLink,
  purchaseLink,
  purchaseLink2 = {},
}) {
  return (
    <div className="flex h-96 w-72 flex-col items-center justify-between rounded-lg bg-white p-4 shadow-md">
      <h2 className="text-center text-xl font-bold">{title}</h2>
      <p className="text-center text-gray-600">{description}</p>
      <p className="mt-4 text-lg font-bold">{price}</p>
      <Link href={termsLink} className="text-xs text-blue-500 underline">
        Scope, Terms & Conditions
      </Link>
      <div className="flex gap-4">
        <Link href={purchaseLink?.link}>
          <button className="mt-4 rounded-full bg-dao-red py-2 px-4 text-white">
            {purchaseLink?.name}
          </button>
        </Link>
        {Object.keys(purchaseLink2).length > 0 && (
          <Link href={purchaseLink2?.link}>
            <button className="mt-4 rounded-full bg-dao-red py-2 px-4 text-white">
              {purchaseLink2?.name}
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}
