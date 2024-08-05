import { createElementObject, createTileLayerComponent, updateGridLayer, withPane } from '@react-leaflet/core'
import L from 'leaflet'

export default function TileLayerWithHeader ({ url, token }) {
  function CreateTileLayerWithHeader ({ url, ...options }, context) {
    L.TileLayer.WithHeader = L.TileLayer.extend({
      createTile (coords, done) {
        const url = this.getTileUrl(coords)
        const img = document.createElement('img')
        fetch(url, { headers: { Authorization: `Bearer ${options.token}` }, mode: 'cors' })
          .then((val) => val.blob())
          .then((blob) => {
            img.src = URL.createObjectURL(blob)
            done(null, img)
          })
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

  const TileLayerWithHeader = createTileLayerComponent(CreateTileLayerWithHeader, updateTileLayerWithHeader)

  return (
    <TileLayerWithHeader url={url} token={token} />
  )
}
