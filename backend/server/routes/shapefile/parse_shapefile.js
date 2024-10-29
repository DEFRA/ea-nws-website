const fs = require('fs')
const unzipper = require('unzipper')
const shapefile = require('shapefile')

module.exports = [
  {
    method: ['POST'],
    path: '/api/shapefile/parse',
    handler: async (request, h) => {
      try {
        if (!request.payload) {
          return createGenericErrorResponse(h)
        }
      } catch (error) {
        createGenericErrorResponse(h)
      }
    }
  }
]
