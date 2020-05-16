'use strict'

const recipeEvents = require('./events')

const getRecipesTemplate = require('../templates/get-recipes.handlebars')

const getRecipesSuccess = data => {
  const getRecipesHtml = getRecipesTemplate({ recipes: data.recipes })
  $('.recipes').html(getRecipesHtml)
}

const getRecipesFailure = () => {
  $('.bad-messaging').text('Recipe search failed. Please try again later.')
}

const postRecipeSuccess = data => {
  $('.post-recipes').hide()
  $('.messaging').text('Recipe posted successfully!')
}

const postRecipeFailure = () => {
  $('.bad-messaging').text('Recipe post failed. Please try again later.')
}

const deleteRecipeFailure = error => {
  $('.bad-messaging').text('Recipe deletion failed. Please try again later.')
  console.error('Failed. Error is: ', error)
}

const updateRecipeSuccess = data => {
  $('.messaging').text('Recipe update succeeded!')
  $('.recipes').html('')
}

const updateRecipeFailure = error => {
  $('.bad-messaging').text('Recipe update failed. Please try again later.')
  console.error(error)
}

const findOneRecipeFailure = () => {
  $('.bad-messaging').text(`Sorry! Owner of this recipe can't be authenticated right now.`)
}

const getYourRecipesSuccess = data => {
  const getRecipesHtml = getRecipesTemplate({ recipes: data })
  $('.recipes').html(getRecipesHtml)
}

const getYourRecipesFailure = () => {
  $('.bad-messaging').text(`Sorry! Your recipes couldn't be reached at this time. Please try again later.`)
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
