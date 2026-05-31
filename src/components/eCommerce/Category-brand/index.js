// 'use client';

// import Table from './table/table.js';
// import { useState } from 'react';
// import { Row, Col, Card, Form } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
// import { createCategory } from '@/features/categorySlice';
// import { createBrand } from '@/features/brandSlice';

// const CreateCatandBrand = () => {
//   const dispatch = useDispatch();

//   // -------------------------form

//   const [category, setCategory] = useState({
//     name: '',
//     description: ''
//   });

//   const [brand, setBrand] = useState({
//     name: '',
//     description: ''
//   });

//   const handleCategory = (e) => {
//     const { name, value } = e.target;
//     setCategory((prev) => ({ ...prev, [name]: value }));
//   };
//   const handleBrand = (e) => {
//     const { name, value } = e.target;
//     setBrand((prev) => ({ ...prev, [name]: value }));
//   };

//   const SubmitCategory = (e) => {
//     e.preventDefault();
//     dispatch(createCategory(category));
//   };
//   const SubmitBrand = (e) => {
//     e.preventDefault();
//     dispatch(createBrand(brand));
//   };

//   return (
//     <>
//       <Card className="bg-white border-0 rounded-3 mb-4">
//         <h3 className="p-3 ">Create Category</h3>
//         <Card.Body className="p-4">
//           <Form onSubmit={SubmitCategory}>
//             <Row>
//               <Col sm={6} lg={4}>
//                 <Form.Group className="mb-4">
//                   <Form.Label className="label text-secondary">Category Name</Form.Label>
//                   <Form.Control
//                     name="name"
//                     value={category.name || ''}
//                     onChange={handleCategory}
//                     type="text"
//                     className="h-55"
//                     placeholder="Enter Category Name"
//                   />
//                 </Form.Group>
//               </Col>
//               <Col sm={6} lg={4}>
//                 <Form.Group className="mb-4">
//                   <Form.Label className="label text-secondary">Description</Form.Label>
//                   <Form.Control
//                     name="description"
//                     value={category.description}
//                     onChange={handleCategory}
//                     type="text"
//                     className="h-55"
//                     placeholder="Enter Category Name"
//                   />
//                 </Form.Group>
//               </Col>

//               <Col sm={12} lg={12}>
//                 <div className="d-flex flex-wrap gap-3">
//                   <button className="btn btn-danger py-2 px-4 fw-medium fs-16 text-white">Cancel</button>
//                   <button className="btn btn-primary py-2 px-4 fw-medium fs-16">
//                     {' '}
//                     <i className="ri-add-line text-white fw-medium"></i> Create
//                   </button>
//                 </div>
//               </Col>
//             </Row>
//           </Form>
//         </Card.Body>
//       </Card>

//       <Card className="bg-white border-0 rounded-3 mb-4">
//         <h3 className="p-3 ">Create Brand</h3>
//         <Card.Body className="p-4">
//           <Form onSubmit={SubmitBrand}>
//             <Row>
//               <Col sm={6} lg={4}>
//                 <Form.Group className="mb-4">
//                   <Form.Label className="label text-secondary">Brand Name</Form.Label>
//                   <Form.Control
//                     name="name"
//                     value={brand.name}
//                     onChange={handleBrand}
//                     type="text"
//                     className="h-55"
//                     placeholder="Enter Seller Name"
//                   />
//                 </Form.Group>
//               </Col>

//               <Col sm={6} lg={4}>
//                 <Form.Group className="mb-4">
//                   <Form.Label className="label text-secondary">Description</Form.Label>
//                   <Form.Control
//                     name="description"
//                     value={brand.description}
//                     onChange={handleBrand}
//                     type="text"
//                     className="h-55"
//                     placeholder="Enter description"
//                   />
//                 </Form.Group>
//               </Col>
//               <Col sm={12} lg={12}>
//                 <div className="d-flex flex-wrap gap-3">
//                   <button className="btn btn-danger py-2 px-4 fw-medium fs-16 text-white">Cancel</button>
//                   <button className="btn btn-primary py-2 px-4 fw-medium fs-16">
//                     {' '}
//                     <i className="ri-add-line text-white fw-medium"></i> Create
//                   </button>
//                 </div>
//               </Col>
//             </Row>
//           </Form>
//         </Card.Body>
//       </Card>

//       <Card className="bg-white border-0 rounded-3 mb-4">
//         <h3 className="p-3 ">Create Brand</h3>
//         <Card.Body className="p-4">
//           <Form>
//             <Row>
//               <Col sm={6} lg={4}>
//                 <Form.Group className="mb-4">
//                   <Form.Label className="label text-secondary">Seller Name</Form.Label>
//                   <Form.Control type="text" className="h-55" placeholder="Enter Seller Name" />
//                 </Form.Group>
//               </Col>

//               <Col sm={6} lg={6}>
//                 <Form.Group className="mb-4">
//                   <Form.Label className="label text-secondary">View All Brand</Form.Label>
//                   <Form.Select className="form-control h-55" aria-label="Default select example">
//                     <option defaultValue="0">State</option>
//                     <option defaultValue="1">Digital Product</option>
//                     <option defaultValue="2">Physical Product</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//             </Row>
//           </Form>
//         </Card.Body>
//       </Card>
//       <Table />
//     </>
//   );
// };

// export default CreateCatandBrand;





'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  Table,
  Spinner,
  Alert,
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

const emptyCategory = {
  name: '',
  description: '',
  image: '',
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

const CategoryBrandManager = () => {
  const dispatch = useDispatch();

  const {
    categories,
    stats: categoryStats,
    loading: categoryLoading,
    error: categoryError,
  } = useSelector((state) => state.category);

  const brandState = useSelector((state) => state.brand);
  const brands = brandState.brands || brandState.Brands || [];

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

  const handleCategoryChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCategoryForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleBrandChange = (e) => {
    const { name, value, type, checked } = e.target;

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

  const submitCategory = (e) => {
    e.preventDefault();

    const action = editingCategorySlug
      ? updateCategory({ slug: editingCategorySlug, data: categoryForm })
      : createCategory(categoryForm);

    dispatch(action).then(() => {
      resetCategoryForm();
      refreshAll();
    });
  };

  const submitBrand = (e) => {
    e.preventDefault();

    const action = editingBrandSlug
      ? updateBrand({ slug: editingBrandSlug, data: brandForm })
      : createBrand(brandForm);

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

  const stats = {
    categoriesTotal: categoryStats?.total || categories.length || 0,
    categoriesActive:
      categoryStats?.active || categories.filter((item) => item.isActive).length || 0,
    brandsTotal: brandState.stats?.total || brands.length || 0,
    brandsActive:
      brandState.stats?.active || brands.filter((item) => item.isActive).length || 0,
  };

  return (
    <>
      <Row className="g-4 mb-4">
        <Col sm={6} xl={3}>
          <Card className="border-0 rounded-4 bg-white cb-stat-card">
            <Card.Body className="p-4">
              <span className="text-muted d-block">Total Categories</span>
              <h3 className="mb-0">{stats.categoriesTotal}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="border-0 rounded-4 bg-white cb-stat-card">
            <Card.Body className="p-4">
              <span className="text-muted d-block">Active Categories</span>
              <h3 className="mb-0 text-success">{stats.categoriesActive}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="border-0 rounded-4 bg-white cb-stat-card">
            <Card.Body className="p-4">
              <span className="text-muted d-block">Total Brands</span>
              <h3 className="mb-0">{stats.brandsTotal}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="border-0 rounded-4 bg-white cb-stat-card">
            <Card.Body className="p-4">
              <span className="text-muted d-block">Active Brands</span>
              <h3 className="mb-0 text-success">{stats.brandsActive}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 rounded-4 bg-white mb-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
            <div>
              <h3 className="mb-1">Category & Brand Manager</h3>
              <p className="text-muted mb-0">
                Create, edit, activate/deactivate, feature, and track product usage.
              </p>
            </div>

            <Button variant="outline-primary" className="rounded-3" onClick={refreshAll}>
              Refresh
            </Button>
          </div>

          <Row className="g-3">
            <Col lg={6}>
              <Form.Control
                type="search"
                placeholder="Search category or brand..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-55 rounded-3"
              />
            </Col>

            <Col sm={6} lg={3}>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-55 rounded-3"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Col>

            <Col sm={6} lg={3}>
              <Form.Select
                value={featured}
                onChange={(e) => setFeatured(e.target.value)}
                className="h-55 rounded-3"
              >
                <option value="all">All Featured</option>
                <option value="yes">Featured</option>
                <option value="no">Not Featured</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {(categoryError || brandState.error) && (
        <Alert variant="danger">
          {categoryError || brandState.error}
        </Alert>
      )}

      <Row className="g-4">
        <Col lg={4}>
          <Card className="border-0 rounded-4 bg-white mb-4">
            <Card.Body className="p-4">
              <div className="d-flex gap-2 mb-4">
                <Button
                  variant={activeTab === 'category' ? 'primary' : 'light'}
                  className="rounded-3"
                  onClick={() => setActiveTab('category')}
                >
                  Category
                </Button>

                <Button
                  variant={activeTab === 'brand' ? 'primary' : 'light'}
                  className="rounded-3"
                  onClick={() => setActiveTab('brand')}
                >
                  Brand
                </Button>
              </div>

              {activeTab === 'category' ? (
                <Form onSubmit={submitCategory}>
                  <h5 className="mb-3">
                    {editingCategorySlug ? 'Edit Category' : 'Create Category'}
                  </h5>

                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={categoryForm.name}
                      onChange={handleCategoryChange}
                      required
                      className="rounded-3"
                      placeholder="Example: Electronics"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={categoryForm.description}
                      onChange={handleCategoryChange}
                      className="rounded-3"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                      name="image"
                      value={categoryForm.image}
                      onChange={handleCategoryChange}
                      className="rounded-3"
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Sort Order</Form.Label>
                        <Form.Control
                          type="number"
                          name="sortOrder"
                          value={categoryForm.sortOrder}
                          onChange={handleCategoryChange}
                          className="rounded-3"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3 pt-md-4">
                        <Form.Check
                          type="switch"
                          name="isActive"
                          label="Active"
                          checked={categoryForm.isActive}
                          onChange={handleCategoryChange}
                        />

                        <Form.Check
                          type="switch"
                          name="isFeatured"
                          label="Featured"
                          checked={categoryForm.isFeatured}
                          onChange={handleCategoryChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Meta Title</Form.Label>
                    <Form.Control
                      name="metaTitle"
                      value={categoryForm.metaTitle}
                      onChange={handleCategoryChange}
                      className="rounded-3"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Meta Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="metaDescription"
                      value={categoryForm.metaDescription}
                      onChange={handleCategoryChange}
                      className="rounded-3"
                    />
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button type="submit" className="rounded-3" disabled={categoryLoading}>
                      {editingCategorySlug ? 'Update Category' : 'Create Category'}
                    </Button>

                    <Button
                      type="button"
                      variant="light"
                      className="border rounded-3"
                      onClick={resetCategoryForm}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              ) : (
                <Form onSubmit={submitBrand}>
                  <h5 className="mb-3">
                    {editingBrandSlug ? 'Edit Brand' : 'Create Brand'}
                  </h5>

                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={brandForm.name}
                      onChange={handleBrandChange}
                      required
                      className="rounded-3"
                      placeholder="Example: Apple"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={brandForm.description}
                      onChange={handleBrandChange}
                      className="rounded-3"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Logo URL</Form.Label>
                    <Form.Control
                      name="logo"
                      value={brandForm.logo}
                      onChange={handleBrandChange}
                      className="rounded-3"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                      name="website"
                      value={brandForm.website}
                      onChange={handleBrandChange}
                      className="rounded-3"
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Sort Order</Form.Label>
                        <Form.Control
                          type="number"
                          name="sortOrder"
                          value={brandForm.sortOrder}
                          onChange={handleBrandChange}
                          className="rounded-3"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3 pt-md-4">
                        <Form.Check
                          type="switch"
                          name="isActive"
                          label="Active"
                          checked={brandForm.isActive}
                          onChange={handleBrandChange}
                        />

                        <Form.Check
                          type="switch"
                          name="isFeatured"
                          label="Featured"
                          checked={brandForm.isFeatured}
                          onChange={handleBrandChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Meta Title</Form.Label>
                    <Form.Control
                      name="metaTitle"
                      value={brandForm.metaTitle}
                      onChange={handleBrandChange}
                      className="rounded-3"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Meta Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="metaDescription"
                      value={brandForm.metaDescription}
                      onChange={handleBrandChange}
                      className="rounded-3"
                    />
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button type="submit" className="rounded-3" disabled={brandState.loading}>
                      {editingBrandSlug ? 'Update Brand' : 'Create Brand'}
                    </Button>

                    <Button
                      type="button"
                      variant="light"
                      className="border rounded-3"
                      onClick={resetBrandForm}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="border-0 rounded-4 bg-white mb-4">
            <Card.Body className="p-0">
              <div className="p-4 border-bottom">
                <h5 className="mb-1">Categories</h5>
                <p className="text-muted mb-0">Manage product categories.</p>
              </div>

              <div className="table-responsive">
                <Table className="align-middle mb-0 cb-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Slug</th>
                      <th>Products</th>
                      <th>Status</th>
                      <th>Featured</th>
                      <th>Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {categoryLoading && categories.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-5">
                          <Spinner animation="border" />
                        </td>
                      </tr>
                    ) : categories.length > 0 ? (
                      categories.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <strong>{item.name}</strong>
                            {item.description && (
                              <small className="d-block text-muted">
                                {item.description.slice(0, 70)}
                              </small>
                            )}
                          </td>

                          <td>{item.slug}</td>
                          <td>{item.productCount || 0}</td>

                          <td>
                            <Badge bg={item.isActive ? 'success' : 'danger'} className="p-2">
                              {item.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </td>

                          <td>
                            <Badge bg={item.isFeatured ? 'success' : 'warning'} className="p-2">
                              {item.isFeatured ? 'Featured' : 'Normal'}
                            </Badge>
                          </td>

                          <td>{formatDate(item.createdAt)}</td>

                          <td>
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                className="cb-action text-primary"
                                onClick={() => startEditCategory(item)}
                                title="Edit"
                              >
                                <span className="material-symbols-outlined fs-18">
                                  edit
                                </span>
                              </button>

                              <button
                                type="button"
                                className={item.isActive ? 'cb-action text-warning' : 'cb-action text-success'}
                                onClick={() =>
                                  dispatch(
                                    toggleCategoryStatus({
                                      slug: item.slug,
                                      payload: { isActive: !item.isActive },
                                    })
                                  ).then(refreshAll)
                                }
                                title="Active / inactive"
                              >
                                <span className="material-symbols-outlined fs-18">
                                  {item.isActive ? 'block' : 'check_circle'}
                                </span>
                              </button>

                              <button
                                type="button"
                                className={item.isFeatured ? 'cb-action text-secondary' : 'cb-action text-info'}
                                onClick={() =>
                                  dispatch(
                                    toggleCategoryStatus({
                                      slug: item.slug,
                                      payload: { isFeatured: !item.isFeatured },
                                    })
                                  ).then(refreshAll)
                                }
                                title="Featured / normal"
                              >
                                <span className="material-symbols-outlined fs-18">
                                  star
                                </span>
                              </button>

                              <button
                                type="button"
                                className="cb-action text-danger"
                                onClick={() => handleDeleteCategory(item.slug)}
                                title="Delete"
                              >
                                <span className="material-symbols-outlined fs-18">
                                  delete
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center text-muted py-5">
                          No categories found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>

          <Card className="border-0 rounded-4 bg-white">
            <Card.Body className="p-0">
              <div className="p-4 border-bottom">
                <h5 className="mb-1">Brands</h5>
                <p className="text-muted mb-0">Manage product brands.</p>
              </div>

              <div className="table-responsive">
                <Table className="align-middle mb-0 cb-table">
                  <thead>
                    <tr>
                      <th>Brand</th>
                      <th>Slug</th>
                      <th>Products</th>
                      <th>Status</th>
                      <th>Featured</th>
                      <th>Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {brandState.loading && brands.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-5">
                          <Spinner animation="border" />
                        </td>
                      </tr>
                    ) : brands.length > 0 ? (
                      brands.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <strong>{item.name}</strong>
                            {item.website && (
                              <small className="d-block text-muted">
                                {item.website}
                              </small>
                            )}
                          </td>

                          <td>{item.slug}</td>
                          <td>{item.productCount || 0}</td>

                          <td>
                            <Badge bg={item.isActive ? 'success' : 'danger'} className="p-2">
                              {item.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </td>

                          <td>
                            <Badge bg={item.isFeatured ? 'success' : 'warning'} className="p-2">
                              {item.isFeatured ? 'Featured' : 'Normal'}
                            </Badge>
                          </td>

                          <td>{formatDate(item.createdAt)}</td>

                          <td>
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                className="cb-action text-primary"
                                onClick={() => startEditBrand(item)}
                                title="Edit"
                              >
                                <span className="material-symbols-outlined fs-18">
                                  edit
                                </span>
                              </button>

                              <button
                                type="button"
                                className={item.isActive ? 'cb-action text-warning' : 'cb-action text-success'}
                                onClick={() =>
                                  dispatch(
                                    toggleBrandStatus({
                                      slug: item.slug,
                                      payload: { isActive: !item.isActive },
                                    })
                                  ).then(refreshAll)
                                }
                                title="Active / inactive"
                              >
                                <span className="material-symbols-outlined fs-18">
                                  {item.isActive ? 'block' : 'check_circle'}
                                </span>
                              </button>

                              <button
                                type="button"
                                className={item.isFeatured ? 'cb-action text-secondary' : 'cb-action text-info'}
                                onClick={() =>
                                  dispatch(
                                    toggleBrandStatus({
                                      slug: item.slug,
                                      payload: { isFeatured: !item.isFeatured },
                                    })
                                  ).then(refreshAll)
                                }
                                title="Featured / normal"
                              >
                                <span className="material-symbols-outlined fs-18">
                                  star
                                </span>
                              </button>

                              <button
                                type="button"
                                className="cb-action text-danger"
                                onClick={() => handleDeleteBrand(item.slug)}
                                title="Delete"
                              >
                                <span className="material-symbols-outlined fs-18">
                                  delete
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center text-muted py-5">
                          No brands found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CategoryBrandManager;