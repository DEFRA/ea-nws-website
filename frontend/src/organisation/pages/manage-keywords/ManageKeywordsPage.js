import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Popup from '../../../common/components/custom/Popup'
import Details from '../../../common/components/gov-uk/Details'
import NotificationBanner from '../../../common/components/gov-uk/NotificationBanner'
import { setCurrentLocationKeywords } from '../../../common/redux/userSlice'

export default function ManageKeywordsPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [keywordType, setKeywordType] = useState('location')
  const [selectedKeywords, setSelectedKeywords] = useState([])
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [keywordEditInput, setKeywordEditInput] = useState('')
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [dialogText, setDialogText] = useState('')
  const [notificationText, setNotificationText] = useState('')
  const [dialogTitle, setDialogTitle] = useState('')
  const [dialogButtonText, setDialogButtonText] = useState('')
  const associatedLocation = 2
  const associatedLocations = 6

  // REMOVE WHEN READY - FOR TESTING
  const AddTestData = () => {
    const testData = [
      'keyword1',
      'keyword2',
      'keyword3',
      'keyword4',
      'keyword5',
      'keyword6'
    ]
    dispatch(setCurrentLocationKeywords(testData))
    console.log(testData + ' added')
  }
  const setSelected = () => {
    setSelectedKeywords([locationKeywords[1]])
  }
  const setMultipleSelected = () => {
    setSelectedKeywords([locationKeywords[1], locationKeywords[2]])
  }

  const locationKeywords = useSelector((state) =>
    state.session.currentLocation.meta_data.location_additional.keywords !==
    null
      ? state.session.currentLocation.meta_data.location_additional.keywords
      : []
  )
  const contactKeywords = []

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  const setTab = (tab) => {
    setKeywordType(tab)
  }

  const onClickEditDialog = () => {
    setDialogTitle('Change keyword')
    setDialogText(
      `Changing this keyword will change it for all the locations it's associated with.`
    )
    setDialogButtonText('Change keyword')
    setShowEditDialog(!showEditDialog)
  }

  const editKeyword = () => {
    if (keywordType === 'location') {
      const updatedKeywords = locationKeywords.map((k) => {
        if (selectedKeywords.includes(k)) {
          return keywordEditInput
        }
        return k
      })
      dispatch(setCurrentLocationKeywords(updatedKeywords))
    } else {
      const updatedKeywords = contactKeywords.map((k) => {
        if (selectedKeywords.includes(k)) {
          return keywordEditInput
        }
        return k
      })
      dispatch(setCurrentLocationKeywords(updatedKeywords))
    }
  }

  const handleEdit = () => {
    if (
      ((keywordType === 'location' && locationKeywords.length !== 0) ||
        (keywordType === 'contact' && contactKeywords.length !== 0)) &&
      selectedKeywords.length > 0
    ) {
      if (keywordEditInput === '') {
        onClickEditDialog()
        onClickDeleteDialog('changeLink')
      } else {
        editKeyword()
        onClickEditDialog()
      }
    }
    setKeywordEditInput('')
  }

  const removeKeywords = () => {
    if (keywordType === 'location') {
      const updatedKeywords = locationKeywords.filter(
        (k) => !selectedKeywords.includes(k)
      )
      dispatch(setCurrentLocationKeywords(updatedKeywords))
    } else {
      const updatedKeywords = contactKeywords.filter(
        (k) => !selectedKeywords.includes(k)
      )
      dispatch(setCurrentLocationKeywords(updatedKeywords))
    }
  }

  const handleDelete = () => {
    if (
      (keywordType === 'location' && locationKeywords.length !== 0) ||
      (keywordType === 'contact' && contactKeywords.length !== 0)
    ) {
      if (selectedKeywords.length > 0) {
        removeKeywords()
        if (selectedKeywords.length === 1) {
          setNotificationText('Keyword deleted')
        } else {
          setNotificationText(`${selectedKeywords.length} keywords deleted`)
        }
        onClickDeleteDialog()
      }
    }
  }

  const onClickDeleteDialog = (from) => {
    if (from === 'deleteLink') {
      if (selectedKeywords.length === 1) {
        setDialogTitle('Delete keyword')
        setDialogText(
          <>
            If you continue this keyword will be deleted from this account and
            no longer associated with {associatedLocation} locations.
            <br />
            <br />
            Deleting this keyword does not unlink contacts and locations. If you
            no longer want contacts and locations to be linked you need to
            unlink them.
          </>
        )
        setDialogButtonText('Delete keyword')
      } else {
        setDialogTitle(`Delete ${selectedKeywords.length} keywords`)
        setDialogText(
          <>
            If you continue these keywords will be deleted from this account and
            no longer associated with {associatedLocations} locations.
            <br />
            <br />
            Deleting these keywords does not unlink contacts and locations. If
            you no longer want contacts and locations to be linked you need to
            unlink them.
          </>
        )
        setDialogButtonText('Delete keywords')
      }
    } else if (from === 'changeLink') {
      setDialogText(
        <>
          Removing the keyword will delete it from this account. It will no
          longer be in the keyword list and you will not be able to associate it
          with any other locations.
          <br />
          <br />
          Deleting this keyword does not unlink contacts and locations. If you
          no longer want contacts and locations to be linked you need to unlink
          them.
        </>
      )
    }
    setShowDeleteDialog(!showDeleteDialog)
  }

  const detailsText =
    keywordType === 'location' ? (
      <>
        <p>
          Adding keywords for each location can make it easier for you to filter
          and create lists of locations you can link to contacts to get relevant
          flood messages.
        </p>
        <p>
          For example, you may want to add 'pumping station' or 'office' or
          'Midlands' as a keyword, then show all of the locations with that
          keyword in a list.
        </p>
        <p>
          Once you use a keyword it will be saved so you can select it for any
          other locations.
        </p>
      </>
    ) : keywordType === 'contact' ? (
      <>
        <p>
          Adding keywords for each contact can make it easier for you to filter
          and create lists of people you can link to locations to get relevant
          flood messages.
        </p>
        <p>
          For example, you may want to add 'North' or 'South' as a keyword, then
          show all of the contacts with that keyword in a list.
        </p>
        <p>
          Once you use a keyword it will be saved so you can select it for any
          other contacts.
        </p>
        <p>
          You can add a maximum of 50 keywords and each keyword can be single or
          multiple words, for example 'South' or 'South West'.
        </p>
      </>
    ) : null

  console.log('Location keywords: ', locationKeywords)
  console.log('Selected: ', selectedKeywords)

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            {notificationText && (
              <NotificationBanner
                className='govuk-notification-banner govuk-notification-banner--success'
                title='Success'
                text={notificationText}
              />
            )}
            <h1 className='govuk-heading-l'>Manage keywords</h1>
            <div className='govuk-body'>
              <p>
                As an admin you can edit and delete keywords. Deleting a keyword
                will remove it from this account and you will no longer be able
                to use it to filter any locations or contacts that were
                previously associated with it.
              </p>
              <Details title='Why add keywords?' text={detailsText} />
              <nav aria-label='Sub navigation'>
                <ul className='sub-navigation__list'>
                  <li className='sub-navigation__item'>
                    <Link
                      onClick={() => setTab('location')}
                      className='sub-navigation__link'
                      aria-current={keywordType === 'location' ? 'page' : 'no'}
                    >
                      Locations keywords
                    </Link>
                  </li>
                  <li className='sub-navigation__item'>
                    <Link
                      onClick={() => setTab('contact')}
                      className='sub-navigation__link'
                      aria-current={keywordType === 'contact' ? 'page' : 'no'}
                    >
                      Contacts keywords
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className='search-container govuk-!-padding-bottom-5 govuk-!-padding-left-4 govuk-!-padding-top-7'>
                <div class='govuk-form-group govuk-!-margin-bottom-2'>
                  <label
                    class='govuk-label govuk-label--s'
                    for='keyword-search'
                  >
                    Search for a {keywordType} keyword
                  </label>
                  <div class='search-input-container' id='keyword-search'>
                    <input
                      className='govuk-input govuk-input--width-20 search-input'
                      id='location-name'
                      type='text'
                      value={null}
                    />
                    <div className='search-button-container'>
                      <button className='search-button'>
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          width='20px'
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <Link to='/' className='govuk-link'>
                  Clear Seach results
                </Link>
              </div>
              {/* TO REMOVE */}
              <Link onClick={AddTestData}>Test Data</Link>
              <br />
              <Link onClick={setSelected}>set selected</Link>
              <br />
              <Link onClick={setMultipleSelected}>set multiple selected</Link>
              <br />
              <Link onClick={onClickEditDialog}>Edit</Link>
              {showEditDialog && (
                <Popup
                  onAction={handleEdit}
                  onCancel={onClickEditDialog}
                  onClose={onClickEditDialog}
                  title={dialogTitle}
                  popupText={dialogText}
                  buttonText={dialogButtonText}
                  input='Keyword'
                  setTextInput={setKeywordEditInput}
                />
              )}
              <br />
              <Link onClick={() => onClickDeleteDialog('deleteLink')}>
                Delete
              </Link>
              {showDeleteDialog && (
                <Popup
                  onAction={handleDelete}
                  onCancel={onClickDeleteDialog}
                  onClose={onClickDeleteDialog}
                  title={dialogTitle}
                  popupText={dialogText}
                  buttonText={dialogButtonText}
                  buttonClass='govuk-button--warning'
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
