const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  nextPage,
  prevPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex row-span-1">
      <button
        onClick={prevPage}
        // disabled={currentPage === 1}
        className="hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex flex-1 items-center justify-center rounded-lg mr-4 bg-[#698c4e] px-3 py-2 text-center text-lg font-normal text-white focus:ring-4"
      >
        Previous
      </button>
      <ul className="pagination flex justify-center items-center">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item cursor-pointer">
            <span
              onClick={() => paginate(number)}
              className="page-link px-4 py-3 mx-1 bg-[#698c4e] rounded-lg text-white hover:bg-[#31572C]"
            >
              {number}
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={nextPage}
        // disabled={currentPage === pageCount}
        className="hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex flex-1 items-center justify-center rounded-lg ml-4 bg-[#698c4e] px-3 py-2 text-center text-lg font-normal text-white focus:ring-4"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
