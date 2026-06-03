'use client';

import { Breadcrumb } from 'react-bootstrap';
import ReturnRequestsTable from '@/components/eCommerce/Refunds/ReturnRequestsTable';

export default function Page() {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <div>
          <h3 className="mb-1" style={{ fontWeight: 500, color: '#111111' }}>
            Return Requests
          </h3>

          <Breadcrumb className="mb-0">
            <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item active>Return Requests</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <ReturnRequestsTable />
    </>
  );
}