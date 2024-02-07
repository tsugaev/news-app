import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './comments.module.css';
import { readableDate } from '../helpers/readableDate';
import { fetchKids } from '../../redux/actions/commentsActions';

const Kids = ({ kidsIds, parent }) => {
  const kids = useSelector((state) => state.comments.kids.items).filter(
    (comment) => comment.parent === parent && !comment.deleted,
  );
  const isLoading = useSelector((state) => state.comments.kids.isLoading);
  const error = useSelector((state) => state.comments.kids.error);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchKids(kidsIds));
  }, [dispatch, kidsIds]);

  if (isLoading) {
    return 'Loading...';
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log(kids, 'kids');

  return (
    <div>
      {kids.map((kid) => {
        return (
          <div key={kid.id}>
            <div className={styles.commentAuthor}>{kid.author}</div>
            <div className={styles.commentDate}>{readableDate(kid.time)}</div>
            <div
              className={styles.commentText}
              dangerouslySetInnerHTML={{ __html: kid.text }}
            />
          </div>
        )
      })}
    </div>
  );
};

export default Kids;
