"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Dropdown, Spinner } from "react-bootstrap";
import Link from "next/link";
import axiosInstance from "@/Apiutils/axiosInstance";
import { setUser } from "@/features/userSlice";

const getUserFromResponse = (payload) => {
  return (
    payload?.user ||
    payload?.data?.user ||
    payload?.data ||
    payload ||
    null
  );
};

const getFullName = (user) => {
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  return (
    fullName ||
    user?.name ||
    user?.username ||
    "Admin"
  );
};

const getInitials = (name) => {
  if (!name) return "A";

  const words = name.trim().split(" ").filter(Boolean);

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0][0] || ""}${words[1][0] || ""}`.toUpperCase();
};

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [admin, setAdmin] = useState({
    name: "Admin",
    email: "admin@alucardshop.com",
    role: "Admin",
  });

  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const initials = useMemo(() => getInitials(admin.name), [admin.name]);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setIsLoadingProfile(false);
          return;
        }

        const response = await axiosInstance.get("/auth/me");
        const user = getUserFromResponse(response.data);

        if (user) {
          const name = getFullName(user);

          setAdmin({
            name,
            email: user?.email || "admin@alucardshop.com",
            role: user?.role || "Admin",
          });
        }
      } catch (error) {
        console.log(
          "Admin profile fetch failed:",
          error?.response?.data || error.message
        );
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleLogout = async () => {
  setIsLoggingOut(true);

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("admin");

  dispatch(setUser(null));

  try {
    await axiosInstance.post("/auth/logout", {}, { timeout: 3000 });
  } catch (error) {
    console.log("Logout API skipped/failed:", error?.response?.data || error.message);
  }

  window.location.replace("/authentication/sign-in/");
};

  return (
    <Dropdown className="admin-profile">
      <Dropdown.Toggle className="d-xxl-flex align-items-center bg-transparent border-0 text-start p-0 cursor">
        <div className="flex-shrink-0">
          <div
            className="rounded-circle wh-40 d-flex align-items-center justify-content-center fw-bold text-white"
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #0d6efd, #6610f2)",
              fontSize: "14px",
            }}
          >
            {initials}
          </div>
        </div>

        <div className="flex-grow-1 ms-2">
          <div className="d-none d-xxl-block">
            <h3 className="mb-0 fs-14 fw-semibold">
              {isLoadingProfile ? "Loading..." : admin.name}
            </h3>

            <span className="fs-12 text-secondary text-capitalize">
              {admin.role}
            </span>
          </div>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className="border-0 bg-white dropdown-menu-end shadow-sm">
        <div className="d-flex align-items-center info">
          <div className="flex-shrink-0">
            <div
              className="rounded-circle wh-30 d-flex align-items-center justify-content-center fw-bold text-white"
              style={{
                width: "30px",
                height: "30px",
                background: "linear-gradient(135deg, #0d6efd, #6610f2)",
                fontSize: "12px",
              }}
            >
              {initials}
            </div>
          </div>

          <div className="flex-grow-1 ms-2" style={{ minWidth: 0 }}>
            <h3
              className="fw-medium mb-0 text-truncate"
              style={{ maxWidth: "180px" }}
              title={isLoadingProfile ? "Loading..." : admin.name}
            >
              {isLoadingProfile ? "Loading..." : admin.name}
            </h3>

            <span
              className="fs-12 d-block text-truncate"
              style={{ maxWidth: "180px" }}
              title={admin.email}
            >
              {admin.email}
            </span>
          </div>
        </div>

        <ul className="admin-link ps-0 mb-0 list-unstyled">
          {/* <li>
            <Dropdown.Item
              as={Link}
              href="/my-profile/"
              className="d-flex align-items-center text-body"
            >
              <i className="material-symbols-outlined">account_circle</i>
              <span className="ms-2">My Profile</span>
            </Dropdown.Item>
          </li> */}

          <li>
            <Dropdown.Item
              as={Link}
              href="/settings/account-settings/"
              className="d-flex align-items-center text-body"
            >
              <i className="material-symbols-outlined">settings</i>
              <span className="ms-2">Settings</span>
            </Dropdown.Item>
          </li>
        </ul>

        <ul className="admin-link ps-0 mb-0 list-unstyled border-top mt-2 pt-2">
          <li>
            <Dropdown.Item
              as="button"
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="d-flex align-items-center text-danger"
            >
              {isLoggingOut ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  <span>Logging out...</span>
                </>
              ) : (
                <>
                  <i className="material-symbols-outlined">logout</i>
                  <span className="ms-2">Logout</span>
                </>
              )}
            </Dropdown.Item>
          </li>
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Profile;