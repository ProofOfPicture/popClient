import { AsyncStorage } from 'react-native'
const SHA256 = require('crypto-js/sha256')

let state = {
  photos: []
}

async function saveState () {
  await AsyncStorage.setItem('STATE', JSON.stringify(state))
}

async function loadState () {
  // await AsyncStorage.removeItem('STATE')
  const s = await AsyncStorage.getItem('STATE')
  if (s) {
    state = JSON.parse(s)
    console.log(JSON.stringify(s, null, 2))
  }
}

function getPhotos () {
  return state.photos
}

function getPhoto (imgHash) {
  return state.photos.filter(photo => photo.imgHash === imgHash)
}

async function addPhoto (photoData) {
  state.photos.push(photoData)
  await saveState()
}

function sha256 (buffer) {
  return SHA256(buffer)
}

module.exports = {
  getPhotos,
  addPhoto,
  loadState,
  sha256,
  view: 'list'
}
