'use client';

import { Row, Col, Breadcrumb } from 'react-bootstrap';
import OrderTracking from '@/components/eCommerce/Orders/OrderTracking';
import OrderSummary from '@/components/eCommerce/Orders/OrderTracking/OrderSummary';
import { useParams } from 'next/navigation';
export default function Page() {
  const { tracking } = useParams(); // dynamic id
  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <h3 className="mb-0">Order Tracking</h3>

        <Breadcrumb className="breadcrumb-page-list align-items-center mb-0 lh-1">
          <Breadcrumb.Item href="/dashboard/ecommerce/">
            <div className="d-flex align-items-center text-decoration-none">
              <i className="ri-home-4-line fs-18 text-primary me-1"></i>
              <span className="text-secondary fw-medium hover">Dashboard</span>
            </div>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <span className="fw-medium">eCommerce</span>
          </Breadcrumb.Item>

          <Breadcrumb.Item active>
            <span className="fw-medium">Order Tracking</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Row>
        <Col lg={7} xxl={8}>
          <OrderTracking tracking={tracking} />
        </Col>

        <Col lg={4} xxl={4}>
          <OrderSummary tracking={tracking} />
        </Col>
      </Row>
    </>
  );
}
