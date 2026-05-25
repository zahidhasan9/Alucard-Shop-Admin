// 'use client';

// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchLoggedInUser } from '@/features/userSlice';
// import Loader from '@/app/loading';

// export default function AppWrapper({ children }) {
//   const dispatch = useDispatch();
//   const { isAuthenticated, loading } = useSelector((state) => state.user);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       dispatch(fetchLoggedInUser());
//     }
//   }, [isAuthenticated, dispatch]);

//   // if (loading) {
//   //   return <Loader />;
//   // }

//   return <>{children}</>;
// }


'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoggedInUser } from '@/features/userSlice';

export default function AppWrapper({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const token = typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : null;

    if (token && !isAuthenticated) {
      dispatch(fetchLoggedInUser());
    }
  }, [isAuthenticated, dispatch]);

  return <>{children}</>;
}