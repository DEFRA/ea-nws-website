import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import Input from '../../src/gov-uk-components/Input'

describe('Input Component', () => {
  const mockOnChange = jest.fn()

  const setup = (props = {}) => {
    return render(
      <Input
        name='test-input'
        className='test-class'
        value=''
        onChange={mockOnChange}
        {...props}
      />
    )
  }

  it('should render without errors', () => {
    setup()
    expect(screen.getByLabelText('test-input')).toBeInTheDocument()
  })

  it('should render with the correct class when there is no error', () => {
    setup()
    const inputElement = screen.getByLabelText('test-input')
    expect(inputElement).toHaveClass('test-class')
  })

  it('should render with error class and message when error is present', () => {
    setup({ error: 'This is an error message' })
    const inputElement = screen.getByLabelText('test-input')
    expect(inputElement).toHaveClass('govuk-input--error')
    expect(screen.getByText('This is an error message')).toBeInTheDocument()
  })

  it('should call onChange when the input value changes', () => {
    setup()
    const inputElement = screen.getByLabelText('test-input')
    fireEvent.change(inputElement, { target: { value: 'new value' } })
    expect(mockOnChange).toHaveBeenCalledWith('new value')
  })

  it('should have the correct initial value', () => {
    setup({ value: 'initial value' })
    const inputElement = screen.getByLabelText('test-input')
    expect(inputElement).toHaveValue('initial value')
  })
})
