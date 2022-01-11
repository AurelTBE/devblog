import React, { useState, useEffect } from 'react'
import Link from "next/link"
import { getCategories } from '../services';

interface ICategory {
    name: string,
    slug: string
}

const Categories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
        .then((newCategories) => setCategories(newCategories))
    }, [])

    return (
        <div className='bg-white shadow-lg rounded-lg p-8 mb-8 pb-12'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                Catégories
            </h3>
            {categories.map((category:ICategory) => (
                <Link key={category.slug+Math.random()} href={`/category/${category.slug}`}>
                    <span className='cursor-pointer block pb-3 mb-3'>
                        {category.name}
                    </span>
                </Link>
            ))}
        </div>
    )
}

export default Categories
