'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')
const updateRecipeTemplate = require('../templates/update-recipe-form.handlebars')
const getOneRecipeTemplate = require('../templates/get-one-recipe.handlebars')
// const store = require('../store')

const showFullRecipe = event => {
  const target = event.target
  const id = $(target).data('id')
  api.findOneRecipe(id)
    .then(recipe => {
      const getOneRecipeHtml = getOneRecipeTemplate({recipe: recipe})
      $('.recipes').html(getOneRecipeHtml)
      return recipe
    })
    .then(recipe => {
      if (recipe.recipe.author === store.user._id) {
        $(`section[data-id='${id}'] > .hidden-buttons`).show()
      }
    })
    .catch(ui.findOneRecipeFailure)
}

const onGetYourRecipes = event => {
  const yourRecipes = []
  const you = store.user._id
  api.getRecipes()
    .then(data => {
      const recipes = data.recipes
      console.log(you)
      for (let i = 0; i < recipes.length; i++) {
        console.log(recipes[i].author)
        if (recipes[i].author === you) {
          yourRecipes.push(recipes[i])
        }
      }
      return yourRecipes
    })
    .then(ui.getYourRecipesSuccess)
    .catch(ui.getYourRecipesFailure)
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
  delete formData.recipe['recipe']
  api.findOneRecipe(id)
    .then(recipe => {
      for (const key in formData.recipe) {
        const formVal = formData.recipe[key]
        if (!formVal) {
          formData.recipe[key] = recipe.recipe[key]
        } else if (Array.isArray(formVal)) {
          if (formVal.every(item => item === '')) {
            formData.recipe[key] = recipe.recipe[key]
          }
        }
      }
      delete formData.recipe['recipe']
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
  toggleButtons,
  onDeleteRecipe,
  addUpdateForm,
  onUpdateRecipe,
  showFullRecipe,
  onGetYourRecipes
}
