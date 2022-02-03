import React from 'react'
import { ICommentType } from '../typings'

interface Props {
  comments: ICommentType[]
}

const Comments = ({ comments }: Props) => {
  return (
    <div className="my-10 mx-auto flex max-w-2xl flex-col space-y-2 rounded-sm p-10 shadow-md">
      <h3 className="text-4xl">Comments</h3>
      <hr className="pb-2" />
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>
            <span className="mr-2 text-yellow-500">{comment.name}:</span>
            {comment.comment}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Comments
