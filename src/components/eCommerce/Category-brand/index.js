'use client';

import Table from './table/table.js';
import { useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createCategory } from '@/features/categorySlice';
import { createBrand } from '@/features/brandSlice';

const CreateCatandBrand = () => {
  const dispatch = useDispatch();

  // -------------------------form

  const [category, setCategory] = useState({
    name: '',
    description: ''
  });

  const [brand, setBrand] = useState({
    name: '',
    description: ''
  });

  const handleCategory = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };
  const handleBrand = (e) => {
    const { name, value } = e.target;
    setBrand((prev) => ({ ...prev, [name]: value }));
  };

  const SubmitCategory = (e) => {
    e.preventDefault();
    dispatch(createCategory(category));
  };
  const SubmitBrand = (e) => {
    e.preventDefault();
    dispatch(createBrand(brand));
  };

  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <h3 className="p-3 ">Create Category</h3>
        <Card.Body className="p-4">
          <Form onSubmit={SubmitCategory}>
            <Row>
              <Col sm={6} lg={4}>
                <Form.Group className="mb-4">
                  <Form.Label className="label text-secondary">Category Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={category.name || ''}
                    onChange={handleCategory}
                    type="text"
                    className="h-55"
                    placeholder="Enter Category Name"
                  />
                </Form.Group>
              </Col>
              <Col sm={6} lg={4}>
                <Form.Group className="mb-4">
                  <Form.Label className="label text-secondary">Description</Form.Label>
                  <Form.Control
                    name="description"
                    value={category.description}
                    onChange={handleCategory}
                    type="text"
                    className="h-55"
                    placeholder="Enter Category Name"
                  />
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
          <Form onSubmit={SubmitBrand}>
            <Row>
              <Col sm={6} lg={4}>
                <Form.Group className="mb-4">
                  <Form.Label className="label text-secondary">Seller Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={brand.name}
                    onChange={handleBrand}
                    type="text"
                    className="h-55"
                    placeholder="Enter Seller Name"
                  />
                </Form.Group>
              </Col>

              <Col sm={6} lg={4}>
                <Form.Group className="mb-4">
                  <Form.Label className="label text-secondary">Description</Form.Label>
                  <Form.Control
                    name="description"
                    value={brand.description}
                    onChange={handleBrand}
                    type="text"
                    className="h-55"
                    placeholder="Enter description"
                  />
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
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <Table />
    </>
  );
};

export default CreateCatandBrand;
