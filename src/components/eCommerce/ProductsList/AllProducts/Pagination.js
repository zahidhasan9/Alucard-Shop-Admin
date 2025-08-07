// 'use client';

// import React from 'react';

// const Pagination = ({ page, totalPages, onPageChange }) => {
//   const createPageNumbers = () => {
//     const pages = [];

//     if (totalPages <= 7) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       pages.push(1);
//       if (page > 3) pages.push('start-ellipsis');

//       for (let i = page - 1; i <= page + 1; i++) {
//         if (i > 1 && i < totalPages) {
//           pages.push(i);
//         }
//       }

//       if (page < totalPages - 2) pages.push('end-ellipsis');

//       pages.push(totalPages);
//     }

//     return pages;
//   };

//   const pagesToRender = createPageNumbers();

//   return (
//     <div className="d-flex justify-content-center justify-content-sm-between align-items-center text-center flex-wrap gap-2 showing-wrap">
//       <span className="fs-13 fw-medium">Items per pages: 10</span>

//       <div className="d-flex align-items-center">
//         <span className="fs-13 fw-medium me-2">
//           {(page - 1) * 10 + 1} - {Math.min(page * 10, totalPages * 10)} of {totalPages * 10}
//         </span>

//         <nav aria-label="Page navigation example">
//           <ul className="pagination mb-0 justify-content-center">
//             <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
//               <button
//                 className="page-link icon"
//                 onClick={() => onPageChange(page - 1)}
//                 disabled={page === 1}
//                 aria-label="Previous"
//               >
//                 <span className="material-symbols-outlined">keyboard_arrow_left</span>
//               </button>
//             </li>

//             {pagesToRender.map((p, index) => (
//               <li
//                 key={index}
//                 className={`page-item ${p === page ? 'active' : ''} ${typeof p === 'string' ? 'disabled' : ''}`}
//               >
//                 {typeof p === 'string' ? (
//                   <span className="page-link">...</span>
//                 ) : (
//                   <button className="page-link" onClick={() => onPageChange(p)}>
//                     {p}
//                   </button>
//                 )}
//               </li>
//             ))}

//             <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
//               <button
//                 className="page-link icon"
//                 onClick={() => onPageChange(page + 1)}
//                 disabled={page === totalPages}
//                 aria-label="Next"
//               >
//                 <span className="material-symbols-outlined">keyboard_arrow_right</span>
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
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
