import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
  Text
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import FormGen, {} from 'tcomb-form-native'
import {createGroup} from '../actions/groups'
import {getFriendList} from '../actions/user'

class CreateGroupPage extends Component {
  constructor(props) {
    super(props)
    const list = props.friends.map((data)=>{
      return ({
        id: data.id,
        name: data.name,
        marked: false
      })
    })
    this.state = {
      list,
      value: {}
    }
  }

  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Icon.Button
            name='arrow-right'
            backgroundColor='transparent'
            underlayColor='#236B8E'
            style={styles.optionButton}
            iconStyle={styles.optionIcon}
            onPress={() => {
              const value = this.refs.form.getValue()
              if (value) {
                this.props.onSubmit({
                  list: this.state.list,
                  title: value.title
                })
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
          <View style={styles.ListContainer}>
          {
            this.state.list.map((data, i) => {
              return (
                <TouchableHighlight
                  underlayColor='#C0C0C0'
                  style={data.marked ? styles.markedItem : styles.unmarkedItem}
                  onPress={() => this.mark(i)}
                  key={`item-${i}`}>
                  <Text>{data.name}</Text>
                </TouchableHighlight>
              )
            })
          }
          </View>
        </View>
      </ScrollView>
    )
  }

  mark(i) {
    const list = this.state.list
    list[i].marked = !list[i].marked
    this.setState({list})
  }
}

CreateGroupPage.propTypes = {
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
    padding: 40,
    marginTop: 80,
    backgroundColor: '#ffffff',
  },
  ListContainer: {
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  unmarkedItem: {
    padding: 20,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#2C3539',
    backgroundColor: '#ffffff'
  },
  markedItem: {
    padding: 20,
    marginTop: 5,
    borderWidth: 2,
    borderColor: '#3299CC',
    backgroundColor: '#ffffff'
  },
  optionButton: {
    borderWidth: 0.1,
    borderRadius: 1,
    padding: 20,
    backgroundColor: '#3299CC'
  },
  optionIcon: {
    color: '#2B3856'
  },
  optionText: {
    color: '#2B3856',
    fontSize: 16,
    fontFamily: 'Helvetica'
  }
})

const mapStateToProps = (state) => {
  return {
    isSearching: state.user.isSearching,
    friends: state.user.friends
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
)(CreateGroupPage)
