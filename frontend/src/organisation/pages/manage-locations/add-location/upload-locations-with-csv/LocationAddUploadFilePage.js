import React from 'react'
import UploadFileLayout from '../../../../layouts/location/upload/UploadFileLayout'

export default function LocationAddUploadFilePage() {
  const allowedTypes = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]
  const fileSize = 5
  const fileTypeMessage = 'File can be .xls, .xlsx or .csv'
  const backendPath = 'api/bulk_uploads/upload_file'

  return (
    <UploadFileLayout
      allowedFileTypes={allowedTypes}
      maxFileSize={fileSize}
      fileTypeHint={fileTypeMessage}
      backendRoute={backendPath}
    />
  )
}
