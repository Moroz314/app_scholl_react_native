import React, { Component, useState } from 'react'
import { Text, StyleSheet, View ,TextInput,TouchableOpacity, Alert} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreatePosts, fetchPosts, selectIsPosts } from '../../../slices/post'
import { useNavigation } from '@react-navigation/native';
import axios from "../../../axios/axios"
import {Picker} from '@react-native-picker/picker';

export default function Do_Posts() {
    const dispath = useDispatch()
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [tags, setTags] = useState("математика")
    const navigatioin = useNavigation()

     async function DoPosts () {
      const ModelPost = {
        title: title,
        text: text,
        tags: tags
      }
      axios.post("/posts", ModelPost).then((res) => {
        console.log(res.data)
      })
      .catch(e => {
        Alert.alert(`${e}`)
        console.log(e)
      })
   
      async function getPosts() {
        const data =  await dispath(fetchPosts());

    }
        getPosts()
        navigatioin.navigate("Спасибо за пост")
    }  
    return (
      <View style={styles.formContainer}>
        <Text style={styles.H1_auth}> Создайте пост </Text>
        <Text>Заголовок поста:</Text>
        <TextInput
    style={styles.input}
      placeholder="Заголовок"
      value={title}
      onChangeText={setTitle}
    />
      <Text>Текст поста:</Text>
     <TextInput
    style={styles.input}
      placeholder="Текст"
      value={text}
      onChangeText={setText}
    />
    <Text>Тема поста:</Text>
    <Picker
        selectedValue={tags}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => setTags(itemValue)}
      >
        <Picker.Item label="математика" value="математика" />
        <Picker.Item label="русский язык" value="русский язык" />
        <Picker.Item label="физика" value="физика" />
        <Picker.Item label="ОБЖ" value="ОБЖ" />
        <Picker.Item label="литература" value="литература" />
        <Picker.Item label="информатика" value="информатика" />
        <Picker.Item label="история" value="история" />
        <Picker.Item label="география" value="география" />
        <Picker.Item label="биология" value="биология" />
        <Picker.Item label="физкультура" value="физкультура" />
        <Picker.Item label="английский язык" value="английский язык" />
        <Picker.Item label="история СПБ" value="история СПБ" />
        <Picker.Item label="музыка" value="музыка" />
        <Picker.Item label="ИЗО" value="ИЗО" />
        <Picker.Item label="технология(черчение)" value="технология(черчение)" />
      </Picker>
    <TouchableOpacity onPress={() => DoPosts()}  style={styles.button}>
        <View>
            <Text style={styles.btn_text}>Создать</Text>
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
