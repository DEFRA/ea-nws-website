import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import Pagination from '../../src/gov-uk-components/Pagination'

describe('Pagination Component', () => {
  const onPageChange = jest.fn()

  beforeEach(() => {
    onPageChange.mockClear()
  })

  test('renders correctly and calls onPageChange on mount', () => {
    render(<Pagination totalPages={5} onPageChange={onPageChange} />)

    expect(screen.getByLabelText('Pagination')).toBeInTheDocument()
    expect(onPageChange).toHaveBeenCalledWith(1)
  })

  test('renders "Next" link and calls onPageChange when clicked', () => {
    render(<Pagination totalPages={5} onPageChange={onPageChange} />)

    const nextLink = screen.getByText(/Next/i)
    expect(nextLink).toBeInTheDocument()

    fireEvent.click(nextLink)
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  test('renders "Previous" link and calls onPageChange when clicked', () => {
    render(<Pagination totalPages={5} onPageChange={onPageChange} />)

    // Move to the next page to make "Previous" link appear
    fireEvent.click(screen.getByText(/Next/i))
    fireEvent.click(screen.getByText(/Next/i))

    const prevLink = screen.getByText(/Previous/i)
    expect(prevLink).toBeInTheDocument()

    fireEvent.click(prevLink)
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  test('does not render "Previous" link on the first page', () => {
    render(<Pagination totalPages={5} onPageChange={onPageChange} />)

    const prevLink = screen.queryByText(/Previous/i)
    expect(prevLink).not.toBeInTheDocument()
  })

  test('does not render "Next" link on the last page', () => {
    render(<Pagination totalPages={2} onPageChange={onPageChange} />)

    // Move to the last page to make "Next" link disappear
    fireEvent.click(screen.getByText(/Next/i))

    const nextLink = screen.queryByText(/Next/i)
    expect(nextLink).not.toBeInTheDocument()
  })
})
