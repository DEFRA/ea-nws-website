import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import CompaniesHouseNumLayout from '../../../../layouts/companies-house-num/CompaniesHouseNumLayout'
import { orgSignUpUrls } from '../../../../routes/sign-up/SignUpRoutes'

export default function ChangeCompHouseNumPage () {
  const navigate = useNavigate()
  const navigateToNextPage = () => navigate(orgSignUpUrls.review)

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <>
      <Helmet>
        <title>Change Companies House number - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <CompaniesHouseNumLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={NavigateToPreviousPage}
      />
    </>
  )
}
