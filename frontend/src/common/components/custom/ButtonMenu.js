import React, { useState } from 'react'
import '../../css/custom.css'
import {
  faCaretDown,
  faCaretUp
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ButtonMenu ({
  title,
  options,
  onSelect
}) {
  const [menuVisible, setMenuVisible] = useState(false)

  const handleOptionClicked = (e, index) => {
    onSelect(index)
    setMenuVisible(false)
  }

  return (
    <div className='button-menu'>
      <button
        type='submit' data-module='govuk-button' className='govuk-button govuk-button--secondary govuk-!-margin-bottom-0'
        onClick={(e) => { e.currentTarget.blur(); setMenuVisible(!menuVisible) }}
        style={{ selected: '' }}
        aria-expanded={menuVisible}
        aria-controls='button-menu-list'
      >
        {title}
        &nbsp;&nbsp;
        <FontAwesomeIcon icon={(menuVisible ? faCaretUp : faCaretDown)} size='2xs' />
      </button>
      {menuVisible && (
        <ul className='button-menu-list' id='button-menu-list'>
          {options.map((option, index) =>
            <li key={index}>
              <button
                type='submit' data-module='govuk-button'
                className='button-menu-item govuk-button govuk-button--secondary govuk-!-margin-top-0 govuk-!-margin-bottom-0'
                onClick={(e) => { handleOptionClicked(e, index) }}
              >
                {option}
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  )
}
