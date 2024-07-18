import React from 'react'
import Input from '../gov-uk-components/Input'

export default function Radio({
  label,
  value,
  name,
  onChange,
  small,
  conditional,
  conditionalQuestion,
  conditionalInput,
  conditionalError
}) {
  const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children

  return (
    <>
      <ConditionalWrapper
        condition={small}
        wrapper={(children) => (
          <div className="govuk-radios govuk-radios--small">{children}</div>
        )}
      >
        <div className="govuk-radios__item">
          <input
            className="govuk-radios__input"
            type="radio"
            value={value}
            name={name}
            onChange={onChange}
            id={'id' + label}
          />
          <label
            className="govuk-label govuk-radios__label"
            htmlFor={'id' + label}
          >
            {label}
          </label>
        </div>
        {conditional && (
          <div className="govuk-radios__conditional">
            <div
              className={
                conditionalError
                  ? 'govuk-form-group govuk-form-group--error'
                  : 'govuk-form-group'
              }
            >
              <Input
                name={conditionalQuestion}
                className="govuk-input govuk-!-width-one-half"
                inputType="text"
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
