'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Form,
  ProgressBar,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import { getDashboardStats } from '@/features/API';

const formatMoney = (value) => `৳${new Intl.NumberFormat('en-BD').format(Number(value || 0))}`;
const formatNumber = (value) => new Intl.NumberFormat('en-BD').format(Number(value || 0));

const getPayload = (response) => response?.data?.data || response?.data || response;

const statusVariant = {
  pending: 'warning',
  confirmed: 'info',
  shipped: 'primary',
  delivered: 'success',
  approved: 'success',
  rejected: 'danger',
  refunded: 'success',
  cancelled: 'secondary',
  received: 'info',
};

const SummaryCard = ({ title, value, subtitle, icon, trend, variant = 'primary' }) => {
  const hasTrend = trend !== undefined && trend !== null;
  const isPositive = Number(trend || 0) >= 0;

  return (
    <Card className="border-0 rounded-3 bg-white shadow-sm h-100">
      <Card.Body className="p-4">
        <div className="d-flex align-items-start justify-content-between gap-3">
          <div>
            <span className="text-secondary small fw-medium">{title}</span>
            <h3 className="mb-1 mt-2 fw-bold">{value}</h3>
            <p className="mb-0 text-secondary small">{subtitle}</p>
          </div>

          <div className={`bg-${variant} bg-opacity-10 text-${variant} rounded-3 p-2 d-inline-flex`}>
            <span className="material-symbols-outlined">{icon}</span>
          </div>
        </div>

        {hasTrend && (
          <div className="mt-3 small">
            <Badge bg={isPositive ? 'success' : 'danger'} className="fw-medium">
              {isPositive ? '+' : ''}
              {trend}%
            </Badge>{' '}
            <span className="text-secondary">vs previous period</span>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

const EmptyState = ({ text }) => (
  <div className="text-center text-secondary py-4 small">{text}</div>
);

const DashboardOverview = () => {
  const [range, setRange] = useState('7d');
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [Chart, setChart] = useState(null);

  useEffect(() => {
    import('react-apexcharts').then((module) => setChart(() => module.default));
  }, []);

  const fetchDashboard = useCallback(async (selectedRange = range) => {
    try {
      setLoading(true);
      setError('');

      const response = await getDashboardStats({
        range: selectedRange,
        lowStockLimit: 5,
      });

      setDashboard(getPayload(response));
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Dashboard data load failed');
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    fetchDashboard(range);
  }, [range, fetchDashboard]);

  const summary = dashboard?.summary || {};
  const charts = dashboard?.charts || {};

  const salesTrend = charts.salesTrend || [];
  const customerGrowth = charts.customerGrowth || [];
  const orderStatus = charts.orderStatus || {};

  const recentOrders = dashboard?.recentOrders || [];
  const topSellingProducts = dashboard?.topSellingProducts || [];
  const lowStockProducts = dashboard?.lowStockProducts || [];
  const latestQuestions = dashboard?.latestQuestions || [];
  const latestReviews = dashboard?.latestReviews || [];
  const recentReturnRequests = dashboard?.recentReturnRequests || [];

  const salesChart = useMemo(() => ({
    series: [
      {
        name: 'Revenue',
        data: salesTrend.map((item) => Number(item.revenue || 0)),
      },
      {
        name: 'Orders',
        data: salesTrend.map((item) => Number(item.orders || 0)),
      },
    ],
    options: {
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      grid: {
        borderColor: '#ECEEF2',
      },
      xaxis: {
        categories: salesTrend.map((item) => item.date),
      },
      yaxis: {
        labels: {
          formatter: (value) => formatNumber(value),
        },
      },
      tooltip: {
        y: {
          formatter: (value, { seriesIndex }) =>
            seriesIndex === 0 ? formatMoney(value) : `${formatNumber(value)} orders`,
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
      },
    },
  }), [salesTrend]);

  const orderStatusChart = useMemo(() => {
    const labels = ['Pending', 'Confirmed', 'Shipped', 'Delivered'];

    return {
      series: [
        orderStatus.pending?.count || 0,
        orderStatus.confirmed?.count || 0,
        orderStatus.shipped?.count || 0,
        orderStatus.delivered?.count || 0,
      ],
      options: {
        labels,
        legend: {
          position: 'bottom',
        },
        tooltip: {
          y: {
            formatter: (value) => `${formatNumber(value)} orders`,
          },
        },
      },
    };
  }, [orderStatus]);

  const customerChart = useMemo(() => ({
    series: [
      {
        name: 'New Customers',
        data: customerGrowth.map((item) => Number(item.customers || 0)),
      },
    ],
    options: {
      chart: {
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      grid: {
        borderColor: '#ECEEF2',
      },
      xaxis: {
        categories: customerGrowth.map((item) => item.date),
      },
    },
  }), [customerGrowth]);

  if (loading && !dashboard) {
    return (
      <div className="d-flex align-items-center justify-content-center py-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <div className="ecommerce-dashboard">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="mb-1 fw-bold">Admin Dashboard</h2>
          <p className="mb-0 text-secondary">
            Live store overview, sales, stock, orders, reviews and support queue.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Form.Select
            size="sm"
            value={range}
            onChange={(event) => setRange(event.target.value)}
            style={{ minWidth: 150 }}
          >
            <option value="today">Today</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="yearly">Yearly</option>
          </Form.Select>

          <Button size="sm" variant="primary" onClick={() => fetchDashboard(range)} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="g-4 mb-4">
        <Col xxl={3} xl={3} lg={6} md={6}>
          <SummaryCard
            title="Total Sales"
            value={formatMoney(summary.totalSales)}
            subtitle={`${formatNumber(summary.totalOrders)} total orders`}
            icon="payments"
            trend={summary.revenueGrowth}
            variant="success"
          />
        </Col>

        <Col xxl={3} xl={3} lg={6} md={6}>
          <SummaryCard
            title="Today Sales"
            value={formatMoney(summary.todaySales)}
            subtitle={`${formatNumber(summary.todayOrders)} orders today`}
            icon="today"
            variant="primary"
          />
        </Col>

        <Col xxl={3} xl={3} lg={6} md={6}>
          <SummaryCard
            title="Customers"
            value={formatNumber(summary.totalCustomers)}
            subtitle={`${formatNumber(summary.newCustomers)} new in selected range`}
            icon="groups"
            variant="info"
          />
        </Col>

        <Col xxl={3} xl={3} lg={6} md={6}>
          <SummaryCard
            title="Products"
            value={formatNumber(summary.totalProducts)}
            subtitle={`${formatNumber(summary.lowStockProducts)} low stock`}
            icon="inventory_2"
            variant="warning"
          />
        </Col>
      </Row>

      <Row className="g-4 mb-4">
  <Col xxl={3} xl={3} lg={6} md={6}>
    <SummaryCard
      title="Active Coupons"
      value={formatNumber(summary.activeCoupons)}
      subtitle="Currently active coupon codes"
      icon="confirmation_number"
      variant="info"
    />
  </Col>

  <Col xxl={3} xl={3} lg={6} md={6}>
    <SummaryCard
      title="Coupon Usage"
      value={formatNumber(summary.couponUsedCount)}
      subtitle="Total coupon used by customers"
      icon="redeem"
      variant="success"
    />
  </Col>

  <Col xxl={3} xl={3} lg={6} md={6}>
    <SummaryCard
      title="Abandoned Carts"
      value={formatNumber(summary.abandonedCarts)}
      subtitle="Customers with items in cart"
      icon="shopping_cart"
      variant="warning"
    />
  </Col>

  <Col xxl={3} xl={3} lg={6} md={6}>
    <SummaryCard
      title="Total Discount"
      value={formatMoney(summary.totalDiscount)}
      subtitle="Discount given from orders"
      icon="sell"
      variant="danger"
    />
  </Col>
</Row>

      <Row className="g-4 mb-4">
        <Col xxl={8} xl={8} lg={12}>
          <Card className="border-0 rounded-3 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <h5 className="mb-1 fw-bold">Sales Analytics</h5>
                  <p className="mb-0 text-secondary small">Revenue and order trend</p>
                </div>
              </div>

              {Chart ? (
                <Chart
                  options={salesChart.options}
                  series={salesChart.series}
                  type="line"
                  height={330}
                />
              ) : (
                <EmptyState text="Loading chart..." />
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col xxl={4} xl={4} lg={12}>
          <Card className="border-0 rounded-3 shadow-sm h-100">
            <Card.Body className="p-4">
              <h5 className="mb-1 fw-bold">Order Status</h5>
              <p className="mb-3 text-secondary small">Pending, confirmed, shipped and delivered</p>

              {Chart ? (
                <Chart
                  options={orderStatusChart.options}
                  series={orderStatusChart.series}
                  type="donut"
                  height={300}
                />
              ) : (
                <EmptyState text="Loading chart..." />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col xxl={3} xl={3} lg={6} md={6}>
          <SummaryCard
            title="Pending Orders"
            value={formatNumber(summary.pendingOrders)}
            subtitle="Need admin action"
            icon="pending_actions"
            variant="warning"
          />
        </Col>

        <Col xxl={3} xl={3} lg={6} md={6}>
          <SummaryCard
            title="Delivered Orders"
            value={formatNumber(summary.deliveredOrders)}
            subtitle="Completed orders"
            icon="local_shipping"
            variant="success"
          />
        </Col>

        <Col xxl={3} xl={3} lg={6} md={6}>
          <SummaryCard
            title="Reviews"
            value={formatNumber(summary.totalReviews)}
            subtitle={`Average rating ${summary.averageRating || 0}/5`}
            icon="reviews"
            variant="primary"
          />
        </Col>

        <Col xxl={3} xl={3} lg={6} md={6}>
          <SummaryCard
            title="Support Queue"
            value={formatNumber(summary.unansweredQuestions)}
            subtitle={`${formatNumber(summary.pendingReturnRequests)} pending returns`}
            icon="support_agent"
            variant="danger"
          />
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col xxl={8} xl={8} lg={12}>
          <Card className="border-0 rounded-3 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <h5 className="mb-1 fw-bold">Recent Orders</h5>
                  <p className="mb-0 text-secondary small">Latest customer orders</p>
                </div>
                <Link href="/ecommerce/orders" className="btn btn-sm btn-outline-primary">
                  View All
                </Link>
              </div>

              <div className="table-responsive">
                <Table hover className="align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.length > 0 ? (
                      recentOrders.map((order) => (
                        <tr key={order._id}>
                          <td className="fw-semibold">{order.orderId || order._id}</td>
                          <td>
                            {order.user
                              ? `${order.user.firstName || ''} ${order.user.lastName || ''}`.trim()
                              : order.shippingAddress?.fullName || 'Guest'}
                            <div className="text-secondary small">
                              {order.user?.email || order.shippingAddress?.phone || ''}
                            </div>
                          </td>
                          <td>{formatMoney(order.totalPrice)}</td>
                          <td>
                            <Badge bg={order.isPaid ? 'success' : 'secondary'}>
                              {order.paymentMethod?.method || 'cod'}
                            </Badge>
                          </td>
                          <td>
                            <Badge bg={statusVariant[order.Delivery] || 'secondary'}>
                              {order.Delivery || 'pending'}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5}>
                          <EmptyState text="No recent orders found." />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xxl={4} xl={4} lg={12}>
          <Card className="border-0 rounded-3 shadow-sm h-100">
            <Card.Body className="p-4">
              <h5 className="mb-1 fw-bold">Customer Growth</h5>
              <p className="mb-3 text-secondary small">New users in selected range</p>

              {Chart ? (
                <Chart
                  options={customerChart.options}
                  series={customerChart.series}
                  type="area"
                  height={300}
                />
              ) : (
                <EmptyState text="Loading chart..." />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col xxl={6} xl={6} lg={12}>
          <Card className="border-0 rounded-3 shadow-sm h-100">
            <Card.Body className="p-4">
              <h5 className="mb-1 fw-bold">Top Selling Products</h5>
              <p className="mb-3 text-secondary small">Products with highest sold quantity</p>

              {topSellingProducts.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {topSellingProducts.map((product) => (
                    <div key={product.productId || product.name} className="d-flex align-items-center gap-3">
                      <img
                        src={product.image || '/images/placeholder.png'}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="rounded object-fit-cover border"
                      />

                      <div className="flex-grow-1">
                        <div className="fw-semibold">{product.name}</div>
                        <div className="text-secondary small">
                          Sold: {formatNumber(product.soldQty)} · Stock: {formatNumber(product.stock)}
                        </div>
                        <ProgressBar
                          now={Math.min(Number(product.soldQty || 0), 100)}
                          className="mt-2"
                          style={{ height: 6 }}
                        />
                      </div>

                      <div className="fw-bold">{formatMoney(product.revenue)}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState text="No top selling products yet." />
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col xxl={6} xl={6} lg={12}>
          <Card className="border-0 rounded-3 shadow-sm h-100">
            <Card.Body className="p-4">
              <h5 className="mb-1 fw-bold">Low Stock Alert</h5>
              <p className="mb-3 text-secondary small">Products that need restocking</p>

              {lowStockProducts.length > 0 ? (
                <div className="table-responsive">
                  <Table hover className="align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>SKU</th>
                        <th>Stock</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lowStockProducts.map((product) => (
                        <tr key={product._id}>
                          <td>
                            <div className="fw-semibold">{product.name}</div>
                            <div className="text-secondary small">{product.slug}</div>
                          </td>
                          <td>{product.sku || '-'}</td>
                          <td>
                            <Badge bg={Number(product.countInStock || 0) === 0 ? 'danger' : 'warning'}>
                              {formatNumber(product.countInStock)}
                            </Badge>
                          </td>
                          <td>{formatMoney(product.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <EmptyState text="No low stock products found." />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col xxl={4} xl={4} lg={12}>
          <Card className="border-0 rounded-3 shadow-sm h-100">
            <Card.Body className="p-4">
              <h5 className="mb-1 fw-bold">Latest Reviews</h5>
              <p className="mb-3 text-secondary small">Recent customer feedback</p>

              {latestReviews.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {latestReviews.map((review) => (
                    <div key={review._id} className="border-bottom pb-3">
                      <div className="d-flex justify-content-between gap-2">
                        <div className="fw-semibold">
                          {review.user
                            ? `${review.user.firstName || ''} ${review.user.lastName || ''}`.trim()
                            : 'Customer'}
                        </div>
                        <Badge bg={statusVariant[review.status] || 'secondary'}>
                          {review.status || 'pending'}
                        </Badge>
                      </div>
                      <div className="text-warning small">
                        {'★'.repeat(Number(review.rating || 0))}
                      </div>
                      <p className="mb-0 small text-secondary">
                        {review.comment?.slice(0, 110)}
                        {review.comment?.length > 110 ? '...' : ''}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState text="No reviews found." />
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col xxl={4} xl={4} lg={12}>
          <Card className="border-0 rounded-3 shadow-sm h-100">
            <Card.Body className="p-4">
              <h5 className="mb-1 fw-bold">Unanswered Q&A</h5>
              <p className="mb-3 text-secondary small">Customer questions waiting for admin</p>

              {latestQuestions.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {latestQuestions.map((question) => (
                    <div key={question._id} className="border-bottom pb-3">
                      <div className="fw-semibold">
                        {question.product?.name || 'Product'}
                      </div>
                      <p className="mb-1 small text-secondary">
                        {question.question?.slice(0, 120)}
                        {question.question?.length > 120 ? '...' : ''}
                      </p>
                      <Badge bg={statusVariant[question.status] || 'warning'}>
                        {question.status || 'pending'}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState text="No unanswered questions." />
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col xxl={4} xl={4} lg={12}>
          <Card className="border-0 rounded-3 shadow-sm h-100">
            <Card.Body className="p-4">
              <h5 className="mb-1 fw-bold">Return Requests</h5>
              <p className="mb-3 text-secondary small">Recent return/refund requests</p>

              {recentReturnRequests.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {recentReturnRequests.map((request) => (
                    <div key={request._id} className="border-bottom pb-3">
                      <div className="d-flex justify-content-between gap-2">
                        <div className="fw-semibold">{request.orderId}</div>
                        <Badge bg={statusVariant[request.status] || 'secondary'}>
                          {request.status}
                        </Badge>
                      </div>
                      <div className="small text-secondary">
                        Reason: {request.reason || 'N/A'}
                      </div>
                      <div className="small text-secondary">
                        Customer:{' '}
                        {request.user
                          ? `${request.user.firstName || ''} ${request.user.lastName || ''}`.trim()
                          : 'Customer'}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState text="No return requests found." />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardOverview;