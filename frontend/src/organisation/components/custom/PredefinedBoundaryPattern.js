import * as d3 from 'd3'

export const createExistingBoundaryPattern = () => {
  const existingBoundaryAreaSvg = d3
    .select('body')
    .append('svg')
    .attr('width', 0)
    .attr('height', 0)
    .attr('id', 'svg-diagonal-pattern')

  const existingBoundaryPattern = existingBoundaryAreaSvg
    .append('defs')
    .append('pattern')
    .attr('id', 'existing-boundary-pattern')
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', 10)
    .attr('height', 10)

  existingBoundaryPattern
    .append('path')
    .attr('d', 'M 0 10 L 10 0')
    .attr('stroke', '#9e9e9e')
    .attr('stroke-width', 2)
}
