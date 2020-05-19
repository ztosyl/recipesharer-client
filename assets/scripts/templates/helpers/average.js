// calculates average of all the numbers in an numArray
// outputs that number of star icons

'use strict'

const average = (numArray) => {
  // if numArray is undefined, there are no ratings
  if (!numArray) {
    return 'None.'
  // if there is an array of ratings but it's empty, also no ratings
  } else if (numArray.length === 0) {
    return 'None.'
  // there are ratings, let's calculate the average
  } else {
    // this will eventually be divided by length
    let sum = 0
    // the string of stars we will eventually input into each recipe
    let starString = ''
    // figure out sum
    for (let i = 0; i < numArray.length; i++) {
      sum += numArray[i]
    }
    // calculate average rating
    const avg = (sum / numArray.length)
    // round it to nearest integer
    const roundAvg = Math.round(avg)
    // loop through the rounded average, add as many stars to the string as numbers in roundAvg
    for (let i = 0; i < roundAvg; i++) {
      starString += '★'
    }
    // return our stars!
    return starString
  }
}

module.exports = average
