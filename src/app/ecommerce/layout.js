// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';

// export default async function DashboardLayout({ children }) {
//   const cookieStore = await cookies();
//   const token = cookieStore.get('token');

//   if (!token) {
//     redirect('/authentication/sign-in/');
//   }

//   return <>{children}</>;
// }



'use client';

import PrivateRoute from '@/HOC/PrivateRoute';

function EcommerceLayout({ children }) {
  return <>{children}</>;
}

export default PrivateRoute(EcommerceLayout);