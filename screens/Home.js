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
import {connect} from 'react-redux';
import {dummyData, COLORS, SIZES, FONTS, icons, images} from '../constants';
import {fetchPopularMovies} from '../store/movie/moviePopAction';
import {fetchUpcomingMovies} from '../store/movie/movieAction';

const Home = ({navigation}) => {
  const emptyData = [];
  const moviesData = useSelector(state => state);
  const upMovi = moviesData.upcomemovie.upcoming;
  const popMovi = moviesData.popmovie.popular;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchUpcomingMovies());
  }, []);

  const newSeasonScrollX = useRef(new Animated.Value(0)).current;

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingTop: 8,
          paddingBottom: 10,
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            // width: 80,
          }}
          onPress={() => console.log('Profile')}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 24,
              right: 110,

              paddingBottom: 5,
            }}>
            MOVIES
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
          onPress={() => navigation.navigate('SearchMovie')}>
          <Icon
            name={'search'}
            size={25}
            color={'black'}
            style={{
              //right: 60,
              bottom: 5,
              left: 110,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderSeasonSection() {
    return (
      <FlatList
        horizontal
        snapToAlignment="center"
        snapToInterval={SIZES.width}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        contentContainerStyle={{
          marginTop: 4,
        }}
        data={dummyData.newSeason}
        keyExtractor={item => `${item.id}`}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: newSeasonScrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item, index}) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('MovDetail', item)}>
              <View
                style={{
                  width: SIZES.width,
                  //height:SIZES.width ,
                  alignItems: 'center',
                  paddingBottom: 10,
                  justifyContent: 'center',
                }}>
                <ImageBackground
                  source={item.thumbnail}
                  resizeMode="cover"
                  style={{
                    width: SIZES.width * 0.88,
                    height: SIZES.width * 0.4,
                    justifyContent: 'flex-end',
                    // opacity:50,
                    shadowOpacity: 0.7,
                    shadowRadius: 8,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 1},
                    //elevation:50
                  }}
                  imageStyle={{
                    borderRadius: 5,
                  }}></ImageBackground>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    );
  }

  function renderFooter() {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('NewListMovie')}>
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
  function renderPopFooter() {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('PopListMovie')}>
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
      <View
        style={{
          marginTop: SIZES.padding,
        }}>
        <StatusBar hidden={true} />
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding,
            alignItems: 'center',
          }}>
          <Text
            style={{
              flex: 1,
              color: COLORS.black,
              fontSize: 18,
              fontWeight: '600',
              //...FONTS.h2
            }}>
            New
          </Text>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.padding,
          }}
          //data={dummyData.continueWatching}
          data={upMovi}
          //keyExtractor={item => `${item.id}`}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={renderFooter()}
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
                      width: 130,
                      height: 200,
                      flexWrap: 'wrap',
                      borderRadius: 10,
                      shadowOpacity: 0.8,
                      shadowRadius: 10,
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
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </View>
    );
  }
  function renderPopularSection() {
    //const listData=popMovi.
    const numColumns = Math.ceil(10);
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}>
        <StatusBar hidden={true} />
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding,
            alignItems: 'center',
          }}>
          <Text
            style={{
              flex: 1,
              color: COLORS.black,
              fontSize: 18,
              fontWeight: '600',
              paddingBottom: 20,
              //...FONTS.h2
            }}>
            Popular
          </Text>
          {/* <Image
            source={icons.right_arrow}
            style={{ width: 20, height: 20, tintColor: COLORS.primary }}
          /> */}
        </View>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: SIZES.padding,
            }}
            data={popMovi}
            numColumns={10}
            ListFooterComponent={renderPopFooter()}
            //keyExtractor={item => `${item.id}`}
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
                        width: 130,
                        height: 200,
                        flexWrap: 'wrap',
                        shadowOpacity: 0.8,
                        shadowRadius: 8,
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 7.5},
                      }}
                      imageStyle={{
                        borderRadius: 5,

                        flexWrap: 'wrap',
                        width: 130,
                        height: 200,
                      }}>
                      <View
                        style={{
                          top: 7,
                          flex: 1,
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            left: 95,
                            padding: 2,
                            borderRadius: 20,
                            //borderColor: 'black',

                            //backgroundColor: 'orange',
                          }}>
                          {item.rating}
                        </Text>
                      </View>
                    </ImageBackground>
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
        </ScrollView>
      </View>
    );
  }
  const ListFooterComponent = (
    <>
      {renderHeader()}
      {renderSeasonSection()}

      {renderNewSection()}
      {renderPopularSection()}
    </>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* <StatusBar style="auto" /> */}

      <FlatList
        data={emptyData}
        //renderItem={renderNullItem}
        ListEmptyComponent={ListFooterComponent}
      />
    </SafeAreaView>
  );
};
// const mapStateToProps = state => {
//   return {
//     movieData: state.movieData,
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return {
//     fetchAllMovie: () => dispatch(fetchAllMovie()),
//   };
// };

export default Home;
//export default connect(mapStateToProps, mapDispatchToProps)(Home);
