import React, {useRef, useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Animated,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearCache} from '../store/profile/FavAction';

const Settings = ({navigation}) => {
  const dispatch = useDispatch();
  const logOut = async () => {
    const input = await AsyncStorage.getItem('token');
    if (input) {
      var enter = {
        isLoggedin: '0',
      };
      AsyncStorage.setItem('token', JSON.stringify(enter));
    }
    console.log(input);
    dispatch(clearCache());
    navigation.navigate('Login');
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        alignItems: 'center',
        marginTop: 24,
        justifyContent: 'center',
      }}>
      <TouchableOpacity onPress={logOut}>
        <Text style={{fontSize: 24}}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{fontSize: 30}}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Settings;
