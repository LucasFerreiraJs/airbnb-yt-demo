import { GetStaticProps } from "next"
import { nearbyLocale, cardsLocale } from '../types'
import { LargeCard } from "./LargeCard";
import { MediumCard } from "./MediumCard";
import { SmallCard } from "./SmallCard";


interface ILocations {
  locations: nearbyLocale[];
  cards: cardsLocale[];
}


export function ContentHome({ locations, cards }: ILocations) {
  console.log('cards', cards)
  return (
    <>
      <section className="pt-6">
        <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

        <div
          className="
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xs:grid-cols-4
        ">

          {locations?.map((item, index) => {
            return (
              <SmallCard
                key={index}
                locale={item} />
            )
          })}

        </div>
      </section>

      <section>
        <h2 className="text-4xl font-semibold py-8">Lives Anywhere</h2>

        <div
          className="
            flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3 "
        >
          {cards?.map((card, index) => {
            return (
              <MediumCard key={index} card={card} />
            )
          })}
        </div>
      </section>


      <LargeCard
        img="https://links.papareact.com/4cj"
        title="The Gratest Outdoors"
        description="Wishlist curated by Airbnb"
        buttonText="Get Inspired"

      />

    </>

  )
}

