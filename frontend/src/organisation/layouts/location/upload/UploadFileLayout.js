import { centroid } from '@turf/turf'
import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import store from '../../../../common/redux/store'
import {
  setCurrentLocationCoordinates,
  setCurrentLocationGeometry,
  setCurrentLocationName
} from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import { geoSafeToWebLocation } from '../../../../common/services/formatters/LocationFormatter'
import { locationInEngland } from '../../../../common/services/validations/LocationInEngland'
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
          , add your organisation’s locations and try again.
        </p>
      )
    case 'Duplicates':
      errorText =
        'Each location name must be unique. You need to change the location names, or delete the duplicate locations from the file, for the following lines that have the same location name:'
      break
    case 'Missing location details':
      errorText =
        'You need to add either a full address and postcode or X and Y coordinates for lines:'
      break
    case 'Missing location name':
      errorText = 'You need to add unique location names for lines:'
      break
  }
  return (
    <p key={index} className='govuk-body'>
      {errorText} <br />
      {error.errorDetails && error.errorDetails.join(', ')}
    </p>
  )
}

export default function UploadFileLayout ({
  uploadMethod // Currently either "csv" or "shape"
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [errorFileType, setErrorFileType] = useState(null)
  const [errorFileSize, setErrorFileSize] = useState(null)
  const [errorShapefile, setErrorShapefile] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [csvErrors, setCsvErrors] = useState([])
  const [templateUrl, setTemplateUrl] = useState(null)
  const orgId = useSelector((state) => state.session.orgId)

  async function getTemplateUrl () {
    const { data } = await backendCall(
      'data',
      'api/bulk_uploads/download_template'
    )
    setTemplateUrl(data)
  }

  useEffect(() => {
    if (location?.state?.errors) {
      setCsvErrors(location?.state?.errors)
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
      bucketFolder = 'zip-uploads'
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

  const checkDuplicateLocation = async (locationName) => {
    const dataToSend = {
      orgId,
      locationName,
      type: 'valid'
    }
    const { data } = await backendCall(
      dataToSend,
      'api/locations/search',
      navigate
    )

    if (data.length > 0) {
      return data[0]
    } else {
      return null
    }
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
          // Unzip the uploaded file and send output back to S3
          const { errorMessage } = await backendCall(
            { zipFileName: uniqFileName },
            'api/shapefile/unzip',
            navigate
          )
          if (errorMessage) {
            setUploading(false)
            setErrorShapefile(['Error uploading file'])
          } else {
            // Validate the files contained within the zip
            const { errorMessage } = await backendCall(
              { zipFileName: uniqFileName },
              'api/shapefile/validate',
              navigate
            )
            if (errorMessage) {
              setUploading(false)
              setErrorShapefile(errorMessage)
            } else {
              const { data: geojsonData, errorMessage } = await backendCall(
                { zipFileName: uniqFileName },
                'api/shapefile/convert',
                navigate
              )
              if (errorMessage) {
                setUploading(false)
                setErrorShapefile([errorMessage])
              } else {
                const bbox = geojsonData?.features[0]?.geometry?.bbox

                const inEngland =
                  (await locationInEngland(bbox[1], bbox[0])) &&
                  (await locationInEngland(bbox[3], bbox[2]))

                const existingLocation = await checkDuplicateLocation(
                  geojsonData?.features[0]?.properties?.lrf15nm
                )

                // Calculate coords of centre of polygon to display the map properly
                const polygonCentre = centroid(
                  geojsonData.features[0]?.geometry
                )

                const formattArea = (area) => {
                  return area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                const shapeArea = formattArea(
                  Math.round(geojsonData.features[0]?.properties?.Shape_Area)
                )
                dispatch(
                  setCurrentLocationCoordinates({
                    latitude: polygonCentre.geometry.coordinates[1],
                    longitude: polygonCentre.geometry.coordinates[0]
                  })
                )
                // console.log('geojsondata: ', geojsonData)
                dispatch(setCurrentLocationGeometry(geojsonData.features[0]))
                dispatch(setCurrentLocationName(geojsonData.fileName))

                const newLocation = store.getState().session.currentLocation
                // console.log('newLocation: ', newLocation)

                if (inEngland && !existingLocation) {
                  navigate(
                    orgManageLocationsUrls.add.confirmLocationsWithShapefile,
                    {
                      state: { shapeArea }
                    }
                  )
                } else if (inEngland && existingLocation) {
                  navigate(
                    orgManageLocationsUrls.add.duplicateLocationComparisonPage,
                    {
                      state: {
                        existingLocation,
                        newLocation: geoSafeToWebLocation(newLocation),
                        numDuplicates: 1
                      }
                    }
                  )
                } else {
                  // Not in England
                }
              }
            }
          }
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
                      ...errorShapefile,
                      ...Array.from(csvErrors, (error) => error.errorMessage)
                    ].filter(Boolean)}
                  />
                )}
                <div className='govuk-grid-column-two-thirds'>
                  <h1 className='govuk-heading-l'>Upload file</h1>
                  <div
                    className={
                    errorFileSize ||
                    errorFileType ||
                    csvErrors.length > 0 ||
                    errorShapefile.length > 0
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
                        {error}
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
                  {csvErrors.map((error, index) =>
                    csvErrorText(error, index, templateUrl)
                  )}
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
