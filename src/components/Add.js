import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image
} from 'react-native'

const images = [
  require('../assets/1.jpg'),
  require('../assets/2.jpg')
]

export default class Add extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const rand = Math.floor((Math.random() * 2))
    return (
      <View style={styles.container}>
        <View style={styles.pictureContainer}>
          <Image
            resizeMode='contain'
            source={images[rand]}
            style={[styles.picture, {width: this.props.width}]} />
        </View>
      </View>
    )
  }
}

Add.propTypes = {

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: '#b2b2b2'
  },
  pictureContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    flex: 1,
    height: 150
  }
})
