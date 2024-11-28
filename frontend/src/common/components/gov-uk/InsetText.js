import React from 'react'

export default function InsetText ({ text, isTextBold = false }) {
  return (
    <>
      <div className='govuk-inset-text'>
        {isTextBold ? <strong>{text}</strong> : text}
      </div>
    </>
  )
}
