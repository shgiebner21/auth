import React, { Component } from 'react'
import { View } from 'react-native'
import firebase from 'firebase'
import { Header } from '../components/common'
import LoginForm from '../components/loginForm'

class App extends Component {
  componentWillMount() {
    firebase.initializeApp( {
    apiKey: 'AIzaSyBhM99Sv6dKrrXb_qZeXxlTVzFdyX193-k',
    authDomain: 'auth-527bd.firebaseapp.com',
    databaseURL: process.env.DB_URL_SECRET,
    projectId: 'auth-527bd',
    storageBucket: process.env.BUCKET_SECRET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID_SECRET
  } )
}

  render() {
    return (
      <View>
        <Header headerText='Authentication'/>
        <LoginForm />
      </View>
    )
  }
}

export default App
