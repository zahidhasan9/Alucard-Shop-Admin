"use client";

import React, { useEffect, useState } from "react";
import Notifications from "./Notifications";
import Profile from "./Profile";

const TopNavbar = ({ toogleActive }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 170);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`header-area bg-white mb-4 rounded-bottom-15 ${
        isSticky ? "sticky" : ""
      }`}
      id="header"
    >
      <div className="row align-items-center">
        <div className="col-lg-6 col-sm-6">
          <div className="left-header-content">
            <ul className="d-flex align-items-center ps-0 mb-0 list-unstyled justify-content-center justify-content-sm-start">
              <li>
                <button
                  type="button"
                  className="header-burger-menu bg-transparent p-0 border-0"
                  onClick={toogleActive}
                  aria-label="Toggle sidebar"
                >
                  <i className="material-symbols-outlined fs-24">menu</i>
                </button>
              </li>

              <li className="ms-3">
                <div>
                  <h4 className="mb-0 fs-18 fw-semibold">Dashboard</h4>
                  <span className="text-secondary fs-13">
                    Manage orders, products, customers and reports
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-lg-6 col-sm-6">
          <div className="right-header-content mt-2 mt-sm-0">
            <ul className="d-flex align-items-center justify-content-center justify-content-sm-end ps-0 mb-0 list-unstyled">
              <li className="header-right-item">
                <Notifications />
              </li>

              <li className="header-right-item">
                <Profile />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;