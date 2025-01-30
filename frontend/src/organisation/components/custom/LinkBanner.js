import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Button from '../../../common/components/gov-uk/Button'
import Checkbox from '../../../common/components/gov-uk/CheckBox'
import { backendCall } from '../../../common/services/BackendService'
import { orgManageLocationsUrls } from '../../routes/manage-locations/ManageLocationsRoutes'
import { geoSafeToWebLocation } from '../../../common/services/formatters/LocationFormatter'
import { setLinkLocations } from '../../../common/redux/userSlice'

export default function LinkBanner ({
  type,
  linkLocations,
  selectedContacts
 }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)
  const currentLocation = geoSafeToWebLocation(useSelector((state) => state.session.currentLocation))
  const [onlyShowSelectedOption, setOnlyShowSelectedOption] = useState(false)

  const linkContacts = async () => {
    const linkContactIDs = []
    selectedContacts.forEach((contact) => {
      linkContactIDs.push(contact.id)
    })

    if (linkLocations) {
      linkLocations.forEach(async function (locationID, idx) {
        const dataToSend = { authToken, orgId, locationId: locationID, contactIds: linkContactIDs }

        const { errorMessage } = await backendCall(
          dataToSend,
          'api/location/attach_contacts',
          navigate
        )

        if (!errorMessage) {
          dispatch(setLinkLocations(null))
          navigate(orgManageLocationsUrls.view.dashboard)
        } else {
          console.log(errorMessage)
        }
      })
  }
  }

  const linkLocationsText = (locationsToLink) => {
    let text = ''

    if (locationsToLink && locationsToLink.length > 0) {
      if (locationsToLink.length > 1) {
        text =
          locationsToLink.length + ' locations'
      } else {
        text =
          currentLocation.additionals.locationName
      }
    }

    return text
  }

  const linkContactsText = (contactsToLink) => {
    let text = 'Select contacts'

    if (contactsToLink && contactsToLink.length > 0) {
      if (contactsToLink.length > 1) {
        text =
          contactsToLink.length + ' contacts'
      } else {
        text =
          contactsToLink[0].firstname +
          (contactsToLink[0].lastname.length > 0
            ? ' ' + contactsToLink[0].lastname
            : '')
      }
    }

    return text
  }

  const onlyShowSelected = () => {
    setOnlyShowSelectedOption(!onlyShowSelectedOption)


  }

  return (
    <div
      className='govuk-!-margin-top-1'
      style={{
        width: '100%'
      }}
    >
      <div
        style={{
          border: '1px solid #b1b4b6',
          backgroundColor: '#f3f2f1',
          padding: '1.5rem 1.5rem 1.5rem 1.5rem',
          gap: '30px'
        }}
      >
        <div
            style={{display: 'flex',
            alignItems: 'center', gap: '15px'}}
          >
          <span style={{fontWeight: '700' }}>
            Link
          </span>
          <div
            style={{
              border: '1px solid #b1b4b6',
              width: '277px',
              height: '50px',
              paddingLeft: '20px',
              paddingRight: '20px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {linkLocationsText(linkLocations)}
          </div>
          <span style={{fontWeight: '700' }}>
            to
          </span>
          <div
            style={{
              border: '1px solid #b1b4b6',
              width: '277px',
              height: '50px',
              paddingLeft: '20px',
              paddingRight: '20px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {linkContactsText(selectedContacts)}
          </div>
          {selectedContacts && selectedContacts.length > 0 && (
            <div className='govuk-checkboxes--small' style={{display: 'flex', alignItems: 'center'}}>
              <Checkbox
                label='Only show selected'
                checked={onlyShowSelectedOption}
                onChange={(e) => {
                  onlyShowSelected()
                }}
              />
            </div>
          )}
          <div style={{ marginLeft: 'auto', display: 'flex' }}>
            <Button
              text='Link location to contacts'
              className='govuk-button'
              onClick={() => linkContacts()}
            />
          </div>
        </div>
      </div>

    </div>
  )
}
