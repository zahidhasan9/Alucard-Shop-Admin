'use client';

import { Card, Spinner, Alert } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '@/features/OrderSlice';

const TrackingID = ({ details }) => {
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (details) dispatch(fetchOrderById(details));
  }, [dispatch, details]);

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
  const getActiveClass = (step) => {
    const orderStatus = order?.Delivery;
    const statusOrder = ['pending', 'confirmed', 'shipped', 'delivered'];
    return statusOrder.indexOf(orderStatus) >= statusOrder.indexOf(step) ? 'active' : '';
  };
  return (
    <>
      <Card className="bg-primary border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <h3 className="text-white mb-lg-4 mb-3">Tracking ID: {order?.orderId}</h3>

          <div className={'d-flex justify-content-between tracking-step flex-wrap gap-3'}>
            <div>
              <span className={`text-white fw-semibold count text-center mb-3 ${getActiveClass('pending')} `}>01</span>
              <span className="d-block text-white fw-semibold">Order Placed</span>
            </div>

            <div className="text-center">
              <span className={`text-white fw-semibold count text-center mb-3 ${getActiveClass('confirmed')} `}>
                02
              </span>
              <span className="d-block text-white fw-semibold">Packed</span>
            </div>

            <div className="text-center">
              <span className={`text-white fw-semibold count text-center mb-3 ${getActiveClass('shipped')} `}>03</span>
              <span className="d-block text-white fw-semibold">Shipped</span>
            </div>

            <div className="text-end">
              <span className={`text-white fw-semibold count text-center mb-3 ${getActiveClass('delivered')} `}>
                04
              </span>
              <span className="d-block text-white fw-semibold">Delivered</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default TrackingID;
