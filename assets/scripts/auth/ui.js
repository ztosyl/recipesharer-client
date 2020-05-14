'use strict'

const store = require('../store')

const signUpSuccess = data => {
  console.log('Sign up has succeeed. Data is: ' + data)
  $('.messaging').text('Sign up a success!')
}

const signUpFailure = error => {
  console.log('Sign up has failed. Error is + ' + error)
  $('.messaging').text('Sign up has failed.')
}

const signInSuccess = data => {
  console.log('Sign in has succeeed. Data is: ' + data)
  store.user = data.user
  $('.messaging').text('Sign in a success!')
  $('.unauthorized').hide()
  $('.authorized').show()
}

const signInFailure = error => {
  console.log('Sign in has failed. Error is + ' + error)
  $('.messaging').text('Sign in has failed.')
}

const changePasswordSuccess = data => {
  console.log('Password change successful. Data is: ' + data)
  $('.messaging').text('Password change successful!')
}

const changePasswordFailure = error => {
  console.log('Password change failed. Error is + ' + error)
  $('.messaging').text('Password change failed.')
}

const signOutSuccess = data => {
  console.log('Sign out has succeeed. Data is: ' + data)
  store.user = null
  $('.messaging').text('Sign out a success!')
  $('.unauthorized').show()
  $('.authorized').hide()
}

const signOutFailure = error => {
  console.log('Sign out has failed. Error is + ' + error)
  $('.messaging').text('Sign out has failed.')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
