import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableOpacity, Image, Alert} from 'react-native';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../../slices/auth';

export default function About() {


  const isAuth = useSelector(selectIsAuth)
  

  return (
    <View>
    {isAuth 
      ?<View>
          <View>
              <Image source={require('./img/title.jpg')}/>
                <View><Text> </Text></View>
            </View>
    </View>
      : 
        <View>
          <Text>Авторизуйтесь или зарегистрируйтесь</Text>
        </View>
      }
      </View>
  
  );
}

;
