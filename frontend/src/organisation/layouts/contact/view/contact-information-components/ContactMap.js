import * as turf from '@turf/turf'
import 'leaflet/dist/leaflet.css'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { GeoJSON, MapContainer, Marker, useMap } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import TileLayerWithHeader from '../../../../../common/components/custom/TileLayerWithHeader'
import { backendCall } from '../../../../../common/services/BackendService'
// Leaflet Marker Icon fix
import L from 'leaflet'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

export default function ContactMap({ mobileView }) {
  const pois = useSelector((state) => state.session.orgCurrentContact.pois)
  const [map, setMap] = useState(null)
  const [apiKey, setApiKey] = useState(null)
  const [markers, setMarkers] = useState([])
  const [geometries, setGeometries] = useState([])
  // const [geocodes, setGeocodes] = useState([])

  async function getApiKey() {
    const { errorMessage, data } = await backendCall(
      'data',
      'api/os-api/oauth2'
    )
    if (!errorMessage) {
      setApiKey(data.access_token)
    } else {
      setApiKey('error')
    }
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

  // Leaflet Marker Icon fix
  const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  })

  L.Marker.prototype.options.icon = DefaultIcon

  // transform all the pois into markers
  useEffect(() => {
    pois.forEach((poi) => {
      if (poi.coordinates) {
        setMarkers((prevMarkers) => [
          ...prevMarkers,
          [poi.coordinates.latitude, poi.coordinates.longitude]
        ])
      }
      if (poi.geometry) {
        if (isAreaVisible(poi.geometry)) {
          setGeometries((prevGeometries) => [
            ...prevGeometries,
            turf.area([poi.geometry.geoJson])
          ])
        } else {
          setMarkers((prevMarkers) => [
            ...prevMarkers,
            turf.centerOfMass(poi.geometry.geoJson)
          ])
        }
      }
      /* if (poi.geocode) {
        setGeocodes((prevGeocodes) => [...prevGeocodes, [poi.geocode]])
      } */
    })
  }, [pois])

  const isAreaVisible = (geometry) => {
    if (pois.length === 1 && pois[0].geometry) return true
    const area = turf.area(geometry.geoJson)
    const metersPerPixel =
      (156543.03392 * Math.cos(51.505 * (Math.PI / 180))) /
      Math.pow(2, map.getZoom)
    const mapWidthInMeters = map.getSize().x * metersPerPixel // Map width in meters
    const mapHeightInMeters = map.getSize().y * metersPerPixel // Map height in meters
    const visibleArea = mapWidthInMeters * mapHeightInMeters
    const threshold = visibleArea * 0.1 // Show area only if it's larger than 10% of the visible area

    return area >= threshold
  }

  // update map zoom so all markers are visible at once
  const FitBounds = () => {
    const map = useMap()
    setMap(map)
    useEffect(() => {
      if (markers.length > 0) {
        const markerBounds = L.latLngBounds(markers)
        map.fitBounds(markerBounds)
      }
    }, [markers, map])

    return null
  }

  // The center of the map should be the centroid of all the positions on the map
  const findCentroid = () => {
    if (pois.length === 0) return null
    let totalLat = 0
    let totalLng = 0

    pois.forEach((poi) => {
      totalLat += poi.coordinates.latitude
      totalLng += poi.coordinates.longitude
    })

    const avgLat = totalLat / pois.length
    const avgLng = totalLng / pois.length

    return [avgLat, avgLng]
  }

  const centre = findCentroid()

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
  const ref = useRef(null)

  return (
    <div ref={ref}>
      <MapContainer
        key={centre}
        center={centre}
        zoomControl={false}
        attributionControl={false}
        maxBounds={maxBounds}
        className={mobileView ? 'map-mobile-view' : 'map-container'}
      >
        {apiKey && apiKey !== 'error' ? (
          <>
            {tileLayerWithHeader}
            {markers.map((marker, index) => {
              return (
                <Marker key={index} position={marker} interactive={false} />
              )
            })}
            {geometries.map((geometry, index) => {
              return <GeoJSON key={index} data={geometry} />
            })}
            <FitBounds />
          </>
        ) : (
          <div className='map-error-container'>
            <p className='govuk-body-l govuk-!-margin-bottom-1'>Map Error</p>
            <Link className='govuk-body-s' onClick={() => getApiKey()}>
              Reload map
            </Link>
          </div>
        )}
      </MapContainer>
    </div>
  )
}
