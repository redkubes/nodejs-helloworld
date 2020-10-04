require('./test-init.js')
const { expect } = require('chai')
const request = require('supertest')
const nock = require('nock')
const app = require('./index')
const pkg = require('./package.json')

describe('app tests', () => {
  it('TARGET should be used in hello', (done) => {
    process.env.TARGET = 'world'
    const out = `Hello world! I am at version: ${pkg.version}.`
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.text).to.be.equal(out)
        return done()
      })
  })
  it('if SERVANTS is set, then role MASTER is chosen, so buttons are rendered', (done) => {
    process.env.SERVANTS = 'bla,dibla'
    const shouldContain = '<button onClick="fetchServant'
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.text).to.include(shouldContain)
        return done()
      })
  })
  it('if INFORMANT is set, then informant will give a message', (done) => {
    const message = "it's ok"
    delete process.env.SERVANTS
    process.env.INFORMANT = 'http://some.informant'
    nock(process.env.INFORMANT).get('/').reply(200, message)
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.text).to.include(` My informant told me this: "${message}".`)
        return done()
      })
  })
  it("if INFORMANT is set but can't respond, then informant will give another message", (done) => {
    delete process.env.SERVANTS
    process.env.INFORMANT = 'http://some.informant'
    nock(process.env.INFORMANT).get('/').replyWithError({ code: 'ETIMEDOUT' })
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.text).to.include(
          ` I couldn't reach my informant at ${process.env.INFORMANT}. Status Code: ETIMEDOUT`,
        )
        return done()
      })
  })
})
