import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import { connect } from 'react-redux'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>HOME!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
