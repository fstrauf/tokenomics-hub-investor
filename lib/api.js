import client, { previewClient } from './sanity'

const getUniquePosts = (posts) => {
  const slugs = new Set()
  return posts.filter((post) => {
    if (slugs.has(post.slug)) {
      return false
    } else {
      slugs.add(post.slug)
      return true
    }
  })
}

const postFields = `
  _id,
  shortDescription,
  title,
  'date': publishedAt,
  excerpt,
  demandDrivers,
  tokenUtility,
  valueCapture,
  valueCreation,
  'slug': slug.current,
  'coverImage': mainImage,
  'catTitle': categories[0]->{title},
  resources,
  timeline,
  thirdPartyResources,
  'tags': tags[]->{title},
`

// 'author': author->{name, 'picture': image.asset->url},
const getClient = (preview) => (preview ? previewClient : client)

export async function getPreviewPostBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "protocols" && slug.current == $slug] | order(publishedAt desc){
      ${postFields}
      body
    }`,
    { slug }
  )
  return data[0]
}

export async function getAllPostsWithSlug() {
  const data = await client.fetch(`*[_type == "protocols"]{ 'slug': slug.current }`)
  return data
}

export async function getAllPostsForHome(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "protocols"] | order(publishedAt desc){
      ${postFields}
    }`)
  return getUniquePosts(results)
}

export async function getPostsForSearch(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "protocols"] {
      "objectID": _id,
        title,
       'slug': slug.current,
      _createdAt,
      _rev,
      categories[]->{title},
      demandDrivers,
       "ourTake": pt::text(ourTake[
        _type == "block" && style in ["h1", "h2", "h3", "normal"]
      ]),
       "body": pt::text(body[
        _type == "block" && style in ["h1", "h2", "h3", "normal"]
      ]),
      shortDescription,
      tokenUtility,
      valueCapture,
      valueCreation,
      tags,
}`)
  // return getUniquePosts(results)
  return results
}


export async function getPostAndMorePosts(slug, preview) {
  const curClient = getClient(preview)
  const [post, morePosts] = await Promise.all([
    curClient
      .fetch(
        `*[_type == "protocols" && slug.current == $slug] | order(_updatedAt desc) {
        ${postFields}
        body,
        ourTake,
      }`,
        { slug }
      )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "protocols" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc){
        ${postFields}
        body,
      }[0...4]`,
      { slug }
    ),
  ])
  return { post, morePosts: getUniquePosts(morePosts) }
}


// 'comments': *[
//   _type == "comment" && 
//   protocols._ref == ^._id && 
//   approved == true] {
// _id, 
// name, 
// email, 
// comment, 
// _createdAt
// }