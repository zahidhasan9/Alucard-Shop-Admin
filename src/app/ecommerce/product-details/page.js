'use client';

import { Breadcrumb } from 'react-bootstrap';
import { useSearchParams } from 'next/navigation';
import ProductDetails from '@/components/eCommerce/ProductDetails';

export default function Page() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <h3 className="mb-0">Product Details</h3>

        <Breadcrumb className="mb-0">
          <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item href="/ecommerce/products-list">
            Products
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Product Details</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <ProductDetails slug={slug} />
    </>
  );
}