// check if there are comments
'use strict'

const isComment = array => {
  // if array is undefined or empty, no comments
  if (!array || array.length === 0) {
    return false
  // if not, we have comments!
  } else {
    return true
  }
}

module.exports = isComment
