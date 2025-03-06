import React from 'react';

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
        onClick={() => {setCursor('wait'); onClick}}
        data-module='govuk-button'
        style={{ cursor: cursor }}
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
