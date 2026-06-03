'use client';

import PrivateRoute from '@/HOC/PrivateRoute';
import DashboardOverview from '@/components/Dashboard/eCommerce/DashboardOverview';

function Page() {
  return <DashboardOverview />;
}

export default PrivateRoute(Page);