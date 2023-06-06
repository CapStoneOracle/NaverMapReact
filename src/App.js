import React from 'react';
import { Routes, Route } from "react-router-dom";
import Map from './Map';
import RestaurantList from './RestaurantList';
import RestaurantSearch from './RestaurantSearch'

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Map />} />
        <Route path="/restaurant-list" element={<RestaurantList />} />
        <Route path="/restaurant-search" element={<RestaurantSearch />} />
      </Routes>
    </div>

  );
};

export default App;
