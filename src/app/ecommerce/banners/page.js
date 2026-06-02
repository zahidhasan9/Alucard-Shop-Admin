'use client';

import { Breadcrumb } from 'react-bootstrap';
import BannerManager from '@/components/eCommerce/Banners/BannerManager';

export default function Page() {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h3 className="mb-1">Banners</h3>

          <Breadcrumb className="mb-0">
            <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item active>eCommerce Banners</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <BannerManager />
    </>
  );
}