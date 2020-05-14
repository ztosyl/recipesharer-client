'use strict'

const signUpSuccess = data => {
  console.log('Sign up has succeeed. Data is: ' + data)
  $('.messaging').text('Sign up a success!')
}

const signUpFailure = error => {
  console.log('Sign up has failed. Data is + ' + error)
  $('.messaging').text('Sign up has failed.')
}

const signInSuccess = data => {
  console.log('Sign in has succeeed. Data is: ' + data)
  $('.messaging').text('Sign in a success!')
  $('.unauthorized').hide()
  $('.authorized').show()
}

const signInFailure = error => {
  console.log('Sign up has failed. Data is + ' + error)
  $('.messaging').text('Sign in has failed.')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure
}
