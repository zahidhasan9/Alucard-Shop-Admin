'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Form,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAdminReviews,
  updateReviewStatus,
  replyToReview,
  deleteReview,
} from '@/features/reviewSlice';
import {
  getAdminQuestions,
  updateQuestionStatus,
  answerQuestionAdmin,
  deleteAdminQuestion,
} from '@/features/questionSlice';

const ProductModeration = () => {
  const dispatch = useDispatch();

  const reviewState = useSelector((state) => state.review);
  const questionState = useSelector((state) => state.question);

  const [hasMounted, setHasMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('reviews');

  const [search, setSearch] = useState('');
  const [reviewStatus, setReviewStatus] = useState('all');
  const [rating, setRating] = useState('all');
  const [verified, setVerified] = useState('all');

  const [questionStatus, setQuestionStatus] = useState('all');
  const [answered, setAnswered] = useState('all');

  const [replyText, setReplyText] = useState({});
  const [answerText, setAnswerText] = useState({});

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const reviewQuery = useMemo(
    () => ({
      search,
      status: reviewStatus,
      rating,
      verified,
    }),
    [search, reviewStatus, rating, verified]
  );

  const questionQuery = useMemo(
    () => ({
      search,
      status: questionStatus,
      answered,
    }),
    [search, questionStatus, answered]
  );

  useEffect(() => {
    if (!hasMounted) return;

    dispatch(getAdminReviews(reviewQuery));
    dispatch(getAdminQuestions(questionQuery));
  }, [dispatch, hasMounted, reviewQuery, questionQuery]);

  const refreshAll = () => {
    dispatch(getAdminReviews(reviewQuery));
    dispatch(getAdminQuestions(questionQuery));
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Dhaka',
    }).format(new Date(date));
  };

  const getCustomerName = (user) => {
    return `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'N/A';
  };

  const statusBadge = (status) => {
    const map = {
      pending: 'warning',
      approved: 'success',
      hidden: 'secondary',
      rejected: 'danger',
    };

    return map[status] || 'secondary';
  };

  const handleReviewStatus = (reviewId, status) => {
    dispatch(
      updateReviewStatus({
        reviewId,
        payload: { status },
      })
    ).then(refreshAll);
  };

  const handleReviewReply = (reviewId) => {
    const message = replyText[reviewId];

    if (!message?.trim()) return;

    dispatch(replyToReview({ reviewId, message })).then(() => {
      setReplyText((prev) => ({ ...prev, [reviewId]: '' }));
      refreshAll();
    });
  };

  const handleReviewDelete = (reviewId) => {
    const ok = window.confirm('Delete this review permanently?');
    if (!ok) return;

    dispatch(deleteReview(reviewId)).then(refreshAll);
  };

  const handleQuestionStatus = (questionId, status) => {
    dispatch(
      updateQuestionStatus({
        questionId,
        payload: { status },
      })
    ).then(refreshAll);
  };

  const handleQuestionAnswer = (questionId) => {
    const answer = answerText[questionId];

    if (!answer?.trim()) return;

    dispatch(answerQuestionAdmin({ questionId, answer })).then(() => {
      setAnswerText((prev) => ({ ...prev, [questionId]: '' }));
      refreshAll();
    });
  };

  const handleQuestionDelete = (questionId) => {
    const ok = window.confirm('Delete this question permanently?');
    if (!ok) return;

    dispatch(deleteAdminQuestion(questionId)).then(refreshAll);
  };

  if (!hasMounted) {
    return (
      <Card className="border-0 rounded-4 bg-white">
        <Card.Body className="p-5 text-center">
          <Spinner animation="border" />
          <p className="text-muted mt-3 mb-0">Loading moderation panel...</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Row className="g-4 mb-4">
        <Col sm={6} xl={3}>
          <Card className="border-0 rounded-4 bg-white moderation-stat">
            <Card.Body className="p-4">
              <span className="text-muted d-block">Pending Reviews</span>
              <h3 className="mb-0">{reviewState.stats?.pending || 0}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="border-0 rounded-4 bg-white moderation-stat">
            <Card.Body className="p-4">
              <span className="text-muted d-block">Approved Reviews</span>
              <h3 className="mb-0 text-success">
                {reviewState.stats?.approved || 0}
              </h3>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="border-0 rounded-4 bg-white moderation-stat">
            <Card.Body className="p-4">
              <span className="text-muted d-block">Pending Questions</span>
              <h3 className="mb-0">{questionState.stats?.pending || 0}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="border-0 rounded-4 bg-white moderation-stat">
            <Card.Body className="p-4">
              <span className="text-muted d-block">Unanswered Q&A</span>
              <h3 className="mb-0 text-danger">
                {questionState.stats?.unanswered || 0}
              </h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 rounded-4 bg-white mb-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
            <div>
              <h3 className="mb-1">Product Moderation</h3>
              <p className="text-muted mb-0">
                Control product reviews and customer questions from one place.
              </p>
            </div>

            <Button
              variant="outline-primary"
              className="rounded-3"
              onClick={refreshAll}
            >
              Refresh
            </Button>
          </div>

          <div className="d-flex gap-2 flex-wrap mb-4">
            <Button
              variant={activeTab === 'reviews' ? 'primary' : 'light'}
              className="rounded-3"
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </Button>

            <Button
              variant={activeTab === 'questions' ? 'primary' : 'light'}
              className="rounded-3"
              onClick={() => setActiveTab('questions')}
            >
              Product Q&A
            </Button>
          </div>

          <Row className="g-3">
            <Col lg={activeTab === 'reviews' ? 4 : 6}>
              <Form.Control
                type="search"
                placeholder="Search comment or question..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-55 rounded-3"
              />
            </Col>

            {activeTab === 'reviews' ? (
              <>
                <Col sm={4} lg={3}>
                  <Form.Select
                    value={reviewStatus}
                    onChange={(e) => setReviewStatus(e.target.value)}
                    className="h-55 rounded-3"
                  >
                    <option value="all">All Review Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="hidden">Hidden</option>
                    <option value="rejected">Rejected</option>
                  </Form.Select>
                </Col>

                <Col sm={4} lg={2}>
                  <Form.Select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="h-55 rounded-3"
                  >
                    <option value="all">All Rating</option>
                    <option value="5">5 Star</option>
                    <option value="4">4 Star</option>
                    <option value="3">3 Star</option>
                    <option value="2">2 Star</option>
                    <option value="1">1 Star</option>
                  </Form.Select>
                </Col>

                <Col sm={4} lg={3}>
                  <Form.Select
                    value={verified}
                    onChange={(e) => setVerified(e.target.value)}
                    className="h-55 rounded-3"
                  >
                    <option value="all">All Purchase Type</option>
                    <option value="yes">Verified Purchase</option>
                    <option value="no">Not Verified</option>
                  </Form.Select>
                </Col>
              </>
            ) : (
              <>
                <Col sm={6} lg={3}>
                  <Form.Select
                    value={questionStatus}
                    onChange={(e) => setQuestionStatus(e.target.value)}
                    className="h-55 rounded-3"
                  >
                    <option value="all">All Q&A Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="hidden">Hidden</option>
                    <option value="rejected">Rejected</option>
                  </Form.Select>
                </Col>

                <Col sm={6} lg={3}>
                  <Form.Select
                    value={answered}
                    onChange={(e) => setAnswered(e.target.value)}
                    className="h-55 rounded-3"
                  >
                    <option value="all">All Questions</option>
                    <option value="yes">Answered</option>
                    <option value="no">Unanswered</option>
                  </Form.Select>
                </Col>
              </>
            )}
          </Row>
        </Card.Body>
      </Card>

      {reviewState.error && activeTab === 'reviews' && (
        <Alert variant="danger">{reviewState.error}</Alert>
      )}

      {questionState.error && activeTab === 'questions' && (
        <Alert variant="danger">{questionState.error}</Alert>
      )}

      {activeTab === 'reviews' ? (
        <Card className="border-0 rounded-4 bg-white">
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table className="align-middle mb-0 moderation-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Customer</th>
                    <th>Rating</th>
                    <th>Review</th>
                    <th>Verified</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Admin Action</th>
                  </tr>
                </thead>

                <tbody>
                  {reviewState.loading && reviewState.reviews.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-5">
                        <Spinner animation="border" />
                      </td>
                    </tr>
                  ) : reviewState.reviews.length > 0 ? (
                    reviewState.reviews.map((review) => (
                      <tr key={review._id}>
                        <td>
                          <strong>{review.product?.name || 'N/A'}</strong>
                          <small className="d-block text-muted">
                            {review.product?.slug || ''}
                          </small>
                        </td>

                        <td>
                          {getCustomerName(review.user)}
                          <small className="d-block text-muted">
                            {review.user?.email || 'N/A'}
                          </small>
                        </td>

                        <td>
                          <span className="text-warning">
                            {'★'.repeat(review.rating || 0)}
                          </span>
                        </td>

                        <td style={{ minWidth: 260 }}>
                          <p className="mb-2">{review.comment}</p>

                          {review.adminReply?.message && (
                            <div className="bg-light rounded-3 p-2 mb-2">
                              <small className="fw-semibold text-secondary">
                                Admin Reply:
                              </small>
                              <p className="mb-0 small">
                                {review.adminReply.message}
                              </p>
                            </div>
                          )}

                          <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="Write admin reply..."
                            value={replyText[review._id] || ''}
                            onChange={(e) =>
                              setReplyText((prev) => ({
                                ...prev,
                                [review._id]: e.target.value,
                              }))
                            }
                          />

                          <Button
                            size="sm"
                            className="mt-2 rounded-3"
                            onClick={() => handleReviewReply(review._id)}
                          >
                            Save Reply
                          </Button>
                        </td>

                        <td>
                          <Badge
                            bg={
                              review.isVerifiedPurchase
                                ? 'success'
                                : 'secondary'
                            }
                            className="p-2"
                          >
                            {review.isVerifiedPurchase ? 'Verified' : 'No'}
                          </Badge>
                        </td>

                        <td>
                          <Badge
                            bg={statusBadge(review.status)}
                            className="p-2 text-capitalize"
                          >
                            {review.status}
                          </Badge>
                        </td>

                        <td>{formatDate(review.createdAt)}</td>

                        <td>
                          <div className="d-flex flex-column gap-2">
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() =>
                                handleReviewStatus(review._id, 'approved')
                              }
                            >
                              Approve
                            </Button>

                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() =>
                                handleReviewStatus(review._id, 'hidden')
                              }
                            >
                              Hide
                            </Button>

                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => handleReviewDelete(review._id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center text-muted py-5">
                        No reviews found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Card className="border-0 rounded-4 bg-white">
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table className="align-middle mb-0 moderation-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Customer</th>
                    <th>Question</th>
                    <th>Answers</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Admin Action</th>
                  </tr>
                </thead>

                <tbody>
                  {questionState.loading &&
                  questionState.questions.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-5">
                        <Spinner animation="border" />
                      </td>
                    </tr>
                  ) : questionState.questions.length > 0 ? (
                    questionState.questions.map((question) => (
                      <tr key={question._id}>
                        <td>
                          <strong>{question.product?.name || 'N/A'}</strong>
                          <small className="d-block text-muted">
                            {question.product?.slug || ''}
                          </small>
                        </td>

                        <td>
                          {getCustomerName(question.user)}
                          <small className="d-block text-muted">
                            {question.user?.email || 'N/A'}
                          </small>
                        </td>

                        <td style={{ minWidth: 250 }}>
                          {question.question}
                        </td>

                        <td style={{ minWidth: 280 }}>
                          {question.answers?.length > 0 ? (
                            question.answers.map((answer) => (
                              <div
                                key={answer._id}
                                className="bg-light rounded-3 p-2 mb-2"
                              >
                                <small className="fw-semibold text-secondary">
                                  {answer.isAdminAnswer
                                    ? 'Admin Answer'
                                    : 'Answer'}
                                </small>
                                <p className="mb-0 small">{answer.answer}</p>
                              </div>
                            ))
                          ) : (
                            <small className="text-muted">
                              No answer yet.
                            </small>
                          )}

                          <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="Write official answer..."
                            value={answerText[question._id] || ''}
                            onChange={(e) =>
                              setAnswerText((prev) => ({
                                ...prev,
                                [question._id]: e.target.value,
                              }))
                            }
                          />

                          <Button
                            size="sm"
                            className="mt-2 rounded-3"
                            onClick={() => handleQuestionAnswer(question._id)}
                          >
                            Save Answer
                          </Button>
                        </td>

                        <td>
                          <Badge
                            bg={statusBadge(question.status)}
                            className="p-2 text-capitalize"
                          >
                            {question.status}
                          </Badge>
                        </td>

                        <td>{formatDate(question.createdAt)}</td>

                        <td>
                          <div className="d-flex flex-column gap-2">
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() =>
                                handleQuestionStatus(question._id, 'approved')
                              }
                            >
                              Approve
                            </Button>

                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() =>
                                handleQuestionStatus(question._id, 'hidden')
                              }
                            >
                              Hide
                            </Button>

                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() =>
                                handleQuestionDelete(question._id)
                              }
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center text-muted py-5">
                        No questions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default ProductModeration;