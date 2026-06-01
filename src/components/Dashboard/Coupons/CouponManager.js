"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Form,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import {
  createCoupon,
  deleteCoupon,
  getCoupons,
  seedDefaultCoupons,
  updateCoupon,
} from "@/features/API";

const emptyForm = {
  code: "",
  type: "percent",
  value: 0,
  minOrder: 0,
  maxDiscount: 0,
  usageLimit: 0,
  perUserLimit: 1,
  startsAt: "",
  expiresAt: "",
  isActive: true,
};

const formatDateInput = (value) => {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
};

const CouponManager = () => {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const totalUsed = useMemo(() => {
    return coupons.reduce((sum, coupon) => sum + Number(coupon.usedCount || 0), 0);
  }, [coupons]);

  const activeCoupons = useMemo(() => {
    return coupons.filter((coupon) => coupon.isActive).length;
  }, [coupons]);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCoupons();
      setCoupons(Array.isArray(response.data) ? response.data : response.data?.coupons || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Coupon fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        ...form,
        code: String(form.code || "").trim().toUpperCase(),
        value: Number(form.value || 0),
        minOrder: Number(form.minOrder || 0),
        maxDiscount: Number(form.maxDiscount || 0),
        usageLimit: Number(form.usageLimit || 0),
        perUserLimit: Number(form.perUserLimit || 1),
        startsAt: form.startsAt || null,
        expiresAt: form.expiresAt || null,
        isActive: Boolean(form.isActive),
      };

      if (!payload.code) {
        setError("Coupon code is required");
        return;
      }

      if (payload.type !== "shipping" && payload.value <= 0) {
        setError("Coupon value must be greater than 0");
        return;
      }

      if (editingId) {
        await updateCoupon(editingId, payload);
        setSuccess("Coupon updated successfully");
      } else {
        await createCoupon(payload);
        setSuccess("Coupon created successfully");
      }

      resetForm();
      fetchCoupons();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Coupon save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (coupon) => {
    setEditingId(coupon._id);

    setForm({
      code: coupon.code || "",
      type: coupon.type || "percent",
      value: Number(coupon.value || 0),
      minOrder: Number(coupon.minOrder || 0),
      maxDiscount: Number(coupon.maxDiscount || 0),
      usageLimit: Number(coupon.usageLimit || 0),
      perUserLimit: Number(coupon.perUserLimit || 1),
      startsAt: formatDateInput(coupon.startsAt),
      expiresAt: formatDateInput(coupon.expiresAt),
      isActive: Boolean(coupon.isActive),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this coupon?");

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await deleteCoupon(id);
      setSuccess("Coupon deleted successfully");
      fetchCoupons();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Coupon delete failed");
    }
  };

  const handleSeedCoupons = async () => {
    try {
      setSeeding(true);
      setError("");
      setSuccess("");

      await seedDefaultCoupons();
      setSuccess("Default coupons seeded successfully");
      fetchCoupons();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Default coupon seed failed");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="mb-1 fw-bold">Coupon Management</h2>
          <p className="mb-0 text-secondary">
            Create, update and monitor discount coupons.
          </p>
        </div>

        <Button
          variant="outline-primary"
          onClick={handleSeedCoupons}
          disabled={seeding}
        >
          {seeding ? "Seeding..." : "Seed Default Coupons"}
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row className="g-4 mb-4">
        <Col lg={4} md={6}>
          <Card className="border-0 shadow-sm rounded-3">
            <Card.Body>
              <span className="text-secondary small">Total Coupons</span>
              <h3 className="fw-bold mt-2 mb-0">{coupons.length}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} md={6}>
          <Card className="border-0 shadow-sm rounded-3">
            <Card.Body>
              <span className="text-secondary small">Active Coupons</span>
              <h3 className="fw-bold mt-2 mb-0">{activeCoupons}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} md={6}>
          <Card className="border-0 shadow-sm rounded-3">
            <Card.Body>
              <span className="text-secondary small">Total Coupon Usage</span>
              <h3 className="fw-bold mt-2 mb-0">{totalUsed}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col xl={4} lg={5}>
          <Card className="border-0 shadow-sm rounded-3">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3">
                {editingId ? "Update Coupon" : "Create Coupon"}
              </h5>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Coupon Code</Form.Label>
                  <Form.Control
                    name="code"
                    value={form.code}
                    onChange={handleChange}
                    placeholder="SAVE10"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Coupon Type</Form.Label>
                  <Form.Select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                  >
                    <option value="percent">Percentage Discount</option>
                    <option value="fixed">Fixed Discount</option>
                    <option value="shipping">Free Shipping</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Value {form.type === "percent" ? "(%)" : "(৳)"}
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="value"
                    value={form.value}
                    onChange={handleChange}
                    disabled={form.type === "shipping"}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Minimum Order</Form.Label>
                      <Form.Control
                        type="number"
                        name="minOrder"
                        value={form.minOrder}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Max Discount</Form.Label>
                      <Form.Control
                        type="number"
                        name="maxDiscount"
                        value={form.maxDiscount}
                        onChange={handleChange}
                        disabled={form.type !== "percent"}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Usage Limit</Form.Label>
                      <Form.Control
                        type="number"
                        name="usageLimit"
                        value={form.usageLimit}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Per User Limit</Form.Label>
                      <Form.Control
                        type="number"
                        name="perUserLimit"
                        value={form.perUserLimit}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Starts At</Form.Label>
                      <Form.Control
                        type="date"
                        name="startsAt"
                        value={form.startsAt}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Expires At</Form.Label>
                      <Form.Control
                        type="date"
                        name="expiresAt"
                        value={form.expiresAt}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Check
                  type="switch"
                  id="coupon-active-switch"
                  name="isActive"
                  label="Active Coupon"
                  checked={form.isActive}
                  onChange={handleChange}
                  className="mb-3"
                />

                <div className="d-flex gap-2">
                  <Button type="submit" variant="primary" disabled={saving}>
                    {saving ? "Saving..." : editingId ? "Update Coupon" : "Create Coupon"}
                  </Button>

                  {editingId && (
                    <Button type="button" variant="light" onClick={resetForm}>
                      Cancel
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={8} lg={7}>
          <Card className="border-0 shadow-sm rounded-3">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3">All Coupons</h5>

              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" />
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Type</th>
                        <th>Value</th>
                        <th>Min Order</th>
                        <th>Used</th>
                        <th>Status</th>
                        <th>Expiry</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {coupons.length > 0 ? (
                        coupons.map((coupon) => (
                          <tr key={coupon._id}>
                            <td className="fw-semibold">{coupon.code}</td>
                            <td className="text-capitalize">{coupon.type}</td>
                            <td>
                              {coupon.type === "percent"
                                ? `${coupon.value}%`
                                : coupon.type === "shipping"
                                ? "Free Shipping"
                                : `৳${coupon.value}`}
                            </td>
                            <td>৳{coupon.minOrder || 0}</td>
                            <td>
                              {coupon.usedCount || 0}
                              {coupon.usageLimit > 0 ? ` / ${coupon.usageLimit}` : ""}
                            </td>
                            <td>
                              <Badge bg={coupon.isActive ? "success" : "secondary"}>
                                {coupon.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </td>
                            <td>
                              {coupon.expiresAt
                                ? new Date(coupon.expiresAt).toLocaleDateString()
                                : "No expiry"}
                            </td>
                            <td className="text-end">
                              <Button
                                size="sm"
                                variant="outline-primary"
                                className="me-2"
                                onClick={() => handleEdit(coupon)}
                              >
                                Edit
                              </Button>

                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => handleDelete(coupon._id)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="text-center text-secondary py-4">
                            No coupons found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CouponManager;