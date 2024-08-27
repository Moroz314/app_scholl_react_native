
import { createDrawerNavigator } from '@react-navigation/drawer';
import News from './components/News/News';
import { StyleSheet, Text, View , TextInput, Button,TouchableOpacity, TurboModuleRegistry, Image} from 'react-native';
import Forum from './components/Chat/Forum';

import About from './components/about/About';
import { useEffect, useState } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { fetchAuthMe , selectIsAuth, selectIsData} from '../slices/auth';
import Profil from './components/User/Profil';
import { fetchUsers } from '../slices/users';
import { useNavigation } from '@react-navigation/native';
import PlusPost from 'react-native-vector-icons/AntDesign';
import { fetchPosts } from '../slices/post';
import Do_Posts from './components/Chat/Do_Posts';
import Glav_Forums from './components/Chat/Glav_Forums';
import Glav_News from './components/News/Glav_News';



const Drawer = createDrawerNavigator();

export default function Menu() {
    const isAuth = useSelector(selectIsAuth)

    const data = useSelector(selectIsData)
    const adm = '66ce3b1e2690f3f97ad47dcf'
    const [me, setMe] = useState(false)

 

    let [users, setUsers] = useState(false)
    let [news, setNews] = useState(false)
    const navigatioin = useNavigation()
    function goUse() {
        setUsers(users = !users)
        if(users == true){
           navigatioin.navigate("Создание поста")
        }
        if(users == false){
           navigatioin.navigate("Форум")
        }
    }

    function goUseNews() {
        setNews(news = !news)
        if(news == true){
           navigatioin.navigate("Создание поста новостей")
        }
        if(news == false){
           navigatioin.navigate("Новости")
        }
    }
    
    
  
    const dispath = useDispatch()
    async function getUser() {
        const data =  await dispath(fetchAuthMe());
    }
    async function getUsers() {
        const data =  await dispath(fetchUsers());
    }
    async function getPosts() {
        const data =  await dispath(fetchPosts());
    }

    useEffect(() => {
        getUser()
        getUsers()
        getPosts()
    }, [])

    return (
        <Drawer.Navigator screenOptions={{
            drawerStyle: {
                backgroundColor: '#D2691E',
                width: 240,
            },
        }}  initialRouteName="Feed">
              <Drawer.Screen
                name="Профиль"
                component={Profil}
                options={{
                    drawerLabel: 'Профиль' ,headerStyle: {
                        backgroundColor: '#000'
                      } ,headerTintColor: '#fff'}}
            />
             <Drawer.Screen
                name="Информация"
                component={About}
                options={{ drawerLabel: 'Информация',headerStyle: {
                    backgroundColor: '#000'
                  } ,headerTintColor: '#fff' }}
            />
            <Drawer.Screen
                name="Новости 587"
                component={Glav_News}
                options={{ drawerLabel: 'Новости 587',headerStyle: {
                    backgroundColor: '#000'
                  } ,headerTintColor: '#fff',  headerRight: () => (
                    <View>
                       {isAuth ? <TouchableOpacity style={styles.btn_new_post} onPress={() =>goUseNews()} >
                        <View >
                            <Text><PlusPost style={styles.plus} name={'pluscircleo'}/></Text>
                        </View>
                    </TouchableOpacity> : <View></View>}
                    </View>  )}}
            />
             <Drawer.Screen
                name="Форум 587"
                component={Glav_Forums}
                options={{ drawerLabel: 'Форум 587',headerStyle: {
                    backgroundColor: '#000'
                  } ,headerTintColor: '#fff',   headerRight: () => (
                <View>
                   {isAuth ? <TouchableOpacity style={styles.btn_new_post} onPress={() =>goUse()} >
                    <View >
                        <Text><PlusPost style={styles.plus} name={'pluscircleo'}/></Text>
                    </View>
                </TouchableOpacity> : <View></View>}
                </View>
                
                )
            }}
                
            />
        </Drawer.Navigator>
    );
}
const styles = StyleSheet.create({
    screen: {
         color: '#D2691E'
    },
    btn_new_post: {
        marginRight: 28,


    },
    plus:{
        fontSize: 25,
color: '#fff'
    }
})