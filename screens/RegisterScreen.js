import React, { useState } from 'react'
import {View, StyleSheet} from 'react-native'
import { Input, Button } from 'react-native-elements';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const RegisterScreen = ({navigation}) =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const register = () =>{
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) =>{
            //Signed in
            const user = userCredential.user;
            //console.log(user);

            //Load chat when register is succesful
            navigation.navigate('Chat');
        })
        .catch((error) =>{
            var errorMessage = error.message;
            alert(errorMessage)
        });        
    }

    return(
        <View style={styles.container}>
            <Input placeholder='Enter your name' label='Name' leftIcon={{type:'material', name:'badge'}} value={name} onChangeText={text => setName(text)}/>
            <Input placeholder='Enter your email' label='Email' leftIcon={{type:'material', name:'email'}} value={email} onChangeText={text => setEmail(text)}/>
            <Input placeholder='Enter your password' label='Password' leftIcon={{type:'material', name:'lock'}} value={password} onChangeText={text => setPassword(text)} secureTextEntry/>
            <Input placeholder='Enter your avatar url' label='Profile Picture' leftIcon={{type:'material', name:'face'}} value={imageUrl} onChangeText={text => setImageUrl(text)}/>
            
            <Button title='register' style={styles.button} onPress={register}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginTop: 100,
    },
    button:{
        width: 370,
        marginTop: 10
    }
})


export default RegisterScreen
