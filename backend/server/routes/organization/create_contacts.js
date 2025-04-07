const { logger } = require('../../plugins/logging')
const { apiCall } = require('../../services/ApiService')
const {
  createGenericErrorResponse
} = require('../../services/GenericErrorResponse')
const { addContact } = require('../../services/elasticache')
const { normalisePhoneNumber } = require('../../services/formatters/NormalisePhoneNumber')

module.exports = [
  {
    method: ['POST'],
    path: '/api/organization/create_contacts',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }

        const { authToken, orgId, contacts } = request.payload
        const { redis } = request.server.app

        if (authToken && orgId && contacts) {
          // remove any null fields from each contact
          contacts.forEach(contact => {
            if (Array.isArray(contact.mobilePhones)) {
              if (contact.mobilePhones.length > 0) {
                contact.mobilePhones = contact.mobilePhones.map(mobilePhone =>
                  normalisePhoneNumber(mobilePhone)
                )
              }
            }
            if (Array.isArray(contact.homePhones)) {
              if (contact.homePhones.length > 0) {
                contact.homePhones = contact.homePhones.map(homePhone =>
                  normalisePhoneNumber(homePhone)
                )
              }
            }
            Object.keys(contact).forEach((key) => {
              if (contact[key] === null && key !== 'id') {
                delete contact[key]
              }
            })
          })
          const response = await apiCall(
            { authToken: authToken, contacts: contacts },
            'organization/createContacts'
          )

          if (response.status === 200) {
            const contactRes = await apiCall(
              { authToken: authToken },
              'organization/listContacts'
            )

            if (contactRes.data.contacts) {
              await Promise.all(contactRes.data.contacts.map(async (contact) => {
                await addContact(redis, orgId, contact)
              }))
            } else {
              return createGenericErrorResponse(h)
            }

            return h.response({ status: 200 })
          } else {
            return createGenericErrorResponse(h)
          }
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
