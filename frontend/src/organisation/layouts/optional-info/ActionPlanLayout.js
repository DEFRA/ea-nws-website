import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import TextArea from '../../../common/components/gov-uk/TextArea'
import {
  getLocationOther,
  setCurrentLocationActionPlan
} from '../../../common/redux/userSlice'

export default function ActionPlanLayout ({
  navigateToNextPage,
  error,
  setError
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentActionPlan = useSelector((state) =>
    getLocationOther(state, 'action_plan')
  )
  const [actionPlan, setActionPlan] = useState(currentActionPlan || '')
  const charLimit = 500
  const actionPlanId = 'action-plan'

  useEffect(() => {
    if (actionPlan.length > charLimit) {
      setError(`You can enter up to ${charLimit} characters`)
    } else {
      setError('')
    }
  }, [actionPlan])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (error) return
    dispatch(setCurrentLocationActionPlan(actionPlan))
    // should update the geosafe profile here?

    navigateToNextPage()
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-margin-top-5'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            {error && <ErrorSummary errorList={[{text: error, componentId: actionPlanId}]} />}
            <h1 className='govuk-heading-l'>Action plan (optional)</h1>
            <div className='govuk-body'>
              <p>
                Use this section to indicate what you can do to reduce the
                potential effects of flooding. For example, inspect the location
                then move stock to the top floor and evacuate.
              </p>
              <TextArea
                id={actionPlanId}
                error={error}
                inputType='text'
                rows='5'
                onChange={(val) => setActionPlan(val)}
                value={actionPlan}
                className='govuk-textarea'
                additionalInfo={`You can enter up to ${charLimit} characters`}
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
