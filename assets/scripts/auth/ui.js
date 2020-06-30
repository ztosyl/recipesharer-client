'use strict'

const store = require('../store')

// if sign up succeeds
const signUpSuccess = data => {
  // clear sign-up input values
  $('.sign-up-input').val('')
  // close sign-up modal
  $('#sign-up-modal').modal('hide')
  // show messaging modal, let user know they will be redirected to sign-in
  $('#messaging-modal').modal('show')
  $('.messaging').text('Thanks! You will now be redirected to sign-in.')
  // redirect to sign-in modal
  setTimeout(() => {
    $('#messaging-modal').modal('hide')
    $('.messaging').text('')
    $('#sign-in-modal').modal('show')
  }, 1500)
}

// if sign up fails
const signUpFailure = () => {
  // clear sign-up input values
  $('.sign-up-input').val('')
  // show messaging modal, let user know sign up has failed
  $('#messaging-modal').modal('show')
  $('.messaging').text('Sign up has failed. Please try again.')
}

// if sign in succeeds
const signInSuccess = data => {
  // store current user
  store.user = data.user
  // clear sign-in input values
  $('.sign-in-input').val('')
  // close sign-in modal
  $('#sign-in-modal').modal('hide')
  // hide unauthorized sections, show authorized sections
  $('.unauthorized').hide()
  $('.authorized').show()
  // these are hidden using 'visibility' so navbar keeps its shape
  $('.navbar-authorized').css('visibility', 'visible')
  // let user know sign-in was successful
  $('#messaging-modal').modal('show')
  $('.messaging').text('Sign in successful!')
}

// if sign-in fails
const signInFailure = () => {
  // clear sign-in input values
  $('.sign-in-input').val('')
  // let user know sign-in failed
  $('#messaging-modal').modal('show')
  $('.messaging').text('Sign in failed. Please try again.')
}

// if change password succeeds
const changePasswordSuccess = data => {
  // clear change-password input values
  $('.change-password-input').val('')
  // let user know change-password suceeded
  $('#messaging-modal').modal('show')
  $('.messaging').text('Password change successful!')
}

// if change password fails
const changePasswordFailure = () => {
  // clear change-password input values
  $('.change-password-input').val('')
  // let user know change-password failed
  $('#messaging-modal').modal('show')
  $('.messaging').text('Password change failed. Please try again.')
}
const changePasswordFailureGuest = () => {
  // clear change-password input values
  $('.change-password-input').val('')
  // let user know you cannot change the guest pword
  $('#messaging-modal').modal('show')
  $('.messaging').text('You cannot change the password of the guest account.')
}

// if sign out succeeds
const signOutSuccess = data => {
  // clear the store.user
  store.user = null
  // hide authorized content, show unauthorized content
  $('.unauthorized').show()
  $('.authorized').hide()
  $('.navbar-authorized').css('visibility', 'hidden')
  // revert back to intro text in .recipes
  $('.recipes').html(`<section class="opener col-11">Stuck at home with nothing to do? Of course you are! <br> <br>
    Welcome to <span class=title-font>&#10084;Share-a-Recipe&#10084;</span>, where you can find recipes to make your wildest culinary dreams come true! (Or at least find a new way to pass the time.) <br> <br>
    To get started on this epicurean adventure, sign in above to see recipes posted by users from anywhere, and post and edit your own!
  </section>`)
  // let user know sign-out succeeded
  $('#messaging-modal').modal('show')
  $('.messaging').text('Sign out successful!')
}

// if sign-out fails
const signOutFailure = () => {
  // let user know sign-out failed
  $('#messaging-modal').modal('show')
  $('.messaging').text('Sign out failed. Please try again.')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  changePasswordFailureGuest,
  signOutSuccess,
  signOutFailure
}
