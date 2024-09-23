import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import TextArea from '../../../../../../common/components/gov-uk/TextArea'
import { setCurrentLocationNotes } from '../../../../../../common/redux/userSlice'
export default function AddNotesPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const charLimit = 200
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
  }, [notes])

  const handleButton = async () => {
    setError('')
    if (notes.length > charLimit) {
      setError('You can enter up to 200 characters')
      return
    }
    if (notes) {
      await dispatch(setCurrentLocationNotes(notes))
    }

    navigate('/') // View Location page
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>Notes (optional)</h1>
            <div className='govuk-body'>
              <p>
                Any notes that may be helpful to someone not familiar with this
                location.
              </p>
              <TextArea
                error={error}
                inputType='text'
                rows='5'
                id='notes-input'
                onChange={(val) => setNotes(val)}
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
