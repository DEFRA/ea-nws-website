import React, { useEffect, useReducer, useState } from 'react'
import '../../css/autocomplete.css'

export default function Autocomplete ({
  name,
  className,
  value,
  defaultValue = '',
  inputType,
  onChange,
  error = '',
  isNameBold = false,
  results,
  menuOpen
}) {

  const [options, setOptions] = useState([])
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  useEffect(() => {
    setOptions(results)
    forceUpdate()
  }, [results])

  const keyCodes = {
    13: 'enter',
    27: 'escape',
    32: 'space',
    38: 'up',
    40: 'down'
  }
  const [selected, setSelected] = useState(-1)
  const [focused, setFocused] = useState(-1)
  const [hovered, setHovered] = useState(null)

  const handleOptionFocus = (index) => {
    setFocused(index)
    setHovered(null)
    setSelected(index)
  }


  const handleUpArrow = (event) => {
    event.preventDefault()
    const isNotAtTop = selected !== -1
    const allowMoveUp = isNotAtTop && menuOpen
    if (allowMoveUp) {
      handleOptionFocus(selected - 1)
    }
  }

  const handleDownArrow = (event) => {
    event.preventDefault()
    if (menuOpen === true) {
      const isNotAtBottom = selected !== options.length - 1
      const allowMoveDown = isNotAtBottom && menuOpen
      if (allowMoveDown) {
        handleOptionFocus(selected + 1)
      }
    }
  }


  const handleKeyDown = (event) => {
    switch (keyCodes[event.keyCode]) {
      case 'up':
        handleUpArrow(event)
        break
      case 'down':
        handleDownArrow(event)
        break
      default:
        break
    }
  }

  const handleChange = (event) => {
    onChange(event.target.value)
  }

  const handleOptionClick = (index) => {
    const selectedOption = options[index]
    onChange(selectedOption)
  }

  const showNoOptionsFound = options?.length === 0


  const handleOptionMouseEnter = (index) => {
    setHovered(index)
  }

  return (
    <>
      <div
        className={
          error === ''
            ? 'govuk-form-group'
            : 'govuk-form-group govuk-form-group--error'
        }
      >
        <label
          className={
            isNameBold === true ? 'govuk-label govuk-label--m' : 'govuk-label'
          }
          htmlFor='govuk-text-input'
        >
          {name}
        </label>
        {error !== '' && (
          <p id='govuk-text-input-error' className='govuk-error-message'>
            <span className='govuk-visually-hidden'>Error:</span> {error}
          </p>
        )}
        <div className='autocomplete_wrapper' onKeyDown={handleKeyDown}>
          <input
            className={
              error === '' ? className : className + ' govuk-input--error'
            }
            name={name}
            id='govuk-text-input'
            onClick={handleChange}
            onChange={handleChange}
            type={inputType}
            role='combobox'
            value={value}
            defaultValue={defaultValue}
          />
          <ul>
          {options?.forEach((option, index) => {
            const showFocused = focused === -1 ? selected === index : focused === index
            const optionModifierFocused = showFocused && hovered === null ? ` autocomplete__option--focused` : ''
            const optionModifierOdd = (index % 2) ? ` autocomplete__option--odd` : ''
            return (
              <li
                aria-selected={focused === index ? 'true' : 'false'}
                className={`autocomplete__option${optionModifierFocused}${optionModifierOdd}`}
                id={`option--${index}`}
                key={index}
                onClick={() => handleOptionClick(index)}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => handleOptionMouseEnter(index)}
                role='option'
                tabIndex='-1'
                aria-posinset={index + 1}
                aria-setsize={options.length}
              >{option.name}</li>
            )
          })}

          {showNoOptionsFound && (
            <li className={`autocomplete__option autocomplete__option--no-results`} role='option' aria-disabled='true'>No results found</li>
          )}
          </ul>
        </div>
      </div>
    </>
  )
}
