import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  Platform,
  View,
  Image,
  TouchableHighlight
} from 'react-native'
import TFN, {} from 'tcomb-form-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImagePicker  from 'react-native-image-picker'

const {width} = Dimensions.get('window')

export default class IntroductionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const containerStyle = this.props.visible ? styles.container : {opacity: 0, width: 0, height: 0}
    return (
      <View style={containerStyle}>
        <TouchableHighlight
          onPress={() => this.addPhoto()}
          underlayColor={'grey'}
        >
        {
          this.props.introduction.photo ?
            <Image source={{uri: this.props.introduction.photo}} style={{width: width * 0.7, height: 200, borderWidth: 0.5, borderColor: 'grey'}} resizeMode={'cover'} /> :
            <View style={{width: width * 0.7, height: 200, borderWidth: 0.5, borderColor: 'grey', justifyContent: 'center', alignItems: 'center'}}>
              <Icon.Button
                name='camera'
                size={35}
                backgroundColor='transparent'
                underlayColor='transparent'
                style={{borderRadius: 0}}
                onPress={() => this.addPhoto()}
                iconStyle={{padding: 5, marginRight: 0, color: 'rgb(105,105,105)'}}
              />
            </View>
        }
        </TouchableHighlight>
        <Form
          ref='introduction'
          type={Introduction}
          options={options}
          value={this.props.introduction}
          onChange={(value) => {
            this.props.onChange(value)
          }}
        />
      </View>
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
      this.props.onChange({photo: source})
    }
  })
}
}

IntroductionForm.propTypes = {
  visible: React.PropTypes.bool,
  introduction: React.PropTypes.object,
  onChange: React.PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  }
})

const cameraOptions = {
  title: '',
  maxWidth: 900,
  maxHeight: 900,
  customButtons: [

  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

const Form = TFN.form.Form
const Introduction = TFN.struct({
  title: TFN.String,
  description: TFN.String,
})
const stylesheet = JSON.parse(JSON.stringify(TFN.form.Form.stylesheet))

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
    fontSize: 14,
    fontWeight: '100',
    borderColor: 'rgb(218, 218, 218)',
    borderWidth: 0.5,
    marginBottom: 0,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 35
  },
  error: {
    width: width * 0.7,
    color: 'rgb(148, 148, 148)',
    fontSize: 14,
    fontWeight: '100',
    borderColor: 'red',
    borderWidth: 0.5,
    marginBottom: 0,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 35
  }
}

const options = {
  stylesheet,
  auto: 'placeholders',
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
  }
}
