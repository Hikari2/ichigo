import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ScrollView
} from 'react-native'
import VideoPlayer from '../components/VideoPlayer'

export default class Instructions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView>
        <View style={[styles.container, {height: this.props.height, width: this.props.width}]}>
        {
          this.props.instructions.map((instruction, i) => {
            return (
              <View style={[styles.instructionContainer, {width: this.props.width}]} key={`instruction-${i+1}`}>
                <View style={{width: this.props.width, justifyContent: 'flex-start', padding: 2}}>
                  <Text style={[styles.instruction, {fontSize: 19, fontWeight: 'bold'}]}>{`Step ${i+1}`}</Text>
                  <Text style={styles.instruction}>{instruction.description}</Text>
                </View>
                {
                  instruction.video ?
                    <VideoPlayer src={instruction.video} width={this.props.width * 0.95} height={220} /> : <View />
                }
              </View>
            )
          })
        }
        </View>
      </ScrollView>
    )
  }
}

Instructions.propTypes = {
  instructions: React.PropTypes.array,
  height: React.PropTypes.number,
  width: React.PropTypes.number
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  instructionContainer: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgb(206, 206, 206)'
  },
  instruction: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '200',
    color: 'grey'
  }
})
