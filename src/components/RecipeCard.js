import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'

export default class RecipeCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const src = this.props.image ? {uri: this.props.image} : require('../assets/placeholder.png')
    return (
      <View style={styles.container}>
        <Image source={src} style={{height: this.props.height, width: this.props.width}} resizeMode={'cover'}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{this.props.title}</Text>
          </View>
        </Image>
      </View>
    )
  }
}

RecipeCard.propTypes = {
  title: React.PropTypes.string,
  image: React.PropTypes.string,
  height: React.PropTypes.number,
  width: React.PropTypes.number
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'gray'
  },
  textContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.15)'
  },
  title: {
    position: 'absolute',
    left: 15,
    bottom: 10,
    fontSize: 26,
    fontWeight: '600',
    color: 'white'
  }
})
