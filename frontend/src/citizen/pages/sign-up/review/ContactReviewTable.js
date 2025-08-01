import React from 'react'
import { isMobile } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../common/components/gov-uk/Button'
import UserContactType from '../../../../common/enums/UserContactType'
import ContactReviewRow from './ContactReviewRow'

export default function ContactReviewTable({ contacts }) {
  const navigate = useNavigate()

  const handleButton = (event) => {
    event.preventDefault()
    navigate('/signup/review/addcontact')
  }

  const renderContacts = (type, verified = [], unverified = []) => {
    const rows = []

    if (verified.length > 0) {
      verified.forEach((item, index) => {
        const contact =
          type === UserContactType.Email && isMobile && item.length > 20
            ? item.slice(0, 20) + '...'
            : item

        rows.push(
          <ContactReviewRow
            key={`${type}-${index}`}
            contact={contact}
            contactType={type}
            isConfirmed
            arrayLength={verified.length}
            index={index}
            {...(type === UserContactType.Email && { emailIndex: index })}
          />
        )
      })
    }

    if (unverified.length > 0) {
      unverified.forEach((item, index) => {
        rows.push(
          <ContactReviewRow
            key={`unverified-${type}-${index}`}
            contact={item.address}
            contactType={type}
            index={index}
            arrayLength={unverified.length}
            isConfirmed={false}
          />
        )
      })
    }

    return rows
  }

  return (
    <div className='govuk-!-padding-bottom-4'>
      <h2 className='govuk-heading-m'>How you'll get flood messages</h2>
      <table className='govuk-table govuk-!-margin-bottom-0'>
        <tbody className='govuk-table__body'>
          {renderContacts(
            UserContactType.Email,
            contacts.emails || [],
            contacts.unverifiedEmails || []
          )}
          {renderContacts(
            UserContactType.Mobile,
            contacts.mobilePhones || [],
            contacts.unverifiedMobiles || []
          )}
          {renderContacts(
            UserContactType.Telephone,
            contacts.homePhones || [],
            contacts.unverifiedHomePhones || []
          )}
        </tbody>
      </table>
      <br />
      <Button
        className='govuk-button govuk-button--secondary'
        onClick={handleButton}
        text='Add another email or phone number'
      />
    </div>
  )
}
