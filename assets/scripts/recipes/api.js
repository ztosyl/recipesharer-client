'use strict'

const store = require('../store')
const config = require('../config')

const findOneRecipe = id => {
  return $.ajax({
    url: config.apiUrl + '/recipes/' + id,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

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

const getRecipes = () => {
  return $.ajax({
    url: config.apiUrl + '/recipes',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

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

const deleteRecipe = id => {
  return $.ajax({
    url: config.apiUrl + '/recipes/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

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
