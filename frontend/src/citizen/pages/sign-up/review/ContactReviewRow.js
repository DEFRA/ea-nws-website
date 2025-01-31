import React from 'react'
import { Link } from 'react-router-dom'

export default function ContactReviewRow ({
  contact,
  contactType,
  isConfirmed,
  key,
  emailIndex
}) {
  const rowDetails = () => {
    let titleRow
    let confirmLink
    let showDelete = true
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
        showDelete = emailIndex !== 0
        break
      default:
        break
    }
    return { titleRow, confirmLink, showDelete }
  }

  return (
    <>
      <tr key={key} className='govuk-table__row'>
        <td className='govuk-table__header text-nowrap'>
          {rowDetails().titleRow}
        </td>
        <td className='custom-table-cell govuk-table__cell'>
          {contact}
          {!isConfirmed && (
            <>
              <br />
              <br />
              <strong className='govuk-tag govuk-tag--red '>Unconfirmed</strong>
            </>
          )}
        </td>

        <td className='custom-table-cell govuk-table__cell'>
          {rowDetails().showDelete && (
            <Link
              to='/signup/review/remove-contact'
              state={{
                type: contactType,
                contact
              }}
              className='govuk-link right'
            >
              Remove
            </Link>
          )}
          {!isConfirmed && (
            <>
              <br />
              <br />
              <Link to={rowDetails().confirmLink} className='govuk-link right'>
                Confirm
              </Link>
            </>
          )}
        </td>
      </tr>
    </>
  )
}
