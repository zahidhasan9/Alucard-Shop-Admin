'use client';

const Pagination = ({ currentPage = 1, totalItems = 0, itemsPerPage = 10, onPageChange }) => {
  const safeCurrentPage = Number(currentPage) || 1;
  const safeTotalItems = Number(totalItems) || 0;
  const safeItemsPerPage = Number(itemsPerPage) || 10;

  const totalPages = Math.ceil(safeTotalItems / safeItemsPerPage);

  const start =
    safeTotalItems === 0 ? 0 : (safeCurrentPage - 1) * safeItemsPerPage + 1;

  const end = Math.min(safeCurrentPage * safeItemsPerPage, safeTotalItems);

  const createPageNumbers = () => {
    const pages = [];

    if (totalPages <= 1) return pages;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (safeCurrentPage > 3) {
        pages.push('start-ellipsis');
      }

      for (let i = safeCurrentPage - 1; i <= safeCurrentPage + 1; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }

      if (safeCurrentPage < totalPages - 2) {
        pages.push('end-ellipsis');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pagesToRender = createPageNumbers();

  const handlePrev = () => {
    if (safeCurrentPage > 1) {
      onPageChange(safeCurrentPage - 1);
    }
  };

  const handleNext = () => {
    if (safeCurrentPage < totalPages) {
      onPageChange(safeCurrentPage + 1);
    }
  };

  return (
    <div className="d-flex justify-content-center justify-content-sm-between align-items-center text-center flex-wrap gap-2 showing-wrap">
      <span className="fs-13 fw-medium">
        Items per page: {safeItemsPerPage}
      </span>

      <div className="d-flex align-items-center">
        <span className="fs-13 fw-medium me-2">
          {start} - {end} of {safeTotalItems}
        </span>

        <nav aria-label="Page navigation example">
          <ul className="pagination mb-0 justify-content-center">
            <li className={`page-item ${safeCurrentPage === 1 ? 'disabled' : ''}`}>
              <button
                type="button"
                className="page-link icon"
                onClick={handlePrev}
                disabled={safeCurrentPage === 1}
                aria-label="Previous"
              >
                <span className="material-symbols-outlined">
                  keyboard_arrow_left
                </span>
              </button>
            </li>

            {pagesToRender.map((page, index) => (
              <li
                key={index}
                className={`page-item ${
                  page === safeCurrentPage ? 'active' : ''
                } ${typeof page === 'string' ? 'disabled' : ''}`}
              >
                {typeof page === 'string' ? (
                  <span className="page-link">...</span>
                ) : (
                  <button
                    type="button"
                    className="page-link"
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </button>
                )}
              </li>
            ))}

            <li
              className={`page-item ${
                safeCurrentPage === totalPages || totalPages === 0 ? 'disabled' : ''
              }`}
            >
              <button
                type="button"
                className="page-link icon"
                onClick={handleNext}
                disabled={safeCurrentPage === totalPages || totalPages === 0}
                aria-label="Next"
              >
                <span className="material-symbols-outlined">
                  keyboard_arrow_right
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;