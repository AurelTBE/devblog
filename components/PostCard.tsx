import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import { BsCalendar4Event } from 'react-icons/bs'

export interface IPost {
    author:        IAuthor;
    createdAt:     Date;
    slug:          string;
    title:         string;
    excerpt:       string;
    featuredImage: IFeaturedImage;
    categories:    ICategory[];
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

interface Props {
    post: IPost
}

const PostCard = ({post}: Props) => {
    return (
        <div className='p-0 pb-12 mb-8 bg-white rounded-lg shadow-lg lg:p-8'>
            <div className='relative mb-6 overflow-hidden shadow-md pb-80'>
                <img
                    src={post.featuredImage.url}
                    alt={post.title}
                    className='absolute object-cover object-top w-full rounded-t-lg shadow-lg h-80 lg:rounded-lg'
                />
            </div>
            <h1 className='mb-8 text-3xl font-semibold text-center transition duration-700 cursor-pointer hover:text-pink-600'>
                <Link href={`/post/${post.slug}`}>
                    {post.title}
                </Link>
            </h1>
            <div className='items-center justify-center block w-full mb-8 text-center lg:flex'>
                <div className='flex items-center justify-center w-full mb-4 mr-8 lg:mb-0 lg:w-auto'>
                    <img
                        src={post.author.photo.url}
                        alt={post.author.name}
                        width='30px'
                        height='30px'
                        className='align-middle rounded-full'
                    />
                    <p className='inline ml-2 text-lg text-gray-700 align-middle'>{post.author.name}</p>
                </div>
                <div className='mr-2 font-medium text-gray-700'>
                    <BsCalendar4Event />
                </div>
                <span>
                    {moment(post.createdAt).format('L')}
                </span>
            </div>
            <p className='px-4 mb-8 text-lg font-normal text-center text-gray-700 lg:px-20'>
                {post.excerpt}
            </p>
            <div className='text-center'>
                <Link 
                    href={`/post/${post.slug}`}
                >
                    <span className='inline-block px-8 py-3 text-lg font-medium text-white transition duration-500 transform bg-pink-600 rounded-full cursor-pointer hover:-translate-y-1'>
                        Lire la suite
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default PostCard
