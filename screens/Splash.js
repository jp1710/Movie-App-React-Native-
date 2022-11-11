import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

function Splash({navigation}) {
  const [animating, setAnimating] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);

      AsyncStorage.getItem('user_id').then(value =>
        navigation.replace(
          'Swap',
          // value === null ? 'Auth' : 'Swap'
        ),
      );
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['deeppink', 'orange']}
        style={styles.container}
        start={{x: 0.7, y: 1}}
        end={{x: 0, y: 0}}>
        <ImageBackground
          resizeMode="cover"
          style={styles.image}
          source={require('../assets/Picsart.png')}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 15,
              top: 110,
              fontFamily: 'Avenir-Light',
            }}>
            MAO TRAILER{' '}
          </Text>
        </ImageBackground>
        <ActivityIndicator
          animating={animating}
          color="#FFFFFF"
          size="large"
          style={styles.activityIndicator}
        />
      </LinearGradient>
    </View>
  );
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 100,
  },
  image: {
    // justifyContent:"center",
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 300,
    width: 100,
    height: 100,
  },
});
