import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableOpacity, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from "axios"
import { useNavigation } from '@react-navigation/native';




export default function Regis() {
    const [fullname, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [patronymic, setPatronymic] = useState('')
    const [numclass, setNumClass] = useState('')
    const [bukvclass, setBukvClass] = useState('')
    const [email, setMail] = useState('')
    const [password, setPassword] = useState('')
    const navigatioin = useNavigation()
function HandlerSubmit() {
    const userData = {
        fullname: fullname,
        surname: surname,
        patronymic: patronymic,
        class: `${numclass} ${bukvclass}`,
        email: email,
        password: password
    }
    //192.168.3.8 дача
    //192.168.0.104 дом
    axios.post("http://192.168.3.8:3030/auth/register", userData)
    .then((res) => {
      navigatioin.navigate("Авторизация")
      Alert.alert('Вы зарегистрированы!')
      console.log(userData)
      console.log(res.data)
    })
    .catch(e => {
      Alert.alert(`${e}`)
      console.log(e)
    })

  
}
function Auth() {
  navigatioin.navigate("Авторизация")
}
  return (
    <View style={styles.formContainer}>
    <Text style={styles.H1_auth}>Регистрация</Text>
    <TextInput
     style={styles.input}
      placeholder="Фамилия"
      value={surname}
      onChangeText={setSurname}
    />
    <TextInput
     style={styles.input}
      placeholder="Имя (полное)"
      value={fullname}
      onChangeText={setName}
    />
    <TextInput
     style={styles.input}
      placeholder="Отчетсво"
      value={patronymic}
      onChangeText={setPatronymic}
    />
     <Text>Класс (цифра):</Text>
      <Picker
        selectedValue={numclass}
        style={styles.input}
        onValueChange={(itemValue) => setNumClass(itemValue)}
      >
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
        <Picker.Item label="10" value="10" />
        <Picker.Item label="11" value="11" />
      </Picker>
      <Text>Класс (буква):</Text>
      <Picker
        selectedValue={bukvclass}
        style={styles.input}
        onValueChange={(itemValue) => setBukvClass(itemValue)}
      >
        <Picker.Item label="А" value="А" />
        <Picker.Item label="Б" value="Б" />
        <Picker.Item label="В" value="В" />
        <Picker.Item label="Г" value="Г" />
        <Picker.Item label="Д" value="Д" />
      </Picker>
    <TextInput
     style={styles.input}
      placeholder="Email"
      value={email}
      onChangeText={setMail}
    />
    <TextInput
    style={styles.input}
      placeholder="Пароль"
      value={password}
      secureTextEntry
      onChangeText={setPassword}
      aria-label='Пароль'
    />
    <TouchableOpacity onPress={() => HandlerSubmit()} style={styles.button}>
        <View>
            <Text style={styles.btn_text}>Зарегистрироваться</Text>
        </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() =>Auth()} >
        <View>
            <Text >Авторизация</Text>
        </View>
    </TouchableOpacity>
  </View>
  );
}


;
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