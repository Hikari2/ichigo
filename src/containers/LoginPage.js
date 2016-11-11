import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { LoginManager, AccessToken, LoginButton} from 'react-native-fbsdk'
import { loginFaceBook, checkLogin } from '../actions/auth'
import { logout } from '../actions/auth'

class LoginPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.props.faceBookLogin}>
          Login with Facebook
        </Icon.Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    padding:10,
    height:45,
    overflow:'hidden',
    borderRadius:4,
    backgroundColor: 'lightblue'
  },
  button_text: {
    fontSize: 20,
    color: 'white'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(checkLogin())
      //dispatch(logout())
    },
    faceBookLogin: () => {
      dispatch(loginFaceBook())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
