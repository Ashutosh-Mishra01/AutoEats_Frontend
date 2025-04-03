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

const initialState = {
  loading: false,
  error: null,
  recommendations: {
    restaurants: [],
    foods: []
  },
  trackingInteraction: false,
  retrainingStatus: {
    currentCounter: 0,
    threshold: 10,
    lastResetAt: null,
    progress: 0
  },
  triggeringRetraining: false
};

const recommendationReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get recommendations
    case GET_RECOMMENDATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_RECOMMENDATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        recommendations: {
          restaurants: action.payload.restaurants || [],
          foods: action.payload.foods || []
        }
      };
    case GET_RECOMMENDATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    // Track interaction
    case TRACK_INTERACTION_REQUEST:
      return {
        ...state,
        trackingInteraction: true
      };
    case TRACK_INTERACTION_SUCCESS:
      return {
        ...state,
        trackingInteraction: false
      };
    case TRACK_INTERACTION_FAILURE:
      return {
        ...state,
        trackingInteraction: false,
        error: action.payload
      };

    // Get retraining status
    case GET_RETRAINING_STATUS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_RETRAINING_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        retrainingStatus: action.payload
      };
    case GET_RETRAINING_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    // Trigger retraining
    case TRIGGER_RETRAINING_REQUEST:
      return {
        ...state,
        triggeringRetraining: true
      };
    case TRIGGER_RETRAINING_SUCCESS:
      return {
        ...state,
        triggeringRetraining: false,
        retrainingStatus: {
          ...state.retrainingStatus,
          currentCounter: 0,
          progress: 0,
          lastResetAt: new Date()
        }
      };
    case TRIGGER_RETRAINING_FAILURE:
      return {
        ...state,
        triggeringRetraining: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default recommendationReducer; 