 import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, selectIsData , logout} from '../../../slices/auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function  Profil() {
    const isAuth = useSelector(selectIsAuth)
    const dispath = useDispatch()
    const navigatioin = useNavigation()
    const data = useSelector(selectIsData)
   

    function Auth() {
      return navigatioin.navigate("Авторизация")
    }
    function Regis() {
      return navigatioin.navigate("Регистрация")
    }
    async function OutAuth() {
      dispath(logout())
      await AsyncStorage.setItem('token', '')
    }
    
  return (
    <View style={styles.formContainer}>

    {isAuth 
    ?<View>
      <View>
        <Text>ФИО:</Text>
        <Text style={styles.H1_auth}>{data.surname} {data.fullname} {data.patronymic}</Text>
        <Text>Класс:</Text>
        <Text style={styles.H1_auth}>{data.class}</Text>
      </View>
     <TouchableOpacity onPress={() => OutAuth()} >
       <View style={styles.button}><Text style={styles.btn_text}>Выйти</Text></View>
     </TouchableOpacity>
  </View>
    : 
     <View>
     <TouchableOpacity onPress={() => Auth()} >
       <View  style={styles.button}><Text style={styles.btn_text}>Войти</Text></View>
     </TouchableOpacity>
     <TouchableOpacity onPress={() => Regis()} >
       <View  style={styles.button}><Text style={styles.btn_text}>Зарегистрироваться</Text></View>
     </TouchableOpacity>
   </View> 
    }

    </View>
  );
}

;

const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 50,
    borderRadius: 5,
    backgroundColor: '#007aff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btn_text: {
   color: '#FFFF'
  },
  text_btn:{
    color: '#FFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
    H1_auth: {
      fontSize: 20,
      marginBottom: 30
    },
    formContainer: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
});
