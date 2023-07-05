"use client";
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import fallbackImage from '@/public/assets/images/canyon.jpg'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Movie() {
    const params = useSearchParams()
    const [data, setData] = useState({
        imageUrl: null,
        title: 'title',
        synopsis: 'blah blah blah',
        rating: 0,
        releaseDate: 'date'
    })
    useEffect(() => {
        const fetchData = () => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_API_KEY
                }
            }
            fetch(`https://api.themoviedb.org/3/movie/${params.get('id')}?language=en-US`, options)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    setData({
                        imageUrl: `https://image.tmdb.org/t/p/w780${response.backdrop_path}`,
                        title: response.title,
                        synopsis: response.overview,
                        rating: response.vote_average,
                        releaseDate: response.release_date
                    })
                })
                .catch(err => console.error(err))
        }
        fetchData()
    }, [])

    return (
        <div className='flex w-full h-full px-[5%] gap-4 flex-wrap overflow-auto'>
            <div className='relative h-[20rem] w-[20rem] md:w-[20rem] sm:w-full lg:w-[20rem] rounded-lg overflow-hidden'>
                {
                    data.imageUrl ?
                        <Image className='hover:scale-125 transition-all duration-[10000ms] ease-in-out' src={data.imageUrl} alt='fallbackimage' layout='fill' objectFit='cover' />
                        :
                        <Image className='hover:scale-125 transition-all duration-[10000ms] ease-in-out' src={fallbackImage} alt='fallbackimage' layout='fill' objectFit='cover' />
                }
            </div>
            <div className='lg:flex-1 md:flex-1 sm:w-full px-4 flex flex-col gap-3'>
                <h1 className='text-3xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600 font-bold ml-4'>
                    Title: {data.title}
                </h1>
                <div className='h-[5rem] w-[5rem] ml-4 text-center'>
                    <CircularProgressbar text={`${data.rating}/10`} value={data.rating * 10} />
                </div>
                <div className='text-start ml-4'>Rating: {data.rating}</div>
                <div className='text-start ml-4'>Date Of Release: {data.releaseDate}</div>
                <div className='text-xl font-bold ml-[1rem]'>
                    <h2>Synopsis:</h2>
                    <span className='text-sm font-medium'>{data.synopsis}</span>
                </div>
            </div>
        </div>
    )
}