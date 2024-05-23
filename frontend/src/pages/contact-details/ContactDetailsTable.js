import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import Details from '../../gov-uk-components/Details'

export default function ContactDetailsTable({
  contacts,
  contactTitle,
  contactType,
  notRemovable
}) {
  const detailsMessage = (
    <div>
      You must keep at least one contact on your account.&nbsp;
      <a href="#" classNameName="govuk-link">
        Add a new contact
      </a>
      &nbsp; before removing any you do not need. Or you could&nbsp;
      <a href="#" classNameName="govuk-link">
        Delete your account
      </a>
      &nbsp; instead.
    </div>
  )

  return (
    <>
      <h3 classNameName="govuk-heading-m">{contactTitle}</h3>
      {contacts.length > 0 ? (
        <table classNameName="govuk-table">
          <tbody classNameName="govuk-table__body">
            {contacts.map((contact, index) => (
              <tr key={index} classNameName="govuk-table__row">
                <td classNameName="govuk-table__cell govuk-!-width-full">
                  {contact}
                </td>
                {!notRemovable && (
                  <td classNameName="govuk-table__cell">
                    <Link
                      to="/managecontacts/confirm"
                      state={{
                        type: contactType,
                        contact
                      }}
                      classNameName="govuk-link"
                    >
                      Remove
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      <Button
        classNameName="govuk-button govuk-button--secondary"
        text={'Add a ' + contactType}
      />

      {notRemovable && (
        <Details
          title="If you want to remove this contact"
          text={detailsMessage}
        />
      )}
    </>
  )
}
