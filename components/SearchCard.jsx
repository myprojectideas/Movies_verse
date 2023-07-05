import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import fallbackImage from '@/public/assets/images/canyon.jpg'

const SearchCard = ({ setIsVisible, title, releaseDate, imageUrl, id, path }) => {
    return (
        <Link href={{
            pathname: path,
            query: {
                id: id
            }
        }} className='w-full flex h-[8rem] border-b border-b-black hover:bg-yellow-300'
            onClick={() => setIsVisible(false)}
        >
            <div className='w-[40%] h-full overflow-hidden relative'>
                {
                    imageUrl ?
                        <Image src={`https://image.tmdb.org/t/p/w780${imageUrl}`} layout='fill' objectFit='contain' alt={imageUrl} />
                        :
                        <Image src={fallbackImage} layout='fill' objectFit='cover' alt='fallback_image' />
                }
            </div>
            <div className='w-[60%] px-2 text-start py-2 flex flex-col justify-center'>
                <p className='text-sm overflow-clip'>Title: {title}</p>
                <p className='text-sm overflow-clip'>Release Date: {releaseDate}</p>
            </div>

        </Link>
    )
}

export default SearchCard