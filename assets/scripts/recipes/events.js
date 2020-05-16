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

const promptDeleteConfirmation = event => {
  const id = $(event.target).data('id')
  $('#delete-confirmation-modal').show()
  $('#delete-confirmation-modal').data('id', id)
}

const onGetYourRecipes = event => {
  const yourRecipes = []
  const you = store.user._id
  api.getRecipes()
    .then(data => {
      const recipes = data.recipes
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

const onGetRecipes = event => {
  api.getRecipes()
    .then(ui.getRecipesSuccess)
    .catch(ui.getRecipesFailure)
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

const onDifficultySearch = event => {
  let keyword
  const resultRec = []
  if ($(event.target).hasClass('easy')) {
    keyword = 'Easy'
  } else if ($(event.target).hasClass('mod')) {
    keyword = 'Moderate'
  } else {
    keyword = 'Difficult'
  }
  api.getRecipes()
    .then(data => {
      const recipes = data.recipes
      for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].difficulty === keyword) {
          resultRec.push(recipes[i])
        }
      }
      return resultRec
    })
    .then(recipes => ui.getYourRecipesSuccess(recipes))
    .catch(ui.getRecipesFailure)
}

const onMealSearch = event => {
  let keyword
  const resultRec = []
  if ($(event.target).hasClass('breakfast')) {
    keyword = 'Breakfast'
  } else if ($(event.target).hasClass('lunch')) {
    keyword = 'Lunch'
  } else if ($(event.target).hasClass('dinner')) {
    keyword = 'Dinner'
  } else if ($(event.target).hasClass('dessert')) {
    keyword = 'Dessert'
  } else if ($(event.target).hasClass('side')) {
    keyword = 'Side'
  } else if ($(event.target).hasClass('snack')) {
    keyword = 'Snack'
  } else {
    keyword = 'Beverage'
  }
  api.getRecipes()
    .then(data => {
      const recipes = data.recipes
      for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].meal === keyword) {
          resultRec.push(recipes[i])
        }
      }
      return resultRec
    })
    .then(recipes => ui.getYourRecipesSuccess(recipes))
    .catch(ui.getRecipesFailure)
}

const onSearchByIngredients = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  const searchQuery = formData.ingredients.toUpperCase()
  if (searchQuery.includes(' ')) {
    const queries = searchQuery.split(' ')
    api.getRecipes()
      .then(data => {
        const recipes = data.recipes
        const result = []
        for (let i = 0; i < recipes.length; i++) {
          const currRecipe = recipes[i]
          const ingredTracker = []
          for (let z = 0; z < currRecipe.ingredients.length; z++) {
            const currIngred = currRecipe.ingredients[z].toUpperCase()
            for (let q = 0; q < queries.length; q++) {
              const currQuery = queries[q]
              if (currIngred.includes(currQuery)) {
                ingredTracker[q] = 'yes'
              }
            }
          }
          if (ingredTracker.length === queries.length) {
            if (!(ingredTracker.includes(undefined))) {
              result.push(currRecipe)
            }
          }
        }
        return result
      })
      .then(result => {
        if (result.length === 0) {
          $('.bad-messaging').text('Sorry! No recipes matched your search. Try a different ingredient.')
        } else {
          ui.getYourRecipesSuccess(result)
        }
      })
      .catch(ui.getYourRecipeFailure)
  } else {
    api.getRecipes()
      .then(data => {
        const result = []
        const recipes = data.recipes
        for (let i = 0; i < recipes.length; i++) {
          const currRecipe = recipes[i]
          for (let z = 0; z < currRecipe.ingredients.length; z++) {
            const currIngred = currRecipe.ingredients[z].toUpperCase()
            if (currIngred.includes(searchQuery)) {
              result.push(currRecipe)
              break
            }
          }
        }
        return result
      })
      .then(result => {
        if (result.length === 0) {
          $('.bad-messaging').text('Sorry! No recipes matched your search. Try a different ingredient.')
        } else {
          ui.getYourRecipesSuccess(result)
        }
      })
      .catch(ui.getYourRecipesFailure)
  }
}

const onSearchByTitle = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  const searchQuery = formData.ingredients.toUpperCase()
  api.getRecipes()
    .then(data => {
      const result = []
      const recipes = data.recipes
      for (let i = 0; i < recipes.length; i++) {
        const currTitle = recipes[i].title.toUpperCase()
        if (currTitle.includes(searchQuery)) {
          result.push(recipes[i])
        }
      }
      return result
    })
    .then(result => {
      if (result.length === 0) {
        $('.bad-messaging').text('Sorry! No recipes matched your search. Try a different ingredient.')
      } else {
        ui.getYourRecipesSuccess(result)
      }
    })
    .catch(ui.getYourRecipesFailure)
}

const onDeleteRecipe = event => {
  const id = $('#delete-confirmation-modal').data('id')
  $('#delete-confirmation-modal').data('id', '')
  api.deleteRecipe(id)
    .then(() => {
      onGetYourRecipes()
    })
    .catch(ui.deleteRecipeFailure)
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
  onGetYourRecipes,
  promptDeleteConfirmation,
  onDifficultySearch,
  onMealSearch,
  onSearchByIngredients,
  onSearchByTitle
}
