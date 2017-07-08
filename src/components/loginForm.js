import React, { Component } from 'react'
import firebase from 'firebase'
import { Text } from 'react-native'
import { Button, Card, CardSection, InputField } from './common'

class LoginForm extends Component {
  state = { eMail: '',
            password: '',
            error: ''
          }
  onButtonPress() {
    const { eMail, password } = this.state
    this.setState({ error: '' })

    firebase.auth().signInWithEmailAndPassword(eMail, password)
      .catch( () => {
        firebase.auth().createUserWithEmailAndPassword(eMail, password)
          .catch( () => {
            this.setState({ error: 'Authentication failed.' })
          })
      })

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
          <Button onPress={this.onButtonPress.bind(this)} >
            Login
          </Button>
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
