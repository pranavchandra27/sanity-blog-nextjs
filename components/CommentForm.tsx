import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

interface Props {
  postId: string
}

const CommentForm = ({ postId }: Props) => {
  const [submitted, setSubmitted] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true)
      })
      .catch((err) => {
        setSubmitted(false)
        console.error(err)
      })
  }

  return !submitted ? (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex max-w-2xl flex-col p-5"
    >
      <h3 className="text-sm text-yellow-500">Enjoyed the article?</h3>
      <h4 className="text-3xl font-bold">Leave a comment below!</h4>
      <h4 className="mt-2 py-3" />

      <input {...register('_id')} type="hidden" name="_id" value={postId} />

      <label className="mb-5 block ">
        <span className="text-grey-700">Name</span>
        <input
          {...register('name', { required: true })}
          className="form-input mt-1 block w-full rounded border py-2 px-3 shadow ring-yellow-500 focus:outline-none focus:ring"
          placeholder="John Doe"
          type="text"
        />
      </label>
      <label className="mb-5 block ">
        <span className="text-grey-700">Email</span>
        <input
          {...register('email', { required: true })}
          className="form-input mt-1 block w-full rounded border py-2 px-3 shadow ring-yellow-500 focus:outline-none focus:ring"
          placeholder="john@email.com"
          type="email"
        />
      </label>
      <label className="mb-5 block ">
        <span className="text-grey-700">Comment</span>
        <textarea
          {...register('comment', { required: true })}
          className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow ring-yellow-500 focus:outline-none focus:ring"
          rows={8}
          placeholder="This is very nice"
        />
      </label>

      <div className="flex flex-col p-5">
        {errors.name && (
          <span className="text-red-500"> -The name field is required</span>
        )}
        {errors.email && (
          <span className="text-red-500"> -The email field is required</span>
        )}
        {errors.comment && (
          <span className="text-red-500"> -The comment field is required</span>
        )}
      </div>

      <input
        type="submit"
        className="focus:shadow-outline -px-4  cursor-pointer rounded bg-yellow-500  py-2 font-bold text-white shadow hover:bg-yellow-400 focus:outline-none"
      />
    </form>
  ) : (
    <div className="my-10 mx-auto flex max-w-2xl flex-col bg-yellow-500 p-10 text-white">
      <h3 className="text-3xl font-bold">
        Thank you for submitting your comment
      </h3>
      <p>Once it has been approved, it will appear below!</p>
    </div>
  )
}

export default CommentForm
