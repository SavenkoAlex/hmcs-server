const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const { expect } = chai

describe('auth Api', () => {
    const user = {
        name: 'test user',
        email: 'test@test.com',
    }

    describe('registry', () => {
        it('should return success', done => {
            const response = chai.request('http://localhost:3000')
            .post('/api/auth/login')
            .send(user)
            .end((err, res) => {
                if (err) {
                    throw new Error(err)
                }
                expect(res.status).is.equal(200)
                expect(res.body).has.property('msg')
                done()
            })
        })
    })
})