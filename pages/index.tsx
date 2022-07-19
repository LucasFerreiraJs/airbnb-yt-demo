import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Header } from '../components/Header'
import { Banner } from '../components/Banner'
import { ContentHome } from '../components/ExploreNearby'
import { nearbyLocale, cardsLocale } from '../types'
import { Footer } from '../components/Footer'



interface IExploreData {
  exploreDataNearby: nearbyLocale[];
  cardsData: cardsLocale[]
}



export function Home({ exploreDataNearby, cardsData }: IExploreData) {


  return (
    <div className="">
      <Head>
        <title>Airbnb clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* Banner */}
      <Banner />

      <main
        className="
          max-w-7xl mx-auto px-8
          sm:px-16
        "
      >
        <ContentHome locations={exploreDataNearby} cards={cardsData}/>

      </main>
    <Footer />
    </div>
  )
}

export default Home




export const getStaticProps: GetStaticProps = async (context) => {
  const exploreDataNearby = await fetch('https://links.papareact.com/pyp').then(res => res.json())
  const cardsData = await fetch('https://links.papareact.com/zp1').then(res => res.json())

  return {
    props: {
      exploreDataNearby,
      cardsData
    }
  }

}