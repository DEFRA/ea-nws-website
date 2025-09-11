const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const {
  orgSignIn,
  setJsonData,
  getJsonData,
  setLinkLocations
} = require('../../services/elasticache')
const { logger } = require('../../plugins/logging')
const { migrateLocation, getAdditional, getLocationOtherAdditional, setLocationOtherAdditionals } = require('../../services/migrated_data/migrateLocations')
const getSecretKeyValue = require('../../services/SecretsManager')

// geosafe api restricted to 1024 locations per response
// recall to api required to collect all locations
const getAdditionalLocations = async (
  firstLocationApiCall,
  authToken,
  contactId = null
) => {
  let additionalLocations = []

  if (firstLocationApiCall.data.total > 1000) {
    const fetchLocationsPromises = []
    const totalRecalls = Math.floor(firstLocationApiCall.data.total / 1000)
    let i = 1
    while (i <= totalRecalls) {
      let options = {
        offset: 1000 * i,
        limit: 1000,
        sort: [{
          fieldName: 'id',
          order: 'ASCENDING'
        }]
      }
      if (contactId) options.contactId = contactId
      fetchLocationsPromises.push(
        apiCall(
          {
            authToken: authToken,
            options: options
          },
          'location/list'
        )
      )
      i++
    }

    const results = await Promise.all(fetchLocationsPromises)
    results.forEach((response) => {
      additionalLocations.push(...response.data.locations)
    })
  }

  return additionalLocations
}

module.exports = [
  {
    method: ['POST'],
    path: '/api/org_signin_migrated',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { orgData } = request.payload
        const { redis } = request.server.app
        const sessionData = await getJsonData(redis, orgData?.authToken)
        const elasticacheKey = 'migrated_signin_status:' + sessionData.orgId
        // check if an org is already being migrated
        const result = await getJsonData(redis, elasticacheKey)
        if (result) {
          // return success without triggering migration code
          return h.response({ status: 200 })
        }
        const partnerID = await getSecretKeyValue(
          'nws/website',
          'partnerId'
        )

        if (orgData && sessionData && !result) {
          await setJsonData(redis, elasticacheKey, {
            stage: 'Retrieving locations',
            status: 'working'
          })

          let migratedlocations = []
          let options = {
            limit: 1000,
            sort: [{
              fieldName: 'id',
              order: 'ASCENDING'
            }]
          }
          const locationRes = await apiCall(
            { authToken: orgData.authToken, options: options },
            'location/list'
          )
          migratedlocations.push(...locationRes.data.locations)

          const additionalLocations = await getAdditionalLocations(
            locationRes,
            orgData.authToken
          )
          migratedlocations.push(...additionalLocations)

          const locations = []

          await setJsonData(redis, elasticacheKey, {
            stage: 'Migrating locations',
            status: 'working'
          })

          const numLocations = migratedlocations.length
          let locationIndex = 1
          let locationPercent = 0

          for (const migratedLocation of migratedlocations) {
            let newPercent = Math.round((locationIndex/numLocations)*100)
            if (locationPercent !== newPercent) {
              locationPercent = newPercent
              await setJsonData(redis, elasticacheKey, {
                stage: 'Migrating locations',
                status: 'working',
                percent: locationPercent
              })
            }
            const location = await migrateLocation(redis, migratedLocation)
            if (location) {
              locations.push(location)
              // update location in geosafe
              const response = await apiCall(
                { authToken: orgData.authToken, location: JSON.parse(JSON.stringify(location)) },
                'location/update'
              )
              if (response.errorMessage) {
                await setJsonData(redis, elasticacheKey, {
                  stage: 'Migrating locations',
                  status: 'error',
                  percent: locationPercent
                })
                throw new Error(response.errorMessage)
              }
            } else {
              // remove location because it can't be migrated, should never happen though
              await apiCall(
                { authToken: orgData.authToken, locationIds: [migratedLocation.id] },
                'location/remove'
              )
            }
            locationIndex++
          }

          // locations are in the correct formatt, now we need to complete setting up linked locations
          await setJsonData(redis, elasticacheKey, {
            stage: 'Migrating nearby areas',
            status: 'working'
          })
          const linkedLocations = {}
          for (const location of locations) {
              let parentID = getAdditional(location.additionals, 'parentID')
              if (parentID) {
                  const linkedIDs = linkedLocations[parentID]?.linkedIDs || []
                  const AlertTypes = linkedLocations[parentID]?.AlertTypes || []
                  linkedLocations[parentID] = {
                    linkedIDs: [...new Set(linkedIDs.concat([location.id]))],
                    AlertTypes: [...new Set(AlertTypes.concat(getLocationOtherAdditional(location.additionals, 'alertTypes')))]
                  }
              }
          }
          let nearbyIndex = 1
          let nearbyPercent = 0
          for (const location of locations) {
            let newPercent = Math.round((nearbyIndex/numLocations)*100)
            if (nearbyPercent !== newPercent) {
              nearbyPercent = newPercent
              await setJsonData(redis, elasticacheKey, {
                stage: 'Migrating locations',
                status: 'working',
                percent: nearbyPercent
              })
            }
              await setJsonData(redis, elasticacheKey, {
                stage: 'Migrating nearby areas',
                status: 'working',
                percent: nearbyPercent
              })
              if (linkedLocations[location.id]) {
                  const alertTypes = [...new Set(linkedLocations[location.id].AlertTypes.concat(getLocationOtherAdditional(location.additionals, 'alertTypes')))]
                  setLocationOtherAdditionals(location.additionals, 'childrenIDs', linkedLocations[location.id].linkedIDs)
                  setLocationOtherAdditionals(location.additionals, 'alertTypes', alertTypes)

                  // update the location and set registrations
                  const updateResponse = await apiCall(
                    { authToken: orgData.authToken, location: JSON.parse(JSON.stringify(location)) },
                    'location/update'
                  )
                  if (updateResponse.errorMessage) {
                    await setJsonData(redis, elasticacheKey, {
                      stage: 'Migrating nearby areas',
                      status: 'error',
                      percent: locationPercent
                    })
                    throw new Error(response.errorMessage)
                  }


                  const registerData = {
                    authToken: orgData.authToken,
                    locationId: location.id,
                    partnerId: partnerID,
                    params: {
                      channelVoiceEnabled: true,
                      channelSmsEnabled: true,
                      channelEmailEnabled: true,
                      channelMobileAppEnabled: true,
                      partnerCanView: true,
                      partnerCanEdit: true,
                      alertTypes: alertTypes
                    }
                  }
                  const response = await apiCall(
                    registerData,
                    'location/updateRegistration'
                  )
                  if (response.errorMessage) {
                    await setJsonData(redis, elasticacheKey, {
                      stage: 'Migrating nearby areas',
                      status: 'error',
                      percent: locationPercent
                    })
                    throw new Error(response.errorMessage)
                  }
              }

              nearbyIndex++
          }

          // locations have been migrated now update the organisation with a description to show it's been migrated
          const newOrgData = {
            id: orgData.organization.id || null,
            name:  orgData.organization.name || null,
            description:
               orgData.organization.description ||
              JSON.stringify({
                name:  orgData.organization.name || null,
                address: null,
                compHouseNum: null,
                emergencySector: null,
                isAdminRegistering: null,
                alternativeContact: {
                  firstName: null,
                  lastName: null,
                  email: null,
                  telephone: null,
                  jobTitle: null
                }
              }),
            postalCode:  orgData.organization.postalCode || null,
            longName:  orgData.organization.longName || null,
            logoUrl:  orgData.organization.logoUrl || null,
            backgroundUrl:  orgData.organization.backgroundUrl || null,
            alertDiffusionZone:
               orgData.organization.alertDiffusionZone || null,
            alertDiffusionZoneBoundingBox:
               orgData.organization.alertDiffusionZoneBoundingBox || null,
            urlSlug:  orgData.organization.urlSlug || null
          }

          const response = await apiCall(
            { authToken: orgData.authToken, organization: newOrgData },
            'organization/update'
          )

          if (response.errorMessage) {
            await setJsonData(redis, elasticacheKey, {
              stage: 'Migrating nearby areas',
              status: 'error',
              percent: locationPercent
            })
            throw new Error(response.errorMessage)
          }

          await setJsonData(redis, elasticacheKey, {
            stage: 'Retrieving contacts',
            status: 'working'
          })
          const contactRes = await apiCall(
            { authToken: orgData.authToken },
            'organization/listContacts'
          )

          await setJsonData(redis, elasticacheKey, {
            stage: 'Populating account',
            status: 'working'
          })
          // Send the profile to elasticache
          await orgSignIn(
            redis,
            orgData.profile,
            newOrgData,
            locations,
            contactRes.data.contacts,
            sessionData.orgId,
            orgData.authToken
          )

          const numContacts = contactRes.data.contacts.length
          let contactIndex = 1
          let percent = 0
          const linkedContactsArr = []

          for (const contact of contactRes.data.contacts) {
            let newPercent = Math.round((contactIndex/numContacts)*100)
            if (percent !== newPercent) {
              percent = newPercent
              await setJsonData(redis, elasticacheKey, {
                stage: 'Processing Contacts',
                status: 'working',
                percent: percent
              })
            }
            let contactsLocations = []
            const options = {
              contactId: contact.id,
              limit: 1000,
              sort: [{
                fieldName: 'id',
                order: 'ASCENDING'
              }]
            }
            const linkLocationsRes = await apiCall(
              {
                authToken: orgData.authToken,
                options: options
              },
              'location/list'
            )
            contactsLocations.push(...linkLocationsRes.data.locations)

            const additionalLocations = await getAdditionalLocations(
              locationRes,
              orgData.authToken,
              contact.id
            )
            contactsLocations.push(...additionalLocations)

            const locationIDs = []
            contactsLocations.forEach(function (location) {
              locationIDs.push(location.id)
            })

            linkedContactsArr.push({id: contact.id, linkIDs: locationIDs})
            contactIndex++
          }
          
          const linkedLocationsMap = linkedContactsArr.reduce((acc, {id, linkIDs}) => {
            linkIDs.forEach((locationID) => {
              if (!acc[locationID]) acc[locationID] = []
              acc[locationID].push(id)
            })
            return acc
          }, {})

          const linkedLocationsArr = Object.entries(linkedLocationsMap).map(([linkIDs, id]) => ({
            id: linkIDs,
            linkIDs: id
          }))

          await setLinkLocations(redis, orgData.organization.id, linkedLocationsArr, linkedContactsArr)

          await setJsonData(redis, elasticacheKey, {
            stage: 'Populating account',
            status: 'complete'
          })

          return h.response({ status: 200 })
        } else {
          return createGenericErrorResponse(h)
        }
      } catch (error) {
        logger.error(error)
        return createGenericErrorResponse(h)
      }
    }
  }
]
