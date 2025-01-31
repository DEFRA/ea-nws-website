import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Button from '../../../common/components/gov-uk/Button'
import Checkbox from '../../../common/components/gov-uk/CheckBox'
import { backendCall } from '../../../common/services/BackendService'
import { orgManageLocationsUrls } from '../../routes/manage-locations/ManageLocationsRoutes'
import { orgManageContactsUrls } from '../../routes/manage-contacts/ManageContactsRoutes'
import { geoSafeToWebLocation } from '../../../common/services/formatters/LocationFormatter'

export default function LinkBanner ({
  type,
  linkLocations,
  linkContacts,
  selectedLocations,
  selectedContacts
 }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)
  const currentLocation = geoSafeToWebLocation(useSelector((state) => state.session.currentLocation))
  const currentContact = useSelector((state) => state.session.orgCurrentContact)
  const [onlyShowSelectedOption, setOnlyShowSelectedOption] = useState(false)

  const linkLocationsContacts = async () => {
    let linkLocationIDs = []
    let linkContactIDs = []

    if (linkLocations) {
      linkLocationIDs = [...linkLocations]
      selectedContacts.forEach((contact) => {
        linkContactIDs.push(contact.id)
      })
    }
    else if (linkContacts) {
      linkContactIDs = [...linkContacts]
      selectedLocations.forEach((location) => {
        linkLocationIDs.push(location.id)
      })
    }

    linkLocationIDs.forEach(async function (locationID, idx) {
      const dataToSend = { authToken, orgId, locationId: locationID, contactIds: linkContactIDs }

      const { errorMessage } = await backendCall(
        dataToSend,
        'api/location/attach_contacts',
        navigate
      )

      if (!errorMessage) {
        if (linkLocations) {
          navigate(orgManageLocationsUrls.view.dashboard)
        }
        else if (linkContacts) {
          navigate(orgManageContactsUrls.view.dashboard)
        }
        
      } else {
        console.log(errorMessage)
      }
    })
  }

  const firstFieldText = () => {
    let text = ''

    if (linkLocations && linkLocations.length > 0) {
      if (linkLocations.length > 1) {
        text =
        linkLocations.length + ' locations'
      } else if (currentLocation) {
        text =
          currentLocation.additionals.locationName
      }
    }
    else if (linkContacts) {
      if (linkContacts.length > 1) {
        text =
        linkContacts.length + ' contacts'
      } else if (currentContact) {
        text =
          currentContact.firstname +
          (currentContact.lastname.length > 0
            ? ' ' + currentContact.lastname
            : '')
      }
    }

    return text
  }

  const secondFieldText = () => {
    let text = ''

    if (linkLocations) {
      text = 'Select contacts'
    } else
    {
      text = 'Select locations'
    }

    if (selectedLocations && selectedLocations.length > 0) {
      if (selectedLocations.length > 1) {
        text =
          selectedLocations.length + ' locations'
      } else {
        text =
          selectedLocations[0].additionals.locationName
      }
    }
    else if (selectedContacts && selectedContacts.length > 0) {
      if (selectedContacts.length > 1) {
        text =
          selectedContacts.length + ' contacts'
      } else {
        text =
          selectedContacts[0].firstname +
          (selectedContacts[0].lastname.length > 0
            ? ' ' + selectedContacts[0].lastname
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
            {firstFieldText()}
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
            {secondFieldText()}
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
              text={linkLocations ? 'Link location to contacts' : 'Link contact to locations'}
              className='govuk-button'
              onClick={() => linkLocationsContacts()}
            />
          </div>
        </div>
      </div>

    </div>
  )
}
