'use strict'

const store = require('../store')

const signUpSuccess = data => {
  $('.sign-up-input').val('')
  $('#sign-up-modal').modal('hide')
  $('#messaging-modal').modal('show')
  $('.messaging').text('Thanks! You will now be redirected to sign-in.')
  setTimeout(() => {
    $('#messaging-modal').modal('hide')
    $('.messaging').text('')
    $('#sign-in-modal').modal('show')
  }, 1500)
}

const signUpFailure = () => {
  $('.sign-up-input').val('')
  $('.messaging').text('Sign up has failed. Please try again.')
}

const signInSuccess = data => {
  store.user = data.user
  $('.sign-in-input').val('')
  $('#sign-in-modal').modal('hide')
  $('.unauthorized').hide()
  $('.authorized').show()
  $('.navbar-authorized').css('visibility', 'visible')
  $('#messaging-modal').modal('show')
  $('.messaging').text('Sign in successful!')
}

const signInFailure = error => {
  console.log('Sign in has failed. Error is + ' + error)
  $('.sign-in-input').val('')
  $('.messaging').text('Sign in has failed.')
  $('#messaging-modal').modal('show')
  $('.messaging').text('Sign in failed. Please try again.')
}

const changePasswordSuccess = data => {
  $('.change-password-input').val('')
  $('#messaging-modal').modal('show')
  $('.messaging').text('Password change successful!')
}

const changePasswordFailure = () => {
  $('.change-password-input').val('')
  $('#messaging-modal').modal('show')
  $('.messaging').text('Password change failed. Please try again.')
}

const signOutSuccess = data => {
  store.user = null
  $('.unauthorized').show()
  $('.authorized').hide()
  $('.navbar-authorized').css('visibility', 'hidden')
  $('.recipes').html(`<section class="opener col-11">Stuck at home with nothing to do? Of course you are! <br> <br>
    Welcome to <span class=title-font>&#10084;Share-a-Recipe&#10084;</span>, where you can find recipes to make your wildest culinary dreams come true! (Or at least find a new way to pass the time.) <br> <br>
    To get started on this epicurean adventure, sign in above to see recipes posted by users from anywhere, and post and edit your own!
  </section>`)
  $('#messaging-modal').modal('show')
  $('.messaging').text('Sign out successful!')
}

const signOutFailure = () => {
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
  signOutSuccess,
  signOutFailure
}
