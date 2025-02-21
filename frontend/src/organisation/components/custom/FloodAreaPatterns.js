import * as d3 from 'd3'

export const createWarningPattern = () => {
  const warningAreaSvg = d3
    .select('body')
    .append('svg')
    .attr('width', 0)
    .attr('height', 0)
    .attr('id', 'svg-pattern')

  const warningPattern = warningAreaSvg
    .append('defs')
    .append('pattern')
    .attr('id', 'warning-pattern')
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', 10)
    .attr('height', 10)

  warningPattern
    .append('rect')
    .attr('width', 10)
    .attr('height', 10)
    .attr('fill', '#f70202')

  warningPattern
    .append('path')
    .attr('d', 'M 0 0 L 10 10 M 10 0 L 0 10')
    .attr('stroke', 'white')
    .attr('stroke-width', 2)
}

export const createAlertPattern = () => {
  const alertAreaSvg = d3
    .select('body')
    .append('svg')
    .attr('width', 0)
    .attr('height', 0)
    .attr('id', 'svg-diagonal-pattern')

  const alertPattern = alertAreaSvg
    .append('defs')
    .append('pattern')
    .attr('id', 'alert-pattern')
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', 10)
    .attr('height', 10)

  alertPattern
    .append('rect')
    .attr('width', 10)
    .attr('height', 10)
    .attr('fill', 'white')

  alertPattern
    .append('path')
    .attr('d', 'M 0 10 L 10 0')
    .attr('stroke', '#ffa200')
    .attr('stroke-width', 2)
}

export const createShapefilePattern = () => {
  const shapefileSvg = d3
    .select('body')
    .append('svg')
    .attr('width', 0)
    .attr('height', 0)
    .attr('id', 'svg-shapefile-pattern')

  const shapefilePattern = shapefileSvg
    .append('defs')
    .append('pattern')
    .attr('id', 'shapefile-pattern')
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', 20)
    .attr('height', 20)

  shapefilePattern
    .append('rect')
    .attr('width', 5)
    .attr('height', 5)
    .attr('x', 5)
    .attr('y', 5)
    .attr('fill', '#809095')

  // Second set of squares required to create off-set, checkered pattern
  shapefilePattern
    .append('rect')
    .attr('width', 5)
    .attr('height', 5)
    .attr('x', 15)
    .attr('y', 15)
    .attr('fill', '#809095')
}

export const createLiveMapShapePattern = () => {
  const liveMapSvg = d3
    .select('body')
    .append('svg')
    .attr('width', 0)
    .attr('height', 0)
    .attr('id', 'svg-live-map-shape-pattern')

  const pattern = liveMapSvg
    .append('pattern')
    .attr('id', 'live-map-shape-pattern')
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', 20)
    .attr('height', 20)

  // Add diagonal lines
  pattern
    .append('line')
    .attr('x1', 0)
    .attr('y1', 20)
    .attr('x2', 20)
    .attr('y2', 0)
    .attr('stroke', '#808080') // Grey color
    .attr('stroke-width', 2)
}
