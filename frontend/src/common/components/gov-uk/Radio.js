import React from 'react'
import Input from './Input'

const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children

export default function Radio({
  id,
  label,
  value,
  name,
  onChange,
  checked,
  small,
  conditional,
  conditionalHint,
  conditionalQuestion,
  conditionalInput,
  conditionalError,
  conditionalId,
  hint
}) {
  return (
    <>
      <ConditionalWrapper
        condition={small}
        wrapper={(children) => (
          <div className='govuk-radios govuk-radios--small'>{children}</div>
        )}
      >
        <div className='govuk-radios__item'>
          <input
            className='govuk-radios__input'
            type='radio'
            value={value}
            name={name}
            onChange={onChange}
            id= {id || 'id' + label}
            checked={checked}
          />
          <label
            className='govuk-label govuk-radios__label'
            htmlFor={'id' + label}
          >
            {label}
            {hint && <div className='govuk-hint'>{hint}</div>}
          </label>
        </div>
        {conditional && (
          <div className='govuk-radios__conditional'>
            <div
              className={
                conditionalError
                  ? 'govuk-form-group govuk-form-group--error'
                  : 'govuk-form-group'
              }
            >
              {conditionalHint && (
                <div className='govuk-hint'>{conditionalHint}</div>
              )}
              <Input
                id={conditionalId}
                name={conditionalQuestion}
                className='govuk-input govuk-!-width-one-half'
                inputType='text'
                error={conditionalError}
                onChange={conditionalInput}
              />
            </div>
          </div>
        )}
      </ConditionalWrapper>
    </>
  )
}
