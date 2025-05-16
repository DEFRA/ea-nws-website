import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import LoadingSpinner from '../../../common/components/custom/LoadingSpinner'
import Button from '../../../common/components/gov-uk/Button'
import Checkbox from '../../../common/components/gov-uk/CheckBox'
import { backendCall } from '../../../common/services/BackendService'
import { geoSafeToWebLocation } from '../../../common/services/formatters/LocationFormatter'
import { orgManageContactsUrls } from '../../routes/manage-contacts/ManageContactsRoutes'
import { orgManageLocationsUrls } from '../../routes/manage-locations/ManageLocationsRoutes'

export default function LinkBanner({
  linkLocations,
  linkContacts,
  selectedLocations,
  selectedContacts,
  onOnlyShowSelected,
  linkSource,
  setErrorMessage
}) {
  const navigate = useNavigate()

  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)
  const currentLocation = geoSafeToWebLocation(
    useSelector((state) => state.session.currentLocation)
  )
  const currentContact = useSelector((state) => state.session.orgCurrentContact)
  const predefinedBoundaryFlow = useSelector(
    (state) => state.session.predefinedBoundaryFlow
  )
  const [onlyShowSelectedOption, setOnlyShowSelectedOption] = useState(false)
  const [linking, setLinking] = useState(false)
  const [stage, setStage] = useState('')

  const getSuccessMessage = () => {
    let afterText = ''
    let beforeText = ''
    if (linkLocations) {
      if (linkLocations.length > 1) {
        afterText = linkLocations.length + ' locations'
      } else if (currentLocation) {
        if (predefinedBoundaryFlow || linkSource === 'dashboard') {
          afterText = currentLocation.additionals.locationName
        } else {
          afterText = 'this location'
        }
      }
      if (selectedContacts && selectedContacts.length > 0) {
        if (selectedContacts.length > 1) {
          beforeText = selectedContacts.length + ' contacts linked to '
        } else {
          beforeText =
            selectedContacts[0].firstname +
            (selectedContacts[0].lastname.length > 0
              ? ' ' + selectedContacts[0].lastname
              : '') +
            ' linked to '
        }
      }
    }
    if (linkContacts) {
      if (linkContacts.length > 1) {
        beforeText = linkContacts.length + ' contacts linked to '
      } else if (currentContact) {
        beforeText =
          currentContact.firstname +
          (currentContact.lastname.length > 0
            ? ' ' + currentContact.lastname
            : '') +
          ' linked to '
      }
      if (selectedLocations && selectedLocations.length > 0) {
        if (selectedLocations.length > 1) {
          afterText = selectedLocations.length + ' locations'
        } else {
          afterText = selectedLocations[0].additionals.locationName
        }
      }
    }
    return beforeText + afterText
  }

  const linkLocationsContacts = async (event) => {
    event.preventDefault()
    let linkLocationIDs = []
    let linkContactIDs = []

    let errorFound = false

    if (linkLocations) {
      if (selectedContacts && selectedContacts.length > 0) {
        linkLocationIDs = [...linkLocations]
        selectedContacts.forEach((contact) => {
          linkContactIDs.push(contact.id)
        })
      } else {
        errorFound = true
        setErrorMessage('No contacts selected')
      }
    } else if (linkContacts) {
      if (selectedLocations && selectedLocations.length > 0) {
        linkContactIDs = [...linkContacts]
        selectedLocations.forEach((location) => {
          linkLocationIDs.push(location.id)
        })
      } else {
        errorFound = true
        setErrorMessage('No locations selected')
      }
    }

    if (!errorFound) {
      const numLocations = linkLocationIDs.length
      // only show the linking progress if more than one location
      // is being linked too 
      numLocations > 1 && setLinking(true)
      for (const [index, locationID] of linkLocationIDs.entries()) {
        setStage(`Linking (${Math.round(((index + 1) / numLocations) * 100)}%)`)
        const dataToSend = {
          authToken,
          orgId,
          locationId: locationID,
          contactIds: linkContactIDs
        }

        const { errorMessage } = await backendCall(
          dataToSend,
          'api/location/attach_contacts',
          navigate
        )

        if (errorMessage) {
          errorFound = true
          console.log(errorMessage)
        }
      }
      setLinking(false)
    }

    if (!errorFound) {
      setErrorMessage('')
      const successMessage = [getSuccessMessage()]
      if (linkLocations) {
        if (predefinedBoundaryFlow) {
          navigate(orgManageLocationsUrls.add.predefinedBoundary.addAnother, {
            state: {
              successMessage
            }
          })
        } else if (linkSource === 'dashboard') {
          navigate(orgManageLocationsUrls.view.dashboard, {
            state: {
              successMessage
            }
          })
        } else {
          navigate(orgManageLocationsUrls.view.viewLinkedContacts, {
            state: {
              successMessage
            }
          })
        }
      } else if (linkContacts) {
        if (linkSource === 'dashboard') {
          navigate(orgManageContactsUrls.view.dashboard, {
            state: {
              successMessage,
              addContactFlow: true
            }
          })
        } else {
          navigate(orgManageContactsUrls.view.viewLinkedLocations, {
            state: {
              successMessage
            }
          })
        }
      }
    }
  }

  const firstFieldText = () => {
    let text = ''

    if (linkLocations && linkLocations.length > 0) {
      if (linkLocations.length > 1) {
        text = linkLocations.length + ' locations'
      } else if (currentLocation) {
        text = currentLocation.additionals.locationName
      }
    } else if (linkContacts) {
      if (linkContacts.length > 1) {
        text = linkContacts.length + ' contacts'
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
    } else {
      text = 'Select locations'
    }

    if (selectedLocations && selectedLocations.length > 0) {
      if (selectedLocations.length > 1) {
        text = selectedLocations.length + ' locations'
      } else {
        text = selectedLocations[0].additionals.locationName
      }
    } else if (selectedContacts && selectedContacts.length > 0) {
      if (selectedContacts.length > 1) {
        text = selectedContacts.length + ' contacts'
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

  const actionOnlyShowSelected = () => {
    setOnlyShowSelectedOption((onlyShowSelectedOption) => {
      const updatedOnlyShowSelectedOption = !onlyShowSelectedOption
      onOnlyShowSelected(updatedOnlyShowSelectedOption)
      return updatedOnlyShowSelectedOption
    })
  }

  return (
    <>
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
          padding: '30px 20px',
          gap: '30px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}
        >
          <span style={{ fontWeight: '700' }}>Link</span>
          <div
            style={{
              border: '1px solid #b1b4b6',
              height: '50px',
              paddingLeft: '20px',
              paddingRight: '20px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {firstFieldText()}
          </div>
          <span style={{ fontWeight: '700' }}>to</span>
          <div
            style={{
              border: '1px solid #b1b4b6',
              height: '50px',
              paddingLeft: '20px',
              paddingRight: '20px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {secondFieldText()}
          </div>
          {((selectedContacts && selectedContacts.length > 0) ||
            (selectedLocations && selectedLocations.length > 0)) && (
            <div
              className='govuk-checkboxes--small'
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Checkbox
                label='Only show selected'
                style={{ maxWidth: '100%' }}
                checked={onlyShowSelectedOption}
                onChange={() => {
                  actionOnlyShowSelected()
                }}
              />
            </div>
          )}
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Button
              text={
                linkLocations
                  ? 'Link location to contacts'
                  : 'Link contact to locations'
              }
              className='govuk-button govuk-!-margin-0'
              onClick={(event) => linkLocationsContacts(event)}
            />
          </div>
        </div>
      </div>
    </div>
    {linking &&
        <div className='popup-dialog'>
          <div className='popup-dialog-container govuk-!-padding-bottom-6'>
            <LoadingSpinner
              loadingText={<p className='govuk-body-l'>{stage}</p>}
            />
          </div>
        </div>}
    </>
  )
}
