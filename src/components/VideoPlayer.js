import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native'
import Video from 'react-native-video'

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paused: true,
      voluem: 1,
      muted: true,
      loading: false,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => {
          this.setState({paused: !this.state.paused})
        }}>
          {
            this.state.paused ?
              <Image source={require('../assets/play.png')} style={{height: this.props.height, width: this.props.width}} resizeMode={'center'}/> :
              <Video source={{uri: this.props.src}}
                     style={{height: this.props.height, width: this.props.width}}
                     rate={1.0}
                     paused={this.state.paused}
                     volume={this.state.volume}
                     muted={this.state.muted}
                     resizeMode={'cover'}
                     onLoad={() => {this.setState({loading: true})}}
                     onProgress={this.onProgress}
                     onEnd={() => { this.setState({paused: true}) }}
                     repeat={false}/>
            }
        </TouchableHighlight>
      </View>
    )
  }
}

VideoPlayer.propTypes = {
  src: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'gray'
  }
})
