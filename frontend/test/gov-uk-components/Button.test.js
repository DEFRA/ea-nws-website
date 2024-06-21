import '@testing-library/jest-dom/extend-expect'
import { render, screen ,fireEvent} from '@testing-library/react'
import React from 'react'
import Button from '../../src/gov-uk-components/Button'

describe('Button component', () => {
  test('renders with the correct text', () => {
    render(<Button text='Click Me' />)
    const buttonElement = screen.getByText(/click me/i)
    expect(buttonElement).toBeInTheDocument()
  })

  test('applies the correct class name', () => {
    const testClassName = 'test-class'
    render(<Button text='Click Me' className={testClassName} />)
    const buttonElement = screen.getByText(/click me/i)
    expect(buttonElement).toHaveClass(testClassName)
  })

  test('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button text='Click Me' onClick={handleClick} />)
    const buttonElement = screen.getByText(/click me/i)
    fireEvent.click(buttonElement)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('has the correct type attribute', () => {
    render(<Button text='Click Me' />)
    const buttonElement = screen.getByText(/click me/i)
    expect(buttonElement).toHaveAttribute('type', 'submit')
  })
})
