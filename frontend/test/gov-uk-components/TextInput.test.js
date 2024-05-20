import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import TextInput from '../../src/gov-uk-components/TextInput'

describe('TextInput component', () => {
  const mockOnChange = jest.fn()

  test('renders the input with the correct name and className', () => {
    render(
      <TextInput
        name="Test Name"
        className="test-class"
        value=""
        onChange={mockOnChange}
      />
    )

    const inputElement = screen.getByLabelText('Test Name')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveClass('test-class')
  })

  test('calls onChange when the input value changes', () => {
    render(
      <TextInput
        name="Test Name"
        className="test-class"
        value=""
        onChange={mockOnChange}
      />
    )

    const inputElement = screen.getByLabelText('Test Name')
    fireEvent.change(inputElement, { target: { value: 'New Value' } })

    expect(mockOnChange).toHaveBeenCalledWith('New Value')
  })

  test('displays the correct initial value', () => {
    render(
      <TextInput
        name="Test Name"
        className="test-class"
        value="Initial Value"
        onChange={mockOnChange}
      />
    )

    const inputElement = screen.getByLabelText('Test Name')
    expect(inputElement).toHaveValue('Initial Value')
  })
})
