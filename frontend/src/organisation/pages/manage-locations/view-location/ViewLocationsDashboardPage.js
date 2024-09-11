import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../common/components/gov-uk/NotificationBanner'
import Pagination from '../../../../common/components/gov-uk/Pagination'

export default function ViewLocationsDashboardPage () {
  const navigate = useNavigate()

  // TODO - grab the real data once ticket is done
  const locations = [
    {
      id: 1,
      name: 'Location_ID1',
      type: 'Office',
      available: 'Yes',
      critical: 'High'
    },
    {
      id: 2,
      name: 'Location_ID2',
      type: 'Retail space',
      available: 'Yes',
      critical: '-'
    },
    {
      id: 3,
      name: 'Location_ID3',
      type: 'Office',
      available: 'No',
      critical: 'Medium'
    },
    {
      id: 4,
      name: 'Location_ID4',
      type: 'Warehouse',
      available: 'Yes',
      critical: 'Low'
    },
    {
      id: 5,
      name: 'Location_ID5',
      type: 'Office',
      available: 'No',
      critical: 'High'
    },
    {
      id: 6,
      name: 'Location_ID6',
      type: 'Retail space',
      available: 'Yes',
      critical: 'Medium'
    },
    {
      id: 7,
      name: 'Location_ID7',
      type: 'Office',
      available: 'Yes',
      critical: 'Low'
    },
    {
      id: 8,
      name: 'Location_ID8',
      type: 'Data Center',
      available: 'No',
      critical: 'High'
    },
    {
      id: 9,
      name: 'Location_ID9',
      type: 'Retail space',
      available: 'Yes',
      critical: 'Medium'
    },
    {
      id: 10,
      name: 'Location_ID10',
      type: 'Warehouse',
      available: 'No',
      critical: 'Low'
    },
    {
      id: 11,
      name: 'Location_ID11',
      type: 'Office',
      available: 'Yes',
      critical: 'Medium'
    },
    {
      id: 12,
      name: 'Location_ID12',
      type: 'Data Center',
      available: 'Yes',
      critical: 'High'
    },
    {
      id: 13,
      name: 'Location_ID13',
      type: 'Retail space',
      available: 'No',
      critical: 'Low'
    },
    {
      id: 14,
      name: 'Location_ID14',
      type: 'Warehouse',
      available: 'Yes',
      critical: 'Medium'
    },
    {
      id: 15,
      name: 'Location_ID15',
      type: 'Office',
      available: 'No',
      critical: 'Low'
    },
    {
      id: 16,
      name: 'Location_ID16',
      type: 'Data Center',
      available: 'Yes',
      critical: 'High'
    },
    {
      id: 17,
      name: 'Location_ID17',
      type: 'Warehouse',
      available: 'No',
      critical: 'Medium'
    },
    {
      id: 18,
      name: 'Location_ID18',
      type: 'Retail space',
      available: 'Yes',
      critical: 'Low'
    },
    // Additional 10 locations
    {
      id: 19,
      name: 'Location_ID19',
      type: 'Office',
      available: 'Yes',
      critical: 'Medium'
    },
    {
      id: 20,
      name: 'Location_ID20',
      type: 'Warehouse',
      available: 'Yes',
      critical: 'High'
    },
    {
      id: 21,
      name: 'Location_ID21',
      type: 'Retail space',
      available: 'No',
      critical: 'Low'
    },
    {
      id: 22,
      name: 'Location_ID22',
      type: 'Data Center',
      available: 'Yes',
      critical: 'High'
    },
    {
      id: 23,
      name: 'Location_ID23',
      type: 'Warehouse',
      available: 'No',
      critical: 'Medium'
    },
    {
      id: 24,
      name: 'Location_ID24',
      type: 'Office',
      available: 'Yes',
      critical: 'Low'
    },
    {
      id: 25,
      name: 'Location_ID25',
      type: 'Retail space',
      available: 'Yes',
      critical: 'Medium'
    },
    {
      id: 26,
      name: 'Location_ID26',
      type: 'Data Center',
      available: 'No',
      critical: 'High'
    },
    {
      id: 27,
      name: 'Location_ID27',
      type: 'Warehouse',
      available: 'Yes',
      critical: 'Low'
    },
    {
      id: 28,
      name: 'Location_ID28',
      type: 'Office',
      available: 'No',
      critical: 'Medium'
    }
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const locationsPerPage = 10
  const displayedLocations = locations.slice(
    (currentPage - 1) * locationsPerPage,
    currentPage * locationsPerPage
  )

  const [selectedCheckboxes, setSelectedCheckboxes] = useState(
    locations.map(() => false)
  )
  const [isTopCheckboxChecked, setIsTopCheckboxChecked] = useState(false)

  const handleHeaderCheckboxChange = (event) => {
    const isChecked = event.target.checked
    setIsTopCheckboxChecked(isChecked)
    setSelectedCheckboxes(locations.map(() => isChecked))
  }

  const handleRowCheckboxChange = (index) => {
    const updatedCheckboxes = [...selectedCheckboxes]
    updatedCheckboxes[index] = !updatedCheckboxes[index]
    setSelectedCheckboxes(updatedCheckboxes)

    if (!updatedCheckboxes[index]) {
      setIsTopCheckboxChecked(false)
    } else if (updatedCheckboxes.every((checked) => checked)) {
      setIsTopCheckboxChecked(true)
    }
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full govuk-body'>
            <NotificationBanner
              className='govuk-notification-banner govuk-notification-banner--success'
              title='Success'
              text='100 new locations added'
            />
            <h1 className='govuk-heading-l'>Your organisation's locations</h1>
            <Button
              text='Add locations'
              className='govuk-button govuk-button--secondary'
            />
            <Link className='govuk-link inline-link'>Back to settings</Link>
            <p className='govuk-caption-m govuk-!-margin-bottom-9'>
              Last updated: by you at 11:15am, 10 May 2024,{' '}
              <Link>View all updates</Link>
            </p>
            <Button
              text='Filter locations'
              className='govuk-button govuk-button--secondary'
            />
            <p className=' govuk-!-margin-bottom-6'>700 locations</p>
            <table className='govuk-table govuk-table--small-text-until-tablet'>
              <thead className='govuk-table__head'>
                <tr className='govuk-table__row'>
                  <th scope='col' className='govuk-table__header'>
                    <div
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
                  <th scope='col' className='govuk-table__header'>
                    Location name
                  </th>
                  <th scope='col' className='govuk-table__header'>
                    Location type
                  </th>
                  <th scope='col' className='govuk-table__header'>
                    Flood messages
                    <br /> available
                  </th>
                  <th scope='col' className='govuk-table__header'>
                    Business criticality
                  </th>
                  <th scope='col' className='govuk-table__header' />
                </tr>
              </thead>
              <tbody className='govuk-table__body'>
                {displayedLocations.map((location, index) => {
                  return (
                    <tr className='govuk-table__row' key={index}>
                      <th scope='row' className='govuk-table__header'>
                        <div
                          className='govuk-checkboxes govuk-checkboxes--small'
                          data-module='govuk-checkboxes'
                        >
                          <div className='govuk-checkboxes__item'>
                            <input
                              className='govuk-checkboxes__input'
                              type='checkbox'
                              checked={selectedCheckboxes[index]}
                              onChange={() => handleRowCheckboxChange(index)}
                            />
                            <label className='govuk-label govuk-checkboxes__label' />
                          </div>
                        </div>
                      </th>
                      <td className='govuk-table__cell'>{location.name}</td>
                      <td className='govuk-table__cell'>{location.type}</td>
                      <td className='govuk-table__cell'>{location.available}</td>
                      <td className='govuk-table__cell'>{location.critical}</td>
                      <td className='govuk-table__cell'>
                        <Link>View or edit</Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <Pagination
              totalPages={Math.ceil(locations.length / locationsPerPage)}
              onPageChange={(val) => setCurrentPage(val)}
            />
          </div>
        </div>
      </main>
    </>
  )
}
