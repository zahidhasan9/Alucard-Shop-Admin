'use client';

import { Card, Col, Row, Form, Spinner, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById, updateDeliveryStatus, resetDeliveryStatus } from '@/features/OrderSlice';

const OrderTracking = ({ tracking }) => {
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.order);
  const [delivery, setDelivery] = useState('');
  useEffect(() => {
    if (tracking) dispatch(fetchOrderById(tracking));
  }, [dispatch, tracking]);

  const handleSubmit = () => {
    dispatch(updateDeliveryStatus({ orderId: tracking, status: delivery }));
  };

  const handleReset = () => {
    dispatch(resetDeliveryStatus({ orderId: tracking }));
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
          <h3 className="mb-3 mb-lg-4">Order Status</h3>

          <Row>
            <Col sm={6} lg={12}>
              {/* Current Status Badge */}
              <div className="mb-2">
                <span className="badge bg-primary text-white p-2">Current Status: {order?.Delivery || 'N/A'}</span>
              </div>

              {/* Order Status Dropdown */}
              <Form.Group className="mb-4">
                <Form.Label className="label text-secondary fw-semibold">Order Status</Form.Label>

                <Form.Select
                  name="deliveryStatus"
                  onChange={(e) => setDelivery(e.target.value)}
                  className="form-select h-55 rounded shadow-sm"
                  value={delivery || ''} // if you're using formData state
                >
                  <option disabled value="">
                    -- Select Order Status --
                  </option>
                  <option value="pending">Pending</option>
                  <option value="confirmed"> Confirmed</option>
                  <option value="shipped"> Shipped</option>
                  <option value="delivered"> Delivered</option>
                </Form.Select>

                <Form.Text className="text-muted">Please update the current status of the order.</Form.Text>
              </Form.Group>

              {/* Submit/Save Button */}
              <div className="d-flex justify-content-between">
                <button onClick={handleReset} className="btn btn-success px-4">
                  Reset Status
                </button>

                <button onClick={handleSubmit} className="btn btn-success px-4">
                  Save Status
                </button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* --------------------------------- */}
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between flex-wrap gap-2">
            <div>
              <h3 className="text-secondary mb-4">Order ID #{tracking || 'N/A'}</h3>
              <span className="d-block mb-2">IBAN: EST6049283742809</span>
              <span className="d-block">
                Date: {order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <h3 className="text-secondary mb-0">Tracking ID: 000346798254</h3>
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
                  {track.status.charAt(0).toUpperCase() + track.status.slice(1)}
                </span>
                <span>{new Date(track.date).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <span className="fw-semibold text-secondary mb-2 pb-1 d-block">View Details:</span>
          {order?.tracking
            ?.slice()
            .reverse()
            .map((track, i) => (
              <span key={i} className="mb-2 pb-1 d-block">
                {new Date(track.date).toLocaleString()}: <span className="text-secondary">{track.message}</span>
              </span>
            ))}
        </Card.Body>
      </Card>
    </>
  );
};

export default OrderTracking;
// const order = {
//   _id: '64b8f1f3a5d9e4a5f1b2c3d4',
//   user: '64123456789abcdef0123456',
//   orderId: 'ORD-A1B2C3D4',
//   orderItems: [
//     {
//       name: 'Apple iPhone 14 Pro Max',
//       qty: 1,
//       image: '/images/iphone14promax.jpg',
//       price: 1200,
//       slug: 'iphone-14-pro-max',
//       product: '62cdef1234567890abcdef12'
//     },
//     {
//       name: 'Apple AirPods Pro',
//       qty: 1,
//       image: '/images/airpodspro.jpg',
//       price: 250,
//       slug: 'airpods-pro',
//       product: '62cdef9876543210abcdef98'
//     }
//   ],
//   shippingAddress: {
//     address: '123, Banana Street',
//     city: 'Dhaka',
//     postalCode: '1205',
//     division: 'Dhaka'
//   },
//   paymentMethod: {
//     method: 'stripe',
//     status: 'paid',
//     paidAt: '2024-03-22T11:35:00.000Z'
//   },
//   paymentResult: {
//     id: 'PAYID-1234567890',
//     status: 'Completed',
//     update_time: '2024-03-22T11:40:00.000Z',
//     email_address: 'customer@example.com'
//   },
//   itemsPrice: 1450,
//   taxPrice: 100,
//   shippingPrice: 20,
//   totalPrice: 1570,
//   isPaid: true,
//   paidAt: '2024-03-22T11:35:00.000Z',
//   Delivery: 'shipped',
//   deliveredAt: null,
//   tracking: [
//     {
//       status: 'pending',
//       message: 'Your order has been placed and is now pending.',
//       date: '2024-03-22T11:35:00.000Z'
//     },
//     {
//       status: 'confirmed',
//       message: 'Your order has been confirmed.',
//       date: '2024-03-23T10:35:00.000Z'
//     },
//     {
//       status: 'shipped',
//       message: 'Your order has been shipped.',
//       date: '2024-03-24T15:45:00.000Z'
//     },
//     {
//       status: 'delivered',
//       message: 'Your order has been delivered.',
//       date: '2024-03-24T15:45:00.000Z'
//     }
//   ],
//   createdAt: '2024-03-22T11:35:00.000Z',
//   updatedAt: '2024-03-24T15:45:00.000Z',
//   __v: 0
// };
