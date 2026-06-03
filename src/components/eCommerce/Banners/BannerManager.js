// 'use client';

// import { useEffect, useMemo, useState } from 'react';
// import {
//   Alert,
//   Badge,
//   Button,
//   Card,
//   Col,
//   Form,
//   Row,
//   Spinner,
//   Table,
// } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   createBanner,
//   deleteBanner,
//   getAdminBanners,
//   toggleBannerStatus,
//   updateBanner,
// } from '@/features/bannerSlice';

// const emptyBanner = {
//   title: '',
//   subtitle: '',
//   label: 'Featured',
//   buttonText: 'Shop Now',
//   image: '',
//   imageFile: null,
//   linkType: 'products',
//   link: '/products',
//   sortOrder: 0,
//   isActive: true,
//   startsAt: '',
//   endsAt: '',
// };

// const toInputDateTime = (value) => {
//   if (!value) return '';

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return '';

//   return date.toISOString().slice(0, 16);
// };

// const BannerManager = () => {
//   const dispatch = useDispatch();

//   const { banners, stats, loading, error } = useSelector(
//     (state) => state.banner
//   );

//   const [form, setForm] = useState(emptyBanner);
//   const [editingId, setEditingId] = useState(null);
//   const [search, setSearch] = useState('');
//   const [status, setStatus] = useState('all');
//   const [preview, setPreview] = useState('');

//   const query = useMemo(
//     () => ({
//       search,
//       status,
//     }),
//     [search, status]
//   );

//   useEffect(() => {
//     dispatch(getAdminBanners(query));
//   }, [dispatch, query]);

//   const refresh = () => {
//     dispatch(getAdminBanners(query));
//   };

//   const handleChange = (event) => {
//     const { name, value, type, checked, files } = event.target;

//     if (type === 'file') {
//       const file = files?.[0] || null;

//       setForm((prev) => ({
//         ...prev,
//         imageFile: file,
//       }));

//       setPreview(file ? URL.createObjectURL(file) : form.image);

//       return;
//     }

//     setForm((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const resetForm = () => {
//     setForm(emptyBanner);
//     setEditingId(null);
//     setPreview('');
//   };

//   const buildFormData = () => {
//     const formData = new FormData();

//     formData.append('title', form.title);
//     formData.append('subtitle', form.subtitle);
//     formData.append('label', form.label);
//     formData.append('buttonText', form.buttonText);
//     formData.append('image', form.image);
//     formData.append('linkType', form.linkType);
//     formData.append('link', form.link);
//     formData.append('sortOrder', form.sortOrder);
//     formData.append('isActive', form.isActive);

//     if (form.startsAt) {
//       formData.append('startsAt', form.startsAt);
//     }

//     if (form.endsAt) {
//       formData.append('endsAt', form.endsAt);
//     }

//     if (form.imageFile) {
//       formData.append('image', form.imageFile);
//     }

//     return formData;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const formData = buildFormData();

//     const action = editingId
//       ? updateBanner({ id: editingId, data: formData })
//       : createBanner(formData);

//     dispatch(action).then((res) => {
//       if (!res.error) {
//         resetForm();
//         refresh();
//       }
//     });
//   };

//   const startEdit = (item) => {
//     setEditingId(item._id);

//     setForm({
//       title: item.title || '',
//       subtitle: item.subtitle || '',
//       label: item.label || 'Featured',
//       buttonText: item.buttonText || 'Shop Now',
//       image: item.image || '',
//       imageFile: null,
//       linkType: item.linkType || 'products',
//       link: item.link || '/products',
//       sortOrder: item.sortOrder || 0,
//       isActive: item.isActive !== false,
//       startsAt: toInputDateTime(item.startsAt),
//       endsAt: toInputDateTime(item.endsAt),
//     });

//     setPreview(item.image || '');

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleDelete = (id) => {
//     const confirmed = window.confirm('Delete this banner permanently?');

//     if (!confirmed) return;

//     dispatch(deleteBanner(id)).then(refresh);
//   };

//   const formatDate = (value) => {
//     if (!value) return 'No limit';

//     return new Intl.DateTimeFormat('en-GB', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       timeZone: 'Asia/Dhaka',
//     }).format(new Date(value));
//   };

//   return (
//     <>
//       <Row className="g-4 mb-4">
//         <Col sm={6} lg={4}>
//           <Card className="border-0 shadow-sm">
//             <Card.Body>
//               <span className="text-muted">Total Banners</span>
//               <h3 className="mb-0 mt-2">{stats?.total || banners.length}</h3>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col sm={6} lg={4}>
//           <Card className="border-0 shadow-sm">
//             <Card.Body>
//               <span className="text-muted">Active Banners</span>
//               <h3 className="mb-0 mt-2">
//                 {stats?.active ||
//                   banners.filter((item) => item.isActive).length ||
//                   0}
//               </h3>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col sm={6} lg={4}>
//           <Card className="border-0 shadow-sm">
//             <Card.Body>
//               <span className="text-muted">Inactive Banners</span>
//               <h3 className="mb-0 mt-2">
//                 {stats?.inactive ||
//                   banners.filter((item) => !item.isActive).length ||
//                   0}
//               </h3>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <Row className="g-4">
//         <Col lg={4}>
//           <Card className="border-0 shadow-sm">
//             <Card.Body>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <div>
//                   <h5 className="mb-1">
//                     {editingId ? 'Edit Banner' : 'Create Banner'}
//                   </h5>
//                   <p className="text-muted mb-0">
//                     Manage homepage promotional banners.
//                   </p>
//                 </div>

//                 {editingId && (
//                   <Button variant="light" size="sm" onClick={resetForm}>
//                     Cancel
//                   </Button>
//                 )}
//               </div>

//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Title</Form.Label>
//                   <Form.Control
//                     name="title"
//                     value={form.title}
//                     onChange={handleChange}
//                     placeholder="Save up to 10%"
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Subtitle</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={2}
//                     name="subtitle"
//                     value={form.subtitle}
//                     onChange={handleChange}
//                     placeholder="Premium accessories for your daily tech setup."
//                   />
//                 </Form.Group>

//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Label</Form.Label>
//                       <Form.Control
//                         name="label"
//                         value={form.label}
//                         onChange={handleChange}
//                         placeholder="Limited Offer"
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Button Text</Form.Label>
//                       <Form.Control
//                         name="buttonText"
//                         value={form.buttonText}
//                         onChange={handleChange}
//                         placeholder="Shop Now"
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Upload Image</Form.Label>
//                   <Form.Control
//                     type="file"
//                     name="imageFile"
//                     accept="image/*"
//                     onChange={handleChange}
//                   />
//                   <Form.Text>
//                     Recommended size: 900×600 or similar wide product banner.
//                   </Form.Text>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Or Image URL</Form.Label>
//                   <Form.Control
//                     name="image"
//                     value={form.image}
//                     onChange={handleChange}
//                     placeholder="https://..."
//                   />
//                 </Form.Group>

//                 {(preview || form.image) && (
//                   <div className="mb-3 rounded-3 overflow-hidden border">
//                     <img
//                       src={preview || form.image}
//                       alt="Banner preview"
//                       style={{
//                         width: '100%',
//                         height: 150,
//                         objectFit: 'cover',
//                       }}
//                     />
//                   </div>
//                 )}

//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Link Type</Form.Label>
//                       <Form.Select
//                         name="linkType"
//                         value={form.linkType}
//                         onChange={handleChange}
//                       >
//                         <option value="products">Products</option>
//                         <option value="category">Category</option>
//                         <option value="brand">Brand</option>
//                         <option value="product">Product</option>
//                         <option value="custom">Custom</option>
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>

//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Sort Order</Form.Label>
//                       <Form.Control
//                         type="number"
//                         name="sortOrder"
//                         value={form.sortOrder}
//                         onChange={handleChange}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Link</Form.Label>
//                   <Form.Control
//                     name="link"
//                     value={form.link}
//                     onChange={handleChange}
//                     placeholder="/products"
//                   />
//                   <Form.Text>
//                     Example: /products, /category/mobile, /brand/apple
//                   </Form.Text>
//                 </Form.Group>

//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Start Date</Form.Label>
//                       <Form.Control
//                         type="datetime-local"
//                         name="startsAt"
//                         value={form.startsAt}
//                         onChange={handleChange}
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>End Date</Form.Label>
//                       <Form.Control
//                         type="datetime-local"
//                         name="endsAt"
//                         value={form.endsAt}
//                         onChange={handleChange}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Form.Check
//                   className="mb-4"
//                   type="switch"
//                   id="banner-is-active"
//                   label="Active banner"
//                   name="isActive"
//                   checked={form.isActive}
//                   onChange={handleChange}
//                 />

//                 <Button type="submit" className="w-100" disabled={loading}>
//                   {loading ? (
//                     <>
//                       <Spinner size="sm" className="me-2" />
//                       Saving...
//                     </>
//                   ) : editingId ? (
//                     'Update Banner'
//                   ) : (
//                     'Create Banner'
//                   )}
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col lg={8}>
//           <Card className="border-0 shadow-sm">
//             <Card.Body>
//               <div className="d-flex flex-column flex-md-row gap-3 justify-content-between mb-4">
//                 <div>
//                   <h5 className="mb-1">Banners</h5>
//                   <p className="text-muted mb-0">
//                     Control active banners shown on user homepage.
//                   </p>
//                 </div>

//                 <Button variant="outline-primary" onClick={refresh}>
//                   Refresh
//                 </Button>
//               </div>

//               <Row className="g-3 mb-4">
//                 <Col md={8}>
//                   <Form.Control
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     placeholder="Search banner..."
//                   />
//                 </Col>

//                 <Col md={4}>
//                   <Form.Select
//                     value={status}
//                     onChange={(e) => setStatus(e.target.value)}
//                   >
//                     <option value="all">All Status</option>
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </Form.Select>
//                 </Col>
//               </Row>

//               {error && <Alert variant="danger">{error}</Alert>}

//               {loading && banners.length === 0 ? (
//                 <div className="text-center py-5">
//                   <Spinner />
//                 </div>
//               ) : banners.length > 0 ? (
//                 <div className="table-responsive">
//                   <Table className="align-middle">
//                     <thead>
//                       <tr>
//                         <th>Banner</th>
//                         <th>Link</th>
//                         <th>Status</th>
//                         <th>Schedule</th>
//                         <th>Sort</th>
//                         <th className="text-end">Action</th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {banners.map((item) => (
//                         <tr key={item._id}>
//                           <td>
//                             <div className="d-flex align-items-center gap-3">
//                               <img
//                                 src={item.image}
//                                 alt={item.title}
//                                 style={{
//                                   width: 86,
//                                   height: 54,
//                                   objectFit: 'cover',
//                                   borderRadius: 12,
//                                 }}
//                               />

//                               <div>
//                                 <strong>{item.title}</strong>
//                                 <p className="text-muted mb-0">
//                                   {item.label}
//                                 </p>
//                               </div>
//                             </div>
//                           </td>

//                           <td>
//                             <span className="d-block">{item.linkType}</span>
//                             <small className="text-muted">{item.link}</small>
//                           </td>

//                           <td>
//                             <Badge bg={item.isActive ? 'success' : 'secondary'}>
//                               {item.isActive ? 'Active' : 'Inactive'}
//                             </Badge>
//                           </td>

//                           <td>
//                             <small className="d-block">
//                               Start: {formatDate(item.startsAt)}
//                             </small>
//                             <small className="d-block">
//                               End: {formatDate(item.endsAt)}
//                             </small>
//                           </td>

//                           <td>{item.sortOrder}</td>

//                           <td className="text-end">
//                             <Button
//                               size="sm"
//                               variant="light"
//                               className="me-2"
//                               onClick={() => startEdit(item)}
//                               title="Edit"
//                             >
//                               edit
//                             </Button>

//                             <Button
//                               size="sm"
//                               variant={item.isActive ? 'warning' : 'success'}
//                               className="me-2"
//                               onClick={() =>
//                                 dispatch(
//                                   toggleBannerStatus({
//                                     id: item._id,
//                                     payload: { isActive: !item.isActive },
//                                   })
//                                 ).then(refresh)
//                               }
//                               title="Active / inactive"
//                             >
//                               {item.isActive ? 'block' : 'check'}
//                             </Button>

//                             <Button
//                               size="sm"
//                               variant="danger"
//                               onClick={() => handleDelete(item._id)}
//                               title="Delete"
//                             >
//                               delete
//                             </Button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </div>
//               ) : (
//                 <Alert variant="light" className="mb-0">
//                   No banners found.
//                 </Alert>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default BannerManager;
















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
  createBanner,
  deleteBanner,
  getAdminBanners,
  toggleBannerStatus,
  updateBanner,
} from '@/features/bannerSlice';

const emptyBanner = {
  title: '',
  subtitle: '',
  label: 'Featured',
  buttonText: 'Shop Now',
  image: '',
  imageFile: null,
  linkType: 'products',
  link: '/products',
  sortOrder: 0,
  isActive: true,
  startsAt: '',
  endsAt: '',
};

const toInputDateTime = (value) => {
  if (!value) return '';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return '';

  return date.toISOString().slice(0, 16);
};

const BannerManager = () => {
  const dispatch = useDispatch();

  const { banners, stats, loading, error } = useSelector(
    (state) => state.banner
  );

  const [form, setForm] = useState(emptyBanner);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [preview, setPreview] = useState('');

  const query = useMemo(
    () => ({
      search,
      status,
    }),
    [search, status]
  );

  const totalBanners = stats?.total ?? banners.length;
  const activeBanners =
    stats?.active ?? banners.filter((item) => item.isActive).length;
  const inactiveBanners =
    stats?.inactive ?? banners.filter((item) => !item.isActive).length;

  useEffect(() => {
    dispatch(getAdminBanners(query));
  }, [dispatch, query]);

  const refresh = () => {
    dispatch(getAdminBanners(query));
  };

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    if (type === 'file') {
      const file = files?.[0] || null;

      setForm((prev) => ({
        ...prev,
        imageFile: file,
      }));

      setPreview(file ? URL.createObjectURL(file) : form.image);

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(emptyBanner);
    setEditingId(null);
    setPreview('');
  };

  const buildFormData = () => {
    const formData = new FormData();

    formData.append('title', form.title);
    formData.append('subtitle', form.subtitle);
    formData.append('label', form.label);
    formData.append('buttonText', form.buttonText);
    formData.append('linkType', form.linkType);
    formData.append('link', form.link);
    formData.append('sortOrder', form.sortOrder);
    formData.append('isActive', form.isActive);

    if (form.image) {
      formData.append('image', form.image);
    }

    if (form.startsAt) {
      formData.append('startsAt', form.startsAt);
    }

    if (form.endsAt) {
      formData.append('endsAt', form.endsAt);
    }

    if (form.imageFile) {
      formData.append('image', form.imageFile);
    }

    return formData;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = buildFormData();

    const action = editingId
      ? updateBanner({ id: editingId, data: formData })
      : createBanner(formData);

    dispatch(action).then((res) => {
      if (!res.error) {
        resetForm();
        refresh();
      }
    });
  };

  const startEdit = (item) => {
    setEditingId(item._id);

    setForm({
      title: item.title || '',
      subtitle: item.subtitle || '',
      label: item.label || 'Featured',
      buttonText: item.buttonText || 'Shop Now',
      image: item.image || '',
      imageFile: null,
      linkType: item.linkType || 'products',
      link: item.link || '/products',
      sortOrder: item.sortOrder || 0,
      isActive: item.isActive !== false,
      startsAt: toInputDateTime(item.startsAt),
      endsAt: toInputDateTime(item.endsAt),
    });

    setPreview(item.image || '');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm('Delete this banner permanently?');

    if (!confirmed) return;

    dispatch(deleteBanner(id)).then(refresh);
  };

  const handleToggleStatus = (item) => {
    dispatch(
      toggleBannerStatus({
        id: item._id,
        payload: { isActive: !item.isActive },
      })
    ).then(refresh);
  };

  const formatDate = (value) => {
    if (!value) return 'No limit';

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'Asia/Dhaka',
    }).format(new Date(value));
  };

  const tableImageStyle = {
    width: 86,
    minWidth: 86,
    height: 54,
    objectFit: 'cover',
    borderRadius: 12,
  };

  const mobileImageStyle = {
    width: '100%',
    height: 160,
    objectFit: 'cover',
    borderRadius: 14,
  };

  const renderActionButtons = (item, isMobile = false) => (
    <div
      className={
        isMobile
          ? 'd-grid gap-2'
          : 'd-flex justify-content-end align-items-center flex-wrap gap-2'
      }
    >
      <Button
        size="sm"
        variant="light"
        onClick={() => startEdit(item)}
        title="Edit"
      >
        Edit
      </Button>

      <Button
        size="sm"
        variant={item.isActive ? 'warning' : 'success'}
        onClick={() => handleToggleStatus(item)}
        title="Active / inactive"
      >
        {item.isActive ? 'Inactive' : 'Active'}
      </Button>

      <Button
        size="sm"
        variant="danger"
        onClick={() => handleDelete(item._id)}
        title="Delete"
      >
        Delete
      </Button>
    </div>
  );

  return (
    <>
      <Row className="g-3 g-md-4 mb-4">
        <Col xs={12} sm={6} lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <span className="text-muted">Total Banners</span>
              <h3 className="mb-0 mt-2">{totalBanners}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <span className="text-muted">Active Banners</span>
              <h3 className="mb-0 mt-2">{activeBanners}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <span className="text-muted">Inactive Banners</span>
              <h3 className="mb-0 mt-2">{inactiveBanners}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3 g-md-4">
        <Col xs={12} lg={5} xl={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-3 p-md-4">
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-3">
                <div>
                  <h5 className="mb-1">
                    {editingId ? 'Edit Banner' : 'Create Banner'}
                  </h5>
                  <p className="text-muted mb-0">
                    Manage homepage promotional banners.
                  </p>
                </div>

                {editingId && (
                  <Button variant="light" size="sm" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Save up to 10%"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Subtitle</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="subtitle"
                    value={form.subtitle}
                    onChange={handleChange}
                    placeholder="Premium accessories for your daily tech setup."
                  />
                </Form.Group>

                <Row className="g-3">
                  <Col xs={12} md={6} lg={12} xl={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Label</Form.Label>
                      <Form.Control
                        name="label"
                        value={form.label}
                        onChange={handleChange}
                        placeholder="Limited Offer"
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6} lg={12} xl={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Button Text</Form.Label>
                      <Form.Control
                        name="buttonText"
                        value={form.buttonText}
                        onChange={handleChange}
                        placeholder="Shop Now"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="imageFile"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  <Form.Text>
                    Recommended size: 900×600 or similar wide product banner.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Or Image URL</Form.Label>
                  <Form.Control
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </Form.Group>

                {(preview || form.image) && (
                  <div className="mb-3 rounded-3 overflow-hidden border">
                    <img
                      src={preview || form.image}
                      alt="Banner preview"
                      style={{
                        width: '100%',
                        height: 160,
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                )}

                <Row className="g-3">
                  <Col xs={12} md={6} lg={12} xl={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Link Type</Form.Label>
                      <Form.Select
                        name="linkType"
                        value={form.linkType}
                        onChange={handleChange}
                      >
                        <option value="products">Products</option>
                        <option value="category">Category</option>
                        <option value="brand">Brand</option>
                        <option value="product">Product</option>
                        <option value="custom">Custom</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6} lg={12} xl={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Sort Order</Form.Label>
                      <Form.Control
                        type="number"
                        name="sortOrder"
                        value={form.sortOrder}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    name="link"
                    value={form.link}
                    onChange={handleChange}
                    placeholder="/products"
                  />
                  <Form.Text>
                    Example: /products, /category/mobile, /brand/apple
                  </Form.Text>
                </Form.Group>

                <Row className="g-3">
                  <Col xs={12} md={6} lg={12} xl={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="startsAt"
                        value={form.startsAt}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6} lg={12} xl={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="endsAt"
                        value={form.endsAt}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Check
                  className="mb-4"
                  type="switch"
                  id="banner-is-active"
                  label="Active banner"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                />

                <Button type="submit" className="w-100" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner size="sm" className="me-2" />
                      Saving...
                    </>
                  ) : editingId ? (
                    'Update Banner'
                  ) : (
                    'Create Banner'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={7} xl={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-3 p-md-4">
              <div className="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-start align-items-md-center mb-4">
                <div>
                  <h5 className="mb-1">Banners</h5>
                  <p className="text-muted mb-0">
                    Control active banners shown on user homepage.
                  </p>
                </div>

                <Button variant="outline-primary" onClick={refresh}>
                  Refresh
                </Button>
              </div>

              <Row className="g-3 mb-4">
                <Col xs={12} md={8}>
                  <Form.Control
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search banner..."
                  />
                </Col>

                <Col xs={12} md={4}>
                  <Form.Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Form.Select>
                </Col>
              </Row>

              {error && <Alert variant="danger">{error}</Alert>}

              {loading && banners.length === 0 ? (
                <div className="text-center py-5">
                  <Spinner />
                </div>
              ) : banners.length > 0 ? (
                <>
                  <div className="table-responsive d-none d-lg-block">
                    <Table className="align-middle mb-0">
                      <thead>
                        <tr>
                          <th>Banner</th>
                          <th>Link</th>
                          <th>Status</th>
                          <th>Schedule</th>
                          <th>Sort</th>
                          <th className="text-end">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {banners.map((item) => (
                          <tr key={item._id}>
                            <td>
                              <div className="d-flex align-items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  style={tableImageStyle}
                                />

                                <div className="text-break">
                                  <strong>{item.title}</strong>
                                  <p className="text-muted mb-0">
                                    {item.label}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="text-break">
                              <span className="d-block">{item.linkType}</span>
                              <small className="text-muted">{item.link}</small>
                            </td>

                            <td>
                              <Badge
                                bg={item.isActive ? 'success' : 'secondary'}
                              >
                                {item.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </td>

                            <td>
                              <small className="d-block">
                                Start: {formatDate(item.startsAt)}
                              </small>
                              <small className="d-block">
                                End: {formatDate(item.endsAt)}
                              </small>
                            </td>

                            <td>{item.sortOrder}</td>

                            <td className="text-end">
                              {renderActionButtons(item)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>

                  <Row className="g-3 d-lg-none">
                    {banners.map((item) => (
                      <Col xs={12} key={item._id}>
                        <Card className="border shadow-sm">
                          <Card.Body>
                            <img
                              src={item.image}
                              alt={item.title}
                              style={mobileImageStyle}
                              className="mb-3"
                            />

                            <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                              <div className="text-break">
                                <h6 className="mb-1">{item.title}</h6>
                                <p className="text-muted mb-0">{item.label}</p>
                              </div>

                              <Badge
                                bg={item.isActive ? 'success' : 'secondary'}
                              >
                                {item.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>

                            <div className="border-top pt-3 mt-3">
                              <div className="mb-2">
                                <small className="text-muted d-block">
                                  Link Type
                                </small>
                                <span>{item.linkType}</span>
                              </div>

                              <div className="mb-2 text-break">
                                <small className="text-muted d-block">
                                  Link
                                </small>
                                <span>{item.link}</span>
                              </div>

                              <div className="mb-2">
                                <small className="text-muted d-block">
                                  Schedule
                                </small>
                                <span className="d-block">
                                  Start: {formatDate(item.startsAt)}
                                </span>
                                <span className="d-block">
                                  End: {formatDate(item.endsAt)}
                                </span>
                              </div>

                              <div className="mb-3">
                                <small className="text-muted d-block">
                                  Sort Order
                                </small>
                                <span>{item.sortOrder}</span>
                              </div>

                              {renderActionButtons(item, true)}
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </>
              ) : (
                <Alert variant="light" className="mb-0">
                  No banners found.
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default BannerManager;