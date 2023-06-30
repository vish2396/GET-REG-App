import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAWgkt0yNGKURn-O7yoRJoLUam4jFJTD8I",
    authDomain: "user-registration-app-26176.firebaseapp.com",
    projectId: "user-registration-app-26176",
    storageBucket: "user-registration-app-26176.appspot.com",
    messagingSenderId: "482669044555",
    appId: "1:482669044555:web:2dca01902510365c2bfece",
    measurementId: "G-DS8NN59PVZ"
  };

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  export {auth}
  