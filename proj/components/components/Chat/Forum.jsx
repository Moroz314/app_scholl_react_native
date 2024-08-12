import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableOpacity,ScrollView,Image} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../../slices/auth';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { fetchPosts, selectIsPosts, selectIsStatus } from '../../../slices/post';
import { serth_1 } from './thanks_post';
import Icons_Posts from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchPostsList, fetchPostsMinusLike, fetchPostsPlusLike } from '../../../slices/post_list';
import { fetchCommentsList, selectIsComment } from '../../../slices/comment';
import LikePost from 'react-native-vector-icons/AntDesign';
import axios from '../../../axios/axios';



const Drawer = createDrawerNavigator();

export default function Forum() {

 

  async function getPosts() {
    const less = await AsyncStorage.getItem('less')
    const jsonLess = await JSON.parse(less);
    const data =  await dispath(fetchPosts(jsonLess));
    handleSearch()
  }


useEffect(() => {

  getPosts()
},[]) 

  const [query, setQuery] = useState('');

  const navigatioin = useNavigation()
  const dispath = useDispatch()
  const serth = useSelector(selectIsPosts)
  const  posts = serth.items || []

  const PostStatus = serth.status == 'loading'
  let  isRefreshing = false




  const handleSearch = (text) => {
    setQuery(text);
    if (text) {
      console.log(true)
      const adwdawd = posts.filter(post => post.title.toLowerCase().includes(text.toLowerCase()));
      setFilteredPosts(adwdawd);
    } else {
      setFilteredPosts(posts);
    }
  };
  const [filteredPosts, setFilteredPosts] = useState(posts);

  async  function obnov () {
    handleSearch()
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

    <View key={1} style={styles.cart_forum}>
      <Text style={styles.title}></Text>
      <Text style={styles.text}></Text>
      <Text>Тема: </Text>
      <Text>Автор вопроса: </Text>
    </View>

  ) : (
    filteredPosts.map((post, index) => (

      <TouchableOpacity key={index} onPress={() => list_post(post)}>
      <View style={styles.post}>
      {post.image && <Image style={styles.image} source={{uri: `http://192.168.0.106:3030${post.image}`}} />}
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.tags}>Тема: {post.tags}</Text>
        <Text style={styles.author}>Автор вопроса: {post.user.fullname} {post.user.surname} {post.user.class}</Text>
        
      <TouchableOpacity style={styles.like_btn} key={index} onPress={() => {
          let like = false
        

        async function PostLike() {
          setLike(!like)

          if(like == true){
            await dispath(fetchPostsPlusLike(post._id));
            getPosts()
          } else {
            await dispath(fetchPostsMinusLike(post._id))
            getPosts()
          }
        }

        PostLike()
      }}>
        <View><LikePost style={styles.heart}  name='like1' /></View>
        <View><Text>{post.like}</Text></View>
      </TouchableOpacity>
    
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
            <TextInput 
            style={styles.input}
            placeholder="Найти пост по названию..."
            value={query}
            onChangeText={handleSearch}
            />
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
  formContainer:{
    backgroundColor: '#FFDEAD'
  },
  like_btn:{
    
    flexDirection: 'row',
    justifyContent: 'left', // Распределение элементов с равными отступами
    alignItems: 'center', // Выравнивание элементов по центру по вертикали
    marginTop: 10
  },
  heart: {
    color: '#FFEBCD',
    fontSize: 30,
    justifyContent: 'center', // Распределение элементов с равными отступами
    alignItems: 'center', // Выравнивание элементов по центру по вертикали

  },
  icon: {
    fontSize: 23,
    color: '#D2691E'
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
    borderWidth: 1,
    borderColor: '#D2691E',
    justifyContent: 'center',
    alignItems: 'center', // Выравнивание элементов по центру по вертикали
    height: 50,
    backgroundColor: '#F4A460',
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
     backgroundColor: '#F4A460',
    borderColor: '#D2691E',
    borderWidth: 1,

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
    color: '#D2691E',
    fontSize: 14,
    marginBottom: 10,
  },
  author: {
    color: '#FFEBCD',
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
    width: 240,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden'
  }
  });