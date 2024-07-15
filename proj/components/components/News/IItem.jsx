import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View , TextInput, Button, TouchableOpacity, Image} from 'react-native';

export default function Item() {
  return (
    <View>
        <View>
            <Image source={require('./img/img_1.jpg')}/>
        </View>
        <View>
        <Text>Школьный класс обновили</Text>
            <Text>Школьный класс был обновлен с использованием новейших технологий и интерактивных досок, что позволит ученикам более эффективно учиться и вовлекаться в учебный процесс. </Text>
        </View>
    </View>
  );
}

;
