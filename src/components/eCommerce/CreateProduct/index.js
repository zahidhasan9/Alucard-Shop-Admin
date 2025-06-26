'use client';
import { useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';

const CreateProduct = () => {
  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.filter((file) => file.type.startsWith('image/')).map((file) => URL.createObjectURL(file));

    setPreviewImages(imageUrls);
  };
  return (
    <>
      <Form>
        <Row>
          <Col lg={7} xxl={8}>
            <Card className="bg-white border-0 rounded-3 mb-4">
              <Card.Body className="p-4">
                <h3 className="mb-3 mb-lg-4">Add A Product</h3>

                <Row>
                  <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Product Title</Form.Label>
                      <Form.Control type="text" className="h-55" placeholder="Enter product title" />
                    </Form.Group>
                  </Col>

                  <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Product Type</Form.Label>
                      <Form.Select className="form-control h-55" aria-label="Default select example">
                        <option defaultValue="0">State</option>
                        <option defaultValue="1">Digital Product</option>
                        <option defaultValue="2">Physical Product</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">SKU</Form.Label>
                      <Form.Control type="text" className="h-55" placeholder="Enter SKU" />
                    </Form.Group>
                  </Col>

                  <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Product Type</Form.Label>
                      <Form.Select className="form-control h-55" aria-label="Default select example">
                        <option defaultValue="0">State</option>
                        <option defaultValue="1">Emburo</option>
                        <option defaultValue="2">Fediz</option>
                        <option defaultValue="3">Debilop</option>
                        <option defaultValue="4">Canin</option>
                        <option defaultValue="5">Daxa</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col sm={12} lg={12}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary fs-14">Product Description</Form.Label>

                      <Form.Control as="textarea" rows={6} placeholder="Type description here..." />
                    </Form.Group>
                  </Col>

                  <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Regular Price</Form.Label>
                      <Form.Control type="text" className="h-55" placeholder="Enter regular price" />
                    </Form.Group>
                  </Col>

                  <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Sale Price</Form.Label>
                      <Form.Control type="text" className="h-55" placeholder="Enter sale price" />
                    </Form.Group>
                  </Col>

                  <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Publish Schedule</Form.Label>
                      <Form.Control type="date" className="h-55" />
                    </Form.Group>
                  </Col>

                  <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Product in Stock</Form.Label>
                      <Form.Control type="text" className="h-55" placeholder="Enter product in stock" />
                    </Form.Group>
                  </Col>

                  <Col sm={6} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Product ID</Form.Label>
                      <Form.Control type="text" className="h-55" placeholder="Enter product id" />
                    </Form.Group>
                  </Col>

                  <Col sm={12} lg={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Discount / Offer</Form.Label>
                      <Form.Control type="text" className="h-55" placeholder="Enter discount / Offer" />
                    </Form.Group>
                  </Col>

                  <Col sm={6} lg={6}>
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
                  </Col>

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
                      <Form.Select className="form-control h-55" aria-label="Default select example">
                        <option defaultValue="0">Select</option>
                        <option defaultValue="1">watch</option>
                        <option defaultValue="2">headphone</option>
                        <option defaultValue="3">mobile</option>
                        <option defaultValue="4">speaker</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col sm={6} lg={12}>
                    <Form.Group className="mb-4">
                      <Form.Label className="label text-secondary">Vendor</Form.Label>
                      <Form.Select className="form-control h-55" aria-label="Default select example">
                        <option defaultValue="0">Select</option>
                        <option defaultValue="1">Dennis Matthews</option>
                        <option defaultValue="2">Susan Rader</option>
                        <option defaultValue="3">Douglas Harvey</option>
                        <option defaultValue="4">John Valdez</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col sm={6} lg={12}>
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
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="bg-white border-0 rounded-3 mb-4">
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
