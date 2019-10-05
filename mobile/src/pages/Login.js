import React, { useState, useEffect } from 'react'
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Text, Image, StyleSheet, TextInput, TouchableOpacity  } from 'react-native'
import logo from '../../assets/logo.png'
import api from '../services/api'

export default function Login({ navigation }){
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  // useEffect(() => {
  //   AsyncStorage.getItem('user').then(user => {
  //     if(user){
  //       navigation.navigate('List')
  //     }
  //   })
  // }, [])


  async function handleSubmit(){
    const response = await api.post('/sessions', {
      email
    })

    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs);

    navigation.navigate('List');

  }


  return (
  <KeyboardAvoidingView enabled={Platform.OS=='ios'} behavior="padding"  style={style.container}>
    <Image source={logo} />
    <View style={style.form} >  
    <Text style={style.label}> Seu Email *</Text>
    <TextInput
    style={style.input}
    placeholder="Seu email"
    placeholderTextColor="#999"
    keyboardType="email-address"
    autoCapitalize="none"
    autoCorrect={false}
    value={email}
    onChangeText={text =>setEmail(text)}
    />

    <Text style={style.label}> Tecnologias *</Text>
    <TextInput
    style={style.input}
    placeholder="Tecnologias de interesse"
    placeholderTextColor="#999"
    autoCapitalize="words"
    autoCorrect={false}
    onChangeText={setTechs}
    />

    <TouchableOpacity onPress={handleSubmit} style={style.buttom}>
      <Text style={style.buttonText}>Encontrar spots</Text>
    </TouchableOpacity>
    </View>
  </KeyboardAvoidingView>
  );
  
}
const style = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center'
  },
  form:{
    alignSelf:'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  input:{
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2,

  },
  label:{
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,

  },
  buttom:{
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 2,

  },
  buttonText:{
    color:'#fff',
    fontWeight: 'bold',
    fontSize:16
  }
});