// // 'use client';
// // import { useState, useEffect } from 'react';
// // import { Row, Col, Card, Form } from 'react-bootstrap';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { getProduct, updateProduct } from '@/features/productSlice';
// // import { getAllCategories } from '@/features/categorySlice';
// // import { getAllBrands } from '@/features/brandSlice';

// // const EditProduct = ({ slug }) => {
// //   const { Brands } = useSelector((state) => state.brand);
// //   const { categories } = useSelector((state) => state.category);
// //   const { product } = useSelector((state) => state.product);
// //   const dispatch = useDispatch();
// //   const [form, setForm] = useState({
// //     name: '',
// //     sku: '',
// //     oldPrice: '',
// //     price: '',
// //     countInStock: '',
// //     description: '',
// //     category: '',
// //     brand: '',
// //     isFeatured: '',
// //     flash_sell: '',
// //     variants: [],
// //     details: []
// //   });

// //   const [selectedImages, setSelectedImages] = useState([]);
// //   const [previewImages, setPreviewImages] = useState([]);

// //   // Load Product
// //   useEffect(() => {
// //     dispatch(getAllCategories());
// //     dispatch(getAllBrands());
// //     if (slug) {
// //       dispatch(getProduct(slug));
// //     }
// //   }, [dispatch, slug]);

// //   // Set product to form when data arrives
// //   useEffect(() => {
// //     if (product) {
// //       setForm({
// //         name: product.name || '',
// //         sku: product.sku || '',
// //         oldPrice: product.oldPrice || '',
// //         price: product.price || '',
// //         countInStock: product.countInStock || '',
// //         description: product.description || '',
// //         category: product.category?._id || '',
// //         brand: product.brand?._id || '',
// //         isFeatured: product.isFeatured || '',
// //         flash_sell: product.flash_sell || '',
// //         variants: product.variants || [],
// //         details: product.details || []
// //       });
// //       // Set preview from existing image URLs (optional)
// //       if (product.images) {
// //         setPreviewImages(product.images);
// //       }
// //     }
// //   }, [product]);

// //   // Handle form input
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setForm((prev) => ({ ...prev, [name]: value }));
// //   };
// //   // ====================================
// //   // dynamic form for details
// //   const handleDetailChange = (index, field, value) => {
// //     const updatedDetails = [...form.details];
// //     if (!updatedDetails[index]) updatedDetails[index] = { key: '', value: '' };
// //     updatedDetails[index][field] = value;
// //     setForm({ ...form, details: updatedDetails });
// //   };

// //   const addDetailField = () => {
// //     setForm({ ...form, details: [...form.details, { key: '', value: '' }] });
// //   };

// //   const removeDetailField = (index) => {
// //     const updatedDetails = form.details.filter((_, i) => i !== index);
// //     setForm({ ...form, details: updatedDetails });
// //   };
// //   // ====================================

// //   // Handle image select
// //   const handleImageChange = (e) => {
// //     const files = Array.from(e.target.files);
// //     setSelectedImages((prev) => [...prev, ...files]);

// //     const previews = files.map((file) => URL.createObjectURL(file));
// //     setPreviewImages((prev) => [...prev, ...previews]);
// //   };

// //   const handleRemoveImage = (index) => {
// //     setPreviewImages((prev) => prev.filter((_, i) => i !== index));
// //     setSelectedImages((prev) => prev.filter((_, i) => i !== index));
// //   };

// //   // Handle submit
// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     const formData = new FormData();
// //     formData.append('name', form.name);
// //     formData.append('sku', form.sku);
// //     formData.append('oldPrice', form.oldPrice);
// //     formData.append('price', form.price);
// //     formData.append('countInStock', form.countInStock);
// //     formData.append('description', form.description);
// //     formData.append('category', form.category);
// //     formData.append('brand', form.brand);
// //     formData.append('isFeatured', form.isFeatured);
// //     formData.append('flash_sell', form.flash_sell);

// //     // details (key-value) details
// //     form.details.forEach((item, index) => {
// //       formData.append(`details[${index}][key]`, item.key);
// //       formData.append(`details[${index}][value]`, item.value);
// //     });

// //     selectedImages.forEach((file) => {
// //       formData.append('images', file);
// //     });
// //     // console.log('update', slug, ...formData.entries());
// //     dispatch(updateProduct({ slug, data: formData }));
// //   };
// //   return (
// //     <>
// //       <Form onSubmit={handleSubmit}>
// //         <Row>
// //           <Col lg={7} xxl={8}>
// //             <Card className="bg-white border-0 rounded-3 mb-4">
// //               <Card.Body className="p-4">
// //                 <h3 className="mb-3 mb-lg-4">Edit Product</h3>

// //                 <Row>
// //                   <Col sm={6} lg={6}>
// //                     <Form.Group className="mb-4">
// //                       <Form.Label className="label text-secondary">Product Title</Form.Label>
// //                       <Form.Control
// //                         type="text"
// //                         className="h-55"
// //                         placeholder="Enter product title"
// //                         name="name"
// //                         value={form.name || ''}
// //                         onChange={handleChange}
// //                       />
// //                     </Form.Group>
// //                   </Col>

// //                   <Col sm={6} lg={6}>
// //                     <Form.Group className="mb-4">
// //                       <Form.Label className="label text-secondary">SKU</Form.Label>
// //                       <Form.Control
// //                         type="text"
// //                         className="h-55"
// //                         placeholder="Enter SKU"
// //                         name="sku"
// //                         value={form.sku || ''}
// //                         disabled
// //                       />
// //                     </Form.Group>
// //                   </Col>
// //                   <Col sm={12} lg={12}>
// //                     <Form.Group className="mb-4">
// //                       <Form.Label className="label text-secondary fs-14">Product Description</Form.Label>

// //                       <Form.Control
// //                         as="textarea"
// //                         rows={6}
// //                         placeholder="Type description here..."
// //                         name="description"
// //                         value={form.description}
// //                         onChange={handleChange}
// //                       />
// //                     </Form.Group>
// //                   </Col>

// //                   <Col sm={6} lg={6}>
// //                     <Form.Group className="mb-4">
// //                       <Form.Label className="label text-secondary">Regular Price</Form.Label>
// //                       <Form.Control
// //                         type="text"
// //                         className="h-55"
// //                         placeholder="Enter regular price"
// //                         name="oldPrice"
// //                         value={form.oldPrice}
// //                         onChange={handleChange}
// //                       />
// //                     </Form.Group>
// //                   </Col>

// //                   <Col sm={6} lg={6}>
// //                     <Form.Group className="mb-4">
// //                       <Form.Label className="label text-secondary">Sale Price</Form.Label>
// //                       <Form.Control
// //                         type="text"
// //                         className="h-55"
// //                         placeholder="Enter sale price"
// //                         name="price"
// //                         value={form.price}
// //                         onChange={handleChange}
// //                       />
// //                     </Form.Group>
// //                   </Col>

// //                   <Col sm={6} lg={6}>
// //                     <Form.Group className="mb-4">
// //                       <Form.Label className="label text-secondary">Product in Stock</Form.Label>
// //                       <Form.Control
// //                         type="text"
// //                         className="h-55"
// //                         placeholder="Enter product in stock"
// //                         name="countInStock"
// //                         value={form.countInStock}
// //                         onChange={handleChange}
// //                       />
// //                     </Form.Group>
// //                   </Col>

// //                   <Col sm={12} lg={6}>
// //                     <Form.Group className="mb-4">
// //                       <Form.Label className="label text-secondary">Discount / Offer</Form.Label>
// //                       <Form.Control
// //                         type="text"
// //                         className="h-55"
// //                         placeholder="Enter discount / Offer"
// //                         defaultValue={product?.discount}
// //                         disabled
// //                       />
// //                     </Form.Group>
// //                   </Col>

// //                   {/* <Col sm={6} lg={6}>
// //                     <Form.Group className="mb-4">
// //                       <Form.Label className="label text-secondary">Available Date</Form.Label>
// //                       <Form.Control type="date" className="h-55" />
// //                     </Form.Group>
// //                   </Col>

// //                   <Col sm={6} lg={6}>
// //                     <Form.Group className="mb-4">
// //                       <Form.Label className="label text-secondary">End Date</Form.Label>
// //                       <Form.Control type="date" className="h-55" />
// //                     </Form.Group>
// //                   </Col> */}

// //                   <Col sm={12} lg={12}>
// //                     <Form.Group className="mb-4">
// //                       <Form.Label className="label text-secondary">Upload Product Images</Form.Label>
// //                       <div className="form-control h-100 text-center position-relative p-4 p-lg-5">
// //                         <div className="product-upload">
// //                           <Form.Label htmlFor="file-upload" className="file-upload mb-0">
// //                             <i className="ri-folder-image-line bg-primary bg-opacity-10 p-2 rounded-1 text-primary"></i>
// //                             <span className="d-block text-body fs-14">
// //                               Drag and drop an image or{' '}
// //                               <span className="text-primary text-decoration-underline">Browse</span>
// //                             </span>
// //                           </Form.Label>
// //                           <input type="file" id="file-upload" multiple accept="image/*" onChange={handleImageChange} />
// //                         </div>
// //                         {/* Preview */}
// //                         {previewImages.length > 0 && (
// //                           <div className="mt-3 d-flex flex-wrap justify-content-center gap-2">
// //                             {previewImages.map((img, idx) => (
// //                               <div key={idx} className="position-relative" style={{ width: '80px', height: '80px' }}>
// //                                 <img
// //                                   src={img}
// //                                   alt={`Preview ${idx + 1}`}
// //                                   className="img-thumbnail rounded"
// //                                   style={{ width: '100%', height: '100%', objectFit: 'cover' }}
// //                                 />
// //                                 <span
// //                                   onClick={() => handleRemoveImage(idx)}
// //                                   style={{
// //                                     position: 'absolute',
// //                                     top: '-6px',
// //                                     right: '-6px',
// //                                     background: 'white',
// //                                     color: 'red',
// //                                     borderRadius: '50%',
// //                                     fontWeight: 'bold',
// //                                     padding: '0 6px',
// //                                     fontSize: '16px',
// //                                     cursor: 'pointer',
// //                                     zIndex: 2,
// //                                     lineHeight: 1
// //                                   }}
// //                                 >
// //                                   x
// //                                 </span>
// //                               </div>
// //                             ))}
// //                           </div>
// //                         )}
// //                       </div>
// //                     </Form.Group>

// //                     <Form.Group className="mb-4">
// //                       <Form.Label className="label text-secondary">Specifications / Details</Form.Label>

// //                       {form?.details?.length > 0 &&
// //                         form?.details.map((item, index) => (
// //                           <div key={index} className="d-flex gap-2 mb-2 align-items-center">
// //                             <Form.Control
// //                               type="text"
// //                               placeholder="Key (e.g., Model)"
// //                               value={item.key}
// //                               onChange={(e) => handleDetailChange(index, 'key', e.target.value)}
// //                             />
// //                             <Form.Control
// //                               type="text"
// //                               placeholder="Value (e.g., GS-18XCOA1V)"
// //                               value={item.value}
// //                               onChange={(e) => handleDetailChange(index, 'value', e.target.value)}
// //                             />
// //                             <button
// //                               type="button"
// //                               className="btn btn-sm btn-danger"
// //                               onClick={() => removeDetailField(index)}
// //                             >
// //                               ×
// //                             </button>
// //                           </div>
// //                         ))}
// //                       {form.details?.length === 0 && <p className="text-muted">No specifications added yet.</p>}

// //                       <button type="button" className="btn btn-outline-primary btn-sm mt-2" onClick={addDetailField}>
// //                         + Add Specification
// //                       </button>
// //                     </Form.Group>
// //                   </Col>
// //                 </Row>
// //               </Card.Body>
// //             </Card>
// //           </Col>

// //           <Col lg={5} xxl={4}>
// //             <Card className="bg-white border-0 rounded-3 mb-4">
// //               <Card.Body className="p-4">
// //                 <h3 className="mb-3 mb-lg-4">Product Category & Brand</h3>

// //                 <Row>
// //                   <Col sm={6} lg={12}>
// //                     <Form.Group className="mb-4">
// //                       <Form.Label className="label text-secondary">Category</Form.Label>

// //                       <Form.Select
// //                         name="category"
// //                         onChange={handleChange}
// //                         className="form-control h-55"
// //                         aria-label="Default select example"
// //                       >
// //                         <option>{product?.category?.name}</option>
// //                         {categories?.map((item, idx) => (
// //                           <option key={idx} value={item?._id}>
// //                             {item?.name}
// //                           </option>
// //                         ))}
// //                       </Form.Select>
// //                     </Form.Group>
// //                   </Col>

// //                   <Col sm={6} lg={12}>
// //                     <Form.Group className="mb-4">
// //                       <Form.Label className="label text-secondary">Brand</Form.Label>
// //                       <Form.Select
// //                         className="form-control h-55"
// //                         name="brand"
// //                         onChange={handleChange}
// //                         aria-label="Default select example"
// //                       >
// //                         <option>{product?.brand?.name}</option>
// //                         {Brands?.map((item, idx) => (
// //                           <option key={idx} value={item?._id}>
// //                             {item?.name}
// //                           </option>
// //                         ))}
// //                       </Form.Select>
// //                     </Form.Group>
// //                   </Col>

// //                   {/* <Col sm={6} lg={12}>
// //                     <Form.Group className="mb-4">
// //                       <Form.Label className="label text-secondary">Collection</Form.Label>
// //                       <Form.Select className="form-control h-55" aria-label="Default select example">
// //                         <option defaultValue="0">Select</option>
// //                         <option defaultValue="1">Collection 1</option>
// //                         <option defaultValue="2">Collection 2</option>
// //                         <option defaultValue="3">Collection 3</option>
// //                         <option defaultValue="4">Collection 4</option>
// //                       </Form.Select>
// //                     </Form.Group>
// //                   </Col>

// //                   <Col sm={6} lg={12}>
// //                     <Form.Group className="mb-0">
// //                       <Form.Label className="label text-secondary">Tags</Form.Label>
// //                       <Form.Select className="form-control h-55" aria-label="Default select example">
// //                         <option defaultValue="0">Select</option>
// //                         <option defaultValue="1">watch</option>
// //                         <option defaultValue="2">headphone</option>
// //                         <option defaultValue="3">mobile</option>
// //                         <option defaultValue="4">speaker</option>
// //                       </Form.Select>
// //                     </Form.Group>
// //                   </Col> */}
// //                 </Row>
// //               </Card.Body>
// //             </Card>
// //             <Card className="bg-white border-0 rounded-3 mb-4">
// //               <Card.Body className="p-4">
// //                 <Col sm={6} lg={12}>
// //                   <Form.Group className="mb-4">
// //                     <Form.Label className="label text-secondary">Featured Product</Form.Label>

// //                     <Form.Select
// //                       name="isFeatured"
// //                       onChange={handleChange}
// //                       className="form-control h-55"
// //                       aria-label="Default select example"
// //                     >
// //                       <option>{product?.isFeatured === true ? 'Yes' : 'No'}</option>
// //                       <option value="">-- Select --</option>
// //                       <option value="true">Yes</option>
// //                       <option value="false">No</option>
// //                     </Form.Select>
// //                   </Form.Group>
// //                 </Col>
// //                 <Col sm={6} lg={12}>
// //                   <Form.Group className="mb-4">
// //                     <Form.Label className="label text-secondary">Flash Sell</Form.Label>
// //                     <Form.Select
// //                       className="form-control h-55"
// //                       name="flash_sell"
// //                       onChange={handleChange}
// //                       aria-label="Default select example"
// //                     >
// //                       <option>{product?.flash_sell === true ? 'Yes' : 'No'}</option>
// //                       <option value="">-- Select --</option>
// //                       <option value="true">Yes</option>
// //                       <option value="false">No</option>
// //                     </Form.Select>
// //                   </Form.Group>
// //                 </Col>
// //               </Card.Body>
// //             </Card>{' '}
// //             {/* 
// //             <Card className="bg-white border-0 rounded-3 mb-4">
// //               <Card.Body className="p-4">
// //                 <h3 className="mb-3 mb-lg-4">Other Options</h3>

// //                 <Form.Group className="mb-4">
// //                   <Form.Label className="label text-secondary">Title</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     className="h-55"
// //                     placeholder="Enter title"
// //                     defaultValue="E.g. Google Pixel 7 Pro"
// //                   />
// //                 </Form.Group>

// //                 <Form.Group className="mb-0">
// //                   <Form.Label className="label text-secondary">Description</Form.Label>
// //                   <textarea rows="6" className="form-control" placeholder="Type here...."></textarea>
// //                 </Form.Group>
// //               </Card.Body>
// //             </Card> */}
// //           </Col>
// //         </Row>

// //         <div className="d-flex flex-wrap gap-3 mb-4">
// //           <button className="btn btn-danger py-2 px-4 fw-medium fs-16 text-white">Cancel</button>
// //           <button className="btn btn-primary py-2 px-4 fw-medium fs-16">
// //             {' '}
// //             <i className="ri-add-line text-white fw-medium"></i> Update Product
// //           </button>
// //         </div>
// //       </Form>
// //     </>
// //   );
// // };

// // export default EditProduct;









// 'use client';

// import { useState, useEffect } from 'react';
// import { Row, Col, Card, Form } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProduct, updateProduct } from '@/features/productSlice';
// import { getAllCategories } from '@/features/categorySlice';
// import { getAllBrands } from '@/features/brandSlice';

// const EditProduct = ({ slug }) => {
//   const dispatch = useDispatch();

//   const { Brands } = useSelector((state) => state.brand);
//   const { categories } = useSelector((state) => state.category);
//   const { product, loading } = useSelector((state) => state.product);

//   const [form, setForm] = useState({
//     name: '',
//     sku: '',
//     oldPrice: '',
//     price: '',
//     countInStock: '',
//     description: '',
//     category: '',
//     brand: '',
//     isFeatured: '',
//     flash_sell: '',
//     details: [],
//   });

//   const [selectedImages, setSelectedImages] = useState([]);
//   const [previewImages, setPreviewImages] = useState([]);

//   useEffect(() => {
//     dispatch(getAllCategories());
//     dispatch(getAllBrands());

//     if (slug) {
//       dispatch(getProduct(slug));
//     }
//   }, [dispatch, slug]);

//   useEffect(() => {
//     if (product) {
//       setForm({
//         name: product.name || '',
//         sku: product.sku || '',
//         oldPrice: product.oldPrice ?? '',
//         price: product.price ?? '',
//         countInStock: product.countInStock ?? '',
//         description: product.description || '',
//         category: product.category?._id || '',
//         brand: product.brand?._id || '',
//         isFeatured: product.isFeatured === true ? 'true' : 'false',
//         flash_sell: product.flash_sell === true ? 'true' : 'false',
//         details: product.details || [],
//       });

//       setPreviewImages(product.images || []);
//       setSelectedImages([]);
//     }
//   }, [product]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleDetailChange = (index, field, value) => {
//     const updatedDetails = [...form.details];

//     if (!updatedDetails[index]) {
//       updatedDetails[index] = { key: '', value: '' };
//     }

//     updatedDetails[index][field] = value;

//     setForm((prev) => ({
//       ...prev,
//       details: updatedDetails,
//     }));
//   };

//   const addDetailField = () => {
//     setForm((prev) => ({
//       ...prev,
//       details: [...prev.details, { key: '', value: '' }],
//     }));
//   };

//   const removeDetailField = (index) => {
//     setForm((prev) => ({
//       ...prev,
//       details: prev.details.filter((_, i) => i !== index),
//     }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files || []);

//     setSelectedImages((prev) => [...prev, ...files]);

//     const previews = files.map((file) => URL.createObjectURL(file));
//     setPreviewImages((prev) => [...prev, ...previews]);
//   };

//   const handleRemoveImage = (index) => {
//     setPreviewImages((prev) => prev.filter((_, i) => i !== index));

//     const existingImageCount = product?.images?.length || 0;

//     if (index >= existingImageCount) {
//       const selectedIndex = index - existingImageCount;
//       setSelectedImages((prev) => prev.filter((_, i) => i !== selectedIndex));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     formData.append('name', form.name);
//     formData.append('oldPrice', form.oldPrice);
//     formData.append('price', form.price);
//     formData.append('countInStock', form.countInStock);
//     formData.append('description', form.description);
//     formData.append('category', form.category);
//     formData.append('brand', form.brand);
//     formData.append('isFeatured', form.isFeatured);
//     formData.append('flash_sell', form.flash_sell);

//     form.details.forEach((item, index) => {
//       if (item.key && item.value) {
//         formData.append(`details[${index}][key]`, item.key);
//         formData.append(`details[${index}][value]`, item.value);
//       }
//     });

//     selectedImages.forEach((file) => {
//       formData.append('images', file);
//     });

//     dispatch(updateProduct({ slug, data: formData }));
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Row>
//         <Col lg={7} xxl={8}>
//           <Card className="bg-white border-0 rounded-3 mb-4">
//             <Card.Body className="p-4">
//               <h3 className="mb-3 mb-lg-4">Edit Product</h3>

//               <Row>
//                 <Col sm={6}>
//                   <Form.Group className="mb-4">
//                     <Form.Label className="label text-secondary">Product Title</Form.Label>
//                     <Form.Control
//                       type="text"
//                       className="h-55"
//                       name="name"
//                       value={form.name}
//                       onChange={handleChange}
//                       placeholder="Enter product title"
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col sm={6}>
//                   <Form.Group className="mb-4">
//                     <Form.Label className="label text-secondary">SKU</Form.Label>
//                     <Form.Control
//                       type="text"
//                       className="h-55"
//                       name="sku"
//                       value={form.sku}
//                       disabled
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col sm={12}>
//                   <Form.Group className="mb-4">
//                     <Form.Label className="label text-secondary fs-14">
//                       Product Description
//                     </Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       rows={6}
//                       name="description"
//                       value={form.description}
//                       onChange={handleChange}
//                       placeholder="Type description here..."
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col sm={6}>
//                   <Form.Group className="mb-4">
//                     <Form.Label className="label text-secondary">Regular Price</Form.Label>
//                     <Form.Control
//                       type="number"
//                       className="h-55"
//                       name="oldPrice"
//                       value={form.oldPrice}
//                       onChange={handleChange}
//                       placeholder="Enter regular price"
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col sm={6}>
//                   <Form.Group className="mb-4">
//                     <Form.Label className="label text-secondary">Sale Price</Form.Label>
//                     <Form.Control
//                       type="number"
//                       className="h-55"
//                       name="price"
//                       value={form.price}
//                       onChange={handleChange}
//                       placeholder="Enter sale price"
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col sm={6}>
//                   <Form.Group className="mb-4">
//                     <Form.Label className="label text-secondary">Product in Stock</Form.Label>
//                     <Form.Control
//                       type="number"
//                       className="h-55"
//                       name="countInStock"
//                       value={form.countInStock}
//                       onChange={handleChange}
//                       placeholder="Enter stock"
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col sm={6}>
//                   <Form.Group className="mb-4">
//                     <Form.Label className="label text-secondary">Discount</Form.Label>
//                     <Form.Control
//                       type="text"
//                       className="h-55"
//                       value={product?.discount || 0}
//                       disabled
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col sm={12}>
//                   <Form.Group className="mb-4">
//                     <Form.Label className="label text-secondary">
//                       Upload Product Images
//                     </Form.Label>

//                     <div className="form-control h-100 text-center position-relative p-4 p-lg-5">
//                       <div className="product-upload">
//                         <Form.Label htmlFor="file-upload" className="file-upload mb-0">
//                           <i className="ri-folder-image-line bg-primary bg-opacity-10 p-2 rounded-1 text-primary"></i>
//                           <span className="d-block text-body fs-14">
//                             Drag and drop an image or{' '}
//                             <span className="text-primary text-decoration-underline">
//                               Browse
//                             </span>
//                           </span>
//                         </Form.Label>

//                         <input
//                           type="file"
//                           id="file-upload"
//                           multiple
//                           accept="image/*"
//                           onChange={handleImageChange}
//                         />
//                       </div>

//                       {previewImages.length > 0 && (
//                         <div className="mt-3 d-flex flex-wrap justify-content-center gap-2">
//                           {previewImages.map((img, idx) => (
//                             <div
//                               key={idx}
//                               className="position-relative"
//                               style={{ width: '80px', height: '80px' }}
//                             >
//                               <img
//                                 src={img}
//                                 alt={`Preview ${idx + 1}`}
//                                 className="img-thumbnail rounded"
//                                 style={{
//                                   width: '100%',
//                                   height: '100%',
//                                   objectFit: 'cover',
//                                 }}
//                               />

//                               <span
//                                 onClick={() => handleRemoveImage(idx)}
//                                 style={{
//                                   position: 'absolute',
//                                   top: '-6px',
//                                   right: '-6px',
//                                   background: 'white',
//                                   color: 'red',
//                                   borderRadius: '50%',
//                                   fontWeight: 'bold',
//                                   padding: '0 6px',
//                                   fontSize: '16px',
//                                   cursor: 'pointer',
//                                   zIndex: 2,
//                                   lineHeight: 1,
//                                 }}
//                               >
//                                 ×
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </Form.Group>

//                   <Form.Group className="mb-4">
//                     <Form.Label className="label text-secondary">
//                       Specifications / Details
//                     </Form.Label>

//                     {form.details.length > 0 ? (
//                       form.details.map((item, index) => (
//                         <div key={index} className="d-flex gap-2 mb-2 align-items-center">
//                           <Form.Control
//                             type="text"
//                             placeholder="Key"
//                             value={item.key || ''}
//                             onChange={(e) =>
//                               handleDetailChange(index, 'key', e.target.value)
//                             }
//                           />

//                           <Form.Control
//                             type="text"
//                             placeholder="Value"
//                             value={item.value || ''}
//                             onChange={(e) =>
//                               handleDetailChange(index, 'value', e.target.value)
//                             }
//                           />

//                           <button
//                             type="button"
//                             className="btn btn-sm btn-danger"
//                             onClick={() => removeDetailField(index)}
//                           >
//                             ×
//                           </button>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-muted">No specifications added yet.</p>
//                     )}

//                     <button
//                       type="button"
//                       className="btn btn-outline-primary btn-sm mt-2"
//                       onClick={addDetailField}
//                     >
//                       + Add Specification
//                     </button>
//                   </Form.Group>
//                 </Col>
//               </Row>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col lg={5} xxl={4}>
//           <Card className="bg-white border-0 rounded-3 mb-4">
//             <Card.Body className="p-4">
//               <h3 className="mb-3 mb-lg-4">Product Category & Brand</h3>

//               <Form.Group className="mb-4">
//                 <Form.Label className="label text-secondary">Category</Form.Label>
//                 <Form.Select
//                   name="category"
//                   value={form.category}
//                   onChange={handleChange}
//                   className="form-control h-55"
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   {categories?.map((item) => (
//                     <option key={item._id} value={item._id}>
//                       {item.name}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>

//               <Form.Group className="mb-4">
//                 <Form.Label className="label text-secondary">Brand</Form.Label>
//                 <Form.Select
//                   name="brand"
//                   value={form.brand}
//                   onChange={handleChange}
//                   className="form-control h-55"
//                 >
//                   <option value="">Select Brand</option>
//                   {Brands?.map((item) => (
//                     <option key={item._id} value={item._id}>
//                       {item.name}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Card.Body>
//           </Card>

//           <Card className="bg-white border-0 rounded-3 mb-4">
//             <Card.Body className="p-4">
//               <Form.Group className="mb-4">
//                 <Form.Label className="label text-secondary">Featured Product</Form.Label>
//                 <Form.Select
//                   name="isFeatured"
//                   value={form.isFeatured}
//                   onChange={handleChange}
//                   className="form-control h-55"
//                 >
//                   <option value="">-- Select --</option>
//                   <option value="true">Yes</option>
//                   <option value="false">No</option>
//                 </Form.Select>
//               </Form.Group>

//               <Form.Group className="mb-4">
//                 <Form.Label className="label text-secondary">Flash Sell</Form.Label>
//                 <Form.Select
//                   name="flash_sell"
//                   value={form.flash_sell}
//                   onChange={handleChange}
//                   className="form-control h-55"
//                 >
//                   <option value="">-- Select --</option>
//                   <option value="true">Yes</option>
//                   <option value="false">No</option>
//                 </Form.Select>
//               </Form.Group>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <div className="d-flex flex-wrap gap-3 mb-4">
//         <button type="button" className="btn btn-danger py-2 px-4 fw-medium fs-16 text-white">
//           Cancel
//         </button>

//         <button
//           type="submit"
//           className="btn btn-primary py-2 px-4 fw-medium fs-16"
//           disabled={loading}
//         >
//           <i className="ri-save-line text-white fw-medium"></i>{' '}
//           {loading ? 'Updating...' : 'Update Product'}
//         </button>
//       </div>
//     </Form>
//   );
// };

// export default EditProduct;








'use client';

import { useState, useEffect } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, updateProduct } from '@/features/productSlice';
import { getAllCategories } from '@/features/categorySlice';
import { getAllBrands } from '@/features/brandSlice';

const EditProduct = ({ slug }) => {
  const dispatch = useDispatch();

  const { Brands } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);
  const { product, loading } = useSelector((state) => state.product);

  const [form, setForm] = useState({
    name: '',
    sku: '',
    oldPrice: '',
    price: '',
    countInStock: '',
    description: '',
    shortDescription: '',
    product_type: '',
    category: '',
    brand: '',
    isFeatured: '',
    flash_sell: '',
    isActive: '',
    metaTitle: '',
    metaDescription: '',
    variants: [],
    details: [],
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllBrands());

    if (slug) {
      dispatch(getProduct(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (product) {
      const safeDetails = (product.details || []).map((item) => ({
        key: item?.key || '',
        value: item?.value || '',
      }));

      const safeVariants = (product.variants || []).map((variant) => ({
        sku: variant?.sku || '',
        label: variant?.label || '',
        price: variant?.price ?? '',
        oldPrice: variant?.oldPrice ?? '',
        stock: variant?.stock ?? '',
        image: variant?.image || '',
        attributes: (variant?.attributes || []).map((attr) => ({
          key: attr?.key || '',
          value: attr?.value || '',
        })),
      }));

      setForm({
        name: product.name || '',
        sku: product.sku || '',
        oldPrice: product.oldPrice ?? '',
        price: product.price ?? '',
        countInStock: product.countInStock ?? '',
        description: product.description || '',
        shortDescription: product.shortDescription || '',
        product_type: product.product_type || '',
        category: product.category?._id || '',
        brand: product.brand?._id || '',
        isFeatured: product.isFeatured === true ? 'true' : 'false',
        flash_sell: product.flash_sell === true ? 'true' : 'false',
        isActive: product.isActive === true ? 'true' : 'false',
        metaTitle: product.metaTitle || '',
        metaDescription: product.metaDescription || '',
        variants: safeVariants,
        details: safeDetails,
      });

      setPreviewImages([...(product.images || [])]);
      setSelectedImages([]);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailChange = (index, field, value) => {
    setForm((prev) => {
      const updatedDetails = [...(prev.details || [])];

      const currentDetail = updatedDetails[index]
        ? { ...updatedDetails[index] }
        : { key: '', value: '' };

      updatedDetails[index] = {
        ...currentDetail,
        [field]: value,
      };

      return { ...prev, details: updatedDetails };
    });
  };

  const addDetailField = () => {
    setForm((prev) => ({
      ...prev,
      details: [...prev.details, { key: '', value: '' }],
    }));
  };

  const removeDetailField = (index) => {
    setForm((prev) => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index),
    }));
  };

  const handleVariantChange = (index, field, value) => {
    setForm((prev) => {
      const updatedVariants = [...(prev.variants || [])];

      const currentVariant = updatedVariants[index]
        ? {
            ...updatedVariants[index],
            attributes: [...(updatedVariants[index].attributes || [])],
          }
        : {
            sku: '',
            label: '',
            price: '',
            oldPrice: '',
            stock: '',
            image: '',
            attributes: [],
          };

      updatedVariants[index] = {
        ...currentVariant,
        [field]: value,
      };

      return { ...prev, variants: updatedVariants };
    });
  };

  const addVariant = () => {
    setForm((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          sku: '',
          label: '',
          price: '',
          oldPrice: '',
          stock: '',
          image: '',
          attributes: [],
        },
      ],
    }));
  };

  const removeVariant = (index) => {
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleVariantAttributeChange = (variantIndex, attrIndex, field, value) => {
    setForm((prev) => {
      const updatedVariants = [...(prev.variants || [])];

      const currentVariant = updatedVariants[variantIndex]
        ? { ...updatedVariants[variantIndex] }
        : {
            sku: '',
            label: '',
            price: '',
            oldPrice: '',
            stock: '',
            image: '',
            attributes: [],
          };

      const updatedAttributes = [...(currentVariant.attributes || [])];

      const currentAttribute = updatedAttributes[attrIndex]
        ? { ...updatedAttributes[attrIndex] }
        : { key: '', value: '' };

      updatedAttributes[attrIndex] = {
        ...currentAttribute,
        [field]: value,
      };

      updatedVariants[variantIndex] = {
        ...currentVariant,
        attributes: updatedAttributes,
      };

      return { ...prev, variants: updatedVariants };
    });
  };

  const addVariantAttribute = (variantIndex) => {
    setForm((prev) => {
      const updatedVariants = [...(prev.variants || [])];

      const currentVariant = updatedVariants[variantIndex]
        ? { ...updatedVariants[variantIndex] }
        : {
            sku: '',
            label: '',
            price: '',
            oldPrice: '',
            stock: '',
            image: '',
            attributes: [],
          };

      updatedVariants[variantIndex] = {
        ...currentVariant,
        attributes: [
          ...(currentVariant.attributes || []),
          { key: '', value: '' },
        ],
      };

      return { ...prev, variants: updatedVariants };
    });
  };

  const removeVariantAttribute = (variantIndex, attrIndex) => {
    setForm((prev) => {
      const updatedVariants = [...(prev.variants || [])];

      if (!updatedVariants[variantIndex]) {
        return prev;
      }

      const currentVariant = { ...updatedVariants[variantIndex] };

      updatedVariants[variantIndex] = {
        ...currentVariant,
        attributes: (currentVariant.attributes || []).filter(
          (_, i) => i !== attrIndex
        ),
      };

      return { ...prev, variants: updatedVariants };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    setSelectedImages((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const handleRemoveImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));

    const existingImageCount = product?.images?.length || 0;

    if (index >= existingImageCount) {
      const selectedIndex = index - existingImageCount;
      setSelectedImages((prev) => prev.filter((_, i) => i !== selectedIndex));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', form.name);
    formData.append('oldPrice', form.oldPrice);
    formData.append('price', form.price);
    formData.append('countInStock', form.countInStock);
    formData.append('description', form.description);
    formData.append('shortDescription', form.shortDescription);
    formData.append('product_type', form.product_type);
    formData.append('category', form.category);
    formData.append('brand', form.brand);
    formData.append('isFeatured', form.isFeatured);
    formData.append('flash_sell', form.flash_sell);
    formData.append('isActive', form.isActive);
    formData.append('metaTitle', form.metaTitle);
    formData.append('metaDescription', form.metaDescription);

    const cleanDetails = form.details
      .filter((item) => item.key && item.value)
      .map((item) => ({
        key: item.key,
        value: item.value,
      }));

    const cleanVariants = form.variants
      .filter((variant) => variant.sku || variant.label)
      .map((variant) => ({
        sku: variant.sku || '',
        label: variant.label || '',
        price: Number(variant.price || 0),
        oldPrice: Number(variant.oldPrice || 0),
        stock: Number(variant.stock || 0),
        image: variant.image || '',
        attributes: (variant.attributes || [])
          .filter((attr) => attr.key && attr.value)
          .map((attr) => ({
            key: attr.key,
            value: attr.value,
          })),
      }));

    formData.append('details', JSON.stringify(cleanDetails));
    formData.append('variants', JSON.stringify(cleanVariants));

    selectedImages.forEach((file) => {
      formData.append('images', file);
    });

    dispatch(updateProduct({ slug, data: formData }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col lg={7} xxl={8}>
          <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
              <h3 className="mb-3 mb-lg-4">Edit Product</h3>

              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="label text-secondary">
                      Product Title
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="h-55"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="label text-secondary">
                      SKU
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="h-55"
                      name="sku"
                      value={form.sku}
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col sm={12}>
                  <Form.Group className="mb-4">
                    <Form.Label className="label text-secondary">
                      Product Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col sm={12}>
                  <Form.Group className="mb-4">
                    <Form.Label className="label text-secondary">
                      Short Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="shortDescription"
                      value={form.shortDescription}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="label text-secondary">
                      Product Type
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="h-55"
                      name="product_type"
                      value={form.product_type}
                      onChange={handleChange}
                      placeholder="simple / variant / digital"
                    />
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="label text-secondary">
                      Product Status
                    </Form.Label>
                    <Form.Select
                      name="isActive"
                      value={form.isActive}
                      onChange={handleChange}
                      className="h-55"
                    >
                      <option value="">-- Select --</option>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="label text-secondary">
                      Regular Price
                    </Form.Label>
                    <Form.Control
                      type="number"
                      className="h-55"
                      name="oldPrice"
                      value={form.oldPrice}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="label text-secondary">
                      Sale Price
                    </Form.Label>
                    <Form.Control
                      type="number"
                      className="h-55"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="label text-secondary">
                      Product in Stock
                    </Form.Label>
                    <Form.Control
                      type="number"
                      className="h-55"
                      name="countInStock"
                      value={form.countInStock}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="label text-secondary">
                      Discount
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="h-55"
                      value={product?.discount || 0}
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col sm={12}>
                  <Form.Group className="mb-4">
                    <Form.Label className="label text-secondary">
                      Upload Product Images
                    </Form.Label>

                    <div className="form-control h-100 text-center position-relative p-4 p-lg-5">
                      <div className="product-upload">
                        <Form.Label
                          htmlFor="file-upload"
                          className="file-upload mb-0"
                        >
                          <i className="ri-folder-image-line bg-primary bg-opacity-10 p-2 rounded-1 text-primary"></i>
                          <span className="d-block text-body fs-14">
                            Drag and drop an image or{' '}
                            <span className="text-primary text-decoration-underline">
                              Browse
                            </span>
                          </span>
                        </Form.Label>

                        <input
                          type="file"
                          id="file-upload"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </div>

                      {previewImages.length > 0 && (
                        <div className="mt-3 d-flex flex-wrap justify-content-center gap-2">
                          {previewImages.map((img, idx) => (
                            <div
                              key={idx}
                              className="position-relative"
                              style={{ width: '80px', height: '80px' }}
                            >
                              <img
                                src={img}
                                alt={`Preview ${idx + 1}`}
                                className="img-thumbnail rounded"
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                }}
                              />

                              <span
                                onClick={() => handleRemoveImage(idx)}
                                style={{
                                  position: 'absolute',
                                  top: '-6px',
                                  right: '-6px',
                                  background: 'white',
                                  color: 'red',
                                  borderRadius: '50%',
                                  fontWeight: 'bold',
                                  padding: '0 6px',
                                  fontSize: '16px',
                                  cursor: 'pointer',
                                  zIndex: 2,
                                  lineHeight: 1,
                                }}
                              >
                                ×
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Form.Group>
                </Col>

                <Col sm={12}>
                  <Form.Group className="mb-4">
                    <Form.Label className="label text-secondary">
                      Specifications / Details
                    </Form.Label>

                    {form.details.length > 0 ? (
                      form.details.map((item, index) => (
                        <div
                          key={index}
                          className="d-flex gap-2 mb-2 align-items-center"
                        >
                          <Form.Control
                            type="text"
                            placeholder="Key"
                            value={item.key || ''}
                            onChange={(e) =>
                              handleDetailChange(index, 'key', e.target.value)
                            }
                          />

                          <Form.Control
                            type="text"
                            placeholder="Value"
                            value={item.value || ''}
                            onChange={(e) =>
                              handleDetailChange(index, 'value', e.target.value)
                            }
                          />

                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => removeDetailField(index)}
                          >
                            ×
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted">No specifications added yet.</p>
                    )}

                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm mt-2"
                      onClick={addDetailField}
                    >
                      + Add Specification
                    </button>
                  </Form.Group>
                </Col>

                <Col sm={12}>
                  <Form.Group className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Form.Label className="label text-secondary mb-0">
                        Product Variants
                      </Form.Label>

                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={addVariant}
                      >
                        + Add Variant
                      </button>
                    </div>

                    {form.variants?.length > 0 ? (
                      form.variants.map((variant, index) => (
                        <div key={index} className="border rounded-3 p-3 mb-3">
                          <div className="d-flex justify-content-between mb-3">
                            <h6 className="mb-0">Variant #{index + 1}</h6>

                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => removeVariant(index)}
                            >
                              Remove
                            </button>
                          </div>

                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Variant Label</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={variant.label || ''}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      index,
                                      'label',
                                      e.target.value
                                    )
                                  }
                                  placeholder="Example: Black 128GB / XL Cotton"
                                />
                              </Form.Group>
                            </Col>

                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Variant SKU</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={variant.sku || ''}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      index,
                                      'sku',
                                      e.target.value
                                    )
                                  }
                                  placeholder="Example: IP15-BLK-128"
                                />
                              </Form.Group>
                            </Col>

                            <Col md={4}>
                              <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                  type="number"
                                  value={variant.price || ''}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      index,
                                      'price',
                                      e.target.value
                                    )
                                  }
                                />
                              </Form.Group>
                            </Col>

                            <Col md={4}>
                              <Form.Group className="mb-3">
                                <Form.Label>Old Price</Form.Label>
                                <Form.Control
                                  type="number"
                                  value={variant.oldPrice || ''}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      index,
                                      'oldPrice',
                                      e.target.value
                                    )
                                  }
                                />
                              </Form.Group>
                            </Col>

                            <Col md={4}>
                              <Form.Group className="mb-3">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control
                                  type="number"
                                  value={variant.stock || ''}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      index,
                                      'stock',
                                      e.target.value
                                    )
                                  }
                                />
                              </Form.Group>
                            </Col>

                            <Col md={12}>
                              <Form.Group className="mb-3">
                                <Form.Label>Variant Image URL</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={variant.image || ''}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      index,
                                      'image',
                                      e.target.value
                                    )
                                  }
                                  placeholder="https://..."
                                />
                              </Form.Group>
                            </Col>

                            <Col md={12}>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Dynamic Variant Options</strong>

                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => addVariantAttribute(index)}
                                >
                                  + Add Option
                                </button>
                              </div>

                              {variant.attributes?.length > 0 ? (
                                variant.attributes.map((attr, attrIndex) => (
                                  <div
                                    key={attrIndex}
                                    className="d-flex gap-2 mb-2 align-items-center"
                                  >
                                    <Form.Control
                                      type="text"
                                      placeholder="Option Name: Color / RAM / Size"
                                      value={attr.key || ''}
                                      onChange={(e) =>
                                        handleVariantAttributeChange(
                                          index,
                                          attrIndex,
                                          'key',
                                          e.target.value
                                        )
                                      }
                                    />

                                    <Form.Control
                                      type="text"
                                      placeholder="Option Value: Black / 8GB / XL"
                                      value={attr.value || ''}
                                      onChange={(e) =>
                                        handleVariantAttributeChange(
                                          index,
                                          attrIndex,
                                          'value',
                                          e.target.value
                                        )
                                      }
                                    />

                                    <button
                                      type="button"
                                      className="btn btn-sm btn-danger"
                                      onClick={() =>
                                        removeVariantAttribute(index, attrIndex)
                                      }
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))
                              ) : (
                                <p className="text-muted mb-0">
                                  No dynamic options added yet.
                                </p>
                              )}
                            </Col>
                          </Row>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted">No variants added yet.</p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5} xxl={4}>
          <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
              <h3 className="mb-3 mb-lg-4">Product Category & Brand</h3>

              <Form.Group className="mb-4">
                <Form.Label className="label text-secondary">
                  Category
                </Form.Label>
                <Form.Select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="h-55"
                  required
                >
                  <option value="">Select Category</option>
                  {categories?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label text-secondary">
                  Brand
                </Form.Label>
                <Form.Select
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  className="h-55"
                >
                  <option value="">Select Brand</option>
                  {Brands?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Card.Body>
          </Card>

          <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
              <Form.Group className="mb-4">
                <Form.Label className="label text-secondary">
                  Featured Product
                </Form.Label>
                <Form.Select
                  name="isFeatured"
                  value={form.isFeatured}
                  onChange={handleChange}
                  className="h-55"
                >
                  <option value="">-- Select --</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label text-secondary">
                  Flash Sell
                </Form.Label>
                <Form.Select
                  name="flash_sell"
                  value={form.flash_sell}
                  onChange={handleChange}
                  className="h-55"
                >
                  <option value="">-- Select --</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Form.Select>
              </Form.Group>
            </Card.Body>
          </Card>

          <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
              <h3 className="mb-3 mb-lg-4">SEO Settings</h3>

              <Form.Group className="mb-4">
                <Form.Label className="label text-secondary">
                  Meta Title
                </Form.Label>
                <Form.Control
                  type="text"
                  className="h-55"
                  name="metaTitle"
                  value={form.metaTitle}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-0">
                <Form.Label className="label text-secondary">
                  Meta Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="metaDescription"
                  value={form.metaDescription}
                  onChange={handleChange}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="d-flex flex-wrap gap-3 mb-4">
        <button
          type="button"
          className="btn btn-danger py-2 px-4 fw-medium fs-16 text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn btn-primary py-2 px-4 fw-medium fs-16"
          disabled={loading}
        >
          <i className="ri-save-line text-white fw-medium"></i>{' '}
          {loading ? 'Updating...' : 'Update Product'}
        </button>
      </div>
    </Form>
  );
};

export default EditProduct;