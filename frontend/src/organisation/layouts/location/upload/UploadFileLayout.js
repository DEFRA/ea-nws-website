import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import { backendCall } from '../../../../common/services/BackendService'
import { orgManageLocationsUrls } from '../../../routes/manage-locations/ManageLocationsRoutes'

export default function UploadFileLayout({
  uploadMethod, // Currently either "bulk" or "shape"
  allowedFileTypes,
  maxFileSize,
  fileTypeHint,
  backendRoute
}) {
  const navigate = useNavigate()
  const [errorFileType, setErrorFileType] = useState(null)
  const [errorFileSize, setErrorFileSize] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const fileTypeErrorMsg =
    uploadMethod === 'bulk'
      ? 'The selected file must be .xls, .xlsx or .csv'
      : 'The selected file must be .zip'

  useEffect(() => {
    setErrorFileType(null)
    setErrorFileSize(null)
  }, [selectedFile])

  const setValidSelectedFile = (data) => {
    const file = data.target.files[0]

    if (checkFile(file)) {
      setSelectedFile(file)
    }
  }

  // Check for valid file
  const checkFile = (file) => {
    let isValidFile = true

    if (!allowedFileTypes.includes(file.type)) {
      setErrorFileType(fileTypeErrorMsg)
      isValidFile = false
    }

    if (file.size === 0) {
      setErrorFileSize('The file is empty')
      isValidFile = false
    } else if (file.size / 1024 > 5 * 1024) {
      setErrorFileSize(`The file must be smaller than ${maxFileSize}MB`)
      isValidFile = false
    }
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
      // Bulk upload logic
      if (uploadMethod === 'bulk') {
        // Get pre-signed URL from backend
        const dataToSend = {
          name: selectedFile.name,
          fileType: selectedFile.type
        }

        const { errorMessage, data } = await backendCall(
          dataToSend,
          backendRoute,
          navigate
        )

        if (errorMessage) {
          // Set to an error to be displayed when doing DoR11 work
          throw new Error(`Failed to get pre-signed URL: ${errorMessage}`)
        }

        const url = data.url
        const uniqFileName = data.fileName

        // Upload the file to S3 using generated URL
        const uploadResponse = await fetch(url, {
          mode: 'cors',
          method: 'PUT',
          headers: {
            'Content-Type': selectedFile.type
          },
          body: selectedFile
        })

        if (!uploadResponse.ok) {
          setUploading(false)
          setErrorFileType('Error uploading file')
        } else {
          navigate(orgManageLocationsUrls.add.loadingPage, {
            state: {
              fileName: uniqFileName
            }
          })
        }
      }
      // Shapefile upload logic
      else {
      }
    } catch (err) {
      setUploading(false)
      setErrorFileType('Error uploading file')
    }
  }

  return (
    <>
      {!uploading && <BackLink onClick={() => navigate(-1)} />}

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          {!uploading ? (
            <>
              {(errorFileType || errorFileSize) && (
                <ErrorSummary errorList={[errorFileType, errorFileSize]} />
              )}
              <div className='govuk-grid-column-full'>
                <h1 className='govuk-heading-l'>Upload file</h1>
                <div
                  className={
                    errorFileSize || errorFileType
                      ? 'govuk-form-group govuk-form-group--error'
                      : 'govuk-form-group'
                  }
                >
                  <p className='govuk-hint'>{fileTypeHint}</p>
                  {errorFileType && (
                    <p id='file-upload-1-error' className='govuk-error-message'>
                      {errorFileType}
                    </p>
                  )}
                  {errorFileSize && (
                    <p id='file-upload-2-error' className='govuk-error-message'>
                      {errorFileSize}
                    </p>
                  )}
                  <input
                    type='file'
                    className={
                      errorFileSize || errorFileType
                        ? 'govuk-file-upload govuk-file-upload--error'
                        : 'govuk-file-upload'
                    }
                    id='file-upload'
                    onChange={setValidSelectedFile}
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
            </>
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
