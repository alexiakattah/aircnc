import React, { useState } from "react";
import api from '../services/api.js';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  AsyncStorage,
  SafeAreaView,
  TouchableOpacity,
  Alert

} from "react-native";

export default function Book({ navigation }) {
  const [date, setDate] = useState("");
  const id = navigation.getParam("id");

  async function handleSubmit(){
    const user_id = await AsyncStorage.getItem('user');

    await api.post(`/spots/${id}/bookings`, {
      date,
    }, {
      headers: { user_id }
    })
    Alert.alert('Solicitação de reserva enviada.')

    navigation.navigate('List')
  }

  function handleCancel(){
    navigation.navigate('List')
  }

  return (
    <SafeAreaView style={style.container} >
      <Text style={style.label}> Data de interesse *</Text>
      <TextInput
        style={style.input}
        placeholder="Qual data você quer reservar?"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={text => setDate(text)}
      />
      <TouchableOpacity onPress={handleSubmit} style={style.buttom}>
        <Text style={style.buttonText}>Solicitar reserva</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCancel} style={style.cancelButton}>
        <Text style={style.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container:{
    margin: 30
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
    marginTop:250
  },
  buttom: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },
  cancelButton: {
    height: 42,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginTop: 10
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
});
