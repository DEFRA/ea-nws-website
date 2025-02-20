import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import { backendCall } from '../../../../common/services/BackendService'
import { orgManageLocationsUrls } from '../../../routes/manage-locations/ManageLocationsRoutes'

const csvErrorText = (error, index, templateUrl) => {
  let errorText
  switch (error.errorType) {
    case 'incorrect template':
      return (
        <p key={index} className='govuk-body'>
          <a className='govuk-link ' href={templateUrl}>
            Download the template
          </a>
          , add your organisation's locations and try again.
        </p>
      )
    case 'virus':
      return (
        <div key={index}>
          <p className='govuk-body'>
            <a className='govuk-link ' href={templateUrl}>
              Download the template
            </a>
            and try again.
          </p>
          <p classNAme='govuk-body'>
            If you still cannot upload your organisation's locations contact us within 48 hours at{' '}
            <Link
              className='govuk-link'
              onClick={() => { window.location = 'mailto:getfloodwarnings@environment-agency.gov.uk' }}
            >
              getfloodwarnings@environment-agency.gov.uk
            </Link>.
          </p>
        </div>
      )
    case 'Duplicates':
      errorText = 'Each location name must be unique. You need to change the location names, or delete the duplicate locations from the file, for the following lines that have the same location name:'
      break
    case 'Missing location details':
      errorText = 'You need to add either a full address and postcode or X and Y coordinates for lines:'
      break
    case 'Missing location name':
      errorText = 'You need to add unique location names for lines:'
      break
    default:
      return
  }
  return (
    <p key={index} className='govuk-body'>
      {errorText} <br />
      {error.errorDetails && error.errorDetails.join(', ')}
    </p>
  )
}

const shapeErrorText = (error, index) => {
  switch (error.errorType) {
    case 'virus':
      return (
        <div key={index}>
          <p className='govuk-body'>
            Create a new shapefile and try again.
          </p>
          <p classNAme='govuk-body'>
            If you still cannot upload your organisation's locations contact us within 48 hours at{' '}
            <Link
              className='govuk-link'
              onClick={() => { window.location = 'mailto:getfloodwarnings@environment-agency.gov.uk' }}
            >
              getfloodwarnings@environment-agency.gov.uk
            </Link>.
          </p>
        </div>
      )
    default:
  }
}

export default function UploadFileLayout ({
  uploadMethod // Currently either "csv" or "shape"
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const [errorFileType, setErrorFileType] = useState(null)
  const [errorFileSize, setErrorFileSize] = useState(null)
  const [errorShapefile, setErrorShapefile] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [csvErrors, setCsvErrors] = useState([])
  const [templateUrl, setTemplateUrl] = useState(null)

  async function getTemplateUrl () {
    const { data } = await backendCall(
      'data',
      'api/bulk_uploads/download_template'
    )
    setTemplateUrl(data)
  }

  useEffect(() => {
    if (location?.state?.errors) {
      if (uploadMethod === 'csv') {
        setCsvErrors(location?.state?.errors)
      } else if (uploadMethod === 'shape') {
        setErrorShapefile(location?.state?.errors)
      }
      setUploading(false)
      getTemplateUrl()
    }
  }, [])

  const backendRoute = 'api/bulk_uploads/upload_file'

  // Switch case for dynamically setting parameters based off of uploadMethod prop
  let allowedFileTypes = []
  let maxFileSize = null
  let fileTypeHint = ''
  let fileTypeErrorMsg = ''
  let bucketFolder = ''
  switch (uploadMethod) {
    // CSV file uploaded for bulk upload
    case 'csv':
      allowedFileTypes = ['text/csv', 'application/vnd.ms-excel']
      maxFileSize = 5
      fileTypeHint = 'File must be .csv'
      fileTypeErrorMsg = 'The selected file must be .csv'
      bucketFolder = 'csv-uploads'
      break
    // ZIP file uploaded for shapefile parsing
    case 'shape':
      allowedFileTypes = ['application/zip', 'application/x-zip-compressed']
      maxFileSize = 5
      fileTypeHint = 'File must be .zip'
      fileTypeErrorMsg = 'The selected file must be .zip'
      bucketFolder = 'zip-uploads/zip'
      break
    default:
      // Null values already set
      break
  }

  useEffect(() => {
    if (selectedFile !== null) {
      setErrorFileType(null)
      setErrorFileSize(null)
      setCsvErrors([])
      setErrorShapefile([])
    }
  }, [selectedFile])

  const setValidSelectedFile = (data) => {
    const file = data.target.files[0]

    if (checkFile(file)) {
      setSelectedFile(file)
    }
  }

  // Check for valid file
  const checkFile = (file) => {
    if (!allowedFileTypes.includes(file.type)) {
      setErrorFileType(fileTypeErrorMsg)
      return false
    }

    // For firefox on windows we have to allow xls file MIME type.
    // check the file name ends with .csv to stop .xls.
    if (uploadMethod === 'csv' && !file.name.endsWith('.csv')) {
      setErrorFileType(fileTypeErrorMsg)
      return false
    }

    if (file.size === 0) {
      setErrorFileSize('The file is empty')
      return false
    } else if (file.size / 1024 > maxFileSize * 1024) {
      setErrorFileSize(`The file must be smaller than ${maxFileSize}MB`)
      return false
    }
    return true
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    setErrorFileSize(null)
    setErrorFileType(null)
    setErrorShapefile([])

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
        throw new Error('Error uploading file')
      }
      const url = data?.url
      const uniqFileName = data?.fileName

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
        // Take user to csv upload scanning page
        if (uploadMethod === 'csv') {
          navigate(orgManageLocationsUrls.add.loadingPage, {
            state: {
              fileName: uniqFileName
            }
          })
        } else if (uploadMethod === 'shape') {
          navigate(orgManageLocationsUrls.add.loadingShapefilePage, {
            state: {
              fileName: uniqFileName
            }
          })
        }
      }
    } catch (err) {
      setUploading(false)
      setErrorFileType(err)
    }
  }

  return (
    <>

      {!uploading && <BackLink onClick={() => navigate(-1)} />}

      <main className='govuk-main-wrapper govuk-!-width-two-thirds'>
        <div className='govuk-grid-row'>
          {!uploading
            ? (
              <>
                {(errorFileType ||
                errorFileSize ||
                csvErrors.length > 0 ||
                errorShapefile.length > 0) && (
                  <ErrorSummary
                    errorList={[
                      errorFileType,
                      errorFileSize,
                      ...Array.from(errorShapefile, (error) => error.errorMessage),
                      ...Array.from(csvErrors, (error) => error.errorMessage)
                    ].filter(Boolean)}
                  />
                )}
                <div className='govuk-grid-column-two-thirds'>
                  <h1 className='govuk-heading-l'>Upload file</h1>
                  <div
                    className={
                    errorFileSize || errorFileType || csvErrors.length > 0 || errorShapefile.length > 0
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
                    {errorShapefile.map((error, index) => (
                      <p key={index} className='govuk-error-message'>
                        {error.errorMessage}
                      </p>
                    ))}
                    {csvErrors.map((error, index) => (
                      <p key={index} className='govuk-error-message'>
                        {error.errorMessage}
                      </p>
                    ))}
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
                  {csvErrors.map((error, index) => (
                    csvErrorText(error, index, templateUrl)
                  ))}
                  {errorShapefile.map((error, index) => (
                    shapeErrorText(error, index)
                  ))}
                  <Button
                    text='Upload file'
                    className='govuk-button govuk-!-margin-top-4'
                    onClick={handleUpload}
                  />
                </div>
              </>
              )
            : (
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
