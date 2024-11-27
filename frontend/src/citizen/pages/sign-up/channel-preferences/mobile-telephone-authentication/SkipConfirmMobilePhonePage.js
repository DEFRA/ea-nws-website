import * as React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'

export default function SkipConfirmMobilePhonePage () {
  const navigate = useNavigate()
  const session = useSelector((state) => state.session)
  const mobile = useSelector(
    (state) => state.session.profile.unverified.mobilePhones[0].address
  )

  function skipConfirm () {
    if (session.contactPreferences.includes('PhoneCall')) {
      navigate('/signup/contactpreferences/landline/add')
    } else {
      navigate('/signup/accountname/add')
    }
  }

  return (
    <>
      <BackLink to='/signup/contactpreferences/mobile/validate' />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>
              We cannot send flood messages to {mobile} until you confirm this
              number
            </h1>
            <Button
              text="I'll confirm this later"
              className='govuk-button'
              onClick={skipConfirm}
            />
              &nbsp; &nbsp;
            <Link
              to='/signup/contactpreferences/mobile/validate'
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
