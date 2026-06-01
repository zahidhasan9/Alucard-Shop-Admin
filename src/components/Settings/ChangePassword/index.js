// "use client";

import { useState } from "react";
import { Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { changePassword as changePasswordThunk } from "@/features/userSlice";

const initialForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      return "All password fields are required.";
    }

    if (formData.newPassword.length < 6) {
      return "New password must be at least 6 characters long.";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return "New password and confirm password do not match.";
    }

    if (formData.currentPassword === formData.newPassword) {
      return "New password must be different from old password.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    const validationError = validateForm();

    if (validationError) {
      setLocalError(validationError);
      return;
    }

    try {
      setSubmitting(true);

      await dispatch(
        changePasswordThunk({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        })
      ).unwrap();

      setFormData(initialForm);
    } catch (error) {
      setLocalError(
        typeof error === "string"
          ? error
          : "Password change failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const passwordField = (name, label) => (
    <Form.Group className="mb-4">
      <label className="label text-secondary">{label}</label>

      <Form.Group>
        <div className="password-wrapper position-relative">
          <Form.Control
            type={showPassword[name] ? "text" : "password"}
            name={name}
            className="h-55 text-dark pe-5"
            value={formData[name]}
            onChange={handleChange}
            placeholder={`Enter ${label.toLowerCase()}`}
            disabled={submitting}
            autoComplete="new-password"
          />

          <button
            type="button"
            className="position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent pe-3 text-secondary"
            onClick={() => togglePassword(name)}
            disabled={submitting}
            aria-label={`Toggle ${label}`}
          >
            <i
              className={
                showPassword[name] ? "ri-eye-off-line" : "ri-eye-line"
              }
            ></i>
          </button>
        </div>
      </Form.Group>
    </Form.Group>
  );

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          {localError && (
            <Col lg={12}>
              <Alert variant="danger" className="mb-4">
                {localError}
              </Alert>
            </Col>
          )}

          <Col lg={6}>
            {passwordField("currentPassword", "Old Password")}
          </Col>

          <Col lg={6}>
            {passwordField("newPassword", "New Password")}
          </Col>

          <Col lg={12}>
            {passwordField("confirmPassword", "Confirm Password")}
          </Col>

          <Col lg={12}>
            <Form.Group className="form-group d-flex flex-wrap gap-3 align-items-center">
              <Button
                type="submit"
                className="btn btn-primary py-2 px-4 fw-medium fs-16"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Spinner size="sm" animation="border" className="me-2" />
                    Changing...
                  </>
                ) : (
                  <>
                    <i className="ri-check-line text-white fw-medium"></i>{" "}
                    Change Password
                  </>
                )}
              </Button>

              <Link
                href="/authentication/forgot-password/"
                className="text-danger fs-16 text-decoration-none"
              >
                Forgot Password?
              </Link>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ChangePassword;