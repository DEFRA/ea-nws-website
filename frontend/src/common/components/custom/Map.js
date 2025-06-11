import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'leaflet/dist/leaflet.css'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  GeoJSON,
  MapContainer,
  Marker,
  Popup,
  ZoomControl,
  useMap
} from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import {
  setSelectedFloodAlertArea,
  setSelectedFloodWarningArea
} from '../../redux/userSlice'
import { getSurroundingFloodAreas } from '../../services/WfsFloodDataService'
// Leaflet Marker Icon fix
import L from 'leaflet'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import { backendCall } from '../../services/BackendService'
import TileLayerWithHeader from './TileLayerWithHeader'

export default function Map({
  types,
  setFloodAreas,
  mobileView,
  interactive = false
}) {
  const dispatch = useDispatch()
  const [alertArea, setAlertArea] = useState(null)
  const [warningArea, setWarningArea] = useState(null)
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const { latitude, longitude } = selectedLocation.coordinates
  const [apiKey, setApiKey] = useState(null)
  // used when user has selected search via placename and radius of TAs found is extended
  const locationSearchType = useSelector(
    (state) => state.session.locationSearchType
  )
  // used when user selects flood area when location is within proximity
  const isUserInNearbyTargetFlowpath = useSelector(
    (state) => state.session.nearbyTargetAreaFlow
  )
  const selectedFloodWarningArea = useSelector(
    (state) => state.session.selectedFloodWarningArea
  )
  const selectedFloodAlertArea = useSelector(
    (state) => state.session.selectedFloodAlertArea
  )
  const showOnlySelectedFloodArea = useSelector(
    (state) => state.session.showOnlySelectedFloodArea
  )
  // the below is used to interact with the map to highlight selected flood areas
  // or only show selected flood areas
  const alertAreaRef = useRef(null)
  const warningAreaRef = useRef(null)
  const [alertAreaRefVisible, setAlertAreaRefVisible] = useState(false)
  const [warningAreaRefVisible, setWarningAreaRefVisible] = useState(false)

  // get flood area data
  useEffect(() => {
    async function fetchFloodAreaData() {
      const { alertArea, warningArea } = await getSurroundingFloodAreas(
        latitude,
        longitude,

        !isUserInNearbyTargetFlowpath
          ? // only load TAs required i.e if location being added lies within TAs, then only load these by searching with a 1m radius
            // this can be repeated for locations that were added as a TA as well
            0.001
          : // extend the radius of TAs loaded on map when user has searched via placename
          locationSearchType === 'placename'
          ? 1.5
          : 0.5
      )
      setAlertArea(alertArea)
      setWarningArea(warningArea)
    }
    fetchFloodAreaData()
  }, [])

  // pass flood area options to parent component - used to show nearby flood areas
  useEffect(() => {
    if (alertArea && warningArea && setFloodAreas) {
      console.log('alertArea', alertArea)
      console.log('warningArea', warningArea)
      console.log('Combined features', [
        ...(alertArea?.features || []),
        ...(warningArea?.features || [])
      ])

      setFloodAreas([
        ...(alertArea?.features || []),
        ...(warningArea?.features || [])
      ])
    }
  }, [alertArea, warningArea])

  // outline the selected flood area - used when user has chosen flood area from proximity
  useEffect(() => {
    if (!alertAreaRef.current && !warningAreaRef.current) return
    showAreas()
  }, [
    types,
    alertArea,
    warningArea,
    selectedFloodWarningArea,
    selectedFloodAlertArea,
    showOnlySelectedFloodArea,
    warningAreaRefVisible,
    alertAreaRefVisible
  ])

  const HighlightSelectedArea = (
    selectedFloodWarningArea,
    selectedFloodAlertArea
  ) => {
    if (warningAreaRefVisible && types.includes('severe')) {
      warningAreaRef.current.eachLayer((layer) => {
        if (layer.feature.id === selectedFloodWarningArea.id) {
          layer.bringToFront()
          layer.setStyle({
            color: 'black',
            weight: 3,
            fillColor: '#f70202'
          })
        } else {
          layer.bringToBack()
          layer.setStyle({
            fillColor: '#f70202'
          })
        }
      })
    }

    if (alertAreaRefVisible && types.includes('alert')) {
      alertAreaRef.current.eachLayer((layer) => {
        if (layer.feature.id === selectedFloodAlertArea.id) {
          layer.bringToFront()
          layer.setStyle({
            color: 'black',
            weight: 3,
            fillColor: '#ffa200'
          })
        } else {
          layer.bringToBack()
          layer.setStyle({
            fillColor: '#ffa200'
          })
        }
      })
    }
  }

  const showSelectedArea = (
    selectedFloodWarningArea,
    selectedFloodAlertArea
  ) => {
    if (warningAreaRefVisible && types.includes('severe')) {
      warningAreaRef.current.eachLayer((layer) => {
        if (layer.feature.id === selectedFloodWarningArea.id) {
          layer.setStyle({
            fillColor: '#f70202'
          })
        } else {
          layer.remove()
        }
      })
    }

    if (alertAreaRefVisible && types.includes('alert')) {
      alertAreaRef.current.eachLayer((layer) => {
        if (layer.feature.id === selectedFloodAlertArea.id) {
          layer.setStyle({
            fillColor: '#ffa200'
          })
        } else {
          layer.remove()
        }
      })
    }
  }

  const showAreas = () => {
    if (
      (selectedFloodWarningArea || selectedFloodAlertArea) &&
      showOnlySelectedFloodArea
    ) {
      // user has decided on a flood area - show only this area
      showSelectedArea(selectedFloodWarningArea, selectedFloodAlertArea)
    } else if (
      (selectedFloodWarningArea || selectedFloodAlertArea) &&
      !showOnlySelectedFloodArea
    ) {
      // user is still deciding what area to pick
      HighlightSelectedArea(selectedFloodWarningArea, selectedFloodAlertArea)
    }
  }

  // runs on map-render - used when user selects areas on mobile view
  showAreas()

  // reset the map to selected location
  const ResetMapButton = () => {
    const map = useMap()

    const handleClick = () => {
      map.setView([latitude, longitude], 14)
    }

    return (
      <button
        className='reset-map-button'
        aria-label='Reset map zoom and centre on point selected'
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faRotateLeft} size='2x' />
      </button>
    )
  }

  // Leaflet Marker Icon fix
  const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  })

  L.Marker.prototype.options.icon = DefaultIcon

  async function getApiKey() {
    const { data } = await backendCall('data', 'api/os-api/oauth2')
    setApiKey(data.access_token)
  }

  useEffect(() => {
    getApiKey()
    const interval = setInterval(() => {
      getApiKey()
    }, 270000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const url = 'https://api.os.uk/maps/raster/v1/wmts'
  const parameters = {
    tileMatrixSet: encodeURI('EPSG:3857'),
    version: '2.0.0',
    style: 'default',
    layer: encodeURI('Outdoor_3857'),
    service: 'WMTS',
    request: 'GetTile',
    tileCol: '{x}',
    tileRow: '{y}',
    tileMatrix: '{z}'
  }

  const parameterString = Object.keys(parameters)
    .map(function (key) {
      return key + '=' + parameters[key]
    })
    .join('&')

  const maxBounds = [
    [49.528423, -10.76418],
    [61.331151, 1.9134116]
  ]

  const tileLayerWithHeader = useMemo(
    () => (
      <TileLayerWithHeader
        url={url + '?' + parameterString}
        token={apiKey}
        bounds={maxBounds}
      />
    ),
    [apiKey]
  )

  function SetMapBoundsToShowFullFloodArea() {
    const map = useMap()
    useEffect(() => {
      if (
        (selectedFloodWarningArea || selectedFloodAlertArea) &&
        showOnlySelectedFloodArea
      ) {
        // user has decided on a flood area - show only this area
        showSelectedArea(selectedFloodWarningArea, selectedFloodAlertArea)
        // fit the area to the map
        if (types.includes('severe')) {
          const layer = L.geoJSON(selectedFloodWarningArea)
          const bounds = layer.getBounds()
          map.fitBounds(bounds)
        } else if (types.includes('alert')) {
          const layer = L.geoJSON(selectedFloodAlertArea)
          const bounds = layer.getBounds()
          map.fitBounds(bounds)
        }
      }
    }, [
      selectedFloodWarningArea,
      selectedFloodAlertArea,
      showOnlySelectedFloodArea
    ])
  }

  return (
    <>
      <div aria-label='Map'>
        <MapContainer
          center={[latitude, longitude]}
          zoom={14}
          zoomControl={false}
          attributionControl={false}
          minZoom={7}
          maxBounds={maxBounds}
          className={mobileView ? 'map-mobile-view' : 'map-container'}
        >
          {apiKey && tileLayerWithHeader}
          {showOnlySelectedFloodArea && <SetMapBoundsToShowFullFloodArea />}
          {!mobileView && <ZoomControl position='bottomright' />}
          {!showOnlySelectedFloodArea && !mobileView && <ResetMapButton />}
          {!showOnlySelectedFloodArea && (
            <Marker position={[latitude, longitude]} interactive={false}>
              <Popup />
            </Marker>
          )}
          {alertArea && types.includes('alert') && (
            <GeoJSON
              data={alertArea}
              style={{ color: '#ffa200' }}
              onEachFeature={function (feature, layer) {
                interactive &&
                  layer.on({
                    click: () => dispatch(setSelectedFloodAlertArea(feature))
                  })
              }}
              ref={(el) => {
                alertAreaRef.current = el
                setAlertAreaRefVisible(true)
              }}
            />
          )}
          {warningArea && types.includes('severe') && (
            <GeoJSON
              data={warningArea}
              style={{ color: '#f70202' }}
              onEachFeature={function (feature, layer) {
                interactive &&
                  layer.on({
                    click: () => dispatch(setSelectedFloodWarningArea(feature))
                  })
              }}
              ref={(el) => {
                warningAreaRef.current = el
                setWarningAreaRefVisible(true)
              }}
            />
          )}
        </MapContainer>
      </div>
    </>
  )
}
