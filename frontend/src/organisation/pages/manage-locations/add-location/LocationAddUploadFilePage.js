import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import { backendCall } from '../../../../common/services/BackendService'

export default function LocationAddUploadFilePage() {
  const navigate = useNavigate()
  const [errorFileType, setErrorFileType] = useState('')
  const [errorFileSize, setErrorFileSize] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  const handleChooseFile = async (data) => {
    console.log('Laurent DATA', data)
    const payload = {
      entity: 'locationFile',
      documentFileName: data[0].name,
      action: 'putLocationFile',
      documentSize: data[0].size,
      documentFiletype: data[0].type
    }

    if (
      getExtension(data[0].name).toLowerCase() !== 'csv' &&
      getExtension(data[0].name).toLowerCase() !== 'xls' &&
      getExtension(data[0].name).toLowerCase() !== 'xlsx'
    ) {
      setErrorFileType('The selected file must be a .xls, .xlsx or .csv')
    } else {
      setErrorFileType('')
    }
    if (data[0].size === 0) {
      setErrorFileSize('The file is empty')
    } else if (data[0].size / 1024 > 5000) {
      setErrorFileSize('The file must be smaller than 5MB')
    } else {
      setErrorFileSize('')
    }
    setSelectedFile(data[0])

    console.log('Laurent DATA', data[0])
    console.log('Laurent payload', payload)
  }

  function getExtension(filename) {
    return filename.split('.').pop()
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorFileSize('The file is empty')
      return
    }
    console.log('LAURENT - handleUpload, with file:')
    console.log(selectedFile)
    const { errorMessage, data } = await backendCall(
      selectedFile,
      'api/upload/uploadToS3'
    )
    console.log(errorMessage)
    console.log(data)
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          {(errorFileType || errorFileSize) && (
            <ErrorSummary errorList={[errorFileType, errorFileSize]} />
          )}
          <div className='govuk-grid-column-full'>
            <h1 className='govuk-heading-l'>Upload file</h1>
            {!errorFileType && !errorFileSize ? (
              <div className='govuk-form-group'>
                <p className='govuk-hint'>File can be .xls, .xlsx, .csv</p>
                <input
                  type='file'
                  class='govuk-file-upload'
                  id='file-upload'
                  onChange={(val) => {
                    handleChooseFile(val.target.files)
                  }}
                />
              </div>
            ) : (
              <div className='govuk-form-group govuk-form-group--error'>
                <p className='govuk-hint'>File can be .xls, .xlsx, .csv</p>
                {errorFileType && (
                  <p id='file-upload-1-error' class='govuk-error-message'>
                    <span class='govuk-visually-hidden'>Error:</span>
                    {errorFileType}
                  </p>
                )}
                {errorFileSize && (
                  <p id='file-upload-1-error' class='govuk-error-message'>
                    <span class='govuk-visually-hidden'>Error:</span>
                    {errorFileSize}
                  </p>
                )}
                <input
                  type='file'
                  class='govuk-file-upload govuk-file-upload--error'
                  id='file-upload'
                  onChange={(val) => {
                    handleChooseFile(val.target.files)
                  }}
                />
              </div>
            )}
            <Button
              text='Upload'
              className='govuk-button'
              onClick={handleUpload}
            />
            <Link
              onClick={() => navigate(-1)}
              className='govuk-body govuk-link inline-link'
            >
              Cancel
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
