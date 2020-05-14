'use strict'

const api = require('./api')
const ui = require('./ui')
// const store = require('../store')

const onGetRecipes = event => {
  api.getRecipes()
    .then(ui.getRecipesSuccess)
    .catch(ui.getRecipesFailure)
}

module.exports = {
  onGetRecipes
}
