import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import Input from '../../src/gov-uk-components/Input'
describe('Input Component', () => {
  const defaultProps = {
    name: 'Test Input',
    className: 'govuk-input',
    value: '',
    onChange: jest.fn(),
    error: ''
  }
  it('renders without crashing', () => {
    render(<Input {...defaultProps} />)
  })
  it('displays the correct label', () => {
    render(<Input {...defaultProps} />)
    expect(screen.getByLabelText(defaultProps.name)).toBeInTheDocument()
  })
  it('has the correct initial value', () => {
    render(<Input {...defaultProps} />)
    const input = screen.getByLabelText(defaultProps.name)
    expect(input).toHaveValue(defaultProps.value)
  })
  it('calls onChange function when input value changes', () => {
    render(<Input {...defaultProps} />)
    const input = screen.getByLabelText(defaultProps.name)
    fireEvent.change(input, { target: { value: 'New Value' } })
    expect(defaultProps.onChange).toHaveBeenCalledWith('New Value')
  })
  it('displays error message when error prop is provided', () => {
    const error = 'This is an error message'
    render(<Input {...defaultProps} error={error} />)
    expect(screen.getByText(error)).toBeInTheDocument()
  })

  it('does not display error message when error prop is empty', () => {
    render(<Input {...defaultProps} error="" />)
    expect(screen.queryByText(/govuk-error-message/)).toBeNull()
  })
  it('applies the correct className when error prop is empty', () => {
    render(<Input {...defaultProps} error="" />)
    const input = screen.getByLabelText(defaultProps.name)
    expect(input).toHaveClass(defaultProps.className)
  })
})
