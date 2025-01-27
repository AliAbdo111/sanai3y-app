import {
    StyleSheet, TextInput, View, Text, Image, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import { RadioButton } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'
import axios from 'axios';
import { schemaUser } from './RegisterSchema';
import { pathUrl } from '../../Config/env';
import { useNavigation } from '@react-navigation/native';

const RegisterClient = () => {
    let [regErr, setRegErr] = useState(false)
    const navigate = useNavigation()
    // Data for Address
    let data = [
        { value: 'أسوان' },
        { value: 'أسوان الجديدة' },
        { value: 'دراو' },
        { value: 'كوم امبو' },
        { value: 'نصر النوبة' },
        { value: 'كلابشة' },
        { value: 'أدفو' },];
    return (
        <>
            <Formik
                initialValues={
                    {
                        firstName: "",
                        lastName: "",
                        email: "",
                        phoneNumber: "",
                        nationelId: "",
                        age: "",
                        address: "",
                        gender: false,
                        password: "",
                        confirmPassword: "",
                        policy: false
                    }
                }
                validationSchema={schemaUser}
                onSubmit={(values) => {
                    let data = {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        phoneNumber: values.phoneNumber,
                        nationalId: values.nationelId,
                        age: values.age,
                        address: values.address,
                        password: values.password,
                        gender: values.gender,
                    }

                    const regUser = async () => {

                        try {

                            const res = await axios.post(`${pathUrl}/client/signup`, data)

                            if (res.data == "You already have acount, You can signin") {
                                setRegErr(true)
                            }
                            else{
                                navigate.navigate(('login'))
                            }
                        }
                        catch (err) {
                            setRegErr(true)
                            console.log(err)
                        }
                    }

                    regUser()
                }


                }
            >
                {({ handleSubmit, handleBlur, handleChange, errors, touched, isValid, values }) => (
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        {/* <Loader loading={loading} /> */}
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={{
                                justifyContent: 'center',
                                flex: 1,
                                alignItems: "center",

                            }}>
                            <View style={{ alignItems: 'center', justifyContent: "center" }}>
                                <Image source={require('../../assets/logo.png')}
                                    style={{
                                        // width: '100%',
                                        height: 100,
                                        resizeMode: 'contain',
                                        // margin: 30,
                                    }}
                                />

                                <Text style={{
                                    resizeMode: 'contain',
                                    fontSize: 30,
                                    textAlign: "center",
                                    marginBottom: 10
                                }}>
                                    مرحباً بك يمكنك إنشاء حسابك الان
                                </Text>
                            </View>
                            {regErr && <View style={{ backgroundColor: "#dc2626", padding: 5, borderRadius: 5 }}>
                                <Text style={{ color: "#fff", fontSize: 18 }}>هذا الحساب موجود بالفعل</Text>
                            </View>}
                            <KeyboardAvoidingView enabled
                                style={{ alignItems: "center" }}
                            >
                                <View style={styles.SectionStyle}>
                                    <View style={{ flex: 1, height: 50 }}>

                                        <TextInput
                                            style={[styles.inputStyle, { paddingHorizontal: 20, marginEnd: 5 }]}
                                            underlineColorAndroid="#f000"
                                            placeholder="اسمك الاول"
                                            placeholderTextColor="#8b9cb5"
                                            autoCapitalize="sentences"
                                            returnKeyType="next"
                                            blurOnSubmit={false}
                                            value={values.firstName}
                                            onChangeText={handleChange('firstName')}
                                            onBlur={handleBlur('firstName')}

                                        />
                                        <Text style={{ fontSize: 12, color: "red", textAlign: "center" }}>{touched.firstName && errors.firstName}</Text>
                                    </View>

                                    <View style={{ flex: 1, height: 50 }}>

                                        <TextInput
                                            style={[styles.inputStyle, { marginStart: 5, flexDirection: "column", height: 40 }]}
                                            placeholder="اسمك الأخير"
                                            placeholderTextColor="#8b9cb5"
                                            autoCapitalize="sentences"
                                            returnKeyType="next"
                                            blurOnSubmit={false}
                                            value={values.lastName}
                                            onChangeText={handleChange('lastName')}
                                            onBlur={handleBlur('lastName')}
                                        />
                                        <Text style={styles.errorTextStyle}>{touched.lastName && errors.lastName}</Text>
                                    </View>
                                </View>
                                <View style={[styles.SectionStyle, { marginTop: 15 }]}>
                                    <View style={{ flex: 1, height: 50 }}>

                                        <TextInput
                                            style={styles.inputStyle}
                                            underlineColorAndroid="#f000"
                                            placeholder="أدخل البريد الألكتروني"
                                            placeholderTextColor="#8b9cb5"
                                            keyboardType="email-address"
                                            returnKeyType="next"
                                            blurOnSubmit={false}
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                        />
                                        <Text style={styles.errorTextStyle}>{touched.email && errors.email}</Text>
                                    </View>
                                </View>
                                <View style={[styles.SectionStyle, { marginTop: 15 }]}>
                                    <View style={{ flex: 1, height: 50 }}>

                                        <TextInput
                                            style={[styles.inputStyle]}
                                            underlineColorAndroid="#f000"
                                            placeholder="أدخل رقم الهاتف"
                                            placeholderTextColor="#8b9cb5"
                                            // autoCapitalize="sentences"
                                            returnKeyType="next"
                                            // blurOnSubmit={false}
                                            keyboardType="numeric"
                                            value={values.phoneNumber}
                                            onChangeText={handleChange('phoneNumber')}
                                            onBlur={handleBlur('phoneNumber')}
                                        />
                                        <Text style={styles.errorTextStyle}>{touched.phoneNumber && errors.phoneNumber}</Text>
                                    </View>
                                </View>
                                <View style={[styles.SectionStyle, { marginTop: 15 }]}>
                                    <View style={{ flex: 1, height: 50 }}>
                                        <TextInput
                                            style={[styles.inputStyle]}
                                            underlineColorAndroid="#f000"
                                            placeholder="أدخل الرقم القومي"
                                            placeholderTextColor="#8b9cb5"
                                            autoCapitalize="sentences"
                                            returnKeyType="next"
                                            blurOnSubmit={false}
                                            keyboardType="numeric"
                                            value={values.nationelId}
                                            onChangeText={handleChange('nationelId')}
                                            onBlur={handleBlur('nationelId')}
                                        />
                                        <Text style={styles.errorTextStyle}>{touched.nationelId && errors.nationelId}</Text>
                                    </View>
                                </View>
                                {/* Input Password */}
                                <View style={styles.SectionStyle}>
                                    <View style={{ flex: 1, height: 50 }}>

                                        <TextInput
                                            style={[styles.inputStyle, { textAlign: "right" }]}
                                            underlineColorAndroid="#f000"
                                            placeholder="أدخل كلمة السر"
                                            placeholderTextColor="#8b9cb5"
                                            returnKeyType="next"
                                            secureTextEntry={true}
                                            blurOnSubmit={false}

                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                        />
                                        <Text style={styles.errorTextStyle}>{touched.password && errors.password}</Text>
                                    </View>
                                </View>

                                <View style={styles.SectionStyle}>
                                    <View style={{ flex: 1, height: 50 }}>

                                        <TextInput
                                            style={[styles.inputStyle, { textAlign: "right" }]}
                                            underlineColorAndroid="#f000"
                                            placeholder="أعد كتابة كلمة السر"
                                            placeholderTextColor="#8b9cb5"
                                            returnKeyType="next"
                                            secureTextEntry={true}
                                            blurOnSubmit={false}

                                            value={values.confirmPassword}
                                            onChangeText={handleChange('confirmPassword')}
                                            onBlur={handleBlur('confirmPassword')}
                                        />
                                        <Text style={styles.errorTextStyle}>{touched.confirmPassword && errors.confirmPassword}</Text>
                                    </View>
                                </View>

                                {/* Input Age */}


                                <View style={styles.SectionStyle}>
                                    <View >

                                        <RadioButton.Group
                                            onValueChange={handleChange('gender')}
                                            value={values.gender}
                                            style={styles.inputStyle}
                                        >
                                            <View
                                                style={{ flexDirection: "row" }}
                                            >
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <View>
                                                        <Text style={[{ fontSize: 18 }]}>ذكر</Text>
                                                    </View>

                                                    <View>
                                                        <RadioButton
                                                            value="ذكر"
                                                            color='#ffb200'
                                                        />
                                                    </View>
                                                </View>

                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <View>
                                                        <Text style={[{ fontSize: 18 }]}>انثي</Text>
                                                    </View>
                                                    <View>
                                                        <RadioButton
                                                            value="انثي"
                                                            color='#ffb200'
                                                        />
                                                    </View>
                                                </View>

                                            </View>
                                        </RadioButton.Group>
                                        <Text style={styles.errorTextStyle}>{touched.gender && errors.gender}</Text>
                                    </View>
                                    <View style={{ flex: 1, height: 50 }}>

                                        <TextInput
                                            style={styles.inputStyle}
                                            underlineColorAndroid="#f000"
                                            placeholder="أدخل عمرك"
                                            placeholderTextColor="#8b9cb5"
                                            keyboardType="numeric"
                                            returnKeyType="next"
                                            blurOnSubmit={false}
                                            value={values.age}
                                            onChangeText={handleChange('age')}
                                            onBlur={handleBlur('age')}
                                        />
                                        <Text style={styles.errorTextStyle}>{touched.age && errors.age}</Text>
                                    </View>


                                </View>

                                {/* Input Address */}

                                <View style={styles.SectionStyle}>
                                    <View style={{ flex: 1, height: 50, alignItems: "center" }}>

                                        <SelectDropdown data={data}
                                            defaultButtonText="أختر المركز"
                                            buttonStyle={styles.inputStyle}
                                            buttonTextAfterSelection={(selecteditem, index) => {
                                                return selecteditem.value
                                            }}
                                            rowTextForSelection={(item) => {
                                                return item.value
                                            }}
                                            // onSelect={}
                                            onSelect={(item) => values.address = item.value}
                                        // onBlur={handleBlur('address')}
                                        />
                                        <Text style={styles.errorTextStyle}>{errors.address}</Text>
                                    </View>
                                </View>



                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                    activeOpacity={0.5}
                                    onPress={handleSubmit}
                                // disabled={!isValid}
                                >
                                    <Text style={styles.buttonTextStyle}>تسجيل</Text>
                                </TouchableOpacity>
                            </KeyboardAvoidingView>
                        </ScrollView>
                    </View>
                )}
            </Formik>
        </>

    )
}

export default RegisterClient

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 10,
        marginLeft: 35,
        marginRight: 35,
        // margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#ffb200',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
        width: 90,
        justifyContent: "center",
        elevation: 5
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 18,
    },
    inputStyle: {
        flex: 1,
        // height:40,
        // color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        paddingHorizontal: 100,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#dadae8',
        backgroundColor: "#fff",
        elevation: 2
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 12,

    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});