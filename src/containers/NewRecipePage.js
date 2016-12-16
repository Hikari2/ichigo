import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Platform,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import FormGen, {} from 'tcomb-form-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {publish} from '../actions/recipe'
import ImagePicker  from 'react-native-image-picker'
import {Actions} from 'react-native-router-flux'

class NewRecipePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stepCount: 0,
      steps: [],
      ingredients: [],
      value: {}
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.photoWrapper}>
            {this.state.photo ?
              <Image source={{uri: this.state.photo.path}} style={{height: 200, width: 200}} /> :
              <Icon.Button
                name='camera'
                size={25}
                backgroundColor='rgb(119,212,197)'
                style={{borderRadius: 0}}
                iconStyle={{padding: 5, marginRight: 0, color: 'rgb(105,105,105)'}}
                onPress={() => this.addPhoto()}>
                  <Text>Add picture</Text>
              </Icon.Button>
            }
          </View>
          <Form
            ref='recipeHeader'
            type={RecipeHeader}
            options={options}
            value={this.state.value}
            onChange={(value)=> this.setState({value})}
          />
          <View style={styles.ingredientsContainer}>
            <Text
              size={16}
              style={{
                fontWeight: '400',
                fontSize: 16,
                color: 'rgb(61, 193, 172)'
              }} >
              Ingredients
            </Text>
            {this.renderIngredients()}
            <Icon.Button
              name='plus'
              underlayColor='rgb(55, 174, 154)'
              backgroundColor='transparent'
              color='white'
              style={{borderRadius: 0, width: 40, backgroundColor: 'rgb(138,218,205)'}}
              iconStyle={{marginRight: 0}}
              onPress={() => {
                let ingredients = this.state.ingredients
                ingredients.push({
                  name: ' ',
                  amount: ' ',
                  measure: ' '
                })
                this.setState({ingredients})
              }}>
            </Icon.Button>
          </View>
          {this.renderSteps()}
          <Icon.Button
            name='plus'
            underlayColor='rgb(55, 174, 154)'
            backgroundColor='transparent'
            color='white'
            style={styles.optionButton}
            onPress={() => {
              let steps = this.state.steps
              steps.push({
                instruction: ' '
              })
              this.setState({steps})
            }}>
              <Text size={16} style={styles.optionText} >
                {'Add new step'}
              </Text>
          </Icon.Button>
          <TouchableHighlight
            underlayColor='rgb(55, 174, 154)'
            style={styles.submitButton}
            onPress={()=>{
              const val = this.refs.recipeHeader.getValue()
              if(val) {
                this.props.onSubmit({
                  ...this.state.value,
                  steps: this.state.steps,
                  ingredients: this.state.ingredients,
                  photo: this.state.photo ? this.state.photo : ''
                })
              }
              }}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }

  renderIngredients() {
    return (
      this.state.ingredients.map((data, i) => {
        return (
          <View key={`item-${i}`}>
            <Form
              ref={data}
              type={RecipeIngredient}
              options={rowOptions}
              value={this.state.ingredients[i]}
              onChange={(value) => {
                let ingredients = this.state.ingredients
                ingredients[i] = value
                this.setState({ingredients})
              }}/>
          </View>
        )
      })
    )
  }

  renderSteps() {
    return (
      this.state.steps.map((data, i) => {
        return (
          <View key={`step-${i}`}>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 16,
                color: 'rgb(61, 193, 172)'
              }}>step {i + 1}
            </Text>
            <Icon.Button
              name='camera'
              size={25}
              backgroundColor='rgb(119,212,197)'
              style={{borderRadius: 0}}
              iconStyle={{padding: 5, marginRight: 0, color: 'rgb(105,105,105)'}}
              onPress={() => this.addVideo(i)}>
                <Text>Add gif</Text>
            </Icon.Button>
            <Form
              ref={data}
              type={RecipeStep}
              options={options}
              value={this.state.steps[i]}
              onChange={(value) => {
                let steps = this.state.steps
                steps[i] = value
                this.setState({steps})
              }}/>
          </View>
        )
      })
    )
  }

  addPhoto() {
    ImagePicker.showImagePicker(cameraOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        Alert.alert('Whops! something went wrong')
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else {
        let source
        if(Platform.OS === 'android') {
          source = response.uri
        } else {
          source = response.uri.replace('file://', '')
        }
        this.setState({photo: {path: source}})
      }
    })
  }

  addVideo(i) {
    ImagePicker.showImagePicker(videoOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        Alert.alert('Whops! something went wrong')
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else {
        let source
        if(Platform.OS === 'android') {
          source = response.uri
        } else {
          source = response.uri.replace('file://', '')
        }
        let steps = this.state.steps
        steps[i] = Object.assign({}, steps[i], {video: source})
        this.setState({steps})
      }
    })
  }
}


const cameraOptions = {
  title: '',
  maxWidth: 600,
  maxHeight: 600,
  customButtons: [

  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

const videoOptions = {
  title: '',
  mediaType: 'video',
  maxWidth: 600,
  maxHeight: 600,
  durationLimit: 10,
  customButtons: [

  ],
  storageOptions: {
    skipBackup: true,
    path: 'videos'
  }
}

const Form = FormGen.form.Form

const RecipeHeader = FormGen.struct({
  title: FormGen.String,
  description: FormGen.String
})

const RecipeIngredient = FormGen.struct({
  name: FormGen.String,
  amount: FormGen.Number,
  unit: FormGen.String,
})

const RecipeStep = FormGen.struct({
  instruction: FormGen.String
})

const stylesheet = JSON.parse(JSON.stringify(FormGen.form.Form.stylesheet))
stylesheet.controlLabel = {
  normal: {
    color: 'rgb(80, 200, 180)',
    fontWeight: '100'
  },
  error: {
    color: 'rgb(80, 200, 180)',
    fontWeight: 'bold',
  }
}

stylesheet.textbox = {
  normal: {
    fontSize: 18,
    fontWeight: '100',
    borderColor: 'rgb(80, 200, 180)',
    borderBottomWidth: 0.5
  },
  error: {
    fontSize: 18,
    borderColor: 'red',
    borderWidth: 1
  }
}

const rowStylesheet = JSON.parse(JSON.stringify(FormGen.form.Form.stylesheet))
rowStylesheet.fieldset = {
  flexDirection: 'row'
}
rowStylesheet.formGroup.normal.flex = 1
rowStylesheet.formGroup.error.flex = 1
rowStylesheet.formGroup.normal.marginBottom = 0
rowStylesheet.formGroup.error.marginBottom = 0

rowStylesheet.controlLabel = {
  normal: {
    fontSize: 11,
    color: 'rgb(80, 200, 180)',
    fontWeight: '100'
  },
  error: {
    fontSize: 11,
    color: 'rgb(80, 200, 180)',
    fontWeight: 'bold',
  }
}

rowStylesheet.textbox = {
  normal: {
    fontSize: 12,
    fontWeight: '100',
    borderColor: 'rgb(80, 200, 180)',
    borderBottomWidth: 0.5,
    padding: 0
  },
  error: {
    fontSize: 12,
    borderColor: 'red',
    borderWidth: 1,
    padding: 0
  }
}


const rowOptions = {
  stylesheet: rowStylesheet,
  fields: {
    name: {
      underlineColorAndroid: 'transparent',
      autoCapitalize: 'sentences'
    },
    amount: {
      underlineColorAndroid: 'transparent'
    },
    unit: {
      underlineColorAndroid: 'transparent'
    }
  }
}

const options = {
  stylesheet,
  fields: {
    title: {
      underlineColorAndroid: 'transparent',
      autoCapitalize: 'sentences'
    },
    description: {
      underlineColorAndroid: 'transparent',
      autoCapitalize: 'sentences',
      numberOfLines: 4,
      multiline: true
    },
    instruction: {
      underlineColorAndroid: 'transparent',
      autoCapitalize: 'sentences',
      numberOfLines: 4,
      multiline: true
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 40,
    marginTop: 50,
    backgroundColor: '#ffffff',
  },
  ingredientsContainer: {
    flex: 1,
    marginTop: 50,
    marginBottom: 50
  },
  photoWrapper: {
    alignSelf: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 5
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
  submitButton: {
    height: 36,
    backgroundColor: 'rgb(99, 206, 188)',
    borderRadius: 0,
    marginTop: 30,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  optionButton: {
    width: 150,
    borderWidth: 0.1,
    borderRadius: 1,
    backgroundColor: 'rgb(138,218,205)'
  },
  optionText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Helvetica'
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.auth.isAuthenticated ? state.auth.providerData[0] : {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (recipe) => {
      dispatch(publish(recipe))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRecipePage)
