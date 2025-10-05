const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex justify-center mt-12 space-x-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-sm border transition-all duration-300 ${
            page === currentPage
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white hover:bg-blue-100 text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
