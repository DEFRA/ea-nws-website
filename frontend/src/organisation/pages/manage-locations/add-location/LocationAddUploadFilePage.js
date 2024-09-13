// import AWS from 'aws-sdk'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import LoadingSpinner from '../../../../common/components/custom/LoadingSpinner'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import { backendCall } from '../../../../common/services/BackendService'

export default function LocationAddUploadFilePage () {
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
      setErrorFileType('The selected file must be a .xls, .xlsx or .csv')
      isValidFile = false
    } else {
      setErrorFileType(null)
    }

    if (file.size === 0) {
      setErrorFileSize('The file is empty')
      isValidFile = false
    } else if (file.size / 1024 > 5000) {
      setErrorFileSize('The file must be smaller than 5MB')
      isValidFile = false
    } else {
      setErrorFileSize(null)
    }
    console.log('isValidFile: ' + isValidFile)

    return isValidFile
  }

  // Remove this function after debugging
  // const uploadFile = async (file) => {
  //   const S3_BUCKET = 'jibrantest'
  //   const REGION = 'eu-west-2'

  //   AWS.config.update({
  //     accessKeyId: 'accessKeyId',
  //     secretAccessKey: 'secretAccessKey'
  //   })

  //   const s3 = new AWS.S3({
  //     params: { Bucket: S3_BUCKET },
  //     region: REGION
  //   })

  //   const params = {
  //     Body: file,
  //     Bucket: S3_BUCKET,
  //     Key: Date.now() + '_' + file.name
  //   }

  //   try {
  //     await s3.putObject(params).promise()
  //     setUploading(false)
  //     console.log('File uploaded successfully.')
  //   } catch (error) {
  //     console.error(error)
  //     setUploading(false)
  //   }
  // }

  const handleUpload = async (e) => {
    e.preventDefault()

    if (!selectedFile) {
      setErrorFileSize('The file is empty')
    }

    setUploading(true)
    await new Promise((r) => setTimeout(r, 2000)) // Remove after debugging

    const input = { name: selectedFile.name, body: selectedFile }
    const { data, errorMessage } = await backendCall(
      input,
      'api/bulkUpload/uploadFile'
    )
    console.log('File uploaded to s3 bucket: ' + data)
    !errorMessage && setUploading(false)
  }

  return (
    <>
      {!uploading && <BackLink onClick={() => navigate(-1)} />}

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          {(errorFileType || errorFileSize) && (
            <ErrorSummary errorList={[errorFileType, errorFileSize]} />
          )}
          {!uploading
            ? (
              <div className='govuk-grid-column-full'>
                <h1 className='govuk-heading-l'>Upload file</h1>
                {!errorFileType && !errorFileSize
                  ? (
                    <div className='govuk-form-group'>
                      <p className='govuk-hint'>File can be .xls, .xlsx, .csv</p>
                      <input
                        type='file'
                        className='govuk-file-upload'
                        id='file-upload'
                        onChange={setValidselectedFile}
                      />
                    </div>
                    )
                  : (
                    <div className='govuk-form-group govuk-form-group--error'>
                      <p className='govuk-hint'>File can be .xls, .xlsx, .csv</p>
                      {errorFileType && (
                        <p id='file-upload-1-error' className='govuk-error-message'>
                          <span className='govuk-visually-hidden'>Error:</span>
                          {errorFileType}
                        </p>
                      )}
                      {errorFileSize && (
                        <p id='file-upload-1-error' className='govuk-error-message'>
                          <span className='govuk-visually-hidden'>Error:</span>
                          {errorFileSize}
                        </p>
                      )}
                      <input
                        type='file'
                        className='govuk-file-upload govuk-file-upload--error'
                        id='file-upload'
                        onChange={setValidselectedFile}
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
              )
            : (
              <div className='hods-loading-spinner'>
                <LoadingSpinner text='Uploading' loadingText='' />
              </div>
              )}
        </div>
      </main>
    </>
  )
}
