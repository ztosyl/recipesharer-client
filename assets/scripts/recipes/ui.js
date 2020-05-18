'use strict'

const getRecipesTemplate = require('../templates/get-recipes.handlebars')

const getRecipesSuccess = data => {
  const getRecipesHtml = getRecipesTemplate({ recipes: data.recipes })
  $('.recipes').html(getRecipesHtml)
}

const getRecipesFailure = () => {
  $('#messaging-modal').modal('show')
  $('.messaging').text(`Sorry! Recipes could not be found at this time. Please try again.`)
}

const postRecipeSuccess = data => {
  $('.post-recipes').val('')
  $('.post-recipes').modal('hide')
  $('#messaging-modal').modal('show')
  $('.messaging').text('Recipes posted successfully!')
}

const postRecipeFailure = () => {
  $('#messaging-modal').modal('show')
  $('.messaging').text('Sorry! Recipe post failed. Please try again.')
}

const deleteRecipeFailure = () => {
  $('#messaging-modal').modal('show')
  $('.messaging').text('Sorry! Recipe could not be deleted. Please try again.')
}

const updateRecipeSuccess = data => {
  $('#update-recipe-modal').modal('hide')
  $('#messaging-modal').modal('show')
  $('.messaging').text('Recipe update succeeded!')
}

const updateRecipeFailure = () => {
  $('#messaging-modal').modal('show')
  $('.messaging').text('Sorry! Recipe update failed. Please try again.')
}

const findOneRecipeFailure = () => {
  $('#messaging-modal').modal('show')
  $('.messaging').text('Sorry! Recipe owner could not be authenticated. Recipe will be unable to be updated or deleted.')
}

const getYourRecipesSuccess = data => {
  const getRecipesHtml = getRecipesTemplate({ recipes: data })
  $('.recipes').html(getRecipesHtml)
}

const getYourRecipesFailure = () => {
  $('#messaging-modal').modal('show')
  $('.messaging').text('Sorry! Recipes could not be found at this time. Please try again.')
}

module.exports = {
  getRecipesSuccess,
  getRecipesFailure,
  postRecipeSuccess,
  postRecipeFailure,
  deleteRecipeFailure,
  updateRecipeSuccess,
  updateRecipeFailure,
  findOneRecipeFailure,
  getYourRecipesSuccess,
  getYourRecipesFailure
}
