const fs = require('fs')
const express = require('express')
const axios = require('axios')

const app = express()
const pkg = require('./package.json')
const env = process.env
const port = process.env.PORT || 8080
const target = env.TARGET || 'World'
const servants = env.SERVANTS
const informant = env.INFORMANT

app.get('/', async (req, res) => {
  console.log('Hello world received a request.')
  console.log('role: ', servants ? 'master' : 'servant')
  console.log('target: ', target)
  console.log('servants: ', servants)
  console.log('informant: ', informant)
  if (servants) {
    const servants = servants.split(',')
    const buttons = servants.map(
      (servant) => `<button onClick="fetchServant('${servant}')">Summon servant at ${servant}</button><br>`
    )
    const tpl = fs.readFileSync(`${__dirname}/index.html`, 'utf8')
    const out = tpl
      .replace('##TARGET', env.TARGET)
      .replace('##VERSION', pkg.version)
      .replace('##BUTTONS', buttons.join(''))
    res.send(out)
    return
  }
  const out = `Hello ${target}! I am at version: ${pkg.version}.`
  if (informant) {
    try {
      console.log(`servant asking informant: `, informant)
      const response = await axios.get(informant)
      const data = response.data
      res.send(out + ` My informant told me this: "${data}".`)
    } catch (e) {
      console.error(e)
      res.send(out + ` I couldn't reach my informant at ${informant}. Reason: ${e}`)
    }
    return
  }
  res.send(out)
})

app.listen(port, () => {
  console.log('Hello world listening on port', port)
  console.log('Hello world listening on port', port)
})
