import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import AddNameLayout from '../../layouts/name/AddNameLayout'
import { orgSignUpUrls } from '../../routes/sign-up/SignUpRoutes'

export default function AddNamePage () {
  const navigate = useNavigate()
  const navigateToNextPage = () => navigate(orgSignUpUrls.admin.mainAdmin)

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <>
      <Helmet>
        <title>Add name - GOV.UK</title>
      </Helmet>
      <AddNameLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={NavigateToPreviousPage}
      />
    </>
  )
}
