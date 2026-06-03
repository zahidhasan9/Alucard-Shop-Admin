'use client';

import { Card, Spinner, Alert, Row, Col, Badge } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '@/features/OrderSlice';

const RecentOrders = ({ details }) => {
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (details) dispatch(fetchOrderById(details));
  }, [dispatch, details]);

  const formatCurrency = (amount) => {
    return `${Number(amount || 0).toLocaleString()} tk`;
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString();
  };

  const getStatusBadge = (status) => {
    const value = status || 'pending';

    const badgeMap = {
      pending: 'warning',
      confirmed: 'info',
      shipped: 'primary',
      delivered: 'success',
      paid: 'success',
      submitted: 'info',
      failed: 'danger',
      rejected: 'danger',
      verified: 'success',
    };

    return badgeMap[value] || 'secondary';
  };

  const renderSelectedVariants = (selectedVariants) => {
    if (!selectedVariants) return null;

    const variantEntries = Array.isArray(selectedVariants)
      ? selectedVariants
      : Object.entries(selectedVariants);

    if (!variantEntries.length) return null;

    return (
      <div className="mt-1">
        {variantEntries.map(([key, value], index) => (
          <small key={index} className="d-block text-muted">
            {key}: {value}
          </small>
        ))}
      </div>
    );
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

  if (!order) {
    return (
      <Alert variant="warning" className="my-5">
        No order details found.
      </Alert>
    );
  }

  return (
    <>
      {/* Order Header Summary */}
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
            <div>
              <h3 className="mb-2">Order Details</h3>
              <p className="text-muted mb-0">
                Order ID:{' '}
                <span className="fw-semibold text-secondary">
                  #{order?.orderId || 'N/A'}
                </span>
              </p>
              <p className="text-muted mb-0">
                Placed On:{' '}
                <span className="fw-semibold text-secondary">
                  {formatDate(order?.createdAt)}
                </span>
              </p>
            </div>

            <div className="text-md-end">
              <h3 className="mb-2">{formatCurrency(order?.totalPrice)}</h3>

              <div className="d-flex justify-content-md-end gap-2 flex-wrap">
                <Badge bg={getStatusBadge(order?.Delivery)} className="p-2">
                  Order: {order?.Delivery || 'Pending'}
                </Badge>

                <Badge
                  bg={order?.isPaid ? 'success' : 'warning'}
                  text={order?.isPaid ? 'white' : 'dark'}
                  className="p-2"
                >
                  Payment:{' '}
                  {order?.paymentMethod?.status ||
                    (order?.isPaid ? 'Paid' : 'Pending')}
                </Badge>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Customer, Shipping, Payment */}
      <Row className="g-4 mb-4">
        <Col lg={4}>
          <Card className="bg-white border-0 rounded-3 h-100">
            <Card.Body className="p-4">
              <h5 className="mb-3">Customer Information</h5>

              <p className="mb-2">
                <span className="text-muted">Name:</span>{' '}
                <span className="fw-semibold">
                  {order?.shippingAddress?.fullName || 'N/A'}
                </span>
              </p>

              <p className="mb-2">
                <span className="text-muted">Phone:</span>{' '}
                <span className="fw-semibold">
                  {order?.shippingAddress?.phone || 'N/A'}
                </span>
              </p>

              <p className="mb-0">
                <span className="text-muted">Email:</span>{' '}
                <span className="fw-semibold">
                  {order?.shippingAddress?.email || 'N/A'}
                </span>
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="bg-white border-0 rounded-3 h-100">
            <Card.Body className="p-4">
              <h5 className="mb-3">Shipping Address</h5>

              <p className="mb-2">
                {order?.shippingAddress?.address || 'N/A'}
              </p>

              <p className="mb-2 text-muted">
                {order?.shippingAddress?.city || 'N/A'},{' '}
                {order?.shippingAddress?.division || 'N/A'}
              </p>

              <p className="mb-0 text-muted">
                Postal Code: {order?.shippingAddress?.postalCode || 'N/A'}
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="bg-white border-0 rounded-3 h-100">
            <Card.Body className="p-4">
              <h5 className="mb-3">Payment Information</h5>

              <p className="mb-2">
                <span className="text-muted">Method:</span>{' '}
                <span className="fw-semibold text-uppercase">
                  {order?.paymentMethod?.method || 'N/A'}
                </span>
              </p>

              <p className="mb-2">
                <span className="text-muted">Status:</span>{' '}
                <Badge
                  bg={getStatusBadge(order?.paymentMethod?.status)}
                  className="p-2"
                >
                  {order?.paymentMethod?.status || 'Pending'}
                </Badge>
              </p>

              <p className="mb-2">
                <span className="text-muted">Transaction ID:</span>{' '}
                <span className="fw-semibold">
                  {order?.paymentMethod?.transactionId ||
                    order?.manualPayment?.transactionId ||
                    'N/A'}
                </span>
              </p>

              <p className="mb-0">
                <span className="text-muted">Paid At:</span>{' '}
                <span className="fw-semibold">
                  {formatDate(order?.paidAt || order?.paymentMethod?.paidAt)}
                </span>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Product Items */}
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-lg-4 mb-3">
            <div>
              <h3 className="mb-1">Ordered Products</h3>
              <p className="text-muted mb-0">
                Total Items: {order?.orderItems?.length || 0}
              </p>
            </div>
          </div>

          <div className="default-table-area all-carts">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Variant / SKU</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Line Total</th>
                  </tr>
                </thead>

                <tbody>
                  {order?.orderItems?.length > 0 ? (
                    order.orderItems.map((item, idx) => (
                      <tr key={item?._id || idx}>
                        <td>
                          <Link
                            href={`/ecommerce/product-details?slug=${item.slug}`}
                            className="d-flex align-items-center text-decoration-none"
                          >
                            {item?.image ? (
                              <Image
                                src={item.image}
                                className="wh-40 rounded-3 object-fit-cover"
                                alt={item?.name || 'Product image'}
                                width={40}
                                height={40}
                              />
                            ) : (
                              <div
                                className="wh-40 rounded-3 bg-light d-flex align-items-center justify-content-center"
                                style={{ width: 40, height: 40 }}
                              >
                                <small className="text-muted">N/A</small>
                              </div>
                            )}

                            <div className="ms-2 ps-1">
                              <h6 className="fw-medium fs-14 mb-1 text-secondary">
                                {item?.name || 'Unnamed Product'}
                              </h6>

                              {item?.slug && (
                                <small className="text-muted">
                                  Slug: {item.slug}
                                </small>
                              )}
                            </div>
                          </Link>
                        </td>

                        <td>
                          {item?.variantLabel ? (
                            <span className="fw-semibold">
                              {item.variantLabel}
                            </span>
                          ) : (
                            <span className="text-muted">Default</span>
                          )}

                          {item?.variantSku && (
                            <small className="d-block text-muted">
                              SKU: {item.variantSku}
                            </small>
                          )}

                          {renderSelectedVariants(item?.selectedVariants)}
                        </td>

                        <td className="text-body">
                          {formatCurrency(item?.price)}
                        </td>

                        <td>
                          <Badge bg="light" text="dark" className="p-2">
                            x {item?.qty || 0}
                          </Badge>
                        </td>

                        <td className="fw-semibold text-secondary">
                          {formatCurrency((item?.price || 0) * (item?.qty || 0))}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-4">
                        No ordered products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Price Summary + Tracking */}
      <Row className="g-4">
        <Col lg={6}>
          <Card className="bg-white border-0 rounded-3 mb-4 h-100">
            <Card.Body className="p-4">
              <h5 className="mb-3">Price Summary</h5>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Items Price</span>
                <span className="fw-semibold">
                  {formatCurrency(order?.itemsPrice)}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Shipping Charge</span>
                <span className="fw-semibold">
                  {formatCurrency(order?.shippingPrice)}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Tax</span>
                <span className="fw-semibold">
                  {formatCurrency(order?.taxPrice)}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Discount</span>
                <span className="fw-semibold text-danger">
                  - {formatCurrency(order?.discountPrice)}
                </span>
              </div>

              {order?.coupon?.code && (
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Coupon</span>
                  <Badge bg="success" className="p-2">
                    {order.coupon.code}
                  </Badge>
                </div>
              )}

              <hr />

              <div className="d-flex justify-content-between">
                <h5 className="mb-0">Grand Total</h5>
                <h5 className="mb-0 text-secondary">
                  {formatCurrency(order?.totalPrice)}
                </h5>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="bg-white border-0 rounded-3 mb-4 h-100">
            <Card.Body className="p-4">
              <h5 className="mb-3">Order Activity</h5>

              {order?.tracking?.length > 0 ? (
                order.tracking
                  .slice()
                  .reverse()
                  .map((track, index) => (
                    <div
                      key={index}
                      className="d-flex gap-3 border-bottom pb-3 mb-3"
                    >
                      <div>
                        <Badge
                          bg={getStatusBadge(track?.status)}
                          className="p-2 text-capitalize"
                        >
                          {track?.status || 'N/A'}
                        </Badge>
                      </div>

                      <div>
                        <p className="mb-1 fw-semibold text-secondary">
                          {track?.message || 'No message available'}
                        </p>
                        <small className="text-muted">
                          {formatDate(track?.date)}
                        </small>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-muted mb-0">No tracking activity found.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default RecentOrders;