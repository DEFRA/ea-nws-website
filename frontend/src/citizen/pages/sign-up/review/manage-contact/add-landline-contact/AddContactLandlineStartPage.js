import * as React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import AddLandlineLayout from '../../../../../layouts/landline/AddLandlineLayout'

export default function AddLandlineContactPage () {
  const navigate = useNavigate()
  const navigateToNextPage = () =>
    navigate('/signup/review/validate-landline')

  return (
    <>
      <Helmet>
        <title>Enter a telephone number - Get flood warnings - GOV.UK</title>
      </Helmet>
      <AddLandlineLayout navigateToNextPage={navigateToNextPage} />
    </>
  )
}
