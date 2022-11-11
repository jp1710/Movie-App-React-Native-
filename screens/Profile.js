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
import {addFav, delFav} from '../store/profile/FavAction';
import {FavReducer} from '../store/profile/FavReducer';
const Profile = ({navigation}) => {
  const emptyData = [];
  const data = useSelector(state => state);
  const favs = data.favsList.favs;
  const name = data.userName.user;
  const likes = data.likes.likes;
  const dp = data.userName.dp;
  const dispatch = useDispatch();

  const deleteThisFav = item => {
    dispatch(delFav(item));
  };

  const ListFooterComponent = (
    <>
      {renderProfile()}
      {renderFav()}
    </>
  );
  function renderFav() {
    return (
      <View style={{flex: 1}}>
        {/* {favs == null ? null : ( */}
        <View
          style={{
            marginTop: 24,
            height: 400,
          }}>
          <StatusBar hidden={true} />
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 24,
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                color: 'black',
                fontSize: 18,
                fontWeight: '600',
                //...FONTS.h2
              }}>
              Favourites
            </Text>
            {/* <Image
            source={icons.right_arrow}
            style={{ width: 20, height: 20, tintColor: COLORS.primary }}
          /> */}
          </View>
          <ScrollView
            horizontal={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <FlatList
              horizontal={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                marginTop: 24,
              }}
              data={favs}
              numColumns={4}
              //keyExtractor={item => `${item.id}`}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('MovDetail', item)}
                    onLongPress={() => deleteThisFav(item)}>
                    <View
                      style={{
                        left: 20,
                        paddingTop: 10,
                        // marginLeft: index == 0 ? 24 : 5,
                        // marginRight:
                        //   index == dummyData.continueWatching.length - 1
                        //     ? SIZES.padding
                        //     : 0,
                      }}>
                      <ImageBackground
                        source={{uri: item.banner}}
                        resizeMode="cover"
                        style={{
                          width: 80,
                          height: 140,
                          flexWrap: 'wrap',
                          shadowOpacity: 0.8,
                          shadowRadius: 8,
                          shadowColor: '#000',

                          shadowOffset: {width: 0, height: 7.5},
                        }}
                        imageStyle={{
                          borderRadius: 5,

                          flexWrap: 'wrap',
                          // width: 100,
                          // height: 140,
                        }}></ImageBackground>
                      <Text
                        style={{
                          marginTop: 8,
                          color: 'black',

                          fontSize: 14,
                          textAlign: 'center',
                          // left: 5,
                          width: 90,
                          //...FONTS.h4,
                        }}>
                        {' '}
                        {item.title}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              }}
            />
          </ScrollView>
        </View>
        {/* )}  */}
      </View>
    );
  }
  function renderProfile() {
    return (
      <View style={{flex: 1, paddingBottom: 30}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 22,
            padding: 15,
            paddingTop: 1,
            paddingBottom: 50,
          }}>
          <Text style={{fontSize: 26, fontWeight: '700'}}>Profile</Text>
          <Icon
            name="cog"
            size={30}
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image
            style={{height: 125, width: 125, borderRadius: 70}}
            // source={require('../assets/Bat.png')}
            source={{uri: dp}}></Image>
          <Text
            style={{
              fontSize: 26,
              fontWeight: '500',
              paddingTop: 20,
              paddingBottom: 30,
              color: 'black',
            }}>
            Loki
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: 'white',
              borderColor: '#C0C0C0',
              borderWidth: 1,

              shadowOpacity: 0.4,
              shadowRadius: 3,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},

              alignItems: 'center',
              height: 60,
              width: 120,
            }}>
            <TouchableWithoutFeedback>
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    bottom: 4,
                    padding: 20,
                    color: 'deeppink',
                  }}>
                  Likes
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: 'white',
              borderColor: '#C0C0C0',
              shadowOpacity: 0.4,
              shadowRadius: 3,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              borderWidth: 1,
              height: 60,
            }}>
            <TouchableWithoutFeedback
            // onPress={() => navigation.navigate('RegDummy')}
            >
              <Text
                style={{
                  fontSize: 22,
                  padding: 20,
                  bottom: 4,
                  color: 'deeppink',
                }}>
                Comments
              </Text>
            </TouchableWithoutFeedback>
          </View>
          {/* <TouchableWithoutFeedback>
              <Text></Text>
          </TouchableWithoutFeedback> */}
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F2F4F4'}}>
      {/* <StatusBar style="auto" /> */}

      <FlatList
        data={emptyData}
        //renderItem={renderNullItem}
        ListEmptyComponent={ListFooterComponent}
      />
    </SafeAreaView>
  );
};
export default Profile;
