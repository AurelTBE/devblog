import React from 'react'

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

interface Props {
    post: IPost
}

const PostDetail = ({post}: Props) => {
    console.log(post.content)
    return (
        <div className=''>
            <h1>
                Post detail
            </h1>
        </div>

    )
}

export default PostDetail
