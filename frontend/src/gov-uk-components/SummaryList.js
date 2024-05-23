import React from 'react'

export default function SummaryList({ rows, onAddClick, onChangeClick }) {
  return (
    <>
      <dl classNameName="govuk-summary-list">
        {rows.map((row, index) => (
          <div classNameName="govuk-summary-list__row" key={index}>
            <dt classNameName="govuk-summary-list__key">{row.title}</dt>
            <dd classNameName="govuk-summary-list__value">{row.value}</dd>
            <dd classNameName="govuk-summary-list__actions">
              {row.change ? (
                <dd classNameName="govuk-summary-list__actions">
                  <a
                    classNameName="govuk-link"
                    onClick={() => onChangeClick(index)}
                  >
                    Change
                  </a>
                </dd>
              ) : null}
              {row.add ? (
                <dd classNameName="govuk-summary-list__actions">
                  <a
                    classNameName="govuk-link"
                    onClick={() => onAddClick(index)}
                  >
                    Add
                  </a>
                </dd>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </>
  )
}
