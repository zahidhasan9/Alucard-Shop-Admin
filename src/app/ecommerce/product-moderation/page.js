'use client';

import { Breadcrumb } from 'react-bootstrap';
import ProductModeration from '@/components/eCommerce/ProductModeration';

export default function Page() {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <h3 className="mb-0">Product Moderation</h3>

        <Breadcrumb className="mb-0">
          <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item active>Reviews & Q&A</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <ProductModeration />
    </>
  );
}