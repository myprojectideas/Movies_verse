import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const SwipeCard = ({ title, rating, releaseDate, imageUrl, id }) => {
    return (
        <Link href={{
            pathname: '/movie',
            query: {
                id: id
            }
        }} className='w-[16rem] h-[20rem] flex flex-col rounded-md overflow-hidden' >
            <div className='h-[72%] w-full relative overflow-hidden'>
                <Image src={imageUrl} layout='fill' objectFit='contain' alt={imageUrl} />
            </div>
            <div className='h-[28%] flex flex-col gap-2 py-2 px-3'>
                <h3 className='font-semibold'>{title}</h3>
                <p>Date of Release: <span>{releaseDate}</span></p>
                <p>Rating: <span>{rating}</span></p>
            </div>
        </Link>
    )
}

export default SwipeCard