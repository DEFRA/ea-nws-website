import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import Radio from '../../src/common/components/gov-uk/Radio'

describe('Radio Component', () => {
  const onChange = jest.fn()

  beforeEach(() => {
    onChange.mockClear()
  })

  test('renders correctly with given props', () => {
    render(
      <Radio label="Option 1" value="1" name="testRadio" onChange={onChange} />
    )

    const radioInput = screen.getByLabelText('Option 1')
    expect(radioInput).toBeInTheDocument()
    expect(radioInput).toHaveAttribute('type', 'radio')
    expect(radioInput).toHaveAttribute('value', '1')
    expect(radioInput).toHaveAttribute('name', 'testRadio')
  })

  test('calls onChange when clicked', () => {
    render(
      <Radio label="Option 1" value="1" name="testRadio" onChange={onChange} />
    )

    const radioInput = screen.getByLabelText('Option 1')
    fireEvent.click(radioInput)

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  test('input gets the correct id and label is associated with it', () => {
    render(
      <Radio label="Option 1" value="1" name="testRadio" onChange={onChange} />
    )

    const radioInput = screen.getByLabelText('Option 1')
    const label = screen.getByText('Option 1')

    expect(radioInput).toHaveAttribute('id', 'idOption 1')
    expect(label).toHaveAttribute('for', 'idOption 1')
  })
})
