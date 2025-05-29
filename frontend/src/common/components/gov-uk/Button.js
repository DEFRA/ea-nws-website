import React, { useState } from 'react';

export default function Button ({
  text,
  className,
  onClick,
  imageSrc = null,
  imageHgt = '20px',
  disable = false
}) {
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
