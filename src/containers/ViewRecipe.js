import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  Text,
  Image,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import RecipeCard from '../components/RecipeCard'
import Ingredients from '../components/Ingredients'
import Instructions from '../components/Instructions'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'

const {height, width} = Dimensions.get('window')

class ViewRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      steps: props.recipe.steps,
      width: 0,
      height: 0
    }
  }

  componentDidMount() {
    this.props.onLoad()
    this.setState({
      activeView: 1
    })
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
          <View style={{width, padding: 2, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Image source={{uri: this.props.recipe.profilePic}} style={{height: 50, width: 50, borderRadius: 50}} resizeMode={'cover'} />
              <View style={{marginLeft: 15}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{this.props.recipe.author}</Text>
                <Text style={{fontSize: 12, fontWeight: '200'}}>{this.props.recipe.date}</Text>
              </View>
            </View>
            {
              this.props.recipe.uid === this.props.uid ?
                <Icon.Button
                  name='edit'
                  size={25}
                  backgroundColor='transparent'
                  underlayColor='transparent'
                  borderRadius={0}
                  iconStyle={{padding: 5, marginRight: 0, color: 'rgb(105,105,105)'}}
                  onPress={() =>Actions.editRecipe({recipe: this.props.recipe})}
                /> :
                <View/>
            }
          </View>
          <RecipeCard
            title={this.props.recipe.introduction.title}
            image={this.props.recipe.introduction.photo}
            height={this.state.width * 0.8}
            width={this.state.width}
          />
          <View style={{padding: 5, paddingLeft: 15, justifyContent: 'flex-start', width}}>
            <Text style={{fontWeight: '200', fontSize: 14, color: 'rgb(148,148,148)'}}>{this.props.recipe.introduction.description}</Text>
          </View>
          <View style={styles.optionContainer}>
            <TouchableHighlight
              style={[styles.option, {marginRight: 5}]}
              underlayColor={'rgb(169,169,169)'}
              onPress={() => {this.setState({activeView: 1})}}>
              <Text style={this.state.activeView === 1 ? styles.activeText : styles.optionText}>Ingredients</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.option, {marginLeft: 5}]}
              underlayColor={'rgb(169,169,169)'}
              onPress={() => {this.setState({activeView: 2})}}>
              <Text style={this.state.activeView === 2 ? styles.activeText : styles.optionText}>Instructions</Text>
            </TouchableHighlight>
          </View>
          {
            this.state.activeView === 1 ?
              <Ingredients
                ingredients={this.props.recipe.ingredients}
                height={this.state.width * 1.4}
                width={this.state.width}
              /> :
              <Instructions
                instructions={this.props.recipe.instructions}
                height={this.state.width * 2}
                width={this.state.width}
              />
          }
        </View>
      </ScrollView>
    )
  }
}

ViewRecipe.propTypes = {
  uid: React.PropTypes.string,
  recipe: React.PropTypes.object,
  onLoad: React.PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60
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
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'sans-serif',
    color: 'white'
  },
  activeText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'sans-serif',
    color: 'rgb(80, 200, 180)'
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    uid: state.auth.uid,
    recipe: ownProps.recipe,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => {

    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewRecipe)
