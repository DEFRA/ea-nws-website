import React from 'react'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { forwardRef, useState } from 'react'
import '../../css/custom.css'

export default forwardRef(function ButtonMenu(
  { title, options, onSelect, onOpen, onClose },
  ref
) {
  const [menuVisible, setMenuVisible] = useState(false)

  const handleOptionClicked = (e, index) => {
    onSelect(index)
    setMenuVisible(false)
    if (onClose) onClose()
  }

  return (
    <div className='button-menu'>
      <button
        id='actions-toggle'
        ref={ref}
        type='submit'
        data-module='govuk-button'
        className='govuk-button govuk-button--secondary govuk-!-margin-bottom-0'
        onClick={(e) => {
          e.currentTarget.blur()
          const next = !menuVisible
          setMenuVisible(next)
          if (next && onOpen) onOpen()
          if (!next && onClose) onClose()
        }}
        style={{ selected: '' }}
        aria-expanded={menuVisible}
        aria-controls='actions-region'
      >
        {title}
        &nbsp;&nbsp;
        <FontAwesomeIcon
          icon={menuVisible ? faCaretUp : faCaretDown}
          size='2xs'
        />
      </button>
      {menuVisible && (
        <ul
          id='actions-region'
          role='region'
          className='button-menu-list'
          aria-labelledby='actions-toggle'
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <li key={index}>
              <button
                type='submit'
                data-module='govuk-button'
                className='button-menu-item govuk-button govuk-button--secondary govuk-!-margin-top-0 govuk-!-margin-bottom-0'
                onClick={(e) => {
                  handleOptionClicked(e, index)
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
})
