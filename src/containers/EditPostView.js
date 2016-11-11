import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {getMyPosts} from '../actions/post'

class EditPostView extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getMyPosts()
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderPosts()}
      </View>
    )
  }

  renderPosts() {
    return (
      this.props.myPosts.map((post, i) => {
        return(
          <View style={styles.container} key={`post-${i}`}>
            <Text>{post.title}</Text>
            <Text>{post.description}</Text>
            {post.picture ? <Image source={{uri: post.picture.path}} style={styles.picture} /> : <Text>No image</Text>}
          </View>
        )
    }))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {

  },
  picture: {
    marginBottom: 20,
    height: 120,
    width: 120
  }
})

const mapStateToProps = (state) => {
  console.log(JSON.stringify(state, null, 2))
  return {
    myPosts: state.post.myPosts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyPosts: () => {
      dispatch(getMyPosts())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPostView)
