import React, { Component } from 'react'
import firebase from 'firebase'
import { Text } from 'react-native'
import { Button, Card, CardSection, InputField, Spinner } from './common'

class LoginForm extends Component {
  state = { eMail: '', password: '',
            error: '', loading: false
          }
          
  onButtonPress() {
    const { eMail, password } = this.state
    this.setState({ error: '', loading: true })

    firebase.auth().signInWithEmailAndPassword(eMail, password)
      .then( this.onLoginSuccess.bind(this) )
      .catch( () => {
        firebase.auth().createUserWithEmailAndPassword(eMail, password)
          .then( this.onLoginSuccess.bind(this) )
          .catch( this.onLoginFail.bind(this) )
      })
  }

  onLoginSuccess() {
    this.setState(
      { eMail: '', password: '', error: '', loading: false })
  }
  onLoginFail() {
    this.setState(
      { error: 'Authentication failed.', password: '', loading: false })
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size={'small'} />
      }
      return (
        <Button onPress={this.onButtonPress.bind(this)} >
          Login
        </Button>
      )
  }

  render() {
    return (
      <Card>
        <CardSection>
          <InputField onChangeText={ eMail => this.setState(
                        { eMail: eMail }) }
                      value={this.state.eMail}
                      label={'E-Mail'}
                      autoCorrect={false}
                      placeholder={'email@gmail.com'}
          />
        </CardSection>
        <CardSection>
          <InputField onChangeText={ password => this.setState(
                        { password: password } )}
                      value={this.state.password}
                      label={'Password'}
                      placeholder={'passW0rd here'}
                      autoCorrect={false}
                      secureTextEntry={true}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>{this.state.error}</Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    )
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

export default LoginForm
