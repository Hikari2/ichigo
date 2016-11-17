import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollableView,
  ScrollView,
  TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import Drawer from 'react-native-drawer'
import { DefaultRenderer, Actions } from 'react-native-router-flux'
import Camera from 'react-native-camera'
import SideMenu from '../containers/SideMenu'
import FormGen, {} from 'tcomb-form-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {publishPost} from '../actions/posts'

class NewRecipePage extends Component {
  constructor(props) {
    super(props)
    const user = props.user
    this.state = {
      value: {}
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Form
            ref='form'
            type={Post}
            options={options}
            value={this.state.value}
            onChange={(value)=> this.setState({value})}
          />
          <Icon.Button
            name='plus'
            underlayColor='#757575'
            backgroundColor='transparent'
            color='#000000'
            style={styles.optionButton}
            onPress={() => { }}>
              <Text size={16} style={styles.optionText} >
                {'Add new step'}
              </Text>
          </Icon.Button>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}>
            <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
          </Camera>
          <TouchableHighlight
            style={styles.button}
            onPress={()=>{
              const val = this.refs.form.getValue()
              if(val) {
                this.props.onSubmit({
                  title: val.title,
                  description: val.description,
                  picture: this.state.pic
                })
              }
              }}
            underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }

  takePicture() {
    this.camera.capture()
      .then((data) => this.setState({pic: data}))
      .catch(err => console.error(err));
  }
}

const Form = FormGen.form.Form
const Email = FormGen.refinement(FormGen.Number, function (n) { return n >= 18; })
const Post = FormGen.struct({
  title: FormGen.String,
  description: FormGen.String
})
const stylesheet = JSON.parse(JSON.stringify(FormGen.form.Form.stylesheet))
stylesheet.textbox.normal.height = 100
FormGen.form.Form.stylesheet = stylesheet

const options = {
  fields: {
    title: {
      underlineColorAndroid: 'transparent'
    },
    description: {
      help: 'Give a short description',
      underlineColorAndroid: 'transparent',
      numberOfLines: 4,
      multiline: true,
      stylesheet
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 40,
    marginTop: 30,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    height: 200,
    width: 200,
    margin: 25
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 5,
    fontSize: 12,
    alignSelf: 'center'
  },
  optionButton: {
    borderWidth: 0.1,
    borderRadius: 1,
    backgroundColor: '#FFFFFF'
  },
  optionText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Helvetica'
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.isAuthenticated ? state.auth.providerData[0] : {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (post) => {
      dispatch(publishPost(post))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRecipePage)
