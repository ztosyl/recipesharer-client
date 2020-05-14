'use strict'

const getRecipesTemplate = require('../templates/get-recipes.handlebars')

const getRecipesSuccess = data => {
  const getRecipesHtml = getRecipesTemplate({ recipes: data.recipes })
  $('.messaging').html(getRecipesHtml)
  console.log('Recipes gotten successfully.')
}

const getRecipesFailure = error => {
  console.error('Get recipes failed! Error: ' + error)
}

module.exports = {
  getRecipesSuccess,
  getRecipesFailure
}
