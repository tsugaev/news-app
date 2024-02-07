import {
  NEWS_FETCH_START,
  NEWS_FETCH_SUCCESS,
  NEWS_FETCH_FAILURE,
  SELECTED_NEWS_FETCH_START,
  SELECTED_NEWS_FETCH_SUCCESS,
  SELECTED_NEWS_FETCH_FAILURE,
} from '../types';

// Action Creators

export const fetchNewsStart = () => ({
  type: NEWS_FETCH_START,
});

export const fetchNewsSuccess = (news) => ({
  type: NEWS_FETCH_SUCCESS,
  payload: news,
});

export const fetchNewsFailure = (error) => ({
  type: NEWS_FETCH_FAILURE,
  payload: error,
});

export const fetchSelectedNewsStart = () => ({
  type: SELECTED_NEWS_FETCH_START,
});

export const fetchSelectedNewsSuccess = (news) => ({
  type: SELECTED_NEWS_FETCH_SUCCESS,
  payload: news,
});

export const fetchSelectedNewsFailure = (error) => ({
  type: SELECTED_NEWS_FETCH_FAILURE,
  payload: error,
});

// Thunk

export const fetchNews = () => async (dispatch) => {
  dispatch(fetchNewsStart());
  try {
    const response = await fetch(
      'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty',
    );
    const newsIds = await response.json();
    const newsData = await Promise.all(
      newsIds.slice(0, 100).map(async (id) => {
        const newsResponse = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
        );
        return newsResponse.json();
      }),
    );
    dispatch(fetchNewsSuccess(newsData));
  } catch (error) {
    dispatch(fetchNewsFailure(error.toString()));
  }
};

export const fetchNewsById = (id) => async (dispatch) => {
  dispatch(fetchSelectedNewsStart());
  try {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
    );
    const news = await response.json();

    dispatch(fetchSelectedNewsSuccess(news));
  } catch (error) {
    dispatch(fetchSelectedNewsFailure(error.toString()));
  }
};
