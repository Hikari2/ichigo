import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
} from 'react-native'
import TFN, {} from 'tcomb-form-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const {width} = Dimensions.get('window')

export default class IngredientsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const containerStyle = this.props.visible ? styles.container : {opacity: 0, width: 0, height: 0}
    return (
      <View style={containerStyle}>
        {
          this.props.ingredients.map((ingredient, i) => {
            if(!ingredient) {
              return
            }
            return (
              <View style={styles.ingredientContainer} key={`ingredient-${i}`}>
                <Form
                  ref={`ingredient-${i}`}
                  type={Ingredient}
                  options={options}
                  value={this.props.ingredients[i]}
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
          <Text>Add Ingredient</Text>
        </Icon.Button>
      </View>
    )
  }
}

IngredientsForm.propTypes = {
  visible: React.PropTypes.bool,
  ingredients: React.PropTypes.array,
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
  ingredientContainer: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgb(206, 206, 206)'
  }
})

const Form = TFN.form.Form
const Ingredient = TFN.struct({
  name: TFN.String,
  amount: TFN.Number,
  unit: TFN.String,
})
const stylesheet = JSON.parse(JSON.stringify(TFN.form.Form.stylesheet))
const nameStyle = JSON.parse(JSON.stringify(TFN.form.Form.stylesheet))
const amountStyle = JSON.parse(JSON.stringify(TFN.form.Form.stylesheet))
const unitStyle = JSON.parse(JSON.stringify(TFN.form.Form.stylesheet))
stylesheet.fieldset = {
  flexDirection: 'row',
  paddingBottom: 0
}

const formGroupStyle = {
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
nameStyle.formGroup = formGroupStyle
amountStyle.formGroup = formGroupStyle
unitStyle.formGroup = formGroupStyle

const textBoxStyleBase = {
  color: 'rgb(148, 148, 148)',
  fontSize: 13,
  fontWeight: '100',
  borderColor: 'rgb(218, 218, 218)',
  borderWidth: 0.5,
  paddingTop: 4,
  paddingBottom: 4,
  paddingLeft: 5
}

const textBoxErrorStyle = {
  borderColor: 'red',
  borderWidth: 0.5,
}

nameStyle.textbox = {
  normal: Object.assign({}, textBoxStyleBase, {width: 130}),
  error: Object.assign({}, textBoxStyleBase, textBoxErrorStyle, {width: 130}),
}
amountStyle.textbox = {
  normal: Object.assign({}, textBoxStyleBase, {width: 80}),
  error: Object.assign({}, textBoxStyleBase, textBoxErrorStyle, {width: 80}),
}
unitStyle.textbox = {
  normal: Object.assign({}, textBoxStyleBase, {width: 50}),
  error: Object.assign({}, textBoxStyleBase, textBoxErrorStyle, {width: 50}),
}

const options = {
  auto: 'placeholders',
  stylesheet,
  fields: {
    name: {
      stylesheet: nameStyle,
      underlineColorAndroid: 'transparent',
      autoCapitalize: 'sentences'
    },
    amount: {
      stylesheet: amountStyle,
      underlineColorAndroid: 'transparent'
    },
    unit: {
      stylesheet: unitStyle,
      underlineColorAndroid: 'transparent'
    }
  }
}
