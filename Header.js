import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Image
  // StatusBar
} from 'react-native'

const logo = require('./logo_wt.png')

export default class Header extends Component {
  onPress () {
    this.props.handler()
  }

  render () {
    // StatusBar.setBarStyle('light-content', true)
    return (
      <View style={{
        flex: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingTop: 20
      }}>
        <Image style={{
          marginLeft: 10,
          marginTop: 15,
          height: 65,
          width: 195
        }} source={logo} />
        <TouchableOpacity
          onPress={this.onPress.bind(this)}
          style={{
            borderRadius: 0,
            paddingTop: 30,
            paddingRight: 20,
            margin: 0
          }}
        >
          <Image style={{ width: 40, height: 40, backgroundColor: 'white' }} source={this.props.image} />
        </TouchableOpacity>
      </View>
    )
  }
}
