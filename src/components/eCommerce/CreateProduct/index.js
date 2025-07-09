// 'use client';
// import { useState, useEffect } from 'react';
// import { Row, Col, Card, Form } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { createProduct } from '@/features/productSlice';
// import { getAllCategories } from '@/features/categorySlice';

// const CreateProduct = () => {
//   const { categories } = useSelector((state) => state.category);
//   const dispatch = useDispatch();
//   const [previewImages, setPreviewImages] = useState([]);
//   const [selectedImages, setSelectedImages] = useState([]);

//   const [form, setForm] = useState({
//     name: '',
//     description: '',
//     product_type: '',
//     brand: '',
//     category: '',
//     price: '',
//     oldPrice: '',
//     discount: '',
//     countInStock: '',
//     variants: [],
//     details: []
//   });

//   useEffect(() => {
//     dispatch(getAllCategories());
//   }, []);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleRemoveImage = (index) => {
//     setPreviewImages((prev) => prev.filter((_, i) => i !== index));
//     setSelectedImages((prev) => prev.filter((_, i) => i !== index));
//   };
//   // no limit image upload
//   // const handleImageChange = (e) => {
//   //   const files = Array.from(e.target.files).filter((f) => f.type.startsWith('image/'));
//   //   setSelectedImages((prev) => [...prev, ...files]);
//   //   setPreviewImages((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
//   // };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files).filter((f) => f.type.startsWith('image/'));
//     //with image limit max 6
//     if (selectedImages.length + files.length > 6) {
//       alert('You can upload a maximum of 6 images');
//       return;
//     }

//     setSelectedImages((prev) => [...prev, ...files]);
//     setPreviewImages((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.entries(form).forEach(([key, value]) => {
//       formData.append(key, value); // Example: form.name, form.price etc.
//     });

//     // Ensure selectedImages is not empty
//     if (selectedImages.length > 0) {
//       selectedImages.forEach((file) => {
//         formData.append('images', file); // key must match with multer field
//       });
//       console.log('Selected Images:', selectedImages); // See if files exist
//     }
//     dispatch(createProduct(formData));
//   };

//   return (
//     <>
//       <Form onSubmit={handleSubmit}>
//         <Row>
//           <Col lg={7} xxl={8}>
//             <Card className="bg-white border-0 rounded-3 mb-4">
//               <Card.Body className="p-4">
//                 <h3 className="mb-3 mb-lg-4">Add A Product</h3>

//                 <Row>
//                   <Col sm={6} lg={6}>
//                     <Form.Group className="mb-4">
//                       <Form.Label className="label text-secondary">Product Title</Form.Label>
//                       <Form.Control
//                         name="name"
//                         value={form.name}
//                         onChange={handleChange}
//                         type="text"
//                         className="h-55"
//                         placeholder="Enter product title"
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col sm={6} lg={6}>
//                     <Form.Group className="mb-4">
//                       <Form.Label className="label text-secondary">Product Type (not set in backend)</Form.Label>
//                       <Form.Select className="form-control h-55" aria-label="Default select example">
//                         <option defaultValue="0">State</option>
//                         <option defaultValue="1">Digital Product</option>
//                         <option defaultValue="2">Physical Product</option>
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>

//                   {/* <Col sm={6} lg={6}>
//                     <Form.Group className="mb-4">
//                       <Form.Label className="label text-secondary">SKU</Form.Label>
//                       <Form.Control  type="text" className="h-55" placeholder="Enter SKU" />
//                     </Form.Group>
//                   </Col> */}

//                   <Col sm={12} lg={12}>
//                     <Form.Group className="mb-4">
//                       <Form.Label className="label text-secondary fs-14">Product Description</Form.Label>

//                       <Form.Control
//                         name="description"
//                         value={form.description}
//                         onChange={handleChange}
//                         as="textarea"
//                         rows={6}
//                         placeholder="Type description here..."
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col sm={6} lg={6}>
//                     <Form.Group className="mb-4">
//                       <Form.Label className="label text-secondary">Regular Price</Form.Label>
//                       <Form.Control
//                         name="price"
//                         value={form.price}
//                         onChange={handleChange}
//                         type="text"
//                         className="h-55"
//                         placeholder="Enter regular price"
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col sm={6} lg={6}>
//                     <Form.Group className="mb-4">
//                       <Form.Label className="label text-secondary">Sale Price</Form.Label>
//                       <Form.Control
//                         name="oldPrice"
//                         value={form.oldPrice}
//                         onChange={handleChange}
//                         type="text"
//                         className="h-55"
//                         placeholder="Enter sale price"
//                       />
//                     </Form.Group>
//                   </Col>

//                   {/* <Col sm={6} lg={6}>
//                     <Form.Group className="mb-4">
//                       <Form.Label className="label text-secondary">Publish Schedule</Form.Label>
//                       <Form.Control type="date" className="h-55" />
//                     </Form.Group>
//                   </Col> */}

//                   <Col sm={6} lg={6}>
//                     <Form.Group className="mb-4">
//                       <Form.Label className="label text-secondary">Product in Stock</Form.Label>
//                       <Form.Control
//                         name="countInStock"
//                         value={form.countInStock}
//                         onChange={handleChange}
//                         type="text"
//                         className="h-55"
//                         placeholder="Enter product in stock"
//                       />
//                     </Form.Group>
//                   </Col>

//                   {/* <Col sm={12} lg={6}>
//                     <Form.Group className="mb-4">
//                       <Form.Label className="label text-secondary">Discount / Offer</Form.Label>
//                       <Form.Control
//                         name="discount"
//                         value={form.discount}
//                         onChange={handleChange}
//                         type="text"
//                         className="h-55"
//                         placeholder="Enter discount / Offer"
//                       />
//                     </Form.Group>
//                   </Col> */}

//                   <Col sm={12} lg={12}>
//                     <Form.Group className="mb-4">
//                       <Form.Label className="label text-secondary">Upload Product Images</Form.Label>
//                       <div className="form-control h-100 text-center position-relative p-4 p-lg-5">
//                         <div className="product-upload">
//                           <Form.Label htmlFor="file-upload" className="file-upload mb-0">
//                             <i className="ri-folder-image-line bg-primary bg-opacity-10 p-2 rounded-1 text-primary"></i>
//                             <span className="d-block text-body fs-14">
//                               Drag and drop an image or{' '}
//                               <span className="text-primary text-decoration-underline">Browse</span>
//                             </span>
//                           </Form.Label>
//                           <input
//                             id="file-upload"
//                             type="file"
//                             onChange={handleImageChange}
//                             accept="image/*"
//                             multiple
//                             style={{ display: 'none' }}
//                           />
//                         </div>
//                         {previewImages.length > 0 && (
//                           <div className="mt-3 d-flex flex-wrap justify-content-center gap-2">
//                             {previewImages.map((img, idx) => (
//                               <div key={idx} className="position-relative" style={{ width: '80px', height: '80px' }}>
//                                 <img
//                                   src={img}
//                                   alt={`Preview ${idx + 1}`}
//                                   className="img-thumbnail rounded"
//                                   style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                                 />
//                                 <span
//                                   onClick={() => handleRemoveImage(idx)}
//                                   style={{
//                                     position: 'absolute',
//                                     top: '-6px',
//                                     right: '-6px',
//                                     background: 'white',
//                                     color: 'red',
//                                     borderRadius: '50%',
//                                     fontWeight: 'bold',
//                                     padding: '0 6px',
//                                     fontSize: '16px',
//                                     cursor: 'pointer',
//                                     zIndex: 2,
//                                     lineHeight: 1
//                                   }}
//                                 >
//                                   x
//                                 </span>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </Form.Group>
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>
//           </Col>

//           <Col lg={5} xxl={4}>
//             <Card className="bg-white border-0 rounded-3 mb-4">
//               <Card.Body className="p-4">
//                 <h3 className="mb-3 mb-lg-4">Product Category & Tags</h3>

//                 <Row>
//                   <Col sm={6} lg={12}>
//                     <Form.Group className="mb-4">
//                       <Form.Label className="label text-secondary">Category</Form.Label>

//                       <Form.Select
//                         name="category"
//                         onChange={handleChange}
//                         className="form-control h-55"
//                         aria-label="Default select example"
//                       >
//                         <option defaultValue="0">Select</option>
//                         {categories?.map((item, idx) => (
//                           <option key={idx} value={item?._id}>
//                             {item?.name}
//                           </option>
//                         ))}
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>

//                   <Col sm={6} lg={12}>
//                     <Form.Group className="mb-4">
//                       <Form.Label className="label text-secondary">Brand</Form.Label>
//                       <Form.Select className="form-control h-55" aria-label="Default select example">
//                         <option defaultValue="0">Select</option>
//                         <option defaultValue="1">Collection 1</option>
//                         <option defaultValue="2">Collection 2</option>
//                         <option defaultValue="3">Collection 3</option>
//                         <option defaultValue="4">Collection 4</option>
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         <div className="d-flex flex-wrap gap-3 mb-4">
//           <button className="btn btn-danger py-2 px-4 fw-medium fs-16 text-white">Cancel</button>
//           <button className="btn btn-primary py-2 px-4 fw-medium fs-16">
//             {' '}
//             <i className="ri-add-line text-white fw-medium"></i> Create Product
//           </button>
//         </div>
//       </Form>
//     </>
//   );
// };

// export default CreateProduct;

'use client';
import { useState, useEffect } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '@/features/productSlice';
import { getAllCategories } from '@/features/categorySlice';

const CreateProduct = () => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const [form, setForm] = useState({
    name: '',
    description: '',
    product_type: '',
    brand: '',
    category: '',
    price: '',
    oldPrice: '',
    countInStock: '',
    variants: [],
    details: []
  });

  // ====================================
  // dynamic form for details
  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...form.details];
    updatedDetails[index][field] = value;
    setForm({ ...form, details: updatedDetails });
  };

  const addDetailField = () => {
    setForm({ ...form, details: [...form.details, { key: '', value: '' }] });
  };

  const removeDetailField = (index) => {
    const updatedDetails = form.details.filter((_, i) => i !== index);
    setForm({ ...form, details: updatedDetails });
  };
  // ====================================

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRemoveImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).filter((f) => f.type.startsWith('image/'));
    //with image limit max 6
    if (selectedImages.length + files.length > 6) {
      alert('You can upload a maximum of 6 images');
      return;
    }

    setSelectedImages((prev) => [...prev, ...files]);
    setPreviewImages((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   Object.entries(form).forEach(([key, value]) => {
  //     formData.append(key, value); // Example: form.name, form.price etc.
  //   });

  //   // Ensure selectedImages is not empty
  //   if (selectedImages.length > 0) {
  //     selectedImages.forEach((file) => {
  //       formData.append('images', file); // key must match with multer field
  //     });
  //     console.log('Selected Images:', selectedImages); // See if files exist
  //   }
  //   dispatch(createProduct(formData));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Text input
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('product_type', form.product_type);
    formData.append('brand', form.brand);
    formData.append('category', form.category);
    formData.append('price', form.price);
    formData.append('oldPrice', form.oldPrice);
    formData.append('countInStock', form.countInStock);

    // details (key-value) details
    form.details.forEach((item, index) => {
      formData.append(`details[${index}][key]`, item.key);
      formData.append(`details[${index}][value]`, item.value);
    });

    // Image
    selectedImages.forEach((img) => {
      formData.append('images', img);
    });
    // console.log(...formData.entries());
    dispatch(createProduct(formData));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={7} xxl={8}>
            <Card className="bg-white border-0 rounded-3 mb-4">
              <Card.Body className="p-4">
                <h3 className="mb-3 mb-lg-4">Add A Product</h3>

                <Row>
                  <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Product Title</Form.Label>
                      <Form.Control
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        type="text"
                        className="h-55"
                        placeholder="Enter product title"
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Product Type (not set in backend)</Form.Label>
                      <Form.Select className="form-control h-55" aria-label="Default select example">
                        <option defaultValue="0">State</option>
                        <option defaultValue="1">Digital Product</option>
                        <option defaultValue="2">Physical Product</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  {/* <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">SKU</Form.Label>
                      <Form.Control  type="text" className="h-55" placeholder="Enter SKU" />
                    </Form.Group>
                  </Col> */}

                  <Col sm={12} lg={12}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary fs-14">Product Description</Form.Label>

                      <Form.Control
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        as="textarea"
                        rows={6}
                        placeholder="Type description here..."
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Regular Price</Form.Label>
                      <Form.Control
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        type="text"
                        className="h-55"
                        placeholder="Enter regular price"
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Sale Price</Form.Label>
                      <Form.Control
                        name="oldPrice"
                        value={form.oldPrice}
                        onChange={handleChange}
                        type="text"
                        className="h-55"
                        placeholder="Enter sale price"
                      />
                    </Form.Group>
                  </Col>

                  {/* <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Publish Schedule</Form.Label>
                      <Form.Control type="date" className="h-55" />
                    </Form.Group>
                  </Col> */}

                  <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Product in Stock</Form.Label>
                      <Form.Control
                        name="countInStock"
                        value={form.countInStock}
                        onChange={handleChange}
                        type="text"
                        className="h-55"
                        placeholder="Enter product in stock"
                      />
                    </Form.Group>
                  </Col>

                  {/* <Col sm={12} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Discount / Offer</Form.Label>
                      <Form.Control
                        name="discount"
                        value={form.discount}
                        onChange={handleChange}
                        type="text"
                        className="h-55"
                        placeholder="Enter discount / Offer"
                      />
                    </Form.Group>
                  </Col> */}

                  <Col sm={12} lg={12}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Upload Product Images</Form.Label>
                      <div className="form-control h-100 text-center position-relative p-4 p-lg-5">
                        <div className="product-upload">
                          <Form.Label htmlFor="file-upload" className="file-upload mb-0">
                            <i className="ri-folder-image-line bg-primary bg-opacity-10 p-2 rounded-1 text-primary"></i>
                            <span className="d-block text-body fs-14">
                              Drag and drop an image or{' '}
                              <span className="text-primary text-decoration-underline">Browse</span>
                            </span>
                          </Form.Label>
                          <input
                            id="file-upload"
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            multiple
                            style={{ display: 'none' }}
                          />
                        </div>
                        {previewImages.length > 0 && (
                          <div className="mt-3 d-flex flex-wrap justify-content-center gap-2">
                            {previewImages.map((img, idx) => (
                              <div key={idx} className="position-relative" style={{ width: '80px', height: '80px' }}>
                                <img
                                  src={img}
                                  alt={`Preview ${idx + 1}`}
                                  className="img-thumbnail rounded"
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                                    lineHeight: 1
                                  }}
                                >
                                  x
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Specifications / Details</Form.Label>

                      {form.details.map((item, index) => (
                        <div key={index} className="d-flex gap-2 mb-2 align-items-center">
                          <Form.Control
                            type="text"
                            placeholder="Key (e.g., Model)"
                            value={item.key}
                            onChange={(e) => handleDetailChange(index, 'key', e.target.value)}
                          />
                          <Form.Control
                            type="text"
                            placeholder="Value (e.g., GS-18XCOA1V)"
                            value={item.value}
                            onChange={(e) => handleDetailChange(index, 'value', e.target.value)}
                          />
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => removeDetailField(index)}
                          >
                            ×
                          </button>
                        </div>
                      ))}

                      <button type="button" className="btn btn-outline-primary btn-sm mt-2" onClick={addDetailField}>
                        + Add Specification
                      </button>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={5} xxl={4}>
            <Card className="bg-white border-0 rounded-3 mb-4">
              <Card.Body className="p-4">
                <h3 className="mb-3 mb-lg-4">Product Category & Tags</h3>

                <Row>
                  <Col sm={6} lg={12}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Category</Form.Label>

                      <Form.Select
                        name="category"
                        onChange={handleChange}
                        className="form-control h-55"
                        aria-label="Default select example"
                      >
                        <option defaultValue="0">Select</option>
                        {categories?.map((item, idx) => (
                          <option key={idx} value={item?._id}>
                            {item?.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col sm={6} lg={12}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Brand</Form.Label>
                      <Form.Select className="form-control h-55" aria-label="Default select example">
                        <option defaultValue="0">Select</option>
                        <option defaultValue="1">Collection 1</option>
                        <option defaultValue="2">Collection 2</option>
                        <option defaultValue="3">Collection 3</option>
                        <option defaultValue="4">Collection 4</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="d-flex flex-wrap gap-3 mb-4">
          <button className="btn btn-danger py-2 px-4 fw-medium fs-16 text-white">Cancel</button>
          <button className="btn btn-primary py-2 px-4 fw-medium fs-16">
            {' '}
            <i className="ri-add-line text-white fw-medium"></i> Create Product
          </button>
        </div>
      </Form>
    </>
  );
};

export default CreateProduct;
