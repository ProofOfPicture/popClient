import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
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
      this.props.parent.setState({
        view: 'loading'
      })

      const options = { quality: 0.5, base64: true }
      const data = await this.camera.takePictureAsync(options)

      const buffer = Buffer.from(data.base64, 'base64').toString('hex')

      store.addPhoto({
        imgHash: store.sha256(buffer).toString(),
        imgText: data.uri,
        imgData: data.base64,
        imgType: data.uri
      })
      setTimeout(() => {
        this.props.parent.setState({
          view: 'list'
        })
      }, 2000)
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
