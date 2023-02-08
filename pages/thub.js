// import { getAllPostsForHome } from '../lib/api'
import Layout from '../components/layout'
// import Intro from '../components/intro'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'

export default function tokenomicshub() {
  return (
    <>
      <Layout>
        {/* <Intro /> */}
        <div className="m-auto mt-10 max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
          <h1 className="text-xl">
            Design your own tokenomics using our tools and help from our
            community.
          </h1>
          <div className="mt-5 flex">
            <div className="relative h-[276px] w-[384px] object-scale-down">
              <Image
                layout="fill"
                src="/tdf.jpg"
                className="rounded-md"
                objectFit="contain"
              />
            </div>
            <div className="ml-10">
              <h1 className="text-2xl md:whitespace-nowrap">
                Tokenomics Design Framework
              </h1>
              <p className="mt-5">
                Get your copy here and get started designing your own token.
              </p>
              <Link href="https://www.figma.com/community/file/1146029367992730229">
                <button className="mt-5 rounded-md bg-dao-red px-6 py-4 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  Click Here
                </button>
              </Link>
            </div>
          </div>
          <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>
          <div>
            <p className="mt-5 font-semibold">
              Drop your Email below to get the basic calculation template for
              free here.
            </p>
            <form
              method="post"
              action="https://sendfox.com/form/m89qv6/m748dd"
              class="sendfox-form"
              id="m748dd"
              data-async="true"
              data-recaptcha="true"
            >
              <p>
                {/* <label for="sendfox_form_email">Email: </label> */}
                <input
                  type="email"
                  id="sendfox_form_email"
                  placeholder="Email"
                  name="email"
                  className="mt-2 mb-2 block w-60 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                  required
                />
              </p>
              {/* <!-- no botz please --> */}
              <div
                // style="position: absolute; left: -5000px;"
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="a_password"
                  tabindex="-1"
                  value=""
                  autocomplete="off"
                />
              </div>
              <p>
                <button
                  className="mt-5 rounded-md bg-dao-red px-6 py-4 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  type="submit"
                >
                  Get Access Now!
                </button>
              </p>
            </form>
            <script src="https://sendfox.com/js/form.js"></script>

            {/* <form method="post" action="https://sendfox.com/form/m89qv6/mn87gq" class="sendfox-form" id="mn87gq" data-async="true" data-recaptcha="true">
              <p className="mt-5">
                <label htmlFor="sendfox_form_email">Email: </label>
                <input
                  className="block w-60 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                  type="email"
                  id="sendfox_form_email"
                  placeholder="Email"
                  name="email"
                  required
                />
              </p>
              <div className="mt-3">
                <label>
                  <input type="checkbox" name="gdpr" value="1" required /> I
                  agree to receive email updates and promotions.
                </label>
              </div>
              <div className="" aria-hidden="true">
                <input
                  type="text"
                  name="a_password"
                  tabIndex="-1"
                  value=""
                  autoComplete="off"
                />
              </div>
              <div>
                <button
                  className="mt-5 rounded-md bg-dao-red px-6 py-4 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  type="submit"
                >
                  Get Access Now!
                </button>
              </div>
            </form>
            <script src="https://sendfox.com/js/form.js"></script> */}
          </div>
          <hr className="my-4 mx-auto h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>
          <div className="mb-5">
            <div className="mt-5 mb-5 font-semibold">
              Access the full calculation template here.{' '}
              <a href="https://youtu.be/JyaJ0lGk2z4">
                <p>(see what's included)</p>
              </a>
            </div>
            <Script src="https://js.stripe.com/v3/pricing-table.js" async/>
            {/* <script
              async
              src="https://js.stripe.com/v3/pricing-table.js"
            ></script> */}
            <stripe-pricing-table
              pricing-table-id="prctbl_1LmR42Ks0xSuCAmfiO54IWu1"
              publishable-key="pk_live_51LUqnsKs0xSuCAmfmBBT45ICtEtzj8EkcJK7e2SFncAnbVzjEO4WFY9X3C8Ih1OlevrEAXZmiu86jszeLfQDJ5Xv000IKYBg6T"
            ></stripe-pricing-table>
          </div>
        </div>
      </Layout>
    </>
  )
}
