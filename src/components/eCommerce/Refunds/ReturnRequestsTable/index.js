'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import {
  getAdminReturnRequests,
  getOrderById,
  updateReturnRequestStatus,
} from '@/features/API';

const STATUS_OPTIONS = [
  'pending',
  'approved',
  'rejected',
  'received',
  'refunded',
  'cancelled',
];

const STATUS_VARIANTS = {
  pending: 'warning',
  approved: 'success',
  rejected: 'danger',
  received: 'info',
  refunded: 'primary',
  cancelled: 'secondary',
};

const STATUS_LABELS = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  received: 'Received',
  refunded: 'Refunded',
  cancelled: 'Cancelled',
};

const REASON_LABELS = {
  damaged: 'Damaged product',
  wrong_item: 'Wrong item received',
  not_as_described: 'Product not as described',
  size_issue: 'Size / color issue',
  other: 'Other',
};

const API_ROOT = (
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
).replace(/\/api\/?$/, '');

const getRequestsFromPayload = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.requests)) return payload.requests;
  if (Array.isArray(payload?.returnRequests)) return payload.returnRequests;
  if (Array.isArray(payload?.data?.requests)) return payload.data.requests;
  if (Array.isArray(payload?.data)) return payload.data;

  return [];
};

const getOrderFromPayload = (payload) => {
  if (payload?.order) return payload.order;
  if (payload?.data?.order) return payload.data.order;
  if (payload?.data && typeof payload.data === 'object') return payload.data;

  return payload;
};

const getImageUrl = (image) => {
  if (!image) return '';

  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }

  return `${API_ROOT}${image.startsWith('/') ? image : `/${image}`}`;
};

const isObject = (value) => {
  return value && typeof value === 'object' && !Array.isArray(value);
};

const getRequestUser = (request) => {
  if (isObject(request?.user)) return request.user;
  if (isObject(request?.order?.user)) return request.order.user;

  return null;
};

const getCustomerName = (request) => {
  const user = getRequestUser(request);

  const fullName = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .join(' ')
    .trim();

  if (request?.order?.shippingAddress?.fullName) {
    return request.order.shippingAddress.fullName;
  }

  if (fullName) return fullName;
  if (user?.name) return user.name;
  if (user?.email) return user.email;

  return 'Unknown customer';
};

const getCustomerContact = (request) => {
  const user = getRequestUser(request);

  return (
    request?.order?.shippingAddress?.phone ||
    request?.order?.shippingAddress?.email ||
    user?.phone ||
    user?.email ||
    'No contact'
  );
};

const getOrderId = (request) => {
  return request?.orderId || request?.order?.orderId || request?.order?._id || '';
};

const getOrderTotal = (request) => {
  return Number(request?.order?.totalPrice || 0);
};

const getOrderDeliveryStatus = (request) => {
  return request?.order?.Delivery || request?.order?.deliveryStatus || 'N/A';
};

const getOrderPaymentStatus = (request) => {
  if (request?.order?.paymentMethod?.status) {
    return request.order.paymentMethod.status;
  }

  if (request?.order?.isPaid) {
    return 'paid';
  }

  return 'N/A';
};

const getOrderDate = (request) => {
  return request?.order?.createdAt || null;
};

const getReasonLabel = (reason) => {
  return REASON_LABELS[reason] || reason || 'N/A';
};

const formatCurrency = (amount) => {
  return `৳ ${Number(amount || 0).toLocaleString('en-BD')}`;
};

const formatDate = (date) => {
  if (!date) return 'N/A';

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'N/A';
  }

  return parsedDate.toLocaleDateString('en-BD', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const formatDateTime = (date) => {
  if (!date) return 'N/A';

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'N/A';
  }

  return parsedDate.toLocaleString('en-BD', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const StatusBadge = ({ status }) => {
  const normalizedStatus = String(status || 'pending').toLowerCase();

  return (
    <Badge
      bg={STATUS_VARIANTS[normalizedStatus] || 'secondary'}
      className="text-capitalize"
    >
      {STATUS_LABELS[normalizedStatus] || normalizedStatus}
    </Badge>
  );
};

const SummaryCard = ({ title, value }) => {
  return (
    <Col sm={6} xl={3}>
      <Card className="border-0 shadow-sm h-100">
        <Card.Body>
          <span className="text-muted small">{title}</span>
          <h4 className="mb-0 mt-1 fw-semibold">{value}</h4>
        </Card.Body>
      </Card>
    </Col>
  );
};

const ReturnRequestsTable = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOrderLoading, setModalOrderLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [statusDraft, setStatusDraft] = useState('pending');
  const [adminNoteDraft, setAdminNoteDraft] = useState('');

  const fetchReturnRequests = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccessMessage('');

      const payload = await getAdminReturnRequests();
      setRequests(getRequestsFromPayload(payload));
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Return requests could not be loaded.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReturnRequests();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, pageSize]);

  const stats = useMemo(() => {
    const total = requests.length;

    const pending = requests.filter(
      (request) => String(request?.status || '').toLowerCase() === 'pending'
    ).length;

    const inProgress = requests.filter((request) =>
      ['approved', 'received'].includes(
        String(request?.status || '').toLowerCase()
      )
    ).length;

    const closed = requests.filter((request) =>
      ['refunded', 'cancelled', 'rejected'].includes(
        String(request?.status || '').toLowerCase()
      )
    ).length;

    return {
      total,
      pending,
      inProgress,
      closed,
    };
  }, [requests]);

  const filteredRequests = useMemo(() => {
    const cleanSearch = search.trim().toLowerCase();

    return requests.filter((request) => {
      const status = String(request?.status || 'pending').toLowerCase();

      const searchableText = [
        request?._id,
        getOrderId(request),
        request?.reason,
        request?.note,
        request?.adminNote,
        getCustomerName(request),
        getCustomerContact(request),
        request?.order?.orderId,
        request?.order?._id,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const matchSearch = cleanSearch
        ? searchableText.includes(cleanSearch)
        : true;

      const matchStatus =
        statusFilter === 'all' ? true : status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [requests, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredRequests.length);
  const currentRequests = filteredRequests.slice(startIndex, endIndex);

  const selectedImages = Array.isArray(selectedRequest?.images)
    ? selectedRequest.images
    : [];

  const mergeRequestKeepingPopulatedData = (oldRequest, updatedRequest) => {
    const updatedUser =
      isObject(updatedRequest?.user) && updatedRequest.user._id
        ? updatedRequest.user
        : oldRequest?.user;

    const updatedOrder =
      isObject(updatedRequest?.order) && updatedRequest.order._id
        ? updatedRequest.order
        : oldRequest?.order;

    return {
      ...oldRequest,
      ...updatedRequest,
      user: updatedUser,
      order: updatedOrder,
    };
  };

  const hydrateRequestOrder = async (request) => {
    const hasOrderObject = isObject(request?.order) && request.order._id;
    const orderLookupId = getOrderId(request);

    if (hasOrderObject || !orderLookupId) {
      return request;
    }

    try {
      setModalOrderLoading(true);

      const payload = await getOrderById(orderLookupId);
      const order = getOrderFromPayload(payload);

      if (!order || !isObject(order)) {
        return request;
      }

      const hydratedRequest = {
        ...request,
        order,
      };

      setRequests((prev) =>
        prev.map((item) =>
          item._id === request._id
            ? {
                ...item,
                order,
              }
            : item
        )
      );

      return hydratedRequest;
    } catch (err) {
      return request;
    } finally {
      setModalOrderLoading(false);
    }
  };

  const openDetailsModal = async (request) => {
    setError('');
    setSuccessMessage('');
    setStatusDraft(request?.status || 'pending');
    setAdminNoteDraft(request?.adminNote || '');

    setSelectedRequest(request);

    const hydratedRequest = await hydrateRequestOrder(request);
    setSelectedRequest(hydratedRequest);
  };

  const closeDetailsModal = () => {
    if (updatingId) return;

    setSelectedRequest(null);
    setStatusDraft('pending');
    setAdminNoteDraft('');
    setModalOrderLoading(false);
  };

  const handleStatusUpdate = async () => {
    if (!selectedRequest?._id) return;

    try {
      setUpdatingId(selectedRequest._id);
      setError('');
      setSuccessMessage('');

      const payload = await updateReturnRequestStatus(selectedRequest._id, {
        status: statusDraft,
        adminNote: adminNoteDraft,
      });

      const updatedRequest = payload?.request || payload?.data || payload;

      const mergedSelectedRequest = mergeRequestKeepingPopulatedData(
        selectedRequest,
        {
          ...updatedRequest,
          status: updatedRequest?.status || statusDraft,
          adminNote:
            updatedRequest?.adminNote !== undefined
              ? updatedRequest.adminNote
              : adminNoteDraft,
        }
      );

      setRequests((prev) =>
        prev.map((request) =>
          request._id === selectedRequest._id
            ? mergeRequestKeepingPopulatedData(request, mergedSelectedRequest)
            : request
        )
      );

      setSelectedRequest(mergedSelectedRequest);
      setSuccessMessage('Return request status updated successfully.');
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Status update failed.'
      );
    } finally {
      setUpdatingId('');
    }
  };

  return (
    <>
      <Row className="g-3 mb-4">
        <SummaryCard title="Total Requests" value={stats.total} />
        <SummaryCard title="Pending" value={stats.pending} />
        <SummaryCard title="In Progress" value={stats.inProgress} />
        <SummaryCard title="Closed" value={stats.closed} />
      </Row>

      {error && (
        <Alert variant="danger" className="rounded-3">
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert variant="success" className="rounded-3">
          {successMessage}
        </Alert>
      )}

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
            <div>
              <h5 className="mb-1">Return Requests</h5>
              <p className="text-muted small mb-0">
                Manage customer return, refund and replacement requests.
              </p>
            </div>

            <div className="d-flex flex-column flex-md-row gap-2">
              <Form.Control
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search requests..."
                size="sm"
              />

              <Form.Select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                size="sm"
              >
                <option value="all">All Status</option>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {STATUS_LABELS[status] || status}
                  </option>
                ))}
              </Form.Select>

              <Form.Select
                value={pageSize}
                onChange={(event) => setPageSize(Number(event.target.value))}
                size="sm"
              >
                <option value={10}>10/page</option>
                <option value={20}>20/page</option>
                <option value={50}>50/page</option>
              </Form.Select>

              <Button
                variant="outline-primary"
                size="sm"
                onClick={fetchReturnRequests}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-1" />
                    Loading
                  </>
                ) : (
                  'Refresh'
                )}
              </Button>
            </div>
          </div>

          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead>
                <tr>
                  <th>Request</th>
                  <th>Customer</th>
                  <th>Reason</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <Spinner animation="border" size="sm" className="me-2" />
                      Loading return requests...
                    </td>
                  </tr>
                ) : currentRequests.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      No return request found.
                    </td>
                  </tr>
                ) : (
                  currentRequests.map((request) => {
                    const requestImages = Array.isArray(request?.images)
                      ? request.images
                      : [];

                    return (
                      <tr key={request._id}>
                        <td>
                          <div className="fw-semibold">
                            #{request?._id?.slice(-8) || 'N/A'}
                          </div>
                          <small className="text-muted">
                            {requestImages.length
                              ? `${requestImages.length} image attached`
                              : 'No image attached'}
                          </small>
                        </td>

                        <td>
                          <div className="fw-semibold">
                            {getCustomerName(request)}
                          </div>
                          <small className="text-muted">
                            {getCustomerContact(request)}
                          </small>
                        </td>

                        <td>
                          <div className="fw-semibold">
                            {getReasonLabel(request?.reason)}
                          </div>
                          <small className="text-muted d-inline-block text-truncate max-w-220">
                            {request?.note || 'No customer note'}
                          </small>
                        </td>

                        <td>
                          <div className="fw-semibold">
                            #{getOrderId(request) || 'N/A'}
                          </div>
                          <small className="text-muted">
                            {getOrderTotal(request)
                              ? formatCurrency(getOrderTotal(request))
                              : 'Order details not loaded'}
                          </small>
                        </td>

                        <td>
                          <StatusBadge status={request?.status} />
                        </td>

                        <td>
                          <div>{formatDate(request?.createdAt)}</div>
                          <small className="text-muted">
                            Updated: {formatDate(request?.updatedAt)}
                          </small>
                        </td>

                        <td className="text-end">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => openDetailsModal(request)}
                          >
                            Review
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </div>

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mt-4">
            <p className="text-muted small mb-0">
              Showing{' '}
              <strong>
                {filteredRequests.length ? startIndex + 1 : 0}-{endIndex}
              </strong>{' '}
              of <strong>{filteredRequests.length}</strong> requests
            </p>

            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                disabled={safePage <= 1}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              >
                Prev
              </Button>

              <Badge bg="light" text="dark" className="border">
                {safePage} / {totalPages}
              </Badge>

              <Button
                variant="outline-secondary"
                size="sm"
                disabled={safePage >= totalPages}
                onClick={() =>
                  setPage((prev) => Math.min(totalPages, prev + 1))
                }
              >
                Next
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal
        show={Boolean(selectedRequest)}
        onHide={closeDetailsModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Return Request Review</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedRequest && (
            <>
              {modalOrderLoading && (
                <Alert variant="info" className="rounded-3">
                  <Spinner animation="border" size="sm" className="me-2" />
                  Loading order details...
                </Alert>
              )}

              <Row className="g-4">
                <Col lg={6}>
                  <DetailBlock title="Request Information">
                    <InfoLine label="Request ID" value={selectedRequest._id} />
                    <InfoLine
                      label="Order ID"
                      value={getOrderId(selectedRequest)}
                    />
                    <InfoLine
                      label="Customer"
                      value={getCustomerName(selectedRequest)}
                    />
                    <InfoLine
                      label="Contact"
                      value={getCustomerContact(selectedRequest)}
                    />
                    <InfoLine
                      label="Submitted"
                      value={formatDateTime(selectedRequest.createdAt)}
                    />
                  </DetailBlock>

                  <DetailBlock title="Reason & Note" className="mt-4">
                    <InfoLine
                      label="Reason"
                      value={getReasonLabel(selectedRequest.reason)}
                    />

                    <div className="border rounded-3 p-3 mt-3">
                      {selectedRequest.note || 'No customer note provided.'}
                    </div>
                  </DetailBlock>
                </Col>

                <Col lg={6}>
                  <DetailBlock title="Order Snapshot">
                    <InfoLine
                      label="Order Total"
                      value={
                        getOrderTotal(selectedRequest)
                          ? formatCurrency(getOrderTotal(selectedRequest))
                          : 'N/A'
                      }
                    />
                    <InfoLine
                      label="Delivery"
                      value={getOrderDeliveryStatus(selectedRequest)}
                    />
                    <InfoLine
                      label="Payment"
                      value={getOrderPaymentStatus(selectedRequest)}
                    />
                    <InfoLine
                      label="Order Date"
                      value={formatDateTime(getOrderDate(selectedRequest))}
                    />
                  </DetailBlock>

                  <DetailBlock title="Admin Update" className="mt-4">
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        value={statusDraft}
                        onChange={(event) =>
                          setStatusDraft(event.target.value)
                        }
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {STATUS_LABELS[status] || status}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Admin Note</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={adminNoteDraft}
                        onChange={(event) =>
                          setAdminNoteDraft(event.target.value)
                        }
                        placeholder="Write admin note..."
                      />
                    </Form.Group>
                  </DetailBlock>
                </Col>

                <Col xs={12}>
                  <DetailBlock title="Uploaded Images">
                    {selectedImages.length ? (
                      <Row className="g-3">
                        {selectedImages.map((image, index) => (
                          <Col xs={6} md={3} key={`${image}-${index}`}>
                            <a
                              href={getImageUrl(image)}
                              target="_blank"
                              rel="noreferrer"
                              className="d-block"
                            >
                              <img
                                src={getImageUrl(image)}
                                alt={`Return evidence ${index + 1}`}
                                className="img-fluid rounded border"
                                style={{
                                  height: '140px',
                                  width: '100%',
                                  objectFit: 'cover',
                                }}
                              />
                            </a>
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <p className="text-muted mb-0">
                        No image uploaded by customer.
                      </p>
                    )}
                  </DetailBlock>
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={closeDetailsModal}
            disabled={Boolean(updatingId)}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            onClick={handleStatusUpdate}
            disabled={Boolean(updatingId)}
          >
            {updatingId ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Updating
              </>
            ) : (
              'Update Status'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .max-w-220 {
          max-width: 220px;
        }
      `}</style>
    </>
  );
};

const DetailBlock = ({ title, children, className = '' }) => {
  return (
    <div className={`border rounded-3 p-3 ${className}`}>
      <h6 className="mb-3">{title}</h6>
      {children}
    </div>
  );
};

const InfoLine = ({ label, value }) => {
  return (
    <div className="d-flex justify-content-between gap-3 py-2 border-bottom">
      <span className="text-muted small flex-shrink-0">{label}</span>
      <span className="small fw-semibold text-end text-break">
        {value || 'N/A'}
      </span>
    </div>
  );
};

export default ReturnRequestsTable;