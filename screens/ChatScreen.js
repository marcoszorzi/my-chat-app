import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { db } from '../firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import { getAuth } from "firebase/auth";
import { doc, onSnapshot, setDoc, collection, orderBy, query } from "firebase/firestore";


const auth = getAuth();

const ChatScreen = ({navigation}) =>{
    
    const [messages, setMessages] = useState([]);

    //Logout action
    const signOut = () =>{
        auth.signOut().then(() =>{
            //Sign-out Succesful
            navigation.navigate("Login");
        }).catch((error) =>{
            //An error happened
            alert(error)
        });
    }

    //Layout definition and Logout button
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerLeft: () =>(
                <View style={{ maginLeft: 20 }}>
                    <Avatar rounded source={{uri: auth.currentUser?.photoURL,}}/>
                </View>
            ),
            headerRight: () =>(
                <TouchableOpacity style={{ marginRight: 10, size:24, color:'black'}} name='logout' onPress={signOut}>
                        <Text>Logout</Text>
                </TouchableOpacity>
            )
        })
    },[navigation]);

    //Default message
    useEffect(() => {
      /*  setDoc(doc(collection(db, "chats")),{
            _id: 1,
            text: 'Hello',
            createAt: new Date(),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        });*/
    }, [])
  
    //Load previous chat messages
    useLayoutEffect(() => {

        const q = query(collection(db, "chats"), orderBy("createAt", "desc"));

        const unsubscribe = onSnapshot(q,
            (snapshot)=>{
                const chats = [];
                setMessages( snapshot.docs.map(doc=>({
                    _id: doc.data()._id,
                    createAt: doc.data().createAt,
                    text: doc.data().text,
                    user: doc.data().user,
                    avatar: doc.data().user.avatar}))
                )
            },
            (error)=>{
                alert("Error, app could not retreived any messages.");
                console.log(error.code,": ", error.message);
            })

        
        return unsubscribe;
    })

    //Post messages to database
    const onSend = useCallback((messages =[]) =>{
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

        const { _id, createAt = new Date(), text, user,} = messages[0];

        setDoc(doc(collection(db, "chats")), {_id, createAt, text, user});

    }, [])

    return(
        <GiftedChat messages={messages} 
            showAvatarForEveryMessage={true} 
            onSend={messages => onSend(messages)} 
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL
            }} />
    );
    
}

const styles = StyleSheet.create({
});

export default ChatScreen
