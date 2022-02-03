import { GetStaticProps } from 'next'

import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { IPostType } from '../../typings'
import React from 'react'
import PostContent from '../../components/Post'
import Comments from '../../components/Comments'
import CommentForm from '../../components/CommentForm'

interface Props {
  post: IPostType
}

const Post = ({ post }: Props) => {
  return (
    <main>
      <Header />

      <img
        className="h-40 w-full object-cover"
        src={urlFor(post.mainImage).url()!}
        alt={post.title}
      />

      {/* Post Content */}
      <PostContent post={post} />

      <hr className="my-5 mx-auto max-w-lg border border-yellow-400" />

      {/* Comment form */}
      <CommentForm postId={post._id} />

      {/*Comment*/}
      <Comments comments={post.comment} />
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
    _id,
    slug {
     current
    }
  }`
  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: IPostType) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    author -> {
     name,
     image
    },
    "comment": *[
      _type == "comment" && 
      post._ref == ^._id && 
      approved == true],
    description,
    mainImage,
    slug,
    body
  }`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}
