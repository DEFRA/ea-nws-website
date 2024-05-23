import React from 'react'

export default function Button({ text, classNameName, onClick }) {
  return (
    <>
      <button
        type="submit"
        classNameName={classNameName}
        onClick={onClick}
        data-module="govuk-button"
      >
        {text}
      </button>
    </>
  )
}
