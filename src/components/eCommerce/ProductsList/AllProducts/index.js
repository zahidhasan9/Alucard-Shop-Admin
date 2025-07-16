'use client';

import { Table, Modal, Button } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import Pagination from './Pagination';
import SearchForm from '../SearchForm';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct } from '@/features/productSlice';

const PublishedProducts = () => {
  const { products, page, total } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  //Pagination and search
  const [limit, setLimit] = useState(10);
  const totalPages = Math.ceil(total / limit);
  const [search, setSearch] = useState('');
  useEffect(() => {
    dispatch(
      getProducts({
        page,
        limit,
        search
      })
    );
  }, [dispatch, page, limit, search]);

  const handlePageChange = (newPage) => {
    dispatch(getProducts({ page: newPage, limit, search }));
  };

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
    if (deleteId) dispatch(deleteProduct(deleteId));
    setShowConfirm(false);
    setDeleteId(null);
  };

  // User canceled deletion
  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-lg-4 mb-3">
        <SearchForm searchTerm={search} onSearchChange={setSearch} />

        <Link
          href="/ecommerce/create-product/"
          className="btn btn-outline-primary py-1 px-2 px-sm-4 fs-14 fw-medium rounded-3 hover-bg"
        >
          <span className="py-sm-1 d-block">
            <i className="ri-add-line d-none d-sm-inline-block fs-18"></i>
            <span>Add New Product</span>
          </span>
        </Link>
      </div>

      <div className="default-table-area all-products">
        <div className="table-responsive">
          <Table className="align-middle">
            <thead>
              <tr>
                {/* <th scope="col">ID</th> */}
                <th scope="col">Product</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                {/* <th scope="col">Order</th> */}
                <th scope="col">Stock</th>
                {/* <th scope="col">Amount</th> */}
                <th scope="col">Rating</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {products?.map((item, i) => (
                <tr key={i}>
                  {/* <td>{item.slug}</td> */}

                  <td>
                    <Link href={'value.detailsLink'} className="d-flex align-items-center">
                      <Image src={item.thumbnail} className="wh-40 rounded-3" alt="product-1" width={40} height={40} />
                      <div className="ms-2 ps-1">
                        <h6 className="fw-medium fs-14">{item.name}</h6>
                        <span className="fs-12 text-body">
                          {new Date(item.createdAt).toLocaleString('en-BD', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </Link>
                  </td>

                  <td>{item.category?.name}</td>

                  <td>{item.price}</td>

                  {/* <td>{'item.order'}</td> */}

                  <td>{item.countInStock}</td>

                  {/* <td>{'item.amount'}</td> */}

                  <td>{item.rating}</td>

                  <td>
                    <span className={`badge bg-opacity-10 p-2 fs-12 fw-normal text-capitalize ${'item.status'}`}>
                      {'item.status'}
                    </span>
                  </td>

                  <td>
                    <div className="d-flex align-items-center gap-1">
                      <Link href={'item.ecommerce/edit-product/'}>
                        <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2">
                          <span className="material-symbols-outlined fs-16 text-primary">visibility</span>
                        </button>
                      </Link>
                      <Link href={`/ecommerce/edit-product/${item.slug}`}>
                        <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2">
                          <span className="material-symbols-outlined fs-16 text-body">edit</span>
                        </button>
                      </Link>

                      <button className="ps-0 border-0 bg-transparent lh-1 position-relative top-2">
                        <span
                          className="material-symbols-outlined text-danger fs-16"
                          onClick={() => handleDeleteClick(item._id)}
                        >
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

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

export default PublishedProducts;
