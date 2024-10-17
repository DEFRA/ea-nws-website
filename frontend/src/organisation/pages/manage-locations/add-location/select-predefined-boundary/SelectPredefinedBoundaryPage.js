import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import Select from '../../../../../common/components/gov-uk/Select'
import Map from '../../../../components/custom/Map'

export default function SelectPredefinedBoundaryPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  // remove error if user drops a pin
  // useEffect(() => {
  //   if (error) {
  //     setError('')
  //   }
  // }, [pinCoords])

  const handleSubmit = async () => {}

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>Add predefined boundary</h1>
            <div className='govuk-body'>
              <p>Select a boundary to add to this account.</p>
              <div class='govuk-grid-row'>
                <div class='govuk-grid-column-one-third'>
                  <Select label='Boundary type' options={['a', 'b']} />
                  <Select label='Boundary' options={['a', 'b']} />
                  <Button
                    className='govuk-button govuk-!-margin-top-4'
                    text='Add predefined boundary'
                    onClick={handleSubmit}
                  />
                </div>
                <div class='govuk-grid-column-two-thirds'>
                  <Map
                  // setCoordinates={setPinCoords}
                  // type='drop'
                  // showFloodWarningAreas={showFloodWarningAreas}
                  // showFloodAlertAreas={showFloodAlertAreas}
                  // showMarker={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
