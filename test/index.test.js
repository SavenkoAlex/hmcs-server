const { testIndex } = require('../dist/index')
const { expect } = require('chai')

describe ('index test', () => {
    it('should be a function', () => {
        expect(testIndex).to.be.a('function')
    })
    it('should return inverted false', () => {
        expect(testIndex(true)).to.be.equal(false)
    })
    it('should return inverted true', () => {
        expect(testIndex(false)).to.be.equal(true)
    })
})