import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import TextArea from '../../../../../../common/components/gov-uk/TextArea'
import { setCurrentLocationActionPlan } from '../../../../../../common/redux/userSlice'
export default function ActionPlanPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [actionPlan, setActionPlan] = useState('')
  const charLimit = 200
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
  }, [actionPlan])

  const handleButton = async () => {
    setError('')
    if (actionPlan.length > charLimit) {
      setError('You can enter up to 200 characters')
      return
    }
    if (actionPlan) {
      await dispatch(setCurrentLocationActionPlan(actionPlan))
    }
    navigate('/organisation/manage-locations/add/optional-address/add-notes')
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
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
                id='action-plan-input'
                onChange={(val) => setActionPlan(val)}
                className='govuk-textarea'
              />
              <p>You can enter up to 200 characters.</p>
              <Button
                text='Continue'
                className='govuk-button'
                onClick={handleButton}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
