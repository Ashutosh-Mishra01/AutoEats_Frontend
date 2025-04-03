import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecommendationsAction, trackInteractionAction } from '../../../State/Customers/Recommendations/recommendation.action';
import RestaurantCard from '../RestarentCard/RestaurantCard';

const RecommendedRestaurants = () => {
  const dispatch = useDispatch();
  const { auth, recommendation } = useSelector(state => state);
  const { restaurants } = recommendation.recommendations;
  
  useEffect(() => {
    if (auth.user) {
      dispatch(getRecommendationsAction(localStorage.getItem('jwt')));
    }
  }, [auth.user, dispatch]);

  const handleRestaurantClick = (restaurantId) => {
    // Track click interaction
    if (auth.user) {
      dispatch(
        trackInteractionAction(
          {
            itemId: restaurantId,
            itemType: 'Restaurant',
            interactionType: 'CLICK'
          },
          localStorage.getItem('jwt')
        )
      );
    }
  };

  if (!restaurants || restaurants.length === 0) {
    return null;
  }

  return (
    <div className="py-5">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Recommended For You</h2>
      <div className="flex flex-wrap items-center justify-around gap-5">
        {restaurants.map((restaurant, index) => (
          <div key={restaurant._id} className="relative">
            <div 
              className="absolute top-2 right-2 bg-yellow-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
              title={`Recommendation score: ${restaurant.score.toFixed(1)}`}
            >
              {restaurant.score.toFixed(0)}
            </div>
            
            {restaurant.reasons && restaurant.reasons.length > 0 && (
              <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-60 text-white text-xs p-2 rounded">
                {restaurant.reasons.join(' • ')}
              </div>
            )}
            
            <div onClick={() => handleRestaurantClick(restaurant._id)}>
              <RestaurantCard data={restaurant} index={index} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedRestaurants; 