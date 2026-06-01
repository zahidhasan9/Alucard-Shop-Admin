"use client";

import { useState } from "react";
import { Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { forgotPassword } from "@/features/userSlice";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    setSent(false);

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setLocalError("Please enter your email address.");
      return;
    }

    try {
      setSubmitting(true);
      await dispatch(forgotPassword(cleanEmail)).unwrap();
      setSent(true);
      setEmail("");
    } catch (error) {
      setLocalError(
        typeof error === "string"
          ? error
          : "Failed to send reset email. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="auth-main-content m-auto m-1230 px-3">
        <Row className="align-items-center">
          <Col lg={6} className="d-none d-lg-block">
            <Image
              src="/images/forgot.png"
              className="rounded-3"
              alt="forgot"
              width={646}
              height={804}
            />
          </Col>

          <Col lg={6}>
            <div className="mw-480 ms-lg-auto">
              <div className="d-inline-block mb-4">
                <Image
                  src="/images/logo.svg"
                  className="rounded-3 for-light-logo"
                  alt="login"
                  width={142}
                  height={38}
                />
                <Image
                  src="/images/white-logo.svg"
                  className="rounded-3 for-dark-logo"
                  alt="login"
                  width={142}
                  height={38}
                />
              </div>

              <h3 className="fs-28 mb-2">Forgot your password?</h3>

              <p className="fw-medium fs-16 mb-4">
                Enter the email address you used when you joined and we’ll send
                you instructions to reset your password.
              </p>

              {localError && <Alert variant="danger">{localError}</Alert>}

              {sent && (
                <Alert variant="success">
                  Password reset email sent. Please check your inbox.
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <label className="label text-secondary">Email Address</label>

                  <Form.Group className="position-relative">
                    <Form.Control
                      type="email"
                      className="text-dark ps-5 h-55"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={submitting}
                    />
                    <i className="ri-mail-line position-absolute top-50 start-0 translate-middle-y fs-20 text-gray-light ps-20"></i>
                  </Form.Group>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Button
                    type="submit"
                    className="btn btn-primary fw-medium py-2 px-3 w-100"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="ri-refresh-line text-white fw-medium"></i>{" "}
                        Send
                      </>
                    )}
                  </Button>
                </Form.Group>

                <Form.Group>
                  <p>
                    Back to{" "}
                    <Link
                      href="/authentication/sign-in"
                      className="fw-medium text-primary text-decoration-none"
                    >
                      Sign In
                    </Link>
                  </p>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ForgotPasswordForm;