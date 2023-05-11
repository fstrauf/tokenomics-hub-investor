// import { getAllPostsForHome } from '../lib/api'
import Layout from '../components/layout'
import Intro from '../components/intro'

export default function PivacyPolicy() {
  return (
    <>
      <Layout>
        <Intro />
        <div className="min-h-screen">
          <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
            <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>
            <p className="mb-4">
              Thank you for visiting Tokenomics Hub. Your privacy is important
              to us, and we want you to feel comfortable using our website. This
              Privacy Policy will inform you about what information we collect,
              how we use it, and what choices you have regarding the use of your
              personal information.
            </p>
            <h2 className="mb-4 text-xl font-bold">Information We Collect</h2>
            <p className="mb-4">
              When you use Tokenomics Hub, we may collect certain information
              about you, including:
            </p>
            <ul className="mb-4 ml-6 list-disc">
              <li>
                Your name and email address if you sign up for our newsletter
              </li>
              <li>Information about your device and browser</li>
              <li>Your IP address</li>
              <li>
                Your activity on our website, including pages visited and links
                clicked
              </li>
            </ul>
            <p className="mb-4">
              We may use cookies and other tracking technologies to collect this
              information. You can disable cookies in your browser settings, but
              please note that some features of our website may not function
              properly if you do so.
            </p>
            <h2 className="mb-4 text-xl font-bold">
              How We Use Your Information
            </h2>
            <p className="mb-4">
              We use the information we collect to provide and improve our
              services, to communicate with you, and to personalize your
              experience on our website. We may also use your information for
              other purposes with your consent or as permitted by law.
            </p>
            <h2 className="mb-4 text-xl font-bold">Sharing Your Information</h2>
            <p className="mb-4">
              We do not sell or rent your personal information to third parties.
              We may share your information with service providers who assist us
              in operating our website, conducting our business, or servicing
              you. We may also disclose your information if required by law or
              to protect our rights or the rights of others.
            </p>
            <h2 className="mb-4 text-xl font-bold">Security</h2>
            <p className="mb-4">
              We take reasonable measures to protect your personal information
              from unauthorized access, use, and disclosure. However, no method
              of transmission over the internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security.
            </p>
            <h2 className="mb-4 text-xl font-bold">Links to Other Websites</h2>
            <p className="mb-4">
              Our website may contain links to other websites that are not under
              our control. We are not responsible for the privacy practices or
              content of those websites.
            </p>
            <h2 className="mb-4 text-xl font-bold">
              Changes to Our Privacy Policy
            </h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page.
            </p>
            <h2 className="mb-4 text-xl font-bold">Contact Us</h2>{' '}
            <p className="mb-4">
              If you have any questions or concerns about this Privacy Policy,
              please contact us at <a href='mailto:contact@tokenomicsdao.com'>contact@tokenomicsdao.com</a>.
            </p>
          </div>
        </div>
      </Layout>
    </>
  )
}
