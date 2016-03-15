var assert = require('./utils/assert')
var data = require('./data/data')
var index = require('./utils/index')
//var countIf = require('./utils/countIf')
//var filter = require('./utils/filter')
//var map = require('./utils/map')
var expectedArrayOfArrays = require('./data/array-of-arrays')
var expectedFormattedDates = require('./data/formatted-dates')

function each (func, arr) {
  for (var i = 0; i < arr.length; i++) {
    func(arr[i])
  }
}

function getType (thing) {
return typeof thing
}

function isNumber (thing) {
  return Number.isInteger(thing)
}

function isStringNumber (str) {
str = Number(str)
if (!isNaN(str)) {
  return true
}
else return false
}

function toNumber (str) {
str = Number(str)
return str
}

function add (a, b) {
return (a+b)
}

function addStrings (a, b) {
return eval(a + "+" + b).toString()
}

function addStringsOrNumbers (a, b) {
if (typeof(a) === 'string' || typeof(b) === 'string') {
  a = a.toString()
  b = b.toString()
 return eval(a + "+" + b).toString()
}
else {
  return (a+b)
}

}

function isEmail (str) {
  if(str.includes('@')) {
    var idx = str.indexOf('@');
    if(str.includes('.', idx)) {
      return true;
    }
    else return false;
  }
  else return false;
}

function filterStringsWithCommas (str) {
  if(str.includes(',')) {
    return true;
    }
    else return false;
}


function splitStringByCommas (str) {
  return str.split(",");
}


// TESTS

var meaningOfLife = '42'

assert( getType(meaningOfLife), 'string', 'meaningOfLife is a string data type' )
assert( getType(data), 'object', 'data is an object!?' )

assert( isNumber(meaningOfLife), false, 'meaningOfLife is not a number datatype' )
assert( isStringNumber(meaningOfLife), true, 'we can convert meaningOfLife to number' )
assert( isStringNumber('jsksk'), false, 'isStringNumber does not give a false positive' )
assert( toNumber(meaningOfLife), 42, 'toNumber can convert strings to number if possible' )

assert( add(2, 3), 5, 'add() can add' )
assert( addStrings(meaningOfLife, '10'), '52', 'addStrings can add strings and convert them back to a string' )
assert( addStringsOrNumbers(2, 3), 5, 'addStringsOrNumbers can add numbers' )
assert( addStringsOrNumbers('1', '2'), '3', 'addStringsOrNumbers can add numbers' )
assert( addStringsOrNumbers('10', 10), '20', 'addStringsOrNumbers can add strings and numbers (returning a string)' )


var mixedArray = [1, '21', null, Date.now(), 5, meaningOfLife, 42]
var expectedNumberCount = 4 // why are there 4 expected number data-types?  What are they?
var expectedStringCount = 2
var numberCount = index.countIf(isNumber, mixedArray)
var stringCount = index.countIf(function (x) { return typeof x === 'string' }, mixedArray)

assert( numberCount, expectedNumberCount, 'countIf can count the numbers in an array' )
assert( stringCount, expectedStringCount, 'countIf can count the strings in an array' )

assert(isEmail('thedonald@makeamericagreatagain.com'), true, 'isEmail detects an email')
assert(isEmail('3333@'), false, 'isEmail does not give a false positive')
var emails = index.filter(isEmail, data)
assert( emails.length, 44, 'filter and isEmail returns the correct number of emails' )

var stringsWithCommas = index.filter(filterStringsWithCommas, data)
assert( stringsWithCommas.length, 62, 'filter and filterStringsWithCommas returns the correct number of commas' )


var arrayOfArrays = index.map(splitStringByCommas, stringsWithCommas)
var matchesArrayOfArrays = arrayOfArrays.every(function (arr, i) {
  return arr.every(function (str, j) {
    return str === expectedArrayOfArrays[i][j]
  })
})

assert( matchesArrayOfArrays, true, 'the generated array of array of strings matches the expected array' )


