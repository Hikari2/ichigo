import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import ScrollableTabView, {ScrollableTabBar}  from 'react-native-scrollable-tab-view'
import GroupPage from './GroupPage'
import HomeNavBar from '../components/HomeNavBar'
import NewPostView from '../containers/NewPostView'
import EditPostView from '../containers/EditPostView'
import BrowsePostView from '../containers/BrowsePostView'

class Home extends Component {

  render() {
    return (
      <View style={styles.container}>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitPostForm: (post) => {
      dispatch(publishPost(post))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
