import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function KeywordsTable({
  keywords,
  displayedKeywords,
  filteredKeywords,
  setFilteredKeywords,
  selectedKeywords,
  setSelectedKeywords,
  type,
  onAction
}) {
  const [isTopCheckboxChecked, setIsTopCheckboxChecked] = useState(false)
  const [keywordSort, setKeywordSort] = useState('none')
  const [associatedSort, setAssociatedSort] = useState('none')

  useEffect(() => {
    setKeywordSort('none')
    setAssociatedSort('none')
  }, [type])

  const sortKeywords = () => {
    if (keywordSort === 'none' || keywordSort === 'descending') {
      setKeywordSort('ascending')
      setFilteredKeywords(
        [...filteredKeywords].sort((a, b) => (a.name > b.name ? 1 : -1))
      )
    }
    if (keywordSort === 'ascending') {
      setKeywordSort('descending')
      setFilteredKeywords(
        [...filteredKeywords].sort((a, b) => (a.name < b.name ? 1 : -1))
      )
    }
  }

  const sortAssociated = () => {
    if (associatedSort === 'none' || associatedSort === 'descending') {
      setAssociatedSort('ascending')
      setFilteredKeywords(
        [...filteredKeywords].sort((a, b) =>
          a.linked_ids.length > b.linked_ids.length ? 1 : -1
        )
      )
    }
    if (associatedSort === 'ascending') {
      setAssociatedSort('descending')
      setFilteredKeywords(
        [...filteredKeywords].sort((a, b) =>
          a.linked_ids.length < b.linked_ids.length ? 1 : -1
        )
      )
    }
  }

  const handleHeaderCheckboxChange = (event) => {
    const isChecked = event.target.checked
    setIsTopCheckboxChecked(isChecked)
    if (isChecked) {
      setSelectedKeywords(displayedKeywords)
    } else {
      setSelectedKeywords([])
    }
  }

  const handleKeywordSelected = (keyword) => {
    let updatedSelectedKeywords = []

    if (selectedKeywords.includes(keyword)) {
      updatedSelectedKeywords = selectedKeywords.filter(
        (selectedKeyword) => selectedKeyword !== keyword
      )
    } else {
      updatedSelectedKeywords = [...selectedKeywords, keyword]
    }
    setSelectedKeywords(updatedSelectedKeywords)
  }

  return (
    <>
      <p className='govuk-!-margin-bottom-6' style={{ color: '#505a5f' }}>
        {filteredKeywords.length !== keywords.length
          ? 'Showing ' +
            filteredKeywords.length +
            ' of ' +
            keywords.length +
            ' keywords'
          : keywords.length + ' keywords'}{' '}
        |{' '}
        <Link className='govuk-link'>
          {selectedKeywords.length + ' keywords selected'}
        </Link>
      </p>
      <table className='govuk-table govuk-table--small-text-until-tablet'>
        <thead className='govuk-table__head'>
          <tr className='govuk-table__row'>
            <th scope='col' className='govuk-table__header govuk-!-padding-0'>
              <div
                style={{ marginTop: '-10px' }}
                className='govuk-checkboxes govuk-checkboxes--small'
                data-module='govuk-checkboxes'
              >
                <div className='govuk-checkboxes__item'>
                  <input
                    className='govuk-checkboxes__input'
                    type='checkbox'
                    checked={isTopCheckboxChecked}
                    onChange={handleHeaderCheckboxChange}
                  />
                  <label className='govuk-label govuk-checkboxes__label' />
                </div>
              </div>
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              aria-sort={keywordSort}
            >
              <button type='button' onClick={() => sortKeywords()}>
                Keyword
              </button>
            </th>
            <th
              scope='col'
              className='govuk-table__header'
              aria-sort={associatedSort}
            >
              <button type='button' onClick={() => sortAssociated()}>
                {'Associated ' + type + 's'}
              </button>
            </th>
            <th scope='col' className='govuk-table__header' />
          </tr>
        </thead>
        <tbody className='govuk-table__body'>
          {displayedKeywords.map((keyword, index) => (
            <tr className='govuk-table__row' key={index}>
              <th scope='row' className='govuk-table__header govuk-!-padding-0'>
                <div
                  style={{ marginTop: '-10px' }}
                  className='govuk-checkboxes govuk-checkboxes--small'
                  data-module='govuk-checkboxes'
                >
                  <div className='govuk-checkboxes__item'>
                    <input
                      className='govuk-checkboxes__input'
                      type='checkbox'
                      checked={selectedKeywords.includes(keyword)}
                      onChange={() => handleKeywordSelected(keyword)}
                    />
                    <label className='govuk-label govuk-checkboxes__label' />
                  </div>
                </div>
              </th>
              <td className='govuk-table__cell'>{keyword.name}</td>
              <td className='govuk-table__cell'>{keyword.linked_ids.length}</td>
              <td className='govuk-table__cell'>
                <Link
                  className='govuk-link'
                  onClick={() => onAction('edit', keyword)}
                >
                  Change
                </Link>{' '}
                <span style={{ color: '#b1b4b6' }}>|</span>{' '}
                <Link
                  className='govuk-link'
                  onClick={() => onAction('delete', keyword)}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
