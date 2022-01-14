import Head from 'next/head'
import { PostCard, Categories, PostWidget } from '../components'
import { getPosts } from '../services'
import { FeaturedPosts } from '../sections'
import { IPosts } from '../types/posts';

export default function Home({posts}: {posts:IPosts[]}) {
  return (
    <div className="container px-10 mx-auto mb-8">
      <Head>
        <title>My blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className='grid grid-cols-1 gap-12 lg:grid-cols-12'>
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post:IPosts) => <PostCard post={post.node} key={post.node.title} />)}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className='relative lg:sticky top-8'>
            <PostWidget categories={""} slug="" />
            <Categories />
          </div>
        </div>
      </div>

    </div>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || []

  return {
    props: {
      posts
    }
  }
}
