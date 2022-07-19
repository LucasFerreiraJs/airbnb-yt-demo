import Image from 'next/image'
import { cardsLocale } from '../types'


interface ICard {

  card: cardsLocale
}


export function MediumCard({ card }: ICard) {
  return (
    <div className="
      cursor-pointer
      hover:scale-105 transform transition duration-300 ease-out
      ">
      <div className='relative h-80 w-80 '>
        <Image
          src={card.img}
          layout="fill"
          className='rounded-xl'
        />
      </div>

      <h3 className='text-2xl mt-3'>{card.title}</h3>
    </div>

  )

}