'use strict'

const store = require('../store')
const config = require('../config')

// get specific recipe from API by ID
const findOneRecipe = id => {
  return $.ajax({
    url: config.apiUrl + '/recipes/' + id,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// update recipe data to API using ID
const updateRecipe = (data, id) => {
  return $.ajax({
    url: config.apiUrl + '/recipes/' + id,
    method: 'PATCH',
    data: data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// get all recipes from API
const getRecipes = () => {
  return $.ajax({
    url: config.apiUrl + '/recipes',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// post recipe data to API
const postRecipe = data => {
  return $.ajax({
    url: config.apiUrl + '/recipes',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// delete recipe by ID from API
const deleteRecipe = id => {
  return $.ajax({
    url: config.apiUrl + '/recipes/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// create a new comment on a recipe by ID
const createComment = (id, data) => {
  return $.ajax({
    url: config.apiUrl + '/recipes/' + id + '/comments',
    method: 'PATCH',
    contentType: 'application/json',
    data: JSON.stringify(data),
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// post a rating to a recipe by ID
const postRating = (id, data) => {
  return $.ajax({
    url: config.apiUrl + '/recipes/' + id + '/ratings',
    method: 'PATCH',
    contentType: 'application/json',
    data: JSON.stringify(data),
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  getRecipes,
  postRecipe,
  deleteRecipe,
  findOneRecipe,
  updateRecipe,
  createComment,
  postRating
}
