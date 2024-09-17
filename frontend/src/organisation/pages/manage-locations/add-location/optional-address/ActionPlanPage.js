import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import Input from '../../../../../common/components/gov-uk/Input'
export default function ActionPlanPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [actionPlan, setActionPlan] = useState('')

  const handleButton = async () => {
    if (actionPlan !== '') {
      await dispatch()
    }
    navigate('/organisation/manage-locations/add/optional-address/add-notes')
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>Action plan (optional)</h1>
            <div className='govuk-body'>
              <p>
                What you can do to reduce the potential effects of flooding, for
                example, inspect the location, use sandbags, move stock,
                evacuate.
              </p>
              <Input
                inputType='text'
                onChange={(val) => setActionPlan(val)}
                className='govuk-input govuk-input--width-20'
              />
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
