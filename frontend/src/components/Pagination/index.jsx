import { TbCaretRightFilled, TbCaretLeftFilled } from "react-icons/tb";

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  nextPage,
  prevPage,
  currentPage,
  pageCount,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex row-span-1">
      <TbCaretLeftFilled
        onClick={prevPage}
        disabled={currentPage === 1}
        className="hover:bg-primary-800 focus:ring-primary-300 h-12 w-12 rounded-lg items-center justify-center mr-4 bg-[#698c4e] py-2 text-center text-lg font-normal text-white focus:ring-4"
      />
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
      <TbCaretRightFilled
        onClick={nextPage}
        disabled={currentPage === pageCount}
        className="hover:bg-primary-800 focus:ring-primary-300 h-12 w-12 rounded-lg items-center justify-center ml-4 bg-[#698c4e] px-3 py-2 text-center text-lg font-normal text-white focus:ring-4"
      />
    </nav>
  );
};

export default Pagination;
