/* global describe, it */
const expect = require('chai').expect
const std = require('../../src/index')

describe('變形工時', () => {
  describe('雙週', () => {
    it('雙週班表工時' +
       '[10, 10, 10, 10, 0, 0, 0], ' +
       '[10, 10, 10, 10, 0, 0, 0]，' +
       '為合法雙週變形工時，無加班費（勞基法 30 條）', () => {
      let result = std.transformedWorkshift([
        [10, 10, 10, 10, 0, 0, 0],
        [10, 10, 10, 10, 0, 0, 0]
      ], std.DUAL_WEEK_WORKSHIFT)
      expect(result.overtime).eq([
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ])
      expect(result.reference[0].id).eq('LSA-30')
    })

    it('雙週班表工時' +
       '[10, 10, 10, 10, 4, 0, 0], ' +
       '[10, 10, 10, 10, 4, 0, 0]，' +
       '為合法雙週變形工時，無加班費（勞基法 30 條）', () => {
      let result = std.transformedWorkshift([
        [10, 10, 10, 10, 4, 0, 0],
        [10, 10, 10, 10, 4, 0, 0]
      ], std.DUAL_WEEK_WORKSHIFT)
      expect(result.overtime).eq([
        [0, 0, 0, 0, 4, 0, 0],
        [0, 0, 0, 0, 4, 0, 0]
      ])
      expect(result.reference[0].id).eq('LSA-30')
    })
  })

  describe('四週', () => {
    it('四週班表工時' +
       '[0, 0, 0, 9, 9, 9, 9], ' +
       '[9, 9, 9, 9, 0, 0, 0], ' +
       '[0, 0, 9, 9, 9, 9, 9], ' +
       '[9, 9, 9, 8, 8, 0, 0]，' +
       '為合法四週變形工時，無加班費（勞基法 30-1條）', () => {
      let result = std.transformedWorkshift([
        [0, 0, 0, 9, 9, 9, 9],
        [9, 9, 9, 9, 0, 0, 0],
        [0, 0, 9, 9, 9, 9, 9],
        [9, 9, 9, 8, 8, 0, 0]
      ], std.QUAD_WEEK_WORKSHIFT)
      expect(result.overtime).eq([
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ])
      expect(result.reference[0].id).eq('LSA-30-1')
    })

    it('四週班表工時' +
       '[0, 0, 0, 10, 10, 10, 10], ' +
       '[10, 10, 10, 10, 10, 0, 0], ' +
       '[0, 0, 0, 0, 0, 10, 10], ' +
       '[10, 10, 10, 10, 10, 0, 0]，' +
       '為合法四週變形工時，無加班費（勞基法 30-1條）', () => {
      let result = std.transformedWorkshift([
        [0, 0, 0, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 0, 0],
        [0, 0, 0, 0, 0, 10, 10],
        [10, 10, 10, 10, 10, 0, 0]
      ], std.QUAD_WEEK_WORKSHIFT)
      expect(result.overtime).eq([
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ])
      expect(result.reference[0].id).eq('LSA-30-1')
    })
  })

  describe('八週', () => {
    it('八週班表工時' +
       '[0, 8, 8, 8, 8, 8, 8], ' +
       '[0, 8, 8, 8, 8, 8, 8], ' +
       '[0, 8, 8, 8, 8, 8, 8], ' +
       '[0, 8, 8, 8, 8, 8, 8], ' +
       '[0, 8, 8, 8, 8, 8, 8], ' +
       '[0, 8, 8, 8, 8, 8, 8], ' +
       '[0, 8, 8, 8, 8, 0, 0], ' +
       '[0, 0, 0, 0, 0, 0, 0], ' +
       '為合法八週變形工時，無加班費（勞基法 30條）', () => {
      let result = std.transformedWorkshift([
        [0, 8, 8, 8, 8, 8, 8],
        [0, 8, 8, 8, 8, 8, 8],
        [0, 8, 8, 8, 8, 8, 8],
        [0, 8, 8, 8, 8, 8, 8],
        [0, 8, 8, 8, 8, 8, 8],
        [0, 8, 8, 8, 8, 8, 8],
        [0, 8, 8, 8, 8, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ], std.OCTA_WEEK_WORKSHIFT)
      expect(result.overtime).eq([
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ])
      expect(result.reference[0].id).eq('LSA-30-1')
    })
  })
})
