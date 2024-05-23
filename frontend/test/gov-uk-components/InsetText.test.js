import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'
import InsetText from '../../src/gov-uk-components/InsetText'

describe('InsetText component', () => {
  test('renders with the correct text', () => {
    const text = 'This is some inset text.'
    render(<InsetText text={text} />)

    const insetTextElement = screen.getByText(text)
    expect(insetTextElement).toBeInTheDocument()
  })

  test.skip('applies the correct class name', () => {
    const text = 'This is some inset text.'
    render(<InsetText text={text} />)

    const insetTextElement = screen.getByText(text)
    expect(insetTextElement).toHaveClass('govuk-inset-text')
  })
})

// error here for build
