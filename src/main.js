import React, { Component } from 'react'
import { createStore, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import { Provider, connect } from 'react-redux'
import { Router, Scene, Switch, Modal } from 'react-native-router-flux'
import reducer from './reducers'
import LoginPage from './containers/LoginPage'
import Home from './containers/Home'
import GroupPage from './containers/GroupPage'
import GroupListPage from './containers/GroupListPage'
import CreateGroupPage from './containers/CreateGroupPage'
import SideMenuDrawer from './components/SideMenuDrawer'
import NewRecipePage from './containers/NewRecipePage'
import NavigationBar from './components/NavigationBar'
import ViewRecipePage from './containers/ViewRecipePage'

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
          <Scene key='loginPage' component={LoginPage} hideNavBar={true} />
          <Scene key='drawer' component={SideMenuDrawer} open={false} initial>
            <Scene key='main' navBar={NavigationBar}>
            <Scene
              key='home'
              title='Home'
              navigationBarStyle={{ backgroundColor: '#ffffff' }}
              titleStyle={{ color: '#000000' }}
              component={Home}
            />
            <Scene
              key='newRecipe'
              title='New recipe'
              navigationBarStyle={{ backgroundColor: '#ffffff' }}
              titleStyle={{ color: '#000000' }}
              component={NewRecipePage}
            />
            <Scene
              key='viewRecipe'
              title='View recipe'
              navigationBarStyle={{ backgroundColor: '#ffffff' }}
              titleStyle={{ color: '#000000' }}
              component={ViewRecipePage}
            />
            <Scene
              key='listGroup'
              navigationBarStyle={{ backgroundColor: '#ffffff' }}
              titleStyle={{ color: '#000000' }}
              component={GroupListPage}
            />
            <Scene
              key='createGroup'
              navigationBarStyle={{ backgroundColor: '#ffffff' }}
              titleStyle={{ color: '#000000' }}
              component={CreateGroupPage}
            />
            </Scene>
          </Scene>
        </Scene>
        </Router>
      </Provider>
    )
  }
}
