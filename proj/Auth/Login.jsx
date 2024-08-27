import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, selectIsAuth } from '../slices/auth';
import React, {useState} from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';





export default function Login() {

  const isAuth = useSelector(selectIsAuth)
  const dispath = useDispatch()
  const [email, setMail] = useState('')
  const [password, setPassword] = useState('')
  const navigatioin = useNavigation()

  function Auth() {
    navigatioin.navigate("Регистрация")
  }



  const HandlerSubmit = async ()  => {
    const userAuth = {
      email: email,
      password: password
    }
    const less = {
      drugoe: "другое",
      technology: "технология(черчение)",
      izo: "ИЗО",
       music: "музыка",
       history_SPB: "история СПБ",
      english: "английский язык",
      physical_culture: "физкультура",
     biology: "биология",
      chemistry: "химия",
      geography: "география",
       history: "история",
       informatics: "информатика",
       literature: "литература",
       obg: "ОБЖ",
       physics: "физика",
       russian: "русский язык",
       mathematics: "математика"
     }
    const data =  await dispath(fetchAuth(userAuth));


    if (!data.payload){
    
       return alert('неудалось авторизоваться! awefgaw4ef')

    }

    if ('token' in data.payload) {
      try {
      const jsonLess = JSON.stringify(less);
      await AsyncStorage.setItem('token', data.payload.token)
      await AsyncStorage.setItem('less', jsonLess)
  
    } catch (e) {
      console.log(e)
    }
    }
  }


if(isAuth){
  return navigatioin.navigate("Гимназия 587")
}

  return (
    <View style={styles.formContainer} >
    <Text style={styles.H1_auth}>Авторизация</Text>
    <TextInput
    style={styles.input}
      placeholder="Email"
      value={email}
      onChangeText={setMail}
    />
    <TextInput
    style={styles.input}
      placeholder="Password"
      value={password}
      secureTextEntry
      onChangeText={setPassword}
      aria-label='Пароль'
    />
    <TouchableOpacity onPress={() => HandlerSubmit()}  style={styles.button}>
        <View>
            <Text style={styles.btn_text}>Авторизоваться</Text>
        </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() =>Auth()} >
        <View>
            <Text >Регистрация</Text>
        </View>
    </TouchableOpacity>
  </View>
  );
}


const styles = StyleSheet.create({
  H1_auth: {
    fontSize: 20,
    marginBottom: 30
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
  width: 300,
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
  },
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
  }
}
);