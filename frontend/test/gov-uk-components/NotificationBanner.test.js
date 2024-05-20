import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'
import NotificationBanner from '../../src/gov-uk-components/NotificationBanner'

describe('NotificationBanner component', () => {
  test('renders with the correct title, heading, and text', () => {
    render(
      <NotificationBanner
        className="custom-class"
        title="Notification Title"
        heading="Notification Heading"
        text="This is the notification text."
      />
    )

    const titleElement = screen.getByText('Notification Title')
    const headingElement = screen.getByText('Notification Heading')
    const textElement = screen.getByText('This is the notification text.')

    expect(titleElement).toBeInTheDocument()
    expect(headingElement).toBeInTheDocument()
    expect(textElement).toBeInTheDocument()
  })

  test('renders with the correct title and text, without heading', () => {
    render(
      <NotificationBanner
        className="custom-class"
        title="Notification Title"
        text="This is the notification text."
      />
    )

    const titleElement = screen.getByText('Notification Title')
    const textElement = screen.getByText('This is the notification text.')

    expect(titleElement).toBeInTheDocument()
    expect(textElement).toBeInTheDocument()

    const headingElement = screen.queryByText('Notification Heading')
    expect(headingElement).toBeNull()
  })

  test('applies the correct class name', () => {
    render(
      <NotificationBanner
        className="custom-class"
        title="Notification Title"
        text="This is the notification text."
      />
    )

    const bannerElement = screen.getByRole('alert')
    expect(bannerElement).toHaveClass('custom-class')
  })
})
