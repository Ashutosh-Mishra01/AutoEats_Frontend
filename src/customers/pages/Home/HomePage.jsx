import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Navbar from "../../components/Navbar/Navbar";
import MultipleItemsCarousel from "../../components/MultiItemCarousel/MultiItemCarousel";
import { restaurents } from "../../../Data/restaurents";
import RestaurantCard from "../../components/RestarentCard/RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../../../State/Customers/Restaurant/restaurant.action";
import RecommendedRestaurants from "../../components/Recommendations/RecommendedRestaurants";
import RecommendedFoodItems from "../../components/Recommendations/RecommendedFoodItems";
import Search from "../../components/Search/Search";
import { Grid, Typography } from "@mui/material";
// import { getAllRestaurantsAction } from "../../../State/Restaurant/Action";
// import RestarantCard from "../../components/RestarentCard/Restaurant";

const HomePage = () => {
  const dispatch = useDispatch();
  const { restaurants, loading } = useSelector((store) => store.restaurant);
  const { auth } = useSelector((store) => store);
  const [recommendedRestaurants, setRecommendedRestaurants] = useState([]);

  useEffect(() => {
    dispatch(getAllRestaurantsAction(auth.jwt));
  }, [dispatch, auth.jwt]);

  // Handle recommended restaurants with local storage
  useEffect(() => {
    if (auth.user) {
      // Check if recommendations exist in local storage
      const storedRecommendations = localStorage.getItem('userRecommendations');
      if (storedRecommendations) {
        setRecommendedRestaurants(JSON.parse(storedRecommendations));
      } else if (restaurants.length > 0) {
        // Generate new random recommendations
        const shuffled = [...restaurants].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        setRecommendedRestaurants(selected);
        localStorage.setItem('userRecommendations', JSON.stringify(selected));
      }
    } else {
      // Clear recommendations when user logs out
      setRecommendedRestaurants([]);
      localStorage.removeItem('userRecommendations');
    }
  }, [auth.user, restaurants]);

  return (
    <div className="relative">
      <section className="-z-50 relative">
        <div className="hero-section h-[40vh] md:h-[65vh]"></div>
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
