import React, { useEffect, useState } from 'react'

export default function Pagination ({
  totalPages,
  onPageChange,
  reset,
  holdPage = 0,
  setHoldPage,
  pageList = false
}) {
  const [currentPage, setCurrentPage] = useState(holdPage || 1)
  const [pageNumbers, setPageNumbers] = useState([1, 2, 3])

  useEffect(() => {
    onPageChange(currentPage)
  }, [currentPage, onPageChange])

  useEffect(() => {
    if (!holdPage) {
      setCurrentPage(1)
    } else {
      setHoldPage(0)
    }
  }, [reset])

  const onClickPrevious = (e) => {
    e.preventDefault()

    if (currentPage > 1) {
      if (currentPage === pageNumbers[0]) {
        // Move the page numbers backwards
        setPageNumbers([--pageNumbers[0], --pageNumbers[1], --pageNumbers[2]])
      }
      setCurrentPage(currentPage - 1)
    }
  }

  const onClickNext = (e) => {
    e.preventDefault()

    if (currentPage < totalPages) {
      if (currentPage === pageNumbers[2]) {
        // Move the page numbers forwards
        setPageNumbers([++pageNumbers[0], ++pageNumbers[1], ++pageNumbers[2]])
      }
      setCurrentPage(currentPage + 1)
    }
  }

  const pageListItem = (index) => {
    if (index > totalPages) return null

    const pageNumber = pageNumbers[index - 1]

    return (
      <>
        <li class={pageNumber === currentPage ? 'govuk-pagination__item govuk-pagination__item--current' : 'govuk-pagination__item'}>
          <a
            class='govuk-link govuk-pagination__link' href='#' aria-label='Page 1' aria-current={pageNumber === currentPage ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault()
              setCurrentPage(pageNumber)
            }}
          >
            {pageNumber}
          </a>
        </li>
      </>
    )
  }

  return (
    <>
      {!pageList && (
        <>
          <nav
            className='govuk-pagination govuk-pagination--block'
            aria-label='Pagination'
          >
            {currentPage > 1 && (
              <div className='govuk-pagination__prev'>
                <a
                  className='govuk-link govuk-pagination__link'
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(currentPage - 1)
                  }}
                  rel='prev'
                >
                  <svg
                    className='govuk-pagination__icon govuk-pagination__icon--prev'
                    xmlns='http://www.w3.org/2000/svg'
                    height='13'
                    width='15'
                    aria-hidden='true'
                    focusable='false'
                    viewBox='0 0 15 13'
                  >
                    <path d='m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z' />
                  </svg>
                  <span className='govuk-pagination__link-title'>
                    Previous<span className='govuk-visually-hidden'> page</span>
                  </span>
                  <span className='govuk-visually-hidden'>:</span>
                  <span className='govuk-pagination__link-label'>
                    {currentPage - 1} of {totalPages}
                  </span>
                </a>
              </div>
            )}
            {currentPage < totalPages && (
              <div className='govuk-pagination__next'>
                <a
                  className='govuk-link govuk-pagination__link'
                  rel='next'
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(currentPage + 1)
                  }}
                >
                  <svg
                    className='govuk-pagination__icon govuk-pagination__icon--next'
                    xmlns='http://www.w3.org/2000/svg'
                    height='13'
                    width='15'
                    aria-hidden='true'
                    focusable='false'
                    viewBox='0 0 15 13'
                  >
                    <path d='m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z' />
                  </svg>
                  <span className='govuk-pagination__link-title'>
                    Next<span className='govuk-visually-hidden'> page</span>
                  </span>
                  <span className='govuk-visually-hidden'>:</span>
                  <span className='govuk-pagination__link-label'>
                    {currentPage + 1} of {totalPages}
                  </span>
                </a>
              </div>
            )}
          </nav>
        </>
      )}
      {totalPages > 1 && (
        <nav class='govuk-pagination' aria-label='Pagination'>
          <div class='govuk-pagination__prev'>
            <a
              class='govuk-link govuk-pagination__link' href='#' rel='prev'
              onClick={(e) => { onClickPrevious(e) }}
            >
              <svg class='govuk-pagination__icon govuk-pagination__icon--prev' xmlns='http://www.w3.org/2000/svg' height='13' width='15' aria-hidden='true' focusable='false' viewBox='0 0 15 13'>
                <path d='m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z' />
              </svg>
              <span class='govuk-pagination__link-title'>
                Previous<span class='govuk-visually-hidden'> page</span>
              </span>
            </a>
          </div>
          <ul class='govuk-pagination__list'>
            {pageListItem(1)}
            {pageListItem(2)}
            {pageListItem(3)}
          </ul>
          <div class='govuk-pagination__next'>
            <a
              class='govuk-link govuk-pagination__link' href='#' rel='next'
              onClick={(e) => { onClickNext(e) }}
            >
              <span class='govuk-pagination__link-title'>
                Next<span class='govuk-visually-hidden'> page</span>
              </span>
              <svg class='govuk-pagination__icon govuk-pagination__icon--next' xmlns='http://www.w3.org/2000/svg' height='13' width='15' aria-hidden='true' focusable='false' viewBox='0 0 15 13'>
                <path d='m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z' />
              </svg>
            </a>
          </div>
        </nav>
      )}
    </>
  )
}
