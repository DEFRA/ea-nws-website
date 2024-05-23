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
      <a href="#" className="govuk-link">
        Add a new contact
      </a>
      &nbsp; before removing any you do not need. Or you could&nbsp;
      <a href="#" className="govuk-link">
        Delete your account
      </a>
      &nbsp; instead.
    </div>
  )

  return (
    <>
      <h3 className="govuk-heading-m">{contactTitle}</h3>
      {contacts.length > 0 ? (
        <table className="govuk-table">
          <tbody className="govuk-table__body">
            {contacts.map((contact, index) => (
              <tr key={index} className="govuk-table__row">
                <td className="govuk-table__cell govuk-!-width-full">
                  {contact}
                </td>
                {!notRemovable && (
                  <td className="govuk-table__cell">
                    <Link
                      to="/managecontacts/confirm"
                      state={{
                        type: contactType,
                        contact
                      }}
                      className="govuk-link"
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
        className="govuk-button govuk-button--secondary"
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
