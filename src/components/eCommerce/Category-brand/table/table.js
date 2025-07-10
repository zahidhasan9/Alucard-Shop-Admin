'use client';

import { Card, Alert, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, deleteCategory } from '@/features/categorySlice';
import { getAllBrands, deleteBrand } from '@/features/brandSlice';

const RecentLeads = () => {
  const { categories } = useSelector((state) => state.category);
  const { Brands } = useSelector((state) => state.brand);
  const dispatch = useDispatch();

  // State to control confirmation alert visibility
  const [showConfirm, setShowConfirm] = useState(false);
  // Store id to delete and type ('category' or 'brand')
  const [deleteTarget, setDeleteTarget] = useState({ id: null, type: null });
  // Show success alert
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllCategories());
  }, [dispatch]);

  // When delete button clicked: open confirm alert
  const handleDeleteClick = (id, type) => {
    setDeleteTarget({ id, type });
    setShowConfirm(true);
  };

  // Confirm delete action
  const confirmDelete = () => {
    if (deleteTarget.type === 'category') {
      dispatch(deleteCategory(deleteTarget.id));
      setSuccessMessage('Category deleted successfully!');
    } else if (deleteTarget.type === 'brand') {
      dispatch(deleteBrand(deleteTarget.id));
      setSuccessMessage('Brand deleted successfully!');
    }

    setShowConfirm(false);
    setShowSuccess(true);
    setDeleteTarget({ id: null, type: null });

    // Hide success alert after 3 sec
    setTimeout(() => {
      setShowSuccess(false);
      dispatch(getAllBrands());
      dispatch(getAllCategories());
    }, 3000);
  };

  return (
    <>
      {/* Success Alert */}
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          <i className="ri-check-line me-2"></i>
          {successMessage}
        </Alert>
      )}

      {/* Confirmation Alert */}
      {showConfirm && (
        <Alert variant="danger" className="d-flex justify-content-between align-items-center">
          <div>
            <i className="ri-alert-line me-2"></i>
            Are you sure you want to delete this {deleteTarget.type}?
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-secondary" onClick={() => setShowConfirm(false)}>
              Cancel
            </button>
            <button className="btn btn-sm btn-danger" onClick={confirmDelete}>
              Delete
            </button>
          </div>
        </Alert>
      )}

      {/* Categories Table */}
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-0">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 p-4">
            <h3 className="mb-0">View All Categories</h3>
          </div>
          <div className="default-table-area style-two recent-leads">
            <div className="table-responsive">
              <Table className="align-middle">
                <thead>
                  <tr>
                    <th scope="col">Category Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories && categories.length > 0 ? (
                    categories.map((cat) => (
                      <tr key={cat._id}>
                        <td>{cat.name}</td>
                        <td>{cat.description}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteClick(cat.slug, 'category')}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center">
                        No categories found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Brands Table */}
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-0">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 p-4">
            <h3 className="mb-0">View All Brands</h3>
          </div>
          <div className="default-table-area style-two recent-leads">
            <div className="table-responsive">
              <Table className="align-middle">
                <thead>
                  <tr>
                    <th scope="col">Brand Name</th>
                    <th scope="col">|</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Brands && Brands.length > 0 ? (
                    Brands.map((brand) => (
                      <tr key={brand._id}>
                        <td>{brand.name}</td>
                        <td>{'|'}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteClick(brand.slug, 'brand')}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center">
                        No brands found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default RecentLeads;
