import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page > totalPages) {
      onPageChange(1); 
    } else {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`text-2xl border-2 w-10 h-10 text-center rounded-full hover:bg-[#6B51FF] hover:text-white hover:cursor-pointer ${
            i === currentPage ? "font-bold bg-[#6B51FF] text-white" : ""
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center mt-10 gap-5">
      <div
        className="border-2 p-2 text-2xl rounded-xl hover:bg-[#6B51FF] hover:text-white hover:cursor-pointer"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaArrowLeft />
      </div>
      {renderPageNumbers()}
      <div
        className="border-2 p-2 text-2xl rounded-xl hover:bg-[#6B51FF] hover:text-white hover:cursor-pointer"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaArrowRight />
      </div>
    </div>
  );
};

export default Pagination;
