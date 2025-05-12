import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import AddMobileLayout from '../../../../layouts/mobile/AddMobileLayout'

export default function AddMobilePhonePage () {
  const navigate = useNavigate()
  const navigateToNextPage = () =>
    navigate('/signup/contactpreferences/mobile/validate')

  const NavigateToPreviousPage = () => navigate('/signup/contactpreferences')

  return (
    <>
      <Helmet>
        <title>Enter a Mobile Number - Next Warning Service GOV.UK</title>
      </Helmet>
      <AddMobileLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={NavigateToPreviousPage}
      />
    </>
  )
}
