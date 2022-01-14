import React, { useState, useEffect, useRef } from 'react'
import { submitComment } from '../services';


interface Props {
    slug: string
}

const CommentsForm = ({ slug }: Props) => {
    const [error, setError] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const commentEl = useRef<HTMLFormElement>()
    let nameEl = useRef<HTMLFormElement>()
    let emailEl = useRef<HTMLFormElement>()
    const storeDataEl = useRef<HTMLFormElement>()

    useEffect(() => {
        if(nameEl && nameEl.current) {
            nameEl.current.value = window.localStorage.getItem("name")
        }
        if(emailEl && emailEl.current) {
            emailEl.current.value = window.localStorage.getItem("email")
        }
    }, [])

    const handleCommentSubmission = () => {
        setError(false)
        const { value: comment } = (commentEl && commentEl.current && commentEl.current.value) && commentEl.current
        const { value: name } = (nameEl && nameEl.current && nameEl.current.value) && nameEl.current
        const { value: email } = (emailEl && emailEl.current && emailEl.current.value) && emailEl.current
        const { checked: storeData } = (storeDataEl && storeDataEl.current && storeDataEl.current.value) && storeDataEl.current

        if(!comment || !name || !email) {
            setError(true)
            return
        }

        const commentObj = { name, email, comment, slug }

        if(storeData) {
            window.localStorage.setItem("name", name)
            window.localStorage.setItem("email", email)
        } else {
            window.localStorage.removeItem("name")
            window.localStorage.removeItem("email")
        }

        submitComment(commentObj)
            .then((res) => {
                setShowSuccessMessage(true)

                setTimeout(() => {
                    setShowSuccessMessage(false)
                }, 3000)
            })
    }

    return (
        <div className='p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg'>
            <h3 className='pb-4 mb-8 text-xl font-semibold border-b'>Laissez un commentaire</h3>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <textarea 
                    ref={commentEl as any} 
                    className='w-full p-4 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200'
                    placeholder="Commentaire"
                    name="commentaire"
                />
            </div>
            <div className='grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2'>
                <input 
                    type="text" 
                    ref={nameEl as any}
                    className='w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200'
                    placeholder="Nom"
                    name="nom"
                />
                <input 
                    type="text" 
                    ref={emailEl as any}
                    className='w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200'
                    placeholder="Email"
                    name="email"
                />
            </div>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <div>
                    <input ref={storeDataEl as any} type="checkbox" id="storeData" name="storeData" value="true" />
                    <label htmlFor="storeData" className="ml-2 text-gray-500 cursor-pointer">Enregistrer mes information pour les prochains commentaires.</label>
                </div>
            </div>
            {error && <p className='text-xs text-red-500'>Tous les champs sont requis.</p>}
            <div className='mt-8'>
                <button 
                    type='button'
                    onClick={handleCommentSubmission} 
                    className="inline-block px-8 py-3 text-lg text-white transition duration-500 bg-pink-600 rounded-full cursor-pointer ease hover:bg-indigo-900"
                >
                    Soumettre le commentaire
                </button>
                {showSuccessMessage && <span className="float-right mt-3 text-xl font-semibold text-green-500">Commentaire soumis pour modération.</span>}
            </div>
        </div>
    )
}

export default CommentsForm
