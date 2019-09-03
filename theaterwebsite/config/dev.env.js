'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APIPATH: '"http://localhost:8000"',
  CUSTOMPATH: '"bjmqfg83"'
})
