'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')
const updateRecipeTemplate = require('../templates/update-recipe-form.handlebars')
// const store = require('../store')

const showPoster = () => {
  $('.recipes').html('')
  $('.post-recipes').show()
}

const toggleButtons = event => {
  const id = $(event.target).data('id')
  if ($(`section[data-id='${id}'] > .hidden-buttons`).is(':visible')) {
    $(`section[data-id='${id}'] > .hidden-buttons`).hide()
  } else {
    $(`section[data-id='${id}'] > .hidden-buttons`).show()
  }
}

const addUpdateForm = event => {
  const id = $(event.target).data('id')
  const updateRecipeHtml = updateRecipeTemplate({id: id})
  $(`section[data-id="${id}"]`).append(updateRecipeHtml)
  toggleButtons(event)
}

const onUpdateRecipe = event => {
  event.preventDefault()
  const id = $(event.target).data('id')
  const form = event.target
  const formData = getFormFields(form)
  formData.recipe.ingredients = formData.recipe.ingredients.split('\n')
  formData.recipe.steps = formData.recipe.steps.split('\n')
  formData.recipe.author = store.user._id
  console.log(formData)
  api.findOneRecipe(id)
    .then(recipe => {
      for (const key in recipe) {
        if (!formData.recipe[key]) {
          formData.recipe[key] = recipe[key]
        }
      }
      return formData
    })
    .then(newRecipe => api.updateRecipe(newRecipe, id))
    .then(ui.updateRecipeSuccess)
    .catch(ui.updateRecipeFailure)
}

const onDeleteRecipe = event => {
  const id = $(event.target).data('id')
  console.log(id)
  api.deleteRecipe(id)
    .then(data => ui.deleteRecipeSuccess(id))
    .catch(ui.deleteRecipeSuccess)
}

const onGetRecipes = event => {
  api.getRecipes()
    .then(ui.getRecipesSuccess)
    .catch(ui.getRecipesFailure)
}

const onPostRecipe = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  formData.recipe.ingredients = formData.recipe.ingredients.split('\n')
  formData.recipe.steps = formData.recipe.steps.split('\n')
  formData.recipe.author = store.user._id
  api.postRecipe(formData)
    .then(ui.postRecipeSuccess)
    .catch(ui.postRecipeFailure)
}

module.exports = {
  onGetRecipes,
  onPostRecipe,
  showPoster,
  toggleButtons,
  onDeleteRecipe,
  addUpdateForm,
  onUpdateRecipe
}
