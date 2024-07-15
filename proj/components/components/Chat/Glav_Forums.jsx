import React, { Component, useEffect } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Forum from './Forum.jsx';
import Do_Posts from './Do_Posts.jsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Setting_Forum from './Setting_Forum.jsx';
import { selectIsAuth } from '../../../slices/auth.js';
import { useDispatch, useSelector } from 'react-redux';
import Thanks_post from './thanks_post.jsx';
import { selectIsPosts } from '../../../slices/post.js';
import List_Post from './List_Post.jsx';

const Stack = createNativeStackNavigator();


export default function Glav_Forums() {
  const isAuth = useSelector(selectIsAuth)

 
    return (
      <View style={styles.f}>
     {isAuth
      ?
     <Stack.Navigator>
          <Stack.Screen
        name="Форум"
        component={Forum}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Создание поста"
        component={Do_Posts}
      />
       <Stack.Screen
        name="Настройка форума"
        component={Setting_Forum}
      />
       <Stack.Screen
        name="Спасибо за пост"
        component={Thanks_post}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Страница поста"
        component={List_Post}
      />
    </Stack.Navigator>
       : 
       <View>
         <Text>Авторизуйтесь или зарегистрируйтесь</Text>
       </View>
     
     }
     </View>
    )
  }

const styles = StyleSheet.create({
  f: {
    flex: 1
  }
})
