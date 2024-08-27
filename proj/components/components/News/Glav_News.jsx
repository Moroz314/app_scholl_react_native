import React, { Component, useEffect } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { selectIsAuth } from '../../../slices/auth.js';
import { useDispatch, useSelector } from 'react-redux'
import { selectIsPosts } from '../../../slices/post.js';
import Do_News from './Do_News.jsx';
import News from './News.js';
import Thanks_post from './thanks_post.jsx';
import List_News from './List_News.jsx';

const Stack = createNativeStackNavigator();


export default function Glav_News() {
  const isAuth = useSelector(selectIsAuth)

 
    return (
      <View style={styles.f}>
     {isAuth
      ?
     <Stack.Navigator>
          <Stack.Screen
        name="Новости"
        component={News}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Создание поста новостей"
        component={Do_News}
      />
       <Stack.Screen
        name="Спасибо за пост"
        component={Thanks_post}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Страница поста новости"
        component={List_News}
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
