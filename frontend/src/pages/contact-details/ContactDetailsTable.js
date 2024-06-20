import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'

export default function ContactDetailsTable({
  contacts,
  contactTitle,
  contactType,
  primaryContact
}) {
  const navigate = useNavigate()
  const handleButton = () => {
    if (contactType === 'email address') {
      navigate('/managecontacts/add-email')
    } else if (contactType === 'mobile telephone number') {
      navigate('/managecontacts/add-mobile')
    } else if (contactType === 'telephone number') {
      navigate('/managecontacts/add-landline')
    }
  }

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
                {contact !== primaryContact ? (
                  <td className="govuk-table__cell">
                    <Link
                      to="/managecontacts/confirm-delete"
                      state={{
                        type: contactType,
                        contact
                      }}
                      className="govuk-link"
                    >
                      Remove
                    </Link>
                  </td>
                ) : (
                  // empty space in table without this
                  <td className="govuk-table__cell" />
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      <Button
        className="govuk-button govuk-button--secondary"
        text={'Add a ' + contactType}
        onClick={handleButton}
      />
    </>
  )
}
