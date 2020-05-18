'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')
// const updateRecipeTemplate = require('../templates/update-recipe-form.handlebars')
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
        $(`.comment-form-sect[data-id='${id}']`).css('visibility', 'hidden')
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
      for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].author === you) {
          yourRecipes.push(recipes[i])
        }
      }
      return yourRecipes
    })
    .then(ui.getYourRecipesSuccess)
    .catch(ui.getYourRecipesFailure)
}

const showUpdateRecipe = event => {
  const id = $(event.target).data('id')
  $('#update-recipe-modal').modal('show')
  $('#update-recipe-modal').data('id', id)
}

const onUpdateRecipe = event => {
  event.preventDefault()
  const id = $('#update-recipe-modal').data('id')
  $(event.target).data('id', id)
  $('#update-recipe-modal').data('id', '')
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
    .then(() => showFullRecipe(event))
    .catch(ui.updateRecipeFailure)
}

const onGetRecipes = event => {
  api.getRecipes()
    .then(ui.getRecipesSuccess)
    .catch(ui.getRecipesFailure)
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
        $('.ingred-search').val('')
        if (result.length === 0) {
          $('#messaging-modal').modal('show')
          $('.messaging').text('Sorry! No recipes matched your search. Try a different ingredient.')
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
        $('.ingred-search').val('')
        if (result.length === 0) {
          $('#messaging-modal').modal('show')
          $('.messaging').text('Sorry! No recipes matched your search. Try a different ingredient.')
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
  const searchQuery = formData.title.toUpperCase()
  if (searchQuery.includes(' ')) {
    const queries = searchQuery.split(' ')
    api.getRecipes()
      .then(data => {
        const recipes = data.recipes
        const result = []
        for (let i = 0; i < recipes.length; i++) {
          const currRecipe = recipes[i]
          const titleTracker = []
          const titleWords = currRecipe.title.split(' ')
          for (let z = 0; z < titleWords.length; z++) {
            const currTitleWord = titleWords[z].toUpperCase()
            for (let q = 0; q < queries.length; q++) {
              const currQuery = queries[q]
              if (currTitleWord.includes(currQuery)) {
                titleTracker[q] = 'yes'
              }
            }
          }
          if (titleTracker.length === queries.length) {
            if (!(titleTracker.includes(undefined))) {
              result.push(currRecipe)
            }
          }
        }
        return result
      })
      .then(result => {
        $('.title-search').val('')
        if (result.length === 0) {
          $('#messaging-modal').modal('show')
          $('.messaging').text('Sorry! No recipes matched your search. Try a different ingredient.')
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
          const titleWords = currRecipe.title.split(' ')
          for (let z = 0; z < titleWords.length; z++) {
            const currTitleWord = titleWords[z].toUpperCase()
            if (currTitleWord.includes(searchQuery)) {
              result.push(currRecipe)
              break
            }
          }
        }
        return result
      })
      .then(result => {
        $('.title-search').val('')
        if (result.length === 0) {
          $('#messaging-modal').modal('show')
          $('.messaging').text('Sorry! No recipes matched your search. Try a different ingredient.')
        } else {
          ui.getYourRecipesSuccess(result)
        }
      })
      .catch(ui.getYourRecipesFailure)
  }
}

const promptDeleteConfirmation = event => {
  const id = $(event.target).data('id')
  $('#delete-confirmation-modal').modal('show')
  $('#delete-confirmation-modal').data('id', id)
}

const onDeleteRecipe = event => {
  const id = $('#delete-confirmation-modal').data('id')
  $('#delete-confirmation-modal').data('id', '')
  api.deleteRecipe(id)
    .then(() => {
      $('#delete-confirmation-modal').modal('hide')
      onGetYourRecipes(event)
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

const onCreateComment = event => {
  event.preventDefault()
  const form = event.target
  const id = $(event.target).data('id')
  const formData = getFormFields(form)
  console.log(formData)
  api.createComment(id, formData)
    .then(ui.createCommentSuccess)
    .then(() => {
      showFullRecipe(event)
    })
    .catch(ui.createCommentFailure)
}

const onChooseStar = event => {
  const rating = $(event.target).data('id')
  for (let i = 1; i <= 5; i++) {
    $(`span[data-id=${i}]`).html(`&#9734;`)
  }
  for (let i = 1; i <= rating; i++) {
    $(`span[data-id=${i}]`).html(`&#9733;`)
  }
  $('.rating-input').val(`${rating}`)
  console.log($('.rating-input').val())
}

const onRatingSubmit = event => {
  event.preventDefault()
  const id = $(event.target).data('id')
  const form = event.target
  const formData = getFormFields(form)
  console.log(formData)
  if (formData.rating) {
    api.postRating(id, formData.rating)
      .then(ui.postRatingSuccess)
      .then(() => {
        showFullRecipe(event)
      })
      .catch(ui.postRatingFailure)
  }
}

module.exports = {
  onGetRecipes,
  onPostRecipe,
  onDeleteRecipe,
  showUpdateRecipe,
  onUpdateRecipe,
  showFullRecipe,
  onGetYourRecipes,
  promptDeleteConfirmation,
  onDifficultySearch,
  onMealSearch,
  onSearchByIngredients,
  onSearchByTitle,
  onCreateComment,
  onChooseStar,
  onRatingSubmit
}
