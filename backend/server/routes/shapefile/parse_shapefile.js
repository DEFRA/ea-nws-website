const fs = require('fs')
const unzipper = require('unzipper')
const shapefile = require('shapefile')
const { error } = require('console')
const { ok } = require('assert')

module.exports = [
  {
    method: ['POST'],
    path: '/api/shapefile/parse',
    handler: async (request, h) => {
      try {
        if (!request.payload || !request.payload.file) {
          createGenericErrorResponse(h)
        }

        // Unzip shapefile archive in memory
        const zipStream = request.payload.file._data
        const files = {}
        await zipStream
          .pipe(unzipper.Parse())
          .on('entry', async (entry) => {
            const fileName = entry.path.toLowerCase()
            const fileExt = fileName.split('.').pop()

            if (fileExt === 'shp' || fileExt === 'spx' || fileExt === 'dbf') {
              files[fileExt] = await entry.buffer()
            } else {
              entry.autodrain()
            }
          })
          .promise()

        if (!files.shp || !files.dbf) {
          return h.response({
            status: 400,
            errorMessage: 'Invalid shapefile structure'
          })
        }

        const geojson = await shapefile.read(files.shp, files.dbf, files.shx)

        return h.response({ status: 200, data: { geojson } })
      } catch (error) {
        createGenericErrorResponse(h)
      }
    }
  }
]
