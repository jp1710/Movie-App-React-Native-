import React, {useState, createRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useDispatch} from 'react-redux';
import {userName} from '../store/profile/userAction';
// import Home from './Home';
function Register({navigation}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  //   const [userAddress, setUserAddress] = useState('');
  //   const [pin, setPin] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [passval, setPassval] = useState(true);
  const [userval] = useState(true);
  const [setuserval] = useState(false);
  //const {storedCredentials,setStoredCredentials} = useContext(CredentialsContext);
  const passValidator = () => {
    if (pass === '') {
      setPassval(true);
      //console.log(setuserval)
      console.log(setPassval);
    } else {
      setPassval(true);
    }
  };
  const [passwordValidError, setPasswordValidError] = useState('');
  const [phoneValidError, setPhoneValidError] = useState('');
  const [pinValidError, setPinValidError] = useState('');
  const [emailValidError, setEmailValidError] = useState('');
  useEffect(() => {
    dispatch(userName({name: name}));
  });

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
        <ImageBackground
          resizeMode="stretch"
          style={styles.image}
          source={require('../assets/Picsart.png')}>
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
            onPress={register}>
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
export default Register;

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
    width: 90,
    height: 90,
  },
});

// import React, {useState, useContext} from 'react';
// import {Appbar} from 'react-native-paper';
// // formik
// import {
//   View,
//   TouchableOpacity,
//   ActivityIndicator,
//   Platform,
//   Button,
//   TextInput,
//   Text,
//   StyleSheet,
//   KeyboardAvoidingView,
// } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Register = ({navigation}) => {
//   const [hidePassword, setHidePassword] = useState(true);

//   const [email, setEmail] = useState('');
//   const [pass, setPass] = useState('');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [pin, setPin] = useState('');
//   const [passval, setPassval] = useState(true);
//   const [userval] = useState(true);
//   const [setuserval] = useState(false);
//   const {storedCredentials, setStoredCredentials} =
//     useContext(CredentialsContext);
//   const passValidator = () => {
//     if (pass === '') {
//       setPassval(true);
//       //console.log(setuserval)
//       console.log(setPassval);
//     } else {
//       setPassval(true);
//     }
//   };
//   const [passwordValidError, setPasswordValidError] = useState('');

//   const [phoneValidError, setPhoneValidError] = useState('');
//   const [pinValidError, setPinValidError] = useState('');
//   const [emailValidError, setEmailValidError] = useState('');

//   const handleValidEmail = val => {
//     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
//     if (val.length === 0) {
//       setEmailValidError('* email address must be enter');
//     } else if (reg.test(val) === false) {
//       setEmailValidError('* enter valid email address i.e  abc@gmail.com');
//     } else if (reg.test(val) === true) {
//       setEmailValidError('');
//     }
//   };

//   const handleValidPassword = val => {
//     let reg = new RegExp(
//       '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
//     );
//     if (val.length === 0) {
//       setPasswordValidError('* password must be enter');
//     } else if (reg.test(val) === false) {
//       setPasswordValidError('* enter valid password');
//     } else if (reg.test(val) === true) {
//       setPasswordValidError('');
//     }
//   };

//   const handleValidNumber = val => {
//     let reg = /^[0]?[789]\d{9}$/;
//     if (val.length === 0) {
//       setPhoneValidError('* phone number must be enter');
//     } else if (reg.test(val) === false) {
//       setPhoneValidError('* enter valid number');
//     } else if (reg.test(val) === true) {
//       setPhoneValidError('');
//     }
//   };

//   const handleValidPin = val => {
//     let reg = /^[1-9][0-9]{5}$/;
//     if (val.length === 0) {
//       setPinValidError('* pincode must be enter');
//     } else if (reg.test(val) === false) {
//       setPinValidError('* enter valid pincode');
//     } else if (reg.test(val) === true) {
//       setPinValidError('');
//     }
//   };
//   const signup = () => {
//     const arrayData = [];
//     const userdetails = {
//       email: email,
//       pass: pass,
//       name: name,
//       phone: phone,
//       pin: pin,
//       address: address,
//     };

//     arrayData.push(userdetails);
//     try {
//       AsyncStorage.getItem('Userdetail').then(value => {
//         if (value !== null) {
//           const dat = JSON.parse(value);
//           dat.push(userdetails);
//           AsyncStorage.setItem('Userdetail', JSON.stringify(dat)).then(() => {
//             navigation.navigate('Login');
//           });
//         } else {
//           AsyncStorage.setItem('Userdetail', JSON.stringify(arrayData)).then(
//             () => {
//               navigation.navigate('Login');
//             },
//           );
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <View style={{flex: 1}}>
//       <Appbar.Header style={styles.header}>
//         <Appbar.BackAction
//           onPress={() => {
//             navigation.navigate('Login');
//           }}
//         />
//         <Appbar.Content
//           titleStyle={{
//             marginRight: 150,
//             fontSize: 20,
//             fontWeight: 'bold',
//             paddingRight: 50,
//           }}
//           title="Login"
//         />
//       </Appbar.Header>

//       <View
//         style={{
//           justifyContent: 'center',
//           alignContent: 'center',
//           alignItems: 'center',
//           paddingTop: 100,
//           paddingBottom: 20,
//         }}>
//         <TextInput
//           style={styles.inputbox}
//           label="Full Name"
//           placeholder="User ID"
//           placeholderTextColor="White"
//           onChangeText={text => setName(text)}
//           value={name}
//           icon="person"
//         />
//       </View>
//       <View
//         style={{
//           justifyContent: 'center',
//           alignContent: 'center',
//           alignItems: 'center',
//           paddingBottom: 20,
//         }}>
//         <TextInput
//           style={styles.inputbox}
//           label="Password"
//           placeholder="Password"
//           placeholderTextColor="White"
//           //onChangeText={(text)=>setPass(text)}
//           onChangeText={value => {
//             setPass(value);
//             handleValidPassword(value);
//           }}
//           value={pass}
//           //onBlur={()=>passValidator()}
//           secureTextEntry={hidePassword}
//           icon="lock"
//           isPassword={true}
//           hidePassword={hidePassword}
//           setHidePassword={setHidePassword}
//         />
//         {passwordValidError ? (
//           <Text style={{color: 'red'}}>{passwordValidError}</Text>
//         ) : null}
//         {/* {setPassval?null:<Text style={{color:'red'}}>Password should be more than 6 characters</Text>} */}
//       </View>
//       <View
//         style={{
//           justifyContent: 'center',
//           alignContent: 'center',
//           alignItems: 'center',
//           paddingBottom: 20,
//         }}>
//         <TextInput
//           style={styles.inputbox}
//           label="Email ID"
//           placeholder="Email id"
//           placeholderTextColor="White"
//           value={email}
//           //onChangeText={(text)=>setEmail(text)}
//           onChangeText={value => {
//             setEmail(value);
//             handleValidEmail(value);
//           }}
//           keyboardType="email-address"
//           icon="mail"
//         />
//         {emailValidError ? (
//           <Text style={{color: 'red'}}>{emailValidError}</Text>
//         ) : null}
//       </View>
//       <View
//         style={{
//           justifyContent: 'center',
//           alignContent: 'center',
//           alignItems: 'center',
//           paddingBottom: 20,
//         }}>
//         <TextInput
//           style={styles.inputbox}
//           label="Phone number"
//           placeholder="Phone no"
//           placeholderTextColor="White"
//           //onChangeText={(text)=>setPhone(text)}
//           onChangeText={value => {
//             setPhone(value);
//             handleValidNumber(value);
//           }}
//           value={phone}
//           maxLength={10}
//           icon="device-mobile"
//           keyboardType="phone-pad"
//         />
//         {phoneValidError ? (
//           <Text style={{color: 'red'}}>{phoneValidError}</Text>
//         ) : null}
//       </View>
//       <View
//         style={{
//           justifyContent: 'center',
//           alignContent: 'center',
//           alignItems: 'center',
//           paddingBottom: 20,
//         }}>
//         <TextInput
//           style={styles.inputbox}
//           label="Address"
//           placeholder="Address"
//           placeholderTextColor="White"
//           onChangeText={text => setAddress(text)}
//           value={address}
//           icon="home"
//         />
//       </View>

//       <View
//         style={{
//           justifyContent: 'center',
//           alignContent: 'center',
//           alignItems: 'center',
//           paddingBottom: 20,
//         }}>
//         <TextInput
//           style={styles.inputbox}
//           label="PIN Code"
//           placeholder=" pin code"
//           placeholderTextColor="White"
//           //onChangeText={(text)=>setPin(text)}
//           onChangeText={value => {
//             setPin(value);
//             handleValidPin(value);
//           }}
//           keyboardType="phone-pad"
//           value={pin}
//           maxLength={6}
//           icon="calendar"
//         />
//         {pinValidError ? (
//           <Text style={{color: 'red'}}>{pinValidError}</Text>
//         ) : null}
//       </View>

//       <TouchableOpacity style={styles.buttonbox} onPress={signup}>
//         <Text style={{color: 'white'}}>Register</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Register;
// const styles = StyleSheet.create({
//   inputbox: {
//     flex: 1,
//     height: 50,
//     color: 'white',
//     paddingLeft: 105,
//     paddingRight: 75,
//     paddingEnd: 10,
//     borderColor: '#fff',
//     width: 270,
//     borderWidth: 1,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',

//     backgroundColor: '#102c63',
//   },
//   buttonbox: {
//     flex: 1,
//     height: 50,
//     color: '#000000',
//     paddingLeft: 15,
//     paddingEnd: 15,
//     borderColor: '#9CA3AF',
//     width: 270,
//     borderWidth: 1,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     backgroundColor: '#114157',
//   },
//   header: {
//     backgroundColor: '#1261A0',
//   },
// });
