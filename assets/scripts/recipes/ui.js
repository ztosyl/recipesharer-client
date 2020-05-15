'use strict'

const getRecipesTemplate = require('../templates/get-recipes.handlebars')

const getRecipesSuccess = data => {
  const getRecipesHtml = getRecipesTemplate({ recipes: data.recipes })
  $('.recipes').html(getRecipesHtml)
}

const getRecipesFailure = () => {
  $('.messaging').text('Recipe search failed. Please try again later.')
}

const postRecipeSuccess = data => {
  $('.post-recipes').hide()
  $('.messaging').text('Recipe posted successfully!')
  console.log('Recipe posted successfully. Data: ' + data)
}

const postRecipeFailure = () => {
  $('.messaging').text('Recipe post failed. Please try again later.')
}

const deleteRecipeSuccess = id => {
  $(`section[data-id=${id}]`).remove()
  console.log('Recipe deleted successfully.')
}

const deleteRecipeFailure = error => {
  $('.messaging').text('Recipe deletion failed. Please try again later.')
  console.error(error)
}

const updateRecipeSuccess = data => {
  $('.messaging').text('Recipe update succeeded!')
  $('.recipes').html('')
}

const updateRecipeFailure = error => {
  $('.messaging').text('Recipe update failed. Please try again later.')
  console.error(error)
}

module.exports = {
  getRecipesSuccess,
  getRecipesFailure,
  postRecipeSuccess,
  postRecipeFailure,
  deleteRecipeSuccess,
  deleteRecipeFailure,
  updateRecipeSuccess,
  updateRecipeFailure
}
