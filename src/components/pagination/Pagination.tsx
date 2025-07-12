import { ArrowLeft, ArrowRight } from 'lucide-react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  total: number;
  skip: number;
  limit: number;
  setSkip: (value: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  skip,
  limit,
  setSkip,
}) => {
  const pageCount = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setSkip(selected * limit);
    window.scrollTo({ top: 50, behavior: 'smooth' });
  };

  if (pageCount <= 1) return null;

  const forcePage = Math.min(Math.max(currentPage, 0), pageCount - 1);

  return (
    <div className="flex justify-center gap-2 px-2 py-4 flex-wrap">
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        forcePage={forcePage}
        containerClassName="flex space-x-2"
        pageClassName="rounded"
        pageLinkClassName="block w-full h-full text-center cursor-pointer px-3 py-1 border border-blue-600 rounded"
        activeClassName="bg-blue-600 text-white"
        previousClassName="px-3 py-1 border border-blue-600 rounded"
        previousLinkClassName="flex items-center justify-center cursor-pointer"
        nextClassName="px-3 py-1 border border-blue-600 rounded"
        nextLinkClassName="flex items-center justify-center cursor-pointer"
        breakLabel="..."
        breakClassName="px-3 py-1 border border-gray-300 rounded"
        breakLinkClassName="block w-full h-full text-center"
        previousLabel={
          <div className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Prev
          </div>
        }
        nextLabel={
          <div className="flex items-center">
            Next
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        }
      />
    </div>
  );
};

export default Pagination;
