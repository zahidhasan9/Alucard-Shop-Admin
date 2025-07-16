'use client';
import { useState, useEffect } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, updateProduct } from '@/features/productSlice';
import { getAllCategories } from '@/features/categorySlice';
import { getAllBrands } from '@/features/brandSlice';

const EditProduct = ({ slug }) => {
  const { Brands } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    sku: '',
    oldPrice: '',
    price: '',
    countInStock: '',
    description: '',
    category: '',
    brand: '',
    variants: [],
    details: []
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // Load Product
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllBrands());
    if (slug) {
      dispatch(getProduct(slug));
    }
  }, [dispatch, slug]);

  // Set product to form when data arrives
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        sku: product.sku || '',
        oldPrice: product.oldPrice || '',
        price: product.price || '',
        countInStock: product.countInStock || '',
        description: product.description || '',
        category: product.category?._id || '',
        brand: product.brand?._id || '',
        variants: product.variants || [],
        details: product.details || []
      });
      // Set preview from existing image URLs (optional)
      if (product.images) {
        setPreviewImages(product.images);
      }
    }
  }, [product]);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  // ====================================
  // dynamic form for details
  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...form.details];
    if (!updatedDetails[index]) updatedDetails[index] = { key: '', value: '' };
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

  // Handle image select
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const handleRemoveImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('sku', form.sku);
    formData.append('oldPrice', form.oldPrice);
    formData.append('price', form.price);
    formData.append('countInStock', form.countInStock);
    formData.append('description', form.description);
    formData.append('category', form.category);
    formData.append('brand', form.brand);

    // details (key-value) details
    form.details.forEach((item, index) => {
      formData.append(`details[${index}][key]`, item.key);
      formData.append(`details[${index}][value]`, item.value);
    });

    selectedImages.forEach((file) => {
      formData.append('images', file);
    });
    // console.log('update', slug, ...formData.entries());
    dispatch(updateProduct({ slug, data: formData }));
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={7} xxl={8}>
            <Card className="bg-white border-0 rounded-3 mb-4">
              <Card.Body className="p-4">
                <h3 className="mb-3 mb-lg-4">Edit Product</h3>

                <Row>
                  <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Product Title</Form.Label>
                      <Form.Control
                        type="text"
                        className="h-55"
                        placeholder="Enter product title"
                        name="name"
                        value={form.name || ''}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">SKU</Form.Label>
                      <Form.Control
                        type="text"
                        className="h-55"
                        placeholder="Enter SKU"
                        name="sku"
                        value={form.sku || ''}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12} lg={12}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary fs-14">Product Description</Form.Label>

                      <Form.Control
                        as="textarea"
                        rows={6}
                        placeholder="Type description here..."
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Regular Price</Form.Label>
                      <Form.Control
                        type="text"
                        className="h-55"
                        placeholder="Enter regular price"
                        name="oldPrice"
                        value={form.oldPrice}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Sale Price</Form.Label>
                      <Form.Control
                        type="text"
                        className="h-55"
                        placeholder="Enter sale price"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Product in Stock</Form.Label>
                      <Form.Control
                        type="text"
                        className="h-55"
                        placeholder="Enter product in stock"
                        name="countInStock"
                        value={form.countInStock}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={12} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Discount / Offer</Form.Label>
                      <Form.Control
                        type="text"
                        className="h-55"
                        placeholder="Enter discount / Offer"
                        defaultValue={product.discount}
                        disabled
                      />
                    </Form.Group>
                  </Col>

                  {/* <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Available Date</Form.Label>
                      <Form.Control type="date" className="h-55" />
                    </Form.Group>
                  </Col>

                  <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">End Date</Form.Label>
                      <Form.Control type="date" className="h-55" />
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
                          <input type="file" id="file-upload" multiple accept="image/*" onChange={handleImageChange} />
                        </div>
                        {/* Preview */}
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

                      {form?.details?.length > 0 &&
                        form?.details.map((item, index) => (
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
                      {form.details?.length === 0 && <p className="text-muted">No specifications added yet.</p>}

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
                <h3 className="mb-3 mb-lg-4">Product Category & Brand</h3>

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
                        <option>{product?.category?.name}</option>
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
                        <option>{product?.brand?.name}</option>
                        {Brands?.map((item, idx) => (
                          <option key={idx} value={item?._id}>
                            {item?.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  {/* <Col sm={6} lg={12}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Collection</Form.Label>
                      <Form.Select className="form-control h-55" aria-label="Default select example">
                        <option defaultValue="0">Select</option>
                        <option defaultValue="1">Collection 1</option>
                        <option defaultValue="2">Collection 2</option>
                        <option defaultValue="3">Collection 3</option>
                        <option defaultValue="4">Collection 4</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col sm={6} lg={12}>
                    <Form.Group className="mb-0">
                      <Form.Label className="label text-secondary">Tags</Form.Label>
                      <Form.Select className="form-control h-55" aria-label="Default select example">
                        <option defaultValue="0">Select</option>
                        <option defaultValue="1">watch</option>
                        <option defaultValue="2">headphone</option>
                        <option defaultValue="3">mobile</option>
                        <option defaultValue="4">speaker</option>
                      </Form.Select>
                    </Form.Group>
                  </Col> */}
                </Row>
              </Card.Body>
            </Card>
            {/* 
            <Card className="bg-white border-0 rounded-3 mb-4">
              <Card.Body className="p-4">
                <h3 className="mb-3 mb-lg-4">Other Options</h3>

                <Form.Group className="mb-4">
                  <Form.Label className="label text-secondary">Title</Form.Label>
                  <Form.Control
                    type="text"
                    className="h-55"
                    placeholder="Enter title"
                    defaultValue="E.g. Google Pixel 7 Pro"
                  />
                </Form.Group>

                <Form.Group className="mb-0">
                  <Form.Label className="label text-secondary">Description</Form.Label>
                  <textarea rows="6" className="form-control" placeholder="Type here...."></textarea>
                </Form.Group>
              </Card.Body>
            </Card> */}
          </Col>
        </Row>

        <div className="d-flex flex-wrap gap-3 mb-4">
          <button className="btn btn-danger py-2 px-4 fw-medium fs-16 text-white">Cancel</button>
          <button className="btn btn-primary py-2 px-4 fw-medium fs-16">
            {' '}
            <i className="ri-add-line text-white fw-medium"></i> Update Product
          </button>
        </div>
      </Form>
    </>
  );
};

export default EditProduct;
