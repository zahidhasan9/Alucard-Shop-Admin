"use client";

import { useEffect, useState } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedInUser,
  updateProfile,
  clearUserState,
} from "@/features/userSlice";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  country: "",
  dateOfBirth: "",
  gender: "",
  skills: "",
  profession: "",
  companyName: "",
  companyWebsite: "",
  bio: "",
  facebook: "",
  x: "",
  linkedin: "",
  youtube: "",
};

const AccountSettings = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState(initialForm);
  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

const isBusy = mounted ? Boolean(loading) : false;

  useEffect(() => {
    dispatch(getLoggedInUser());

    return () => {
      dispatch(clearUserState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;

    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      country: user.country || "",
      dateOfBirth: user.dateOfBirth ? user.dateOfBirth.slice(0, 10) : "",
      gender: user.gender || "",
      skills: user.skills || "",
      profession: user.profession || "",
      companyName: user.companyName || "",
      companyWebsite: user.companyWebsite || "",
      bio: user.bio || "",
      facebook: user.socials?.facebook || "",
      x: user.socials?.x || "",
      linkedin: user.socials?.linkedin || "",
      youtube: user.socials?.youtube || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      address: formData.address,
      country: formData.country,
      dateOfBirth: formData.dateOfBirth || null,
      gender: formData.gender,
      skills: formData.skills,
      profession: formData.profession,
      companyName: formData.companyName,
      companyWebsite: formData.companyWebsite,
      bio: formData.bio,
      socials: {
        facebook: formData.facebook,
        x: formData.x,
        linkedin: formData.linkedin,
        youtube: formData.youtube,
      },
    };

    dispatch(updateProfile(payload));
  };

  const inputField = (name, label, type = "text", icon = "ri-user-line") => (
    <Col lg={6}>
      <Form.Group className="mb-4">
        <label className="label text-secondary">{label}</label>
        <Form.Group className="position-relative">
          <Form.Control
            name={name}
            type={type}
            className="text-dark ps-5 h-55"
            value={formData[name]}
            onChange={handleChange}
          />
          <i
            className={`${icon} position-absolute top-50 start-0 translate-middle-y fs-20 text-gray-light ps-20`}
          ></i>
        </Form.Group>
      </Form.Group>
    </Col>
  );

  return (
    <>
      <div className="mb-4">
        <h4 className="fs-20 mb-1">Profile</h4>
        <p className="fs-15">Update your personal details here.</p>
      </div>

      <Form onSubmit={handleSubmit}>
        <Row>
          {inputField("firstName", "First Name", "text", "ri-user-line")}
          {inputField("lastName", "Last Name", "text", "ri-user-line")}

          <Col lg={6}>
            <Form.Group className="mb-4">
              <label className="label text-secondary">Email Address</label>
              <Form.Group className="position-relative">
                <Form.Control
                  name="email"
                  type="email"
                  className="text-dark ps-5 h-55"
                  value={formData.email}
                  disabled
                  readOnly
                />
                <i className="ri-mail-line position-absolute top-50 start-0 translate-middle-y fs-20 text-gray-light ps-20"></i>
              </Form.Group>
              <small className="text-muted">
                Email address cannot be changed.
              </small>
            </Form.Group>
          </Col>

          {inputField("phone", "Phone", "text", "ri-phone-line")}
          {inputField("address", "Address", "text", "ri-map-pin-line")}

          <Col lg={6}>
            <Form.Group className="mb-4">
              <label className="label text-secondary">Country</label>
              <Form.Select
                name="country"
                className="form-control h-55"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Switzerland">Switzerland</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="France">France</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {inputField("dateOfBirth", "Date Of Birth", "date", "ri-calendar-line")}

          <Col lg={6}>
            <Form.Group className="mb-4">
              <label className="label text-secondary">Gender</label>
              <Form.Select
                name="gender"
                className="form-control h-55"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {inputField("skills", "Your Skills", "text", "ri-tools-line")}
          {inputField("profession", "Your Profession", "text", "ri-briefcase-line")}
          {inputField("companyName", "Company Name", "text", "ri-building-line")}
          {inputField("companyWebsite", "Company Website", "url", "ri-global-line")}

          <Col lg={12}>
            <Form.Group className="mb-4">
              <label className="label text-secondary">Bio Data :</label>
              <textarea
                name="bio"
                className="form-control text-dark"
                rows="5"
                value={formData.bio}
                onChange={handleChange}
              ></textarea>
            </Form.Group>
          </Col>

          <Col lg={12}>
            <Form.Group className="mb-4 p-4 bg-body d-sm-flex justify-content-between align-items-center rounded-3">
              <div className="d-sm-flex align-items-center mb-3 mb-sm-0 me-lg-3">
                <div className="me-md-5 pe-xxl-5 mb-3 mb-sm-0">
                  <h4 className="body-font fs-15 fw-semibold text-body">
                    Your photo
                  </h4>
                  <p>Photo upload is disabled for now.</p>
                </div>

                <Image
                  src="/images/user-70.png"
                  className="rounded-4 wh-75 ms-3 ms-lg-0 rounded-circle"
                  alt="user"
                  width={75}
                  height={75}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <div className="mb-4 mt-5">
          <h4 className="fs-20 mb-4">Socials Profile</h4>
        </div>

        <Row>
          {inputField("facebook", "Facebook", "url", "ri-facebook-line")}
          {inputField("x", "X", "url", "ri-twitter-x-line")}
          {inputField("linkedin", "Linkedin", "url", "ri-linkedin-line")}
          {inputField("youtube", "YouTube", "url", "ri-youtube-line")}

          <Col lg={12}>
            <div className="d-flex flex-wrap gap-3">
              <Button
                type="button"
                variant="danger"
                className="py-2 px-4 fw-medium fs-16 text-white"
                onClick={() => user && setFormData((prev) => ({ ...prev }))}
                disabled={isBusy}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="primary"
                className="py-2 px-4 fw-medium fs-16"
                disabled={isBusy}
              >
                {isBusy ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="ri-check-line text-white fw-medium"></i>{" "}
                    Update Profile
                  </>
                )}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AccountSettings;