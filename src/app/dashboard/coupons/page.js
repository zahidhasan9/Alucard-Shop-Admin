"use client";

import PrivateRoute from "@/HOC/PrivateRoute";
import CouponManager from "@/components/Dashboard/Coupons/CouponManager";

function Page() {
  return <CouponManager />;
}

export default PrivateRoute(Page);