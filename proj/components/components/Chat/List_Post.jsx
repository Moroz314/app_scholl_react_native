import React, { Component, useEffect, useState } from 'react'
import { Text, StyleSheet, View ,ScrollView,Image, Button,TextInput,TouchableOpacity,Alert, Modal, PermissionsAndroid} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import axios from "../../../axios/axios"
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsList, selectIsPost } from '../../../slices/post_list';
import { fetchDeletePosts, fetchPosts } from '../../../slices/post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {selectIsCommentAns} from '../../../slices/comment_ans';
import { fetchCommentsAnsList} from '../../../slices/comment_ans';
import { fetchCommentsList, fetchCreateComment, fetchDeleteCommentsList, selectIsComment, selectIsCommentStatus } from '../../../slices/comment';
import { fetchCreateCommentsList } from '../../../slices/creat_comment';
import DeletePost from 'react-native-vector-icons/AntDesign';
import SettingPost from 'react-native-vector-icons/Feather';
import Сorrect from 'react-native-vector-icons/Feather';
import { selectIsData } from '../../../slices/auth';


export default function List_Post() {
  const [setting, setSetting] = useState(false)
  const [text, setText] = useState('')

  const data = useSelector(selectIsData)

  const [me, setMe] = useState(false)

  const [like, setLike] = useState(false)


  const dispatch = useDispatch()

  const navigatioin = useNavigation()

  const post = useSelector(selectIsPost)

  const  items = post.items || []

  
  useEffect(() => {
    if (data._id && items.user && data._id === items.user._id) {
      setMe(true);
    } else {
      setMe(false);
    }
 
   
  }, [data._id, items.user]);
  
  async function createComment() {
    const comment = {
      text: text,
      postId: items._id
    }
    console.log(items._id)
    await axios.post("/comment", comment).then((res) => {
      console.log(res.data)
    })
    .catch(e => {
      Alert.alert(`${e}`)
      console.log(e)
    })
    dispatch(fetchCommentsList(items._id));
    dispatch(fetchCommentsAnsList(items._id))
    setText('')
}

async function createCommentAns(com) {
  const comment = {
    text: text,
    postId: items._id,
    commentId: com
  }
  console.log(items._id, com)
  await axios.post("/comment_ans", comment).then((res) => {
    console.log(res.data)
  })
  .catch(e => {
    Alert.alert(`${e}`)
    console.log(e)
  })
  dispatch(fetchCommentsList(items._id));
  dispatch(fetchCommentsAnsList(items._id))
  setText('')
}

    async function getPosts() {
      const less = await AsyncStorage.getItem('less')
      const jsonLess = await JSON.parse(less);
      const data =  await dispatch(fetchPosts(jsonLess));
    
    }

  async function delete_post() {
    dispatch(fetchDeletePosts(items._id))
    dispatch(fetchDeleteCommentsList(items._id))
    getPosts()
    navigatioin.navigate("Форум")
  }


  useEffect(() => {
    if (items._id) {
      dispatch(fetchCommentsList(items._id));
      dispatch(fetchCommentsAnsList(items._id))
    }
  }, [dispatch, items._id]);

  const comments_ans_get = useSelector(selectIsCommentAns)
  
  const comments_ans_get_items = comments_ans_get.items || [];

  const comments_get = useSelector(selectIsComment);

  const comments = comments_get.items || [];
  
  const CommentsStatus = comments_get.status === 'loading';
    

  const ComentList = CommentsStatus ? (
    <View>
      <View key={0} style={styles.comment}>
        <View style={styles.commentHeader}>
          <View>
            <Text style={styles.commentUsername}></Text>
            <Text style={styles.commentDate}></Text>
          </View>
        </View>
        <Text style={styles.commentContent}></Text>
      </View>
      <View key={1} style={styles.comment}>
        <View style={styles.commentHeader}>
          <View>
            <Text style={styles.commentUsername}></Text>
            <Text style={styles.commentDate}></Text>
          </View>
        </View>
        <Text style={styles.commentContent}></Text>
      </View>
    </View>
  ) : (
    comments.map((comment, index) => (
      <View key={index} style={styles.comment}>
        <View style={styles.commentHeader}>
          <Image source={{ uri: comment.user.avatar }} style={styles.commentUserAvatar} />
          <View>
            <Text style={styles.commentUsername}>{comment.user.fullname} {comment.user.surname} {comment.user.class}</Text>
            <Text style={styles.commentDate}>{comment.date}</Text>
          </View>
        </View>
        <Text style={styles.commentContent}>{comment.text}</Text>
        <View style={styles.ans_com}>
          <Text>Ответить:</Text>
          <TextInput
    style={styles.input_ans}
      placeholder="Текст ответа..."
      value={text}
      onChangeText={setText}
    />
     <TouchableOpacity onPress={() => createCommentAns(comment._id)}  style={styles.btn_text_ans}>
        <View>
            <Text style={styles.btn_text}>Отправить</Text>
        </View>
    </TouchableOpacity>
        
         
       {comments_ans_get_items.filter(
  (comm_ans) => comm_ans.commentId === comment._id
).map((comm_ans, index) => (
        <View  style={styles.comment} key={index}>
          <View><Text style={styles.commentUsername}>{comm_ans.user.fullname} {comm_ans.user.surname} {comm_ans.user.class}</Text></View>
          <View><Text>{comm_ans.text}</Text></View>
        </View>
       )) }
      </View>
      </View>
    ))
  );
 
    return (

      <ScrollView style={styles.container}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={setting}
        onRequestClose={() => setSetting(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Настройки поста</Text>
            <View styel={styles.modalButtonContainer}>
              <TouchableOpacity
                onPress={() => delete_post()}
              >
                <DeletePost style={styles.btn_setting_post} name={'delete'}/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Alert.alert('Кнопка нажата!')}
              >
                <Сorrect style={styles.btn_setting_post} name={'edit-3'} />
              </TouchableOpacity>
              </View>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setSetting(false)}
              >
                <Text style={styles.modalButtonText}>Закрыть</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </Modal>
            {me && <TouchableOpacity onPress={() => setSetting(true)}>
            <SettingPost style={styles.btn_post} name={'settings'} /> 
    </TouchableOpacity>}
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{items.title}</Text>
        {items.image && <Image source={{uri: `http://192.168.0.106:3030${items.image}`}} style={{ width: '100%', height: 200 }}/>}
    
        <Text style={styles.postContent}>{items.text}</Text>
        <Text style={styles.postContent}>тема: {items.tags}</Text>
      </View>
      <View style={styles.userInfoContainer}>
        <Image source={{}} style={styles.userAvatar} />
        <View>
        <Text style={styles.userJoinedDate}>создан : {items.createdAt}</Text>
        <Text style={styles.userJoinedDate}>просмотров : {items.viewsCount}</Text>
          <Text style={styles.username}></Text>
          <Text style={styles.userJoinedDate}>ученик(ца): {items.user.fullname} {items.user.surname} {items.user.class}</Text>
        </View>
      </View>
      <View style={styles.commentsContainer}>
        <Text style={styles.postTitleCom}>Написать ответ или комментарий:</Text>
        <TextInput
    style={styles.input}
      placeholder="Текст ответа или комментария..."
      value={text}
      onChangeText={setText}
    />
     <TouchableOpacity onPress={() => createComment()}  style={styles.button}>
        <View>
            <Text style={styles.btn_text}>Отправить</Text>
        </View>
    </TouchableOpacity>
      </View>
      <View style={styles.commentsContainer}>
        <Text style={styles.postTitleCom}>Ответы и комментарии:</Text>
        {ComentList}
      </View>
    </ScrollView>
    )
  }

const styles = StyleSheet.create({
  comm_ans:{

  },
  modalContainer: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный черный фон
  },
  modalContent: {
    width: '80%', // 80% ширины экрана
    height: 250,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Тень для Android
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#F4A460',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  btn_setting_post: {
    fontSize: 26,
    padding: 10,
  },
  btn_post: {
    marginLeft: 320,
    fontSize: 26,
    color: '#F4A460'
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
    backgroundColor: '#F4A460',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: '#FFDEAD',
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  postContainer: {
    
    marginBottom: 20,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  postTitleCom: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  postContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userJoinedDate: {
    fontSize: 14,
    color: '#999',
  },
  commentsContainer: {
    marginTop: 20,
  },
  comment: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentUsername: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  commentDate: {
    fontSize: 12,
    color: '#999',
  },
  commentContent: {
    fontSize: 17,
    color: '#000',
    lineHeight: 20,
  },
  ans_com: {
    marginTop: 20
  },
  input_ans: {
    width: 300,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  btn_text_ans: {
    width: '50%',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#F4A460',
    justifyContent: 'center',
    alignItems: 'center'
  }
   
});
