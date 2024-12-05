import {
  createElementObject,
  createTileLayerComponent,
  updateGridLayer,
  withPane
} from '@react-leaflet/core'
import L from 'leaflet'

export default function TileLayerWithHeader ({ url, token, bounds }) {
  function calculateWithin (coords) {
    const tileMatrixSetLimits = {
      7: { x: [60, 64], y: [36, 43] },
      8: { x: [120, 129], y: [71, 87] },
      9: { x: [240, 259], y: [143, 174] },
      10: { x: [481, 518], y: [286, 349] },
      11: { x: [962, 1036], y: [573, 698] },
      12: { x: [1925, 2072], y: [1146, 1397] },
      13: { x: [3851, 4144], y: [2292, 2794] },
      14: { x: [7702, 8289], y: [4584, 5589] },
      15: { x: [15404, 16579], y: [9169, 11179] },
      16: { x: [30808, 33158], y: [18338, 22359] },
      17: { x: [61616, 66316], y: [36676, 44718] },
      18: { x: [123233, 132633], y: [73353, 89436] },
      19: { x: [246467, 265266], y: [146706, 178872] },
      20: { x: [492935, 530532], y: [293412, 357745] }
    }
    const tileMatrixLimits = tileMatrixSetLimits[coords.z]
    const withinLimits = () => {
      return (
        coords.x >= tileMatrixLimits.x[0] &&
        coords.x <= tileMatrixLimits.x[1] &&
        coords.y >= tileMatrixLimits.y[0] &&
        coords.y <= tileMatrixLimits.y[1]
      )
    }

    return withinLimits()
  }

  function CreateTileLayerWithHeader ({ url, ...options }, context) {
    L.TileLayer.WithHeader = L.TileLayer.extend({
      createTile (coords, done) {
        const img = document.createElement('img')
        const withinLimits = calculateWithin(coords)
        if (withinLimits) {
          const url = this.getTileUrl(coords)
          const token = this.options.token
          fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
            mode: 'cors'
          })
            .then((val) => val.blob())
            .then((blob) => {
              img.src = URL.createObjectURL(blob)
              done(null, img)
            })
            .catch(() => {
              // if there are errors just display an empty tile
              done(null, img)
            })
        }
        return img
      }
    })
    const layer = new L.TileLayer.WithHeader(url, withPane(options, context))
    return createElementObject(layer, context)
  }

  function updateTileLayerWithHeader (layer, props, prevProps) {
    updateGridLayer(layer, props, prevProps)
    const { url } = props
    if (url != null && url !== prevProps.url) {
      layer.setUrl(url)
    }
  }

  const TileLayerWithHeader = createTileLayerComponent(
    CreateTileLayerWithHeader,
    updateTileLayerWithHeader
  )

  return <TileLayerWithHeader url={url} token={token} />
}
