import React, { useEffect, useState } from 'react';
import { NaverMap, Marker } from 'react-naver-maps';
import axios from 'axios';

const MapTest = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  const CLIENT_ID = 'rwaxemln73';
  let map = null;

  const reverseGeocode = (latitude, longitude) => {
    axios
      .get(`http://localhost:8080/point?latitude=${latitude}&longitude=${longitude}`)
      .then((response) => {
        const data = response.data; // 서버에서 받은 음식점 정보 배열
        setRestaurants(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(latitude, longitude),
      zoom: 17,
    };

    map = new window.naver.maps.Map('map', mapOptions);

    // 현재 위치 마커 생성
    const currentLocationMarker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(latitude, longitude),
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
        size: new window.naver.maps.Size(32, 32),
        origin: new window.naver.maps.Point(0, 0),
        anchor: new window.naver.maps.Point(16, 32),
      },
      map: map,
    });

    // 음식점 마커 생성
    const markers = [];
    restaurants.slice(0, 10).forEach((restaurant) => {
      const { name, category, phonenum, latitude, longitude } = restaurant; // 음식점의 위도, 경도 정보

      // 마커 생성
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(latitude, longitude),
        map: map,
      });

      window.naver.maps.Event.addListener(marker, 'click', () => {
        // 클릭한 마커의 정보 표시
        const infoWindow = new window.naver.maps.InfoWindow({
          content: `<div>${name}</div><div>${category}</div><div>${phonenum}</div>`,
        });
        infoWindow.open(map, marker);
      });

      markers.push(marker);
    });

    // 마커 클릭 이벤트 리스너 등록 등 추가 로직 가능
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(37.656349);
          setLongitude(127.0603523);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      reverseGeocode(latitude, longitude);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (latitude && longitude && restaurants.length > 0) {
      if (window.naver && window.naver.maps) {
        initializeMap();
      } else {
        const script = document.createElement('script');
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${CLIENT_ID}`;
        script.async = true;
        script.addEventListener('load', () => {
          initializeMap();
        });
        document.head.appendChild(script);
      }
    }
  }, [latitude, longitude, restaurants]);

  useEffect(() => {
    return () => {
      const script = document.querySelector('script[src^="https://openapi.map.naver.com"]');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

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
