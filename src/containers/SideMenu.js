import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { logout } from '../actions/auth'

class SideMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const drawer = this.context.drawer
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.pictureWrapper}>
            <Image source={{uri: this.props.profilePic}} style={styles.profilePic} />
          </View>
          <Text style={styles.displayName}>{this.props.displayName}</Text>
          <Text style={styles.email}>{this.props.email}</Text>
        </View>
        <View style={styles.optionsContainer}>
          <ScrollView>
            <Icon.Button
              name='home'
              backgroundColor='transparent'
              underlayColor='#B6B6B4'
              borderRadius={0}
              style={styles.optionButton}
              iconStyle={styles.optionIcon}
              onPress={() => { drawer.close(); Actions.home(); }}>
              <Text size={16} style={styles.optionText}>
                Home
              </Text>
            </Icon.Button>
            <Icon.Button
              name='group'
              backgroundColor='transparent'
              underlayColor='#B6B6B4'
              borderRadius={0}
              style={styles.optionButton}
              iconStyle={styles.optionIcon}
              onPress={() => { drawer.close(); Actions.listGroup(); }}>
              <Text size={16} style={styles.optionText}>
                My groups
              </Text>
            </Icon.Button>
            <Icon.Button
              name='plus'
              backgroundColor='transparent'
              underlayColor='#B6B6B4'
              borderRadius={0}
              style={styles.optionButton}
              iconStyle={styles.optionIcon}
              onPress={() => { drawer.close(); Actions.newRecipe(); }}>
              <Text size={16} style={styles.optionText}>
                New recipe
              </Text>
            </Icon.Button>
            <Icon.Button
              name='close'
              backgroundColor='transparent'
              underlayColor='#B6B6B4'
              borderRadius={0}
              style={styles.optionButton}
              iconStyle={styles.optionIcon}
              onPress={() => { drawer.close(); this.props.onLogoutClick(); }}>
              <Text size={16} style={styles.optionText} >
                Logout
              </Text>
            </Icon.Button>
          </ScrollView>
        </View>
      </View>
    )
  }

}

SideMenu.propTypes = {
  onLogoutClick: React.PropTypes.func,
  displayName: React.PropTypes.string,
  email: React.PropTypes.string,
  profilePic: React.PropTypes.string
}

SideMenu.contextTypes = {
  drawer: React.PropTypes.object,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#2C3539',
    backgroundColor: '#FFFFFF'
  },
  profileContainer: {
    flex: 1,
    flexWrap:'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(128,128,128)',
  },
  pictureWrapper: {
    backgroundColor: 'rgb(119,212,197)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 5
  },
  profilePic: {
    height: 80,
    width: 80
  },
  displayName: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '200',
    color: 'white'
  },
  email: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '200',
    color: 'white'
  },
  optionsContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  optionButton: {
    borderWidth: 0.1,
    padding: 20,
    borderColor: '#2C3539'
  },
  optionIcon: {
    color: '#2B3856'
  },
  optionText: {
    color: 'rgb(105,105,105)',
    fontSize: 16,
    fontFamily: 'Helvetica'
  }
})

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    displayName: state.auth.isAuthenticated ? state.auth.displayName : 'No name found',
    profilePic: state.auth.isAuthenticated ? state.auth.photoURL : ' ',
    email: state.auth.isAuthenticated ? state.auth.email : ' '
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutClick: () => {
      dispatch(logout())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu)
