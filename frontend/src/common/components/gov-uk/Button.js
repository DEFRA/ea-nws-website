import React, { forwardRef, useState } from 'react'

const Button = forwardRef(function Button(
  {
    text,
    className,
    onClick,
    imageSrc = null,
    imageHgt = '20px',
    disable = false
  },
  ref
) {
  const [cursor, setCursor] = useState('pointer')
  return (
    <>
      <button
        type='submit'
        className={className}
        onClick={async (event) => { setCursor('wait'); await onClick(event); setCursor('pointer') }}
        data-module='govuk-button'
        style={{ cursor }}
        disabled={cursor === 'wait' || disable}
        ref={ref}
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
})

export default Button
