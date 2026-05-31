'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Card,
  Form,
  Table,
  Button,
  Badge,
  Spinner,
  Alert,
  Row,
  Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCustomers,
  fetchCustomerById,
  updateCustomerByAdmin,
  deleteCustomerByAdmin,
} from '@/features/userSlice';

const Customers = () => {
  const dispatch = useDispatch();

  const {
    users,
    customer,
    customerOrders,
    customerSummary,
    customerStats,
    pagination,
    loading,
    error,
  } = useSelector((state) => state.user);

  const [hasMounted, setHasMounted] = useState(false);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [role, setRole] = useState('user');
  const [page, setPage] = useState(1);

  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'user',
    isActive: true,
  });

  const limit = 10;
  const customers = Array.isArray(users) ? users : [];

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const selectedListCustomer = useMemo(() => {
    if (!selectedCustomerId) return null;
    return customers.find((item) => item._id === selectedCustomerId) || null;
  }, [customers, selectedCustomerId]);

  const activeCustomer = useMemo(() => {
    if (customer?._id === selectedCustomerId) return customer;
    return selectedListCustomer;
  }, [customer, selectedCustomerId, selectedListCustomer]);

  const refreshCustomers = () => {
    dispatch(
      fetchCustomers({
        page,
        limit,
        search,
        status,
        role,
      })
    );
  };

  useEffect(() => {
    if (!hasMounted) return;

    const timer = setTimeout(() => {
      dispatch(
        fetchCustomers({
          page,
          limit,
          search,
          status,
          role,
        })
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [dispatch, hasMounted, page, limit, search, status, role]);

  useEffect(() => {
    if (!activeCustomer) return;

    setFormData({
      firstName: activeCustomer.firstName || '',
      lastName: activeCustomer.lastName || '',
      email: activeCustomer.email || '',
      phone:
        activeCustomer.phone ||
        activeCustomer.displayPhone ||
        activeCustomer.lastShippingPhone ||
        activeCustomer.lastManualPaymentPhone ||
        '',
      role: activeCustomer.role || 'user',
      isActive: activeCustomer.isActive !== false,
    });
  }, [activeCustomer]);

  const localStats = useMemo(() => {
    return {
      total: customerStats?.total || customers.length || 0,
      active:
        customerStats?.active ??
        customers.filter((item) => item.isActive).length ??
        0,
      inactive:
        customerStats?.inactive ??
        customers.filter((item) => !item.isActive).length ??
        0,
      totalSpend: customers.reduce(
        (sum, item) => sum + Number(item.totalSpend || 0),
        0
      ),
    };
  }, [customerStats, customers]);

  const formatDate = (date) => {
    if (!date) return 'N/A';

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Dhaka',
    }).format(new Date(date));
  };

  const formatMoney = (amount) => {
    return `${Number(amount || 0).toLocaleString('en-BD')} tk`;
  };

  const getInitials = (item) => {
    const first = item?.firstName?.[0] || '';
    const last = item?.lastName?.[0] || '';
    return `${first}${last}`.toUpperCase() || 'U';
  };

  const getCustomerName = (item) => {
    const name =
      item?.fullName ||
      `${item?.firstName || ''} ${item?.lastName || ''}`.trim();

    return name || 'Unknown Customer';
  };

  const getCustomerPhone = (item) => {
    return (
      item?.displayPhone ||
      item?.phone ||
      item?.lastShippingPhone ||
      item?.lastManualPaymentPhone ||
      'No phone'
    );
  };

  const openCustomerDrawer = (id) => {
    setSelectedCustomerId(id);
    setShowDrawer(true);
    dispatch(fetchCustomerById(id));
  };

  const closeCustomerDrawer = () => {
    setShowDrawer(false);
    setSelectedCustomerId(null);
  };

  const handleUpdateCustomer = (e) => {
    e.preventDefault();

    if (!selectedCustomerId) return;

    dispatch(
      updateCustomerByAdmin({
        id: selectedCustomerId,
        payload: formData,
      })
    ).then(() => {
      refreshCustomers();
    });
  };

  const handleDeleteCustomer = (id) => {
    const confirmed = window.confirm(
      'Are you sure? If this customer has order history, the account will be deactivated instead of deleted.'
    );

    if (!confirmed) return;

    dispatch(deleteCustomerByAdmin(id)).then(() => {
      refreshCustomers();

      if (selectedCustomerId === id) {
        closeCustomerDrawer();
      }
    });
  };

  const handleStatusQuickToggle = (item) => {
    dispatch(
      updateCustomerByAdmin({
        id: item._id,
        payload: {
          isActive: !item.isActive,
        },
      })
    ).then(() => {
      refreshCustomers();
    });
  };

  if (!hasMounted) {
    return (
      <Card className="border-0 rounded-3 bg-white">
        <Card.Body className="p-5 text-center">
          <Spinner animation="border" />
          <p className="text-muted mt-3 mb-0">Loading customer panel...</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Row className="g-4 mb-4">
        <Col sm={6} xl={3}>
          <Card className="customer-stat-card border-0 rounded-4 bg-white h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted d-block mb-1">
                    Total Customers
                  </span>
                  <h3 className="mb-0">{localStats.total}</h3>
                </div>

                <div className="customer-stat-icon bg-primary bg-opacity-10 text-primary">
                  <i className="ri-user-line"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="customer-stat-card border-0 rounded-4 bg-white h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted d-block mb-1">
                    Active Customers
                  </span>
                  <h3 className="mb-0 text-success">{localStats.active}</h3>
                </div>

                <div className="customer-stat-icon bg-success bg-opacity-10 text-success">
                  <i className="ri-user-follow-line"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="customer-stat-card border-0 rounded-4 bg-white h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted d-block mb-1">Deactivated</span>
                  <h3 className="mb-0 text-danger">{localStats.inactive}</h3>
                </div>

                <div className="customer-stat-icon bg-danger bg-opacity-10 text-danger">
                  <i className="ri-user-forbid-line"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="customer-stat-card border-0 rounded-4 bg-white h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted d-block mb-1">
                    Visible Page Spend
                  </span>
                  <h3 className="mb-0">{formatMoney(localStats.totalSpend)}</h3>
                </div>

                <div className="customer-stat-icon bg-warning bg-opacity-10 text-warning">
                  <i className="ri-money-dollar-circle-line"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="bg-white border-0 rounded-4 mb-4 customer-main-card">
        <Card.Body className="p-0">
          <div className="p-4 border-bottom">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <h3 className="mb-1">Customer Control</h3>
                <p className="text-muted mb-0">
                  Manage website users, account status, roles, and order value.
                </p>
              </div>

              <Button
                variant="outline-primary"
                className="rounded-3"
                onClick={refreshCustomers}
                disabled={loading}
              >
                <i className="ri-refresh-line me-1"></i>
                Refresh
              </Button>
            </div>

            <Row className="g-3 mt-3">
              <Col lg={6}>
                <Form.Control
                  type="search"
                  placeholder="Search by name, email, or phone..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="h-55 rounded-3"
                />
              </Col>

              <Col sm={6} lg={3}>
                <Form.Select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setPage(1);
                  }}
                  className="h-55 rounded-3"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Deactivated</option>
                </Form.Select>
              </Col>

              <Col sm={6} lg={3}>
                <Form.Select
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    setPage(1);
                  }}
                  className="h-55 rounded-3"
                >
                  <option value="user">Customers Only</option>
                  <option value="admin">Admins Only</option>
                  <option value="all">All Roles</option>
                </Form.Select>
              </Col>
            </Row>
          </div>

          {error && (
            <Alert variant="danger" className="mx-4 mt-4 mb-0">
              {error}
            </Alert>
          )}

          <div className="default-table-area style-two default-table-width">
            <div className="table-responsive">
              <Table className="align-middle customer-table mb-0">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Email / Phone</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Total Orders</th>
                    <th>Total Spend</th>
                    <th>Last Order</th>
                    <th>Last Login</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {loading && customers.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center py-5">
                        <Spinner animation="border" />
                        <p className="text-muted mt-3 mb-0">
                          Loading customers...
                        </p>
                      </td>
                    </tr>
                  ) : customers.length > 0 ? (
                    customers.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="customer-avatar">
                              {getInitials(item)}
                            </div>

                            <div className="ms-2">
                              <h6 className="mb-0 fs-14 fw-semibold">
                                {getCustomerName(item)}
                              </h6>
                              <small className="text-muted">
                                Joined: {formatDate(item.createdAt)}
                              </small>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="d-block text-body">
                            {item.email || 'N/A'}
                          </span>

                          <small className="text-muted">
                            {getCustomerPhone(item)}
                          </small>
                        </td>

                        <td>
                          <Badge
                            bg={item.role === 'admin' ? 'primary' : 'secondary'}
                            className="text-capitalize p-2"
                          >
                            {item.role || 'user'}
                          </Badge>
                        </td>

                        <td>
                          <Badge
                            bg={item.isActive ? 'success' : 'danger'}
                            className="p-2"
                          >
                            {item.isActive ? 'Active' : 'Deactivated'}
                          </Badge>
                        </td>

                        <td>{item.totalOrders || 0}</td>

                        <td>{formatMoney(item.totalSpend)}</td>

                        <td>{formatDate(item.lastOrderAt)}</td>

                        <td>{formatDate(item.lastLogin)}</td>

                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <button
                              type="button"
                              className="customer-action-btn text-primary"
                              onClick={() => openCustomerDrawer(item._id)}
                              title="View / Edit"
                            >
                              <span className="material-symbols-outlined fs-18">
                                visibility
                              </span>
                            </button>

                            <button
                              type="button"
                              className={`customer-action-btn ${
                                item.isActive ? 'text-warning' : 'text-success'
                              }`}
                              onClick={() => handleStatusQuickToggle(item)}
                              title={
                                item.isActive
                                  ? 'Deactivate customer'
                                  : 'Activate customer'
                              }
                            >
                              <span className="material-symbols-outlined fs-18">
                                {item.isActive ? 'block' : 'check_circle'}
                              </span>
                            </button>

                            <button
                              type="button"
                              className="customer-action-btn text-danger"
                              onClick={() => handleDeleteCustomer(item._id)}
                              title="Delete / deactivate"
                            >
                              <span className="material-symbols-outlined fs-18">
                                delete
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center text-muted py-5">
                        No customers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 p-4 border-top">
              <span className="text-muted">
                Page {pagination?.page || page} of {pagination?.pages || 1} ·
                Total {pagination?.total || 0}
              </span>

              <div className="d-flex gap-2">
                <Button
                  variant="light"
                  className="border rounded-3"
                  disabled={page <= 1 || loading}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                >
                  Previous
                </Button>

                <Button
                  variant="light"
                  className="border rounded-3"
                  disabled={
                    loading ||
                    page >= Number(pagination?.pages || 1) ||
                    customers.length === 0
                  }
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {showDrawer && (
        <button
          type="button"
          className="customer-drawer-backdrop"
          onClick={closeCustomerDrawer}
          aria-label="Close customer drawer"
        />
      )}

      <aside
        className={`customer-drawer ${showDrawer ? 'show' : ''}`}
        aria-hidden={!showDrawer}
      >
        <div className="customer-drawer-header">
          <div>
            <h5 className="mb-1">Customer Details</h5>
            <small className="text-muted">View and control customer account</small>
          </div>

          <button
            type="button"
            className="btn-close"
            onClick={closeCustomerDrawer}
            aria-label="Close"
          ></button>
        </div>

        <div className="customer-drawer-body">
          {loading && !activeCustomer ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
              <p className="text-muted mt-3 mb-0">Loading customer...</p>
            </div>
          ) : activeCustomer ? (
            <>
              <Card className="border-0 bg-light rounded-4 mb-4">
                <Card.Body>
                  <div className="d-flex align-items-center gap-3">
                    <div className="customer-avatar customer-avatar-lg">
                      {getInitials(activeCustomer)}
                    </div>

                    <div>
                      <h5 className="mb-1">{getCustomerName(activeCustomer)}</h5>
                      <p className="text-muted mb-1">
                        {activeCustomer.email || 'N/A'}
                      </p>
                      <p className="text-muted mb-0">
                        {getCustomerPhone(activeCustomer)}
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              <Row className="g-3 mb-4">
                <Col xs={6}>
                  <Card className="border rounded-4 h-100">
                    <Card.Body className="p-3">
                      <span className="text-muted d-block">Orders</span>
                      <h5 className="mb-0">
                        {customerSummary?.totalOrders ||
                          activeCustomer?.totalOrders ||
                          0}
                      </h5>
                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={6}>
                  <Card className="border rounded-4 h-100">
                    <Card.Body className="p-3">
                      <span className="text-muted d-block">Spend</span>
                      <h5 className="mb-0">
                        {formatMoney(
                          customerSummary?.totalSpend ||
                            activeCustomer?.totalSpend ||
                            0
                        )}
                      </h5>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Form onSubmit={handleUpdateCustomer}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.firstName}
                        className="rounded-3"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.lastName}
                        className="rounded-3"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    className="rounded-3"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.phone}
                    placeholder="Enter customer phone number"
                    className="rounded-3"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    value={formData.role}
                    className="rounded-3"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value,
                      })
                    }
                  >
                    <option value="user">User / Customer</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Check
                    type="switch"
                    id="customer-active-switch"
                    label={
                      formData.isActive
                        ? 'Customer account is active'
                        : 'Customer account is deactivated'
                    }
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isActive: e.target.checked,
                      })
                    }
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 rounded-3"
                  disabled={loading || !selectedCustomerId}
                >
                  Save Customer
                </Button>
              </Form>

              <hr />

              <h5 className="mb-3">Recent Orders</h5>

              {customerOrders?.length > 0 ? (
                customerOrders.slice(0, 5).map((order) => (
                  <div
                    key={order._id}
                    className="border rounded-4 p-3 mb-3 bg-white"
                  >
                    <div className="d-flex justify-content-between gap-2">
                      <strong>#{order.orderId}</strong>

                      <Badge
                        bg={order.isPaid ? 'success' : 'warning'}
                        text={order.isPaid ? 'white' : 'dark'}
                      >
                        {order.isPaid ? 'Paid' : 'Unpaid'}
                      </Badge>
                    </div>

                    <small className="text-muted d-block mt-1">
                      {formatDate(order.createdAt)}
                    </small>

                    <div className="d-flex justify-content-between mt-2">
                      <span>Status: {order.Delivery || 'N/A'}</span>
                      <strong>{formatMoney(order.totalPrice)}</strong>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted mb-0">No recent orders found.</p>
              )}
            </>
          ) : (
            <Alert variant="warning">No customer selected.</Alert>
          )}
        </div>
      </aside>
    </>
  );
};

export default Customers;