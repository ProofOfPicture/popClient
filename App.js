import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import Camera from './Camera'
import store from './store'

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      view: 'list'
    }
  }

  render () {
    console.log(store.bitbox)
    if (this.state.view === 'list') {
      return (
        <View style={styles.container}>
          <ScrollView>
            {store.girls.map(g => {
              return (
                <Text style={styles.row} key={g}>{g}</Text>
              )
            })}
          </ScrollView>
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={this.onPress.bind(this)}
              style={styles.capture}
            >
              <Text style={{ fontSize: 14 }}> PoP it </Text>
            </TouchableOpacity>
          </View>
          {/* <Camera /> */}
        </View>
      )
    } else {
      return <Camera parent={this} />
    }
  }

  async onPress () {
    this.setState({
      view: 'camera'
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  row: {
    fontSize: 90
  },
  capture: {
    flex: 0,
    backgroundColor: '#ff0',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
})
