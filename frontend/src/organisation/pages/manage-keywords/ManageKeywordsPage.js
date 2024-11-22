import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Popup from '../../../common/components/custom/Popup'
import Autocomplete from '../../../common/components/gov-uk/Autocomplete'
import Button from '../../../common/components/gov-uk/Button'
import Details from '../../../common/components/gov-uk/Details'
import NotificationBanner from '../../../common/components/gov-uk/NotificationBanner'
import Pagination from '../../../common/components/gov-uk/Pagination'
import {
  setContactKeywords,
  setLocationKeywords
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import KeywordsTable from '../../components/custom/KeywordsTable'

export default function ManageKeywordsPage () {
  const navigate = useNavigate()
  const [keywords, setKeywords] = useState([])
  const dispatch = useDispatch()
  const [keywordType, setKeywordType] = useState('location')
  const [notificationText, setNotificationText] = useState('')
  const [selectedKeywords, setSelectedKeywords] = useState([])
  const [filteredKeywords, setFilteredKeywords] = useState([])
  const [targetKeyword, setTargetKeyword] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [resetPaging, setResetPaging] = useState(false)
  const [displayedKeywords, setDisplayedKeywords] = useState([])
  const [dialog, setDialog] = useState({
    show: false,
    text: '',
    title: '',
    buttonText: '',
    buttonClass: '',
    input: '',
    charLimit: 0,
    error: ''
  })
  const [updatedKeyword, setUpdatedKeyword] = useState('')
  const [results, setResults] = useState(null)
  const [searchInput, setSearchInput] = useState(null)
  const keywordsPerPage = 10

  const setTab = (tab) => {
    setKeywordType(tab)
    setResetPaging(!resetPaging)
  }

  useEffect(() => {
    setCurrentPage(1)
    setSelectedKeywords([])
    setResults(null)
    setSearchInput('')
  }, [resetPaging])

  useEffect(() => {
    setDisplayedKeywords(
      filteredKeywords.slice(
        (currentPage - 1) * keywordsPerPage,
        currentPage * keywordsPerPage
      )
    )
  }, [filteredKeywords, currentPage])

  const orgId = useSelector((state) => state.session.orgId)

  useEffect(() => {
    const getKeywords = async() => {
      const key = orgId + (keywordType === 'location' ? ':t_Keywords_location' : ':t_Keywords_contact')
      const dataToSend = { key }
      const { data } = await backendCall(
        dataToSend,
        'api/elasticache/get_data',
        navigate
      )
      let orgKeywords = null
      if (data) {
        orgKeywords = data
      }
      setKeywords(orgKeywords)
      setFilteredKeywords(keywords)
    }
    getKeywords()
  }, [keywordType, keywords])

  const handleSearch = () => {
    if (searchInput) {
      const updatedFilter = keywords.filter((keyword) =>
        keyword.name.toLowerCase().includes(searchInput.toLowerCase())
      )
      setFilteredKeywords(updatedFilter)
    }
  }

  const handleOnClick = (value) => {
    setSearchInput(value.name)
  }

  const handleOnChange = (value) => {
    setSearchInput(value)
    if (value) {
      const updatedFilter = keywords.filter((keyword) =>
        keyword.name.toLowerCase().includes(value.toLowerCase())
      )
      setResults(updatedFilter)
    } else {
      setResults(null)
    }
  }

  const clearSearch = () => {
    setFilteredKeywords(keywords)
    setResetPaging(!resetPaging)
  }

  const updateToDeleteEmptyKeyworkDialog = () => {
    setDialog({
      show: true,
      text: (
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
      ),
      title: 'Change keyword',
      buttonText: 'Delete keyword',
      buttonClass: 'govuk-button--warning',
      input: '',
      textInput: '',
      setTextInput: '',
      charLimit: 0,
      error: ''
    })
  }

  const deleteDialog = (keywordToBeDeleted) => {
    setDialog({
      show: true,
      text: (
        <>
          If you continue this keyword will be deleted from this account and no
          longer associated with {keywordToBeDeleted.linked_ids.length}{' '}
          locations.
          <br />
          <br />
          Deleting this keyword does not unlink contacts and locations. If you
          no longer want contacts and locations to be linked you need to unlink
          them.
        </>
      ),
      title: 'Delete keyword',
      buttonText: 'Delete keyword',
      buttonClass: 'govuk-button--warning',
      input: '',
      textInput: '',
      setTextInput: '',
      charLimit: 0,
      error: ''
    })
  }

  const multiDeleteDialog = () => {
    const associatedLocations = selectedKeywords.reduce((total, keyword) => {
      return total + keyword.linked_ids.length
    }, 0)
    if (selectedKeywords && selectedKeywords.length > 0) {
      setDialog({
        show: true,
        text: (
          <>
            If you continue these keywords will be deleted from this account and
            no longer associated with {associatedLocations} locations.
            <br />
            <br />
            Deleting these keywords does not unlink contacts and locations. If
            you no longer want contacts and locations to be linked you need to
            unlink them.
          </>
        ),
        title: `Delete ${selectedKeywords.length} keywords`,
        buttonText: 'Delete keywords',
        buttonClass: 'govuk-button--warning',
        input: ''
      })
    }
  }

  const editDialog = () => {
    setDialog({
      show: true,
      text: `Changing this keyword will change it for all the ${
        keywordType === 'location' ? 'locations' : 'contacts'
      } it's associated with.`,
      title: 'Change keyword',
      buttonText: 'Change keyword',
      buttonClass: '',
      input: 'Keyword',
      charLimit: 20,
      error: ''
    })
  }

  const onAction = (action, keyword) => {
    setTargetKeyword(keyword)
    if (action === 'edit') {
      setUpdatedKeyword(keyword.name)
      editDialog()
    } else {
      deleteDialog(keyword)
    }
  }

  const editKeyword = () => {
    const updatedKeywords = keywords.map((keyword) => {
      if (targetKeyword === keyword) {
        return {
          ...keyword,
          name: updatedKeyword
        }
      }
      return keyword
    })

    if (keywordType === 'location') {
      dispatch(setLocationKeywords(updatedKeywords))
    } else {
      dispatch(setContactKeywords(updatedKeywords))
    }

    setKeywords([...updatedKeywords])
    setNotificationText('Keyword edited')
    setDialog({ ...dialog, show: false })
    setTargetKeyword(null)
    setUpdatedKeyword('')
  }

  const removeKeywords = (keywordsToRemove) => {
    const updatedKeywords = keywords.filter(
      (keyword) => !keywordsToRemove.includes(keyword)
    )

    if (keywordType === 'location') {
      dispatch(setLocationKeywords(updatedKeywords))
    } else {
      dispatch(setContactKeywords(updatedKeywords))
    }
    setKeywords([...updatedKeywords])

    if (targetKeyword) {
      setNotificationText('Keyword deleted')
    } else {
      setNotificationText(`${selectedKeywords.length} keywords deleted`)
    }

    setDialog({ ...dialog, show: false })
    setTargetKeyword(null)
    setSelectedKeywords([])
  }

  const validateInput = () => {
    return (updatedKeyword === targetKeyword.name)
      ? ''
      : keywords.some((keyword) => updatedKeyword === keyword.name)
        ? 'This keyword already exists'
        : ''
  }

  const handleEdit = () => {
    if (targetKeyword) {
      if (updatedKeyword === '') {
        updateToDeleteEmptyKeyworkDialog()
      } else if (updatedKeyword === targetKeyword.name) {
        setDialog({ ...dialog, show: false })
        setTargetKeyword(null)
        setUpdatedKeyword('')
      } else {
        editKeyword()
      }
    }
  }

  const handleDelete = () => {
    if (targetKeyword) {
      removeKeywords([targetKeyword])
      if (selectedKeywords.length > 0) {
        const updatedSelectedKeywords = selectedKeywords.filter(keyword => keyword !== targetKeyword)
        setSelectedKeywords(updatedSelectedKeywords)
      }
    } else if (selectedKeywords.length > 0) {
      const keywordsToRemove = [...selectedKeywords]
      removeKeywords(keywordsToRemove)
    }
  }

  const detailsText =
    keywordType === 'location'
      ? (
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
        )
      : keywordType === 'contact'
        ? (
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
          )
        : null

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

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
              <div className='keyword-search-container govuk-!-padding-bottom-5 govuk-!-margin-bottom-6 govuk-!-padding-left-4 govuk-!-padding-top-7'>
                <div className='govuk-form-group govuk-!-margin-bottom-2'>
                  <label
                    className='govuk-label govuk-label--s'
                    forHtml='keyword-search'
                  >
                    Search for a {keywordType} keyword
                  </label>
                  <div
                    className='keyword-search-input-container'
                    id='keyword-search'
                  >
                    <Autocomplete
                      className='govuk-input govuk-input--width-20 keyword-search-input'
                      inputType='text'
                      error=''
                      onChange={(val) => handleOnChange(val)}
                      results={results}
                      value={searchInput}
                      onClick={(val) => handleOnClick(val)}
                      position='absolute'
                      showNotFound={false}
                      nameField='name'
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
                <Link onClick={() => clearSearch()} className='govuk-link'>
                  Clear search results
                </Link>
              </div>
              <div className='govuk-grid-column-two-thirds'>
                {filteredKeywords.length !== 0
                  ? (
                    <>
                      <Button
                        className='govuk-button govuk-button--secondary'
                        onClick={() => multiDeleteDialog()}
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
                        onAction={onAction}
                      />
                      <Pagination
                        totalPages={Math.ceil(
                          filteredKeywords.length / keywordsPerPage
                        )}
                        onPageChange={(val) => setCurrentPage(val)}
                        reset={resetPaging}
                      />
                    </>
                    )
                  : (
                    <p>No results. Try searching with a different keyword.</p>
                    )}
                {dialog.show && (
                  <>
                    <Popup
                      onEdit={() => handleEdit()}
                      onDelete={() => handleDelete()}
                      onClose={() => setDialog({ ...dialog, show: false })}
                      title={dialog.title}
                      popupText={dialog.text}
                      buttonText={dialog.buttonText}
                      buttonClass={dialog.buttonClass}
                      input={dialog.input}
                      textInput={updatedKeyword}
                      setTextInput={setUpdatedKeyword}
                      charLimit={dialog.charLimit}
                      error={dialog.error}
                      setError={(val) =>
                        setDialog((dial) => ({ ...dial, error: val }))}
                      validateInput={() => validateInput()}
                      defaultValue={dialog.input ? targetKeyword.name : ''}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
