import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import Input from '../../src/common/components/gov-uk/Input'

describe('TextInput component', () => {
  const mockOnChange = jest.fn()

  test('renders the input with the correct name and className', () => {
    render(
      <Input
        name="Test Name"
        className="test-class"
        value=""
        onChange={mockOnChange}
        inputType="text"
      />
    )

    const inputElement = screen.getByLabelText('Test Name')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveClass('test-class')
  })

  test('calls onChange when the input value changes', () => {
    render(
      <Input
        name="Test Name"
        className="test-class"
        value=""
        onChange={mockOnChange}
        inputType="text"
      />
    )

    const inputElement = screen.getByLabelText('Test Name')
    fireEvent.change(inputElement, { target: { value: 'New Value' } })

    expect(mockOnChange).toHaveBeenCalledWith('New Value')
  })

  test('displays the correct initial value', () => {
    render(
      <Input
        name="Test Name"
        className="test-class"
        value="Initial Value"
        onChange={mockOnChange}
        inputType="text"
      />
    )

    const inputElement = screen.getByLabelText('Test Name')
    expect(inputElement).toHaveValue('Initial Value')
  })

  test('renders the input with error message and error class when there is an error', () => {
    const mockOnChange = jest.fn()
    const errorMessage = 'This is an error message'

    render(
      <Input
        name="Test Name"
        className="test-class"
        value=""
        onChange={mockOnChange}
        error={errorMessage}
        inputType="text"
      />
    )

    const inputElement = screen.getByLabelText('Test Name')
    const errorElement = screen.getByText(errorMessage)

    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveClass('govuk-input--error')
    expect(errorElement).toBeInTheDocument()
    expect(errorElement).toHaveClass('govuk-error-message')
  })
})
