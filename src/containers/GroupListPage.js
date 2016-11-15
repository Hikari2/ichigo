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
import {getMyGroups} from '../actions/groups'

class GroupListPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadGroupList()
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {
            this.props.groupList.map((data, i) => {
              return (
                <View style={styles.itemContainer} key={`item-${i}`}>
                  <Text>{data.title}</Text>
                </View>
              )
            })
          }
          <Icon.Button
            name='plus'
            backgroundColor='#d6d6d4'
            underlayColor='#a0a0a0'
            style={styles.optionButton}
            iconStyle={styles.optionIcon}
            onPress={() => { Actions.createGroup() }}>
            <Text size={16} style={styles.optionText}>
              New group
            </Text>
          </Icon.Button>
        </ScrollView>
      </View>
    )
  }
}

GroupListPage.propTypes = {
  loadGroupList: React.PropTypes.func,
  groupList: React.PropTypes.array
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginTop: 80,
    padding: 10
  },
  itemContainer: {
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#B7C3D0'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  }
})

const mapStateToProps = (state) => {
  return {
    groupList: state.posts.myPosts
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
)(GroupListPage)
