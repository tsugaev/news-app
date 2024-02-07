import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../../redux/actions/newsActions';
import { Button, Col, Container, Row } from 'react-bootstrap';
import NewsListItem from './NewsListItem';
import { useNavigate } from 'react-router-dom';
import styles from './newsList.module.css';

const NewsList = () => {
  const news = useSelector((state) => state.news.news.items);
  const isLoading = useSelector((state) => state.news.news.isLoading);
  const error = useSelector((state) => state.news.news.error);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleNavigate = (id) => {
    navigate(`/news/${id}`);
  };

  const forceUpdate = useCallback(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  useEffect(() => {
    forceUpdate();
    const intervalId = setInterval(forceUpdate, 60000);

    return () => clearInterval(intervalId);
  }, [forceUpdate]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1 className={styles.newsListTitle}>Latest 100 news</h1>
        </Col>
      </Row>
      <Button onClick={forceUpdate} variant="outline-secondary">update news</Button>
      <Row>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          news.map((newsItem) => {
            return (
              <div
                key={newsItem.id}
                onClick={() => handleNavigate(newsItem.id)}>
                <NewsListItem
                  title={newsItem.title}
                  date={newsItem.time}
                  score={newsItem.score}
                  author={newsItem.by}
                  kids={newsItem.kids}
                />
              </div>
            );
          })
        )}
      </Row>
    </Container>
  );
};

export default NewsList;
