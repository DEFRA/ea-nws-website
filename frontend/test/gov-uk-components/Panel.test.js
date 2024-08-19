
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'
import Panel from '../../src/common/components/gov-uk/Panel'

describe('Panel component', () => {
  test('renders with the correct title and body', () => {
    render(
      <Panel
        title='Panel Title'
        body='Panel Body'
      />
    )

    const titleElement = screen.getByText('Panel Title')
    const bodyElement = screen.getByText('Panel Body')

    expect(titleElement).toBeInTheDocument()
    expect(bodyElement).toBeInTheDocument()
  })

  test('renders with the correct title, without body', () => {
    render(
      <Panel
        title='Panel Title'
      />
    )

    const titleElement = screen.getByText('Panel Title')

    expect(titleElement).toBeInTheDocument()

    const bodyElement = screen.queryByText('Panel Body')
    expect(bodyElement).toBeNull()
  })
})
