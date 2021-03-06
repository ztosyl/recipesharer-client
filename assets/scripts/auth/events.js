'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')

// switch from sign-up modal to sign-in modal
const modalSwitch = function () {
  $('#sign-up-modal').modal('hide')
  $('#sign-in-modal').modal('show')
}

// switch from sign-in modal to sign-up modal
const modalSwitchOtherWay = function () {
  $('#sign-in-modal').modal('hide')
  $('#sign-up-modal').modal('show')
}

// when user signs up
const onSignUp = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  // send sign-up info to API
  api.signUp(formData)
    // inform user on successful sign-up
    .then(ui.signUpSuccess)
    // catch any error
    .catch(ui.signUpFailure)
}

// when user signs in
const onSignIn = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  // send sign-in info to API
  api.signIn(formData)
    // inform user on successful sign-in
    .then(ui.signInSuccess)
    // catch any error
    .catch(ui.signInFailure)
}

// when user changes password
const onChangePassword = event => {
  event.preventDefault()
  if (store.user.email === 'guest@guest.com') {
    ui.changePasswordFailureGuest()
  } else {
    const form = event.target
    const formData = getFormFields(form)
    // send password update info to API
    api.changePassword(formData)
      // inform user on successful password update
      .then(ui.changePasswordSuccess)
      // catch any error
      .catch(ui.changePasswordFailure)
  }
}

// when user signs out
const onSignOut = event => {
  // send sign-out info to API
  api.signOut()
    // inform user on successful sign-out
    .then(ui.signOutSuccess)
    // catch any error
    .catch(ui.signOutFailure)
}

const onGuestLogin = event => {
  const data = {
    'credentials': {
      'email': 'guest@guest.com',
      'password': 'g'
    }
  }
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  modalSwitch,
  modalSwitchOtherWay,
  onGuestLogin
}
