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
      <TouchableHighlight onPress={() => this.props.onPress(this.props.imgHash, this.props.imgData, this.props.imgTx)}>
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
          <View style={{
            flex: 1,
            paddingLeft: 10,
            height: 60,
            textAlignVertical: 'center'
          }}>
            <Text style={{fontSize: 9}}>
              {this.props.imgHash}
            </Text>
            <Text style={{fontSize: 9, fontWeight: 'bold'}}>
              {this.props.imgTx}
            </Text>

          </View>
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
    flexDirection: 'row'
  }
})
