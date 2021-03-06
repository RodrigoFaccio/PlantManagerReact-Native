import React, { Component, useState } from 'react'
import { 
    Text, 
    View ,
    StyleSheet,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import colors from '../styles/colors'
import fonts from '../styles/fonts';
import  {Button} from '../components/Button';
import { useNavigation } from '@react-navigation/core';

export function UserIdentification(){
    const navigation = useNavigation();

    const [isFocused,setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const [name,setName] = useState<string>()

    function handleInputChange(value:string){
        setIsFilled(!!value);
        setName(value);
    }
    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!name)
    }
    function handleInputFocus(){
            setIsFocused(true);
    }
    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS ==='ios'?'padding':'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
                <View style={styles.form}>
                    <Text style={styles.emoji}>
                        {isFilled?'😄':'😃'}
                    </Text>
                    <Text style={styles.title}>
                        Como podemos {'\n'} 
                        chamar você ?
                    </Text>
                   

                    <TextInput style={[styles.input,(isFocused ||isFilled) && {borderColor:colors.green}]}
                     placeholder="Digite o seu nome"
                     onBlur={handleInputBlur}
                     onFocus={handleInputFocus}
                     onChangeText={handleInputChange}
                     />
                    <View style={styles.footer}>
                    <Button onPress={()=>navigation.navigate('Confirmation')} title="Confirmar"/>

                </View>
                </View>
                
            </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    content:{
        flex:1,
        width:'100%'
    },
    form:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:54,
    },
    emoji:{
        fontSize:44
    },
    input:{
        borderBottomWidth:1,
        borderColor:colors.gray,
        color:colors.heading,
        width:'100%',
        marginTop:50,
        padding:10,
        textAlign:'center'

    },
    title:{
        fontSize:24,
        textAlign:'center',
        color:colors.heading,
        fontFamily:fonts.heading,
        lineHeight:32,
        marginTop:20
    },
    footer:{
        marginTop:40,
        width:'100%',
        paddingHorizontal:20,

    }
})