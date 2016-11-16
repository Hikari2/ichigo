/* global require */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class NavigationBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container} elevation={5} >
        <View style={styles.leftContainer}>
          <Icon.Button
            name='navicon'
            underlayColor='#848482'
            style={styles.menuButton}
            iconStyle={styles.menuButtonIcon}
            onPress={() => {
              Actions.refresh({key: 'drawer', open: value => !value })
            }}
          />
        </View>
        <View style={styles.rightContainer}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FFFFFF',
    position: 'absolute', top: 0, left: 0, right: 0
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logoImage: {
    height: 50,
    width: 50
  },
  menuButton: {
    padding: 10,
    borderRadius: 0,
    backgroundColor: '#D4D4D2'
  },
  menuButtonIcon: {
    marginRight: 0,
    color: '#FFFFFF'
  }
})
