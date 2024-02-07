import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../../redux/actions/commentsActions';
import CommentsItem from './CommentsItem';
import { Button } from 'react-bootstrap';

const Comments = ({ commentsIds, newsId }) => {
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comments.items);

  const filteredComments = useMemo(
    () =>
      comments.filter(
        (comment) => comment.parent === newsId && !comment.deleted,
      ),
    [comments, newsId],
  );

  const isLoading = useSelector((state) => state.comments.isLoading);
  const error = useSelector((state) => state.comments.error);

  const forceUpdate = useCallback(() => {
    dispatch(fetchComments(commentsIds));
  }, [dispatch, commentsIds]);

  useEffect(() => {
    forceUpdate();
    const intervalId = setInterval(forceUpdate, 60000);
  
    return () => clearInterval(intervalId);
  }, [forceUpdate]);
  

  if (isLoading) {
    return 'Loading...';
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Button onClick={forceUpdate} variant='outline-secondary'>
        {' '}
        update comments
      </Button>

      {filteredComments.map((comment) => {
        return (
          <CommentsItem
            key={comment.id}
            id={comment.id}
            text={comment.text}
            author={comment.by}
            date={comment.time}
            kids={comment.kids}
          />
        );
      })}
    </div>
  );
};

export default Comments;
