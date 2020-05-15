'use strict'

const store = require('../store')
const authEvents = require('./events')

const signUpSuccess = data => {
  $('.sign-up-input').val('')
  $('.messaging').text('Thanks! You will now be redirected to sign-in.').css('color', 'green')
  setTimeout(authEvents.modalSwitch, 1000)
}

const signUpFailure = error => {
  console.log('Sign up has failed. Error is + ' + error)
  $('.messaging').text('Sign up has failed.')
}

const signInSuccess = data => {
  console.log('Sign in has succeeed. Data is: ' + data)
  store.user = data.user
  $('.messaging').text('Sign in a success!')
  $('.sign-in-input').val('')
  $('#sign-in-modal').modal('hide')
  $('.unauthorized').hide()
  $('.authorized').show()
}

const signInFailure = error => {
  console.log('Sign in has failed. Error is + ' + error)
  $('.sign-in-input').val('')
  $('.messaging').text('Sign in has failed.')
}

const changePasswordSuccess = data => {
  $('.change-password-input').val('')
  $('.messaging').text('Password change successful!')
}

const changePasswordFailure = () => {
  $('.change-password-input').val('')
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
