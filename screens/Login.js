import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const [errortext, setErrortext] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    AsyncStorage.getItem('token').then(input => {
      if (input !== null) {
        try {
          var value = JSON.parse(input);
          //console.log(input)
          if (value.isLoggedin === '1') {
            navigation.navigate('Tabs');
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  });

  const setData = async () => {
    if (email === '' && pass === '') {
      alert('email and password required');
      return;
    } else {
      await AsyncStorage.getItem('Userdetail').then(value => {
        if (value !== null && email !== '' && pass !== '') {
          try {
            var updatedData = JSON.parse(value);
            var userID = updatedData.find(
              key => key.email === email && key.pass === pass,
            );
            if (userID) {
              var user = {
                email: userID.email,
                pass: userID.pass,
                token: userID.token,
                isLoggedin: '1',
              };
              AsyncStorage.setItem('token', JSON.stringify(user));
              //dispatch(Loginn(email, password));
              alert('Login Successful');
              navigation.navigate('Tabs');
            } else {
              alert('Incorrect credentials');
              navigation.navigate('Login');
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          alert('No data entered');
        }
      });
    }
  };

  return (
    <View style={styles.mainBody}>
      <LinearGradient
        colors={['deeppink', 'orange']}
        style={styles.mainBody}
        start={{x: 0.7, y: 1}}
        end={{x: 0, y: 0}}>
        {/* <ImageBackground
          resizeMode="stretch"
          style={styles.image}
          source={require('../img/Picsart.png')}>
              <Text style={{ textAlign: "center", color: "white",
          fontSize: 13 ,top:100}}>MAO TRAILER </Text>
          </ImageBackground> */}
        <Loader loading={loading} />
        <View style={styles.mainBody}>
          <TextInput
            style={styles.buttonStyle}
            placeholder="Email Id"
            textAlign="center"
            placeholderTextColor="white"
            onChangeText={text => setEmail(text)}
            autoCapitalize="none"
            value={email}
          />

          <TextInput
            style={styles.buttonStyle}
            placeholder="Password"
            textAlign="center"
            placeholderTextColor="white"
            keyboardType="default"
            secureTextEntry
            onChangeText={text => setPass(text)}
            value={pass}
          />

          <TouchableOpacity
            style={styles.buttonlogin}
            activeOpacity={0.5}
            onPress={setData}>
            <Text style={styles.buttonTextStyle}>LOGIN</Text>
          </TouchableOpacity>
          <Text
            style={styles.registerTextStyle}
            onPress={() => navigation.navigate('Register')}>
            <Text>Forgot Password</Text> | <Text>Register</Text>
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    // paddingTop: 60,
    // paddingBottom: 0
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 50,
    marginTop: 20,
    marginLeft: 50,
    marginRight: 40,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
    height: 50,
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 15,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: 'deeppink',
    fontWeight: 'bold',
    paddingVertical: 15,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: '#000000',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#dadae8',
    backgroundColor: '#002082',
  },
  registerTextStyle: {
    color: '#ffffff',
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
  welcome: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#9c27b0',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 200,
    width: 350,
  },
  buttonlogin: {
    backgroundColor: 'white',
    borderWidth: 1,
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
    height: 50,
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    marginBottom: 25,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    textAlign: 'center',
  },
});
