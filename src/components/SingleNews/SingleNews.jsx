import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsById } from '../../redux/actions/newsActions';
import { Link, useParams } from 'react-router-dom';
import Comments from '../Comments/Comments';
import { readableDate } from '../helpers/readableDate';
import { Col, Container, Row } from 'react-bootstrap';

const SingleNews = () => {
  const dispatch = useDispatch();

  const news = useSelector((state) => state.news.selectedNews.item);
  const isLoading = useSelector((state) => state.news.selectedNews.isLoading);
  const error = useSelector((state) => state.news.selectedNews.error);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchNewsById(id));
  }, [dispatch, id]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <Link to='/'> Back to news</Link>
          <hr />
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <div className='selectedNewsTitle'>
                <h4>{news?.title}</h4>
              </div>
              <div className='selectedNewsUrl'>
                <strong>news url</strong>:{' '}
                <a href={news?.url} target='_blank' rel='noreferrer'>
                  {news?.url}
                </a>
              </div>
              <div className='selectedNewsDate'>
                <strong>date:</strong> {readableDate(news?.time)}
              </div>
              <div className='selectedNewsAuthor'>
                <strong>author:</strong> {news?.by}
              </div>
              <div className='selectedNewsCommentsCount'>
                <strong>commentsCount:</strong> {news?.descendants}
              </div>
              <hr />
              <h5>Comments:</h5>
              {news?.kids ? (
                <Comments commentsIds={news.kids} newsId={news.id} />
              ) : null}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SingleNews;
