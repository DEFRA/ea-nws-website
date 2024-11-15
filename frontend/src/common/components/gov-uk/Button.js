import React from 'react'

export default function Button ({
  text,
  className,
  onClick,
  imageSrc = null,
  imageHgt = '20px'
}) {
  return (
    <>
      <button
        type='submit'
        className={className}
        onClick={onClick}
        data-module='govuk-button'
      >
        {imageSrc && (
          <img
            src={imageSrc}
            alt='link'
            style={{ marginRight: '10px', height: imageHgt }}
          />
        )}
        {text}
      </button>
    </>
  )
}
