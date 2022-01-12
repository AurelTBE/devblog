import React from 'react'
import { getPosts, getPostDetails } from '../../services';
import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm } from '../../components'

export interface IPost {
    author:        IAuthor;
    createdAt:     Date;
    slug:          string;
    title:         string;
    excerpt:       string;
    featuredImage: IFeaturedImage;
    categories:    ICategory[];
    content:       IContent;
}

export interface IAuthor {
    bio:   string;
    name:  string;
    id:    string;
    photo: IFeaturedImage;
}

export interface IFeaturedImage {
    url: string;
}

export interface ICategory {
    name: string;
    slug: string;
}

export interface IContent {
    raw: IRaw;
}

export interface IRaw {
    children: any;
}

const Post = ({post}: {post:IPost}) => {
    let catlist:string[] = []

    post?.categories.map((cat:ICategory) => {
        catlist = [...catlist, cat.slug]
    })

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    <PostDetail post={post} />
                    <Author author={post.author} />
                    <CommentsForm slug={post.slug} />
                    <Comments />
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                        <PostWidget categories={catlist} slug={post.slug} />
                        <Categories />
                    </div>
                </div>
            </div>
            PostDetails
        </div>
    )
}

export default Post

export async function getStaticProps({ params }: any) {
    const data = await getPostDetails(params.slug)
  
    return {
      props: {
        post: data
      }
    }
}

export async function getStaticPaths() {
    const posts = await getPosts()

    return {
        paths: posts.map(({ node: { slug } }:{node:{slug:string}}) => ({ params: { slug }})),
        fallback: false
    }
}