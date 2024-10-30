import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import Select from '../../src/common/components/gov-uk/Select'

describe('Select Component', () => {
  const onSelect = jest.fn()

  const options = ['Option 1', 'Option 2', 'Option 3']

  beforeEach(() => {
    onSelect.mockClear()
  })

  test('renders correctly with given props', () => {
    render(
      <Select
        label='Select an option'
        options={options}
        name='testSelect'
        hint='Please choose an option'
        onSelect={onSelect}
        initialSelectOptionText='Select an option'
      />
    )

    const selectInput = screen.getByLabelText('Select an option')
    expect(selectInput).toBeInTheDocument()
    expect(selectInput).toHaveAttribute('name', 'testSelect')
    expect(selectInput).toHaveValue('')
  })

  test('calls onSelect when an option is selected', () => {
    render(
      <Select
        label='Select an option'
        options={options}
        name='testSelect'
        hint='Please choose an option'
        onSelect={onSelect}
        initialSelectOptionText='Select an option'
      />
    )

    const selectInput = screen.getByLabelText('Select an option')
    fireEvent.change(selectInput, { target: { value: 'Option 2' } })

    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith('Option 2')
  })

  test('renders error message when error is passed', () => {
    render(
      <Select
        label='Select an option'
        options={options}
        name='testSelect'
        hint='Please choose an option'
        error='This field is required'
        onSelect={onSelect}
      />
    )

    const errorMessage = screen.getByText('This field is required')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveClass('govuk-error-message')
  })

  test('input gets the correct id and label is associated with it', () => {
    render(
      <Select
        label='Select an option'
        options={options}
        name='testSelect'
        hint='Please choose an option'
        onSelect={onSelect}
      />
    )

    const selectInput = screen.getByLabelText('Select an option')
    const label = screen.getByText('Select an option')

    expect(selectInput).toHaveAttribute('id', 'idtestSelect')
    expect(label).toHaveAttribute('for', 'idtestSelect')
  })
})
