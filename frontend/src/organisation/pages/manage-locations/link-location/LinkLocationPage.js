import React from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'

export default function LinkLocationPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {

  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l'>
              If you want other people (contacts) to
              get available flood messages for
              Location_ID you need to link them
            </h1>
            <p className='govuk-body'>
              As an admin you automatically get sent all available flood messages for
              the predefined boundary just added.
            </p>
            <p className='govuk-body'>
              But contacts will not be able to get flood messages for the predefined
              boundary just added until they're linked to it. Any contacts not linked to
              any locations will not get flood messages.
            </p>
            <p className='govuk-body'>
              Contacts do not have access to this account and cannot log in to it.
            </p>
            <Button
              className='govuk-button'
              text='Link location to contacts now'
              onClick={navigateToNextPage}
            />
            &nbsp; &nbsp;
            <Link
              to='/' // this will change when page is created
              className='govuk-link inline-link'
            >
              I'll do this later
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
