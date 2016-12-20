import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
import FormGen, {} from 'tcomb-form-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {update} from '../actions/recipe'
import ImagePicker  from 'react-native-image-picker'
import IngredientsForm from '../components/IngredientsForm'
import IntroductionForm from '../components/IntroductionForm'
import InstructionForm from '../components/InstructionForm'

const {height, width} = Dimensions.get('window')

class EditRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeView: 1,
      ...props.recipe
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={{fontSize: 14}}>{this.state.date}</Text>
          <Icon.Button
            name='check'
            size={20}
            backgroundColor='transparent'
            underlayColor='rgb(168,168,168)'
            borderRadius={0}
            style={{borderWidth: 0.5, borderColor: 'rgb(218,218,218)'}}
            iconStyle={{padding: 1, marginRight: 0, color: 'rgb(105,105,105)'}}
            onPress={this.onSubmit.bind(this)}>
            <Text style={{fontSize: 14}}>Done</Text>
          </Icon.Button>
        </View>
        <View style={styles.optionContainer}>
          <TouchableHighlight
            style={[styles.option, {marginRight: 5}]}
            underlayColor={'rgb(169,169,169)'}
            onPress={() => {this.setState({activeView: 1})}}>
            <Text style={this.state.activeView === 1 ? styles.activeText : styles.optionText}>Introduction</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.option, {marginLeft: 5}]}
            underlayColor={'rgb(169,169,169)'}
            onPress={() => {this.setState({activeView: 2})}}>
            <Text style={this.state.activeView === 2 ? styles.activeText : styles.optionText}>Ingredients</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.option, {marginLeft: 5}]}
            underlayColor={'rgb(169,169,169)'}
            onPress={() => {this.setState({activeView: 3})}}>
            <Text style={this.state.activeView === 3 ? styles.activeText : styles.optionText}>Instructions</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.activeViewContainer}>
          <ScrollView>
            {this.renderForms()}
          </ScrollView>
        </View>
      </View>
    )
  }

  onSubmit() {
    let valid = this.refs.introductionForm.refs.introduction.getValue()
    this.state.ingredients.forEach((ingredient, i) => {
      if(ingredient && !this.refs.ingredientsForm.refs[`ingredient-${i}`].getValue()) {
        valid = null
      }
    })
    this.state.instructions.forEach((instruction, i) => {
      if(instruction && !this.refs.instructionsForm.refs[`instruction-${i}`].getValue()) {
        valid = null
      }
    })
    if (valid) {
      this.props.onSubmit({
        date: this.state.date,
        introduction: this.state.introduction,
        instructions: this.state.instructions,
        ingredients: this.state.ingredients,
        key: this.props.recipe.key
      })
    }
  }

  renderForms() {
    return (
      <View>
        <IntroductionForm
          ref='introductionForm'
          visible={this.state.activeView === 1}
          introduction={this.state.introduction}
          onChange={(value) => {
            let introduction = this.state.introduction
            introduction = Object.assign(introduction, value)
            this.setState({introduction})
          }}
        />
        <IngredientsForm
          ref='ingredientsForm'
          visible={this.state.activeView === 2}
          ingredients={this.state.ingredients}
          onChange={(value, i) => {
            let ingredients = this.state.ingredients
            ingredients[i] = value
            this.setState({ingredients})
          }}
          onAdd={() => {
            let ingredients = this.state.ingredients
            ingredients.push({})
            this.setState({ingredients})
          }}
          onRemove={(i) => {
            let ingredients = this.state.ingredients
            ingredients[i] = null
            this.setState({ingredients})
          }}
        />
        <InstructionForm
          ref='instructionsForm'
          visible={this.state.activeView === 3}
          instructions={this.state.instructions}
          onChange={(value, i) => {
            let instructions = this.state.instructions
            instructions[i] = Object.assign(instructions[i], value)
            this.setState({instructions})
          }}
          onAdd={() => {
            let instructions = this.state.instructions
            instructions.push({})
            this.setState({instructions})
          }}
          onRemove={(i) => {
            let instructions = this.state.instructions
            instructions[i] = null
            this.setState({instructions})
          }}
        />
      </View>
    )
  }
}

EditRecipe.propTypes = {
  onSubmit: React.PropTypes.func,
  recipe: React.PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60
  },
  headerContainer: {
    height: 50,
    width,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 3,
    paddingBottom: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionContainer: {
    height: 60,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 6,
    paddingBottom: 6,
    flexDirection: 'row',
    backgroundColor: 'rgba(169,169,169,.5)'
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'sans-serif',
    color: 'white'
  },
  activeText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'sans-serif',
    color: 'rgb(80, 200, 180)'
  },
  activeViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
      dispatch(update(recipe))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRecipe)
