import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Popup from '../../../common/components/custom/Popup'
import Details from '../../../common/components/gov-uk/Details'
import {
  setContactKeywords,
  setLocationKeywords
} from '../../../common/redux/userSlice'

import Button from '../../../common/components/gov-uk/Button'
import Pagination from '../../../common/components/gov-uk/Pagination'
import KeywordsTable from '../../components/custom/KeywordsTable'

export default function ManageKeywordsPage() {
  const navigate = useNavigate()
  const [keywords, setKeywords] = useState([])
  const dispatch = useDispatch()
  const [keywordType, setKeywordType] = useState('location')
  const [selectedKeywords, setSelectedKeywords] = useState([])
  const [filteredKeywords, setFilteredKeywords] = useState([])
  const [targetKeyword, setTargetKeyword] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [resetPaging, setResetPaging] = useState(false)
  const [displayedKeywords, setDisplayedKeywords] = useState([])
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [dialogText, setDialogText] = useState('')
  const [dialogTitle, setDialogTitle] = useState('')
  const [dialogButtonText, setDialogButtonText] = useState('')
  const [updatedKeyword, setUpdatedKeyword] = useState('')
  const keywordsPerPage = 10

  const setTab = (tab) => {
    setKeywordType(tab)
    setResetPaging(!resetPaging)
  }

  useEffect(() => {
    setCurrentPage(1)
    setSelectedKeywords([])
  }, [resetPaging])

  useEffect(() => {
    setDisplayedKeywords(
      filteredKeywords.slice(
        (currentPage - 1) * keywordsPerPage,
        currentPage * keywordsPerPage
      )
    )
  }, [filteredKeywords, currentPage])

  const locationKeywords = useSelector((state) =>
    state.session.locationKeywords !== null
      ? state.session.locationKeywords
      : []
  )
  const contactKeywords = useSelector((state) =>
    state.session.contactKeywords !== null ? state.session.contactKeywords : []
  )

  useEffect(() => {
    setKeywords(keywordType === 'location' ? locationKeywords : contactKeywords)
    setFilteredKeywords(keywords)
  }, [contactKeywords, keywordType, keywords, locationKeywords])

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  const onClickEditDialog = (keyword) => {
    setTargetKeyword(keyword)
    setDialogTitle('Change keyword')
    setDialogText(
      `Changing this keyword will change it for all the ${
        keywordType === 'location' ? 'locations' : 'contacts'
      } it's associated with.`
    )
    setDialogButtonText('Change keyword')
    setShowEditDialog(!showEditDialog)
  }

  const editKeyword = () => {
    const updatedKeywords = keywords.map((k) => {
      if (targetKeyword === k) {
        return {
          ...k,
          name: updatedKeyword
        }
      }
      return k
    })
    if (keywordType === 'location') {
      dispatch(setLocationKeywords(updatedKeywords))
    } else {
      dispatch(setContactKeywords(updatedKeywords))
    }
    setKeywords([...updatedKeywords])
  }

  const handleEdit = () => {
    if (targetKeyword) {
      if (updatedKeyword === '') {
        console.log('input is empty')
        onClickEditDialog()
        // onClickRemove
      } else {
        editKeyword()
        onClickEditDialog()
      }
    }
  }

  const handleSearch = () => {
    // TODO: use keywordType to search the correct array and set the results array
  }

  const handleButton = () => {
    if (selectedKeywords) {
      // TODO: delete keywords
    }
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

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
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
              <div className='keyword-search-container govuk-!-padding-bottom-5 govuk-!-margin-bottom-6 govuk-!-padding-left-4 govuk-!-padding-top-7'>
                <div class='govuk-form-group govuk-!-margin-bottom-2'>
                  <label
                    class='govuk-label govuk-label--s'
                    for='keyword-search'
                  >
                    Search for a {keywordType} keyword
                  </label>
                  <div
                    class='keyword-search-input-container'
                    id='keyword-search'
                  >
                    <input
                      className='govuk-input govuk-input--width-20 keyword-search-input'
                      id='location-name'
                      type='text'
                      value={null}
                    />
                    <div className='keyword-search-button-container'>
                      <button
                        className='keyword-search-button'
                        onClick={() => handleSearch()}
                      >
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          width='20px'
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <Link
                  onClick={() => setResetPaging(!resetPaging)}
                  className='govuk-link'
                >
                  Clear Seach results
                </Link>
              </div>
              <div className='govuk-grid-column-two-thirds'>
                <Button
                  className='govuk-button govuk-button--secondary'
                  onClick={handleButton}
                  text='Delete selected keywords'
                />

                <KeywordsTable
                  keywords={keywords}
                  displayedKeywords={displayedKeywords}
                  filteredKeywords={filteredKeywords}
                  setFilteredKeywords={setFilteredKeywords}
                  selectedKeywords={selectedKeywords}
                  setSelectedKeywords={setSelectedKeywords}
                  type={keywordType}
                  onEdit={onClickEditDialog}
                />
                <Pagination
                  totalPages={Math.ceil(
                    filteredKeywords.length / keywordsPerPage
                  )}
                  onPageChange={(val) => setCurrentPage(val)}
                  reset={resetPaging}
                />
                <Link to='/' className='govuk-link'>
                  Clear Seach results
                </Link>
              </div>

              {showEditDialog && (
                <Popup
                  onAction={handleEdit}
                  onCancel={onClickEditDialog}
                  onClose={onClickEditDialog}
                  title={dialogTitle}
                  popupText={dialogText}
                  buttonText={dialogButtonText}
                  input='Keyword'
                  setTextInput={setUpdatedKeyword}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
