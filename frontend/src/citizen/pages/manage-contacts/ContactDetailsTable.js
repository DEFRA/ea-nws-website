import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../common/components/gov-uk/Button'
import { setCurrentContact } from '../../../common/redux/userSlice'

export default function ContactDetailsTable ({
  contacts,
  contactTitle,
  contactType,
  primaryContact,
  unregisteredContact
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleButton = (event) => {
    event.preventDefault()
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

  const handleContactSelection = (contact, nextPage) => {
    dispatch(setCurrentContact(contact))
    navigate(nextPage)
  }

  const UnconfirmedLink = ({ contact }) => {
    let nextPage

    switch (contactType) {
      case 'email address':
        nextPage = '/managecontacts/validate-email'
        break
      case 'mobile telephone number':
        nextPage = '/managecontacts/validate-mobile'
        break
      case 'telephone number':
        nextPage = '/managecontacts/validate-landline'
        break
    }

    return (
      <>
        <Link
          className='govuk-link right'
          onClick={(e) => {
            e.preventDefault()
            handleContactSelection(contact, nextPage)
          }}
          style={{ cursor: 'pointer' }}
        >
          Confirm
        </Link>
      </>
    )
  }

  const MaximumReached = () => {
    if (contactType === 'email address') {
      return (
        <div>
          You've reached maximum of 5 {contactType.toLowerCase()}es.
          <br />
          <br />
        </div>
      )
    } else {
      return (
        <div>
          You've reached maximum of 5 {contactType.toLowerCase()}s for{' '}
          {contactTitle.toLowerCase()}.<br />
          <br />
        </div>
      )
    }
  }

  return (
    <>
      <h3 className='govuk-heading-m'>{contactTitle}</h3>
      {(contacts.length > 0 || unregisteredContact.length) > 0 && (
        <table className='govuk-table'>
          <tbody className='govuk-table__body'>
            {contacts.map((contact, index) => (
              <tr key={index} className='govuk-table__row'>
                <td className='custom-table-cell govuk-table__cell'>
                  {contact}
                </td>
                {contact !== primaryContact
                  ? (
                    <td className='custom-table-cell govuk-table__cell'>
                      <Link
                        to='/managecontacts/confirm-delete'
                        state={{
                          type: contactType,
                          contact
                        }}
                        className='govuk-link right'
                        style={{ cursor: 'pointer' }}
                      >
                        Remove
                      </Link>
                    </td>
                    )
                  : (
                    <td className='govuk-table__cell' />
                    )}
              </tr>
            ))}
            {unregisteredContact.map((unregisteredContact, index) => (
              <tr key={index} className='govuk-table__row'>
                <td className='custom-table-cell govuk-table__cell'>
                  {unregisteredContact.address}
                  <br />
                  <br />
                  <strong className='govuk-tag govuk-tag--red'>
                    Unconfirmed
                  </strong>
                </td>
                <td className='custom-table-cell govuk-table__cell'>
                  <Link
                    to='/managecontacts/confirm-delete'
                    state={{
                      type: contactType,
                      contact: unregisteredContact.address,
                      navigateTo: '/managecontacts'
                    }}
                    className='govuk-link right'
                    style={{ cursor: 'pointer' }}
                  >
                    Remove
                  </Link>
                  <br />
                  <br />
                  <UnconfirmedLink contact={unregisteredContact.address} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {contacts.length + unregisteredContact.length < 5
        ? (
          <Button
            className='govuk-button govuk-button--secondary'
            text={`Add ${
            contactType === 'email address' ? 'an' : 'a'
          } ${contactType}`}
            onClick={handleButton}
          />
          )
        : (
          <MaximumReached />
          )}
    </>
  )
}
