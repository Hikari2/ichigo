import ReduxThunk from 'redux-thunk'
import * as firebase from 'firebase'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk'

const config = {
  apiKey: 'AIzaSyB-sM8hOLtH9NzbNLjt5MzdFTQ6jGPYYEE',
  authDomain: 'ichigo-f330d.firebaseapp.com',
  databaseURL: 'https://ichigo-f330d.firebaseio.com',
  storageBucket: 'ichigo-f330d.appspot.com',
  messagingSenderId: '44348448997'
}
const firebaseApp = firebase.initializeApp(config)
