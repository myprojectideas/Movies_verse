import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const MovieCard = ({ title, releaseDate, rating, imageUrl, id }) => {
    return (
        <Link href={{
            pathname: '/movie',
            query: {
                id: id
            }
        }} className='w-[20rem] h-[12rem] border-l-4 border-yellow-300 overflow-hidden rounded-r-lg' >
            <div className='h-[100%] w-full relative overflow-hidden'>
                <Image src={imageUrl} layout='fill' objectFit='cover' alt={imageUrl} />
                <div className='text-white absolute left-0 bottom-0 bg-black bg-opacity-40 p-4 w-full flex justify-between items-center'>
                    <div className='max-h-[50%] overflow-hidden tracking-wider text-ellipsis font-semibold text-md line-clamp-2'>
                        {title}
                    </div>
                    <div className='text-sm max-w-[50%]'>
                        <p>{releaseDate}</p>
                        <p>{rating}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MovieCard