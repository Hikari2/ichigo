import Video from 'react-native-video'

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
    <Text style={{fontSize: 20, fontWeight: '700', fontFamily: 'sans-serif'}}>Author:</Text>
    <Text style={{fontSize: 16, fontWeight: '200', fontFamily: 'sans-serif'}}>{this.props.recipe.author}</Text>
    <Text style={{fontSize: 16, fontWeight: '200', fontFamily: 'sans-serif'}}>{this.props.recipe.email}</Text>
  </View>























  <View style={styles.photoWrapper}>
    {this.state.photo ?
      <Image source={{uri: this.state.photo.path}} style={{height: 200, width: 200}} /> :
      <Icon.Button
        name='camera'
        size={25}
        backgroundColor='rgb(119,212,197)'
        style={{borderRadius: 0}}
        iconStyle={{padding: 5, marginRight: 0, color: 'rgb(105,105,105)'}}
        onPress={() => this.addPhoto()}>
          <Text>Add picture</Text>
      </Icon.Button>
    }
  </View>
  <Form
    ref='recipeHeader'
    type={RecipeHeader}
    options={options}
    value={this.state.value}
    onChange={(value)=> this.setState({value})}
  />
  <View style={styles.ingredientsContainer}>
    <Text
      size={16}
      style={{
        fontWeight: '400',
        fontSize: 16,
        color: 'rgb(61, 193, 172)'
      }} >
      Ingredients
    </Text>
    {this.renderIngredients()}
    <Icon.Button
      name='plus'
      underlayColor='rgb(55, 174, 154)'
      backgroundColor='transparent'
      color='white'
      style={{borderRadius: 0, width: 40, backgroundColor: 'rgb(138,218,205)'}}
      iconStyle={{marginRight: 0}}
      onPress={() => {
        let ingredients = this.state.ingredients
        ingredients.push({
          name: ' ',
          amount: ' ',
          measure: ' '
        })
        this.setState({ingredients})
      }}>
    </Icon.Button>
  </View>
  {this.renderSteps()}
  <Icon.Button
    name='plus'
    underlayColor='rgb(55, 174, 154)'
    backgroundColor='transparent'
    color='white'
    style={styles.optionButton}
    onPress={() => {
      let steps = this.state.steps
      steps.push({
        instruction: ' '
      })
      this.setState({steps})
    }}>
      <Text size={16} style={styles.optionText} >
        {'Add new step'}
      </Text>
  </Icon.Button>
  <TouchableHighlight
    underlayColor='rgb(55, 174, 154)'
    style={styles.submitButton}
    onPress={()=>{
      const val = this.refs.recipeHeader.getValue()
      if(val) {
        this.props.onSubmit({
          ...this.state.value,
          steps: this.state.steps,
          ingredients: this.state.ingredients,
          photo: this.state.photo ? this.state.photo : ''
        })
      }
      }}>
    <Text style={styles.buttonText}>Save</Text>
  </TouchableHighlight>
