import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'
import ErrorSummary from '../../src/common/components/gov-uk/ErrorSummary'

describe('ErrorSummary component', () => {
  test('renders with the correct title and error list', () => {
    const errorList = ['Error 1', 'Error 2', 'Error 3']
    render(<ErrorSummary errorList={errorList} />)

    const titleElement = screen.getByText(/there is a problem/i)
    expect(titleElement).toBeInTheDocument()

    errorList.forEach((error) => {
      const errorElement = screen.getByText(error)
      expect(errorElement).toBeInTheDocument()
    })
  })

  test('renders correct number of error items', () => {
    const errorList = ['Error 1', 'Error 2']
    render(<ErrorSummary errorList={errorList} />)

    const errorItems = screen.getAllByRole('listitem')
    expect(errorItems.length).toBe(errorList.length)
  })
})
