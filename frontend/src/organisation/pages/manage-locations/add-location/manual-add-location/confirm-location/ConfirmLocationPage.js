import { React } from 'react'
import ConfirmLocationLayout from '../../../../../layouts/location/manual-add-or-edit-location/confirm-location/ConfirmLocationLayout'
import { useNavigate } from 'react-router'

export default function ConfirmLocationPage () {
  const navigate = useNavigate()

  return (
    <>
      <ConfirmLocationLayout
        differentXyCoordinates={navigate(-1)}
      />
    </>
  )
}
