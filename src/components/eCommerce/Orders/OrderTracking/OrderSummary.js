'use client';

import { Card, Table, Spinner, Alert } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '@/features/OrderSlice';

const OrderSummary = ({ tracking }) => {
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (tracking) dispatch(fetchOrderById(tracking));
  }, [dispatch, tracking]);

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

          <div className="default-table-area">
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
        </Card.Body>
      </Card>
    </>
  );
};

export default OrderSummary;
