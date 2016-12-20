import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import { getMyRecipes } from '../actions/recipe'
import { Actions } from 'react-native-router-flux'
import RecipeCard from '../components/RecipeCard'
import {shareToGroup} from '../actions/groups'

class SharableRecipes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0
    }
  }

  componentDidMount() {
    this.props.onLoad()
  }

  measureView(event) {
    this.setState({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height
    })
  }

  render() {
    return (
      <ScrollView onLayout={(event) => this.measureView(event)}>
        <View style={styles.container}>
          {this.props.loading ?
            <ActivityIndicator
              style={{marginTop: 120, padding: 20, transform: [{scale: 1.5}]}}
              size={'large'}
              color={'rgb(80, 200, 180)'}/> :
            this.renderRecipes()}
        </View>
      </ScrollView>
    )
  }

  renderRecipes() {
    return (
      this.props.recipes.map((recipe, i)=>{
        return (
          <TouchableHighlight
            key={`recipe-${i}`}
            underlayColor={'rgb(169,169,169)'}
            onPress={()=> {
              this.props.onPress(this.props.group, recipe)
              Actions.pop()
            }}>
            <View>
              <RecipeCard
                title={recipe.introduction.title}
                image={recipe.introduction.photo}
                height={this.state.width * 0.3}
                width={this.state.width}
              />
            </View>
          </TouchableHighlight>
        )
      })
    )
  }
}

SharableRecipes.propTypes = {
  recipes: React.PropTypes.array,
  loading: React.PropTypes.bool,
  onLoad: React.PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60
  }
})

const mapStateToProps = (state) => {
  return {
    recipes: state.recipe.myRecipes,
    loading: state.recipe.isSearchingOwn,
    recipeCount: state.recipe.myRecipes.length
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPress: (group, recipe) => {
      dispatch(shareToGroup(group, recipe))
    },
    onLoad: () => {
      dispatch(getMyRecipes())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SharableRecipes)
