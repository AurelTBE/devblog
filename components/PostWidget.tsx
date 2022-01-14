import React, { useState, useEffect } from 'react'
import moment from 'moment'
import 'moment/locale/fr';
import Link from 'next/link'
import { getRecentPosts, getSimilarPosts } from '../services';


interface IPost {
    title:         string;
    featuredImage: IFeaturedImage;
    createdAt:     Date;
    slug:          string;
}

interface IFeaturedImage {
    url: string;
}

interface Props {
    categories: any,
    slug: string
}

const PostWidget = ({ categories, slug }: Props) => {
    const [relatedPosts, setRelatedPosts] = useState([])

    useEffect(() => {
        if(slug) {
            getSimilarPosts(categories, slug)
            .then((result) => setRelatedPosts(result))
        } else {
            getRecentPosts()
            .then((result) => setRelatedPosts(result))
        }
    }, [slug])
    
    return (
        <div className='p-8 mb-8 bg-white rounded-lg shadow-lg'>
            <h3 className='pb-4 mb-8 text-xl font-semibold border-b'>
                {slug ? "Related Posts" : "Recent Posts" }
            </h3>
            {relatedPosts && relatedPosts.map((post: IPost) => (
                <div key={post.title} className="flex items-center w-full mb-4">
                    <div className='flex-none w-16'>
                        <img src={post.featuredImage.url} alt={post.title} width="60px" height="60px" className='align-middle rounded-full'/>
                    </div>
                    <div className="flex-grow ml-4">
                        <p className="text-xs text-gray-500">
                            {moment(post.createdAt).format('ll')}
                        </p>
                        <Link href={`/post/${post.slug}`} key={post.title+Math.random()}>
                            <span className="cursor-pointer text-md">{post.title}</span>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostWidget
