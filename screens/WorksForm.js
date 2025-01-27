import React, { useState } from "react";
import { Formik } from "formik";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
// import * as ImagePicker from "react-native-image-picker"
import * as ImagePicker from "expo-image-picker";
import { pathUrl } from "../Config/env";
import * as yup from "yup";
import axios from "axios";
import LoginScreen from "./Login";
export default function WorksForm() {
  const [image, setImage] = useState(null);

  const handleUpload = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  console.log(image);
  const worksSchema = yup.object().shape({
    title: yup.string().required("هذا الحقل مطلوب"),
    description: yup.string().required("هذا الحقل مطلوب"),
    jobImage: yup.mixed(),
  });
  const onSubmit = async (values) => {
    console.log("first");
    // setLoading(true);
    axios
      .post(`${pathUrl}/jobs/postjob`, values)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          console.log("true");
        } else {
          console.log("erorr");
          console.log("Please check your email id or password");
        }
      })
      .catch((err) => {
        console.log("erorr");
        console.log(err);
      });
  };

  return (
    <Formik
      initialValues={{ title: "", description: "", jobImage: "" }}
      validationSchema={worksSchema}
      onSubmit={onSubmit}
    >
      {({
        handleSubmit,
        handleChange,
        errors,
        touched,
        values,
        setFieldTouched,
      }) => (
        <View style={styles.mainBody}>
          {/* <Loader loading={loading} /> */}
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <View>
              <KeyboardAvoidingView enabled>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 25,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  اضافة عمل جديد
                </Text>
                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={handleChange("title")}
                    value={values.title}
                    placeholder="ادخل عنوان العمل" //Text
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="none"
                    keyboardType="default"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onBlur={() => setFieldTouched("title")}
                  />
                </View>
                {touched.title && errors.title && (
                  <Text style={styles.errorTextStyle}>{errors.title}</Text>
                )}
                <View style={styles.SectionStyle}>
                  <TextInput
                    style={[styles.inputStyle, styles.description]}
                    placeholder="ادخل وصف العمل" //12345
                    placeholderTextColor="#8b9cb5"
                    keyboardType="default"
                    value={values.description}
                    onChangeText={handleChange("description")}
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    returnKeyType="next"
                    onBlur={() => setFieldTouched("description")}
                  />
                </View>
                {touched.description && errors.description && (
                  <Text style={styles.errorTextStyle}>
                    {errors.description}
                  </Text>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <TouchableOpacity
                    style={styles.buttonPhoto}
                    activeOpacity={0.5}
                    onPress={handleUpload}
                  >
                    <Text style={[styles.buttonTextStyle, { color: "black" }]}>
                      اضف صورة
                    </Text>
                    <Icon name="upload" style={styles.styleUser} />
                  </TouchableOpacity>
                  {image && (
                    <Image
                      source={{ uri: image }}
                      style={{ height: 200, width: 200, margin: 10 }}
                    />
                  )}
                </View>
                {touched.jobImage && errors.jobImage && (
                  <Text style={styles.errorTextStyle}>{errors.jobImage}</Text>
                )}
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonTextStyle}>اضافة</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignContent: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    // height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#ffb200",
    borderWidth: 0,
    color: "#FFFFFF",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginLeft: 100,
    marginRight: 100,
    marginTop: 20,
    marginBottom: 25,
    elevation: 5,
  },
  description: {
    height: 100,
  },
  buttonTextStyle: {
    color: "white",
    paddingVertical: 10,
    fontSize: 19,
  },
  buttonPhoto: {
    backgroundColor: "white",
    borderWidth: 0,
    height: 55,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 5,
    padding: 5,

    marginTop: 20,
    marginBottom: 20,
    elevation: 5,
  },
  inputStyle: {
    flex: 1,
    color: "#000",
    paddingLeft: 6,
    paddingRight: 15,
    paddingTop: 5,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#8b9cb5",
    textAlign: "right",
    textAlignVertical: "top",
    elevation: 2,
  },
  styleUser: {
    fontSize: 22,

    color: "#ffb200",

    padding: 9,
    paddingTop: 9,
  },

  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
