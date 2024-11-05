import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import { backendCall } from '../../../../common/services/BackendService'
import { orgManageLocationsUrls } from '../../../routes/manage-locations/ManageLocationsRoutes'

export default function UploadFileLayout({
  uploadMethod // Currently either "bulk" or "shape"
}) {
  const navigate = useNavigate()
  const [errorFileType, setErrorFileType] = useState(null)
  const [errorFileSize, setErrorFileSize] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const backendRoute = 'api/bulk_uploads/upload_file'

  // Switch case for dynamically setting parameters based off of uploadMethod prop
  let allowedFileTypes = []
  let maxFileSize = null
  let fileTypeHint = ''
  let fileTypeErrorMsg = ''
  let bucketFolder = ''
  switch (uploadMethod) {
    // CSV file uploaded for bulk upload
    case 'bulk':
      allowedFileTypes = [
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ]
      maxFileSize = 5
      fileTypeHint = 'File can be .xls, .xlsx or .csv'
      fileTypeErrorMsg = 'The selected file must be .xls, .xlsx or .csv'
      bucketFolder = 'csv-uploads'
      break
    // ZIP file uploaded for shapefile parsing
    case 'shape':
      allowedFileTypes = ['application/zip']
      maxFileSize = 5
      fileTypeHint = 'File must be .zip'
      fileTypeErrorMsg = 'The selected file must be .zip'
      bucketFolder = 'zip-uploads'
      break
    default:
      // Null values already set
      break
  }

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
    } else if (file.size / 1024 > maxFileSize * 1024) {
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
      // Get pre-signed URL from backend
      const dataToSend = {
        name: selectedFile.name,
        fileType: selectedFile.type,
        folder: bucketFolder
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
        console.log('File uploaded!')

        // Take user to bulk upload scanning page
        if (uploadMethod === 'bulk') {
          navigate(orgManageLocationsUrls.add.loadingPage, {
            state: {
              fileName: uniqFileName
            }
          })
        }
        // Unzip the uploaded file and send output back to S3
        else if (uploadMethod === 'shape') {
          console.log(`Attempting file unzip for ${uniqFileName}`)
          const unzipResponse = await backendCall(
            { zipFile: uniqFileName },
            'api/shapefile/unzip',
            navigate
          )
          console.log(`${unzipResponse.status}: ${unzipResponse.message}`)
          if (unzipResponse.status === 200) {
            // Proceed to next page
            console.log('File unzipped successfully')
          } else {
            // Proceed to error page
            console.log('File unzip failure')
          }
        }
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
