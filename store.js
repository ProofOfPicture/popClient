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
  }

  if (!state.wallet) {
    try {
      const response = await window.fetch('http://seed1.hashzilla.io:5000/wallet', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })

      state.wallet = await response.json()
      await saveState()
    } catch (error) {
      console.error(error)
    }
  }

  console.log(`STATE: ${JSON.stringify(state.wallet, null, 2)}`)
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
