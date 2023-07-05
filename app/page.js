"use client";
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import "swiper/swiper.min.css";
import { useEffect, useState } from 'react';
import SeriesCard from '@/components/SeriesCard';
import MovieCard from '@/components/MovieCard';
import SwipeCard from '@/components/SwipeCard';

export default function Home() {

  const [nowPlaying, setNowPlaying] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingSeries, setTrendingSeries] = useState([])

  useEffect(() => {
    const fetchData = () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_API_KEY
        }
      }

      fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
        .then((response) => response.json())
        .then(response => {
          console.log(response)
          setNowPlaying(response.results.slice(0, 6))
        })
        .catch(err => console.error(err))

      fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', options)
        .then((response) => response.json())
        .then(response => {
          console.log(response)
          setTrendingSeries(response.results.slice(0, 6))
        })
        .catch(err => console.error(err))

      fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
        .then((response) => response.json())
        .then(response => {
          console.log(response)
          setTrendingMovies(response.results.slice(0, 6))
        })
        .catch(err => console.error(err))


    }
    fetchData()

  }, [])

  return (
    <main className='flex-1 w-full px-12'>
      <h1 className='text-5xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600 mt-8 mb-8' >
        World of movies and series with MovieVerse.
        <p className='text-xl text-gray-700 mt-4 text-center'> your gateway to infinite Entertainment!</p>
      </h1>
      <section className='mb-8 w-full' >
        <h2 className='text-3xl my-4 font-semibold border-l-4 pl-3 border-yellow-300'>Now in Theaters</h2>
        <div className='w-full px-12 relative' >
          <Swiper
            loop
            autoplay={{
              delay: 2000,
              disableOnInteraction: true
            }}
            pagination={{
              clickable: true
            }}
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={4}
            onSlideChange={() => console.log('slide is changed')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {
              nowPlaying?.map(curr => {
                return (
                  <SwiperSlide>
                    <SwipeCard
                      title={curr.title}
                      releaseDate={curr.release_date}
                      rating={curr.vote_average}
                      id={curr.id}
                      imageUrl={`https://image.tmdb.org/t/p/w780${curr.backdrop_path}`}
                    />
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        </div>
      </section>
      <section className='mb-8 w-full' >
        <h2 className='text-3xl my-4 font-semibold border-l-4 pl-3 border-yellow-300'>Trending TV Series</h2>
        <div className='px-12 w-full flex flex-wrap gap-8 lg:justify-start md:justify-center sm:justify-center items-center' >
          {
            trendingSeries?.map(current => {
              return (
                <SeriesCard
                  title={current.name}
                  releaseDate={current.first_air_date}
                  rating={current.vote_average}
                  imageUrl={`https://image.tmdb.org/t/p/w780${current.backdrop_path}`}
                  id={current.id}
                />
              )
            })
          }
        </div>
      </section>
      <section className='mb-8 w-full' >
        <h2 className='text-3xl my-4 font-semibold border-l-4 pl-3 border-yellow-300'>Trending Movies</h2>
        <div className='px-12 w-full flex flex-wrap gap-8 lg:justify-start md:justify-center sm:justify-center items-center' >
          {
            trendingMovies?.map(current => {
              return (
                <MovieCard
                  title={current.title}
                  rating={current.vote_average}
                  imageUrl={`https://image.tmdb.org/t/p/w780${current.backdrop_path}`}
                  id={current.id}
                  releaseDate={current.release_date}
                />
              )
            })
          }
        </div>
      </section>
    </main>
  )
}
