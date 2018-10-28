import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    View,
    Image
  } from 'react-native'
import Header from './Header'

const close = require('./close.png')

export default class Details extends Component {
    render () {
        const uri = `data:image/jpeg;base64,${this.props.imgData}`
        console.log(uri)
        return (
            <View>
                <Header image={close} handler={this.props.onPress.bind(this)} />
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

                <View style={styles.detailsRow}>
                    <Text style={styles.detailsRowTitle}>Image TimeStamp</Text>
                    <Text style={styles.detailsRowHash}>N/A</Text>
                </View>

                <View style={styles.detailsRow}>
                    <Text style={styles.detailsRowTitle}>TxHash</Text>
                    <Text style={styles.detailsRowHash}>N/A</Text>
                </View>
                <View style={styles.detailsRow}>
                    <Text style={styles.detailsRowTitle}>Tx Confirmations</Text>
                    <Text style={styles.detailsRowHash}>N/A</Text>
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
