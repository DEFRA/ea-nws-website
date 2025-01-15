import * as React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'

export default function SkipConfirmLandlinePhonePage () {
  const navigate = useNavigate()

  const homePhone = useSelector(
    (state) => state.session.profile.unverified.homePhones[0].address
  )

  function skipConfirm () {
    navigate('/signup/accountname/add')
  }

  return (
    <>

      <BackLink to='/signup/contactpreferences/landline/validate' />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>
              We cannot send flood messages to {homePhone} until you confirm
              this number
            </h1>
            <Button
              text={"I'll confirm this later"}
              className='govuk-button'
              onClick={skipConfirm}
            />
            &nbsp; &nbsp;
            <Link
              to='/signup/contactpreferences/landline/validate'
              className='govuk-body govuk-link inline-link'
            >
              Confirm now
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
