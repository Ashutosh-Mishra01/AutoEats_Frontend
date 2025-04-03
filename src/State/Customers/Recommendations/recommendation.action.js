import { api } from '../../../config/api';
import {
  getRecommendationsRequest,
  getRecommendationsSuccess,
  getRecommendationsFailure,
  trackInteractionRequest,
  trackInteractionSuccess,
  trackInteractionFailure,
  getRetrainingStatusRequest,
  getRetrainingStatusSuccess,
  getRetrainingStatusFailure,
  triggerRetrainingRequest,
  triggerRetrainingSuccess,
  triggerRetrainingFailure
} from './ActionCreators';

/**
 * Get recommendations for the current user
 * @param {string} token - JWT token
 * @returns {Function} - Thunk function
 */
export const getRecommendationsAction = (token) => {
  return async (dispatch) => {
    dispatch(getRecommendationsRequest());
    try {
      const { data } = await api.get('/api/recommendations', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(getRecommendationsSuccess(data));
      console.log('Recommendations:', data);
      return data;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      dispatch(getRecommendationsFailure(error.message));
      return null;
    }
  };
};

/**
 * Track user interaction with a recommended item
 * @param {Object} interaction - Interaction data
 * @param {string} token - JWT token
 * @returns {Function} - Thunk function
 */
export const trackInteractionAction = (interaction, token) => {
  return async (dispatch) => {
    dispatch(trackInteractionRequest());
    try {
      const { data } = await api.post('/api/recommendations/track', interaction, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(trackInteractionSuccess());
      console.log('Interaction tracked:', data);
      return data;
    } catch (error) {
      console.error('Error tracking interaction:', error);
      dispatch(trackInteractionFailure(error.message));
      return null;
    }
  };
};

/**
 * Get recommendation retraining status
 * @param {string} token - JWT token
 * @returns {Function} - Thunk function
 */
export const getRetrainingStatusAction = (token) => {
  return async (dispatch) => {
    dispatch(getRetrainingStatusRequest());
    try {
      const { data } = await api.get('/api/recommendations/retraining-status', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(getRetrainingStatusSuccess(data));
      console.log('Retraining status:', data);
      return data;
    } catch (error) {
      console.error('Error fetching retraining status:', error);
      dispatch(getRetrainingStatusFailure(error.message));
      return null;
    }
  };
};

/**
 * Trigger recommendation retraining (admin only)
 * @param {string} token - JWT token
 * @returns {Function} - Thunk function
 */
export const triggerRetrainingAction = (token) => {
  return async (dispatch) => {
    dispatch(triggerRetrainingRequest());
    try {
      const { data } = await api.post('/api/recommendations/trigger-retraining', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(triggerRetrainingSuccess());
      console.log('Retraining triggered:', data);
      return data;
    } catch (error) {
      console.error('Error triggering retraining:', error);
      dispatch(triggerRetrainingFailure(error.message));
      return null;
    }
  };
}; 