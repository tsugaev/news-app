import {
  NEWS_FETCH_START,
  NEWS_FETCH_SUCCESS,
  NEWS_FETCH_FAILURE,
  SELECTED_NEWS_FETCH_START,
  SELECTED_NEWS_FETCH_SUCCESS,
  SELECTED_NEWS_FETCH_FAILURE,
} from '../types';

const initialState = {
  news: {
    items: [],
    isLoading: false,
    error: null,
  },
  selectedNews: {
    item: null,
    isLoading: false,
    error: null,
  },
};

export const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEWS_FETCH_START:
      return {
        ...state,
        news: {
          ...state.news,
          isLoading: true,
          error: null,
        },
      };
    case NEWS_FETCH_SUCCESS:
      return {
        ...state,
        news: {
          ...state.news,
          isLoading: false,
          error: null,
          items: action.payload,
        },
      };
    case NEWS_FETCH_FAILURE:
      return {
        ...state,
        news: {
          ...state.news,
          isLoading: false,
          error: action.payload,
        },
      };
    case SELECTED_NEWS_FETCH_START:
      return {
        ...state,
        selectedNews: {
          ...state.selectedNews,
          isLoading: true,
          error: null,
        },
      };
    case SELECTED_NEWS_FETCH_SUCCESS:
      return {
        ...state,
        selectedNews: {
          ...state.selectedNews,
          isLoading: false,
          error: null,
          item: action.payload,
        },
      };
    case SELECTED_NEWS_FETCH_FAILURE:
      return {
        ...state,
        selectedNews: {
          ...state.selectedNews,
          isLoading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};
