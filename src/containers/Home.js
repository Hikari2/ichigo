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
import {getMyRecipes} from '../actions/recipe'
import { Actions } from 'react-native-router-flux'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.props.loading ? <ActivityIndicator size={'large'} color={'rgb(80, 200, 180)'}/> : this.renderRecipes()}
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
            onPress={()=> {
              Actions.viewRecipe({recipe: recipe})
            }}>
            <View style={styles.recipeContainer}>
              <View style={styles.pictureContainer}>
                {
                  recipe.photo ?
                  <Image source={{uri: recipe.photo.path}} style={styles.picture} resizeMode={'contain'}/> :
                  <Image source={require('../assets/placeholder.png')} style={styles.picture} resizeMode={'contain'}/>
                }
              </View>
              <View style={styles.textContainer}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: 'rgb(105,105,105)'}}>{recipe.title}</Text>
                <Text style={{fontSize: 12, fontWeight: 'bold', color: 'rgb(105,105,105)'}}>{recipe.description}</Text>
              </View>
            </View>
          </TouchableHighlight>
        )
      })
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    padding: 5
  },
  recipeContainer: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#b2b2b2'
  },
  pictureContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    width: 300
  },
  textContainer: {
    flex: 1,
    height: 50,
    padding: 10,
    justifyContent: 'center'
  },
  picture: {
    height: 250,
    width: 300
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
    onLoad: () => {
      dispatch(getMyRecipes())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
