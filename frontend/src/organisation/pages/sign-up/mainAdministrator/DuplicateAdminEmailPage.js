import { Helmet } from 'react-helmet'
import SignUpDuplicateEmailPageLayout from '../../../../common/layouts/sign-up/SignUpDuplicateEmailPageLayout'

export default function DuplicateAdminEmailPage () {
  return (
    <>
      <Helmet>
        <title>Email Address Already in Use - GOV.UK</title>
      </Helmet>
      <SignUpDuplicateEmailPageLayout />
    </>
  )
}
