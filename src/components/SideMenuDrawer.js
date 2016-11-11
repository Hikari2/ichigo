import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import Drawer from 'react-native-drawer'
import { DefaultRenderer, Actions } from 'react-native-router-flux'
import SideMenu from '../containers/SideMenu'

export default class SideMenuDrawer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    const state = this.props.navigationState
    const children = state.children

    return (
        <Drawer
            ref="navigation"
            open={state.open}
            onOpen={()=>Actions.refresh({key:state.key, open: true})}
            onClose={()=>Actions.refresh({key:state.key, open: false})}
            type="overlay"
            content={<SideMenu />}
            openDrawerOffset={0.6}
            panOpenMask={0.1}
            panCloseMask={0.8}
            negotiatePan={true}
            tweenHandler={(ratio) => ({
             main: { opacity:Math.max(0.54,1-ratio) }
        })}>
            <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
        </Drawer>
    )
  }
}
