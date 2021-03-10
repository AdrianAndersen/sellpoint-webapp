import React from 'react'
import { GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';
import { useState } from "react"
 

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 63.402526,
  lng: 10.376075,
};

export const getExactDistance = (p1, p2) => {
  const rad = (x) => x * Math.PI / 180
  const R = 6378137; // Earth’s mean radius in meter
  const dLat = rad(p2.lat - p1.lat);
  const dLong = rad(p2.lng - p1.lng);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d/1000; // returns the distance in km
};

export const getPrettyDistance = (p1, p2) => getExactDistance(p1, p2).toFixed(2) + "km"

function GoogleMapsComponent({ initial_markers }: any) {
  const [markers, setMarkers] = useState([...initial_markers])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBHmGArINV-1nxA2ojakVDe7wQJ-9Iy8kE"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
  const lineSymbol = {
    path: "M 0,-1 0,1",
    strokeOpacity: 1,
    scale: 4,
  };
  const linePath = new window.google.maps.Polyline({
      path: [...markers],
      geodesic: true,
    strokeOpacity: 0,
    icons: [
      {
        icon: lineSymbol,
        offset: "0",
        repeat: "20px",
      },
    ],
    });
    linePath.setMap(map)
    map.setCenter([...markers]);
    setMap(map)
  }, [markers])


  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])


  return isLoaded ? (
      <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markers[0]}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
       { markers && (
           markers.map(marker => 
            <Marker key={Math.random().toString(36).substring(7)} position = { marker }/>
           ))
       }
       
        <></>
      </GoogleMap>
      <p>Avstand: {markers.length > 1 ? getPrettyDistance(markers[0], markers[1]): "Du må logge inn for å se avstand!"} </p>
      </div>
  ) : <></>
}

export default React.memo(GoogleMapsComponent)