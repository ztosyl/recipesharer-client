// This helper would be used in a .handlebars file
// with the syntax {{limit title 20}}
// calculates average of all the numbers in an array

'use strict'

const average = (numArray) => {
  if (!numArray) {
    return 'None.'
  } else if (numArray.length === 0) {
    return 'None.'
  } else {
    let sum = 0
    for (let i = 0; i < numArray.length; i++) {
      sum += numArray[i]
    }
    const avg = (sum / numArray.length)
    return Math.round(avg)
  }
}

module.exports = average
