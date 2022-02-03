import Link from 'next/link'
import React from 'react'
import { urlFor } from '../sanity'
import { IPostType } from '../typings'

interface Props {
  posts: [IPostType]
}

const Posts = ({ posts }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6  lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post._id} href={`/post/${post.slug.current}`}>
          <div className="group cursor-pointer overflow-hidden rounded-lg border">
            <img
              className="h-60 w-full object-cover transition-transform duration-200 ease-in group-hover:scale-105"
              src={urlFor(post.mainImage).url()!}
              alt=""
            />
            <div className="flex justify-between bg-white p-5">
              <div>
                <p className="text-lg font-bold">{post.title}</p>
                <p className="text-sm">{post.description}</p>
              </div>

              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={urlFor(post.author.image).url()!}
                  alt={post.author.name}
                />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Posts
