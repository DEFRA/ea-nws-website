import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import TextArea from '../../../common/components/gov-uk/TextArea'
import {
  getLocationOther,
  setCurrentLocationNotes,
  setOrgCurrentContactNotes
} from '../../../common/redux/userSlice'

export default function NotesLayout ({
  navigateToNextPage,
  keywordType,
  instructionText,
  buttonText = 'Continue',
  onSubmit,
  error,
  setError,
  title = null
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentNotes = useSelector((state) =>
    keywordType === 'location'
      ? getLocationOther(state, 'notes')
      : state.session.orgCurrentContact.comments
  )
  const [notes, setNotes] = useState(currentNotes || '')
  const charLimit = 500
  const locationNotesId = 'location-notes'

  useEffect(() => {
    if (notes.length > charLimit) {
      setError(`You can enter up to ${charLimit} characters`)
    } else {
      setError('')
    }
  }, [notes])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (error) return

    switch (keywordType) {
      case 'location':
        dispatch(setCurrentLocationNotes(notes))
        break
      case 'contact':
        dispatch(setOrgCurrentContactNotes(notes))
        break
      default:
        break
    }
    if (onSubmit) {
      await onSubmit()
    } else {
      navigateToNextPage()
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-8'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            {error && <ErrorSummary errorList={[{text: error, componentId: locationNotesId}]} />}
            <h1 className='govuk-heading-l'>{title || 'Notes (optional)'}</h1>
            <div className='govuk-body'>
              <p className='govuk-hint'>{instructionText}</p>
              <TextArea
                id={locationNotesId}
                error={error}
                inputType='text'
                rows='5'
                onChange={(val) => setNotes(val)}
                value={notes}
                className='govuk-textarea'
                additionalInfo={`You can enter up to ${charLimit} characters`}
              />
              <br />
              <Button
                text={buttonText}
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
