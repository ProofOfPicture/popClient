import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Camera from './Camera'

export default class App extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
        <Camera />
      </View>
    )
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
