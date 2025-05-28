import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import AddEmailLayout from '../../../layouts/email/AddEmailLayout'

export default function AddEmailPage () {
  const navigate = useNavigate()
  const navigateToNextPage = () => {
    navigate('/managecontacts/validate-email')
  }

  return (
    <>
      <Helmet>
        <title>Enter an email address - GOV.UK</title>
      </Helmet>
      <AddEmailLayout navigateToNextPage={navigateToNextPage} />
    </>
  )
}
