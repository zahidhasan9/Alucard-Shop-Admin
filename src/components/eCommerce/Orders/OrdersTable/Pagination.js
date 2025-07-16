'use client';

import Link from 'next/link';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePrev = (e) => {
    e.preventDefault();
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <>
      <div className="d-flex justify-content-center justify-content-sm-between align-items-center text-center flex-wrap gap-2 showing-wrap">
        <span className="fs-13 fw-medium">Items per pages: {itemsPerPage}</span>

        <div className="d-flex align-items-center">
          <span className="fs-13 fw-medium me-2">
            {start} - {end} of {totalItems}
          </span>

          <nav aria-label="Page navigation example">
            <ul className="pagination mb-0 justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <Link className="page-link icon" href="#" aria-label="Previous" onClick={handlePrev}>
                  <span className="material-symbols-outlined">keyboard_arrow_left</span>
                </Link>
              </li>
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <Link className="page-link icon" href="#" aria-label="Next" onClick={handleNext}>
                  <span className="material-symbols-outlined">keyboard_arrow_right</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Pagination;
