import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import store from '../../../../../common/redux/store'
import { getLocationAdditional } from '../../../../../common/redux/userSlice'

export default function SelectNearbyFloodAreasPage() {
  const navigate = useNavigate()
  const locationName = useSelector((state) =>
    getLocationAdditional(state, 'locationName')
  )
  const location = store.getState().session.currentLocation

  // setup a function to grab the nearby flood area data - we already have
  // setup a function to get the history of flood area data
  // make a common function in wfs for other pages to use

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-margin-top-5'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half govuk-body'>
            <h1 class='govuk-heading-l'>Select nearby flood areas</h1>
            <p>
              {locationName} is near to these flood areas. You can select 1 or
              more nearby flood area you want to link this location to.
            </p>
            <Link className='govuk-link'>What are flood areas?</Link>
            <br />
            <Link className='govuk-link'>
              What are the different types of flood messages?
            </Link>

            <p>table here</p>

            <Button
              className='govuk-button'
              text='Link to areas'
              //onClick={}
            />
          </div>
        </div>
      </main>
    </>
  )
}
