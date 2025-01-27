import { 
    StyleSheet, 
    Text, View, 
    Image,
    TouchableOpacity
} from 'react-native'
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { pathUrl } from '../Config/env';
import { getImageUrl } from '../Config/imageUrl';





const Conversations = ({props, conversation, currentSender}) => {

// The current Reciever
// console.log(props);
const [currentReciever, setCurrentReciever] = useState(null); 


// Getting the data of the current reciever
useEffect(() => {
    const currentRecieverId = conversation.members.find((id) => id !== currentSender._id);
    // console.log(currentRecieverId);
    const getRecieverData = async () => {
        const res = await axios.get(`${pathUrl}/client/users/${currentRecieverId}`);
        let dataImage = getImageUrl(res.data.data.img)
        setCurrentReciever({...res.data.data, img: dataImage})
        // console.log(dataImage)
        // console.log(currentReciever)
    }

    getRecieverData();

}, [currentSender, conversation]);

// console.log(currentReciever)

    return (
        <>
            <TouchableOpacity style={styles.conv} onPress={()=> {props.navigation.navigate("messages", {conversation, currentSender, currentReciever})}}>
                <Image source={{uri: currentReciever?.img}} style={styles.image} />
                <Text style={styles.recieverName}> {`${currentReciever?.firstName} ${currentReciever?.lastName} `}</Text>
            </TouchableOpacity>
        </>
    )
}

export default Conversations

const styles = StyleSheet.create({
    conv: {
        flexDirection: "row",
        alignItems: "center"
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 60,
        margin: 10

    },
    recieverName: {
        fontSize: 20,
        backgroundColor: "green",
    }
})