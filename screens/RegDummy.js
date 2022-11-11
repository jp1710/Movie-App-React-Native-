import React, {useState, createRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Animated,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useDispatch} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {userDP, userName} from '../store/profile/userAction';
// import Home from './Home';
function RegDummy({navigation}) {
  var ImagePicker = require('react-native-image-picker');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  //   const [userAddress, setUserAddress] = useState('');
  //   const [pin, setPin] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [passval, setPassval] = useState(true);
  const [userval] = useState(true);
  const [setuserval] = useState(false);

  const [passwordValidError, setPasswordValidError] = useState('');
  const [phoneValidError, setPhoneValidError] = useState('');
  const [pinValidError, setPinValidError] = useState('');
  const [emailValidError, setEmailValidError] = useState('');
  useEffect(() => {
    dispatch(userName({name: name}));
    dispatch(userDP(image));
  });
  //   const [image, setImage] = useState(
  //     'http://www.vhv.rs/dpng/d/118-1182050_buddy-contacts-friends-group-members-people-users-user.png',
  //   );
  const [image, setImage] = useState(null);
  const a = [];
  const choosePhotoFromLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        console.log(response);
        setImage(response);
        //   setResponseCamera(response);
        //   setResponseGallery(null);
      },
    );

    // launchImageLibrary(options, response => {
    //   width: 300,
    //   height: 300,
    //   cropping: true,
    //   compressImageQuality: 0.7,
    // }).then(image => {
    //   console.log(image);
    // if (response.uri) {
    // a.push(response.uri);
    //  setImage(response.uri);
    //  }
    // this.bs.current.snapTo(1);
    // });
  };
  //   const renderInner = () => (
  //     <View style={styles.panel}>
  //       <View style={{alignItems: 'center'}}>
  //         <Text style={styles.panelTitle}>Upload Photo</Text>
  //         <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
  //       </View>
  //       <TouchableOpacity
  //         style={styles.panelButton}
  //         onPress={() => takePhotoFromCamera()}>
  //         <Text style={styles.panelButtonTitle}>Take Photo</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         style={styles.panelButton}
  //         onPress={() => choosePhotoFromLibrary()}>
  //         <Text style={styles.panelButtonTitle}>Choose From Library</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={styles.panelButton}>
  //         <Text style={styles.panelButtonTitle}>Cancel</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (val.length === 0) {
      setEmailValidError('Please enter Email address ');
    } else if (reg.test(val) === false) {
      setEmailValidError('*Enter valid email address i.e  xyz@gmail.com');
    } else if (reg.test(val) === true) {
      setEmailValidError('');
    }
  };
  const handleValidPassword = val => {
    let reg = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );
    if (val.length === 0) {
      setPasswordValidError('Please enter Password ');
    } else if (reg.test(val) === false) {
      setPasswordValidError('*Enter valid password');
    } else if (reg.test(val) === true) {
      setPasswordValidError('');
    }
  };
  const handleValidNumber = val => {
    let reg = /^[0]?[789]\d{9}$/;
    if (val.length === 0) {
      setPhoneValidError('Please enter Phone number ');
    } else if (reg.test(val) === false) {
      setPhoneValidError('*Enter valid number');
    } else if (reg.test(val) === true) {
      setPhoneValidError('');
    }
  };
  const handleValidPin = val => {
    let reg = /^[1-9][0-9]{5}$/;
    if (val.length === 0) {
      setPinValidError('Pin must be enter');
    } else if (reg.test(val) === false) {
      setPinValidError('*Enter valid pincode');
    } else if (reg.test(val) === true) {
      setPinValidError('');
    }
  };
  const dispatch = useDispatch();
  const register = async () => {
    const arrayData = [];
    dispatch(userName({name: name}), alert('dispatched user name'));

    const userdetails = {
      email: email,
      pass: pass,
      name: name,
      //   userAddress: userAddress,
      //   pin: pin,
      token: Math.random(),
    };
    arrayData.push(userdetails);
    try {
      await AsyncStorage.getItem('Userdetail').then(value => {
        if (value !== null) {
          const dat = JSON.parse(value);
          dat.push(userdetails);

          AsyncStorage.setItem('Userdetail', JSON.stringify(dat)).then(() => {
            alert('Registered Successfully');
            navigation.navigate('Login');
          });
        } else {
          AsyncStorage.setItem('Userdetail', JSON.stringify(arrayData)).then(
            () => {
              navigation.navigate('Login');
            },
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['deeppink', 'orange']}
        style={styles.mainBody}
        start={{x: 0.7, y: 1}}
        end={{x: 0, y: 0}}>
        <TouchableOpacity>
          <ImageBackground
            resizeMode="cover"
            style={styles.image}
            imageStyle={{borderRadius: 15}}
            source={{uri: image}}
            //</TouchableOpacity> source={require('../assets/Bat.png')}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 13,
                top: 100,
              }}>
              MAO TRAILER{' '}
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        {/* <Text>MAO TRAILER</Text> */}

        <View style={{alignItems: 'center'}}></View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <View style={styles.input}>
              <Icon name="user" size={25} color="deeppink" />
            </View>
            <TextInput
              style={styles.inputStyle}
              onChangeText={text => setName(text)}
              value={name}
              underlineColorAndroid="transparent"
              placeholder="User ID"
              placeholderTextColor="white"
              autoCapitalize="none"
              returnKeyType="next"
            />
          </View>
          <View style={styles.SectionStyle}>
            <View style={styles.input}>
              <Icon name="lock" size={25} color="deeppink" />
            </View>
            <TextInput
              style={styles.inputStyle}
              // onChangeText={(text) =>setPassword(text)}
              value={pass}
              underlineColorAndroid="transparent"
              placeholder="Password"
              placeholderTextColor="white"
              returnKeyType="next"
              secureTextEntry={true}
              onChangeText={value => {
                setPass(value);
                handleValidPassword(value);
              }}
              value={pass}
            />
          </View>
          {passwordValidError ? (
            <Text style={styles.err}>{passwordValidError}</Text>
          ) : null}
          <View style={styles.SectionStyle}>
            <View style={styles.input}>
              <Fontisto name="email" size={25} color="deeppink" />
            </View>
            <TextInput
              style={styles.inputStyle}
              // onChangeText={(text) => setEmail(text)}
              value={email}
              underlineColorAndroid="transparent"
              placeholder="Email Id"
              placeholderTextColor="white"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              value={email}
              onChangeText={value => {
                setEmail(value);
                handleValidEmail(value);
              }}
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          {emailValidError ? (
            <Text style={styles.err}>{emailValidError}</Text>
          ) : null}
          <View style={styles.SectionStyle}>
            <View style={styles.input}>
              <Icon name="phone" size={25} color="deeppink" />
            </View>
            <TextInput
              style={styles.inputStyle}
              // onChangeText={(text) => setUserPhone(text)}
              value={userPhone}
              underlineColorAndroid="transparent"
              placeholder="Phone number"
              placeholderTextColor="white"
              keyboardType="numeric"
              onChangeText={value => {
                setUserPhone(value);
                handleValidNumber(value);
              }}
              maxLength={10}
              value={userPhone}
            />
          </View>
          {phoneValidError ? (
            <Text style={styles.err}>{phoneValidError}</Text>
          ) : null}
          {/* <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) =>
                setUserAddress(text)
              }
              value={userAddress}
              underlineColorAndroid="#f000"
              placeholder="Address"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View> 
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              value={pin}
              textAlign="center"
              placeholder={"Pin code"}
              maxLength={6}
              placeholderTextColor="#8b9cb5"
              onChangeText={value => { setPin(value); handleValidPin(value); }}
            //onChangeText={(text) => setPassword(text)}
            />
          </View>
            {pinValidError ? <Text style={styles.err}>{pinValidError}</Text> : null}*/}

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => choosePhotoFromLibrary()}
            //onPress={register}
          >
            <Text style={styles.buttonTextStyle}>SIGNUP</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Tabs')}>
            <Text style={styles.buttonTextStyle}>Home</Text>
          </TouchableOpacity> */}
          {/*  <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>*/}

          {/* <Text
              style={styles.HomeTextStyle}
              onPress={() => navigation.navigate('HomeScreen')}>
             Go to HomeScreen
            </Text> */}
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}
export default RegDummy;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 60,
    paddingBottom: 0,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 50,
    marginTop: 15,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 20,
    borderWidth: 1,
    color: '#fff',
    borderColor: '#ffffff',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    color: '#fff',
    borderColor: '#ffffff',
    height: 50,
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: 'orange',
    paddingVertical: 15,
    fontSize: 16,
    borderColor: '#fff',
    textAlign: 'center',
    paddingLeft: 15,
    fontWeight: 'bold',
    paddingRight: 15,
    paddingLeft: 15,
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  HomeTextStyle: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  err: {
    color: 'red',
    textAlign: 'center',
  },
  input: {
    width: 40,
    height: 40,
    top: 0,
    left: 10,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    alignItems: 'center',
  },
  image: {
    // justifyContent:"center",
    bottom: 80,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,

    width: 120,
    height: 120,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
