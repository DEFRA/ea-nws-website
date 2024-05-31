import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import Checkbox from './Checkbox'

describe('Checkbox', () => {
  it('renders checkbox with label', () => {
    const label = 'Checkbox Label'
    const value = 'checkbox-value'
    const checked = true
    const onChange = jest.fn()

    const { getByLabelText } = render(
      <Checkbox
        label={label}
        value={value}
        checked={checked}
        onChange={onChange}
      />
    )

    const checkbox = getByLabelText(label)
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toHaveAttribute('type', 'checkbox')
    expect(checkbox).toHaveAttribute('value', value)
    expect(checkbox).toBeChecked()

    fireEvent.click(checkbox)
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
