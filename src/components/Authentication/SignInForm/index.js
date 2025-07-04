'use client';

import { Row, Col, Form } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { login } from '@/features/userSlice';

const SignInForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        router.push('dashboard/ecommerce/');
      });
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <div className="auth-main-content m-auto m-1230 px-3">
        <Row className="align-items-center">
          <Col lg={6} className="d-none d-lg-block">
            <Image src="/images/login.jpg" className="rounded-3" alt="login" width={646} height={804} />
          </Col>

          <Col lg={6}>
            <div className="mw-480 ms-lg-auto">
              <div className="d-inline-block mb-4">
                <Image
                  src="/images/logo.svg"
                  className="rounded-3 for-light-logo"
                  alt="login"
                  width={100}
                  height={26}
                />
                <Image
                  src="/images/white-logo.svg"
                  className="rounded-3 for-dark-logo"
                  alt="login"
                  width={100}
                  height={26}
                />
              </div>

              <h3 className="fs-28 mb-2">Welcome back to Trezo!</h3>
              <p className="fw-medium fs-16 mb-4">Sign In with social account or enter your details</p>

              <div className="row justify-content-center">
                <div className="col-lg-4 col-sm-4">
                  <a
                    href="https://www.google.com/"
                    target="_blank"
                    className="btn btn-outline-secondary bg-transparent w-100 py-2 hover-bg mb-4"
                    style={{
                      borderColor: '#D6DAE1'
                    }}
                  >
                    <Image src="/images/google.svg" alt="google" width={25} height={25} />
                  </a>
                </div>

                <div className="col-lg-4 col-sm-4">
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    className="btn btn-outline-secondary bg-transparent w-100 py-2 hover-bg mb-4"
                    style={{
                      borderColor: '#D6DAE1'
                    }}
                  >
                    <Image src="/images/facebook2.svg" alt="facebook2" width={25} height={25} />
                  </a>
                </div>

                <div className="col-lg-4 col-sm-4">
                  <a
                    href="https://www.apple.com/"
                    target="_blank"
                    className="btn btn-outline-secondary bg-transparent w-100 py-2 hover-bg mb-4"
                    style={{
                      borderColor: '#D6DAE1'
                    }}
                  >
                    <Image src="/images/apple.svg" alt="apple" width={25} height={25} />
                  </a>
                </div>
              </div>

              <Form>
                <Form.Group className="mb-4">
                  <label className="label text-secondary">Email Address</label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="h-55"
                    placeholder="example@trezo.com"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <label className="label text-secondary">Password</label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="h-55"
                    placeholder="Type password"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Link href="/authentication/forgot-password/" className="fw-medium text-primary text-decoration-none">
                    Forgot Password?
                  </Link>
                </Form.Group>

                <Form.Group className="mb-4">
                  <button type="submit" onClick={handleLogin} className="btn btn-primary fw-medium py-2 px-3 w-100">
                    <div className="d-flex align-items-center justify-content-center py-1">
                      <span className="material-symbols-outlined fs-20 text-white me-2">login</span>
                      <span>Sign In</span>
                    </div>
                  </button>
                </Form.Group>

                <Form.Group>
                  <p>
                    Don’t have an account.{' '}
                    <Link href="/authentication/sign-up/" className="fw-medium text-primary text-decoration-none">
                      Sign Up
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

export default SignInForm;
