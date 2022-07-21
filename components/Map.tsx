import { useCallback, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter'
import { placeToRent } from '../types';


type ViewPortType = {
  width: string;
  height: string;
  latitude: number;
  longitude: number;
  zoom: number;
}
type CoordinatesValues = {

  longitude: number;
  latitude: number;

}

interface IMapProps {
  placesSeachResults: placeToRent[]
}


export function Map({ placesSeachResults }: IMapProps) {

  const [selectedLocation, setSelectedLocation] = useState<placeToRent>({} as placeToRent);

  const coordinates = placesSeachResults.map(result => ({
    longitude: result.long,
    latitude: result.lat
  }));

  const center: CoordinatesValues = getCenter(coordinates) || {
    latitude: 37.7577,
    longitude: -122.4376,
  };

  const [viewportValues, setViewportValues] = useState<ViewPortType>({
    height: '100%',
    width: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11
  })

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/thasuka/cl5tlifb6001p14p9mlf1chan"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewportValues}
      width="100%"
      height="100%"
      onViewportChange={(viewport: any) => {


        setViewportValues((viewportValues) => ({
          ...viewportValues,
          latitude: viewport?.latitude,
          longitude: viewport?.longitude,
          zoom: viewport?.zoom,

        }))
      }}
    >
      {placesSeachResults.map(result => {
        return (

          <div key={result.long}>
            <Marker
              longitude={result.long}
              latitude={result.lat}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <p
                role="img"
                onClick={() => setSelectedLocation(result)}
                className='cursor-pointer text-2xl hover:animate-bounce '
                aria-label="push-puh"
              >
                📌
              </p>
            </Marker>

            {/* The popup */}
            {selectedLocation.long === result.long
              ? (
                <Popup
                  closeOnClick={true}
                  onClose={() => setSelectedLocation({} as placeToRent)}
                  latitude={result.lat}
                  longitude={result.long}
                >
                  {result.title}
                </Popup>

              )
              : (false)
            }
          </div>
        )
      })}
    </ReactMapGL>
  )

}