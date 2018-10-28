import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native'

const logo = require('./logo.png')

export default class Header extends Component {
  onPress () {
    this.props.handler()
  }

  render () {
    StatusBar.setBarStyle('light-content', true)
    return (
      <View style={{
        flex: 0,
        flexDirection: 'row',
        backgroundColor: 'black',
        paddingTop: 20
      }}>
        <Image source={logo} />
        <TouchableOpacity
          onPress={this.onPress.bind(this)}
          style={{
            borderRadius: 0,
            paddingTop: 30,
            paddingLeft: 40,
            margin: 0
          }}
        >
          <Image style={{ width: 40, height: 40, backgroundColor: 'black' }} source={this.props.image} />
        </TouchableOpacity>
      </View>
    )
  }
}
