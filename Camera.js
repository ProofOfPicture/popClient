import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  CameraRoll
} from 'react-native'
import { RNCamera } from 'react-native-camera'
import { Buffer } from 'buffer'
import store from './store'
import Header from './Header'

const close = require('./close.png')

export default class Camera extends Component {
  onPress () {
    this.props.parent.setState({
      view: 'list'
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Header image={close} handler={this.onPress.bind(this)} />

        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          base64
          style={styles.preview}
          forceUpOrientation
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}
          >
            <Text style={{ fontSize: 14 }}> PoP it </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  async takePicture () {
    if (this.camera) {
      try {
        const options = { quality: 0.5, base64: true }
        const data = await this.camera.takePictureAsync(options)

        await CameraRoll.saveToCameraRoll(data.uri, 'photo')

        this.props.parent.setState({
          view: 'loading'
        })

        const buffer = Buffer.from(data.base64, 'base64').toString('hex')

        const imgHash = store.sha256(buffer).toString()

        const response = await window.fetch('http://seed1.hashzilla.io:5000/broadcast', {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: {
            pictureHash: imgHash,
            cashAddress: store.wallet.cashAddress,
            exPriv: store.wallet.exPriv
          }
        })

        const imgTx = await response.json()

        store.addPhoto({
          imgTx,
          imgHash,
          imgText: data.uri,
          imgData: data.base64,
          imgType: data.uri
        })

        this.props.parent.setState({
          view: 'list'
        })
      } catch (err) {
        console.error(err)
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
})
