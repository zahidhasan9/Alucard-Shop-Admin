'use client';

import { Card, Table, Spinner, Alert } from 'react-bootstrap';
// import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '@/features/OrderSlice';

const OrderSummary = ({ details }) => {
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
          <h3 className="mb-3 mb-lg-4">Order Summary</h3>

          <div className="default-table-area mb-3 mb-lg-4">
            <div className="table-responsive">
              <Table className="table align-middle">
                <thead>
                  <tr>
                    <th scope="col">Description</th>
                    <th scope="col" className="text-end">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sub Total :</td>
                    <td className="text-end">
                      ৳{' '}
                      {parseFloat(order?.itemsPrice)?.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </td>
                  </tr>
                  {/* <tr>
                    <td>Discount :</td>
                    <td className="text-end">0.00</td>
                  </tr> */}
                  <tr>
                    <td>Tax :</td>
                    <td className="text-end">
                      ৳{' '}
                      {parseFloat(order?.taxPrice)?.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td>Shipping Charge :</td>
                    <td className="text-end">
                      ৳{' '}
                      {parseFloat(order?.shippingPrice)?.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </td>
                  </tr>
                  {/* <tr>
                    <td>Coupon Charge :</td>
                    <td className="text-secondary text-end">$20.00</td>
                  </tr> */}
                  <tr>
                    <td className="text-secondary fw-medium">Total :</td>
                    <td className="text-secondary fw-medium text-end">
                      ৳{' '}
                      {parseFloat(order?.totalPrice)?.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>

          <div>
            <h6 className="label fs-15 fw-bold text-secondary mb-2">Payment Method</h6>

            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                {/* <div className="flex-shrink-0">
                  <Image src="/images/master-card.png" alt="master-card" width={50} height={32} />
                </div> */}
                <div className="flex-grow-1 ms-2">
                  <span className="d-block fw-medium fs-15 text-secondary">Payment</span>
                  <span className="fs-13">{order?.paymentMethod?.method}</span>
                </div>
              </div>
              <span>
                ৳{' '}
                {parseFloat(order?.totalPrice)?.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default OrderSummary;
