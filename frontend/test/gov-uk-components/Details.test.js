import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'
import Details from '../../src/gov-uk-components/Details'

describe('Details component', () => {
  test('renders with the correct title and text', () => {
    render(
      <Details title='More information' text='This is the detailed text.' />
    )
    const summaryElement = screen.getByText(/more information/i)
    const textElement = screen.getByText(/this is the detailed text./i)

    expect(summaryElement).toBeInTheDocument()
    expect(textElement).toBeInTheDocument()
  })
})
