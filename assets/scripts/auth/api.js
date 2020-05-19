'use strict'

const config = require('../config')
const store = require('../store')

// send sign up POST request data to /sign-up on API
const signUp = data => {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: data
  })
}

// send sign in POST request data to /sign-in on API
const signIn = data => {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data: data
  })
}

// send change password PATCH request to /change-password on API
const changePassword = data => {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    data: data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// send sign out DELETE request to /sign-out on API
const signOut = () => {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut
}
