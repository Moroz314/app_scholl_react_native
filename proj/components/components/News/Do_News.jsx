import { useNavigation } from '@react-navigation/native';
import React, { Component, useState } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert ,Platform,Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from "../../../axios/axios";
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

export default function  Do_News() {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [tags, setTags] = useState("математика");
    const [image, setImage] = useState(null);
    const navigation = useNavigation();

    const DoNews = async () => {
        const ModelNews = {
          title: title,
          text: text,
          tags: tags,
          image: image,
        };
    
        try {
          const res = await axios.post("/news", ModelNews);
          console.log(res.data);
          Alert.alert("Пост создан успешно!");
          await dispatch(fetchPosts());
          navigation.navigate("Спасибо за пост");
        } catch (e) {
          Alert.alert(`Ошибка: ${e.message}`);
          console.log(e);
        }
      };

      const pickImage = async () => {
        // Запрос разрешений
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Разрешение на доступ к галерее необходимо!');
            return;
          }
        }
    
        // Открытие галереи для выбора изображения
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        setImage(result.assets[0].uri);
        uploadImage(result.assets[0].uri)
      };
    
      const uploadImage = async (uri) => {
        let filename = uri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        
        let formData = new FormData();
        formData.append('image', { uri, name: filename, type });
    
        try {
          const { data } = await axios.post('/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(`http://192.168.0.106:3030${data.url}`);
          setImage(data.url);
        } catch (error) {
          console.error(error);
        }
      };
      return (
        <View style={styles.formContainer}>
          <Text style={styles.H1_auth}> Создайте поста новости </Text>
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
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.btn_img}>
              <Text>Загрузить изображение для поста...</Text>
            </View>
          </TouchableOpacity>
          {image && <Image source={{uri: `http://192.168.0.106:3030${image}`} } style={{ width: 300, height: 200 }} />}
          <Text>Тема поста:</Text>
          <Picker
            selectedValue={tags}
            style={styles.input}
            onValueChange={(itemValue) => setTags(itemValue)}
          >
            <Picker.Item label="математика" value="математика" />
            <Picker.Item label="русский язык" value="русский язык" />
            <Picker.Item label="физика" value="физика" />
            <Picker.Item label="ОБЖ" value="ОБЖ" />
            <Picker.Item label="литература" value="литература" />
            <Picker.Item label="информатика" value="информатика" />
            <Picker.Item label="история" value="история" />
            <Picker.Item label="география" value="география" />
          </Picker>
          <TouchableOpacity onPress={DoNews} style={styles.button}>
            <View>
              <Text style={styles.btn_text}>Создать</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      btn_img: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 50,
        borderRadius: 5,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
      },
      H1_auth: {
        fontSize: 20,
        marginBottom: 30,
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
        color: '#FFFF',
      },
    });
    