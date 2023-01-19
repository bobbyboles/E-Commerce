import React, {useMemo} from "react";
import classnames from "classnames";

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

//THIS ENTIRE SECTION JUST DEFINES THE usePagination hook logic
  const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage
  }) => {

  const paginationRange = useMemo(() => {

    const DOTS = '...'

      const range = (start, end) => {
        let length = end - start + 1;
        return Array.from({ length }, (_, idx) => idx + start);
      };
    
      const totalPageCount = Math.ceil(totalCount / pageSize);

      // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
      const totalPageNumbers = siblingCount + 5;

      //Case 1: If the number of pages is less than the page numbers we want to show in our paginationComponent, we return the range [1..totalPageCount]
      //EX) < *1* 2 3 4 5 >
      if (totalPageNumbers >= totalPageCount) {
        return range(1, totalPageCount);
      }
            
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPageCount
      );

      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
      const firstPageIndex = 1;
      const lastPageIndex = totalPageCount;

      //Case 2: No left dots to show, but rights dots to be shown
      //EX) < *1* 2 3 4 5 ... 50 >
      if (!shouldShowLeftDots && shouldShowRightDots) {
        let leftItemCount = 3 + 2 * siblingCount;
        let leftRange = range(1, leftItemCount);

        return [...leftRange, DOTS, totalPageCount];
      }

      //Case 3: No right dots to show, but left dots to be shown
      //EX) < 1 ... 46 47 48 *49* 50 >
      if (shouldShowLeftDots && !shouldShowRightDots) {
        
        let rightItemCount = 3 + 2 * siblingCount;
        let rightRange = range(
          totalPageCount - rightItemCount + 1,
          totalPageCount
        );
        return [firstPageIndex, DOTS, ...rightRange];
      }
        
      //Case 4: Both left and right dots to be shown
      //EX) < 1 ... 14 *15* 16 ... 100 >
      if (shouldShowLeftDots && shouldShowRightDots) {
        let middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
      }
    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
  };

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  const DOTS = '...'


  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
       {/* Left navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map(pageNumber => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }
		
        // Render our Page Pills
        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination
