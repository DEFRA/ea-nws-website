import { Helmet } from 'react-helmet'
import SignUpDuplicateEmailPageLayout from '../../../../common/layouts/sign-up/SignUpDuplicateEmailPageLayout'

export default function DuplicateAdminEmailPage () {
  return (
    <>
      <Helmet>
        <title>Administrator email address already in use - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <SignUpDuplicateEmailPageLayout />
    </>
  )
}
