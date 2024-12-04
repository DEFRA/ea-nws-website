import React, { useState } from 'react'
import '../../css/custom.css'

export default function ButtonMenu ({
  title,
  options
}) {

return (
  <div className="button-menu">
    <button type="submit" data-module='govuk-button' className="govuk-button govuk-button--secondary govuk-!-margin-bottom-0">
      {title}
    </button>
    <ul className="button-menu-list">
      {options.map((option, index) => 
        <li key={index}>
          <button type="submit" data-module="govuk-button" 
                  className="button-menu-item govuk-button govuk-button--secondary govuk-!-margin-top-0 govuk-!-margin-bottom-0">
            {option}
          </button>
        </li>
      )}
    </ul>
  </div>
  )
}
