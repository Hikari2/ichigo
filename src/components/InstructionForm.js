import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  Platform,
  View,
  Text,
} from 'react-native'
import TFN, {} from 'tcomb-form-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImagePicker  from 'react-native-image-picker'
import VideoPlayer from '../components/VideoPlayer'

const {width} = Dimensions.get('window')

export default class InstructionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    let stepCount = 1
    const containerStyle = this.props.visible ? styles.container : {opacity: 0, width: 0, height: 0}
    return (
      <View style={containerStyle}>
        {
          this.props.instructions.map((instruction, i) => {
            if(!instruction) {
              return
            }
            return (
              <View style={{padding: 10, borderBottomWidth: 0.5, borderColor: 'rgb(218, 218, 218)'}} key={`instruction-${i}`}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{`Step ${stepCount++}`}</Text>
                <View style={styles.instructionContainer}>
                  <Form
                    ref={`instruction-${i}`}
                    type={Instruction}
                    options={options}
                    value={this.props.instructions[i]}
                    onChange={(value) => {
                      this.props.onChange(value, i)
                    }}
                  />
                  <Icon.Button
                    name='minus-circle'
                    size={25}
                    backgroundColor='transparent'
                    underlayColor='transparent'
                    style={{borderRadius: 0}}
                    iconStyle={{padding: 5, marginRight: 0, color: 'rgb(105,105,105)'}}
                    onPress={() => this.props.onRemove(i)}
                  />
                </View>
                <View style={styles.videoContainer}>
                  {
                    instruction.video ?
                      <VideoPlayer src={instruction.video} width={width * 0.8} height={240} /> : <View />
                  }
                  <Icon.Button
                    name='video-camera'
                    size={25}
                    backgroundColor='transparent'
                    underlayColor='transparent'
                    borderRadius={0}
                    style={{borderWidth: 0.5, borderColor: 'rgb(218,218,218)', width: 120}}
                    iconStyle={{padding: 5, marginRight: 0, color: 'rgb(105,105,105)'}}
                    onPress={() => this.addVideo(i)}>
                    <Text>
                      {
                        instruction.video ? 'Change gif' : 'Add gif'
                      }
                    </Text>
                  </Icon.Button>
                </View>
              </View>
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
          onPress={() => this.props.onAdd()}>
          <Text>Add Step</Text>
        </Icon.Button>
      </View>
    )
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
        this.props.onChange({video: source}, i)
      }
    })
  }

}

InstructionForm.propTypes = {
  visible: React.PropTypes.bool,
  instructions: React.PropTypes.array,
  onChange: React.PropTypes.func,
  onAdd: React.PropTypes.func,
  onRemove: React.PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  instructionContainer: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  videoContainer: {
    padding: 10
  }
})

const videoOptions = {
  title: '',
  takePhotoButtonTitle: 'Capture',
  mediaType: 'video',
  maxWidth: 900,
  maxHeight: 900,
  durationLimit: 10,
  customButtons: [

  ],
  storageOptions: {
    skipBackup: true,
    path: 'videos'
  }
}

const Form = TFN.form.Form
const Instruction = TFN.struct({
  description: TFN.String
})
const stylesheet = JSON.parse(JSON.stringify(TFN.form.Form.stylesheet))
stylesheet.fieldset = {
  flexDirection: 'row',
  paddingBottom: 0
}

stylesheet.formGroup = {
  normal: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    marginTop: 10
  },
  error: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    marginTop: 10
  }
}

stylesheet.textbox = {
  normal: {
    width: width * 0.7,
    color: 'rgb(148, 148, 148)',
    fontSize: 13,
    fontWeight: '100',
    borderColor: 'rgb(218, 218, 218)',
    borderWidth: 0.5,
    padding: 0,
    paddingLeft: 15
  },
  error: {
    width: width * 0.7,
    color: 'rgb(148, 148, 148)',
    fontSize: 13,
    fontWeight: '100',
    padding: 0,
    paddingLeft: 15,
    borderColor: 'red',
    borderWidth: 0.5
  }
}

const options = {
  auto: 'placeholders',
  stylesheet,
  fields: {
    description: {
      underlineColorAndroid: 'transparent',
      autoCapitalize: 'sentences',
      numberOfLines: 5,
      multiline: true
    }
  }
}
