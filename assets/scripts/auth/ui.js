'use strict'

const store = require('../store')

const modalSwitch = function () {
  $('#sign-up-modal').modal('hide')
  $('#sign-in-modal').modal('show')
  $('.messaging').text('')
}

const signUpSuccess = data => {
  $('.sign-up-input').val('')
  $('.messaging').text('Thanks! You will now be redirected to sign-in.').css('color', 'green')
  setTimeout(modalSwitch, 1000)
}

const signUpFailure = () => {
  $('.messaging').text('Sign up has failed. Try again.')
}

const signInSuccess = data => {
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
  $('.messaging').text('Password change failed. Please try again.')
}

const signOutSuccess = data => {
  store.user = null
  $('.unauthorized').show()
  $('.authorized').hide()
  $('.recipes').html('')
}

const signOutFailure = () => {
  $('.messaging').text('Sign out has failed.').css('color', 'red')
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
