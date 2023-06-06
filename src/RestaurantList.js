import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RestaurantList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const restaurants = location.state?.restaurants || [];

  const handleRestaurantClick = (restaurant) => {
    console.log('Clicked on restaurant:', restaurant);
    console.log(typeof (restaurant.latitude))
    // You can perform any desired actions with the clicked restaurant here

    navigate('/', {
      state: {
        latitude: restaurant.latitude,
        longitude: restaurant.longitude,
        name: restaurant.name,
      },
    });
  };


  return (
    <div>
      {restaurants.length > 0 ? (
        restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            style={styles.restaurantBox}
            onClick={() => handleRestaurantClick(restaurant)}
          >
            <h3>{restaurant.name}</h3>
            <p>카테고리: {restaurant.category}</p>
            <p>전화번호: {restaurant.phonenum}</p>
          </div>
        ))
      ) : (
        <p>No restaurants available</p>
      )}
    </div>
  );
};

const styles = {
  restaurantBox: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
    marginBottom: '10px',
    cursor: 'pointer', // Add cursor style to indicate clickable element
  },
};

export default RestaurantList;
