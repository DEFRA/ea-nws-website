import { React, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../../../../common/components/gov-uk/Input'
import { setLocationName } from '../../../../../../common/redux/userSlice'
import { locationNameValidation } from '../../../../../../common/services/validations/LocationNameValidation'

export default function LocationNamePage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    const locationName = name.trim()
    const validationError = locationNameValidation(locationName)
    if (!validationError) {
      dispatch(setLocationName(locationName))
      navigate('/organisation/manage-locations/add/search-option')
    } else {
      setError(validationError)
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>What is the location name?</h1>
            <div className='govuk-body'>
              <p>
                How you refer to the location, for example: head office, Brayton
                Water pumping station.
              </p>
              <Input
                name='Location name'
                inputType='text'
                value={name}
                onChange={(val) => setName(val)}
                error={error}
                className='govuk-input govuk-input--width-20'
              />
              <Button
                text='Continue'
                className='govuk-button'
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
