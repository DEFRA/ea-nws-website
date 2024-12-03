import React, { useState } from 'react'
import '../../css/custom.css'

export default function ButtonMenu ({
  
}) {

  return (
    <div className="button-menu" data-module="button-menu" data-button-text="Menu title">
      <button type="submit" className="govuk-button button-menu__item govuk-button--secondary" data-module="govuk-button">
        Menu item 1
      </button>
      <button type="submit" className="govuk-button button-menu__item govuk-button--secondary" data-module="govuk-button">
        Menu item 2
      </button>
    </div>
  )
}
