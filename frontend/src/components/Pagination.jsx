import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="mt-section-gap-md flex justify-center items-center space-x-4">
      <button 
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="p-3 glass-card hover:bg-white/10 text-on-surface transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      
      <div className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 flex items-center justify-center font-label-caps ${
              page === currentPage
                ? "bg-primary text-on-primary font-bold"
                : "glass-card hover:bg-white/10 text-on-surface"
            }`}
          >
            {page.toString().padStart(2, '0')}
          </button>
        ))}
      </div>
      
      <button 
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="p-3 glass-card hover:bg-white/10 text-on-surface transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
};

export default Pagination;
