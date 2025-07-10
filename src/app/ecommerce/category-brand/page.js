'use client';

import Categorybrand from '@/components/eCommerce/Category-brand';
import { Breadcrumb } from 'react-bootstrap';

export default function Page() {
  return (
    <>
      <section className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <h3 className="mb-0">Category and Brand</h3>

        <Breadcrumb className="breadcrumb-page-list align-items-center mb-0 lh-1">
          <Breadcrumb.Item href="/dashboard/ecommerce/">
            <span className="d-flex align-items-center text-decoration-none">
              <i className="ri-home-4-line fs-18 text-primary me-1"></i>
              <span className="text-secondary fw-medium hover">Dashboard</span>
            </span>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <span className="fw-medium">eCommerce</span>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <span className="fw-medium">Category Brand</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </section>

      <Categorybrand />
    </>
  );
}
