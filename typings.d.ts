export interface IPostType {
  _id: string
  _createdAt: string
  title: string
  author: {
    image: string
    name: string
  }
  comment: ICommentType[]
  description: string
  mainImage: {
    asset: {
      url: string
    }
  }
  slug: {
    _type: string
    current: string
  }
  body: [object]
}

export interface ICommentType {
  approved: boolean
  comment: string
  email: string
  name: string
  post: {
    _ref: string
    _type: string
  }
  _createAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
}
