import React from 'react'
import { useRouter } from 'next/router'
import { getPosts, getPostDetails } from '../../services';
import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '../../components'
import { IPost, ICategory } from '../../types/post'


const Post = ({post}: {post:IPost}) => {
    const router = useRouter()

    if(router.isFallback) {
        return <Loader />
    }

    let catlist:string[] = []

    post?.categories.map((cat:ICategory) => {
        catlist = [...catlist, cat.slug]
    })

    return (
        <div className="container px-10 mx-auto mb-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                <div className="col-span-1 lg:col-span-8">
                    <PostDetail post={post} />
                    <Author author={post.author} />
                    <CommentsForm slug={post.slug} />
                    <Comments slug={post.slug} />
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
        fallback: true
    }
}