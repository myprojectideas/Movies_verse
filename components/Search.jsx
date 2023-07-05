"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import searchIcon from '@/public/assets/icons/search_icon.svg'
import crossIcon from '@/public/assets/icons/cross_icon.svg'
import SearchCard from './SearchCard';

const Search = () => {
    const [visible, setVisible] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [data, setData] = useState([])

    let filterTimeout;
    const queryResults = (query) => {
        // debouncing
        clearTimeout(filterTimeout)
        if (!query) return
        filterTimeout = setTimeout(() => {
            const options = {
                method: "GET",
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_API_KEY
                }
            }
            fetch(`https://api.themoviedb.org/3/search/${isChecked ? 'tv' : 'movie'}?query=${query}&include_adult=false&language=en-US&page=1`, options)
                .then((response) => response.json())
                .then(response => {
                    console.log(response)
                    setData(response.results)
                }).catch(err => console.error(err))
        }, 600)
    }

    return (
        <>
            <button onClick={() => setVisible(true)} className='rounded-lg border border-gray-400 flex justify-center p-3'>
                <Image height={20} width={20} src={searchIcon} />
            </button>
            {
                visible && <div className='fixed top-0 left-0 h-screen w-screen z-[99] flex items-center justify-center backdrop-blur-lg'>
                    <div className='w-[23rem] h-[35rem] bg-white rounded-xl p-4 relative shadow-xl flex flex-col gap-2 items-center'>
                        <button onClick={() => setVisible(false)} className='absolute top-2 right-3'>
                            <Image src={crossIcon} height={20} width={20} alt='cross-icon' />
                        </button>
                        <div className='w-full mt-8'>
                            <input type="text" autoFocus placeholder='Search...'
                                onChange={(e) => {
                                    queryResults(e.target.value)
                                }}
                                className='focus:outline-none w-[90%] px-3 py-2 rounded-3xl border border-gray-500'
                            />
                        </div>
                        <div className='flex gap-3'>
                            <input checked={isChecked} onChange={() => setIsChecked(!isChecked)} type="checkbox" className='cursor-pointer' />
                            <span>is Tv series</span>
                        </div>
                        <div className='rounded-lg w-full flex-1 overflow-auto'>
                            {
                                data[0] ? data.slice(0, 10).map(curr => {
                                    return (
                                        <SearchCard
                                            setIsVisible={setVisible}
                                            title={curr.name || curr.title}
                                            releaseDate={curr.first_air_date || curr.release_date}
                                            imageUrl={curr.poster_path}
                                            id={curr.id}
                                            path={isChecked ? '/series' : '/movie'}
                                        />
                                    )
                                }) : <h3 className='text-center mt-8'>No Results</h3>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Search