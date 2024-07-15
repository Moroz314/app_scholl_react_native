import { useNavigation } from '@react-navigation/native'
import React, { Component, useEffect } from 'react'
import { Text, StyleSheet, View ,TouchableOpacity} from 'react-native'
import { fetchPosts, selectIsPosts } from '../../../slices/post'
import { useDispatch, useSelector } from 'react-redux'



export default function Thanks_post(){
    const dispath = useDispatch()
    const navigatioin = useNavigation()
    const GoHome = async ()  => {
        navigatioin.navigate("Форум")
      }  
      async function getPosts() {
        await dispath(fetchPosts());
    }
    

    useEffect(() => {
        getPosts()
    }, [])
    
    return (
      <View>
        <Text> Спасибо за пост!</Text>
       <TouchableOpacity onPress={() => GoHome()}  style={styles.button}>
       <View>
           <Text style={styles.btn_text}>Вернуться на форум</Text>
       </View>
   </TouchableOpacity>
   </View>
    )
  }

const styles = StyleSheet.create({})
