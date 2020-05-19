'use strict'

const getRecipesTemplate = require('../templates/get-recipes.handlebars')

// if getting all recipes succeeds
const getRecipesSuccess = data => {
  // put all recipe data into handlebars template
  const getRecipesHtml = getRecipesTemplate({ recipes: data.recipes })
  // add handlebars html to .recipes
  $('.recipes').html(getRecipesHtml)
}

// if getting all recipes fails
const getRecipesFailure = () => {
  // let user know GET request failed
  $('#messaging-modal').modal('show')
  $('.messaging').text(`Sorry! Recipes could not be found at this time. Please try again.`)
}

// if recipe post succeeds
const postRecipeSuccess = data => {
  // clear all post-field input values
  $('.post-field').val('')
  // close post-recipes modal
  $('#post-recipe-modal').modal('hide')
  // let user know post was successful
  $('#messaging-modal').modal('show')
  $('.messaging').text('Recipes posted successfully!')
}

// if recipe post fails
const postRecipeFailure = () => {
  // clear all post-field input values
  $('.post-field').val('')
  // let user know post failed
  $('#messaging-modal').modal('show')
  $('.messaging').text('Sorry! Recipe post failed. Please try again.')
}

// if recipe deletion fails
const deleteRecipeFailure = () => {
  // let user know delete failed
  $('#messaging-modal').modal('show')
  $('.messaging').text('Sorry! Recipe could not be deleted. Please try again.')
}

// if recipe update succeeds
const updateRecipeSuccess = data => {
  // clear update-recipe input values
  $('.update-field').val('')
  // hide update-recipe modal
  $('#update-recipe-modal').modal('hide')
  // let user know update succeeded
  $('#messaging-modal').modal('show')
  $('.messaging').text('Recipe update succeeded!')
}

// if recipe update fails
const updateRecipeFailure = () => {
  // clear update-recipe input values
  $('.update-field').val('')
  // let user know update failed
  $('#messaging-modal').modal('show')
  $('.messaging').text('Sorry! Recipe update failed. Please try again.')
}

// if find one recipe fails
const findOneRecipeFailure = () => {
  // let user know this failed
  $('#messaging-modal').modal('show')
  $('.messaging').text('Sorry! Recipe could not be found at this time. Please try again.')
}

// if getting your recipes succeeds
const getYourRecipesSuccess = data => {
  // take recipe data and pass it through handlebars template
  const getRecipesHtml = getRecipesTemplate({ recipes: data })
  // put recipe html in .recipes
  $('.recipes').html(getRecipesHtml)
}

// if getting your recipes fails
const getYourRecipesFailure = () => {
  // let user know about failure
  $('#messaging-modal').modal('show')
  $('.messaging').text('Sorry! Recipes could not be found at this time. Please try again.')
}

// if comment creation succeeds
const createCommentSuccess = () => {
  // clear comment-input input values
  $('.comment-input').val('')
  // let user know that creation was a success
  $('#messaging-modal').modal('show')
  $('.messaging').text('Comment posted successfully!')
}

// if comment creation fails
const createCommentFailure = () => {
  // clear comment-input input values
  $('.comment-input').val('')
  // let user know comment creation failed
  $('#messaging-modal').modal('show')
  $('.messaging').text('Comment could not be posted at this time. Please try again.')
}

// if rating post succeeds
const postRatingSuccess = () => {
  // let user know ratings post succeeded
  $('#messaging-modal').modal('show')
  $('.messaging').text('Rating posted successfully!')
  // clear all stars to outlines
  for (let i = 1; i <= 5; i++) {
    $(`span[data-id=${i}]`).html(`&#9734;`)
  }
}

// if rating post fails
const postRatingFailure = () => {
  // let user know ratings post failed
  $('#messaging-modal').modal('show')
  $('.messaging').text('Rating could not be posted at this time. Please try again.')
  // clear all stars to outlines
  for (let i = 1; i <= 5; i++) {
    $(`span[data-id=${i}]`).html(`&#9734;`)
  }
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
