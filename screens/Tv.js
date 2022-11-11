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
import {fetchPopularTvies} from '../store/tv/tvPopAction';
import {fetchUpcomingTvies} from '../store/tv/tvUpcomingAction';
import Icon from 'react-native-vector-icons/FontAwesome';
const Tv = ({navigation}) => {
  const newSeasonScrollX = useRef(new Animated.Value(0)).current;
  const tviesData = useSelector(state => state);
  const upTv = tviesData.upcomingTv.upcomingTvies;
  const popTv = tviesData.popTv.popularTvies;
  // console.log(upTv);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPopularTvies());
    dispatch(fetchUpcomingTvies());
  }, []);
  const emptyData = [];

  function renderPopularSection() {
    return (
      <View
        style={{
          marginTop: 10,
        }}>
        <StatusBar hidden={true} />
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          <Text
            style={{
              flex: 1,
              color: COLORS.black,
              fontSize: 18,
              paddingBottom: 15,
              fontWeight: '600',
              right: -10,
              //...FONTS.h2
            }}>
            Popular
          </Text>
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
          data={popTv}
          ListFooterComponent={renderPopFooter}
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
                      //right: 120,
                      marginTop: SIZES.base,
                      color: COLORS.black,
                      textAlign: 'center',
                      fontSize: 16,
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
  function renderPopFooter() {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('PopListTv')}>
          <ImageBackground
            style={{
              width: SIZES.width * 0.9,
              height: SIZES.width * 0.35,
              flexWrap: 'wrap',
              borderRadius: 10,
              shadowOpacity: 0.8,
              shadowRadius: 8,
              shadowColor: '#000',
              marginLeft: 20,
              shadowOffset: {width: 0, height: 7.5},
            }}
            imageStyle={{
              borderRadius: 5,
            }}
            source={require('../assets/Yellove.png')}>
            <View
              style={{
                alignItems: 'center',
                top: 70,
                paddingLeft: 150,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  color: '#ffffff',
                  fontWeight: '800',
                }}>
                More
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
  function renderFooter() {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('NewListTv')}>
          <ImageBackground
            style={{
              width: 130,
              height: 200,
              flexWrap: 'wrap',
              borderRadius: 10,
              shadowOpacity: 0.8,
              shadowRadius: 8,
              shadowColor: '#000',
              marginLeft: 20,
              shadowOffset: {width: 0, height: 7.5},
            }}
            imageStyle={{
              borderRadius: 5,
            }}
            source={require('../assets/Yellove.png')}>
            <View
              style={{
                alignItems: 'center',
                top: 90,
                paddingLeft: 40,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color: '#ffffff',
                  fontWeight: '800',
                }}>
                More
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }

  function renderNewSection() {
    return (
      <View>
        <StatusBar hidden={true} />
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding,
            alignItems: 'center',
          }}></View>
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
              height: 25,
            }}
            onPress={() => console.log('Profile')}>
            <Text style={{fontWeight: '700', fontSize: 24, right: 130}}>
              TV
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
            onPress={() => navigation.navigate('SearchTv')}>
            <Icon
              name={'search'}
              size={25}
              color={'black'}
              style={{
                //right: 60,
                left: 140,
              }}
              // onPress={setname}
            />
            {/* <Image
              source={icons.search}
              style={{
                width: 25,
                height: 25,
                left: 140,
                tintColor: COLORS.black,
              }}
            /> */}
          </TouchableOpacity>
        </View>
        {/* <Text
          style={{
            flex: 1,
            color: COLORS.black,
            fontSize: 18,
            left: 20,
            fontWeight: '600',
            //...FONTS.h2
          }}>
          New
        </Text> */}

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.padding,
          }}
          data={upTv}
          ListFooterComponent={renderFooter()}
          keyExtractor={(item, index) => index.toString()}
          //keyExtractor={item => `${item.id}`}
          renderItem={({item, index}) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('TvDetails', item)}>
                <View
                  style={{
                    marginLeft: index == 0 ? SIZES.padding : 20,
                  }}>
                  {/* <Text
                    style={{
                      flex: 1,
                      color: COLORS.black,
                      fontSize: 18,
                      fontWeight: '600',
                      //...FONTS.h2
                    }}>
                    New
                  </Text> */}
                  <ImageBackground
                    source={{uri: item.banner}}
                    resizeMode="cover"
                    style={{
                      width: 130,
                      height: 200,
                      flexWrap: 'wrap',
                      borderRadius: 10,
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
                      fontSize: 16,
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
      </View>
    );
  }
  const ListFooterComponent = (
    <>
      {renderNewSection()}
      {renderPopularSection()}
    </>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar
        backgroundColor={'transparent'}
        hidden={true}
        translucent={true}
      />
      <FlatList
        data={emptyData}
        //renderItem={renderNullItem}
        ListEmptyComponent={ListFooterComponent}
      />
      {/* // contentContainerStyle={{ */}
      {/* //   paddingBottom: 100,
      // }}
       */}
      {/* {renderHeader()} */}
      {/* {renderNewSection()}

        {renderPopularSection()} */}
    </SafeAreaView>
  );
};

export default Tv;
