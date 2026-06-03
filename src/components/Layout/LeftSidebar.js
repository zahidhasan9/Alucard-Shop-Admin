"use client";

import { Accordion } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const LeftSidebar = ({ toogleActive }) => {
  const pathname = usePathname();

  return (
    <>
      <div className="sidebar-area">
        <div className="logo position-relative">
          <Link
            href="/dashboard/ecommerce/"
            className="d-block text-decoration-none position-relative"
          >
            <Image
              src="/images/logo-icon.png"
              alt="logo-icon"
              width={26}
              height={26}
            />
            <span className="logo-text fw-bold text-dark">Trezo</span>
          </Link>
          <button
            className="sidebar-burger-menu bg-transparent p-0 border-0 opacity-0 z-n1 position-absolute top-50 end-0 translate-middle-y"
            onClick={toogleActive}
          >
            <i className="material-symbols-outlined fs-24">close</i>
          </button>
        </div>

        <div className="sidebar-menu">
          <div className="menu-title small text-uppercase">
            <span className="menu-title-text">MAIN</span>
          </div>

          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <i className="material-symbols-outlined">dashboard</i>
                <span className="title">Dashboard</span>
                {/* <span className="count">18</span> */}
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      href="/dashboard/ecommerce/"
                      className={`menu-link ${pathname === "/dashboard/ecommerce/" ? "active" : ""}`}
                    >
                      eCommerce
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/dashboard/coupons"
                      className={`menu-link ${pathname === "/dashboard/coupons" ? "active" : ""}`}
                    >
                      Coupons
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <i className="material-symbols-outlined">shopping_cart</i>
                <span className="title">eCommerce</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      href="/ecommerce/create-product/"
                      className={`menu-link ${pathname === "/ecommerce/create-product/" ? "active" : ""}`}
                    >
                      Create Product
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/ecommerce/products-list/"
                      className={`menu-link ${pathname === "/ecommerce/products-list/" ? "active" : ""}`}
                    >
                      Products List
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/ecommerce/product-moderation/"
                      className={`menu-link ${pathname === "/ecommerce/product-moderation/" ? "active" : ""}`}
                    >
                      Product Moderation
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/ecommerce/banners/"
                      className={`menu-link ${pathname === "/ecommerce/banners/" ? "active" : ""}`}
                    >
                      Banners
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/ecommerce/category-brand/"
                      className={`menu-link ${pathname === "/ecommerce/category-brand/" ? "active" : ""}`}
                    >
                      Category Brand
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/ecommerce/orders/"
                      className={`menu-link ${pathname === "/ecommerce/orders/" ? "active" : ""}`}
                    >
                      Orders
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/ecommerce/customers/"
                      className={`menu-link ${pathname === "/ecommerce/customers/" ? "active" : ""}`}
                    >
                      Customers
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <div className="menu-title small text-uppercase">
              <span className="menu-title-text">OTHERS</span>
            </div>

            <Accordion.Item eventKey="25">
              <Accordion.Header>
                <i className="material-symbols-outlined">settings</i>
                <span className="title">Settings</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      href="/settings/account-settings/"
                      className={`menu-link ${pathname === "/settings/account-settings/" ? "active" : ""}`}
                    >
                      Account Settings
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/settings/change-password/"
                      className={`menu-link ${pathname === "/settings/change-password/" ? "active" : ""}`}
                    >
                      Change Password
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
