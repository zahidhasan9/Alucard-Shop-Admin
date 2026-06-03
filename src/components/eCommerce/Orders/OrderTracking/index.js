'use client';

import { Card, Col, Row, Form, Spinner, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOrderById,
  updateDeliveryStatus,
  resetDeliveryStatus,
  updatePaymentStatus,
} from '@/features/OrderSlice';

const OrderTracking = ({ tracking }) => {
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.order);

  const [delivery, setDelivery] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [adminNote, setAdminNote] = useState('');

  useEffect(() => {
    if (tracking) {
      dispatch(fetchOrderById(tracking));
    }
  }, [dispatch, tracking]);

  useEffect(() => {
    if (order) {
      setDelivery(order?.Delivery || 'pending');
      setPaymentStatus(order?.paymentMethod?.status || 'pending');
      setTransactionId(
        order?.paymentMethod?.transactionId ||
          order?.manualPayment?.transactionId ||
          ''
      );
      setAdminNote(order?.manualPayment?.adminNote || '');
    }
  }, [order]);

  const handleDeliverySubmit = () => {
    if (!delivery) return;

    dispatch(
      updateDeliveryStatus({
        orderId: tracking,
        status: delivery,
      })
    );
  };

  const handlePaymentSubmit = () => {
    if (!paymentStatus) return;

    dispatch(
      updatePaymentStatus({
        orderId: tracking,
        status: paymentStatus,
        transactionId,
        adminNote,
      })
    );
  };

  const handleResetDelivery = () => {
    dispatch(resetDeliveryStatus({ orderId: tracking }));
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString();
  };

  if (loading && !order) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error && !order) {
    return (
      <Alert variant="danger" className="my-5">
        {error}
      </Alert>
    );
  }

  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <h3 className="mb-3 mb-lg-4">Order & Payment Status</h3>

          <Row className="g-4">
            <Col md={6}>
              <div className="mb-3">
                <span className="badge bg-primary text-white p-2">
                  Current Order Status: {order?.Delivery || 'N/A'}
                </span>
              </div>

              <Form.Group className="mb-4">
                <Form.Label className="label text-secondary fw-semibold">
                  Order Status
                </Form.Label>

                <Form.Select
                  name="deliveryStatus"
                  onChange={(e) => setDelivery(e.target.value)}
                  className="form-select h-55 rounded shadow-sm"
                  value={delivery || ''}
                >
                  <option disabled value="">
                    -- Select Order Status --
                  </option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </Form.Select>

                <Form.Text className="text-muted">
                  Update the current delivery/order status.
                </Form.Text>
              </Form.Group>

              <div className="d-flex gap-2">
                <button
                  onClick={handleResetDelivery}
                  className="btn btn-outline-danger px-4"
                  disabled={loading}
                >
                  Reset Order Status
                </button>

                <button
                  onClick={handleDeliverySubmit}
                  className="btn btn-success px-4"
                  disabled={loading || !delivery}
                >
                  Save Order Status
                </button>
              </div>
            </Col>

            <Col md={6}>
              <div className="mb-3">
                <span
                  className={`badge p-2 ${
                    order?.isPaid ? 'bg-success' : 'bg-warning text-dark'
                  }`}
                >
                  Current Payment Status:{' '}
                  {order?.paymentMethod?.status || 'N/A'}
                </span>
              </div>

              <Form.Group className="mb-3">
                <Form.Label className="label text-secondary fw-semibold">
                  Payment Status
                </Form.Label>

                <Form.Select
                  name="paymentStatus"
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="form-select h-55 rounded shadow-sm"
                  value={paymentStatus || ''}
                >
                  <option disabled value="">
                    -- Select Payment Status --
                  </option>
                  <option value="pending">Pending</option>
                  <option value="submitted">Submitted</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                </Form.Select>

                <Form.Text className="text-muted">
                  Mark payment as pending, submitted, paid, or failed.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="label text-secondary fw-semibold">
                  Transaction ID
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Enter transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="h-55 rounded shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label text-secondary fw-semibold">
                  Admin Note
                </Form.Label>

                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Optional admin note"
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  className="rounded shadow-sm"
                />
              </Form.Group>

              <button
                onClick={handlePaymentSubmit}
                className="btn btn-success px-4"
                disabled={loading || !paymentStatus}
              >
                Save Payment Status
              </button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between flex-wrap gap-2">
            <div>
              <h3 className="text-secondary mb-4">
                Order ID #{order?.orderId || tracking || 'N/A'}
              </h3>

              <span className="d-block mb-2">
                Payment Method: {order?.paymentMethod?.method || 'N/A'}
              </span>

              <span className="d-block mb-2">
                Transaction ID:{' '}
                {order?.paymentMethod?.transactionId ||
                  order?.manualPayment?.transactionId ||
                  'N/A'}
              </span>

              <span className="d-block mb-2">
                Paid At: {formatDate(order?.paidAt)}
              </span>

              <span className="d-block">
                Date:{' '}
                {order?.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : 'N/A'}
              </span>
            </div>

            <div className="text-md-end">
              <h3 className="text-secondary mb-2">
                Total: {order?.totalPrice || 0}
              </h3>

              <span
                className={`badge ${
                  order?.isPaid ? 'bg-success' : 'bg-warning text-dark'
                } p-2`}
              >
                {order?.isPaid ? 'Paid' : 'Unpaid'}
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-between tracking-step style-two flex-wrap gap-3 my-lg-5 my-4">
            {order?.tracking?.map((track, i) => (
              <div key={i}>
                <span
                  className={`text-secondary fw-semibold count text-center mb-3 ${
                    track.status === 'delivered'
                      ? 'bg-success text-white'
                      : order.Delivery === track.status
                      ? 'bg-primary text-white'
                      : 'bg-white'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="d-block text-secondary fw-semibold fs-16 mb-1">
                  {track.status.charAt(0).toUpperCase() +
                    track.status.slice(1)}
                </span>

                <span>{formatDate(track.date)}</span>
              </div>
            ))}
          </div>

          <span className="fw-semibold text-secondary mb-2 pb-1 d-block">
            View Details:
          </span>

          {order?.tracking
            ?.slice()
            .reverse()
            .map((track, i) => (
              <span key={i} className="mb-2 pb-1 d-block">
                {formatDate(track.date)}:{' '}
                <span className="text-secondary">{track.message}</span>
              </span>
            ))}
        </Card.Body>
      </Card>
    </>
  );
};

export default OrderTracking;