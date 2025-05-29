import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import AddLandlineLayout from '../../../layouts/landline/AddLandlineLayout'

export default function AddLandlinePhonePage () {
  const navigate = useNavigate()
  const navigateToNextPage = () => {
    navigate('/managecontacts/validate-landline')
  }

  const NavigateToPreviousPage = () => {
    navigate('/managecontacts')
  }

  return (
    <>
      <Helmet>
        <title>Enter a telephone number to get flood messages by phone call - Get flood warnings - GOV.UK</title>
      </Helmet>
      <AddLandlineLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={NavigateToPreviousPage}
      />
    </>
  )
}
