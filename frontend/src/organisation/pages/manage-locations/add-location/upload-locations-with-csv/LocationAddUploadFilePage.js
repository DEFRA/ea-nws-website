// import AWS from 'aws-sdk'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import { Spinner } from '../../../../../common/components/custom/Spinner'
import Button from '../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import { backendCall } from '../../../../../common/services/BackendService'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationAddUploadFilePage() {
  const navigate = useNavigate()
  const [errorFileType, setErrorFileType] = useState(null)
  const [errorFileSize, setErrorFileSize] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const allowedTypes = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]

  const setValidselectedFile = (data) => {
    const file = data.target.files[0]

    if (checkFile(file)) {
      setSelectedFile(file)
    } else {
      setSelectedFile(null)
    }
  }

  // Check for valid file
  const checkFile = (file) => {
    let isValidFile = true

    if (!allowedTypes.includes(file.type)) {
      setErrorFileType('The selected file must be .xls, .xlsx or .csv')
      isValidFile = false
    } else {
      setErrorFileType(null)
    }

    if (file.size === 0) {
      setErrorFileSize('The file is empty')
      isValidFile = false
    } else if (file.size / 1024 > 5 * 1024) {
      setErrorFileSize('The file must be smaller than 5MB')
      isValidFile = false
    } else {
      setErrorFileSize(null)
    }
    console.log('isValidFile: ' + isValidFile)

    return isValidFile
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    setErrorFileSize(null)
    setErrorFileType(null)

    if (!selectedFile) {
      setErrorFileSize('The file is empty')
      return
    }
    setUploading(true)

    try {
      console.dir(selectedFile)

      // Get pre-signed URL from backend
      const dataToSend = {
        name: selectedFile.name,
        fileType: selectedFile.type
      }

      console.log(dataToSend)
      const { errorMessage, data } = await backendCall(
        dataToSend,
        'api/bulk_uploads/upload_file',
        navigate
      )

      if (errorMessage) {
        throw new Error(`Failed to get pre-signed URL: ${errorMessage}`)
      }

      const url = data.url
      const uniqFileName = data.fileName

      console.log(`URL - ${url}`)

      // Upload the file to S3 using generated URL
      const uploadResponse = await fetch(url, {
        mode: 'cors',
        method: 'PUT',
        headers: {
          'Content-Type': selectedFile.type
        },
        body: selectedFile
      })

      console.log(uploadResponse.body)

      if (!uploadResponse.ok) {
        setUploading(false)
        setErrorFileType('Error uploading file')
      } else {
        navigate(orgManageLocationsUrls.add.loadingPage, {
          state: {
            fileName: uniqFileName,
          }
        })
      }
    } catch (err) {
      console.log(err)
      setUploading(false)
      setErrorFileType('Error uploading file')
    }
  }

  return (
    <>
      {!uploading && <BackLink onClick={() => navigate(-1)} />}

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          {(errorFileType || errorFileSize) && (
            <ErrorSummary errorList={[errorFileType, errorFileSize]} />
          )}
          {!uploading ? (
            <div className='govuk-grid-column-full'>
              <h1 className='govuk-heading-l'>Upload file</h1>
                <div className={errorFileSize || errorFileType ? 'govuk-form-group govuk-form-group--error' : 'govuk-form-group'}>
                  <p className='govuk-hint'>File can be .xls, .xlsx, .csv</p>
                  {errorFileType && (
                    <p id='file-upload-1-error' className='govuk-error-message'>
                      <span className='govuk-visually-hidden'>Error:</span>
                      {errorFileType}
                    </p>
                  )}
                  {errorFileSize && (
                    <p id='file-upload-2-error' className='govuk-error-message'>
                      <span className='govuk-visually-hidden'>Error:</span>
                      {errorFileSize}
                    </p>
                  )}
                  <input
                    type='file'
                    className={
                      errorFileSize || errorFileType ? 'govuk-file-upload govuk-file-upload--error' : 'govuk-file-upload'
                    }
                    id='file-upload'
                    onChange={setValidselectedFile}
                  />
                </div>
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
          ) : (
            <div className='govuk-!-text-align-centre'>
              <h1 className='govuk-heading-l'>Uploading</h1>
              <div className='govuk-body'>
                <Spinner size='75' />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
