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
  $('.post-field').val('')
  $('#post-recipe-modal').modal('hide')
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
  $('.update-field').val('')
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

const createCommentSuccess = () => {
  $('#messaging-modal').modal('show')
  $('.messaging').text('Comment posted successfully!')
}

const createCommentFailure = () => {
  $('#messaging-modal').modal('show')
  $('.messaging').text('Comment could not be posted at this time. Please try again.')
}

const postRatingSuccess = () => {
  $('#messaging-modal').modal('show')
  $('.messaging').text('Rating posted successfully!')
}

const postRatingFailure = () => {
  $('#messaging-modal').modal('show')
  $('.messaging').text('Rating could not be posted at this time. Please try again.')
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
  getYourRecipesFailure,
  createCommentSuccess,
  createCommentFailure,
  postRatingSuccess,
  postRatingFailure
}
