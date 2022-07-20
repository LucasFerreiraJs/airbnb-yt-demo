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
      // mapboxApiAccessToken={process.env.mapbox_key}
      mapboxAccessToken={process.env.mapbox_key}
      {...viewportValues}
      // onViewportChange={(viewport:any) => setViewport(viewport)}
      // onMove={(viewport) =>{
      //   console.log('viewportviewport', viewport.viewState)
      //   const teste = {...viewport}

      //   setViewport( (viewport) =>({
      //     height: '100%',
      //     width: '100%',
      //     latitude: viewport.viewState.latitude,
      //     longitude: -122.4376,
      //     zoom: 11
      //   })
      // }}

      onMove={(evt) => {
        console.log('evt', evt)
        setViewportValues((viewportValues) => ({
          ...viewportValues,
          latitude: evt.viewState.latitude,
          longitude: evt.viewState.longitude,
          zoom: evt.viewState.zoom
        }))
      }
      }
    >
      {placesSeachResults.map(result=> {
        return (

          <div key={result.long}>
            <Marker
              longitude={result.long}
              latitude={result.lat}
              offset={[-20,-10]}

            >
              <p className='cursor-pointer text-2xl hover:animate-bounce '>📌</p>
            </Marker>
          </div>
        )
      })}
    </ReactMapGL>
  )

}