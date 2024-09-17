import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import Input from '../../../../../common/components/gov-uk/Input'
export default function AddNotesPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [notes, setNotes] = useState('')

  const handleButton = async () => {
    if (notes !== '') {
      await dispatch()
    }
    navigate('/') //View Location page
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>Notes (optional)</h1>
            <div className='govuk-body'>
              <p>
                Any notes that may be helpful to someone not familiar with this
                location.
              </p>
              <Input
                inputType='text'
                onChange={(val) => setNotes(val)}
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
