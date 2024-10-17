import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react'
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
  onClick,
  position,
  showNotFound = true
}) {
  const [options, setOptions] = useState(null)
  const [, forceUpdate] = useReducer((x) => x + 1, 0)
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
  const [hovered, setHovered] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const ref = useRef(null)

  const isPrintableKeyCode = (keyCode) => {
    return (
      (keyCode > 47 && keyCode < 58) || // number keys
      keyCode === 32 ||
      keyCode === 8 || // spacebar or backspace
      (keyCode > 64 && keyCode < 91) || // letter keys
      (keyCode > 95 && keyCode < 112) || // numpad keys
      (keyCode > 185 && keyCode < 193) || // ;=,-./` (in order)
      (keyCode > 218 && keyCode < 223) // [\]' (in order)
    )
  }

  const handleOptionFocus = (index) => {
    setFocused(index)
    setHovered(null)
    setSelected(index)
  }

  const handeListMouseLeave = () => {
    setHovered(null)
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

  const handlePrintableKey = (event) => {
    const inputElement = ref[-1]
    const eventIsOnInput = event.target === inputElement
    if (!eventIsOnInput) {
      // FIXME: This would be better if it was in componentDidUpdate,
      // but using setState to trigger that seems to not work correctly
      // in preact@8.1.0.
      inputElement.focus()
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
        if (isPrintableKeyCode(event.keyCode)) {
          handlePrintableKey(event)
        }
        break
    }
  }

  const handleChange = (event) => {
    onChange(event.target.value)
  }

  const handleOptionClick = (index) => {
    const selectedOption = options[index]
    setMenuOpen(false)
    onClick(selectedOption)
  }

  const showNoOptionsFound = options?.length === 0 && showNotFound

  const handleOptionMouseEnter = (index) => {
    setHovered(index)
  }

  const cssNamespace = 'autocomplete'
  const menuClassName = `${cssNamespace}__menu`
  const menuModifierDisplayMenu = `${menuClassName}--inline`
  const menuIsVisible = menuOpen || showNoOptionsFound
  const menuModifierVisibility = `${menuClassName}--${
    menuIsVisible ? 'visible' : 'hidden'
  }`

  const menuClassList = [
    menuClassName,
    menuModifierDisplayMenu,
    menuModifierVisibility
  ]

  useEffect(() => {
    options && setMenuOpen(true)
  }, [options])

  const dropDown = useMemo(() => {
    return (
      <>
        {options?.map((option, index) => {
          const showFocused =
            focused === -1 ? selected === index : focused === index
          const optionModifierFocused =
            showFocused && hovered === null
              ? ' autocomplete__option--focused'
              : ''
          const optionModifierOdd =
            index % 2 ? ' autocomplete__option--odd' : ''
          return (
            <li
              aria-selected={focused === index ? 'true' : 'false'}
              className={`autocomplete__option${optionModifierFocused}${optionModifierOdd}`}
              id={`option--${index}`}
              key={index}
              onClick={() => handleOptionClick(index)}
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => handleOptionMouseEnter(index)}
              ref={(optionEl) => {
                ref[index] = optionEl
              }}
              role='option'
              tabIndex='-1'
              aria-posinset={index + 1}
              aria-setsize={options.length}
            >
              {option.name}
            </li>
          )
        })}

        {showNoOptionsFound && (
          <li
            className='autocomplete__option autocomplete__option--no-results'
            role='option'
            aria-disabled='true'
          >
            No results found
          </li>
        )}
      </>
    )
  }, [options, focused, selected, hovered])

  return (
    <>
      <div
        className={
          error === ''
            ? 'govuk-form-group'
            : 'govuk-form-group govuk-form-group--error'
        }
      >
        {name &&
          <label
            className={
            isNameBold === true ? 'govuk-label govuk-label--m' : 'govuk-label'
          }
            htmlFor='govuk-text-input'
          >
            {name}
          </label>}
        {error !== '' && (
          <p id='govuk-text-input-error' className='govuk-error-message'>
            <span className='govuk-visually-hidden'>Error:</span> {error}
          </p>
        )}
        <div
          className='autocomplete__wrapper'
          onKeyDown={(event) => handleKeyDown(event)}
        >
          <input
            className={
              error === '' ? className : className + ' govuk-input--error'
            }
            name={name}
            id='govuk-text-input'
            onClick={handleChange}
            onChange={handleChange}
            onBlur={() => setMenuOpen(false)}
            onFocus={() => setMenuOpen(true)}
            type={inputType}
            role='combobox'
            value={value}
            ref={(inputElement) => {
              ref[-1] = inputElement
            }}
            defaultValue={defaultValue}
            autoComplete='off'
          />
          <ul
            aria-labelledby='id'
            id='listbox'
            role='listbox'
            className={menuClassList.join(' ')}
            onMouseLeave={handeListMouseLeave}
            style={position && { position, zIndex: 1 }}
          >
            {dropDown}
          </ul>
        </div>
      </div>
    </>
  )
}
