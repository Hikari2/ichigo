import React, { Component } from 'react'
import { createStore, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import { Provider, connect } from 'react-redux'
import { Router, Scene, Switch, Modal } from 'react-native-router-flux'
import reducer from './reducers'
import Login from './containers/Login'
import MyRecipes from './containers/MyRecipes'
import Group from './containers/Group'
import MyGroups from './containers/MyGroups'
import SharableRecipes from './containers/SharableRecipes'
import CreateGroup from './containers/CreateGroup'
import ViewGroup from './containers/ViewGroup'
import SideMenuDrawer from './components/SideMenuDrawer'
import NewRecipe from './containers/NewRecipe'
import NavigationBar from './components/NavigationBar'
import ViewRecipe from './containers/ViewRecipe'
import EditRecipe from './containers/EditRecipe'

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
            <Scene key='loginPage' component={Login} hideNavBar={true} />
            <Scene key='drawer' component={SideMenuDrawer} open={false} initial>
              <Scene key='main'>
                <Scene
                  title='My Recipes'
                  key='myRecipes'
                  navigationBarStyle={{ backgroundColor: '#ffffff' }}
                  titleStyle={{fontSize: 20, fontWeight: 'bold', color: 'rgb(80, 200, 180)' }}
                  component={MyRecipes}
                />
                <Scene
                  title='My Groups'
                  key='myGroups'
                  navigationBarStyle={{ backgroundColor: '#ffffff' }}
                  titleStyle={{fontSize: 20, fontWeight: 'bold', color: 'rgb(80, 200, 180)' }}
                  component={MyGroups}
                />
                <Scene
                  title='Create New Group'
                  key='createGroup'
                  navigationBarStyle={{ backgroundColor: '#ffffff' }}
                  titleStyle={{fontSize: 20, fontWeight: 'bold', color: 'rgb(80, 200, 180)' }}
                  component={CreateGroup}
                />
                <Scene
                  key='viewGroup'
                  navigationBarStyle={{ backgroundColor: '#ffffff' }}
                  titleStyle={{fontSize: 20, fontWeight: 'bold', color: 'rgb(80, 200, 180)' }}
                  component={ViewGroup}
                />
                <Scene
                  key='sharableRecipes'
                  navigationBarStyle={{ backgroundColor: '#ffffff' }}
                  titleStyle={{fontSize: 20, fontWeight: 'bold', color: 'rgb(80, 200, 180)' }}
                  component={SharableRecipes}
                />
                <Scene
                  title='New Recipe'
                  key='newRecipe'
                  navigationBarStyle={{ backgroundColor: '#ffffff' }}
                  titleStyle={{fontSize: 20, fontWeight: 'bold', color: 'rgb(80, 200, 180)' }}
                  component={NewRecipe}
                />
                <Scene
                  title='View Recipe'
                  key='viewRecipe'
                  navigationBarStyle={{ backgroundColor: '#ffffff' }}
                  titleStyle={{fontSize: 20, fontWeight: 'bold', color: 'rgb(80, 200, 180)' }}
                  component={ViewRecipe}
                />
                <Scene
                  title='Edit Recipe'
                  key='editRecipe'
                  navigationBarStyle={{ backgroundColor: '#ffffff' }}
                  titleStyle={{fontSize: 20, fontWeight: 'bold', color: 'rgb(80, 200, 180)' }}
                  component={EditRecipe}
                />
              </Scene>
            </Scene>
          </Scene>
        </Router>
      </Provider>
    )
  }
}
