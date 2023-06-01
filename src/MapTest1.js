import React, { useEffect, useState } from 'react';
import { NaverMap, Marker } from 'react-naver-maps';

const MapTest1 = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const CLIENT_ID = 'rwaxemln73'

  useEffect(() => {
    const loadNaverMapScript = () => {
      if (window.naver && window.naver.maps) {
        setMapLoaded(true);
      } else {
        const script = document.createElement('script');
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${CLIENT_ID}`;
        script.async = true;
        script.addEventListener('load', () => {
          setMapLoaded(true);
        });
        document.head.appendChild(script);
      }
    };

    if (!mapLoaded) {
      loadNaverMapScript();
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [mapLoaded]);

  return (
    <div>
      {mapLoaded && latitude && longitude ? (
        <NaverMap
          id="map"
          style={{ width: '100%', height: '400px' }}
          defaultCenter={{ lat: latitude, lng: longitude }}
          defaultZoom={18}
        >
          <Marker
            position={{ lat: latitude, lng: longitude }}
            animation={window.naver.maps.Animation.BOUNCE}
          />
        </NaverMap>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MapTest1;
