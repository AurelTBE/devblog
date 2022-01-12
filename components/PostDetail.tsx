import React from 'react'
import moment from 'moment'
import { BsCalendar4Event } from 'react-icons/bs'

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
    const getContentFragment = (index: number, text: string, obj:any, type?:string) => {
        let modifiedText:any = text;
        console.log(obj)
        if (obj) {
          if (obj.bold) {
            modifiedText = (<b key={index}>{text}</b>);
          }
    
          if (obj.italic) {
            modifiedText = (<em key={index}>{text}</em>);
          }
    
          if (obj.underline) {
            modifiedText = (<u key={index}>{text}</u>);
          }
        }

        switch (type) {
            case 'heading-three':
                return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item:string, i:number) => {<React.Fragment key={i}>{item}</React.Fragment>})}</h3>;
            case 'paragraph':
                return <p key={index} className="mb-8">{modifiedText.map((item:string, i:number) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
            case 'heading-four':
                return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item:string, i:number) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
            case 'code-block':
                return <code key={index} className="text-md font-semibold mb-4 block bg-gray-100 p-8 shadow-inner rounded-lg">{modifiedText.map((item:string, i:number) => <React.Fragment key={i}>{item}</React.Fragment>)}</code>;
            case 'image':
                return (
                    <img
                        key={index}
                        alt={obj.title}
                        height={obj.height}
                        width={obj.width}
                        src={obj.src}
                    />
                );
          default:
            return modifiedText;
        }
      };

    return (
        <div className='bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>
            <div className='relative overflow-hidden shadow-md mb-6'>
                <img src={post.featuredImage.url} alt={post.title} className='object-top h-full w-full rounded-t-lg'/>
            </div>
            <div className='px-4 lg:px-0'>
                <div className="flex items-center mb-8 w-full">
                    <div className='flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8'>
                        <img
                            src={post.author.photo.url}
                            alt={post.author.name}
                            width='30px'
                            height='30px'
                            className='align-middle rounded-full'
                        />
                        <p className='inline align-middle text-gray-700 ml-2 text-lg'>{post.author.name}</p>
                    </div>
                    <div className='font-medium text-gray-700 mr-2'>
                        <BsCalendar4Event />
                    </div>
                    <span>
                        {moment(post.createdAt).format('L')}
                    </span>
                </div>
            </div>
            <h1 className='mb-8 text-3xl font-semibold'>
                {post.title}
            </h1>
            {post.content.raw.children.map((typeObj:any, index:number) => {
                const children = typeObj.children.map((item:any, itemIndex:number) => getContentFragment(itemIndex, item.text, item))

                return getContentFragment(index, children, typeObj, typeObj.type)
            })}
        </div>

    )
}

export default PostDetail
