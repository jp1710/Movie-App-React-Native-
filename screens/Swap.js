import React, {useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import {StackNavigator} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
// import { Button } from 'react-native-paper';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Button} from 'react-native-elements';

const {width} = Dimensions.get('window');

export default function Swap({navigation}) {
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
  //   render() {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Swiper
        style={styles.wrapper}
        height={200}
        horizontal={true}
        onMomentumScrollEnd={(e, state, context) =>
          console.log('index:', state.index)
        }
        dot={
          <View
            style={{
              backgroundColor: 'white',
              width: 10,
              height: 10,
              marginBottom: 5,
              borderRadius: 4,
              marginLeft: 10,
              marginRight: 10,
              marginTop: 3,
              right: 150,
              bottom: 180,
              // top: 30,
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: 'orange',
              width: 10,
              height: 10,
              borderRadius: 4,
              marginLeft: 10,
              marginRight: 10,
              marginTop: 3,
              marginBottom: 3,
              right: 150,
              bottom: 180,
            }}
          />
        }
        paginationStyle={{
          bottom: -20,
          left: null,
          right: 10,
        }}>
        <ImageBackground
          resizeMode="cover"
          style={styles.image}
          source={require('../assets/Bat.png')}>
          <LinearGradient
            colors={['transparent', 'orange']}
            location={[0.4, 1.2]}
            style={styles.LinearGradient}></LinearGradient>
          <Text style={styles.text}>Get the first</Text>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              marginBottom: 90,
              fontSize: 30,
              fontFamily: 'Avenir-Light',
            }}>
            {'Movie & TV information'}{' '}
          </Text>
          <TouchableOpacity style={styles.buttonlogin} activeOpacity={0.5}>
            <Text style={styles.buttonTextStyle}>
              Next
              {/* <Icon  name="arrow-forward" size={30} color={'white'} left={15} /> */}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity>
                  <Button
                  title="arrow-right"
                  size={30}
                  color="white"/>
                  </TouchableOpacity> */}
        </ImageBackground>

        <ImageBackground
          resizeMode="cover"
          style={styles.image}
          source={require('../assets/loki.png')}>
          <LinearGradient
            colors={['transparent', 'yellow']}
            location={[0.4, 1.2]}
            style={styles.LinearGradient1}></LinearGradient>
          <Text style={styles.text}>Know the movie</Text>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              marginBottom: 90,
              fontSize: 30,
              fontFamily: 'Avenir-Light',
            }}>
            is not worth Watching{' '}
          </Text>
          <TouchableOpacity style={styles.buttonlogin} activeOpacity={0.5}>
            <Text style={styles.buttonTextStyle}>
              Next
              {/* <Icon  name="arrow-forward" size={30} color={'white'} left={15} /> */}
            </Text>
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
          resizeMode="cover"
          style={styles.image1}
          source={require('../assets/SH.png')}>
          <LinearGradient
            colors={['transparent', 'grey']}
            location={[0.7, 1.5]}
            style={styles.LinearGradient}></LinearGradient>
          <Text style={styles.text}>Real-time</Text>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              marginBottom: 90,
              fontSize: 30,
              fontFamily: 'Avenir-Light',
            }}>
            updates movie Trailer{' '}
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.buttons}
            activeOpacity={0.5}>
            <LinearGradient
              colors={['orange', 'deeppink']}
              style={styles.main}
              start={{x: 0, y: 0.8}}
              end={{x: 0.8, y: 0}}>
              <Text style={styles.getTextStyle}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ImageBackground>
      </Swiper>
    </View>
  );
}
const styles = {
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 42,
    // lineHeight:150,
    marginTop: 500,
    fontWeight: 'bold',
    // paddingTop:50,
    textAlign: 'center',
  },

  containers: {
    flex: 0.5,
  },
  wrapper: {},
  image: {
    width,
    flex: 1,
  },
  image1: {
    width,
    flex: 1,
  },
  LinearGradient: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  LinearGradient1: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonlogin: {
    borderWidth: 1,
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
    height: 50,
    borderRadius: 50,
    marginLeft: 100,
    marginRight: 100,
    marginTop: 100,
    marginBottom: 80,
    right: 10,
    bottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  getTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 15,
    padding: 50,
    fontSize: 16,
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 1,
  },
  main: {
    flex: 1,
    borderRadius: 50,
  },
  buttons: {
    borderWidth: 1,
    // color: '#FFFFFF',
    borderColor: '#FFFFFF',
    height: 50,
    borderRadius: 50,
    marginLeft: 100,
    marginRight: 100,
    marginTop: 100,
    marginBottom: 80,
    right: 10,
    bottom: 80,

    // justifyContent: 'center',
    // alignItems: 'center'
  },
};
