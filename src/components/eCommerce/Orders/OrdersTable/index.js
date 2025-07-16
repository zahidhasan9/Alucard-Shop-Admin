'use client';

import { Card, Modal, Table, Button } from 'react-bootstrap';
import Link from 'next/link';
import Pagination from './Pagination';
import SearchForm from './SearchForm';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, deleteOrder } from '@/features/OrderSlice';

const OrdersTable = () => {
  const { orders, total, maxLimit } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const skip = (page - 1) * maxLimit;

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(fetchAllOrders({ skip, limit: maxLimit, search }));
  }, [dispatch, skip, maxLimit, search]);

  // Delete‑confirmation modal state
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  // Show confirmation modal first
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  // User confirmed deletion
  const confirmDelete = () => {
    if (deleteId) dispatch(deleteOrder(deleteId));

    setShowConfirm(false);
    setDeleteId(null);
    setTimeout(() => {
      dispatch(fetchAllOrders({ skip, limit: maxLimit, search }));
    }, 1000);
  };

  // User canceled deletion
  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  };

  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-lg-4 mb-3">
            <SearchForm searchTerm={search} onSearchChange={setSearch} />

            <Link href="#" className="btn btn-outline-primary py-1 px-2 px-sm-4 fs-14 fw-medium rounded-3 hover-bg">
              <span className="py-sm-1 d-block">
                <i className="ri-add-line d-none d-sm-inline-block fs-18"></i>
                <span>Add New Order</span>
              </span>
            </Link>
          </div>

          <div className="default-table-area ec-recent-orders">
            <div className="table-responsive">
              <Table className="align-middle">
                <thead>
                  <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Items</th>
                    <th scope="col">Created</th>
                    <th scope="col">Total</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders &&
                    orders?.map((value, i) => (
                      <tr key={i}>
                        <td>{value.orderId}</td>

                        <td>
                          <div className="d-flex align-items-center">
                            <div className="ms-2 ps-1">
                              <h6 className="fw-medium fs-14 m-0">{value?.user?.firstName}</h6>
                            </div>
                          </div>
                        </td>

                        <td>{value?.orderItems?.length}</td>

                        <td>
                          {new Date(value.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </td>

                        <td>{value.totalPrice} tk</td>

                        <td>
                          {/* 'confirmed', 'pending', 'shipped'  use in class for change bg */}
                          <span className={`badge bg-opacity-10 p-2 fs-12 fw-normal text-capitalize ${value.Delivery}`}>
                            {value.Delivery}
                          </span>
                        </td>

                        <td>
                          <div className="d-flex align-items-center gap-1">
                            <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2">
                              <span className="material-symbols-outlined fs-16 text-primary">visibility</span>
                            </button>

                            <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2">
                              <span className="material-symbols-outlined fs-16 text-body">edit</span>
                            </button>

                            <button
                              onClick={() => handleDeleteClick(value.orderId)}
                              className="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
                            >
                              <span className="material-symbols-outlined fs-16 text-danger">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>

            {/* Pagination */}
            <Pagination currentPage={page} totalItems={total} itemsPerPage={maxLimit} onPageChange={handlePageChange} />
          </div>
        </Card.Body>
      </Card>
      {/* Confirm‑delete modal */}
      <Modal show={showConfirm} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrdersTable;
