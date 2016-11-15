/* global require */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight,
  ScrollView,
  Text
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class FriendList extends Component {
  constructor(props) {
    super(props)
    const list = props.list.map((data)=>{
      return ({
        id: data.id,
        name: data.name,
        marked: false
      })
    })
    this.state = {
      list
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
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
      </ScrollView>
    )
  }

  mark(i) {
    const list = this.state.list
    list[i].marked = !list[i].marked
    this.setState({list})
  }
}

FriendList.propTypes = {
  list: React.PropTypes.array
}

const styles = StyleSheet.create({
  container: {
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
  }
})
