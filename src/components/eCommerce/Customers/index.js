"use client";

import React, { useState } from "react";
import { Card, Form, Table, Button, Offcanvas } from "react-bootstrap";
import SearchForm from "./SearchForm";
import Pagination from "./Pagination";
import Image from "next/image";

const customersData = [
  {
    id: "#JAN-854",
    customerImg: "/images/user-6.jpg",
    customerName: "Oliver Khan",
    email: "oliver@trezo.com",
    phone: "+1 555-123-4567",
    lastLogin: "10 Oct 2024",
    totalSpend: "$6,855.00",
    totalOrders: 125,
    status: "active",
  },
  {
    id: "#JAN-853",
    customerImg: "/images/user-7.jpg",
    customerName: "Carolyn Barnes",
    email: "carolyn@trezo.com",
    phone: "+1 555-987-6543",
    lastLogin: "11 Sep 2024",
    totalSpend: "$2,800.00",
    totalOrders: 99,
    status: "active",
  },
  {
    id: "#JAN-852",
    customerImg: "/images/user-8.jpg",
    customerName: "Donna Miller",
    email: "donna@trezo.com",
    phone: "+1 555-456-7890",
    lastLogin: "12 Aug 2024",
    totalSpend: "$258.00",
    totalOrders: 145,
    status: "active",
  },
  {
    id: "#JAN-851",
    customerImg: "/images/user-9.jpg",
    customerName: "Barbara Cross",
    email: "barbara@trezo.com",
    phone: "+1 555-369-7878",
    lastLogin: "13 Jul 2024",
    totalSpend: "$3,890.00",
    totalOrders: 279,
    status: "active",
  },
  {
    id: "#JAN-850",
    customerImg: "/images/user-10.jpg",
    customerName: "Rebecca Block",
    email: "rebecca@trezo.com",
    phone: "+1 555-658-4488",
    lastLogin: "14 Jun 2024",
    totalSpend: "$2,500.00",
    totalOrders: 169,
    status: "deactive",
  },
  {
    id: "#JAN-849",
    customerImg: "/images/user-11.jpg",
    customerName: "Ramiro McCarty",
    email: "ramiro@trezo.com",
    phone: "+1 555-558-9966",
    lastLogin: "15 May 2024",
    totalSpend: "$8,200.00",
    totalOrders: 46,
    status: "active",
  },
  {
    id: "#JAN-848",
    customerImg: "/images/user-12.jpg",
    customerName: "Robert Fairweather",
    email: "robert@trezo.com",
    phone: "+1 555-357-5888",
    lastLogin: "16 Apr 2024",
    totalSpend: "$640.00",
    totalOrders: 184,
    status: "active",
  },
  {
    id: "#JAN-847",
    customerImg: "/images/user-13.jpg",
    customerName: "Marcelino Haddock",
    email: "marcelino@trezo.com",
    phone: "+1 555-456-8877",
    lastLogin: "17 Mar 2024",
    totalSpend: "$9,100.00",
    totalOrders: 166,
    status: "active",
  },
  {
    id: "#JAN-846",
    customerImg: "/images/user-14.jpg",
    customerName: "Thomas Wilson",
    email: "thomas@trezo.com",
    phone: "+1 555-622-4488",
    lastLogin: "18 Feb 2024",
    totalSpend: "$7,300.00",
    totalOrders: 75,
    status: "active",
  },
  {
    id: "#JAN-845",
    customerImg: "/images/user-15.jpg",
    customerName: "Nathaniel Hulsey",
    email: "nathaniel@trezo.com",
    phone: "+1 555-225-4488",
    lastLogin: "19 Jan 2024",
    totalSpend: "$6,600.00",
    totalOrders: 55,
    status: "deactive",
  },
];

const Customers = () => {
  // Modal
  const [isShowModal, setShowModal] = useState("false");
  const handleToggleShowModal = () => {
    setShowModal(!isShowModal);
  };

  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-0">
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <SearchForm />

              <div className="text-end">
                <button
                  className="btn btn-outline-primary py-1 px-2 px-sm-4 fs-14 fw-medium rounded-3 hover-bg"
                  onClick={handleToggleShowModal}
                >
                  <span className="py-sm-1 d-block">
                    <i className="ri-add-line"></i>
                    <span>Add New Customer</span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="default-table-area style-two default-table-width">
            <div className="table-responsive">
              <Table className="align-middle">
                <thead>
                  <tr>
                    <th scope="col">
                      <Form>
                        <Form.Check
                          type="checkbox"
                          id="default-checkbox"
                          label="ID"
                          className="fw-medium"
                        />
                      </Form>
                    </th>
                    <th scope="col">Customer</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Last Login</th>
                    <th scope="col">Total Spend</th>
                    <th scope="col">Total Orders</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {customersData &&
                    customersData.slice(0, 10).map((defaultValue, i) => (
                      <tr key={i}>
                        <td className="text-body">
                          <Form>
                            <Form.Check
                              type="checkbox"
                              id="default-checkbox"
                              label={defaultValue.id}
                              className="fw-medium fs-14"
                            />
                          </Form>
                        </td>

                        <td>
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <Image
                                src={defaultValue.customerImg}
                                className="wh-34 rounded-circle"
                                alt="user"
                                width={34}
                                height={34}
                              />
                            </div>
                            <div className="flex-grow-1 ms-2 position-relative top-1">
                              <h6 className="mb-0 fs-14 fw-medium">
                                {defaultValue.customerName}
                              </h6>
                            </div>
                          </div>
                        </td>

                        <td className="text-body">{defaultValue.email}</td>

                        <td>{defaultValue.phone}</td>

                        <td className="text-body">{defaultValue.lastLogin}</td>

                        <td className="text-body">{defaultValue.totalSpend}</td>

                        <td className="text-body">
                          {defaultValue.totalOrders}
                        </td>

                        <td>
                          <span
                            className={`badge bg-opacity-10 p-2 fs-12 fw-normal text-capitalize ${defaultValue.status}`}
                          >
                            {defaultValue.status}
                          </span>
                        </td>

                        <td>
                          <div className="d-flex align-items-center gap-1">
                            <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2">
                              <span className="material-symbols-outlined fs-16 text-primary">
                                visibility
                              </span>
                            </button>

                            <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2">
                              <span className="material-symbols-outlined fs-16 text-body">
                                edit
                              </span>
                            </button>

                            <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2">
                              <span className="material-symbols-outlined fs-16 text-danger">
                                delete
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>

              {/* Pagination */}
              <Pagination />
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Modal */}
      <div className={`custom-modal right ${isShowModal ? "" : "show"}`}>
        <div className="custom-modal-content position-relative z-3">
          <div className="border-bottom py-3 px-4 d-flex align-items-center justify-content-between">
            <h3 className="fs-18 mb-0">Add New Customer</h3>

            <div className="close-link" onClick={handleToggleShowModal}>
              <span className="material-symbols-outlined">close</span>
            </div>
          </div>

          <div className="p-4">
            <Form>
              <Form.Group className="mb-4">
                <Form.Label className="label">ID</Form.Label>
                <Form.Control
                  type="text"
                  className="text-dark"
                  placeholder="ID"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  className="text-dark"
                  placeholder="Customer Name"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Email</Form.Label>
                <Form.Control
                  type="email"
                  className="text-dark"
                  placeholder="Email"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Phone</Form.Label>
                <Form.Control type="text" className="text-dark" />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Total Spend</Form.Label>
                <Form.Control type="text" className="text-dark" />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Total Orders</Form.Label>
                <Form.Control type="text" className="text-dark" />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Status</Form.Label>
                <Form.Select
                  className="form-control text-dark"
                  aria-label="Default select example"
                >
                  <option>Select</option>
                  <option defaultValue="0">Active</option>
                  <option defaultValue="1">Deactive</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Action</Form.Label>
                <Form.Select
                  className="form-control text-dark"
                  aria-label="Default select example"
                >
                  <option>Select</option>
                  <option defaultValue="0">Yes</option>
                  <option defaultValue="1">No</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="d-flex gap-3">
                <Button
                  variant="primary"
                  type="submit"
                  className="text-white fw-semibold py-2 px-2 px-sm-3"
                >
                  <span className="py-sm-1 d-block">
                    <i className="ri-add-line text-white"></i>{" "}
                    <span>Create New Customer</span>
                  </span>
                </Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customers;
