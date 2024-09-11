import AWS from 'aws-sdk'
import S3 from 'aws-sdk/clients/s3'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import LoadingSpinner from '../../../../common/components/custom/LoadingSpinner'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'

export default function LocationAddUploadFilePage () {
  const navigate = useNavigate()
  const [errorFileType, setErrorFileType] = useState('')
  const [errorFileSize, setErrorFileSize] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const authToken = useSelector((state) => state.session.authToken)

  const allowedTypes = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]

  const setFile = (data) => {
    console.log('Laurent DATA', data)

    if (checkFile(data.target.files[0])) {
      setSelectedFile(data.target.files[0])
      console.log('Laurent DATA', selectedFile)
    } else {
      setSelectedFile(null)
    }
  }

  const checkFile = (file) => {
    let isValidFile = true

    if (!allowedTypes.includes(file.type)) {
      setErrorFileType('The selected file must be a .xls, .xlsx or .csv')
      isValidFile = false
    } else {
      setErrorFileType('')
    }
    if (file.size === 0) {
      setErrorFileSize('The file is empty')
      isValidFile = false
    } else if (file.size / 1024 > 5000) {
      setErrorFileSize('The file must be smaller than 5MB')
      isValidFile = false
    } else {
      setErrorFileSize('')
    }

    return isValidFile
  }

  const handleUpload = async (e) => {
    e.preventDefault()

    if (!selectedFile) {
      setErrorFileSize('The file is empty')
      return
    }

    setUploading(true)

    // Fetch Create the following S3 User to allow access to the S3 bucket.
    // Create and fetch the values from the secret manager
    AWS.config.update({
      accessKeyId: 'S3User_accessKeyId',
      secretAccessKey: 'S3User_secretAccessKey'
    })

    // Fetch Create the following in the AWS Secret Manager and fetch the values from it
    const S3_BUCKET = 'laurentpeny ' // TODO Replace with the S3 location upload bucket name
    const REGION = 'eu-west-2' // TODO Replace with secret manager
    const s3 = new S3({
      params: { Bucket: S3_BUCKET },
      region: REGION
    })

    const params = {
      Bucket: S3_BUCKET,
      Key: selectedFile.name,
      Body: selectedFile
    }

    console.log('LAURENT - handleUpload, with file:')
    console.log(selectedFile)

    try {
      const upload = await s3.putObject(params).promise()
      console.log(upload)
      setUploading(false)
      alert('File uploaded successfully.')
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />

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
                        onChange={setFile}
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
                        onChange={setFile}
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
                <LoadingSpinner>Uploading</LoadingSpinner>
              </div>
              )}
        </div>
      </main>
    </>
  )
}
