const { use } = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

use(chaiAsPromised)
use(sinonChai)

before(() => {
  sinon.stub(console, 'log')
  sinon.stub(console, 'debug')
  sinon.stub(console, 'info')
  sinon.stub(console, 'warn')
  sinon.stub(console, 'error')
})
