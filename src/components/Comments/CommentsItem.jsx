import React, { useState } from 'react';

import { readableDate } from '../helpers/readableDate';
import styles from './comments.module.css';
import { Button } from 'react-bootstrap';
import Kids from './Kids';

const CommentsItem = ({ id, kids, text, author, date }) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className={styles.commentBlock}>
      <div className={styles.commentAuthor}>{author}</div>
      <div className={styles.commentDate}>{readableDate(date)}</div>
      <div
        className={styles.commentText}
        dangerouslySetInnerHTML={{ __html: text }}
      />

      {kids && kids.length ? (
        <Button
          variant='outline-secondary'
          onClick={() => setShowReplies(!showReplies)}>
          {showReplies ? 'hide' : 'show more'}
        </Button>
      ) : null}

      {showReplies ? (
        <div className={styles.subCommentBlock}>
          <Kids kidsIds={kids} parent={id} />
        </div>
      ) : null}
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(CommentsItem);

