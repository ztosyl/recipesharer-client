'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events')
const recipeEvents = require('./recipes/events')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('.sign-up').on('submit', authEvents.onSignUp)
  $('.sign-in').on('submit', authEvents.onSignIn)
  $('.change-password').on('submit', authEvents.onChangePassword)
  $('.sign-out').on('click', authEvents.onSignOut)
  $('.get-recipes').on('click', recipeEvents.onGetRecipes)
  $('.post-recipes').on('submit', recipeEvents.onPostRecipe)
  $('.delete-recipe').on('click', recipeEvents.onDeleteRecipe)
  $('.recipes').on('click', '.show-update-recipe', recipeEvents.addUpdateForm)
  $('.recipes').on('submit', '.update-recipe', recipeEvents.onUpdateRecipe)
  $('.go-to-sign-in').on('click', authEvents.modalSwitch)
  $('.go-to-sign-up').on('click', authEvents.modalSwitchOtherWay)
  $('.recipes').on('click', '.show-full', recipeEvents.showFullRecipe)
  $('.close').on('click', () => $('.messaging').text(''))
  $('.get-your-recipes').on('click', recipeEvents.onGetYourRecipes)
  $('.recipes').on('click', '.delete-recipe-prompt', recipeEvents.promptDeleteConfirmation)
  $('.delete-recipe').on('click', recipeEvents.onDeleteRecipe)
  $('.difficulty-search').on('click', recipeEvents.onDifficultySearch)
})
