import React, {useRef, useEffect} from 'react';
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

import {Profiles, ProgressBar} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {dummyData, COLORS, SIZES, FONTS, icons, images} from '../constants';
import {fetchPopListMovies} from '../store/movie/popListMovieAction';
import Icon from 'react-native-vector-icons/Octicons';
const PopListMovie = ({navigation}) => {
  const newSeasonScrollX = useRef(new Animated.Value(0)).current;
  const moviesData = useSelector(state => state);
  const popListMovi = moviesData.popListMovie.popularList;
  //const popMovi = moviesData.popmovie.popular;
  //console.log(upMovi);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPopListMovies());
  }, []);
  function renderBack() {
    return (
      <View
        style={{
          flexDirection: 'row',
          //justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
          //paddingTop: 5,
          paddingBottom: 2,
        }}>
        <Icon
          name="chevron-left"
          size={35}
          style={{right: 10, paddingRight: 10}}
          onPress={() => navigation.goBack()}
        />
        <Text style={{fontSize: 22}}>Back</Text>
      </View>
    );
  }
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingTop: 5,
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            // width: 80,
            // height: 25,
          }}
          onPress={() => console.log('Profile')}>
          <Text style={{fontWeight: '700', fontSize: 24, right: 110}}>
            Popular
          </Text>
          {/* <Image
            source={images.profile_photo}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          /> */}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // width: 50,
            // height: 20,
          }}
          onPress={() => console.log('Screen Mirror')}>
          {/* <Image
            source={icons.search}
            style={{
              width: 25,
              height: 25,
              left: 120,
              tintColor: COLORS.black,
            }}
          /> */}
          <Icon
            name={'search'}
            size={25}
            color={'black'}
            style={{
              //right: 60,
              left: 120,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderNewSection() {
    const two = 2;

    return (
      <View>
        <StatusBar hidden={true} />
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding,
            alignItems: 'center',
          }}></View>
        {/* <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 20 }}> */}

        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          //showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            alignSelf: 'flex-start',
          }}
          data={popListMovi}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('MovDetail', item)}>
                <View
                  style={{
                    marginLeft: index == 0 ? SIZES.padding : 20,
                    // marginRight:
                    //   index == dummyData.continueWatching.length - 1
                    //     ? SIZES.padding
                    //     : 0,
                  }}>
                  <ImageBackground
                    source={{uri: item.banner}}
                    resizeMode="cover"
                    style={{
                      width: SIZES.width / 2.4,
                      height: SIZES.width / 3 + 90,
                      borderRadius: 5,
                      shadowOpacity: 0.8,
                      shadowRadius: 8,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 7.5},
                    }}
                    imageStyle={{
                      borderRadius: 5,
                    }}
                  />
                  <Text
                    style={{
                      marginTop: SIZES.base,
                      color: COLORS.black,
                      fontSize: 14,
                      textAlign: 'center',
                      left: 5,
                      width: 130,
                      //...FONTS.h4,
                    }}>
                    {item.title}
                  </Text>
                  {/* <ProgressBar
                    containerStyle={{
                      marginTop: SIZES.radius,
                    }}
                    barStyle={{
                      height: 3,
                    }}
                    barPercentage={item.overallProgress}
                  /> */}
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
        {/* </ScrollView> */}
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {renderBack()}
      {renderHeader()}
      {renderNewSection()}
    </SafeAreaView>
  );
};

export default PopListMovie;
