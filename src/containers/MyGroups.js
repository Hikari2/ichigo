import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {getMyGroups} from '../actions/groups'

const {height, width} = Dimensions.get('window')

class MyGroups extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadGroupList()
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.props.loading ?
            <ActivityIndicator
              style={{marginTop: 120, padding: 20, transform: [{scale: 1.5}]}}
              size={'large'}
              color={'rgb(80, 200, 180)'}/> :
            this.renderGroups()}
        </View>
      </ScrollView>
    )
  }

  renderGroups() {
    return (
      <View>
        {
          this.props.groupList.map((data, i) => {
            return (
              <TouchableHighlight
                onPress={() => {Actions.viewGroup({group: data})}}
                underlayColor='rgb(142,142,142)'
                style={styles.groupContainer}
                key={`item-${i}`}>
                  <Text style={{fontSize: 18, fontWeight: '600'}}>{data.title}</Text>
              </TouchableHighlight>
            )
          })
        }
        <Icon.Button
          name='plus-circle'
          size={40}
          backgroundColor='transparent'
          underlayColor='transparent'
          borderRadius={0}
          iconStyle={{padding: 5, marginRight: 0, color: 'rgb(105,105,105)'}}
          onPress={() => { Actions.createGroup() }}>
          <Text size={16} style={styles.optionText}>
            New group
          </Text>
        </Icon.Button>
      </View>
    )
  }
}

MyGroups.propTypes = {
  loadGroupList: React.PropTypes.func,
  groupList: React.PropTypes.array,
  loading: React.PropTypes.bool
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80
  },
  groupContainer: {
    width: width * 0.9,
    padding: 15,
    paddingLeft: 50,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: 'rgb(148,148,148)',
    backgroundColor: 'rgb(242,242,242)'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  }
})

const mapStateToProps = (state) => {
  return {
    groupList: state.groups.myGroups,
    loading: state.groups.isSearching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadGroupList: () => {
      dispatch(getMyGroups())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyGroups)
