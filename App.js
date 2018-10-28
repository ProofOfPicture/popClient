import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  WebView
} from 'react-native'
import Camera from './Camera'
import Row from './Row'
import store from './store'
import Header from './Header'
import Details from './Details'

const add = require('./add.png')
const search = require('./search.png')
const close = require('./close.png')

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
        <View style={[styles.container2, styles.horizontal]}>
          <ActivityIndicator size='large' color='blue' />
        </View>
      )
    }

    if (this.state.view === 'list') {
      return (
        <View style={styles.container1}>
          <Header image={search} handler={this.noOp.bind(this)} />
          <View style={styles.container2}>

            <ScrollView style={{ marginTop: 0 }}>
              {store.getPhotos().map(photo => {
                return (
                  <Row key={photo.imgHash} imgTx={photo.imgTx} imgData={photo.imgData} imgText={photo.imgText} parent={this}
                    onPress={this.showDetails.bind(this)} imgHash={photo.imgHash} />
                )
              })}
            </ScrollView>
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity
                onPress={this.onPress.bind(this)}
                style={styles.capture}
              >
                <Image style={{ }} source={add} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{backgroundColor: 'black', height: 10}} />
        </View>
      )
    }

    if (this.state.view === 'details') {
      return (
        <View style={styles.container1}>
          <Header image={close} handler={this.showList.bind(this)} />
          {/* <View style={styles.containerDetails}> */}
          <Details parent={this} imgHash={this.state.imgHash} imgData={this.state.imgData} imgTx={this.state.imgTx} />
          {/* </View> */}
        </View>
      )
    }

    if (this.state.view === 'explorer') {
      const uri = `https://blockchair.com/bitcoin-cash/transaction/${this.state.imgTx}`
      return (
        <View style={styles.containerDetails}>
          <Header image={close} handler={this.showDetails2.bind(this)} />
          <WebView source={{uri}} />
        </View>
      )
    }

    return <Camera parent={this} />
  }

  noOp () {

  }

  async onPress () {
    this.setState({
      view: 'camera'
    })
  }

  async showDetails (imgHash, imgData, imgTx) {
    this.setState({
      view: 'details',
      imgHash,
      imgData,
      imgTx
    })
  }

  async showDetails2 () {
    this.setState({
      view: 'details'
    })
  }

  async deletePicture () {
    await store.removePhoto(this.state.imgHash)
    this.setState({
      view: 'list'
    })
  }

  showList () {
    this.setState({
      view: 'list'
    })
  }
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  container2: {
    borderRadius: 5,
    flex: 1,
    margin: 10,
    flexDirection: 'column',
    backgroundColor: 'white'
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
    // borderRadius: 0,
    paddingTop: 10,
    paddingLeft: 0,
    // paddingHorizontal: 20,
    // alignSelf: 'center',
    margin: 0
  },
  containerDetails: {
    justifyContent: 'flex-start',
    flex: 1
  }
})
