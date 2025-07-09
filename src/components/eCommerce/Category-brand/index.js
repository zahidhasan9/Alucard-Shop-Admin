'use client';

import { Row, Col, Card, Form } from 'react-bootstrap';

const CreateCatandBrand = () => {
  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <h3 className="p-3 ">Create Category</h3>
        <Card.Body className="p-4">
          <Form>
            <Row>
              <Col sm={6} lg={4}>
                <Form.Group className="mb-4">
                  <Form.Label className="label text-secondary">Category Name</Form.Label>
                  <Form.Control type="text" className="h-55" placeholder="Enter Category Name" />
                </Form.Group>
              </Col>

              <Col sm={6} lg={6}>
                <Form.Group className="mb-4">
                  <Form.Label className="label text-secondary">View All Category</Form.Label>
                  <Form.Select className="form-control h-55" aria-label="Default select example">
                    <option defaultValue="0">State</option>
                    <option defaultValue="1">Digital Product</option>
                    <option defaultValue="2">Physical Product</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col sm={12} lg={12}>
                <div className="d-flex flex-wrap gap-3">
                  <button className="btn btn-danger py-2 px-4 fw-medium fs-16 text-white">Cancel</button>
                  <button className="btn btn-primary py-2 px-4 fw-medium fs-16">
                    {' '}
                    <i className="ri-add-line text-white fw-medium"></i> Create
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Card className="bg-white border-0 rounded-3 mb-4">
        <h3 className="p-3 ">Create Brand</h3>
        <Card.Body className="p-4">
          <Form>
            <Row>
              <Col sm={6} lg={4}>
                <Form.Group className="mb-4">
                  <Form.Label className="label text-secondary">Seller Name</Form.Label>
                  <Form.Control type="text" className="h-55" placeholder="Enter Seller Name" />
                </Form.Group>
              </Col>

              <Col sm={6} lg={6}>
                <Form.Group className="mb-4">
                  <Form.Label className="label text-secondary">View All Brand</Form.Label>
                  <Form.Select className="form-control h-55" aria-label="Default select example">
                    <option defaultValue="0">State</option>
                    <option defaultValue="1">Digital Product</option>
                    <option defaultValue="2">Physical Product</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col sm={12} lg={12}>
                <div className="d-flex flex-wrap gap-3">
                  <button className="btn btn-danger py-2 px-4 fw-medium fs-16 text-white">Cancel</button>
                  <button className="btn btn-primary py-2 px-4 fw-medium fs-16">
                    {' '}
                    <i className="ri-add-line text-white fw-medium"></i> Create
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default CreateCatandBrand;
