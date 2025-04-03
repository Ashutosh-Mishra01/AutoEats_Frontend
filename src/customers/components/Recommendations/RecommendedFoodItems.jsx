import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecommendationsAction, trackInteractionAction } from '../../../State/Customers/Recommendations/recommendation.action';
import MenuItemCard from '../MenuItem/MenuItemCard';

const RecommendedFoodItems = () => {
  const dispatch = useDispatch();
  const { auth, recommendation } = useSelector(state => state);
  const { foods } = recommendation.recommendations;
  
  useEffect(() => {
    if (auth.user) {
      dispatch(getRecommendationsAction(localStorage.getItem('jwt')));
    }
  }, [auth.user, dispatch]);

  const handleFoodClick = (foodId) => {
    // Track click interaction
    if (auth.user) {
      dispatch(
        trackInteractionAction(
          {
            itemId: foodId,
            itemType: 'Food',
            interactionType: 'CLICK'
          },
          localStorage.getItem('jwt')
        )
      );
    }
  };

  if (!foods || foods.length === 0) {
    return null;
  }

  return (
    <div className="py-5">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Top Food Picks For You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {foods.map((food) => (
          <div key={food._id} className="relative" onClick={() => handleFoodClick(food._id)}>
            <div 
              className="absolute top-2 right-2 bg-yellow-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10"
              title={`Recommendation score: ${food.score.toFixed(1)}`}
            >
              {food.score.toFixed(0)}
            </div>
            
            {food.reasons && food.reasons.length > 0 && (
              <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-60 text-white text-xs p-2 rounded z-10">
                {food.reasons.join(' • ')}
              </div>
            )}
            
            <MenuItemCard item={food} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedFoodItems; 