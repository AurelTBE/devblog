import React, { useState, useEffect } from 'react'
import moment from 'moment'
import 'moment/locale/fr';
import Link from 'next/Link'
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
    slug: any
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
        <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                {slug ? "Related Posts" : "Recent Posts" }
            </h3>
            {relatedPosts && relatedPosts.map((post: IPost) => (
                <div key={post.title} className="flex items-center w-full mb-4">
                    <div className='w-16 flex-none'>
                        <img src={post.featuredImage.url} alt={post.title} width="60px" height="60px" className='align-middle rounded-full'/>
                    </div>
                    <div className="flex-grow ml-4">
                        <p className="text-gray-500 text-xs">
                            {moment(post.createdAt).format('ll')}
                        </p>
                        <Link href={`/posts/${post.slug}`} key={post.title+Math.random()}>
                            <span className="text-md cursor-pointer">{post.title}</span>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostWidget
