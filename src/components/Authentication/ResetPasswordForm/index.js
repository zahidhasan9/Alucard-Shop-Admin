// "use client";

// import { Row, Col, Form } from "react-bootstrap";
// import Link from "next/link";
// import Image from "next/image";

// const ResetPasswordForm = () => {
//   return (
//     <>
//       <div className="auth-main-content m-auto m-1230 px-3">
//         <Row className="align-items-center">
//           <Col lg={6} className="d-none d-lg-block">
//             <Image
//               src="/images/reset.jpg"
//               className="rounded-3"
//               alt="reset"
//               width={646}
//               height={804}
//             />
//           </Col>

//           <Col lg={6}>
//             <div className="mw-480 ms-lg-auto">
//               <div className="d-inline-block mb-4">
//                 <Image
//                   src="/images/logo.svg"
//                   className="rounded-3 for-light-logo"
//                   alt="login"
//                   width={100}
//                   height={26}
//                 />
//                 <Image
//                   src="/images/white-logo.svg"
//                   className="rounded-3 for-dark-logo"
//                   alt="login"
//                   width={100}
//                   height={26}
//                 />
//               </div>

//               <h3 className="fs-28 mb-2">Reset Password?</h3>
//               <p className="fw-medium fs-16 mb-4">
//                 Enter your new password and confirm it another time in the field below.
//               </p>
 
//               <Form>
//                 <Form.Group className="mb-4">
//                   <label className="label text-secondary">Old Password</label>
//                   <Form.Control
//                     type="password"
//                     className="h-55"
//                     placeholder="Type your old password"
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-4">
//                   <label className="label text-secondary">New Password</label>
//                   <Form.Control
//                     type="password"
//                     className="h-55"
//                     placeholder="Type your new password"
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-4">
//                   <label className="label text-secondary">Confirm Password</label>
//                   <Form.Control
//                     type="password"
//                     className="h-55"
//                     placeholder="Type your confirm password"
//                   />
//                 </Form.Group>
 
//                 <Form.Group className="mb-4">
//                   <button
//                     type="submit"
//                     className="btn btn-primary fw-medium py-2 px-3 w-100"
//                   >
//                     <div className="d-flex align-items-center justify-content-center py-1">
//                       <span className="material-symbols-outlined fs-20 text-white me-2">
//                         autorenew
//                       </span>
//                       <span>Send</span>
//                     </div>
//                   </button>
//                 </Form.Group>

//                 <Form.Group>
//                   <p>
//                     Back to{" "}
//                     <Link
//                       href="/authentication/sign-in/"
//                       className="fw-medium text-primary text-decoration-none"
//                     >
//                       Sign In
//                     </Link>
//                   </p>
//                 </Form.Group>
//               </Form>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// };

// export default ResetPasswordForm;



"use client";

import { useState } from "react";
import { Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { resetPassword } from "@/features/userSlice";

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();

  const id = params?.id;
  const token = params?.token;

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [localError, setLocalError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!id || !token) {
      setLocalError("Invalid or missing password reset link.");
      return;
    }

    if (!form.password || !form.confirmPassword) {
      setLocalError("Please fill in all password fields.");
      return;
    }

    if (form.password.length < 6) {
      setLocalError("Password must be at least 6 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setLocalError("Password and confirm password do not match.");
      return;
    }

    try {
      setSubmitting(true);

      await dispatch(
        resetPassword({
          id,
          token,
          data: {
            password: form.password,
          },
        })
      ).unwrap();

      router.push("/authentication/sign-in");
    } catch (error) {
      setLocalError(
        typeof error === "string"
          ? error
          : "Password reset failed. Please try again."
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
              src="/images/reset.png"
              className="rounded-3"
              alt="reset"
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

              <h3 className="fs-28 mb-2">Reset Password</h3>

              <p className="fw-medium fs-16 mb-4">
                Enter your new password and confirm it below.
              </p>

              {localError && <Alert variant="danger">{localError}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <label className="label text-secondary">New Password</label>

                  <Form.Group className="position-relative">
                    <Form.Control
                      type="password"
                      name="password"
                      className="text-dark ps-5 h-55"
                      placeholder="Enter new password"
                      value={form.password}
                      onChange={handleChange}
                      disabled={submitting}
                    />
                    <i className="ri-lock-line position-absolute top-50 start-0 translate-middle-y fs-20 text-gray-light ps-20"></i>
                  </Form.Group>
                </Form.Group>

                <Form.Group className="mb-4">
                  <label className="label text-secondary">
                    Confirm Password
                  </label>

                  <Form.Group className="position-relative">
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      className="text-dark ps-5 h-55"
                      placeholder="Confirm new password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      disabled={submitting}
                    />
                    <i className="ri-lock-line position-absolute top-50 start-0 translate-middle-y fs-20 text-gray-light ps-20"></i>
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
                        Resetting...
                      </>
                    ) : (
                      <>
                        <i className="ri-refresh-line text-white fw-medium"></i>{" "}
                        Reset Password
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

export default ResetPasswordForm;