import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import ConfirmAddressLayout from '../../../../layouts/address/ConfirmAddressLayout'
import { orgSignUpUrls } from '../../../../routes/sign-up/SignUpRoutes'

export default function ConfirmAddressPage() {
  const navigate = useNavigate()
  const navigateToNextPage = () => {
    navigate(orgSignUpUrls.review)
  }

  const navigateToAddAddressPage = () => navigate(orgSignUpUrls.change.address)

  const navigateToEnterAddressManuallyPage = () => {
    navigate(orgSignUpUrls.change.manuallyAdd)
  }

  const navigateToSearchResultsPage = () => {
    navigate(orgSignUpUrls.change.selectAddress)
  }

  return (
    <>
      <Helmet>
        <title>
          Confirm address - Get flood warnings (professional) - GOV.UK
        </title>
      </Helmet>
      <ConfirmAddressLayout
        navigateToNextPage={navigateToNextPage}
        navigateToEnterAddressManuallyPage={navigateToEnterAddressManuallyPage}
        navigateToAddAddressPage={navigateToAddAddressPage}
        navigateToSearchResultsPage={navigateToSearchResultsPage}
      />
    </>
  )
}
