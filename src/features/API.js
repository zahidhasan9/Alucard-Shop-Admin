

// import axiosInstance from '@/Apiutils/axiosInstance';

// // Auth / User
// export const registerUser = async (userData) => {
//   const { data } = await axiosInstance.post('/auth/register', userData);
//   return data;
// };

// export const loginUser = async (userData) => {
//   const { data } = await axiosInstance.post('/auth/login', userData);
//   return data;
// };

// export const logoutUser = async () => {
//   const { data } = await axiosInstance.post('/auth/logout');
//   return data;
// };

// export const getLoggedInUser = async () => {
//   const { data } = await axiosInstance.get('/auth/me');
//   return data;
// };

// export const getAllUsers = async () => {
//   const { data } = await axiosInstance.get('/auth/users');
//   return data;
// };

// export const forgotPassword = async (email) => {
//   const { data } = await axiosInstance.post('/auth/resetPasswordRequest', {
//     email,
//   });
//   return data;
// };

// export const resetPassword = async (id, token, passwordData) => {
//   const { data } = await axiosInstance.post(
//     `/auth/reset-password/${id}/${token}`,
//     passwordData
//   );
//   return data;
// };

// // Product
// export const getProducts = async (params = {}) => {
//   const { data } = await axiosInstance.get('/product', { params });
//   return data;
// };

// export const createProduct = async (productData) => {
//   const config = {};

//   if (productData instanceof FormData) {
//     config.headers = {
//       'Content-Type': 'multipart/form-data',
//     };
//   }

//   const response = await axiosInstance.post('/product/add', productData, config);
//   return response.data;
// };

// export const getProduct = async (slug) => {
//   const { data } = await axiosInstance.get(`/product/${slug}`);
//   return data;
// };

// export const updateProduct = async (slug, productData) => {
//   const { data } = await axiosInstance.put(`/product/${slug}`, productData);
//   return data;
// };

// export const deleteProduct = async (id) => {
//   const { data } = await axiosInstance.delete(`/product/${id}`);
//   return data;
// };

// // Category
// export const getAllCategories = async () => {
//   const { data } = await axiosInstance.get('/category');
//   return data;
// };

// export const createCategory = async (categoryData) => {
//   const { data } = await axiosInstance.post('/category', categoryData);
//   return data;
// };

// export const getCategory = async (slug) => {
//   const { data } = await axiosInstance.get(`/category/${slug}`);
//   return data;
// };

// export const updateCategory = async (slug, categoryData) => {
//   const { data } = await axiosInstance.put(`/category/${slug}`, categoryData);
//   return data;
// };

// export const deleteCategory = async (slug) => {
//   const { data } = await axiosInstance.delete(`/category/${slug}`);
//   return data;
// };

// // Brand
// export const getAllBrands = async () => {
//   const { data } = await axiosInstance.get('/brand');
//   return data;
// };

// export const createBrand = async (brandData) => {
//   const { data } = await axiosInstance.post('/brand', brandData);
//   return data;
// };

// export const getBrand = async (slug) => {
//   const { data } = await axiosInstance.get(`/brand/${slug}`);
//   return data;
// };

// export const updateBrand = async (slug, brandData) => {
//   const { data } = await axiosInstance.put(`/brand/${slug}`, brandData);
//   return data;
// };

// export const deleteBrand = async (slug) => {
//   const { data } = await axiosInstance.delete(`/brand/${slug}`);
//   return data;
// };

// // Order
// export const getAllOrders = async (params = {}) => {
//   const { data } = await axiosInstance.get('/order', { params });
//   return data;
// };

// export const updatePaymentStatus = async (orderId, payload) => {
//   const { data } = await axiosInstance.put(
//     `/order/${orderId}/payment-status`,
//     payload
//   );

//   return data;
// };

// export const getOrderById = async (orderId) => {
//   const { data } = await axiosInstance.get(`/order/${orderId}`);
//   return data;
// };

// export const updateDeliveryStatus = async (orderId, status) => {
//   const { data } = await axiosInstance.put(
//     `/order/${orderId}/delivery-status`,
//     { status }
//   );
//   return data;
// };

// export const resetDeliveryStatus = async (orderId) => {
//   const { data } = await axiosInstance.put(`/order/${orderId}/reset-status`);
//   return data;
// };

// export const deleteOrder = async (orderId) => {
//   const { data } = await axiosInstance.delete(`/order/${orderId}`);
//   return data;
// };

// // Coupon
// export const getAllCoupons = async () => {
//   const { data } = await axiosInstance.get('/coupon');
//   return data;
// };

// export const createCoupon = async (couponData) => {
//   const { data } = await axiosInstance.post('/coupon', couponData);
//   return data;
// };

// export const deleteCoupon = async (id) => {
//   const { data } = await axiosInstance.delete(`/coupon/${id}`);
//   return data;
// };



// // =======================================


// // Address API
// export const createAddress = async (data) => {
//   const response = await axiosInstance.post('/address/add', data);
//   return response.data;
// };

// export const getAllAddresses = async () => {
//   const response = await axiosInstance.get('/address');
//   return response.data;
// };

// export const getAddressByType = async (type) => {
//   const response = await axiosInstance.get(`/address/${type}`);
//   return response.data;
// };

// export const updateAddress = async (id, data) => {
//   const response = await axiosInstance.put(`/address/${id}`, data);
//   return response.data;
// };

// export const deleteAddress = async (id) => {
//   const response = await axiosInstance.delete(`/address/${id}`);
//   return response.data;
// };

// // Cart API
// export const fetchCart = async () => {
//   const response = await axiosInstance.get('/cart');
//   return response.data;
// };

// export const addToCart = async (data) => {
//   const response = await axiosInstance.post('/cart/add', data);
//   return response.data;
// };

// export const updateCartItem = async (productId, quantity) => {
//   const response = await axiosInstance.put('/cart/update', {
//     productId,
//     quantity,
//   });
//   return response.data;
// };

// export const removeFromCart = async (productId) => {
//   const response = await axiosInstance.delete(
//     `/cart/remove/${productId}`
//   );
//   return response.data;
// };

// // Review API
// export const createReview = async (reviewData) => {
//   const response = await axiosInstance.post('/review', reviewData);
//   return response.data;
// };

// export const getProductReviews = async (productId) => {
//   const response = await axiosInstance.get(`/review/${productId}`);
//   return response.data;
// };

// export const getUserAllReviews = async () => {
//   const response = await axiosInstance.get('/review/user');
//   return response.data;
// };

// export const deleteMyReview = async (productId) => {
//   const response = await axiosInstance.delete(`/review/me/${productId}`);
//   return response.data;
// };

// export const deleteReview = async (reviewId) => {
//   const response = await axiosInstance.delete(`/review/${reviewId}`);
//   return response.data;
// };

// // Product Extra API
// export const createProductReview = async (id, review) => {
//   const response = await axiosInstance.post(
//     `/product/${id}/reviews`,
//     review
//   );
//   return response.data;
// };

// export const getTopProducts = async () => {
//   const response = await axiosInstance.get('/product/top');
//   return response.data;
// };

// // User Profile API
// export const updateProfile = async (data) => {
//   const response = await axiosInstance.put('/auth/user', data);
//   return response.data;
// };

// export const changePassword = async (data) => {
//   const response = await axiosInstance.put(
//     '/auth/changepassword',
//     data
//   );
//   return response.data;
// };




// // Customer Admin API
// export const getCustomers = async (params = {}) => {
//   const { data } = await axiosInstance.get('/auth/customers', { params });
//   return data;
// };

// export const getCustomerById = async (id) => {
//   const { data } = await axiosInstance.get(`/auth/customers/${id}`);
//   return data;
// };

// export const updateCustomerByAdmin = async (id, payload) => {
//   const { data } = await axiosInstance.put(`/auth/customers/${id}`, payload);
//   return data;
// };

// export const deleteCustomerByAdmin = async (id) => {
//   const { data } = await axiosInstance.delete(`/auth/customers/${id}`);
//   return data;
// };











import axiosInstance from '@/Apiutils/axiosInstance';

// Auth / User
export const registerUser = async (userData) => {
  const { data } = await axiosInstance.post('/auth/register', userData);
  return data;
};

export const loginUser = async (userData) => {
  const { data } = await axiosInstance.post('/auth/login', userData);
  return data;
};

export const logoutUser = async () => {
  const { data } = await axiosInstance.post('/auth/logout');
  return data;
};

export const getLoggedInUser = async () => {
  const { data } = await axiosInstance.get('/auth/me');
  return data;
};

export const getAllUsers = async () => {
  const { data } = await axiosInstance.get('/auth/users');
  return data;
};

export const forgotPassword = async (email) => {
  const { data } = await axiosInstance.post('/auth/resetPasswordRequest', {
    email,
  });
  return data;
};

export const resetPassword = async (id, token, passwordData) => {
  const { data } = await axiosInstance.post(
    `/auth/reset-password/${id}/${token}`,
    passwordData
  );
  return data;
};

// Product
export const getProducts = async (params = {}) => {
  const { data } = await axiosInstance.get('/product/admin/all', { params });
  return data;
};

export const getProduct = async (slug) => {
  const { data } = await axiosInstance.get(`/product/admin/${slug}`);
  return data;
};

export const createProduct = async (productData) => {
  const config = {};

  if (productData instanceof FormData) {
    config.headers = {
      'Content-Type': 'multipart/form-data',
    };
  }

  const response = await axiosInstance.post('/product/add', productData, config);
  return response.data;
};

export const updateProduct = async (slug, productData) => {
  const { data } = await axiosInstance.put(`/product/${slug}`, productData);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await axiosInstance.delete(`/product/${id}`);
  return data;
};

// Category
export const getAllCategories = async (params = {}) => {
  const { data } = await axiosInstance.get('/category', { params });
  return data;
};

export const getAdminCategories = async (params = {}) => {
  const { data } = await axiosInstance.get('/category/admin/all', { params });
  return data;
};

export const createCategory = async (categoryData) => {
  const { data } = await axiosInstance.post('/category', categoryData);
  return data;
};

export const getCategory = async (slug) => {
  const { data } = await axiosInstance.get(`/category/${slug}`);
  return data;
};

export const updateCategory = async (slug, categoryData) => {
  const { data } = await axiosInstance.put(`/category/${slug}`, categoryData);
  return data;
};

export const toggleCategoryStatus = async (slug, payload) => {
  const { data } = await axiosInstance.patch(`/category/${slug}/status`, payload);
  return data;
};

export const deleteCategory = async (slug) => {
  const { data } = await axiosInstance.delete(`/category/${slug}`);
  return data;
};

// Brand
export const getAllBrands = async (params = {}) => {
  const { data } = await axiosInstance.get('/brand', { params });
  return data;
};

export const getAdminBrands = async (params = {}) => {
  const { data } = await axiosInstance.get('/brand/admin/all', { params });
  return data;
};

export const createBrand = async (brandData) => {
  const { data } = await axiosInstance.post('/brand', brandData);
  return data;
};

export const getBrand = async (slug) => {
  const { data } = await axiosInstance.get(`/brand/${slug}`);
  return data;
};

export const updateBrand = async (slug, brandData) => {
  const { data } = await axiosInstance.put(`/brand/${slug}`, brandData);
  return data;
};

export const toggleBrandStatus = async (slug, payload) => {
  const { data } = await axiosInstance.patch(`/brand/${slug}/status`, payload);
  return data;
};

export const deleteBrand = async (slug) => {
  const { data } = await axiosInstance.delete(`/brand/${slug}`);
  return data;
};

// Order
export const getAllOrders = async (params = {}) => {
  const { data } = await axiosInstance.get('/order', { params });
  return data;
};

export const updatePaymentStatus = async (orderId, payload) => {
  const { data } = await axiosInstance.put(
    `/order/${orderId}/payment-status`,
    payload
  );

  return data;
};

export const getOrderById = async (orderId) => {
  const { data } = await axiosInstance.get(`/order/${orderId}`);
  return data;
};

export const updateDeliveryStatus = async (orderId, status) => {
  const { data } = await axiosInstance.put(
    `/order/${orderId}/delivery-status`,
    { status }
  );
  return data;
};

export const resetDeliveryStatus = async (orderId) => {
  const { data } = await axiosInstance.put(`/order/${orderId}/reset-status`);
  return data;
};

export const deleteOrder = async (orderId) => {
  const { data } = await axiosInstance.delete(`/order/${orderId}`);
  return data;
};

// Coupon
export const getAllCoupons = async () => {
  const { data } = await axiosInstance.get('/coupon');
  return data;
};

export const createCoupon = async (couponData) => {
  const { data } = await axiosInstance.post('/coupon', couponData);
  return data;
};

export const deleteCoupon = async (id) => {
  const { data } = await axiosInstance.delete(`/coupon/${id}`);
  return data;
};

export const getCoupons = () => {
  return axiosInstance.get("/coupon");
};

export const updateCoupon = (id, payload) => {
  return axiosInstance.put(`/coupon/${id}`, payload);
};

export const seedDefaultCoupons = () => {
  return axiosInstance.post("/coupon/seed-defaults");
};


// =======================================


// Address API
export const createAddress = async (data) => {
  const response = await axiosInstance.post('/address/add', data);
  return response.data;
};

export const getAllAddresses = async () => {
  const response = await axiosInstance.get('/address');
  return response.data;
};

export const getAddressByType = async (type) => {
  const response = await axiosInstance.get(`/address/${type}`);
  return response.data;
};

export const updateAddress = async (id, data) => {
  const response = await axiosInstance.put(`/address/${id}`, data);
  return response.data;
};

export const deleteAddress = async (id) => {
  const response = await axiosInstance.delete(`/address/${id}`);
  return response.data;
};

// Cart API
export const fetchCart = async () => {
  const response = await axiosInstance.get('/cart');
  return response.data;
};

export const addToCart = async (data) => {
  const response = await axiosInstance.post('/cart/add', data);
  return response.data;
};

export const updateCartItem = async (productId, quantity) => {
  const response = await axiosInstance.put('/cart/update', {
    productId,
    quantity,
  });
  return response.data;
};

export const removeFromCart = async (productId) => {
  const response = await axiosInstance.delete(
    `/cart/remove/${productId}`
  );
  return response.data;
};

// Review API
export const createReview = async (reviewData) => {
  const response = await axiosInstance.post('/review', reviewData);
  return response.data;
};

export const getProductReviews = async (productId) => {
  const response = await axiosInstance.get(`/review/${productId}`);
  return response.data;
};

export const getUserAllReviews = async () => {
  const response = await axiosInstance.get('/review/user');
  return response.data;
};

export const deleteMyReview = async (productId) => {
  const response = await axiosInstance.delete(`/review/me/${productId}`);
  return response.data;
};

export const deleteReview = async (reviewId) => {
  const response = await axiosInstance.delete(`/review/${reviewId}`);
  return response.data;
};

// Product Extra API
export const createProductReview = async (id, review) => {
  const response = await axiosInstance.post(
    `/product/${id}/reviews`,
    review
  );
  return response.data;
};

export const getTopProducts = async () => {
  const response = await axiosInstance.get('/product/top');
  return response.data;
};

// User Profile API
export const updateProfile = async (data) => {
  const response = await axiosInstance.put('/auth/user', data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await axiosInstance.put(
    '/auth/changepassword',
    data
  );
  return response.data;
};




// Customer Admin API
export const getCustomers = async (params = {}) => {
  const { data } = await axiosInstance.get('/auth/customers', { params });
  return data;
};

export const getCustomerById = async (id) => {
  const { data } = await axiosInstance.get(`/auth/customers/${id}`);
  return data;
};

export const updateCustomerByAdmin = async (id, payload) => {
  const { data } = await axiosInstance.put(`/auth/customers/${id}`, payload);
  return data;
};

export const deleteCustomerByAdmin = async (id) => {
  const { data } = await axiosInstance.delete(`/auth/customers/${id}`);
  return data;
};




// Review Admin API
export const getAdminReviews = async (params = {}) => {
  const { data } = await axiosInstance.get('/review/admin/all', { params });
  return data;
};

export const getAdminReviewById = async (reviewId) => {
  const { data } = await axiosInstance.get(`/review/admin/${reviewId}`);
  return data;
};

export const updateReviewStatus = async (reviewId, payload) => {
  const { data } = await axiosInstance.patch(
    `/review/admin/${reviewId}/status`,
    payload
  );
  return data;
};

export const replyToReview = async (reviewId, payload) => {
  const { data } = await axiosInstance.post(
    `/review/admin/${reviewId}/reply`,
    payload
  );
  return data;
};

export const deleteReviewReply = async (reviewId) => {
  const { data } = await axiosInstance.delete(
    `/review/admin/${reviewId}/reply`
  );
  return data;
};

export const deleteAdminReview = async (reviewId) => {
  const { data } = await axiosInstance.delete(`/review/admin/${reviewId}`);
  return data;
};

// Product Q&A Admin API
export const getAdminQuestions = async (params = {}) => {
  const { data } = await axiosInstance.get('/question/admin/all', { params });
  return data;
};

export const updateQuestionStatus = async (questionId, payload) => {
  const { data } = await axiosInstance.patch(
    `/question/admin/${questionId}/status`,
    payload
  );
  return data;
};

export const answerQuestionAdmin = async (questionId, payload) => {
  const { data } = await axiosInstance.post(
    `/question/admin/${questionId}/answer`,
    payload
  );
  return data;
};

export const updateQuestionAnswer = async (questionId, answerId, payload) => {
  const { data } = await axiosInstance.put(
    `/question/admin/${questionId}/answer/${answerId}`,
    payload
  );
  return data;
};

export const deleteQuestionAnswer = async (questionId, answerId) => {
  const { data } = await axiosInstance.delete(
    `/question/admin/${questionId}/answer/${answerId}`
  );
  return data;
};

export const deleteAdminQuestion = async (questionId) => {
  const { data } = await axiosInstance.delete(`/question/admin/${questionId}`);
  return data;
};






export const getDashboardStats = ({ range = '7d', lowStockLimit = 5 } = {}) => {
  return axiosInstance.get('/dashboard/stats', {
    params: {
      range,
      lowStockLimit,
    },
  });
};




// Banner Admin API
export const getAdminBanners = async (params = {}) => {
  const { data } = await axiosInstance.get('/banner/admin/all', {
    params: {
      ...params,
      _t: Date.now(),
    },
  });

  return data;
};

export const createBanner = async (bannerData) => {
  const config = {};

  if (bannerData instanceof FormData) {
    config.headers = {
      'Content-Type': 'multipart/form-data',
    };
  }

  const { data } = await axiosInstance.post('/banner', bannerData, config);
  return data;
};

export const getBannerById = async (id) => {
  const { data } = await axiosInstance.get(`/banner/admin/${id}`);
  return data;
};

export const updateBanner = async (id, bannerData) => {
  const config = {};

  if (bannerData instanceof FormData) {
    config.headers = {
      'Content-Type': 'multipart/form-data',
    };
  }

  const { data } = await axiosInstance.put(`/banner/${id}`, bannerData, config);
  return data;
};

export const toggleBannerStatus = async (id, payload) => {
  const { data } = await axiosInstance.patch(`/banner/${id}/status`, payload);
  return data;
};

export const deleteBanner = async (id) => {
  const { data } = await axiosInstance.delete(`/banner/${id}`);
  return data;
};
