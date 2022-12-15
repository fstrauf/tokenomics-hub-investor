// import { getAllPostsForHome } from '../lib/api'
import Layout from '../components/layout'
import Intro from '../components/intro'
import Image from 'next/image'
import Link from 'next/link'


export default function tokenomicshub() {

    return (
        <>
            <Layout>
                <Intro />
                <div className='max-w-xl md:max-w-4xl m-auto'>
                    <h1 className='text-xl'>Design your own tokenomics using our tools and help from our community.</h1>
                    <div className='flex mt-5'>
                        <div className='w-[384px] h-[276px] relative object-scale-down'>
                            <Image layout='fill' src='/tdf.jpg' className="rounded-md" objectFit="contain" />
                        </div>
                        <div className='ml-10'>
                            <h1 className='text-2xl md:whitespace-nowrap'>Tokenomics Design Framework</h1>
                            <p className='mt-5'>Get your copy here and get started designing your own token.</p>
                            <Link href='https://www.figma.com/community/file/1146029367992730229'>
                                <button className="mt-5 rounded-md bg-dao-red px-6 py-4 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">Click Here</button>
                            </Link>
                        </div>
                    </div>
                    <hr class="my-4 mx-auto w-48 h-1 bg-gray-100 rounded border-0 md:my-10 dark:bg-gray-700"></hr>
                    <div>
                        <p className='mt-5 font-semibold'>Drop your Email below to get the basic calculation template for free here.</p>
                        <form className='mt-5' method="post" action="https://sendfox.com/form/m89qv6/mn87gq" class="sendfox-form" id="mn87gq" data-async="true" data-recaptcha="true">
                            <p><label for="sendfox_form_email">Email: </label><input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5 ' type="email" id="sendfox_form_email" placeholder="Email" name="email" required /></p>
                            <p className='mt-3'><label><input type="checkbox" name="gdpr" value="1" required /> I agree to receive email updates and promotions.</label></p>
                            {/* <!-- no botz please --> */}
                            <div className='' aria-hidden="true"><input type="text" name="a_password" tabindex="-1" value="" autocomplete="off" /></div>
                            <p><button className="mt-5 rounded-md bg-dao-red px-6 py-4 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" type="submit">Get Access Now!</button></p>
                        </form>
                        <script src="https://sendfox.com/js/form.js"></script>
                    </div>
                    <hr class="my-4 mx-auto w-48 h-1 bg-gray-100 rounded border-0 md:my-10 dark:bg-gray-700"></hr>
                    <div className='mb-5'>
                        <p className='mt-5 mb-5 font-semibold'>Access the full calculation template here.</p>
                        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
                        <stripe-pricing-table pricing-table-id="prctbl_1LmR42Ks0xSuCAmfiO54IWu1"
                            publishable-key="pk_live_51LUqnsKs0xSuCAmfmBBT45ICtEtzj8EkcJK7e2SFncAnbVzjEO4WFY9X3C8Ih1OlevrEAXZmiu86jszeLfQDJ5Xv000IKYBg6T">
                        </stripe-pricing-table>
                    </div>

                </div>
            </Layout>
        </>
    )
}