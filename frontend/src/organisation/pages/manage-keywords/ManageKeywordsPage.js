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
  const [keywordType, setKeywordType] = useState('location')
  const [selectedKeywords, setSelectedKeywords] = useState([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [keywordDeletedText, setKeywordDeletedText] = useState('')
  const dispatch = useDispatch()
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

  const removeKeywords = () => {
    switch (keywordType) {
      case 'location':
        const updatedKeywords = locationKeywords.filter(
          (k) => !selectedKeywords.includes(k)
        )
        dispatch(setCurrentLocationKeywords(updatedKeywords))
        break
      case 'contact':
        //code the contact keywords here
        break
      default:
        break
    }
  }

  const handleDelete = () => {
    console.log('In delete')
    setKeywordDeletedText('Keyword deleted')
    onClickDeleteDialog()
    // add some error control to make sure that the keywords were deleted
    /*if (
      (keywordType === 'location' && locationKeywords.length !== 0) ||
      (keywordType === 'contact' && contactKeywords.length !== 0)
    ) {
      if (selectedKeywords.length > 0) {
        setKeywordDeleted(true)
        if (selectedKeywords.length === 1) {
          setKeywordDeletedText('Keyword deleted')
        } else {
          setKeywordDeletedText(`${selectedKeywords.length} keywords deleted`)
        }
      }
    }*/
  }

  const onClickDeleteDialog = () => {
    if (!showDeleteDialog) {
      setShowDeleteDialog(true)
    } else {
      setShowDeleteDialog(false)
    }
  }

  const deleteKeywordText = (
    <>
      If you continue this keyword will be deleted from this account and no
      longer associated with 2 locations.
      <br />
      <br />
      Deleting this keyword does not unlink contacts and locations. If you no
      longer want contacts and locations to be linked you need to unlink them.
    </>
  )

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

  const setTab = (tab) => {
    setKeywordType(tab)
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            {keywordDeletedText && (
              <NotificationBanner
                className='govuk-notification-banner govuk-notification-banner--success'
                title='Success'
                text='Keyword deleted'
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
                          width={'20px'}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <Link to='/' className='govuk-link'>
                  Clear Seach results
                </Link>
              </div>
              <Link onClick={onClickDeleteDialog}>Delete</Link>
              {showDeleteDialog && (
                <Popup
                  onAction={handleDelete}
                  onCancel={onClickDeleteDialog}
                  onClose={onClickDeleteDialog}
                  title='Delete keyword'
                  popupText={deleteKeywordText}
                  buttonText='Delete keyword'
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
