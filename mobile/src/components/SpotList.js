import React, { useEffect, useState } from 'react'
import { withNavigation } from 'react-navigation'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import api from '../services/api'


 function SpotList({ tech, navigation }){
const [spots, setSpots] = useState([])

  useEffect(() => {
    async function loadSpots(){
      const response = await api.get('/spots', {
        params: { tech }
      })

      setSpots(response.data)
    }
    loadSpots(); 
  }, []);

  function hadleNavigate(id){
    navigation.navigate('Book', { id })
  }

  return (
    <View style={style.container} >
      <Text style={style.title} >Empresas que usam <Text style={style.span}>{tech}</Text> </Text>
      <FlatList 
      style={style.list}
      data={spots}
      keyExtractor={spots => spots._id }
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={style.listItem}>
        <Image 
        style={style.image}
        source={{ uri: item.thumbnail_url }} 
        /> 
        <Text style={style.company}> {item.company} </Text>
        <Text style={style.price}> {item.price ? `RS${item.price}/dia`:`GRATUITO`} </Text>
        <TouchableOpacity onPress={() => hadleNavigate(item.id)} style={style.buttom}>
        <Text style={style.buttonText}>Solicitar reserva</Text>
        </TouchableOpacity> 
        </View>

      )}
      />
    </View>

  )
}

const style = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  title:{
    fontSize: 20,
    color: '#444',
    paddingHorizontal:20,
    marginBottom: 15,
  },
  span:{
    fontWeight: 'bold',
  },
  list:{
    paddingHorizontal: 20,

  },
  listItem:{
    marginRight:15,
  },
  image:{
    width: 200,
    height:120,
    resizeMode: 'cover',
    borderRadius:2
  },
  company:{
    fontSize:24,
    fontWeight:'bold',
    color:'#333',
    marginTop:10
  },
  price:{
    fontSize: 15,
    color: '#999',
    marginTop: 5
  },
  buttom:{
    height: 32,
    backgroundColor: '#f05a5b',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 2,
    marginTop: 15
  },
  buttonText:{
    color:'#fff',
    fontWeight: 'bold',
    fontSize:16
  }
});

export default withNavigation(SpotList);