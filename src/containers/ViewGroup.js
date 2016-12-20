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
import Add from '../components/Add'

const {height, width} = Dimensions.get('window')

class ViewGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.memberContainer}>
          <ScrollView horizontal>
            <Icon.Button
              name='share'
              size={25}
              backgroundColor='transparent'
              underlayColor='transparent'
              borderRadius={0}
              iconStyle={{padding: 5, marginRight: 0, color: 'rgb(105,105,105)'}}
              onPress={() => Actions.sharableRecipes({group: this.props.group})}>
              <Text>Share</Text>
            </Icon.Button>
            {
              this.props.group.members.map((member, i) => {
                return (
                  <View key={`member-${i}`} style={{marginLeft: 25}}>
                    <Image
                      source={{uri: member.photo}}
                      style={{height: 50, width: 50, borderRadius: 50}}
                      resizeMode={'cover'}
                    />
                    <Text style={{fontSize: 9}}>{member.name}</Text>
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
        <ScrollView>
        {
          this.props.group.shared ? this.renderRecipes() : <View/>
        }
        <Add width={width}/>
        </ScrollView>
      </View>
    )
  }

  renderRecipes() {
    return (
      this.props.group.shared.map((recipe, i)=>{
        return (
          <TouchableHighlight
            key={`recipe-${i}`}
            underlayColor={'rgb(169,169,169)'}
            onPress={()=> {
              Actions.viewRecipe({recipe: recipe})
            }}>
            <View>
              <RecipeCard
                title={recipe.introduction.title}
                image={recipe.introduction.photo}
                height={width * 0.3}
                width={width}
              />
            </View>
          </TouchableHighlight>
        )
      })
    )
  }
}

ViewGroup.propTypes = {
  uid: React.PropTypes.string,
  group: React.PropTypes.object,
  onLoad: React.PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 60
  },
  memberContainer: {
    width,
    height: 75,
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: 'rgb(142,142,142)'
  },
  recipeContainer: {
    width
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    uid: state.auth.uid
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
)(ViewGroup)
