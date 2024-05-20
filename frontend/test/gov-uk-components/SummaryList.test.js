import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import SummaryList from '../../src/gov-uk-components/SummaryList'

describe('SummaryList component', () => {
  const mockRows = [
    { title: 'Title 1', value: 'Value 1', change: true, add: false },
    { title: 'Title 2', value: 'Value 2', change: false, add: true }
  ]

  const mockOnAddClick = jest.fn()
  const mockOnChangeClick = jest.fn()

  test('renders the summary list with rows', () => {
    render(
      <SummaryList
        rows={mockRows}
        onAddClick={mockOnAddClick}
        onChangeClick={mockOnChangeClick}
      />
    )

    expect(screen.getByText('Title 1')).toBeInTheDocument()
    expect(screen.getByText('Value 1')).toBeInTheDocument()
    expect(screen.getByText('Title 2')).toBeInTheDocument()
    expect(screen.getByText('Value 2')).toBeInTheDocument()
  })

  test('renders change link when change is true', () => {
    render(
      <SummaryList
        rows={mockRows}
        onAddClick={mockOnAddClick}
        onChangeClick={mockOnChangeClick}
      />
    )

    const changeLink = screen.getByText('Change')
    expect(changeLink).toBeInTheDocument()

    fireEvent.click(changeLink)
    expect(mockOnChangeClick).toHaveBeenCalledWith(0)
  })

  test('renders add link when add is true', () => {
    render(
      <SummaryList
        rows={mockRows}
        onAddClick={mockOnAddClick}
        onChangeClick={mockOnChangeClick}
      />
    )

    const addLink = screen.getByText('Add')
    expect(addLink).toBeInTheDocument()

    fireEvent.click(addLink)
    expect(mockOnAddClick).toHaveBeenCalledWith(1)
  })
})
