import Image from "next/image";
import { format } from 'date-fns'
//  assets
import AirBnbLogo from '../../public/assets/Airbnb_Logo.png'
import {
  SearchIcon,
  MenuIcon,
  UserCircleIcon,
  GlobeAltIcon,
  UsersIcon
} from '@heroicons/react/solid'
import { useState } from "react";


// calendário
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range'
import { useRouter } from "next/router";


export function Header() {

  const router = useRouter();

  const [searchInput, setSearchInput] = useState("");
  // calendario
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfGuest, setNumberOfGuest] = useState(1);
  const [newPlaceholder, setNewPlaceholder] = useState("Start your search");

  const formattedStartDate = format(new Date(String(startDate)), "dd MMMM yy");
  const formattedEndDate = format(new Date(String(endDate)), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection"
  }

  const resetInput = () => {
    setSearchInput("");
    setStartDate(new Date());
    setEndDate(new Date());
    setNumberOfGuest(1);
    setNewPlaceholder("Start your search");
  }
  const handleSelect = (ranges: any) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }


  //click
  const search = ()=>{
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: String(startDate),
        endDate: String(endDate),
        numberOfGuest: String(numberOfGuest)
      }
    });

    setSearchInput("");
    setNewPlaceholder(`${searchInput} | ${range} | ${numberOfGuest} guests`);
  }


  return (

    <header
      className="
        sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5
        md:px-10
      ">

      {/* LEFT*/}
      <div
        className="relative flex items-center h-10 cursor-pointer my-auto"
        onClick={()=> {
          router.push('/')
          resetInput();
        }}
      >
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
          placeholder={newPlaceholder}
          type="text"
          value={searchInput}
          onChange={(evt) => { setSearchInput(evt.target.value) }}
        />
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
        <GlobeAltIcon className="h-6 cursor-pointer" />

        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>


      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#FD5B61']}
            onChange={handleSelect}
          />

          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl pl-2 flex-grow font-semibold">Number of Guests</h2>

            <UsersIcon className="h-5" />
            <input
              value={numberOfGuest}
              onChange={(evt) => setNumberOfGuest(Number(evt.target.value))}
              type="number"
              className="w-12 pl-2 outline-none text-red-400"
              min={1}
            />
          </div>
          <div className="flex">
            <button
              onClick={resetInput}
              className="flex-grow">
              Cancel
            </button>
            <button
              className="flex-grow text-[#FD5B61]"
              onClick={search}
              >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  )

}