import React from 'react';
import { Col } from 'react-bootstrap';
import styles from './newsList.module.css';
import { readableDate } from '../helpers/readableDate';

const NewsListItem = React.memo(({ title, date, score, author, kids }) => {
  return (
    <Col>
      <div className={styles.newsItemBlock}>
        <div>
          <h4>{title}</h4>
        </div>
        <div>
          <strong>score:</strong> {score}
        </div>
        <div>
          <strong>author:</strong> {author}
        </div>
        <div>
          <strong>date:</strong> {readableDate(date)}
        </div>
      </div>
    </Col>
  );
});

NewsListItem.displayName = 'NewsListItem';

export default NewsListItem;
