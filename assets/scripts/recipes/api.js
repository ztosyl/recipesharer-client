'use strict'

const store = require('../store')
const config = require('../config')

const getRecipes = () => {
  return $.ajax({
    url: config.apiUrl + '/recipes',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  getRecipes
}
