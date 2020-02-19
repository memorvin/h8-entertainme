import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN_USER, REGISTER_USER } from '../store//actionTypes'

export default function LoginForm(props) {

  const [loginUser, { loading, error, data }] = useMutation(LOGIN_USER)
  const [registerUser] = useMutation(REGISTER_USER)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    console.log(data)
    console.log(error)
  }, [data, error])

  const handleLogin = () => {
    loginUser({
      variables: {
        email,
        password
      }
    })
  }

  const handleRegister = () => {
    registerUser({
      variables: {
        name,
        email,
        password
      }
    })
    console.log(data)
    console.log(error)
  }

  const resetForm = () => {
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.inputBox}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TextInput style={styles.inputBox}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput style={styles.inputBox}
        placeholder="**********"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleLogin}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleRegister}>Register</Text>
      </TouchableOpacity>
    </View>
  )

}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center',
    // backgroundColor: ''
  },
  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#1c313a',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }
})  