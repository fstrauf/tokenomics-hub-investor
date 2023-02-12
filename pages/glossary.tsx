import Layout from '../components/layout'
// import glossary from '../components/glossary/glossary'
import React from 'react'
import fs from 'fs'
import { micromark } from 'micromark'

export default function Glossary(props) {
  return (
    <>
      <Layout>
        <article className="prose mt-5 mb-5 lg:prose-xl">
          <div dangerouslySetInnerHTML={{ __html: props.htmlContent }} />
        </article>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  var path = require('path')
//   const configDirectory = path.resolve(process.cwd(), 'pages')
  const configDirectory = path.resolve(process.cwd(), 'components/glossary')

  const file = fs.readFileSync(
    path.join(configDirectory, 'glossary.md'),
    'utf8'
  )

  const htmlContent = micromark(file)

  return {
    props: { htmlContent: htmlContent || null },
  }
}
