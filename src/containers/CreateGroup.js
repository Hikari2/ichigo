import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
  Text,
  Image,
  ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import FormGen, {} from 'tcomb-form-native'
import {createGroup} from '../actions/groups'
import { Actions } from 'react-native-router-flux'
import {getFriendList} from '../actions/user'

class CreateGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      value: {}
    }
  }

  componentDidMount() {
    this.props.onLoad()
  }

  componentDidUpdate() {
    if(this.state.list.length === 0 && this.props.friends.length !== 0) {
      const list = this.props.friends.map((data)=>{
        return ({
          uid: data.uid,
          name: data.displayName,
          photo: data.photoURL,
          marked: false
        })
      })
      this.setState({list})
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Icon.Button
            name='arrow-right'
            backgroundColor='transparent'
            underlayColor='rgb(189,189,189)'
            style={styles.optionButton}
            iconStyle={styles.optionIcon}
            onPress={() => {
              const value = this.refs.form.getValue()
              if (value) {
                JSON.stringify(this.state.list, null, 2)
                this.props.onSubmit({
                  list: this.state.list,
                  title: value.title
                })
                Actions.myGroups()
              }
            }}>
            <Text size={16} style={styles.optionText} >
              Create
            </Text>
          </Icon.Button>
          <Form
            ref='form'
            type={Group}
            options={options}
            value={this.state.value}
            onChange={(value) => this.setState({value})}
          />
        </View>
        {this.props.loading ? <ActivityIndicator size={'large'} color={'rgb(80, 200, 180)'}/> :
        <View style={styles.listContainer}>
        {
          this.state.list.map((user, i) => {
            return (
              <View style={styles.listRow} key={`item-${i}`}>
                <TouchableHighlight
                  underlayColor='#C0C0C0'
                  style={user.marked ? styles.markedItem : styles.unmarkedItem}
                  onPress={() => this.mark(i)}>
                  <View style={styles.listRow}>
                    <Image source={{uri: user.photo}} style={styles.profilePic} />
                    <Text>{user.name}</Text>
                  </View>
                </TouchableHighlight>
              </View>
            )
          })
        }
        </View>
      }
      </ScrollView>
    )
  }

  mark(i) {
    const list = this.state.list
    list[i].marked = !list[i].marked
    this.setState({list})
  }
}

CreateGroup.propTypes = {
  isSearching: React.PropTypes.bool,
  friends: React.PropTypes.array,
  onLoad: React.PropTypes.func,
  onSubmit: React.PropTypes.func
}

const Form = FormGen.form.Form
const stylesheet = JSON.parse(JSON.stringify(FormGen.form.Form.stylesheet))
stylesheet.textbox.normal.borderRadius = 0
stylesheet.textbox.normal.borderWidth = 0
stylesheet.textbox.normal.borderColor= '#36648B'
stylesheet.textbox.normal.borderBottomWidth = 1
stylesheet.textbox.normal.width = 250

stylesheet.textbox.error.borderRadius = 0
stylesheet.textbox.error.borderWidth = 0
stylesheet.textbox.error.borderColor= ''
stylesheet.textbox.error.borderBottomWidth = 1
stylesheet.textbox.error.width = 250

const Group = FormGen.struct({
  title: FormGen.String
})

const options = {
  fields: {
    title: {
      auto: 'placeholders',
      label: ' ',
      underlineColorAndroid: 'transparent',
      stylesheet
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    backgroundColor: '#ffffff'
  },
  listContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  listRow: {
    width: 250,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    marginTop: 2
  },
  profilePic: {
    marginRight: 10,
    height: 50,
    width: 50
  },
  unmarkedItem: {
    padding: 2,
    paddingBottom: 1,
    borderBottomWidth: 1,
    borderColor: '#36648B',
    backgroundColor: '#ffffff'
  },
  markedItem: {
    borderWidth: 2,
    borderColor: 'rgb(80, 200, 180)',
    backgroundColor: '#ffffff'
  },
  optionButton: {
    width: 250,
    borderWidth: 0.1,
    borderRadius: 1,
    padding: 20,
    backgroundColor: 'rgb(80, 200, 180)'
  },
  optionIcon: {
    color: '#FFFFFF'
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Helvetica'
  }
})

const mapStateToProps = (state) => {
  return {
    loading: state.user.isSearching,
    friends: state.user.friends,
    friendsCount: state.user.friends.length
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (data) => {
      dispatch(createGroup(data))
    },
    onLoad: () => {
      dispatch(getFriendList())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGroup)
