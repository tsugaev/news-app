import {
  COMMENTS_FETCH_FAILURE,
  COMMENTS_FETCH_START,
  COMMENTS_FETCH_SUCCESS,
  KIDS_FETCH_START,
  KIDS_FETCH_SUCCESS,
  KIDS_FETCH_FAILURE,
} from '../types';

const initialState = {
  isLoading: false,
  error: null,
  items: [],
  kids: {
    items: [],
    isLoading: false,
    error: null,
  },
};

export const commentsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case COMMENTS_FETCH_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case COMMENTS_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: [...payload],
      };
    case COMMENTS_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case KIDS_FETCH_START: {
      return {
        ...state,
        kids: {
          ...state.kids,
          isLoading: true,
          error: null,
        },
      };
    }
    case KIDS_FETCH_SUCCESS: {
      return {
        ...state,
        kids: {
          ...state.kids,
          items: [...state.kids.items, ...payload],
          isLoading: false,
          error: null,
        },
      };
    }
    case KIDS_FETCH_FAILURE: {
      return {
        ...state,
        kids: {
          ...state.kids,
          isLoading: false,
          error: payload,
        },
      };
    }
    default:
      return state;
  }
};
