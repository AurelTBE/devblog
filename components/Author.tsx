import React from 'react'
import Image from 'next/image'

interface IAuthor {
    bio: string;
    name: string;
    id: string;
    photo: IPhoto;
}

interface IPhoto {
    url: string;
}
  
interface Props {
    author: IAuthor
}

const Author = ({ author }: Props) => {
    return (
        <div className='relative p-12 mt-20 mb-8 text-center bg-black rounded-lg bg-opacity-20'>
            <div className='absolute left-0 right-0 -top-14'>
                <Image 
                    src={author.photo.url}
                    unoptimized
                    alt={author.name} 
                    width="100px" 
                    height="100px"
                    className='align-middle rounded-full'
                />
            </div>
            <h3 className='my-4 text-xl font-bold text-white'>
                {author.name}
            </h3>
            <p className='text-lg text-white'>
                {author.bio}
            </p>
        </div>
    )
}

export default Author
