'use client';

import React from 'react';
import { Card, Spinner, Alert } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '@/features/OrderSlice';

const BillingDetails = ({ details }) => {
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
  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <h3 className="mb-3">Shipping Details</h3>

          <div className="d-flex align-items-center mb-2">
            <span className="text-secondary">Name:</span>
            <span className="ms-1">{order?.user?.firstName + ' ' + order?.user?.lastName}</span>
          </div>

          <div className="d-flex align-items-center mb-2">
            <span className="text-secondary">Email:</span>
            <span className="ms-1">{order?.user?.email}</span>
          </div>

          <div className="d-flex align-items-center mb-2">
            <span className="text-secondary">Phone:</span>
            <span className="ms-1">+88{order?.user?.phone}</span>
          </div>

          <div className="d-flex mb-0">
            <span className="text-secondary">Address:</span>

            <span className="ms-1">{order?.shippingAddress?.address}</span>
            <span className="ms-1">{order?.shippingAddress?.city + ' ' + order?.shippingAddress?.postalCode}</span>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default BillingDetails;
