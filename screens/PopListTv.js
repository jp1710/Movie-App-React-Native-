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
import {fetchNewListMovies} from '../store/movie/newListMovieAction';
import {fetchPopListMovies} from '../store/movie/popListMovieAction';
import {fetchPopListTvies} from '../store/tv/popListTvAction';
import Icon from 'react-native-vector-icons/Octicons';
const PopListTv = ({navigation}) => {
  const newSeasonScrollX = useRef(new Animated.Value(0)).current;
  const moviesData = useSelector(state => state);
  const popListTv = moviesData.popListTv.popularList;
  //const popMovi = moviesData.popmovie.popular;
  //console.log(upMovi);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPopListTvies());
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
  function renderPopularSection() {
    return (
      <View
        style={{
          marginTop: 20,
        }}>
        <StatusBar hidden={true} />
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          {/* <Text
            style={{
              flex: 1,
              color: COLORS.black,
              fontSize: 18,
              fontWeight: '600',
              //...FONTS.h2
            }}>
            Popular
          </Text> */}
          {/* <Image
          source={icons.right_arrow}
          style={{ width: 20, height: 20, tintColor: COLORS.primary }}
        /> */}
        </View>
        <FlatList
          // horizontal
          // pagingEnabled
          // snapToAlignment="center"
          snapToInterval={10}
          //justifyContent='space-between'
          //showsHorizontalScrollIndicator={false}
          scrollEventThrottle={5}
          // decelerationRate={0}
          contentContainerStyle={{
            marginTop: 10,
          }}
          data={popListTv}
          keyExtractor={(item, index) => index.toString()}
          // keyExtractor={item => `${item.id}`}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: newSeasonScrollX}}}],
            {useNativeDriver: false},
          )}
          renderItem={({item, index}) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('TvDetails', item)}>
                <View
                  style={{
                    width: SIZES.width,
                    alignItems: 'center',
                    paddingBottom: 10,
                    justifyContent: 'center',
                  }}>
                  <ImageBackground
                    source={{uri: item.banner}}
                    resizeMode="cover"
                    style={{
                      width: SIZES.width * 0.9,
                      height: SIZES.width * 0.35,
                      justifyContent: 'flex-end',
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
                      color: COLORS.black,
                      fontSize: 16,
                      textAlign: 'center',
                      left: 5,
                      width: 130,
                      //...FONTS.h4,
                    }}>
                    {item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
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
          paddingBottom: 2,
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            // width: 80,
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
            width: 50,
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {renderBack()}
      {renderHeader()}
      {renderPopularSection()}
    </SafeAreaView>
  );
};

export default PopListTv;
