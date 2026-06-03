'use client';

import PrivateRoute from '@/HOC/PrivateRoute';

function EcommerceLayout({ children }) {
  return <>{children}</>;
}

export default PrivateRoute(EcommerceLayout);