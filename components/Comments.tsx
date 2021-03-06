import React, {useState, useEffect} from 'react'
import moment from 'moment'
import parse from 'html-react-parser'
import { getComments } from '../services';

interface IComment {
    name: string
    createdAt?: Date
    comment: string
}

interface Props {
    slug: string
}

const Comments = ({slug}: Props) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        getComments(slug)
            .then((result) => setComments(result))
    }, [])

    return (
        <>
            {comments.length > 0 && (
                <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
                    <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                        {comments.length}
                        {' '}
                        {comments.length > 1 ? "commentaires" : "commentaire"}
                    </h3>
                    {comments.map((comment:IComment) => (
                        <div key={comment?.createdAt?.toString()} className="border-b border-gray-100 mb-4 pb-4">
                            <p className="mb-4">
                                <span className="font-semibold">{comment.name}</span>
                                {' '}
                                à
                                {' '}
                                {moment(comment.createdAt).format('L')}
                            </p>
                            <p className='whitespace-pre-line text-gray-600 w-full'>
                                {parse(comment.comment)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default Comments
