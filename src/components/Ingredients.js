import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native'

export default class Ingredients extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView>
        <View style={[styles.container, {height: this.props.height, width: this.props.width}]}>
        {
          this.props.ingredients.map((ingredient, i) => {
            return (
              <View style={[styles.ingredientContainer, {height: 60, width: this.props.width}]} key={`ingredient-${i}`}>
                <Text style={[styles.ingredient, {color: 'rgb(148,148,148)'}]}>{ingredient.name}</Text>
                <Text style={[styles.ingredient, {color: 'rgb(198,198,198)'}]}>{ingredient.amount}</Text>
                <Text style={[styles.ingredient, {color: 'rgb(198,198,198)'}]}>{ingredient.unit}</Text>
              </View>
            )
          })
        }
        </View>
      </ScrollView>
    )
  }
}

Ingredients.propTypes = {
  ingredients: React.PropTypes.array,
  height: React.PropTypes.number,
  width: React.PropTypes.number
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  ingredientContainer: {
    paddingLeft: 25,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgb(206, 206, 206)'
  },
  ingredient: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '600'
  }
})
