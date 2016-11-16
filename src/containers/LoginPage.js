import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { loginFaceBook, checkLogin } from '../actions/auth'

class LoginPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.updateIntervalID = setInterval(() => this.props.onLoad(), 10000)
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon.Button
          name="facebook"
          borderRadius={0}
          backgroundColor="#3b5998"
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

LoginPage.propTypes = {
  faceBookLogin: React.PropTypes.func,
  onLoad: React.PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
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
)(LoginPage)
