import Image from "next/image";

//  assets
import AirBnbLogo from '../public/assets/Airbnb_Logo.png'
import {
  SearchIcon,
  MenuIcon,
  UserCircleIcon,
  GlobeAltIcon,
  UsersIcon
} from '@heroicons/react/solid'

export function Header() {
  return (

    <header
      className="
        sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5
        md:px-10
      ">

      {/* LEFT*/}
      <div className="relative flex items-center h-10 cursor-pointer my-auto">
        <Image
          src={AirBnbLogo}
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>


      {/* MIDDLE */}
      <div className="
        flex items-center rounded-full py-2
        md:border-2 md:shadow-sm
      ">
        <input
          className="pl-5 flex-grow bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          placeholder="Start your search"
          type="text" />
        <SearchIcon className="
            hidden h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer
            md:inline-flex md:mx-2
          "/>
      </div>

      {/* RIGHT */}
      <div className="flex items-center space-x-4 justify-end text-gray-500">
        <p className="
          hidden cursor-pointer
          md:inline
        ">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer"/>

        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6"/>
          <UserCircleIcon className="h-6"/>
        </div>
      </div>
    </header>
  )

}