import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableOpacity,ScrollView,Image} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../../slices/auth';
import { createDrawerNavigator } from '@react-navigation/drawer';
import axios from "axios"
import { fetchPosts, selectIsPosts, selectIsStatus } from '../../../slices/post';
import { serth_1 } from './thanks_post';
import Icons_Posts from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchPostsList } from '../../../slices/post_list';
import { fetchCommentsList, selectIsComment } from '../../../slices/comment';



const Drawer = createDrawerNavigator();

export default function Forum() {
  async function getPosts() {
    const less = await AsyncStorage.getItem('less')
    const jsonLess = await JSON.parse(less);
    const data =  await dispath(fetchPosts(jsonLess));
  }

useEffect(() => {
  getPosts()
},[]) 


  const navigatioin = useNavigation()
  const dispath = useDispatch()
  const serth = useSelector(selectIsPosts)
  const  posts = serth.items
  const PostStatus = serth.status == 'loading'
  let  isRefreshing = false
  async  function obnov () {

      getPosts()
      isRefreshing == true
   }
   function setting() {
    navigatioin.navigate("Настройка форума")
  }

    async function list_post(post) {
     await dispath(fetchPostsList(post._id));
    navigatioin.navigate("Страница поста")
  }

  const mappedList = PostStatus ? (
    <View>
    <View key={0} style={styles.cart_forum}>
      <Text style={styles.title}></Text>
      <Text style={styles.text}></Text>
      <Text>Тема: </Text>
      <Text>Автор вопроса: </Text>
    </View>
    <View key={1} style={styles.cart_forum}>
      <Text style={styles.title}></Text>
      <Text style={styles.text}></Text>
      <Text>Тема: </Text>
      <Text>Автор вопроса: </Text>
    </View>
    </View>
  ) : (
    posts.map((post, index) => (
      <TouchableOpacity key={index} onPress={() => list_post(post)}>
      <View style={styles.post}>
      {post.image && <Image style={styles.image} source={{uri: `http://192.168.3.8:3030${post.image}`}} />}
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.tags}>Тема: {post.tags}</Text>
        <Text style={styles.author}>Автор вопроса: {post.user.fullname} {post.user.surname} {post.user.class}</Text>
      </View>
    </TouchableOpacity>
    ))
  );


  return (
      
      <View style={styles.formContainer}>
   <ScrollView>
    <View>
      <View style={styles.cart_setting_posts}>
      <View style={styles.container}>
        <View style={styles.view}> 
          <View style={styles.view_1}>
            <View style={styles.view_1_1}>
            <TextInput style={styles.input}
        placeholder="Найти пост..."
        autoCorrect={false}/>
            </View>
            <View style={styles.view_1_1}>
            <TouchableOpacity style={styles.btn_new_post}>
           <Icons_Posts style={styles.icon} name={'search1'} />
           </TouchableOpacity> 
           </View>
             </View>
      </View>
      <View style={styles.view}>   
      
        </View>
        <View style={styles.view}>  
        <TouchableOpacity style={styles.btn_new_post}  onPress={() =>setting()} >
           <Icons_Posts style={styles.icon} name={'setting'} />
           </TouchableOpacity> 
        </View>
         <View style={styles.view}> 
         <TouchableOpacity style={styles.btn_new_post} onPress={() =>obnov()} >  
           <Icons_Posts style={styles.icon} name={'reload1'} />
           </TouchableOpacity> 
        </View>

          </View>
      </View>
  {mappedList}
    </View>
    </ScrollView>
    </View>
  );
}

;

const styles = StyleSheet.create({
  icon: {
    fontSize: 23
  },
  container: {
    flexDirection: 'row', // Горизонтальная ориентация
    justifyContent: 'space-between', // Распределение элементов с равными отступами
    alignItems: 'center', // Выравнивание элементов по центру по вертикали
  }, 
  view_1_1: {
    marginLeft: 1,
    marginRight: 1, // Отступы между элементами
  },
  view_1:{
     flexDirection: 'row',
     justifyContent: 'space-between', // Распределение элементов с равными отступами
     alignItems: 'center', // Выравнивание элементов по центру по вертикали
     
  } ,
  view: {

    marginLeft: 10,
    marginRight: 10, // Отступы между элементами
  },
  cart_setting_posts: {
    justifyContent: 'center',
    alignItems: 'center', // Выравнивание элементов по центру по вертикали
    height: 50,
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerr: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  post: {
     backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 11,
    marginBottom: 5,
    marginTop: 5,
    padding: 20,
    width: '100%',
  },
  image: {
    borderRadius: 2,
    height: 200,
    marginBottom: 20,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  tags: {
    color: '#888',
    fontSize: 14,
    marginBottom: 10,
  },
  author: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  input: {
    fontSize: 16,
    color: '#333',
    lineHeight: 20,
    textAlign: 'left',
    borderWidth: 0.5,
    borderColor: 'black',
    width: 200,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden'
  }
  });