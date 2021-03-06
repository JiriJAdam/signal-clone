import React,{useLayoutEffect,useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'react-native'
import { Button,Input }from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase'


const AddChat = ({navigation}) => {

    const [input, setinput] = useState('')

    const createChat = async() =>{
        await db.collection("chats")
        .add({
            chatName:input
        })
        .then(()=>navigation.goBack())
        .catch(error => alert(error))
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Add a new Chat",
            headerStyle:{backgroundColor:"#2C6BED"},
            headerTitleStyle:{color:'#fff'},
            headerTintColor:"#fff",
            headerTitleAlign:'center',
        })
    }, [navigation])
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={"#2C6BED"}  />
            <Input 
                placeholder="Enter a Chat name"
                value={input}
                onChangeText={Text=>setinput(Text)}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color={"#2C6BED"}/>
                }
                style={styles.input}
                onSubmitEditing={createChat}
            />
            <Button disabled={!input} onPress={createChat} title="Create new Chat" containerStyle={styles.button}/>
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        padding:10,
    },
    input:{
        width:300
    },
    button:{
        width:200,
        marginTop:10,
    },
})