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
import Icon from 'react-native-vector-icons/FontAwesome'
import Video from 'react-native-video'

class ViewRecipePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      steps: props.recipe.steps
    }
  }

  componentDidMount() {
    let steps = this.state.steps
    steps.forEach((step, i) => {
      steps[i].paused = true
      steps[i].volume = 1.0
      steps[i].muted = true
    })
    this.setState({steps})
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
        <View style={styles.pictureContainer}>
          {this.props.recipe.photo ?
            <Image source={{uri: this.props.recipe.photo.path}} style={styles.picture} resizeMode={'contain'}/> :
            <Image source={require('../assets/placeholder.png')} style={styles.picture} resizeMode={'contain'}/>
          }
        </View>
        <View style={[styles.metaContainer, {borderBottomWidth: 1, borderColor: 'grey', marginBottom: 5}]}>
          <Text style={{fontSize: 20, fontWeight: '600', fontFamily: 'sans-serif'}}>{this.props.recipe.title}</Text>
          <Text style={{fontSize: 14, fontWeight: '400', fontFamily: 'sans-serif'}}>{this.props.recipe.description}</Text>
        </View>
          <View style={{borderBottomWidth: 1, borderColor: 'grey', marginBottom: 5}}>
            <Text style={{fontSize: 20, fontWeight: '700', fontFamily: 'sans-serif'}}>Ingredients:             </Text>
            {
              this.props.recipe.ingredients ?
              this.props.recipe.ingredients.map((ingredient, i) => {
                return(
                  <View style={styles.ingredient} key={`ing-${i}`}>
                    <Text style={{fontSize: 14, fontWeight: '300', fontFamily: 'sans-serif'}}>{ingredient.name}</Text>
                    <Text style={{fontSize: 14, fontWeight: '300', fontFamily: 'sans-serif'}}>{ingredient.amount}</Text>
                    <Text style={{fontSize: 14, fontWeight: '300', fontFamily: 'sans-serif'}}>{ingredient.unit}</Text>
                  </View>
                )
              }) : <View/>
            }
          </View>
          <View>
            <Text style={{fontSize: 20, fontWeight: '700', fontFamily: 'sans-serif'}}>Instructions:             </Text>
            {
              this.state.steps ?
              this.state.steps.map((step, i) => {
                return(
                  <View style={styles.instruction} key={`ing-${i}`}>
                    <Text style={{fontSize: 16, fontWeight: '500', fontFamily: 'sans-serif'}}>Step-{i+1}</Text>
                    <Text style={{fontSize: 16, fontWeight: '300', fontFamily: 'sans-serif'}}>{step.instruction}</Text>
                    <TouchableHighlight style={styles.videoContainer} onPress={() => {
                      let steps = this.state.steps
                      steps[i].paused = !steps[i].paused
                      this.setState({steps})
                    }}>
                    <View style={styles.pictureContainer}>
                    {
                      step.paused ? <Image source={require('../assets/play.png')} style={styles.play} resizeMode={'contain'}/> :
                        <Video source={{uri: step.video}}
                               style={styles.video}
                               rate={1.0}
                               paused={step.paused}
                               volume={step.volume}
                               muted={step.muted}
                               resizeMode={'contain'}
                               onLoad={this.onLoad}
                               onProgress={this.onProgress}
                               onEnd={() => { console.log('Done!') }}
                               repeat={true} />
                      }
                    </View>
                    </TouchableHighlight>
                  </View>
                )
              }) : <View/>
            }
          </View>
          <View>
            <Text style={{fontSize: 20, fontWeight: '700', fontFamily: 'sans-serif'}}>Author:</Text>
            <Text style={{fontSize: 16, fontWeight: '200', fontFamily: 'sans-serif'}}>{this.props.recipe.author}</Text>
            <Text style={{fontSize: 16, fontWeight: '200', fontFamily: 'sans-serif'}}>{this.props.recipe.email}</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 75,
    backgroundColor: '#ffffff',
  },
  pictureContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  picture: {
    height: 200,
    width: 200
  },
  metaContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  ingredientsContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  ingredient: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 2
  },
  video: {
    height: 300,
    width: 300,
    borderColor: 'black',
    borderWidth: 1
  },
  play: {
    height: 100,
    width: 100,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'rgb(119,212,197)'
  },
  instructionsContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  instruction: {

  },
  creditContainer: {
    flex: 1,
    justifyContent: 'center'
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    recipe: ownProps.recipe
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewRecipePage)
