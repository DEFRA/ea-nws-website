import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createElementObject, createTileLayerComponent, updateGridLayer, withPane } from '@react-leaflet/core'
import 'leaflet/dist/leaflet.css'
import React, { useEffect, useState } from 'react'
import {
  GeoJSON,
  MapContainer,
  Marker,
  Popup, ZoomControl,
  useMap
} from 'react-leaflet'
import { useSelector } from 'react-redux'
import { getFloodTargetArea } from '../services/GetFloodTargetAreas'
// Leaflet Marker Icon fix
import L from 'leaflet'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import { backendCall } from '../services/BackendService'

export default function Map ({ types }) {
  const [alertArea, setAlertArea] = useState(null)
  const [warningArea, setWarningArea] = useState(null)
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const { latitude, longitude } = selectedLocation.coordinates
  const [apiKey, setApiKey] = useState(null)


    function createTileLayerWithHeader({ url , ...options }, context) {
      L.TileLayer.WithHeader = L.TileLayer.extend({
        createTile(coords, done) {
          const url = this.getTileUrl(coords);
          const img = document.createElement("img");
    
          fetch(url, { headers: { Authorization: `Bearer ${options.token}`}, mode: 'cors' })
            .then((val) => val.blob())
            .then((blob) => {
              img.src = URL.createObjectURL(blob);
              done(null, img);
            });
          return img;
        },
      })
        const layer = new L.TileLayer.WithHeader(url, withPane(options, context));
        return createElementObject(layer, context);
    }

    function updateTileLayerWithHeader(layer, props, prevProps) {
        updateGridLayer(layer, props, prevProps);
        const { url } = props;
        if (url != null && url !== prevProps.url) {
            layer.setUrl(url);
        }
    }


const TileLayerWithHeader = createTileLayerComponent(createTileLayerWithHeader, updateTileLayerWithHeader)


  useEffect(() => {
    async function fetchFloodAreaData () {
      const { alertArea, warningArea } = await getFloodTargetArea(
        latitude,
        longitude
      )
      setAlertArea(alertArea)
      setWarningArea(warningArea)
    }
    fetchFloodAreaData()
  }, [])

  // Leaflet Marker Icon fix
  const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  })

  L.Marker.prototype.options.icon = DefaultIcon

  const ResetMapButton = () => {
    const map = useMap()

    const handleClick = () => {
      map.setView([latitude, longitude], 14)
    }

    return (
      <div
        style={{
          position: 'absolute',
          bottom: '80px',
          right: '12px',
          zIndex: 1000,
          background: 'white',
          padding: '3px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faRotateLeft} size='2x' />
      </div>
    )
  }

  async function getApiKey () {
    const { data } = await backendCall(
      'data',
      'api/os-api/oauth2'
    )
    console.log(data)
    setApiKey(data.access_token)
    return data.expires_in
  }

  useEffect(() => {
    return () => {getApiKey()}
  }, [])

 useEffect(() => {
  const interval = setInterval(() => {getApiKey()}, 270000)
  return () => {clearInterval(interval)}
}, [])

  const url = 'https://api.os.uk/maps/raster/v1/wmts'
  const parameters = {
    tileMatrixSet: encodeURI('EPSG:3857'),
    version: '1.0.0',
    style: 'default',
    layer: encodeURI('Outdoor_3857'),
    service: 'WMTS',
    request: 'GetTile',
    tileCol: '{x}',
    tileRow: '{y}',
    tileMatrix: '{z}'
  }

  let parameterString = Object.keys(parameters)
    .map(function(key) { return key + '=' + parameters[key]})
    .join('&')

  return (
    <>
      <MapContainer
        center={[latitude, longitude]}
        zoom={14}
        zoomControl={false}
        attributionControl={false}
        className='map-container'
      >
        <TileLayerWithHeader url={url + '?' + parameterString} token={apiKey} />
        <ZoomControl position='bottomright' />
        <Marker position={[latitude, longitude]}>
          <Popup />
        </Marker>
        {warningArea && types.includes('warning') && (
          <GeoJSON data={warningArea} style={{ color: '#f70202' }} />
        )}
        {alertArea && types.includes('alert') && (
          <GeoJSON data={alertArea} style={{ color: '#ffa200' }} />
        )}
        <ResetMapButton />
      </MapContainer>
    </>
  )
}
