// import { AsyncStorage } from 'react-native'
const SHA256 = require('crypto-js/sha256')
// let BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk').default
// let state = {}

// async function saveState () {
//   await AsyncStorage.setItem('STATE', JSON.stringify(state))
// }

// async function loadState () {
//   const s = await AsyncStorage.getItem('STATE')
//   state = JSON.parse(s)
// }

// async function addPhoto () {

// }
// function getPhotos () {
//   return state.photos
// }

function sha256 (buffer) {
  return SHA256(buffer)
}

module.exports = {
  sha256,
  girls: [
    'Debbie',
    'Francine',
    'Tessa',
    'Julia',
    'Helen',
    'Elly',
    'Jane',
    'Paula'
  ],

  // bitbox: new BITBOXSDK(),

  view: 'list'
}
