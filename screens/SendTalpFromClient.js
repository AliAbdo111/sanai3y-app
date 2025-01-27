import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { get } from "lodash";
import { AntDesign } from "@expo/vector-icons";

export default function SendTalpFromClient() {
  const { params } = useRoute();
  const detailJob = get(params, "one");
  // console.log(detailJob);

  const [proposal , setProposal] = useState("")

//  disChange = (testOne) => {
//     // setProposal(event)
//     console.log(testOne.nativeEvent.text)
//   }

  // function sendProposal (id){
  //   let body ={
  //     sanai3yProposal: proposal
  //   }
  //   console.log(body)
  //   axios.put(`http://localhost:7000/jobs/addproposal/${id}`,body,{headers:headers})
  //   .then(res=>{
  //     // console.log(res.data.Data)
  //     if(res.status == 200){
  //       window.location.reload(true)
        
  //     }
  //   })
  // }




  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Start Box Posts */}
        <View style={[styles.box, styles.shadowProp]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              marginLeft: 10,
            }}
          >
            <Image
              style={styles.tinyLogo}
              source={{
                uri: "https://icones.pro/wp-content/uploads/2021/03/avatar-de-personne-icone-homme.png",
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  marginRight: 10,
                  paddingRight: 10,
                  borderRightWidth: 1,
                  borderRightColor: "#ffb200",
                  fontWeight: "bold",
                }}
              >
                {detailJob.clientData.firstName +
                  " " +
                  detailJob.clientData.lastName}
              </Text>
              <Text style={{ paddingRight: 10, color: "#999", fontSize: 10 }}>
                {detailJob.city}
              </Text>
            </View>
          </View>
          <Image
            style={styles.tinyLogotest}
            source={{
              uri: 'http://192.168.1.6'+detailJob.image.split('http://localhost')[1],
            }}
          />

          <Text
            style={{ paddingVertical: 10, paddingHorizontal: 10, fontSize: 12 }}
          >
               {detailJob.title}   
          </Text>

          <Text
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#eee",
            }}
          >
        {detailJob.description}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          ></View>
        </View>
        {/* End Box Posts */}
        <View style={{ alignItems: "center" }}>
          <TextInput
            multiline={true}
            numberOfLines={2}
            placeholder={"ازاي تقدر تحل المشكلة"}
            // onChange={disChange}
            style={{
              padding: 10,
              height: 100,
              width: "90%",
              textAlignVertical: "top",
              backgroundColor: "#eeeeee6e",
              // elevation: 1,
              borderRadius: 5,
              marginTop: 50,
              borderWidth: 2,
              borderColor: "#eee",
            }}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              width: "50%",
              marginTop: 10,
              backgroundColor: "#ffb200",
              borderRadius: 10,
              marginBottom: 40,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                backgroundColor: "#ffb200",
                color: "#000",
                width: "100%",
                fontSize: 18,
                padding: 6,
                borderRadius: 10,
              }}
            >
              ارسال الطلب
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: "#FFF",
    paddingRight: 10,
    paddingLeft: 10,
    margin: 0,
    paddingTop: 20,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  tinyLogotest: {
    width: "100%",
    height: 300,
    marginTop: 10,
    borderRadius: 5,
  },
});
