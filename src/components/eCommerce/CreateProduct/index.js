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
  const [categoryid, setCategoryid] = useState();

  const [form, setForm] = useState({
    name: '',
    description: '',
    product_type: '',
    brand: '',
    category: '',
    price: '',
    oldPrice: '',
    discount: '',
    countInStock: ''
  });

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

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   const validImages = files.filter((file) => file.type.startsWith('image/'));

  //   const imageUrls = validImages.map((file) => URL.createObjectURL(file));
  //   setPreviewImages((prev) => [...prev, ...imageUrls]);
  //   // setSelectedImages((prev) => [...prev, ...validImages]);
  //   setForm((prev) => ({ ...prev, images: [...prev.images, ...validImages] }));
  // };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).filter((f) => f.type.startsWith('image/'));
    setSelectedImages((prev) => [...prev, ...files]);
    setPreviewImages((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value); // Example: form.name, form.price etc.
    });

    // Ensure selectedImages is not empty
    if (selectedImages.length > 0) {
      selectedImages.forEach((file) => {
        formData.append('images', file); // key must match with multer field
      });
      console.log('Selected Images:', selectedImages); // See if files exist
    }
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
                              <img
                                key={idx}
                                src={img}
                                alt={`Preview ${idx + 1}`}
                                className="img-thumbnail rounded"
                                style={{ maxHeight: '80px', maxWidth: '80px', objectFit: 'cover' }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
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

            {/* <Card className="bg-white border-0 rounded-3 mb-4">
              <Card.Body className="p-4">
                <h3 className="mb-3 mb-lg-4">Other Options</h3>

                <Form.Group className="mb-4">
                  <Form.Label className="label text-secondary">Title</Form.Label>
                  <Form.Control type="text" className="h-55" placeholder="Enter title" />
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
            <i className="ri-add-line text-white fw-medium"></i> Create Product
          </button>
        </div>
      </Form>
    </>
  );
};

export default CreateProduct;
