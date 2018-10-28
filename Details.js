import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native'

const remove = require('./remove.png')

export default class Details extends Component {
  show () {
    this.props.parent.setState({
      view: 'explorer'
    })
  }

  deletePicture () {
    this.props.parent.deletePicture()
  }

  render () {
    const uri = `data:image/jpeg;base64,${this.props.imgData}`

    return (
      <View>
        <Image
          style={{
            height: 350,
            width: null,
            resizeMode: 'contain',
            marginTop: 20
          }}
          source={{
            uri
          }}
        />
        <View style={styles.detailsRow}>
          <Text style={styles.detailsRowTitle}>Image Hash</Text>
          <Text style={styles.detailsRowHash}>{this.props.imgHash}></Text>
        </View>
        <TouchableOpacity onPress={this.show.bind(this)}>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsRowTitle}>TxHash</Text>
            <Text style={styles.detailsRowHash}>{this.props.imgTx}</Text>
          </View>
        </TouchableOpacity>

        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={this.deletePicture.bind(this)}
            style={styles.capture}
          >
            <Image source={remove} />
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  detailsRow: {
    margin: 10,
    height: 40
  },
  detailsRowTitle: {
    fontWeight: 'bold'
  },
  detailsRowHash: {
    fontSize: 9
  }
})
