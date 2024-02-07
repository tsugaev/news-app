import {
  COMMENTS_FETCH_FAILURE,
  COMMENTS_FETCH_START,
  COMMENTS_FETCH_SUCCESS,
  KIDS_FETCH_START,
  KIDS_FETCH_SUCCESS,
  KIDS_FETCH_FAILURE,
} from '../types';

// Action Creators

export const commentsFetchStart = () => ({ type: COMMENTS_FETCH_START });
export const commentsFetchSuccess = (comments) => ({
  type: COMMENTS_FETCH_SUCCESS,
  payload: comments,
});
export const commentsFetchFailure = (error) => ({
  type: COMMENTS_FETCH_FAILURE,
  payload: error.toString(),
});

export const kidsFetchStart = () => ({ type: KIDS_FETCH_START });
export const kidsFetchSuccess = (comments) => ({
  type: KIDS_FETCH_SUCCESS,
  payload: comments,
});
export const kidsFetchFailure = (error) => ({
  type: KIDS_FETCH_FAILURE,
  payload: error.toString(),
});

// Thunks

export const fetchComments = (commentsIds) => async (dispatch) => {
  dispatch(commentsFetchStart());
  try {
    const commentsPromises = commentsIds.map((commentId) =>
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`,
      ).then((response) => response.json()),
    );

    const comments = await Promise.all(commentsPromises);

    dispatch(commentsFetchSuccess(comments));
  } catch (error) {
    dispatch(commentsFetchFailure(error.toString()));
  }
};

export const fetchKids = (kidsIds) => async (dispatch, getState) => {
  dispatch(kidsFetchStart());
  try {
    const kidsPromises = kidsIds.map((kidsId) =>
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${kidsId}.json`,
      ).then((response) => response.json()),
    );

    const kids = await Promise.all(kidsPromises);

    const existingKids = getState().comments.kids.items;
    const newKids = kids.filter(kid => !existingKids.some(existingKid => existingKid.id === kid.id));
    
    dispatch(kidsFetchSuccess(newKids));
  } catch (error) {
    dispatch(kidsFetchFailure(error.toString()));
  }
};
