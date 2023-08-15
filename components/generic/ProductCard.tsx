import Link from 'next/link'

export default function ProductCard({
  title,
  description,
  price,
  termsLink,
  purchaseLink,
  purchaseLink2 = {},
  highlight = false,
  included = [],
}) {
  return (
    <div
      className={`h-full w-full max-w-[296px] rounded-md bg-gradient-to-r ${
        highlight ? 'from-dao-red to-dao-green p-1' : ''
      }  shadow-md`}
    >
      <div
        className={`flex h-96 w-[288px] flex-col items-center justify-between rounded-lg bg-white p-4 `}
      >
        <h2 className="text-center text-xl font-bold">{title}</h2>
        <p className="text-center text-gray-600">{description}</p>
        <p className="mt-4 text-lg">{price}</p>
        {included.length > 0 && (
          <div className="prose my-3 max-w-xs text-xs">
            <p className="text-center font-bold">Included:</p>
            <ul className="">
              {included.map((i) => (
                <li className="">{i}</li>
              ))}
            </ul>
          </div>
        )}

        <Link href={termsLink} className="text-xs text-blue-500 underline">
          Scope, Terms & Conditions
        </Link>
        <div className="flex gap-4">
          <Link href={purchaseLink?.link}>
            <button className="mt-4 rounded-full bg-dao-red py-2 px-4 text-white" type='button'>
              {purchaseLink?.name}
            </button>
          </Link>
          {Object.keys(purchaseLink2).length > 0 && (
            <Link href={purchaseLink2?.link}>
              <button className="mt-4 rounded-full bg-dao-red py-2 px-4 text-white" type='button'>
                {purchaseLink2?.name}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
