
import Image from 'next/image'
import { nearbyLocale } from '../types'

interface ILocale {
  locale: nearbyLocale
}


export function SmallCard({ locale }: ILocale) {


  return (
    <div
      className='
        flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer
        hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out;
        '>
      <div className='relative w-16 h-16 '>
        <Image
          src={locale.img}
          layout="fill"
          objectFit='cover'
          className='rounded-lg'
        />
      </div>


      <div>
        <h2>{locale.location}</h2>
        <h3 className='text-gray-500'>{locale.distance}</h3>
      </div>

    </div>
  )

}