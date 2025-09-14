import { GrFormNext } from 'react-icons/gr';
import { GrFormPrevious } from 'react-icons/gr';

type PaginationType = {
    totalPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
};

function Pagination({
    totalPage = 1,
    currentPage = 1,
    onPageChange,
    nextPage,
    prevPage
}: PaginationType) {
    if (totalPage <= 1) return null;

    const getPages = () => {
        const pages = [];

        if (totalPage <= 6) {
            for (let i = 1; i <= totalPage; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage > 3) {
                pages.push('...');
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPage - 1, currentPage + 1);
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPage - 2) {
                pages.push('...');
            }

            pages.push(totalPage);
        }

        return pages;
    };

    const pages = getPages();

    return (
        <div className='mt-10 flex flex-wrap items-center justify-end gap-2'>
            <GrFormPrevious
                onClick={prevPage}
                size={40}
                className={` ${currentPage === 1 ? 'pointer-events-none cursor-not-allowed text-gray-400' : 'cursor-pointer text-black'}`}
            />
            {pages.map((p, idx) =>
                p === '...' ? (
                    <span key={`ellipsis-${idx}`} className='px-3 py-2'>
                        ...
                    </span>
                ) : (
                    <button
                        key={`page-${p}-${idx}`}
                        onClick={() => onPageChange(p as number)}
                        className={`cursor-pointer rounded border border-solid px-4 py-2 transition-all ${
                            currentPage === p
                                ? 'bg-black text-white'
                                : 'border-text-title bg-white hover:bg-black hover:text-white'
                        }`}
                    >
                        {p}
                    </button>
                )
            )}
            <GrFormNext
                onClick={nextPage}
                size={40}
                className={` ${currentPage === totalPage ? 'pointer-events-none cursor-not-allowed text-gray-400' : 'cursor-pointer text-black'}`}
            />
        </div>
    );
}

export default Pagination;
