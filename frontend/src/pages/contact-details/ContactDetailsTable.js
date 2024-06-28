import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'

export default function ContactDetailsTable ({
  contacts,
  contactTitle,
  contactType,
  primaryContact,
  unregisteredContact
}) {
  const navigate = useNavigate()
  const handleButton = () => {
    switch (contactType) {
      case 'email address':
        navigate('/managecontacts/add-email')
        break
      case 'mobile telephone number':
        navigate('/managecontacts/add-mobile')
        break
      case 'telephone number':
        navigate('/managecontacts/add-landline')
        break
    }
  }

  const UnconfirmedLink = () => {
    if (contactType === 'email address') {
      return (
        <>
          <Link to='/managecontacts/validate-email' className='govuk-link'>
            Confirm
          </Link>
        </>
      )
    } else if (contactType === 'mobile telephone number') {
      return (
        <>
          <Link to='/managecontacts/validate-mobile' className='govuk-link'>
            Confirm
          </Link>
        </>
      )
    }
    return (
      <>
        <Link to='/managecontacts/validate-landline' className='govuk-link'>
          Confirm
        </Link>
      </>
    )
  }

  const MaximumReached = () => {
    if (contactType === 'email address') {
      return (
        <div>You've reached maximum of 5 {contactType.toLowerCase()}es.<br /><br /></div>
      )
    } else {
      return (
        <div>You've reached maximum of 5 {contactType.toLowerCase()}s for {contactTitle.toLowerCase()}.<br /><br /></div>

      )
    }
  }

  return (
    <>
      <h3 className='govuk-heading-m'>{contactTitle}</h3>
      {contacts.length > 0 || unregisteredContact.length > 0
        ? (
          <table className='govuk-table'>
            <tbody className='govuk-table__body'>
              {contacts.map((contact, index) => (
                <tr key={index} className='govuk-table__row'>
                  <td className='govuk-table__cell govuk-!-width-full'>
                    {contact}
                  </td>
                  <td className='govuk-table__cell' />
                  <td className='govuk-table__cell' />
                  {contact !== primaryContact
                    ? (
                      <td className='govuk-table__cell'>
                        <Link
                          to='/managecontacts/confirm-delete'
                          state={{
                            type: contactType,
                            contact
                          }}
                          className='govuk-link'
                        >
                          Remove
                        </Link>
                      </td>
                      )
                    : (
                  // empty space in table without this
                      <td className='govuk-table__cell' />
                      )}
                </tr>
              ))}
              {unregisteredContact.map((unregisteredContact, index) => (
                <tr key={index} className='govuk-table__row'>
                  <td className='govuk-table__cell govuk-!-width-full'>
                    {unregisteredContact}
                  </td>
                  <td className='govuk-table__cell'>
                    <strong className='govuk-tag govuk-tag--red'>
                      Unconfirmed
                    </strong>
                  </td>
                  <td className='govuk-table__cell'>
                    <UnconfirmedLink />
                  </td>
                  <td className='govuk-table__cell'>
                    <Link
                      to='/managecontacts/confirm-delete'
                      state={{
                        type: contactType,
                        unregisteredContact
                      }}
                      className='govuk-link'
                    >
                      Remove
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )
        : null}
      {contacts.length + unregisteredContact.length < 5
        ? (<Button
            className='govuk-button govuk-button--secondary'
            text={'Add a ' + contactType}
            onClick={handleButton}
           />)
        : <MaximumReached />}

    </>
  )
}
