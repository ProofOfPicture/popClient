import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ScrollView
} from 'react-native'
import Camera from './Camera'
import Row from './Row'
import store from './store'
import Header from './Header'

const add = require('./add.png')

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      view: 'loading'
    }
  }

  componentDidMount () {
    store.loadState().then(() => {
      this.setState({
        view: 'list'
      })
    })
  }

  render () {
    if (this.state.view === 'loading') {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size='large' color='blue' />
        </View>
      )
    }

    if (this.state.view === 'list') {
      return (
        <View style={styles.container}>
          <Header image={add} handler={this.onPress.bind(this)} />

          <ScrollView style={{ marginTop: 0 }}>
            {store.getPhotos().map(photo => {
              return (
                <Row key={photo.imgHash} imgData={photo.imgData} imgText={photo.imgText} />
              )
            })}
          </ScrollView>
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
  container2: {
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    paddingTop: 60
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  capture: {
    // flex: 0,
    borderRadius: 0,
    paddingTop: 30,
    paddingLeft: 40,
    // paddingHorizontal: 20,
    // alignSelf: 'center',
    margin: 0
  }
})
