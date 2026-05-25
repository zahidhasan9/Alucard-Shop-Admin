// import axios from '@/Apiutils/axiosInstance';

// // User Api
// export const registerUser = (userData) => axios.post('/auth/register', userData); // URL ঠিক করা হয়েছে
// export const loginUser = (userData) => axios.post('/auth/login', userData);
// export const logoutUser = () => axios.post('/auth/logout');
// export const getAllUsers = () => axios.get('/user');
// export const getUserById = (id) => axios.get(`/user/${id}`);
// export const updateProfile = (data) => axios.put('/auth/user', data);
// export const changePassword = (data) => axios.put('/auth/changepassword', data);
// export const forgotPassword = (email) => axios.post('/auth//resetPasswordRequest', { email });
// export const resetPassword = (id, token, data) => axios.post(`/auth/reset-password/${id}/${token}`, data);
// export const getLoggedInUser = () => axios.get('/auth/me'); // get user by cookie

// // User Address Api
// export const createAddress = (data) => axios.post('/address/add', data);
// export const getAllAddresses = () => axios.get('/address');
// export const getAddressByType = (type) => axios.get(`/address/type/${type}`);
// export const updateAddress = (id, data) => axios.put(`/address/${id}`, data);
// export const deleteAddress = (id) => axios.delete(`/address/${id}`);

// // Products Api
// export const getProducts = ({ limit = 10, skip = 0, search = '', category, sort, maxPrice, minPrice }) =>
//   axios.get('/product', {
//     params: { limit, skip, search, category, sort, maxPrice, minPrice }
//   });
// export const createProduct = (data) => axios.post('/product/add', data);
// // export const getProducts = () => axios.get('/product');
// export const getProduct = (slug) => axios.get(`/product/${slug}`);
// export const updateProduct = (slug, data) => axios.put(`/product/${slug}`, data);
// export const deleteProduct = (id) => axios.delete(`/product/${id}`);
// export const createProductReview = (id, review) => axios.post(`/product/${id}/reviews`, review);
// export const getTopProducts = () => axios.get('/product/top');

// // category Api
// export const getAllCategories = () => axios.get('/category');
// export const createCategory = (data) => axios.post('/category/', data);
// export const getCategory = (id) => axios.get(`/api/categories/${id}`);
// export const updateCategory = (id, data) => axios.put(`/api/categories/${id}`, data);
// export const deleteCategory = (slug) => axios.delete(`/category/${slug}`);

// // Brand Api
// export const getAllBrands = () => axios.get('/brand');
// export const createBrand = (data) => axios.post('/brand', data);
// export const getBrand = (id) => axios.get(`/api/Brand/${id}`);
// export const updateBrand = (id, data) => axios.put(`/api/Brand/${id}`, data);
// export const deleteBrand = (slug) => axios.delete(`/Brand/${slug}`);

// // Review Api
// export const createReview = (reviewData) => axios.post('/review', reviewData);
// export const getProductReviews = (productId) => axios.get(`/review/${productId}`);
// export const getUserAllReviews = () => axios.get('review/user');
// export const deleteMyReview = (productId) => axios.delete(`/review/me/${productId}`);
// export const deleteReview = (reviewId) => axios.delete(`/review/${reviewId}`);

// // Cart Api
// export const fetchCart = () => axios.get('/cart');
// export const addToCart = (product) => axios.post('/cart/add', product);
// export const updateCartItem = (productId, quantity) => axios.put(`/cart/update`, { productId, quantity });
// export const removeFromCart = (productId) => axios.delete(`/cart/remove/${productId}`);
// // export const updateCartItem = (productId, quantity) => axios.put(`/cart/update/${productId}`, {productId, quantity });

// // Order Api
// export const createOrder = (orderData) => axios.post('/order/', orderData);
// export const getMyOrders = () => axios.get('/order/my-orders'); // Get user's own orders
// export const getLastOrder = () => axios.get('/order/last-orders'); // Get user's Last orders
// export const getOrderById = (orderId) => axios.get(`/order/${orderId}`); // Get single order by ID
// export const payOrder = (orderId, paymentResult) => axios.put(`/order/${orderId}/pay`, paymentResult); // Update order to paid
// export const deliverOrder = (orderId) => axios.put(`/order/${orderId}/deliver`); // Update order to delivered (admin only)
// export const deleteOrder = (orderId) => axios.delete(`/order/${orderId}`);
// export const getAllOrders = ({ skip, limit, search }) =>
//   axios.get('/order', {
//     params: { skip, limit, search }
//   });
// export const updateDeliveryStatus = (orderId, status) => axios.put(`/order/${orderId}/delivery-status`, { status });
// export const resetDeliveryStatus = (orderId) => axios.put(`/order/${orderId}/reset-status`); // Get user's own orders



// import axios from '@/Apiutils/axiosInstance';

// // User Api
// export const registerUser = (userData) => axios.post('/auth/register', userData);
// export const loginUser = (userData) => axios.post('/auth/login', userData);
// export const logoutUser = () => axios.post('/auth/logout');

// export const getAllUsers = () => axios.get('/auth/users');
// export const getUserById = (id) => axios.get(`/auth/users/${id}`);

// export const updateProfile = (data) => axios.put('/auth/user', data);
// export const changePassword = (data) => axios.put('/auth/changepassword', data);
// export const forgotPassword = (email) =>
//   axios.post('/auth/resetPasswordRequest', { email });
// export const resetPassword = (id, token, data) =>
//   axios.post(`/auth/reset-password/${id}/${token}`, data);
// export const getLoggedInUser = () => axios.get('/auth/me');

// // User Address Api
// export const createAddress = (data) => axios.post('/address/add', data);
// export const getAllAddresses = () => axios.get('/address');
// export const getAddressByType = (type) => axios.get(`/address/type/${type}`);
// export const updateAddress = (id, data) => axios.put(`/address/${id}`, data);
// export const deleteAddress = (id) => axios.delete(`/address/${id}`);

// // Products Api
// export const getProducts = ({
//   limit = 10,
//   skip = 0,
//   search = '',
//   category,
//   sort,
//   maxPrice,
//   minPrice,
// } = {}) =>
//   axios.get('/product', {
//     params: { limit, skip, search, category, sort, maxPrice, minPrice },
//   });

// export const createProduct = (data) => axios.post('/product/add', data);
// export const getProduct = (slug) => axios.get(`/product/${slug}`);
// export const updateProduct = (slug, data) => axios.put(`/product/${slug}`, data);
// export const deleteProduct = (id) => axios.delete(`/product/${id}`);
// export const createProductReview = (id, review) =>
//   axios.post(`/product/${id}/reviews`, review);
// export const getTopProducts = () => axios.get('/product/top');

// // Category Api
// export const getAllCategories = () => axios.get('/category');
// export const createCategory = (data) => axios.post('/category', data);
// export const getCategory = (slug) => axios.get(`/category/${slug}`);
// export const updateCategory = (slug, data) => axios.put(`/category/${slug}`, data);
// export const deleteCategory = (slug) => axios.delete(`/category/${slug}`);

// // Brand Api
// export const getAllBrands = () => axios.get('/brand');
// export const createBrand = (data) => axios.post('/brand', data);
// export const getBrand = (slug) => axios.get(`/brand/${slug}`);
// export const updateBrand = (slug, data) => axios.put(`/brand/${slug}`, data);
// export const deleteBrand = (slug) => axios.delete(`/brand/${slug}`);

// // Review Api
// export const createReview = (reviewData) => axios.post('/review', reviewData);
// export const getProductReviews = (productId) => axios.get(`/review/${productId}`);
// export const getUserAllReviews = () => axios.get('/review/user');
// export const deleteMyReview = (productId) => axios.delete(`/review/me/${productId}`);
// export const deleteReview = (reviewId) => axios.delete(`/review/${reviewId}`);

// // Cart Api
// export const fetchCart = () => axios.get('/cart');
// export const addToCart = (product) => axios.post('/cart/add', product);
// export const updateCartItem = (productId, quantity) =>
//   axios.put('/cart/update', { productId, quantity });
// export const removeFromCart = (productId) =>
//   axios.delete(`/cart/remove/${productId}`);

// // Order Api
// export const createOrder = (orderData) => axios.post('/order', orderData);
// export const getMyOrders = () => axios.get('/order/my-orders');
// export const getLastOrder = () => axios.get('/order/last-orders');
// export const getOrderById = (orderId) => axios.get(`/order/${orderId}`);
// export const payOrder = (orderId, paymentResult) =>
//   axios.put(`/order/${orderId}/pay`, paymentResult);
// export const deliverOrder = (orderId) => axios.put(`/order/${orderId}/deliver`);
// export const deleteOrder = (orderId) => axios.delete(`/order/${orderId}`);

// export const getAllOrders = ({ skip, limit, search } = {}) =>
//   axios.get('/order', { params: { skip, limit, search } });

// export const updateDeliveryStatus = (orderId, status) =>
//   axios.put(`/order/${orderId}/delivery-status`, { status });

// export const resetDeliveryStatus = (orderId) =>
//   axios.put(`/order/${orderId}/reset-status`);




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
  const { data } = await axiosInstance.get('/product', { params });
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

export const getProduct = async (slug) => {
  const { data } = await axiosInstance.get(`/product/${slug}`);
  return data;
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
export const getAllCategories = async () => {
  const { data } = await axiosInstance.get('/category');
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

export const deleteCategory = async (slug) => {
  const { data } = await axiosInstance.delete(`/category/${slug}`);
  return data;
};

// Brand
export const getAllBrands = async () => {
  const { data } = await axiosInstance.get('/brand');
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

export const deleteBrand = async (slug) => {
  const { data } = await axiosInstance.delete(`/brand/${slug}`);
  return data;
};

// Order
export const getAllOrders = async (params = {}) => {
  const { data } = await axiosInstance.get('/order', { params });
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
  const response = await axiosInstance.get(`/address/type/${type}`);
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
