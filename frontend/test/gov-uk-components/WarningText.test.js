import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'
import WarningText from '../../src/common/components/gov-uk/WarningText'

describe('WarningText component', () => {
  test('renders with the correct text', () => {
    render(
      <WarningText text='This is the warning text.' />
    )
    
    const textElement = screen.getByText(/This is the warning text./i)
    expect(textElement).toBeInTheDocument()
  })
})
