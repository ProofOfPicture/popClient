import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native'
import Camera from './Camera'
import Row from './Row'
import store from './store'
import Svg, { Image } from 'react-native-svg'

const logo = require('./logo.svg')

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
          <Svg width='80' height='80'>
            <Image href={logo} />
          </Svg>
          <ScrollView>
            {store.getPhotos().map(photo => {
              return (
                <Row key={photo.imgHash} imgData={photo.imgData} imgText={photo.imgText} />
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
    flex: 0,
    backgroundColor: '#ff0',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
})
