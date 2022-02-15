import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



const LoginScreen = ({navigation}) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Sign in an existing user
    const signIn = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            //console.log(user);

            //Load chat if login succesfull
            navigation.navigate('Chat')
        })
        .catch((error) => {
            alert(error.code,": ", error.message);
        });
    }    


    return(
        <View style={styles.container}>
            <Input placeholder='Enter your email' 
                label='Email' 
                leftIcon={{type: 'material', name:'email'}} 
                value={email} 
                onChangeText={text => setEmail(text)}/>

            <Input placeholder='Enter your password' 
                label='Password' 
                leftIcon={{type: 'material', name:'lock'}} 
                value={password} 
                onChangeText={text => setPassword(text)} 
                secureTextEntry />

            <Button title='login' style={styles.button} onPress={signIn}/>
            <Button title='register' style={styles.button} onPress={() => navigation.navigate('Register')}/>
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

export default LoginScreen

