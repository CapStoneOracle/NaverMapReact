import React, { useEffect, useState, useCallback } from 'react';
import { NaverMap, Marker } from 'react-naver-maps';
import axios from 'axios';

const MapTest = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');

  const CLIENT_ID = 'rwaxemln73';
  let map = null;
  let marker = null;

  const reverseGeocode = useCallback((latitude, longitude) => {
    fetch(`https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${longitude},${latitude}&sourcecrs=epsg:4326&output=json&orders=addr`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status.message === 'done') {
          const address = data.results[0].region.area1.name + ' ' + data.results[0].region.area2.name + ' ' + data.results[0].region.area3.name;
          setAddress(address);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const sendCoordinatesToServer = async (latitude, longitude) => {
    try {
      await axios.get('http://localhost:8080/point', {
        params: {
          latitude: latitude.toString,
          longitude: longitude.toString
        }
      });
      console.log('Coordinates sent successfully');
    } catch (error) {
      console.error('Failed to send coordinates:', error);
    }
  };
  

  useEffect(() => {
    const initializeMap = () => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.654374, 127.060651), // 좌표 수정 (노원역 좌표)
        zoom: 18,
      };

      map = new window.naver.maps.Map('map', mapOptions);
      marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(37.654374, 127.060651), // 좌표 수정 (노원역 좌표)
        map: map,
      });
    };

    const loadNaverMapScript = () => {
      const script = document.createElement('script');
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${CLIENT_ID}`;
      script.async = true;

      script.addEventListener('load', () => {
        initializeMap();
      });

      document.head.appendChild(script);
    };

    setLatitude(37.654374); // 좌표 수정 (노원역 좌표)
    setLongitude(127.060651); // 좌표 수정 (노원역 좌표)
    reverseGeocode(37.654374, 127.060651); // 좌표 수정 (노원역 좌표)
    sendCoordinatesToServer(37.654374, 127.060651); // 좌표 수정 (노원역 좌표)

    loadNaverMapScript();

    return () => {
      if (map) {
        window.naver.maps.Event.removeListener(map, 'click');
      }

      const script = document.querySelector('script[src^="https://openapi.map.naver.com"]');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [reverseGeocode]);

  return (
    <div>
      {latitude && longitude && (
        <p>
          Latitude: {latitude}, Longitude: {longitude}
        </p>
      )}
      {address && <p>Address: {address}</p>}
      <div style={{ width: '100%', height: '400px' }}>
        <div id="map" style={{ width: '100%', height: '100%' }}></div>
      </div>
    </div>
  );
};

export default MapTest;