'use client';

import { Accordion } from 'react-bootstrap';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const LeftSidebar = ({ toogleActive }) => {
  const pathname = usePathname();

  return (
    <>
      <div className="sidebar-area">
        <div className="logo position-relative">
          <Link href="/dashboard/ecommerce/" className="d-block text-decoration-none position-relative">
            <Image src="/images/logo-icon.png" alt="logo-icon" width={26} height={26} />
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
                <span className="count">18</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      href="/dashboard/ecommerce/"
                      className={`menu-link ${pathname === '/dashboard/ecommerce/' ? 'active' : ''}`}
                    >
                      eCommerce
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
                      href="/ecommerce/products-grid/"
                      className={`menu-link ${pathname === '/ecommerce/products-grid/' ? 'active' : ''}`}
                    >
                      Products Grid
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/ecommerce/products-list/"
                      className={`menu-link ${pathname === '/ecommerce/products-list/' ? 'active' : ''}`}
                    >
                      Products List
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/ecommerce/product-details/"
                      className={`menu-link ${pathname === '/ecommerce/product-details/' ? 'active' : ''}`}
                    >
                      Product Details
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/ecommerce/create-product/"
                      className={`menu-link ${pathname === '/ecommerce/create-product/' ? 'active' : ''}`}
                    >
                      Create Product
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/ecommerce/edit-product/"
                      className={`menu-link ${pathname === '/ecommerce/edit-product/' ? 'active' : ''}`}
                    >
                      Edit Product
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/ecommerce/cart/"
                      className={`menu-link ${pathname === '/ecommerce/cart/' ? 'active' : ''}`}
                    >
                      Cart
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/ecommerce/category-brand/"
                      className={`menu-link ${pathname === '/ecommerce/category-brand/' ? 'active' : ''}`}
                    >
                      Category Brand
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/ecommerce/checkout/"
                      className={`menu-link ${pathname === '/ecommerce/checkout/' ? 'active' : ''}`}
                    >
                      Checkout
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/ecommerce/orders/"
                      className={`menu-link ${pathname === '/ecommerce/orders/' ? 'active' : ''}`}
                    >
                      Orders
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/ecommerce/orders/details/"
                      className={`menu-link ${pathname === '/ecommerce/orders/details/' ? 'active' : ''}`}
                    >
                      Orders Details
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/ecommerce/orders/create/"
                      className={`menu-link ${pathname === '/ecommerce/orders/create/' ? 'active' : ''}`}
                    >
                      Create Order
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/ecommerce/orders/tracking/"
                      className={`menu-link ${pathname === '/ecommerce/orders/tracking/' ? 'active' : ''}`}
                    >
                      Order Tracking
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/ecommerce/customers/"
                      className={`menu-link ${pathname === '/ecommerce/customers/' ? 'active' : ''}`}
                    >
                      Customers
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/ecommerce/customers/details/"
                      className={`menu-link ${pathname === '/ecommerce/customers/details/' ? 'active' : ''}`}
                    >
                      Customer Details
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/ecommerce/categories/"
                      className={`menu-link ${pathname === '/ecommerce/categories/' ? 'active' : ''}`}
                    >
                      Categories
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/ecommerce/sellers/"
                      className={`menu-link ${pathname === '/ecommerce/sellers/' ? 'active' : ''}`}
                    >
                      Sellers
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/ecommerce/sellers/details/"
                      className={`menu-link ${pathname === '/ecommerce/sellers/details/' ? 'active' : ''}`}
                    >
                      Sellers Details
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/ecommerce/sellers/create/"
                      className={`menu-link ${pathname === '/ecommerce/sellers/create/' ? 'active' : ''}`}
                    >
                      Create Seller
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/ecommerce/reviews/"
                      className={`menu-link ${pathname === '/ecommerce/reviews/' ? 'active' : ''}`}
                    >
                      Reviews
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/ecommerce/refunds/"
                      className={`menu-link ${pathname === '/ecommerce/refunds/' ? 'active' : ''}`}
                    >
                      Refunds
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>
                <i className="material-symbols-outlined">handshake</i>
                <span className="title">CRM</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      href="/crm/contacts/"
                      className={`menu-link ${pathname === '/crm/contacts/' ? 'active' : ''}`}
                    >
                      Contacts
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/crm/customers/"
                      className={`menu-link ${pathname === '/crm/customers/' ? 'active' : ''}`}
                    >
                      Customers
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link href="/crm/leads/" className={`menu-link ${pathname === '/crm/leads/' ? 'active' : ''}`}>
                      Leads
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link href="/crm/deals/" className={`menu-link ${pathname === '/crm/deals/' ? 'active' : ''}`}>
                      Deals
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>
                <i className="material-symbols-outlined">content_paste</i>
                <span className="title">Project Management</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      href="/project-management/project-overview/"
                      className={`menu-link ${pathname === '/project-management/project-overview/' ? 'active' : ''}`}
                    >
                      Project Overview
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/project-management/projects-list/"
                      className={`menu-link ${pathname === '/project-management/projects-list/' ? 'active' : ''}`}
                    >
                      Projects List
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/project-management/create-project/"
                      className={`menu-link ${pathname === '/project-management/create-project/' ? 'active' : ''}`}
                    >
                      Create Project
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/project-management/clients/"
                      className={`menu-link ${pathname === '/project-management/clients/' ? 'active' : ''}`}
                    >
                      Clients
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/project-management/teams/"
                      className={`menu-link ${pathname === '/project-management/teams/' ? 'active' : ''}`}
                    >
                      Teams
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/project-management/kanban-board/"
                      className={`menu-link ${pathname === '/project-management/kanban-board/' ? 'active' : ''}`}
                    >
                      Kanban Board
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/project-management/users/"
                      className={`menu-link ${pathname === '/project-management/users/' ? 'active' : ''}`}
                    >
                      Users
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="12">
              <Accordion.Header>
                <i className="material-symbols-outlined">local_activity</i>
                <span className="title">Events</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link href="/events/" className={`menu-link ${pathname === '/events/' ? 'active' : ''}`}>
                      Events Grid
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link href="/events/list/" className={`menu-link ${pathname === '/events/list/' ? 'active' : ''}`}>
                      Events List
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/events/details/"
                      className={`menu-link ${pathname === '/events/details/' ? 'active' : ''}`}
                    >
                      Event Details
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/events/create-an-event/"
                      className={`menu-link ${pathname === '/events/create-an-event/' ? 'active' : ''}`}
                    >
                      Create An Event
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/events/edit-an-event/"
                      className={`menu-link ${pathname === '/events/edit-an-event/' ? 'active' : ''}`}
                    >
                      Edit An Event
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="13">
              <Accordion.Header>
                <i className="material-symbols-outlined">share</i>
                <span className="title">Social</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      href="/social/profile/"
                      className={`menu-link ${pathname === '/social/profile/' ? 'active' : ''}`}
                    >
                      Profile
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/social/settings/"
                      className={`menu-link ${pathname === '/social/settings/' ? 'active' : ''}`}
                    >
                      Settings
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="14">
              <Accordion.Header>
                <i className="material-symbols-outlined">content_paste</i>
                <span className="title">Invoices</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link href="/invoices/" className={`menu-link ${pathname === '/invoices/' ? 'active' : ''}`}>
                      Invoices
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/invoices/details/"
                      className={`menu-link ${pathname === '/invoices/details/' ? 'active' : ''}`}
                    >
                      Invoice Details
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/invoices/create/"
                      className={`menu-link ${pathname === '/invoices/create/' ? 'active' : ''}`}
                    >
                      Create Invoice
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/invoices/edit/"
                      className={`menu-link ${pathname === '/invoices/edit/' ? 'active' : ''}`}
                    >
                      Edit Invoice
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="15">
              <Accordion.Header>
                <i className="material-symbols-outlined">group_add</i>
                <span className="title">Users</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link href="/users/" className={`menu-link ${pathname === '/users/' ? 'active' : ''}`}>
                      Team Members
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/users/users-list/"
                      className={`menu-link ${pathname === '/users/users-list/' ? 'active' : ''}`}
                    >
                      Users List
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/users/add-user/"
                      className={`menu-link ${pathname === '/users/add-user/' ? 'active' : ''}`}
                    >
                      Add User
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="16">
              <Accordion.Header>
                <i className="material-symbols-outlined">account_circle</i>
                <span className="title">Profile</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link href="/profile/" className={`menu-link ${pathname === '/profile/' ? 'active' : ''}`}>
                      User Profile
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/profile/teams/"
                      className={`menu-link ${pathname === '/profile/teams/' ? 'active' : ''}`}
                    >
                      Teams
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/profile/projects/"
                      className={`menu-link ${pathname === '/profile/projects/' ? 'active' : ''}`}
                    >
                      Projects
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <div className="menu-title small text-uppercase">
              <span className="menu-title-text">MODULES</span>
            </div>

            <Accordion.Item eventKey="17">
              <Accordion.Header>
                <i className="material-symbols-outlined">add_reaction</i>
                <span className="title">Icons</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      href="/icons/material-symbols/"
                      className={`menu-link ${pathname === '/icons/material-symbols/' ? 'active' : ''}`}
                    >
                      Material Icons
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/icons/remixicon/"
                      className={`menu-link ${pathname === '/icons/remixicon/' ? 'active' : ''}`}
                    >
                      RemixIcon
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="18">
              <Accordion.Header>
                <i className="material-symbols-outlined">gallery_thumbnail</i>
                <span className="title">UI Elements</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      href="/ui-kit/alerts/"
                      className={`menu-link ${pathname === '/ui-kit/alerts/' ? 'active' : ''}`}
                    >
                      Alerts
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/ui-kit/avatar/"
                      className={`menu-link ${pathname === '/ui-kit/avatar/' ? 'active' : ''}`}
                    >
                      Avatar
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/ui-kit/buttons/"
                      className={`menu-link ${pathname === '/ui-kit/buttons/' ? 'active' : ''}`}
                    >
                      Buttons
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/ui-kit/badges/"
                      className={`menu-link ${pathname === '/ui-kit/badges/' ? 'active' : ''}`}
                    >
                      Badges
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/ui-kit/cards/"
                      className={`menu-link ${pathname === '/ui-kit/cards/' ? 'active' : ''}`}
                    >
                      Cards
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/ui-kit/carousel/"
                      className={`menu-link ${pathname === '/ui-kit/carousel/' ? 'active' : ''}`}
                    >
                      Carousel
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/ui-kit/dropdowns/"
                      className={`menu-link ${pathname === '/ui-kit/dropdowns/' ? 'active' : ''}`}
                    >
                      Dropdowns
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/ui-kit/images/"
                      className={`menu-link ${pathname === '/ui-kit/images/' ? 'active' : ''}`}
                    >
                      Images
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/ui-kit/list-groups/"
                      className={`menu-link ${pathname === '/ui-kit/list-groups/' ? 'active' : ''}`}
                    >
                      List Groups
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/ui-kit/navbars/"
                      className={`menu-link ${pathname === '/ui-kit/navbars/' ? 'active' : ''}`}
                    >
                      Navbars
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link href="/ui-kit/navs/" className={`menu-link ${pathname === '/ui-kit/navs/' ? 'active' : ''}`}>
                      Navs
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/ui-kit/accordion/"
                      className={`menu-link ${pathname === '/ui-kit/accordion/' ? 'active' : ''}`}
                    >
                      Accordion
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/ui-kit/progress-bars/"
                      className={`menu-link ${pathname === '/ui-kit/progress-bars/' ? 'active' : ''}`}
                    >
                      Progress Bars
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/ui-kit/date-time-picker/"
                      className={`menu-link ${pathname === '/ui-kit/date-time-picker/' ? 'active' : ''}`}
                    >
                      Date Time Picker
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/ui-kit/videos/"
                      className={`menu-link ${pathname === '/ui-kit/videos/' ? 'active' : ''}`}
                    >
                      Videos
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="19">
              <Accordion.Header>
                <i className="material-symbols-outlined">table</i>
                <span className="title">Tables</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link href="/tables/" className={`menu-link ${pathname === '/tables/' ? 'active' : ''}`}>
                      Basic Table
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/tables/data-table/"
                      className={`menu-link ${pathname === '/tables/data-table/' ? 'active' : ''}`}
                    >
                      Data Table
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="20">
              <Accordion.Header>
                <i className="material-symbols-outlined">clarify</i>
                <span className="title">Forms</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      href="/forms/basic-elements/"
                      className={`menu-link ${pathname === '/forms/basic-elements/' ? 'active' : ''}`}
                    >
                      Basic Elements
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/forms/advanced-elements/"
                      className={`menu-link ${pathname === '/forms/advanced-elements/' ? 'active' : ''}`}
                    >
                      Advanced Elements
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/forms/validation/"
                      className={`menu-link ${pathname === '/forms/validation/' ? 'active' : ''}`}
                    >
                      Validation
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/forms/editors/"
                      className={`menu-link ${pathname === '/forms/editors/' ? 'active' : ''}`}
                    >
                      Editors
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/forms/file-upload/"
                      className={`menu-link ${pathname === '/forms/file-upload/' ? 'active' : ''}`}
                    >
                      File Upload
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="21">
              <Accordion.Header>
                <i className="material-symbols-outlined">pie_chart</i>
                <span className="title">Charts</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link href="/charts/line/" className={`menu-link ${pathname === '/charts/line/' ? 'active' : ''}`}>
                      Line Chart
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link href="/charts/area/" className={`menu-link ${pathname === '/charts/area/' ? 'active' : ''}`}>
                      Area Chart
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/charts/column/"
                      className={`menu-link ${pathname === '/charts/column/' ? 'active' : ''}`}
                    >
                      Column Chart
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/charts/mixed/"
                      className={`menu-link ${pathname === '/charts/mixed/' ? 'active' : ''}`}
                    >
                      Mixed Chart
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/charts/radialbar/"
                      className={`menu-link ${pathname === '/charts/radialbar/' ? 'active' : ''}`}
                    >
                      Radialbar Chart
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/charts/radar/"
                      className={`menu-link ${pathname === '/charts/radar/' ? 'active' : ''}`}
                    >
                      Radar Chart
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link href="/charts/pie/" className={`menu-link ${pathname === '/charts/pie/' ? 'active' : ''}`}>
                      Pie Chart
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/charts/polar/"
                      className={`menu-link ${pathname === '/charts/polar/' ? 'active' : ''}`}
                    >
                      Polar Chart
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link href="/charts/more/" className={`menu-link ${pathname === '/charts/more/' ? 'active' : ''}`}>
                      More Chart
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="22">
              <Accordion.Header>
                <i className="material-symbols-outlined">lock</i>
                <span className="title">Authentication</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      href="/authentication/sign-in/"
                      className={`menu-link ${pathname === '/authentication/sign-in/' ? 'active' : ''}`}
                    >
                      Sign In
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/authentication/sign-up/"
                      className={`menu-link ${pathname === '/authentication/sign-up/' ? 'active' : ''}`}
                    >
                      Sign Up
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/authentication/forgot-password/"
                      className={`menu-link ${pathname === '/authentication/forgot-password/' ? 'active' : ''}`}
                    >
                      Forgot Password
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/authentication/reset-password/"
                      className={`menu-link ${pathname === '/authentication/reset-password/' ? 'active' : ''}`}
                    >
                      Reset Password
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/authentication/confirm-email/"
                      className={`menu-link ${pathname === '/authentication/confirm-email/' ? 'active' : ''}`}
                    >
                      Confirm Email
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/authentication/lock-screen/"
                      className={`menu-link ${pathname === '/authentication/lock-screen/' ? 'active' : ''}`}
                    >
                      Lock Screen
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/authentication/logout/"
                      className={`menu-link ${pathname === '/authentication/logout/' ? 'active' : ''}`}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="23">
              <Accordion.Header>
                <i className="material-symbols-outlined">featured_video</i>
                <span className="title">Extra Pages</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      href="/extra-pages/pricing-plan/"
                      className={`menu-link ${pathname === '/extra-pages/pricing-plan/' ? 'active' : ''}`}
                    >
                      Pricing Plan
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/extra-pages/animation/"
                      className={`menu-link ${pathname === '/extra-pages/animation/' ? 'active' : ''}`}
                    >
                      Animation
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/extra-pages/ratings/"
                      className={`menu-link ${pathname === '/extra-pages/ratings/' ? 'active' : ''}`}
                    >
                      Ratings
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/extra-pages/toasts/"
                      className={`menu-link ${pathname === '/extra-pages/toasts/' ? 'active' : ''}`}
                    >
                      Toasts
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/extra-pages/timeline/"
                      className={`menu-link ${pathname === '/extra-pages/timeline/' ? 'active' : ''}`}
                    >
                      Timeline
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/extra-pages/faq/"
                      className={`menu-link ${pathname === '/extra-pages/faq/' ? 'active' : ''}`}
                    >
                      FAQ&apos;s
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/extra-pages/testimonials/"
                      className={`menu-link ${pathname === '/extra-pages/testimonials/' ? 'active' : ''}`}
                    >
                      Testimonials
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/extra-pages/gallery/"
                      className={`menu-link ${pathname === '/extra-pages/gallery/' ? 'active' : ''}`}
                    >
                      Gallery
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/extra-pages/search/"
                      className={`menu-link ${pathname === '/extra-pages/search/' ? 'active' : ''}`}
                    >
                      Search
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/extra-pages/blank-page/"
                      className={`menu-link ${pathname === '/extra-pages/blank-page/' ? 'active' : ''}`}
                    >
                      Blank Page
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="24">
              <Accordion.Header>
                <i className="material-symbols-outlined">chat_error</i>
                <span className="title">Errors Pages</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link href="/not-found/" className={`menu-link ${pathname === '/not-found/' ? 'active' : ''}`}>
                      404 Error
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/internal-error/"
                      className={`menu-link ${pathname === '/internal-error/' ? 'active' : ''}`}
                    >
                      Internal Error
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <div className="menu-item">
              <Link href="/widgets/" className={`menu-link ${pathname === '/widgets/' ? 'active' : ''}`}>
                <i className="material-symbols-outlined">widgets</i>
                <span className="title">Widgets</span>
              </Link>
            </div>

            <div className="menu-item">
              <Link href="/maps/" className={`menu-link ${pathname === '/maps/' ? 'active' : ''}`}>
                <i className="material-symbols-outlined">map</i>
                <span className="title">Maps</span>
              </Link>
            </div>

            <div className="menu-item">
              <Link href="/notifications/" className={`menu-link ${pathname === '/notifications/' ? 'active' : ''}`}>
                <i className="material-symbols-outlined">notifications</i>
                <span className="title">Notifications</span>
              </Link>
            </div>

            <div className="menu-item">
              <Link href="/members/" className={`menu-link ${pathname === '/members/' ? 'active' : ''}`}>
                <i className="material-symbols-outlined">people</i>
                <span className="title">Members</span>
              </Link>
            </div>

            <div className="menu-title small text-uppercase">
              <span className="menu-title-text">OTHERS</span>
            </div>

            <div className="menu-item">
              <Link href="/my-profile/" className={`menu-link ${pathname === '/my-profile/' ? 'active' : ''}`}>
                <i className="material-symbols-outlined">account_circle</i>
                <span className="title">My Profile</span>
              </Link>
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
                      className={`menu-link ${pathname === '/settings/account-settings/' ? 'active' : ''}`}
                    >
                      Account Settings
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/settings/change-password/"
                      className={`menu-link ${pathname === '/settings/change-password/' ? 'active' : ''}`}
                    >
                      Change Password
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/settings/connections/"
                      className={`menu-link ${pathname === '/settings/connections/' ? 'active' : ''}`}
                    >
                      Connections
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/settings/privacy-policy/"
                      className={`menu-link ${pathname === '/settings/privacy-policy/' ? 'active' : ''}`}
                    >
                      Privacy Policy
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/settings/terms-conditions/"
                      className={`menu-link ${pathname === '/settings/terms-conditions/' ? 'active' : ''}`}
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <div className="menu-item">
              <Link
                href="/authentication/logout/"
                className={`menu-link ${pathname === '/authentication/logout/' ? 'active' : ''}`}
              >
                <i className="material-symbols-outlined">logout</i>
                <span className="title">Logout</span>
              </Link>
            </div>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
