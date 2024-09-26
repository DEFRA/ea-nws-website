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
    .attr('stroke-width', 1)
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
