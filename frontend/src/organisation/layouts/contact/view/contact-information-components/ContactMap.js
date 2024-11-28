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
import LocationDataType from '../../../../../common/enums/LocationDataType'
export default function ContactMap ({ mobileView }) {
  const pois = useSelector((state) => state.session.orgCurrentContact.pois)
  const testGeo = useSelector((state) => state.session.currentLocation.geometry)

  let visibleArea = 0
  const [apiKey, setApiKey] = useState(null)
  const [markers, setMarkers] = useState([])
  const [geometries, setGeometries] = useState([])
  const [boundaries, setBoundaries] = useState([])
  // const [geocodes, setGeocodes] = useState([])

  async function getApiKey () {
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

  useEffect(() => {
    if (pois) {
      pois.forEach((poi) => {
        const dataType = poi.meta_data.location_additional.location_data_type

        const addCentroidToMarkers = () => {
          const centroid = turf.centerOfMass(poi.geometry.geoJson).geometry
            .coordinates
          setMarkers((prevMarkers) => [
            ...prevMarkers,
            [centroid[1], centroid[0]]
          ])
        }

        switch (dataType) {
          case LocationDataType.SHAPE_POLYGON:
          case LocationDataType.BOUNDARY:
          case LocationDataType.SHAPE_LINE:
            if (isAreaVisible(poi.geometry.geoJson)) {
              const stateKey =
                dataType === LocationDataType.SHAPE_POLYGON
                  ? setGeometries
                  : setBoundaries
              stateKey((prevState) => [...prevState, poi.geometry.geoJson])
            } else {
              addCentroidToMarkers()
            }
            break
          default:
            setMarkers((prevMarkers) => [
              ...prevMarkers,
              [poi.coordinates.latitude, poi.coordinates.longitude]
            ])
            break
        }

        if (testGeo) {
          const parsed = JSON.parse(testGeo.geoJson)
          console.log(parsed)
          if (isAreaVisible(parsed)) {
            setGeometries((prevGeometries) => [...prevGeometries, parsed])
          } else {
            const centroid = turf.centerOfMass(parsed).geometry.coordinates
            setMarkers((prevMarkers) => [
              ...prevMarkers,
              [centroid[1], centroid[0]]
            ])
          }
        }
      })
    }
  }, [pois])

  const isAreaVisible = (geometry) => {
    if (pois.length === 1) return true
    if (visibleArea > 0) {
      const area = turf.area(geometry)
      const threshold = visibleArea * 0.1
      return area > threshold
    }
    return false
  }

  // update map zoom so all markers are visible at once
  const FitBounds = () => {
    const map = useMap()
    useEffect(() => {
      if (
        markers.length > 0 ||
        geometries.length > 0 ||
        boundaries.length > 0
      ) {
        let bounds = L.latLngBounds()
        if (markers.length > 0) {
          // Add marker bounds

          const markerBounds = L.latLngBounds(markers)
          bounds = bounds.extend(markerBounds)

          map.fitBounds(bounds)
          calculateVisibleArea(map)
        }
        // Add geometry bounds
        if (geometries.length > 0) {
          console.log('geolenght', geometries.length)
          geometries.forEach((geometry) => {
            const feature = L.geoJson(geometry)
            if (feature.getBounds()) {
              bounds = bounds.extend(feature.getBounds())
            }
          })
        }
        if (boundaries.length > 0) {
          boundaries.forEach((boundary) => {
            const feature = L.geoJson(boundary)
            if (feature.getBounds()) {
              bounds = bounds.extend(feature.getBounds())
            }
          })
        }
        map.fitBounds(bounds)
      }
    }, [markers, geometries, map])

    return null
  }

  const calculateVisibleArea = (map) => {
    const metersPerPixel =
      (156543.03392 * Math.cos(51.505 * (Math.PI / 180))) /
      Math.pow(2, map.getZoom())
    const mapWidthInMeters = map.getSize().x * metersPerPixel
    const mapHeightInMeters = map.getSize().y * metersPerPixel

    visibleArea = mapWidthInMeters * mapHeightInMeters
  }

  // The center of the map should be the centroid of all the positions on the map
  const findCentroid = () => {
    if (!pois) return null
    let totalLat = 0
    let totalLng = 0

    pois.forEach((poi) => {
      if (
        poi.meta_data.location_additional.location_data_type ===
        LocationDataType.X_AND_Y_COORDS
      ) {
        totalLat += poi.coordinates.latitude
        totalLng += poi.coordinates.longitude
      } else {
        const centroid = turf.centerOfMass(poi.geometry.geoJson).geometry
          .coordinates
        totalLat += centroid[1]
        totalLng += centroid[0]
      }
    })

    const avgLat = totalLat / pois.length
    const avgLng = totalLng / pois.length

    return [avgLat, avgLng]
  }

  const centre = findCentroid()

  const onEachAlertAreaFeature = (feature, layer) => {
    layer.options.className = 'alert-area-pattern-fill'

    layer.setStyle({
      color: '#ffa200',
      weight: 2,
      fillOpacity: 0.5
    })
  }

  const onEachBoundaryFeature = (feauture, layer) => {
    layer.options.className = 'existing-boundary-area-pattern-fill'
    layer.setStyle({
      opacity: 1,
      color: '#6d7475',
      weight: 2,
      fillOpacity: 0.6
    })
  }

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
        dragging={false}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl={false}
        maxBounds={maxBounds}
        className={mobileView ? 'map-mobile-view' : 'map-container'}
      >
        {apiKey && apiKey !== 'error'
          ? (
            <>
              {tileLayerWithHeader}
              {markers.map((marker, index) => {
                return (
                  <Marker key={index} position={marker} interactive={false} />
                )
              })}
              {geometries.map((geometry, index) => {
                return (
                  <GeoJSON
                    key={index}
                    data={geometry}
                    onEachFeature={onEachAlertAreaFeature}
                  />
                )
              })}
              {boundaries.map((boundary, index) => {
                return (
                  <GeoJSON
                    key={index}
                    data={boundary}
                    onEachFeature={onEachBoundaryFeature}
                  />
                )
              })}
              <FitBounds />
            </>
            )
          : (
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
