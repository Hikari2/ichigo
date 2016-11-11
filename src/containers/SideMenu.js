import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import Drawer from 'react-native-drawer'
import { DefaultRenderer, Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { logout } from '../actions/auth'

class SideMenu extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    const drawer = this.context.drawer
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image source={{uri: this.props.profilePic}} style={styles.profilePic} />
          <Text style={styles.displayName}>{this.props.displayName}</Text>
        </View>
        <View style={styles.optionsContainer}>
        <Icon.Button
          name='home'
          backgroundColor='#42647F'
          onPress={() => { drawer.close(); Actions.home(); }}>
          <Text size={16} style={styles.optionText} >
            Home
          </Text>
        </Icon.Button>
        <Icon.Button
          name='group'
          backgroundColor='#42647F'
          onPress={() => { drawer.close(); Actions.groups(); }}>
          <Text size={16} style={styles.optionText} >
            Groups
          </Text>
        </Icon.Button>
        <Icon.Button
          name='plus'
          backgroundColor='#42647F'
          onPress={() => { drawer.close(); Actions.newPost(); }}>
          <Text size={16} style={styles.optionText} >
            New recipe
          </Text>
        </Icon.Button>
          <Icon.Button
            name='close'
            backgroundColor='#42647F'
            onPress={this.props.onLogoutClick}>
            <Text size={16} style={styles.optionText} >
              Logout
            </Text>
          </Icon.Button>
        </View>
      </View>
    )
  }

}

SideMenu.contextTypes = {
  drawer: React.PropTypes.object,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#42647F',
    borderRightWidth: 0.5,
    borderColor: '#d6d7da'
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20
  },
  profilePic: {
    marginBottom: 20,
    height: 120,
    width: 120
  },
  displayName: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: '#FFFFFF'
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Helvetica'
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    displayName: state.auth.isAuthenticated ? state.auth.user.displayName : ' ',
    profilePic: state.auth.isAuthenticated ? state.auth.user.photoURL : 'http://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png'
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutClick: () => {
      dispatch(logout())
    },
    onPublishClick: (post) => {
      dispatch(publishPost(post))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu)
