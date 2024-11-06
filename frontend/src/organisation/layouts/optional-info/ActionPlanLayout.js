import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import TextArea from '../../../common/components/gov-uk/TextArea'
import { setCurrentLocationActionPlan } from '../../../common/redux/userSlice'

export default function ActionPlanLayout ({ navigateToNextPage }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentActionPlan = useSelector(
    (state) =>
      state.session.currentLocation.meta_data.location_additional.action_plan
  )
  const [actionPlan, setActionPlan] = useState(
    currentActionPlan || ''
  )
  const [error, setError] = useState('')
  const charLimit = 200

  useEffect(() => {
    if (actionPlan.length > charLimit) {
      setError('You can enter up to 200 characters')
    } else {
      setError('')
    }
  }, [actionPlan])

  const handleSubmit = () => {
    if (error) return

    if (actionPlan) {
      dispatch(setCurrentLocationActionPlan(actionPlan))
    }

    // should update the geosafe profile here?

    navigateToNextPage()
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
          <div className='govuk-grid-column-one-half'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>Action plan (optional)</h1>
            <div className='govuk-body'>
              <p>
                What you can do to reduce the potential effects of flooding, for
                example, inspect the location, use sandbags, move stock,
                evacuate.
              </p>
              <TextArea
                error={error}
                inputType='text'
                rows='5'
                onChange={(val) => setActionPlan(val)}
                className='govuk-textarea'
              />
              <p className='govuk-hint'>You can enter up to 200 characters.</p>
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
