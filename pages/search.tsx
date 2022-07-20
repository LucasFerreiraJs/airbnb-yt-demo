import { useRouter } from "next/router"
import { format } from 'date-fns'
import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { placeToRent } from "../types";
import { InfoCard } from "../components/InfoCard";
import { Map } from "../components/Map";

interface IParamsProps {
  resolvedUrl: string
  placesSeachResults: placeToRent[]
}



export default function Search({ resolvedUrl, placesSeachResults }: IParamsProps) {
  const router = useRouter();


  const { location, startDate, endDate, numberOfGuest } = router.query


  const formattedStartDate = format(new Date(String(startDate)), "dd MMMM yy");
  const formattedEndDate = format(new Date(String(endDate)), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`


  return (
    <div className="">
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">+300 stays - {range} - for {numberOfGuest} guest</p>

          <h1
            className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div
            className="
              hidden
              lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap
            "
          >
            <p className="roundedButton"> Cancellation Flexibility</p>
            <p className="roundedButton">Type of Place</p>
            <p className="roundedButton">Price</p>
            <p className="roundedButton">Rooms and Beds</p>
            <p className="roundedButton">More Filters</p>
          </div>

          <div className="flex flex-col">

            {
              placesSeachResults.map(item => {
                return (
                  <InfoCard key={item.img} card={item} />
                )
              })
            }
          </div>
        </section>

        <section className="hidden xl:inline-flex xl:min-w-[600px]">
            <Map placesSeachResults={placesSeachResults}/>
        </section>
      </main>
    </div>
  )

}



export const getServerSideProps: GetServerSideProps = async (context) => {

  let seachResults = await fetch("https://links.papareact.com/isz").then(res => res.json())

  return {
    props: {
      resolvedUrl: context.resolvedUrl,
      placesSeachResults: seachResults
    }
  };
}