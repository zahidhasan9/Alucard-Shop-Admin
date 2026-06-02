

// 'use client';

// import { useEffect, useMemo, useState } from 'react';
// import {
//   Row,
//   Col,
//   Card,
//   Form,
//   Button,
//   Badge,
//   Table,
//   Spinner,
//   Alert,
// } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   createCategory,
//   getAdminCategories,
//   updateCategory,
//   deleteCategory,
//   toggleCategoryStatus,
// } from '@/features/categorySlice';
// import {
//   createBrand,
//   getAdminBrands,
//   updateBrand,
//   deleteBrand,
//   toggleBrandStatus,
// } from '@/features/brandSlice';

// const emptyCategory = {
//   name: '',
//   description: '',
//   image: '',
//   isActive: true,
//   isFeatured: false,
//   sortOrder: 0,
//   metaTitle: '',
//   metaDescription: '',
// };

// const emptyBrand = {
//   name: '',
//   description: '',
//   logo: '',
//   website: '',
//   isActive: true,
//   isFeatured: false,
//   sortOrder: 0,
//   metaTitle: '',
//   metaDescription: '',
// };

// const CategoryBrandManager = () => {
//   const dispatch = useDispatch();

//   const {
//     categories,
//     stats: categoryStats,
//     loading: categoryLoading,
//     error: categoryError,
//   } = useSelector((state) => state.category);

//   const brandState = useSelector((state) => state.brand);
//   const brands = brandState.brands || brandState.Brands || [];

//   const [activeTab, setActiveTab] = useState('category');
//   const [search, setSearch] = useState('');
//   const [status, setStatus] = useState('all');
//   const [featured, setFeatured] = useState('all');

//   const [categoryForm, setCategoryForm] = useState(emptyCategory);
//   const [brandForm, setBrandForm] = useState(emptyBrand);

//   const [editingCategorySlug, setEditingCategorySlug] = useState(null);
//   const [editingBrandSlug, setEditingBrandSlug] = useState(null);

//   const query = useMemo(
//     () => ({
//       search,
//       status,
//       featured,
//     }),
//     [search, status, featured]
//   );

//   useEffect(() => {
//     dispatch(getAdminCategories(query));
//     dispatch(getAdminBrands(query));
//   }, [dispatch, query]);

//   const refreshAll = () => {
//     dispatch(getAdminCategories(query));
//     dispatch(getAdminBrands(query));
//   };

//   const formatDate = (value) => {
//     if (!value) return 'N/A';

//     return new Intl.DateTimeFormat('en-GB', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       timeZone: 'Asia/Dhaka',
//     }).format(new Date(value));
//   };

//   const handleCategoryChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setCategoryForm((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleBrandChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setBrandForm((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const resetCategoryForm = () => {
//     setCategoryForm(emptyCategory);
//     setEditingCategorySlug(null);
//   };

//   const resetBrandForm = () => {
//     setBrandForm(emptyBrand);
//     setEditingBrandSlug(null);
//   };

//   const submitCategory = (e) => {
//     e.preventDefault();

//     const action = editingCategorySlug
//       ? updateCategory({ slug: editingCategorySlug, data: categoryForm })
//       : createCategory(categoryForm);

//     dispatch(action).then(() => {
//       resetCategoryForm();
//       refreshAll();
//     });
//   };

//   const submitBrand = (e) => {
//     e.preventDefault();

//     const action = editingBrandSlug
//       ? updateBrand({ slug: editingBrandSlug, data: brandForm })
//       : createBrand(brandForm);

//     dispatch(action).then(() => {
//       resetBrandForm();
//       refreshAll();
//     });
//   };

//   const startEditCategory = (item) => {
//     setActiveTab('category');
//     setEditingCategorySlug(item.slug);
//     setCategoryForm({
//       name: item.name || '',
//       description: item.description || '',
//       image: item.image || '',
//       isActive: item.isActive !== false,
//       isFeatured: Boolean(item.isFeatured),
//       sortOrder: item.sortOrder || 0,
//       metaTitle: item.metaTitle || '',
//       metaDescription: item.metaDescription || '',
//     });
//   };

//   const startEditBrand = (item) => {
//     setActiveTab('brand');
//     setEditingBrandSlug(item.slug);
//     setBrandForm({
//       name: item.name || '',
//       description: item.description || '',
//       logo: item.logo || '',
//       website: item.website || '',
//       isActive: item.isActive !== false,
//       isFeatured: Boolean(item.isFeatured),
//       sortOrder: item.sortOrder || 0,
//       metaTitle: item.metaTitle || '',
//       metaDescription: item.metaDescription || '',
//     });
//   };

//   const handleDeleteCategory = (slug) => {
//     const confirmed = window.confirm(
//       'Delete this category? If products exist, it will be deactivated instead.'
//     );

//     if (!confirmed) return;

//     dispatch(deleteCategory(slug)).then(refreshAll);
//   };

//   const handleDeleteBrand = (slug) => {
//     const confirmed = window.confirm(
//       'Delete this brand? If products exist, it will be deactivated instead.'
//     );

//     if (!confirmed) return;

//     dispatch(deleteBrand(slug)).then(refreshAll);
//   };

//   const stats = {
//     categoriesTotal: categoryStats?.total || categories.length || 0,
//     categoriesActive:
//       categoryStats?.active || categories.filter((item) => item.isActive).length || 0,
//     brandsTotal: brandState.stats?.total || brands.length || 0,
//     brandsActive:
//       brandState.stats?.active || brands.filter((item) => item.isActive).length || 0,
//   };

//   return (
//     <>
//       <Row className="g-4 mb-4">
//         <Col sm={6} xl={3}>
//           <Card className="border-0 rounded-4 bg-white cb-stat-card">
//             <Card.Body className="p-4">
//               <span className="text-muted d-block">Total Categories</span>
//               <h3 className="mb-0">{stats.categoriesTotal}</h3>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col sm={6} xl={3}>
//           <Card className="border-0 rounded-4 bg-white cb-stat-card">
//             <Card.Body className="p-4">
//               <span className="text-muted d-block">Active Categories</span>
//               <h3 className="mb-0 text-success">{stats.categoriesActive}</h3>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col sm={6} xl={3}>
//           <Card className="border-0 rounded-4 bg-white cb-stat-card">
//             <Card.Body className="p-4">
//               <span className="text-muted d-block">Total Brands</span>
//               <h3 className="mb-0">{stats.brandsTotal}</h3>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col sm={6} xl={3}>
//           <Card className="border-0 rounded-4 bg-white cb-stat-card">
//             <Card.Body className="p-4">
//               <span className="text-muted d-block">Active Brands</span>
//               <h3 className="mb-0 text-success">{stats.brandsActive}</h3>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <Card className="border-0 rounded-4 bg-white mb-4">
//         <Card.Body className="p-4">
//           <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
//             <div>
//               <h3 className="mb-1">Category & Brand Manager</h3>
//               <p className="text-muted mb-0">
//                 Create, edit, activate/deactivate, feature, and track product usage.
//               </p>
//             </div>

//             <Button variant="outline-primary" className="rounded-3" onClick={refreshAll}>
//               Refresh
//             </Button>
//           </div>

//           <Row className="g-3">
//             <Col lg={6}>
//               <Form.Control
//                 type="search"
//                 placeholder="Search category or brand..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="h-55 rounded-3"
//               />
//             </Col>

//             <Col sm={6} lg={3}>
//               <Form.Select
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//                 className="h-55 rounded-3"
//               >
//                 <option value="all">All Status</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </Form.Select>
//             </Col>

//             <Col sm={6} lg={3}>
//               <Form.Select
//                 value={featured}
//                 onChange={(e) => setFeatured(e.target.value)}
//                 className="h-55 rounded-3"
//               >
//                 <option value="all">All Featured</option>
//                 <option value="yes">Featured</option>
//                 <option value="no">Not Featured</option>
//               </Form.Select>
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>

//       {(categoryError || brandState.error) && (
//         <Alert variant="danger">
//           {categoryError || brandState.error}
//         </Alert>
//       )}

//       <Row className="g-4">
//         <Col lg={4}>
//           <Card className="border-0 rounded-4 bg-white mb-4">
//             <Card.Body className="p-4">
//               <div className="d-flex gap-2 mb-4">
//                 <Button
//                   variant={activeTab === 'category' ? 'primary' : 'light'}
//                   className="rounded-3"
//                   onClick={() => setActiveTab('category')}
//                 >
//                   Category
//                 </Button>

//                 <Button
//                   variant={activeTab === 'brand' ? 'primary' : 'light'}
//                   className="rounded-3"
//                   onClick={() => setActiveTab('brand')}
//                 >
//                   Brand
//                 </Button>
//               </div>

//               {activeTab === 'category' ? (
//                 <Form onSubmit={submitCategory}>
//                   <h5 className="mb-3">
//                     {editingCategorySlug ? 'Edit Category' : 'Create Category'}
//                   </h5>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control
//                       name="name"
//                       value={categoryForm.name}
//                       onChange={handleCategoryChange}
//                       required
//                       className="rounded-3"
//                       placeholder="Example: Electronics"
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Description</Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       rows={3}
//                       name="description"
//                       value={categoryForm.description}
//                       onChange={handleCategoryChange}
//                       className="rounded-3"
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Image URL</Form.Label>
//                     <Form.Control
//                       name="image"
//                       value={categoryForm.image}
//                       onChange={handleCategoryChange}
//                       className="rounded-3"
//                     />
//                   </Form.Group>

//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Sort Order</Form.Label>
//                         <Form.Control
//                           type="number"
//                           name="sortOrder"
//                           value={categoryForm.sortOrder}
//                           onChange={handleCategoryChange}
//                           className="rounded-3"
//                         />
//                       </Form.Group>
//                     </Col>

//                     <Col md={6}>
//                       <Form.Group className="mb-3 pt-md-4">
//                         <Form.Check
//                           type="switch"
//                           name="isActive"
//                           label="Active"
//                           checked={categoryForm.isActive}
//                           onChange={handleCategoryChange}
//                         />

//                         <Form.Check
//                           type="switch"
//                           name="isFeatured"
//                           label="Featured"
//                           checked={categoryForm.isFeatured}
//                           onChange={handleCategoryChange}
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Meta Title</Form.Label>
//                     <Form.Control
//                       name="metaTitle"
//                       value={categoryForm.metaTitle}
//                       onChange={handleCategoryChange}
//                       className="rounded-3"
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-4">
//                     <Form.Label>Meta Description</Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       rows={2}
//                       name="metaDescription"
//                       value={categoryForm.metaDescription}
//                       onChange={handleCategoryChange}
//                       className="rounded-3"
//                     />
//                   </Form.Group>

//                   <div className="d-flex gap-2">
//                     <Button type="submit" className="rounded-3" disabled={categoryLoading}>
//                       {editingCategorySlug ? 'Update Category' : 'Create Category'}
//                     </Button>

//                     <Button
//                       type="button"
//                       variant="light"
//                       className="border rounded-3"
//                       onClick={resetCategoryForm}
//                     >
//                       Cancel
//                     </Button>
//                   </div>
//                 </Form>
//               ) : (
//                 <Form onSubmit={submitBrand}>
//                   <h5 className="mb-3">
//                     {editingBrandSlug ? 'Edit Brand' : 'Create Brand'}
//                   </h5>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control
//                       name="name"
//                       value={brandForm.name}
//                       onChange={handleBrandChange}
//                       required
//                       className="rounded-3"
//                       placeholder="Example: Apple"
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Description</Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       rows={3}
//                       name="description"
//                       value={brandForm.description}
//                       onChange={handleBrandChange}
//                       className="rounded-3"
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Logo URL</Form.Label>
//                     <Form.Control
//                       name="logo"
//                       value={brandForm.logo}
//                       onChange={handleBrandChange}
//                       className="rounded-3"
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Website</Form.Label>
//                     <Form.Control
//                       name="website"
//                       value={brandForm.website}
//                       onChange={handleBrandChange}
//                       className="rounded-3"
//                     />
//                   </Form.Group>

//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Sort Order</Form.Label>
//                         <Form.Control
//                           type="number"
//                           name="sortOrder"
//                           value={brandForm.sortOrder}
//                           onChange={handleBrandChange}
//                           className="rounded-3"
//                         />
//                       </Form.Group>
//                     </Col>

//                     <Col md={6}>
//                       <Form.Group className="mb-3 pt-md-4">
//                         <Form.Check
//                           type="switch"
//                           name="isActive"
//                           label="Active"
//                           checked={brandForm.isActive}
//                           onChange={handleBrandChange}
//                         />

//                         <Form.Check
//                           type="switch"
//                           name="isFeatured"
//                           label="Featured"
//                           checked={brandForm.isFeatured}
//                           onChange={handleBrandChange}
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Meta Title</Form.Label>
//                     <Form.Control
//                       name="metaTitle"
//                       value={brandForm.metaTitle}
//                       onChange={handleBrandChange}
//                       className="rounded-3"
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-4">
//                     <Form.Label>Meta Description</Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       rows={2}
//                       name="metaDescription"
//                       value={brandForm.metaDescription}
//                       onChange={handleBrandChange}
//                       className="rounded-3"
//                     />
//                   </Form.Group>

//                   <div className="d-flex gap-2">
//                     <Button type="submit" className="rounded-3" disabled={brandState.loading}>
//                       {editingBrandSlug ? 'Update Brand' : 'Create Brand'}
//                     </Button>

//                     <Button
//                       type="button"
//                       variant="light"
//                       className="border rounded-3"
//                       onClick={resetBrandForm}
//                     >
//                       Cancel
//                     </Button>
//                   </div>
//                 </Form>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col lg={8}>
//           <Card className="border-0 rounded-4 bg-white mb-4">
//             <Card.Body className="p-0">
//               <div className="p-4 border-bottom">
//                 <h5 className="mb-1">Categories</h5>
//                 <p className="text-muted mb-0">Manage product categories.</p>
//               </div>

//               <div className="table-responsive">
//                 <Table className="align-middle mb-0 cb-table">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Slug</th>
//                       <th>Products</th>
//                       <th>Status</th>
//                       <th>Featured</th>
//                       <th>Created</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {categoryLoading && categories.length === 0 ? (
//                       <tr>
//                         <td colSpan="7" className="text-center py-5">
//                           <Spinner animation="border" />
//                         </td>
//                       </tr>
//                     ) : categories.length > 0 ? (
//                       categories.map((item) => (
//                         <tr key={item._id}>
//                           <td>
//                             <strong>{item.name}</strong>
//                             {item.description && (
//                               <small className="d-block text-muted">
//                                 {item.description.slice(0, 70)}
//                               </small>
//                             )}
//                           </td>

//                           <td>{item.slug}</td>
//                           <td>{item.productCount || 0}</td>

//                           <td>
//                             <Badge bg={item.isActive ? 'success' : 'danger'} className="p-2">
//                               {item.isActive ? 'Active' : 'Inactive'}
//                             </Badge>
//                           </td>

//                           <td>
//                             <Badge bg={item.isFeatured ? 'success' : 'warning'} className="p-2">
//                               {item.isFeatured ? 'Featured' : 'Normal'}
//                             </Badge>
//                           </td>

//                           <td>{formatDate(item.createdAt)}</td>

//                           <td>
//                             <div className="d-flex gap-2">
//                               <button
//                                 type="button"
//                                 className="cb-action text-primary"
//                                 onClick={() => startEditCategory(item)}
//                                 title="Edit"
//                               >
//                                 <span className="material-symbols-outlined fs-18">
//                                   edit
//                                 </span>
//                               </button>

//                               <button
//                                 type="button"
//                                 className={item.isActive ? 'cb-action text-warning' : 'cb-action text-success'}
//                                 onClick={() =>
//                                   dispatch(
//                                     toggleCategoryStatus({
//                                       slug: item.slug,
//                                       payload: { isActive: !item.isActive },
//                                     })
//                                   ).then(refreshAll)
//                                 }
//                                 title="Active / inactive"
//                               >
//                                 <span className="material-symbols-outlined fs-18">
//                                   {item.isActive ? 'block' : 'check_circle'}
//                                 </span>
//                               </button>

//                               <button
//                                 type="button"
//                                 className={item.isFeatured ? 'cb-action text-secondary' : 'cb-action text-info'}
//                                 onClick={() =>
//                                   dispatch(
//                                     toggleCategoryStatus({
//                                       slug: item.slug,
//                                       payload: { isFeatured: !item.isFeatured },
//                                     })
//                                   ).then(refreshAll)
//                                 }
//                                 title="Featured / normal"
//                               >
//                                 <span className="material-symbols-outlined fs-18">
//                                   star
//                                 </span>
//                               </button>

//                               <button
//                                 type="button"
//                                 className="cb-action text-danger"
//                                 onClick={() => handleDeleteCategory(item.slug)}
//                                 title="Delete"
//                               >
//                                 <span className="material-symbols-outlined fs-18">
//                                   delete
//                                 </span>
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="7" className="text-center text-muted py-5">
//                           No categories found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </Table>
//               </div>
//             </Card.Body>
//           </Card>

//           <Card className="border-0 rounded-4 bg-white">
//             <Card.Body className="p-0">
//               <div className="p-4 border-bottom">
//                 <h5 className="mb-1">Brands</h5>
//                 <p className="text-muted mb-0">Manage product brands.</p>
//               </div>

//               <div className="table-responsive">
//                 <Table className="align-middle mb-0 cb-table">
//                   <thead>
//                     <tr>
//                       <th>Brand</th>
//                       <th>Slug</th>
//                       <th>Products</th>
//                       <th>Status</th>
//                       <th>Featured</th>
//                       <th>Created</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {brandState.loading && brands.length === 0 ? (
//                       <tr>
//                         <td colSpan="7" className="text-center py-5">
//                           <Spinner animation="border" />
//                         </td>
//                       </tr>
//                     ) : brands.length > 0 ? (
//                       brands.map((item) => (
//                         <tr key={item._id}>
//                           <td>
//                             <strong>{item.name}</strong>
//                             {item.website && (
//                               <small className="d-block text-muted">
//                                 {item.website}
//                               </small>
//                             )}
//                           </td>

//                           <td>{item.slug}</td>
//                           <td>{item.productCount || 0}</td>

//                           <td>
//                             <Badge bg={item.isActive ? 'success' : 'danger'} className="p-2">
//                               {item.isActive ? 'Active' : 'Inactive'}
//                             </Badge>
//                           </td>

//                           <td>
//                             <Badge bg={item.isFeatured ? 'success' : 'warning'} className="p-2">
//                               {item.isFeatured ? 'Featured' : 'Normal'}
//                             </Badge>
//                           </td>

//                           <td>{formatDate(item.createdAt)}</td>

//                           <td>
//                             <div className="d-flex gap-2">
//                               <button
//                                 type="button"
//                                 className="cb-action text-primary"
//                                 onClick={() => startEditBrand(item)}
//                                 title="Edit"
//                               >
//                                 <span className="material-symbols-outlined fs-18">
//                                   edit
//                                 </span>
//                               </button>

//                               <button
//                                 type="button"
//                                 className={item.isActive ? 'cb-action text-warning' : 'cb-action text-success'}
//                                 onClick={() =>
//                                   dispatch(
//                                     toggleBrandStatus({
//                                       slug: item.slug,
//                                       payload: { isActive: !item.isActive },
//                                     })
//                                   ).then(refreshAll)
//                                 }
//                                 title="Active / inactive"
//                               >
//                                 <span className="material-symbols-outlined fs-18">
//                                   {item.isActive ? 'block' : 'check_circle'}
//                                 </span>
//                               </button>

//                               <button
//                                 type="button"
//                                 className={item.isFeatured ? 'cb-action text-secondary' : 'cb-action text-info'}
//                                 onClick={() =>
//                                   dispatch(
//                                     toggleBrandStatus({
//                                       slug: item.slug,
//                                       payload: { isFeatured: !item.isFeatured },
//                                     })
//                                   ).then(refreshAll)
//                                 }
//                                 title="Featured / normal"
//                               >
//                                 <span className="material-symbols-outlined fs-18">
//                                   star
//                                 </span>
//                               </button>

//                               <button
//                                 type="button"
//                                 className="cb-action text-danger"
//                                 onClick={() => handleDeleteBrand(item.slug)}
//                                 title="Delete"
//                               >
//                                 <span className="material-symbols-outlined fs-18">
//                                   delete
//                                 </span>
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="7" className="text-center text-muted py-5">
//                           No brands found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </Table>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default CategoryBrandManager;


















'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Form,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
  createCategory,
  getAdminCategories,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
} from '@/features/categorySlice';

import {
  createBrand,
  getAdminBrands,
  updateBrand,
  deleteBrand,
  toggleBrandStatus,
} from '@/features/brandSlice';

const CATEGORY_ICON_OPTIONS = [
  { label: 'Auto by category name', value: '' },

  { label: 'AC / Air Conditioner', value: 'air-vent' },
  { label: 'Portable Power Station / UPS', value: 'battery-charging' },
  { label: 'Air Fryer / Kitchen', value: 'utensils' },
  { label: 'Drone', value: 'drone' },
  { label: 'Camera / Gimbal / CCTV', value: 'camera' },
  { label: 'Tablet PC', value: 'tablet' },
  { label: 'TV', value: 'tv' },
  { label: 'Fridge / Refrigerator', value: 'refrigerator' },
  { label: 'Mobile Phone', value: 'smartphone' },
  { label: 'Mobile Accessories / Cable', value: 'cable' },
  { label: 'Portable SSD / Storage', value: 'hard-drive' },
  { label: 'Trimmer / Grooming', value: 'scissors' },
  { label: 'Smart Watch', value: 'watch' },
  { label: 'Earbuds / Audio', value: 'headphones' },
  { label: 'Gaming Console', value: 'gamepad' },

  { label: 'Monitor', value: 'monitor' },
  { label: 'Laptop', value: 'laptop' },
  { label: 'Computer Component', value: 'cpu' },
  { label: 'Router / Networking', value: 'router' },
  { label: 'Printer', value: 'printer' },
  { label: 'Men / Shirt', value: 'shirt' },
  { label: 'Women / Beauty', value: 'sparkles' },
  { label: 'Baby / Kids', value: 'baby' },
  { label: 'Gift', value: 'gift' },
  { label: 'Home Appliance', value: 'home' },
  { label: 'Fashion / Shopping', value: 'shopping-bag' },
];

const emptyCategory = {
  name: '',
  description: '',
  image: '',
  iconKey: '',
  isActive: true,
  isFeatured: false,
  sortOrder: 0,
  metaTitle: '',
  metaDescription: '',
};

const emptyBrand = {
  name: '',
  description: '',
  logo: '',
  website: '',
  isActive: true,
  isFeatured: false,
  sortOrder: 0,
  metaTitle: '',
  metaDescription: '',
};

const getIconLabel = (iconKey) => {
  const found = CATEGORY_ICON_OPTIONS.find((item) => item.value === iconKey);
  return found?.label || 'Auto by category name';
};

const CategoryBrandManager = () => {
  const dispatch = useDispatch();

  const categoryState = useSelector((state) => state.category || {});
  const brandState = useSelector((state) => state.brand || {});

  const {
    categories = [],
    stats: categoryStats,
    loading: categoryLoading,
    error: categoryError,
  } = categoryState;

  const brands = brandState.brands || brandState.Brands || [];
  const brandLoading = brandState.loading;
  const brandError = brandState.error;

  const [activeTab, setActiveTab] = useState('category');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [featured, setFeatured] = useState('all');

  const [categoryForm, setCategoryForm] = useState(emptyCategory);
  const [brandForm, setBrandForm] = useState(emptyBrand);

  const [editingCategorySlug, setEditingCategorySlug] = useState(null);
  const [editingBrandSlug, setEditingBrandSlug] = useState(null);

  const query = useMemo(
    () => ({
      search,
      status,
      featured,
    }),
    [search, status, featured]
  );

  useEffect(() => {
    dispatch(getAdminCategories(query));
    dispatch(getAdminBrands(query));
  }, [dispatch, query]);

  const refreshAll = () => {
    dispatch(getAdminCategories(query));
    dispatch(getAdminBrands(query));
  };

  const formatDate = (value) => {
    if (!value) return 'N/A';

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'Asia/Dhaka',
    }).format(new Date(value));
  };

  const handleCategoryChange = (event) => {
    const { name, value, type, checked } = event.target;

    setCategoryForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleBrandChange = (event) => {
    const { name, value, type, checked } = event.target;

    setBrandForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetCategoryForm = () => {
    setCategoryForm(emptyCategory);
    setEditingCategorySlug(null);
  };

  const resetBrandForm = () => {
    setBrandForm(emptyBrand);
    setEditingBrandSlug(null);
  };

  const submitCategory = (event) => {
    event.preventDefault();

    const payload = {
      ...categoryForm,
      iconKey: categoryForm.iconKey || '',
      sortOrder: Number(categoryForm.sortOrder || 0),
    };

    const action = editingCategorySlug
      ? updateCategory({
          slug: editingCategorySlug,
          data: payload,
        })
      : createCategory(payload);

    dispatch(action).then(() => {
      resetCategoryForm();
      refreshAll();
    });
  };

  const submitBrand = (event) => {
    event.preventDefault();

    const payload = {
      ...brandForm,
      sortOrder: Number(brandForm.sortOrder || 0),
    };

    const action = editingBrandSlug
      ? updateBrand({
          slug: editingBrandSlug,
          data: payload,
        })
      : createBrand(payload);

    dispatch(action).then(() => {
      resetBrandForm();
      refreshAll();
    });
  };

  const startEditCategory = (item) => {
    setActiveTab('category');
    setEditingCategorySlug(item.slug);

    setCategoryForm({
      name: item.name || '',
      description: item.description || '',
      image: item.image || '',
      iconKey: item.iconKey || '',
      isActive: item.isActive !== false,
      isFeatured: Boolean(item.isFeatured),
      sortOrder: item.sortOrder || 0,
      metaTitle: item.metaTitle || '',
      metaDescription: item.metaDescription || '',
    });
  };

  const startEditBrand = (item) => {
    setActiveTab('brand');
    setEditingBrandSlug(item.slug);

    setBrandForm({
      name: item.name || '',
      description: item.description || '',
      logo: item.logo || '',
      website: item.website || '',
      isActive: item.isActive !== false,
      isFeatured: Boolean(item.isFeatured),
      sortOrder: item.sortOrder || 0,
      metaTitle: item.metaTitle || '',
      metaDescription: item.metaDescription || '',
    });
  };

  const handleDeleteCategory = (slug) => {
    const confirmed = window.confirm(
      'Delete this category? If products exist, it will be deactivated instead.'
    );

    if (!confirmed) return;

    dispatch(deleteCategory(slug)).then(refreshAll);
  };

  const handleDeleteBrand = (slug) => {
    const confirmed = window.confirm(
      'Delete this brand? If products exist, it will be deactivated instead.'
    );

    if (!confirmed) return;

    dispatch(deleteBrand(slug)).then(refreshAll);
  };

  const handleToggleCategoryActive = (item) => {
    dispatch(
      toggleCategoryStatus({
        slug: item.slug,
        payload: {
          isActive: !item.isActive,
        },
      })
    ).then(refreshAll);
  };

  const handleToggleCategoryFeatured = (item) => {
    dispatch(
      toggleCategoryStatus({
        slug: item.slug,
        payload: {
          isFeatured: !item.isFeatured,
        },
      })
    ).then(refreshAll);
  };

  const handleToggleBrandActive = (item) => {
    dispatch(
      toggleBrandStatus({
        slug: item.slug,
        payload: {
          isActive: !item.isActive,
        },
      })
    ).then(refreshAll);
  };

  const handleToggleBrandFeatured = (item) => {
    dispatch(
      toggleBrandStatus({
        slug: item.slug,
        payload: {
          isFeatured: !item.isFeatured,
        },
      })
    ).then(refreshAll);
  };

  const stats = {
    categoriesTotal: categoryStats?.total || categories.length || 0,
    categoriesActive:
      categoryStats?.active ||
      categories.filter((item) => item.isActive).length ||
      0,
    brandsTotal: brandState.stats?.total || brands.length || 0,
    brandsActive:
      brandState.stats?.active ||
      brands.filter((item) => item.isActive).length ||
      0,
  };

  return (
    <>
      <Row className="mb-4">
        <Col xxl={3} sm={6} className="mb-3">
          <Card className="border-0 rounded-4 shadow-sm h-100">
            <Card.Body>
              <span className="text-muted fs-12 fw-semibold text-uppercase">
                Total Categories
              </span>
              <h3 className="mt-2 mb-0 fw-bold">{stats.categoriesTotal}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col xxl={3} sm={6} className="mb-3">
          <Card className="border-0 rounded-4 shadow-sm h-100">
            <Card.Body>
              <span className="text-muted fs-12 fw-semibold text-uppercase">
                Active Categories
              </span>
              <h3 className="mt-2 mb-0 fw-bold text-success">
                {stats.categoriesActive}
              </h3>
            </Card.Body>
          </Card>
        </Col>

        <Col xxl={3} sm={6} className="mb-3">
          <Card className="border-0 rounded-4 shadow-sm h-100">
            <Card.Body>
              <span className="text-muted fs-12 fw-semibold text-uppercase">
                Total Brands
              </span>
              <h3 className="mt-2 mb-0 fw-bold">{stats.brandsTotal}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col xxl={3} sm={6} className="mb-3">
          <Card className="border-0 rounded-4 shadow-sm h-100">
            <Card.Body>
              <span className="text-muted fs-12 fw-semibold text-uppercase">
                Active Brands
              </span>
              <h3 className="mt-2 mb-0 fw-bold text-success">
                {stats.brandsActive}
              </h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 rounded-4 shadow-sm mb-4">
        <Card.Body>
          <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
            <div>
              <h4 className="mb-1 fw-semibold">Category & Brand Manager</h4>
              <p className="text-muted mb-0">
                Create, edit, activate, feature, sort, and manage frontend icon keys.
              </p>
            </div>

            <Button
              variant="dark"
              className="rounded-pill px-4"
              onClick={refreshAll}
            >
              Refresh
            </Button>
          </div>

          <Row className="g-3 mb-4">
            <Col lg={6}>
              <Form.Control
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, slug, or description"
                className="h-55 rounded-3"
              />
            </Col>

            <Col lg={3}>
              <Form.Select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="h-55 rounded-3"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Col>

            <Col lg={3}>
              <Form.Select
                value={featured}
                onChange={(event) => setFeatured(event.target.value)}
                className="h-55 rounded-3"
              >
                <option value="all">All Featured</option>
                <option value="yes">Featured</option>
                <option value="no">Not Featured</option>
              </Form.Select>
            </Col>
          </Row>

          {(categoryError || brandError) && (
            <Alert variant="danger" className="rounded-3">
              {categoryError || brandError}
            </Alert>
          )}

          <div className="d-flex gap-2 mb-4">
            <Button
              variant={activeTab === 'category' ? 'dark' : 'outline-dark'}
              className="rounded-pill px-4"
              onClick={() => setActiveTab('category')}
            >
              Category
            </Button>

            <Button
              variant={activeTab === 'brand' ? 'dark' : 'outline-dark'}
              className="rounded-pill px-4"
              onClick={() => setActiveTab('brand')}
            >
              Brand
            </Button>
          </div>

          {activeTab === 'category' ? (
            <Form onSubmit={submitCategory}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0 fw-semibold">
                  {editingCategorySlug ? 'Edit Category' : 'Create Category'}
                </h5>

                {editingCategorySlug && (
                  <Badge bg="warning" text="dark" className="rounded-pill px-3 py-2">
                    Editing: {editingCategorySlug}
                  </Badge>
                )}
              </div>

              <Row className="g-3">
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={categoryForm.name}
                      onChange={handleCategoryChange}
                      placeholder="Example: Mobile Phone"
                      required
                    />
                    <Form.Text className="text-muted">
                      Slug will be generated automatically from category name.
                    </Form.Text>
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      name="description"
                      value={categoryForm.description}
                      onChange={handleCategoryChange}
                      placeholder="Short category description"
                    />
                  </Form.Group>
                </Col>

                <Col lg={4}>
                  <Form.Group>
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                      name="image"
                      value={categoryForm.image}
                      onChange={handleCategoryChange}
                      placeholder="https://example.com/category.png"
                    />
                  </Form.Group>
                </Col>

                <Col lg={4}>
                  <Form.Group>
                    <Form.Label>Icon Key</Form.Label>
                    <Form.Select
                      name="iconKey"
                      value={categoryForm.iconKey}
                      onChange={handleCategoryChange}
                    >
                      {CATEGORY_ICON_OPTIONS.map((item) => (
                        <option key={item.value || 'auto'} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Text className="text-muted">
                      Keep Auto if frontend should choose icon by category name.
                    </Form.Text>
                  </Form.Group>
                </Col>

                <Col lg={4}>
                  <Form.Group>
                    <Form.Label>Sort Order</Form.Label>
                    <Form.Control
                      type="number"
                      name="sortOrder"
                      value={categoryForm.sortOrder}
                      onChange={handleCategoryChange}
                      min="0"
                    />
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Meta Title</Form.Label>
                    <Form.Control
                      name="metaTitle"
                      value={categoryForm.metaTitle}
                      onChange={handleCategoryChange}
                      placeholder="SEO title"
                    />
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Meta Description</Form.Label>
                    <Form.Control
                      name="metaDescription"
                      value={categoryForm.metaDescription}
                      onChange={handleCategoryChange}
                      placeholder="SEO description"
                    />
                  </Form.Group>
                </Col>

                <Col lg={12}>
                  <div className="d-flex flex-wrap align-items-center gap-4">
                    <Form.Check
                      type="switch"
                      id="category-active"
                      name="isActive"
                      label="Active"
                      checked={categoryForm.isActive}
                      onChange={handleCategoryChange}
                    />

                    <Form.Check
                      type="switch"
                      id="category-featured"
                      name="isFeatured"
                      label="Featured"
                      checked={categoryForm.isFeatured}
                      onChange={handleCategoryChange}
                    />

                    <div className="ms-auto">
                      <Badge bg="light" text="dark" className="border rounded-pill px-3 py-2">
                        Icon: {categoryForm.iconKey || 'auto'}
                      </Badge>
                    </div>
                  </div>
                </Col>

                <Col lg={12}>
                  <div className="d-flex flex-wrap gap-2">
                    <Button
                      type="submit"
                      variant="warning"
                      className="rounded-pill px-4 fw-semibold text-dark"
                      disabled={categoryLoading}
                    >
                      {categoryLoading ? (
                        <>
                          <Spinner size="sm" className="me-2" />
                          Saving...
                        </>
                      ) : editingCategorySlug ? (
                        'Update Category'
                      ) : (
                        'Create Category'
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline-secondary"
                      className="rounded-pill px-4"
                      onClick={resetCategoryForm}
                    >
                      Cancel
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          ) : (
            <Form onSubmit={submitBrand}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0 fw-semibold">
                  {editingBrandSlug ? 'Edit Brand' : 'Create Brand'}
                </h5>

                {editingBrandSlug && (
                  <Badge bg="warning" text="dark" className="rounded-pill px-3 py-2">
                    Editing: {editingBrandSlug}
                  </Badge>
                )}
              </div>

              <Row className="g-3">
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={brandForm.name}
                      onChange={handleBrandChange}
                      placeholder="Example: Apple"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      name="description"
                      value={brandForm.description}
                      onChange={handleBrandChange}
                      placeholder="Short brand description"
                    />
                  </Form.Group>
                </Col>

                <Col lg={4}>
                  <Form.Group>
                    <Form.Label>Logo URL</Form.Label>
                    <Form.Control
                      name="logo"
                      value={brandForm.logo}
                      onChange={handleBrandChange}
                      placeholder="https://example.com/logo.png"
                    />
                  </Form.Group>
                </Col>

                <Col lg={4}>
                  <Form.Group>
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                      name="website"
                      value={brandForm.website}
                      onChange={handleBrandChange}
                      placeholder="https://example.com"
                    />
                  </Form.Group>
                </Col>

                <Col lg={4}>
                  <Form.Group>
                    <Form.Label>Sort Order</Form.Label>
                    <Form.Control
                      type="number"
                      name="sortOrder"
                      value={brandForm.sortOrder}
                      onChange={handleBrandChange}
                      min="0"
                    />
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Meta Title</Form.Label>
                    <Form.Control
                      name="metaTitle"
                      value={brandForm.metaTitle}
                      onChange={handleBrandChange}
                      placeholder="SEO title"
                    />
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Meta Description</Form.Label>
                    <Form.Control
                      name="metaDescription"
                      value={brandForm.metaDescription}
                      onChange={handleBrandChange}
                      placeholder="SEO description"
                    />
                  </Form.Group>
                </Col>

                <Col lg={12}>
                  <div className="d-flex flex-wrap gap-4">
                    <Form.Check
                      type="switch"
                      id="brand-active"
                      name="isActive"
                      label="Active"
                      checked={brandForm.isActive}
                      onChange={handleBrandChange}
                    />

                    <Form.Check
                      type="switch"
                      id="brand-featured"
                      name="isFeatured"
                      label="Featured"
                      checked={brandForm.isFeatured}
                      onChange={handleBrandChange}
                    />
                  </div>
                </Col>

                <Col lg={12}>
                  <div className="d-flex flex-wrap gap-2">
                    <Button
                      type="submit"
                      variant="warning"
                      className="rounded-pill px-4 fw-semibold text-dark"
                      disabled={brandLoading}
                    >
                      {brandLoading ? (
                        <>
                          <Spinner size="sm" className="me-2" />
                          Saving...
                        </>
                      ) : editingBrandSlug ? (
                        'Update Brand'
                      ) : (
                        'Create Brand'
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline-secondary"
                      className="rounded-pill px-4"
                      onClick={resetBrandForm}
                    >
                      Cancel
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          )}
        </Card.Body>
      </Card>

      <Card className="border-0 rounded-4 shadow-sm mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="mb-1 fw-semibold">Categories</h5>
              <p className="mb-0 text-muted">Manage product categories.</p>
            </div>
          </div>

          {categoryLoading && categories.length === 0 ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
            </div>
          ) : categories.length > 0 ? (
            <div className="table-responsive">
              <Table className="align-middle mb-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Icon</th>
                    <th>Products</th>
                    <th>Status</th>
                    <th>Featured</th>
                    <th>Sort</th>
                    <th>Created</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((item) => (
                    <tr key={item._id || item.slug}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              width={44}
                              height={44}
                              className="rounded-3 object-fit-cover border"
                            />
                          ) : (
                            <div
                              className="d-flex align-items-center justify-content-center rounded-3 fw-semibold"
                              style={{
                                width: 44,
                                height: 44,
                                backgroundColor: '#F7C600',
                                color: '#0A0A0A',
                                fontSize: 12,
                              }}
                            >
                              {(item.name || 'C').slice(0, 2).toUpperCase()}
                            </div>
                          )}

                          <div>
                            <div className="fw-semibold">{item.name}</div>
                            {item.description && (
                              <small className="text-muted">
                                {item.description.slice(0, 70)}
                              </small>
                            )}
                          </div>
                        </div>
                      </td>

                      <td>
                        <code>{item.slug}</code>
                      </td>

                      <td>
                        <Badge bg="light" text="dark" className="border rounded-pill">
                          {item.iconKey || 'auto'}
                        </Badge>
                      </td>

                      <td>{item.productCount || 0}</td>

                      <td>
                        <Badge
                          bg={item.isActive ? 'success' : 'secondary'}
                          className="rounded-pill"
                        >
                          {item.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>

                      <td>
                        <Badge
                          bg={item.isFeatured ? 'warning' : 'light'}
                          text={item.isFeatured ? 'dark' : 'secondary'}
                          className="rounded-pill border"
                        >
                          {item.isFeatured ? 'Featured' : 'Normal'}
                        </Badge>
                      </td>

                      <td>{item.sortOrder || 0}</td>

                      <td>{formatDate(item.createdAt)}</td>

                      <td>
                        <div className="d-flex justify-content-end gap-2">
                          <Button
                            size="sm"
                            variant="outline-primary"
                            className="rounded-pill"
                            onClick={() => startEditCategory(item)}
                            title="Edit"
                          >
                            Edit
                          </Button>

                          <Button
                            size="sm"
                            variant={item.isActive ? 'outline-secondary' : 'outline-success'}
                            className="rounded-pill"
                            onClick={() => handleToggleCategoryActive(item)}
                            title="Active / inactive"
                          >
                            {item.isActive ? 'Disable' : 'Enable'}
                          </Button>

                          <Button
                            size="sm"
                            variant={item.isFeatured ? 'warning' : 'outline-warning'}
                            className="rounded-pill"
                            onClick={() => handleToggleCategoryFeatured(item)}
                            title="Featured / normal"
                          >
                            {item.isFeatured ? 'Unfeature' : 'Feature'}
                          </Button>

                          <Button
                            size="sm"
                            variant="outline-danger"
                            className="rounded-pill"
                            onClick={() => handleDeleteCategory(item.slug)}
                            title="Delete"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <Alert variant="light" className="border rounded-3 mb-0">
              No categories found.
            </Alert>
          )}
        </Card.Body>
      </Card>

      <Card className="border-0 rounded-4 shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="mb-1 fw-semibold">Brands</h5>
              <p className="mb-0 text-muted">Manage product brands.</p>
            </div>
          </div>

          {brandLoading && brands.length === 0 ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
            </div>
          ) : brands.length > 0 ? (
            <div className="table-responsive">
              <Table className="align-middle mb-0">
                <thead>
                  <tr>
                    <th>Brand</th>
                    <th>Slug</th>
                    <th>Products</th>
                    <th>Status</th>
                    <th>Featured</th>
                    <th>Sort</th>
                    <th>Created</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {brands.map((item) => (
                    <tr key={item._id || item.slug}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          {item.logo ? (
                            <img
                              src={item.logo}
                              alt={item.name}
                              width={44}
                              height={44}
                              className="rounded-3 object-fit-cover border"
                            />
                          ) : (
                            <div
                              className="d-flex align-items-center justify-content-center rounded-3 bg-light border fw-semibold"
                              style={{ width: 44, height: 44 }}
                            >
                              {String(item.name || 'B').charAt(0)}
                            </div>
                          )}

                          <div>
                            <div className="fw-semibold">{item.name}</div>
                            {item.website && (
                              <small className="text-muted">{item.website}</small>
                            )}
                          </div>
                        </div>
                      </td>

                      <td>
                        <code>{item.slug}</code>
                      </td>

                      <td>{item.productCount || 0}</td>

                      <td>
                        <Badge
                          bg={item.isActive ? 'success' : 'secondary'}
                          className="rounded-pill"
                        >
                          {item.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>

                      <td>
                        <Badge
                          bg={item.isFeatured ? 'warning' : 'light'}
                          text={item.isFeatured ? 'dark' : 'secondary'}
                          className="rounded-pill border"
                        >
                          {item.isFeatured ? 'Featured' : 'Normal'}
                        </Badge>
                      </td>

                      <td>{item.sortOrder || 0}</td>

                      <td>{formatDate(item.createdAt)}</td>

                      <td>
                        <div className="d-flex justify-content-end gap-2">
                          <Button
                            size="sm"
                            variant="outline-primary"
                            className="rounded-pill"
                            onClick={() => startEditBrand(item)}
                            title="Edit"
                          >
                            Edit
                          </Button>

                          <Button
                            size="sm"
                            variant={item.isActive ? 'outline-secondary' : 'outline-success'}
                            className="rounded-pill"
                            onClick={() => handleToggleBrandActive(item)}
                            title="Active / inactive"
                          >
                            {item.isActive ? 'Disable' : 'Enable'}
                          </Button>

                          <Button
                            size="sm"
                            variant={item.isFeatured ? 'warning' : 'outline-warning'}
                            className="rounded-pill"
                            onClick={() => handleToggleBrandFeatured(item)}
                            title="Featured / normal"
                          >
                            {item.isFeatured ? 'Unfeature' : 'Feature'}
                          </Button>

                          <Button
                            size="sm"
                            variant="outline-danger"
                            className="rounded-pill"
                            onClick={() => handleDeleteBrand(item.slug)}
                            title="Delete"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <Alert variant="light" className="border rounded-3 mb-0">
              No brands found.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default CategoryBrandManager;