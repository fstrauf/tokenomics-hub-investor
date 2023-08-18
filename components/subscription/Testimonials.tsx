export default function Testimonials() {
  return (
    <>
     <div className="flex flex-col gap-5 items-center lg:p-10">
          <h1 className="prose mb-10 text-3xl font-bold leading-10 md:whitespace-nowrap">
            What other users say
          </h1>
          <section className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16 lg:px-6">
              <figure className="mx-auto max-w-screen-md">
                <svg
                  className="mx-auto mb-3 h-12 text-gray-400 dark:text-gray-600"
                  viewBox="0 0 24 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                    fill="currentColor"
                  />
                </svg>
                <blockquote>
                  <p className="lg:text-2xl font-medium text-gray-900 dark:text-white">
                    “Tokenomics DAO have performed a crucial audit of Goracle’s
                    Tokenomics. It provides investors and potential ecosystem
                    members with a trusted breakdown of how Goracle works and
                    where the $GORA token fits in. It also delivers to us
                    analysis from experts that allows us to think about areas to
                    improve on post-launch.”
                  </p>
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-center space-x-3">
                  {/* You can replace the src with Ahmed Ali's image if you have one */}
                  <img
                    className="h-7 w-11 rounded-full"
                    src="/goracle_logo.png"
                    alt="Goracle logo"
                  />
                  <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                    <div className="pr-3 font-medium text-gray-900 dark:text-white">
                      Ahmed Ali
                    </div>
                    <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                      CDO
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </section>
          <section className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16 lg:px-6">
              <figure className="mx-auto max-w-screen-md">
                <svg
                  className="mx-auto mb-3 h-12 text-gray-400 dark:text-gray-600"
                  viewBox="0 0 24 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                    fill="currentColor"
                  />
                </svg>
                <blockquote>
                  <p className="lg:text-2xl font-medium text-gray-900 dark:text-white">
                    “It was a pleasure working with Flo and Giorgio from the
                    Tokenomics DAO team. Incredibly knowledgeable and super nice
                    folk. We highly recommend to all beings.”
                  </p>
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-center space-x-3">
                  <img
                    className="h-7 w-7 rounded-full"
                    src="/oodlz.png"
                    alt="Oodlz Logo"
                  />
                  <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                    <div className="pr-3 font-medium text-gray-900 dark:text-white">James
                      Matthews
                    </div>
                    <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                      CEO
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </section>
        </div>
    </>
  )
}
