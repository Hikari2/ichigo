import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'
import { createStore, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import { Provider, connect } from 'react-redux'
import { Router, Scene, Switch, Modal } from 'react-native-router-flux'
import reducer from './reducers'
import LoginPage from './containers/LoginPage'
import Home from './containers/Home'
import GroupPage from './containers/GroupPage'
import SideMenuDrawer from './components/SideMenuDrawer'
import * as firebase from 'firebase'
import Drawer from 'react-native-drawer'
import NewPostView from './containers/NewPostView'

let store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default class ichigo extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key='root'
            component={connect(state=>({isAuthenticated:state.auth.isAuthenticated}))(Switch)}
            tabs={true}
            unmountScenes
            selector={props=>props.isAuthenticated ? 'drawer' : 'loginPage'}>
            <Scene key='loginPage' component={LoginPage} title=' ' />
            <Scene key='drawer' component={SideMenuDrawer} open={false} initial>
                <Scene key='main'>
                  <Scene
                    key='home'
                    title='Home'
                    navigationBarStyle={{ backgroundColor: '#ffffff' }}
                    titleStyle={{ color: '#000000' }}
                    component={Home}
                  />
                  <Scene
                    key='groups'
                    title='Groups'
                    navigationBarStyle={{ backgroundColor: '#ffffff' }}
                    titleStyle={{ color: '#000000' }}
                    component={GroupPage}
                  />
                  <Scene
                    key='newPost'
                    title='New recipe'
                    navigationBarStyle={{ backgroundColor: '#ffffff' }}
                    titleStyle={{ color: '#000000' }}
                    component={NewPostView}
                  />
              </Scene>
            </Scene>
          </Scene>
        </Router>
      </Provider>
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
