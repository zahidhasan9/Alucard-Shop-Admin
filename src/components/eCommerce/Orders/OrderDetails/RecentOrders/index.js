'use client';

import { Card, Spinner, Alert } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import ProductQuantity from './ProductQuantity';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '@/features/OrderSlice';
const RecentOrders = ({ details }) => {
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
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-lg-4 mb-3">
            <h3 className="mb-0">Recent Orders</h3>
            <h3 className="mb-0">Order ID : {order?.orderId}</h3>
          </div>

          <div className="default-table-area all-carts">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order && order.orderItems && order.orderItems.length > 0 ? (
                    order.orderItems.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <Link href="/ecommerce/product-details" className="d-flex align-items-center">
                            <Image
                              src={item.image}
                              className="wh-40 rounded-3"
                              alt="product-1"
                              width={40}
                              height={40}
                            />
                            <div className="ms-2 ps-1">
                              <h6 className="fw-medium fs-14 mb-0">{item.name}</h6>
                            </div>
                          </Link>
                        </td>
                        <td>
                          <ProductQuantity counts={item.qty} />
                        </td>
                        <td className="text-body">{item.price} tk</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default RecentOrders;
