import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useState } from "react";
import { Typography } from "@material-ui/core";
import { LatLng } from "../Types";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "2%",
};

export const getExactDistance = (p1: LatLng, p2: LatLng) => {
  const rad = (x: number) => (x * Math.PI) / 180;
  const R = 6378137; // Earth’s mean radius in meter
  const dLat = rad(p2.lat - p1.lat);
  const dLong = rad(p2.lng - p1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) *
      Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d / 1000; // returns the distance in km
};

export const getPrettyDistance = (p1: LatLng, p2: LatLng) =>
  getExactDistance(p1, p2).toFixed(2) + "km";

function GoogleMapsComponent({
  initialMarkers,
  setPosition,
}: {
  initialMarkers?: Array<LatLng>;
  // eslint-disable-next-line no-unused-vars
  setPosition?: (pos: LatLng) => void;
}) {
  const [markers, setMarkers] = useState(
    initialMarkers ? [...initialMarkers] : []
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBHmGArINV-1nxA2ojakVDe7wQJ-9Iy8kE",
  });

  const [setMap] = React.useState(null);

  const onLoad = React.useCallback(
    function callback(map) {
      if (markers.length > 1) {
        const lineSymbol = {
          path: "M 0,-1 0,1",
          strokeOpacity: 1,
        };
        // @ts-ignore
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
        linePath.setMap(map);
        if (markers[0].lng < markers[1].lng) {
          map.fitBounds(
            // @ts-ignore
            new window.google.maps.LatLngBounds(markers[0], markers[1])
          );
        } else {
          map.fitBounds(
            // @ts-ignore
            new window.google.maps.LatLngBounds(markers[1], markers[0])
          );
        }
      } else if (markers.length === 1) map.setCenter([...markers]);
      else map.setCenter({ lat: 63.4, lng: 10.4 });

      if (setMap != null) {
        // @ts-ignore
        setMap(map);
      }
    },
    [markers, setMap]
  );

  const onUnmount = React.useCallback(
    function callback() {
      if (setMap != null) {
        // @ts-ignore
        setMap(null);
      }
    },
    [setMap]
  );

  return isLoaded ? (
    <div>
      <GoogleMap
        onClick={(e) => {
          if (setPosition) {
            const latLng = {
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            };
            setMarkers([latLng]);
            setPosition(latLng);
          }
        }}
        mapContainerStyle={containerStyle}
        center={markers.length > 0 ? markers[0] : { lat: 63.4, lng: 10.4 }}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          streetViewControl: false,
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          rotateControl: false,
          fullscreenControl: false,
        }}
      >
        {markers &&
          markers.map((marker) => (
            <Marker
              key={Math.random().toString(36).substring(7)}
              position={marker}
            />
          ))}

        <></>
      </GoogleMap>
      <Typography variant="body1" className="text-center">
        {markers.length > 1
          ? getPrettyDistance(markers[0], markers[1])
          : setPosition
          ? "Velg din posisjon"
          : "Du må logge inn for å se avstand"}
      </Typography>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(GoogleMapsComponent);
