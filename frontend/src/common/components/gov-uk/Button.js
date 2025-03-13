import React, { useState } from 'react';

export default function Button ({
  text,
  className,
  onClick,
  imageSrc = null,
  imageHgt = '20px'
}) {
  const [cursor, setCursor] = useState('pointer')
  return (
    <>
      <button
        type='submit'
        className={className}
        onClick={(event) => { setCursor('wait'); onClick(event) }}
        data-module='govuk-button'
        style={{ cursor }}
        disabled={cursor === 'wait'}
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
