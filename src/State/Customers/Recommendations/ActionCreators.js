import {
  GET_RECOMMENDATIONS_REQUEST,
  GET_RECOMMENDATIONS_SUCCESS,
  GET_RECOMMENDATIONS_FAILURE,
  TRACK_INTERACTION_REQUEST,
  TRACK_INTERACTION_SUCCESS,
  TRACK_INTERACTION_FAILURE,
  GET_RETRAINING_STATUS_REQUEST,
  GET_RETRAINING_STATUS_SUCCESS,
  GET_RETRAINING_STATUS_FAILURE,
  TRIGGER_RETRAINING_REQUEST,
  TRIGGER_RETRAINING_SUCCESS,
  TRIGGER_RETRAINING_FAILURE
} from './ActionTypes';

// Get recommendations
export const getRecommendationsRequest = () => ({
  type: GET_RECOMMENDATIONS_REQUEST
});

export const getRecommendationsSuccess = (data) => ({
  type: GET_RECOMMENDATIONS_SUCCESS,
  payload: data
});

export const getRecommendationsFailure = (error) => ({
  type: GET_RECOMMENDATIONS_FAILURE,
  payload: error
});

// Track interaction
export const trackInteractionRequest = () => ({
  type: TRACK_INTERACTION_REQUEST
});

export const trackInteractionSuccess = () => ({
  type: TRACK_INTERACTION_SUCCESS
});

export const trackInteractionFailure = (error) => ({
  type: TRACK_INTERACTION_FAILURE,
  payload: error
});

// Get retraining status
export const getRetrainingStatusRequest = () => ({
  type: GET_RETRAINING_STATUS_REQUEST
});

export const getRetrainingStatusSuccess = (data) => ({
  type: GET_RETRAINING_STATUS_SUCCESS,
  payload: data
});

export const getRetrainingStatusFailure = (error) => ({
  type: GET_RETRAINING_STATUS_FAILURE,
  payload: error
});

// Trigger retraining
export const triggerRetrainingRequest = () => ({
  type: TRIGGER_RETRAINING_REQUEST
});

export const triggerRetrainingSuccess = () => ({
  type: TRIGGER_RETRAINING_SUCCESS
});

export const triggerRetrainingFailure = (error) => ({
  type: TRIGGER_RETRAINING_FAILURE,
  payload: error
}); 