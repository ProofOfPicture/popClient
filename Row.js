import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight
} from 'react-native'

export default class Row extends Component {
  render () {
    const uri = `data:image/jpeg;base64,${this.props.imgData}`
    return (
      <TouchableHighlight onPress={() => this.props.onPress(this.props.imgHash, this.props.imgData)}>
        <View style={styles.row}>
          <Image
            style={{
              width: 50,
              height: 50,
              resizeMode: 'contain'
            }}

            source={{
              uri
            }}
          />
          <Text style={{
            paddingLeft: 10,
            height: 60,
            textAlignVertical: 'center'
          }}>
            {this.props.imgText}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    height: 60,
    padding: 10,
    fontSize: 20,
    flexDirection: 'row'
  }
})
