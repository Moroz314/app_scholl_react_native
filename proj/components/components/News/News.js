import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableOpacity,ScrollView} from 'react-native';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../../slices/auth';
import Item from './IItem';





export default function News() {
    const [onclick, awdOnCawdlick] = useState(false)


    function onclicck() {
        awdOnCawdlick(!onclick)
    }
    const isAuth = useSelector(selectIsAuth)
  

    return (
      <View>
      {isAuth 
        ?<View>
   <ScrollView>
    <View>
        <Item />
        <Item />
        <Item />
    </View>
    </ScrollView>
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
