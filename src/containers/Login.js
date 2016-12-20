import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { loginFaceBook, checkLogin } from '../actions/auth'

class Login extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/logo.jpg')} style={styles.picture} resizeMode={'contain'}/>
        <Icon.Button
          name="facebook"
          borderRadius={0}
          backgroundColor="#3b5998"
          style={styles.button}
          onPress={this.props.faceBookLogin}>
          Login with Facebook
        </Icon.Button>
      </View>
    )
  }

  componentWillUnmount () {
    clearInterval(this.updateIntervalID)
  }
}

Login.propTypes = {
  faceBookLogin: React.PropTypes.func,
  onLoad: React.PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    marginBottom: 85,
    fontSize: 45,
    fontWeight: '300',
    fontFamily: 'lucida grande'
  },
  button: {
    padding:10,
    height:45,
    overflow:'hidden',
    borderRadius:4
  },
  button_text: {
    fontSize: 20,
    color: 'white'
  },
  picture: {
    height: 150,
    width: 150,
    marginBottom: 35
  }
})

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(checkLogin())
    },
    faceBookLogin: () => {
      dispatch(loginFaceBook())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
