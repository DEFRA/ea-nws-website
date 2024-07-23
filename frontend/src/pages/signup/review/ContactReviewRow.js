import React from 'react'
import { Link } from 'react-router-dom'

export default function ContactReviewRow ({ contact, contactType, isConfirmed, index }) {
  const rowDetails = () => {
    let titleRow
    let confirmLink
    switch (contactType) {
      case 'homePhone':
        titleRow = 'By phone call'
        confirmLink = isConfirmed ? '' : '/signup/review/validate-landline'
        break
      case 'mobilePhone':
        titleRow = 'By text'
        confirmLink = isConfirmed ? '' : '/signup/review/validate-mobile'
        break
      case 'email':
        titleRow = 'By email'
        confirmLink = isConfirmed ? '' : '/signup/review/validate-email'
        break
      default:
        break
    }
    return { titleRow, confirmLink }    
  }

  return (
    <>
      <tr key={index} className='govuk-table__row' >
        <td className='govuk-table__header govuk-!-width-one-half'>
          {rowDetails().titleRow}
        </td>
        <td className='govuk-table__cell'>
          {contact}
        </td>
        {isConfirmed
          ? (
            <>
              <td className='govuk-table__cell' />
              <td className='govuk-table__cell' />
            </>
            )
          : (
            <>
              <td className='govuk-table__cell'>
                <strong className='govuk-tag govuk-tag--red'>
                  Unconfirmed
                </strong>
              </td>
              <td className='govuk-table__cell'>
                <Link to={rowDetails().confirmLink} className='govuk-link'>Confirm</Link>
              </td>
            </>
            )}
        <td className='govuk-table__cell'>
          <Link
            to='/managecontacts/confirm-delete'
            state={{
              type: contactType,
              contact,
              navigateTo: '/signup/review'
            }}
            className='govuk-link'
          >
            Remove
          </Link>
        </td>
      </tr>
    </>
  )
}
