// import { getAllPostsForHome } from '../lib/api'
import Layout from '../components/layout'
import Intro from '../components/intro'

export default function AboutUs() {
  return (
    <>
      <Layout>
        <Intro />
        <div className="max-w-2xl flex flex-col items-center justify-center m-auto prose">
          <h1 className="text-3xl">About Us</h1>
          <h2 className="mt-10 text-2xl">Manifesto</h2>
          <h3 className="text-1xl mt-10 font-bold">We are not credentialists.</h3>
          <p className="mt-10 mb-20 text-center font-normal">
            We believe that web3 is open to everyone who is interested, wants to
            create value and believes that the best ideas will win.<br/><br/> To become a
            part of our community, all you need is to show up and contribute –
            no degree, CV or experience necessary. We run on curiosity.
          </p>
          <h3 className="text-1xl mt-10 font-bold">
            We make Tokenomics Relevant. For Everyone.
          </h3>
          <p className="mt-10 mb-20 text-justify font-normal">
            We actively support mass market adoption of web3 and crypto. We do
            this by creating content that is easy to understand. <br/><br/>Crucial
            information about projects is often buried deep inside scientific
            papers, we work to uncover this treasure, simplify and share it.
          </p>
          <h3 className="text-1xl mt-10 font-bold">
            We reduce uncertainty for web3 investors and builders.
          </h3>
          <p className="mt-10 mb-20 text-justify font-normal">
            We strive to answer the key question of tokenomics: why do some
            tokens/projects/communities work and others fail? We are building an
            ever-expanding tokenomics framework to help reduce risk and increase
            transparency.
          </p>
          <h3 className="text-1xl mt-10 font-bold">We explore anything web3.</h3>
          <p className="mt-10 mb-20 text-justify font-normal">
            We believe that web3 is a freedom movement. We will not be tied to
            any specific project, technology or token. We go wherever our
            curiosity takes us and create value when we get there.
          </p>
          <h3 className="text-1xl mt-10 font-bold">
            We share our knowledge with the community.
          </h3>
          <p className="mt-10 mb-20 text-justify font-normal">
            We believe in the power of the hive-mind and prefer to source all
            talent and know-how from our community. It is our goal to set up a
            token-structure that allows the community to own a piece of the
            Tokenomics DAO.
          </p>
        </div>
      </Layout>
    </>
  )
}
