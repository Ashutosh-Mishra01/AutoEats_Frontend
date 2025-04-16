import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../../../State/Customers/Restaurant/restaurant.action";
import RestaurantCard from "../../components/RestarentCard/RestaurantCard";
import Search from "../../components/Search/Search";
import { Grid, Typography } from "@mui/material";

const HomePage = () => {
  const dispatch = useDispatch();
  const { restaurants, loading } = useSelector((store) => store.restaurant);
  const { auth } = useSelector((store) => store);
  const [recommendedRestaurants, setRecommendedRestaurants] = useState(() => {
    // Initialize from localStorage during component mount
    const stored = localStorage.getItem('userRecommendations');
    return stored ? JSON.parse(stored) : [];
  });

  // Fetch all restaurants
  useEffect(() => {
    dispatch(getAllRestaurantsAction(auth.jwt));
  }, [dispatch, auth.jwt]);

  // Handle recommended restaurants with local storage
  useEffect(() => {
    if (!auth.user) {
      // Clear recommendations when user logs out
      setRecommendedRestaurants([]);
      localStorage.removeItem('userRecommendations');
      return;
    }

    // Check if we already have recommendations
    const stored = localStorage.getItem('userRecommendations');
    if (stored) {
      const parsedStored = JSON.parse(stored);
      setRecommendedRestaurants(parsedStored);
      return;
    }

    // Only generate new recommendations if we don't have any and restaurants are loaded
    if (restaurants.length > 0 && recommendedRestaurants.length === 0) {
      const shuffled = [...restaurants].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      setRecommendedRestaurants(selected);
      localStorage.setItem('userRecommendations', JSON.stringify(selected));
    }
  }, [auth.user, restaurants.length]);

  return (
    <div className="">
      <section className="-z-50 banner relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center">
          <p className="text-2xl lg:text-7xl font-bold z-10 py-5">AutoEats</p>
          <p className="z-10 text-gray-300 text-xl lg:text-4xl">
            Taste the Convenience: Food, Fast and Delivered.
          </p>
        </div>
        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadout"></div>
      </section>

      <section className="absolute top-0 left-0 right-0">
        <Search />
      </section>

      {/* Top 3 Recommended Restaurants Section */}
      {auth.user && recommendedRestaurants.length > 0 && (
        <section className="px-5 lg:px-20 py-10">
          <Typography variant="h4" className="font-bold mb-6">
            Top 3 Recommended Restaurants
          </Typography>
          <Grid container spacing={3}>
            {recommendedRestaurants.map((restaurant) => (
              <Grid item xs={12} sm={6} md={4} key={restaurant._id}>
                <RestaurantCard data={restaurant} />
              </Grid>
            ))}
          </Grid>
        </section>
      )}

      {/* All Restaurants Section */}
      <section className="px-5 lg:px-20">
        <div>
          <h1 className="text-2xl font-semibold py-3">All Restaurants</h1>
          <Grid container spacing={3}>
            {restaurants.map((restaurant) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={restaurant._id}>
                <RestaurantCard data={restaurant} />
              </Grid>
            ))}
          </Grid>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
