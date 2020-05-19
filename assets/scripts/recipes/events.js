'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')
const getOneRecipeTemplate = require('../templates/get-one-recipe.handlebars')

// for when user clicks "Show full" button on recipe preview
const showFullRecipe = event => {
  const target = event.target
  // grab recipe ID from event target
  const id = $(target).data('id')
  // find the recipe
  api.findOneRecipe(id)
    // if we find it
    .then(recipe => {
      // push the info to the handlebars template for one full recipe
      const getOneRecipeHtml = getOneRecipeTemplate({recipe: recipe})
      // show it in the recipes div
      $('.recipes').html(getOneRecipeHtml)
      return recipe
    })
    .then(recipe => {
      // look at the recipe's author. is it the current user?
      if (recipe.recipe.author === store.user._id) {
        // if so, show Update & Delete buttons, hide ability to comment/rate
        $(`section[data-id='${id}'] > .hidden-buttons`).show()
        $(`.comment-form-sect[data-id='${id}']`).css('visibility', 'hidden')
      }
    })
    // if not, handle error
    .catch(ui.findOneRecipeFailure)
}

// Get only the current user's recipes
const onGetYourRecipes = event => {
  // eventually will hold all of current user's recipes
  const yourRecipes = []
  // current user's id
  const you = store.user._id
  // get all recipes on database
  api.getRecipes()
    .then(data => {
      // if that goes fine, loop through recipe data
      const recipes = data.recipes
      for (let i = 0; i < recipes.length; i++) {
        // if the author of the current recipe in the loop is the current user, add it to yourRecipes
        if (recipes[i].author === you) {
          yourRecipes.push(recipes[i])
        }
      }
      // this should be an array of the current user's recipes
      return yourRecipes
    })
    // this displays the recipes onscreen
    .then(ui.getYourRecipesSuccess)
    // handles error
    .catch(ui.getYourRecipesFailure)
}

// enables 'Update Recipe' modal to pop up when Update button is clicked
const showUpdateRecipe = event => {
  // saves ID of recipe
  const id = $(event.target).data('id')
  $('#update-recipe-modal').modal('show')
  // saves ID to modal temporarily so it can be accessed
  $('#update-recipe-modal').data('id', id)
}

// when a recipe is updated
const onUpdateRecipe = event => {
  event.preventDefault()
  // grabs id to find correct recipe
  const id = $('#update-recipe-modal').data('id')
  // sets event target ID to ID for later use in showFullRecipe
  $(event.target).data('id', id)
  // sets modal's ID back to zero
  $('#update-recipe-modal').data('id', '')
  const form = event.target
  const formData = getFormFields(form)
  // splits ingredients and steps by newline
  formData.recipe.ingredients = formData.recipe.ingredients.split('\n')
  formData.recipe.steps = formData.recipe.steps.split('\n')
  // stores author
  formData.recipe.author = store.user._id
  // finds recipe by ID
  api.findOneRecipe(id)
    .then(recipe => {
      // loop through keys of recipe
      for (const key in formData.recipe) {
        // if there is an empty field in formData, replace it with previous data
        const formVal = formData.recipe[key]
        if (!formVal) {
          formData.recipe[key] = recipe.recipe[key]
          // same, but if it's an empty array
        } else if (Array.isArray(formVal)) {
          if (formVal.every(item => item === '')) {
            formData.recipe[key] = recipe.recipe[key]
          }
        }
      }
      // this allows a user to only update parts of a recipe and have the update still be valid
      // return the data
      return formData
    })
    // pass the data to the API to update the function
    .then(newRecipe => api.updateRecipe(newRecipe, id))
    // inform the user that the update succeeded
    .then(ui.updateRecipeSuccess)
    // reload the recipe on ths page, displaying the updates
    // we need to save ID to event.target so that we can pass the event to showFullRecipe
    .then(() => showFullRecipe(event))
    // catch any errors
    .catch(ui.updateRecipeFailure)
}

// get all recipes
const onGetRecipes = event => {
  // make the request to the API
  api.getRecipes()
    // if successful, display recipes
    .then(ui.getRecipesSuccess)
    // catch any errors
    .catch(ui.getRecipesFailure)
}

// search recipes by difficulty level
const onDifficultySearch = event => {
  // keyword will eventually be the difficulty we're searching for
  let keyword
  // this will be the recipes that match that keyword
  const resultRec = []
  // clicking on 'easy' triggers this, and that has the class 'easy'
  // if the event contains this class, the keyword we'll be searching for is 'Easy'
  // same logic w mod and diff
  if ($(event.target).hasClass('easy')) {
    keyword = 'Easy'
  } else if ($(event.target).hasClass('mod')) {
    keyword = 'Moderate'
  } else {
    keyword = 'Difficult'
  }
  // get all recipes
  api.getRecipes()
    .then(data => {
      // loop through all recipes
      const recipes = data.recipes
      for (let i = 0; i < recipes.length; i++) {
        // check difficulty, if it matches, add to result
        if (recipes[i].difficulty === keyword) {
          resultRec.push(recipes[i])
        }
      }
      // return all recipes with the identified difficulty
      return resultRec
    })
    .then(recipes => {
      // if search came up blank, notify the user
      if (recipes.length === 0) {
        $('#messaging-modal').modal('show')
        $('.messaging').text('Sorry! No recipes matched your search. Try a different difficulty level.')
      // if not, display recipes that match the search
      } else {
        ui.getYourRecipesSuccess(recipes)
      }
    })
    // handle any errors
    .catch(ui.getRecipesFailure)
}

// search recipes by meal type
const onMealSearch = event => {
  // same logic as onDifficultySearch, we set keyword by which meal type the user clicked
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
  // get all recipes
  api.getRecipes()
    // loop through recipes, check meal type key for a match
    // if there's a match, add to result array
    .then(data => {
      const recipes = data.recipes
      for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].meal === keyword) {
          resultRec.push(recipes[i])
        }
      }
      // return all recipes that match that meal type
      return resultRec
    })
    .then(recipes => {
      // if search came up blank, notify the user
      if (recipes.length === 0) {
        $('#messaging-modal').modal('show')
        $('.messaging').text('Sorry! No recipes matched your search. Try a different meal type.')
      }
      // if not, display results of search
      ui.getYourRecipesSuccess(recipes)
    })
    // catch any errors
    .catch(ui.getRecipesFailure)
}

// search by ingredients
// search designed to accept any number of ingredients separated by spaces
// not case sensitive
const onSearchByIngredients = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  // normalizes search query data by making it all caps
  const searchQuery = formData.ingredients.toUpperCase()
  // returns array of all input ingredients
  const queries = searchQuery.split(' ')
  // get all recipes
  api.getRecipes()
    .then(data => {
      // loop through all recipes
      const recipes = data.recipes
      // this array will be resulting recipes that match the search
      const result = []
      for (let i = 0; i < recipes.length; i++) {
        const currRecipe = recipes[i]
        // this array will keep track of whether a recipe has all ingredients specified in the search
        const ingredTracker = []
        // loop through ingredients of current recipe
        for (let z = 0; z < currRecipe.ingredients.length; z++) {
          // normalize ingredient name by upper casing it
          const currIngred = currRecipe.ingredients[z].toUpperCase()
          // loop through array of ingredients input into the search
          for (let q = 0; q < queries.length; q++) {
            const currQuery = queries[q]
            // check to see if the current ingredient includes any part of the current query
            if (currIngred.includes(currQuery)) {
              // if so, pass 'true' to the ingredTracker in the same index as it is in the query
              // this is done to prevent similarly named ingredients from being counted twice
              // for ex: if a recipe contained both 'butter' and 'peanut butter', the search for 'butter' would count twice
              // so a search for 'butter and cheese' would give 2 trues even though a recipe may not have both ingredients
              // with this logic, 'peanut butter' and 'butter' would just both make ingredTracker[0] true, not counting twice
              ingredTracker[q] = true
            }
          }
        }
        // if the tracker has the same length as the search queries array...
        if (ingredTracker.length === queries.length) {
          // ...and none of those indices are blank
          if (!(ingredTracker.includes(undefined))) {
            // the recipe qualifies,add it
            result.push(currRecipe)
          }
        }
      }
      // return array of recipes
      return result
    })
    .then(result => {
      // clear the inputs
      $('.ingred-search').val('')
      // if search came up blank, notify user
      if (result.length === 0) {
        $('#messaging-modal').modal('show')
        $('.messaging').text('Sorry! No recipes matched your search. Try a different ingredient.')
      // if not, display search results
      } else {
        ui.getYourRecipesSuccess(result)
      }
    })
    // catch any errors
    .catch(ui.getYourRecipeFailure)
}

const onSearchByTitle = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  // pretty much the same logic as onSearchByIngredients
  const searchQuery = formData.title.toUpperCase()
  const queries = searchQuery.split(' ')
  api.getRecipes()
    .then(data => {
      const recipes = data.recipes
      const result = []
      // loop through all recipes
      for (let i = 0; i < recipes.length; i++) {
        const currRecipe = recipes[i]
        const titleTracker = []
        // create an array of the words in the title of the current recipe
        const titleWords = currRecipe.title.split(' ')
        // loop through title words
        for (let z = 0; z < titleWords.length; z++) {
          const currTitleWord = titleWords[z].toUpperCase()
          // if the title word matches one of the queries, mark it in the titleTracker
          // same logic as onSearchByIngredients
          for (let q = 0; q < queries.length; q++) {
            const currQuery = queries[q]
            if (currTitleWord.includes(currQuery)) {
              titleTracker[q] = true
            }
          }
        }
        // check titleTracker to see if it has the same length as queries
        if (titleTracker.length === queries.length) {
          // check that no indices are empty
          if (!(titleTracker.includes(undefined))) {
            // this recipe qualifies, add it
            result.push(currRecipe)
          }
        }
      }
      return result
    })
    .then(result => {
      // clear input values
      $('.title-search').val('')
      // if search comes up blank, notify the user
      if (result.length === 0) {
        $('#messaging-modal').modal('show')
        $('.messaging').text('Sorry! No recipes matched your search. Try a different title.')
      // if not, display results
      } else {
        ui.getYourRecipesSuccess(result)
      }
    })
    // handle any errors
    .catch(ui.getYourRecipeFailure)
}

// if a user tries to delete a recipe, confirm they actually want to do this
const promptDeleteConfirmation = event => {
  // grab ID from clicked recipe to temporarily store on the modal
  const id = $(event.target).data('id')
  // show modal, add ID to modal to confirm deletion
  $('#delete-confirmation-modal').modal('show')
  $('#delete-confirmation-modal').data('id', id)
}

// if a user confirms deletion of a recipe
const onDeleteRecipe = event => {
  // get the ID from the modal that we stored earlier
  const id = $('#delete-confirmation-modal').data('id')
  // clear the ID now that we have it
  $('#delete-confirmation-modal').data('id', '')
  // delete recipe by ID
  api.deleteRecipe(id)
    .then(() => {
      // close the modal
      $('#delete-confirmation-modal').modal('hide')
      // reload all recipes on the page
      onGetRecipes()
    })
    // catch any errors
    .catch(ui.deleteRecipeFailure)
}

// when a user posts a recipe
const onPostRecipe = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  // get array of ingredients and steps by splitting by newline
  formData.recipe.ingredients = formData.recipe.ingredients.split('\n')
  formData.recipe.steps = formData.recipe.steps.split('\n')
  // set author as current user
  formData.recipe.author = store.user._id
  // post reipe using data
  api.postRecipe(formData)
    // if successful, inform the user
    .then(ui.postRecipeSuccess)
    // reload all recipes on the page
    .then(() => {
      onGetRecipes()
    })
    // handle any errors
    .catch(ui.postRecipeFailure)
}

// when a user creates a comment
const onCreateComment = event => {
  event.preventDefault()
  const form = event.target
  // grab recipe ID from event target
  const id = $(event.target).data('id')
  const formData = getFormFields(form)
  // make a comment using the form data on the recipe with ID 'id'
  api.createComment(id, formData)
    // inform the user of success
    .then(ui.createCommentSuccess)
    // show recipe updated with comment
    .then(() => {
      showFullRecipe(event)
    })
    // handle any errors
    .catch(ui.createCommentFailure)
}

// when a user clicks a star on the rating section
// this DOES NOT submit rating, just preps rating for submittal
const onChooseStar = event => {
  // get rating based on star clicked
  // for ex. if user clicked the third star, data-id would be '3'
  const rating = $(event.target).data('id')
  // loop five times (number of stars)
  for (let i = 1; i <= 5; i++) {
    // clear all stars, &#9734; displays an outline of a star
    // if we don't do this, if a user clicks a high rating and then immediately makes it a lower one,
    // the UI won't update with the proper filled in stars
    $(`span[data-id=${i}]`).html(`&#9734;`)
  }
  // loop through stars up until rating
  for (let i = 1; i <= rating; i++) {
    // fill in stars corresponding to rating. &#9733; is filled in star
    // this gives the user a visual cue of what their rating is
    // for ex. the UI will display three filled in stars if the user clicks the third
    $(`span[data-id=${i}]`).html(`&#9733;`)
  }
  // passes rating value to invisible input, so user can submit rating
  $('.rating-input').val(`${rating}`)
}

// on rating submittal
const onRatingSubmit = event => {
  event.preventDefault()
  // store ID
  const id = $(event.target).data('id')
  const form = event.target
  const formData = getFormFields(form)
  // if the rating exists, proceed
  if (formData.rating) {
    // post rating to the current recipe
    api.postRating(id, formData.rating)
      // if it's a success, inform the user
      .then(ui.postRatingSuccess)
      // reload the current recipe, updating the rating average
      .then(() => {
        showFullRecipe(event)
      })
      // catch any errors
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
