import '../styles/globals.css'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import logo from '@/public/assets/icons/movie_icon.svg'
import Search from '@/components/Search'


const poppins = Poppins({
  weight: '400',
  variable: '--font-poppins',
  preload: false
})

export const metadata = {
  title: 'MovieVerse',
  description: 'Latest movies and series overview',
}



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} flex flex-col h-screen`}>
        <nav className='w-full px-6 py-4 flex justify-between items-center'>
          <button className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-900 flex gap-2'>
            <Image height={30} width={30} src={logo} />
            MovieVerse
          </button>
          {/* searchComponent */}
          <Search />
        </nav>
        {children}
        <footer className='w-full py-4 text-lg bg-[#212121] text-white text-center mt-8'>
          MovieVerse
        </footer>
      </body>
    </html>
  )
}
