import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  FlatList,
  Platform,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-vector-icons/Icon';
import {useDispatch, useSelector} from 'react-redux';
import {ProgressBar, HeaderButton} from '../components';
import {COLORS, SIZES, FONTS, icons, dummyData} from '../constants';
import {newSeason} from '../constants/dummy';

import {addFav} from '../store/profile/FavAction';

const MovDetail = ({navigation, route}) => {
  // const [selectedMovie, setSelectedMovie] = useState(route.params);
  useEffect(() => {
    casting();
    return () => {
      setMovies([]);
    };
  }, []);

  const [banner] = useState(route.params.banner);
  const [title] = useState(route.params.title);
  const [rating] = useState(route.params.rating);
  const [description] = useState(route.params.description);
  const [content_rating] = useState(route.params.content_rating);
  const [genre] = useState(route.params.gen);
  const [imdb_id] = useState(route.params.imdb_id);
  const star = Math.ceil(rating / 2);
  const [movies, setMovies] = useState([]);
  const genArray = [];
  var Drama = 0;
  var Fantasy = 0;
  var Thriller = 0;
  var Adventure = 0;
  var Action = 0;
  var Sci = 0;
  var RomCom = 0;
  const Genre = () => {
    if (genre) {
      for (i = 0; i < genre.genre.length; i++) {
        genArray.push(genre.genre);
        console.log(genArray);
        if (genre.genre === 'Drama') {
          Drama = Drama + 1;
        }
        if (genre.genre === 'Fantasy') {
          Fantasy = Fantasy + 1;
        }
        if (genre.genre === 'Thriller') {
          Thriller = Thriller + 1;
        }
        if (genre.genre === 'Adventure') {
          Adventure = Adventure + 1;
        }
        if (genre.genre === 'Action') {
          Action = Action + 1;
        }
        if (genre.genre === 'Sci-fi') {
          Sci = Sci + 1;
        } else {
          RomCom = RomCom + 1;
        }
      }
    }
  };

  const casting = async () => {
    const cast = [];
    const MOVI_URL1 = 'http://47.254.174.28/movie/id/' + imdb_id + '/cast/';
    for (var i = 0; i < 10; i++) {
      const response = await fetch(MOVI_URL1);
      const responseJson = await response.json();
      // for(var i = 0; i < 6; i++){
      const {
        results: {roles},
      } = responseJson;
      cast.push(roles[i].actor.imdb_id);
    }
    //console.log(cast);

    if (cast) {
      const details = [];
      for (var j = 0; j < cast.length; j++) {
        const MOVI_URL = 'http://47.254.174.28/actor/id/' + cast[j] + '/';

        await fetch(MOVI_URL)
          .then(responseNEW => responseNEW.json())
          .then(jsonNew => {
            details.push(jsonNew.results);
          })
          .catch(error => console.error(error));
      }
      setMovies(details);
      //console.log(details);
    }
  };
  //   console.log(popCast);
  const dispatch = useDispatch();

  const addToFavs = item => {
    console.log('adding to fav');
    dispatch(
      addFav({
        title: route.params.title,
        banner: route.params.banner,
      }),
    );

    alert('added to fav list');
  };
  // const addToFav = () => {
  //   setTimeout(() => {
  //     dispatch(
  //       addFav({
  //         title: route.params.title,
  //         banner: route.params.banner,
  //       }),
  //     );
  //   }, 0);
  // };

  function renderHeaderBar() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: Platform.OS === 'ios' ? 40 : 20,
          paddingHorizontal: SIZES.padding,
        }}>
        <HeaderButton
          onPress={() => navigation.goBack()}
          icon={
            <Image
              source={icons.left_arrow}
              style={{
                width: 20,
                height: 20,
                right: 10,
                tintColor: COLORS.white,
              }}
            />
          }
        />
        <HeaderButton
          onPress={() => console.log('Share')}
          icon={
            <Image
              source={icons.upload}
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.white,
              }}
            />
          }
        />
      </View>
    );
  }

  function renderHeaderSection() {
    return (
      <View>
        <View>
          <ImageBackground
            source={{uri: banner}}
            resizeMode="cover"
            style={{
              width: '100%',
              height:
                SIZES.height < 700 ? SIZES.height * 0.5 : SIZES.height * 0.4,
            }}>
            <View style={{flex: 1}}>
              <Text style={{color: 'white'}}>hiii</Text>
              {renderHeaderBar()}
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                }}>
                <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                  {/* <Text
                  style={{
                    fontSize: 30,
                    marginTop: SIZES.base,
                    color: COLORS.white,
                    flexDirection: 'row',

                    fontWeight: 'bold',
                    //...FONTS.h1,
                  }}>
                  {title}
                </Text> */}
                </View>
                <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                  <View style={styles.categoryyContainer}>
                    {/* <Text
                style={{
                  color: COLORS.white,
                  fontSize:20,
                  fontWeight:'100',
                  //fontFamily:'',
                  right:115
                  //...FONTS.body4,
                }}
              >
                {selectedMovie?.details?.genre}
              </Text> */}
                    {/* <Text
                    style={{
                      marginLeft: 2,
                      color: COLORS.gold,
                      fontSize: 30,
                      //right: 125,
                      //...FONTS.h4,
                    }}>
                    {rating}
                    {} /
                  </Text> */}
                    {/* {[...Array(star)].map((elementInArray, index) => (
                    <Image
                      source={icons.star}
                      key={index}
                      resizeMode="contain"
                      style={{width: 20, height: 15}}
                    />
                  ))} */}
                  </View>
                </View>

                {/* <Text
                style={{
                  color: COLORS.white,
                  fontSize: 15,
                  fontWeight: '200',
                  //fontFamily:'',
                  paddingBottom: 30,
                  fontStyle: 'italic',
                  //...FONTS.body4,
                }}>
                {description}
              </Text> */}
              </View>
            </View>
            <ImageBackground
              source={{uri: banner}}
              resizeMode="cover"
              style={{
                width: 130,
                height: 200,
                top: 80,
                left: 17,
              }}
            />
          </ImageBackground>
        </View>

        <View
          style={{
            paddingHorizontal: 4,
            paddingLeft: -10,
            marginTop: 1,
            paddingTop: 10,
            left: -10,
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              marginTop: 1,
            }}>
            {/* <StatusBar hidden={true} /> */}
            <View
              style={{
                //flexDirection: 'row',
                paddingTop: 1,
                paddingHorizontal: 12,
                alignItems: 'center',
                left: 50,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: SIZES.base,
                  color: 'black',
                  flexDirection: 'row',

                  fontWeight: 'bold',
                  //...FONTS.h1,
                }}>
                {title}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: 1,
                  paddingHorizontal: 12,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    marginLeft: 2,
                    color: COLORS.gold,
                    fontSize: 30,
                    //right: 125,
                    //...FONTS.h4,
                  }}>
                  {rating}
                  {} /
                </Text>
                {[...Array(star)].map((elementInArray, index) => (
                  <Image
                    source={icons.star}
                    key={index}
                    resizeMode="contain"
                    style={{width: 20, height: 15}}
                  />
                ))}
              </View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 10,
                  fontWeight: '200',
                  //fontFamily:'',
                  paddingBottom: 8,
                  fontStyle: 'italic',
                  right: 30,

                  //...FONTS.body4,
                }}>
                {description}
              </Text>

              <Text
                style={{
                  //flex: 1,
                  color: 'black',
                  fontSize: 18,
                  fontWeight: '600',
                  right: 140,

                  //...FONTS.h2
                }}>
                Full Cast {'&'} Crew
              </Text>
              {/* <Image
           source={icons.right_arrow}
           style={{ width: 20, height: 20, tintColor: COLORS.primary }}
         /> */}
            </View>
            <View
              style={{
                paddingHorizontal: -10,
                alignItems: 'center',
              }}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  marginTop: SIZES.padding,
                }}
                data={movies}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <TouchableWithoutFeedback
                    //   onPress={() =>
                    //     navigation.navigate('MovieDetail', {
                    //       selectedMovie: item,
                    //     })
                    //   }
                    >
                      <View
                        style={{
                          marginLeft: index == 0 ? SIZES.padding : 10,
                          // marginRight:
                          //   index == dummyData.continueWatching.length - 1
                          //     ? SIZES.padding
                          //     : 2,
                        }}>
                        <Image
                          source={{uri: item.image_url}}
                          resizeMode="cover"
                          style={{
                            width: SIZES.width / 4.5,
                            height: SIZES.width / 3.5,
                            borderRadius: 10,
                            shadowOpacity: 0.5,
                            shadowRadius: 8,
                            //paddingHorizontal:1,
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 1},
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
                            width: 80,
                            //...FONTS.h4,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                left: -80,
                paddingBottom: 140,

                //left: -70,
              }}>
              <View style={styles.addWrapper}>
                <TouchableOpacity onPress={addToFavs}>
                  <Image
                    source={icons.like}
                    style={{
                      width: 25,
                      height: 25,

                      //   tintColor: COLORS.black,
                    }}
                  />
                </TouchableOpacity>
                {/* <View >
                       <Icon name="check" size={30} color='#1d56b3' />
                   </View>         */}
              </View>

              <View style={styles.addWrapper}>
                <TouchableOpacity>
                  <Image
                    source={icons.star}
                    style={{
                      width: 25,
                      height: 25,

                      tintColor: COLORS.gold,
                    }}
                  />
                </TouchableOpacity>
                {/* <View >
                       <Icon name="check" size={30} color='#1d56b3' />
                   </View>         */}
              </View>
              <View style={styles.addWrapper}>
                <TouchableOpacity>
                  <Image
                    source={icons.search}
                    style={{
                      width: 25,
                      height: 25,

                      tintColor: COLORS.black,
                    }}
                  />
                </TouchableOpacity>
                {/* <View >
                       <Icon name="check" size={30} color='#1d56b3' />
                   </View>         */}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  function renderMovieDetails() {
    //   <View
    //     style={{
    //       flex: 1,
    //       paddingHorizontal: 4,
    //       paddingLeft: -10,
    //       marginTop: 1,
    //       paddingTop: 10,
    //       left: -10,
    //       justifyContent: 'flex-start',
    //     }}>
    //     <View
    //       style={{
    //         marginTop: 1,
    //       }}>
    //       {/* <StatusBar hidden={true} /> */}
    //       <View
    //         style={{
    //           //flexDirection: 'row',
    //           paddingTop: 1,
    //           paddingHorizontal: 12,
    //           alignItems: 'center',
    //           left: 45,
    //         }}>
    //         <Text
    //           style={{
    //             fontSize: 20,
    //             marginTop: SIZES.base,
    //             color: 'black',
    //             flexDirection: 'row',
    //             fontWeight: 'bold',
    //             //...FONTS.h1,
    //           }}>
    //           {title}
    //         </Text>
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             paddingTop: 1,
    //             paddingHorizontal: 12,
    //             alignItems: 'center',
    //           }}>
    //           <Text
    //             style={{
    //               marginLeft: 2,
    //               color: COLORS.gold,
    //               fontSize: 30,
    //               //right: 125,
    //               //...FONTS.h4,
    //             }}>
    //             {rating}
    //             {} /
    //           </Text>
    //           {[...Array(star)].map((elementInArray, index) => (
    //             <Image
    //               source={icons.star}
    //               key={index}
    //               resizeMode="contain"
    //               style={{width: 20, height: 15}}
    //             />
    //           ))}
    //         </View>
    //         <Text
    //           style={{
    //             flex: 1,
    //             color: COLORS.black,
    //             fontSize: 18,
    //             fontWeight: '600',
    //             //...FONTS.h2
    //           }}>
    //           Full Cast {'&'} Crew
    //         </Text>
    //         {/* <Image
    //         source={icons.right_arrow}
    //         style={{ width: 20, height: 20, tintColor: COLORS.primary }}
    //       /> */}
    //       </View>
    //       <View
    //         style={{
    //           paddingHorizontal: -10,
    //           alignItems: 'center',
    //         }}>
    //         <FlatList
    //           horizontal
    //           showsHorizontalScrollIndicator={false}
    //           contentContainerStyle={{
    //             marginTop: SIZES.padding,
    //           }}
    //           data={popCast}
    //           keyExtractor={item => `${item.id}`}
    //           renderItem={({item, index}) => {
    //             return (
    //               <TouchableWithoutFeedback
    //                 onPress={() =>
    //                   navigation.navigate('MovieDetail', {
    //                     selectedMovie: item,
    //                   })
    //                 }>
    //                 <View
    //                   style={{
    //                     marginLeft: index == 0 ? SIZES.padding : 10,
    //                     // marginRight:
    //                     //   index == dummyData.continueWatching.length - 1
    //                     //     ? SIZES.padding
    //                     //     : 2,
    //                   }}>
    //                   <ImageBackground
    //                     source={item.image_url}
    //                     resizeMode="cover"
    //                     style={{
    //                       width: SIZES.width / 4.5,
    //                       height: SIZES.width / 3.5,
    //                       borderRadius: 10,
    //                       shadowOpacity: 0.5,
    //                       shadowRadius: 8,
    //                       //paddingHorizontal:1,
    //                       shadowColor: '#000',
    //                       shadowOffset: {width: 0, height: 1},
    //                     }}
    //                     imageStyle={{
    //                       borderRadius: 5,
    //                     }}
    //                   />
    //                   <Text
    //                     style={{
    //                       marginTop: SIZES.base,
    //                       color: COLORS.black,
    //                       //...FONTS.h4,
    //                     }}>
    //                     {item.name}
    //                   </Text>
    //                   {/* <ProgressBar
    //                 containerStyle={{
    //                   marginTop: SIZES.radius,
    //                 }}
    //                 barStyle={{
    //                   height: 3,
    //                 }}
    //                 barPercentage={item.overallProgress}
    //               /> */}
    //                 </View>
    //               </TouchableWithoutFeedback>
    //             );
    //           }}
    //         />
    //       </View>
    //       <View
    //         style={{
    //           flexDirection: 'row',
    //           justifyContent: 'space-around',
    //           left: -80,
    //           //left: -70,
    //         }}>
    //         <View style={styles.addWrapper}>
    //           <TouchableOpacity>
    //             <Image
    //               source={icons.search}
    //               style={{
    //                 width: 25,
    //                 height: 25,
    //                 tintColor: COLORS.black,
    //               }}
    //             />
    //           </TouchableOpacity>
    //           {/* <View >
    //                     <Icon name="check" size={30} color='#1d56b3' />
    //                 </View>         */}
    //         </View>
    //         <View style={styles.addWrapper}>
    //           <TouchableOpacity>
    //             <Image
    //               source={icons.star}
    //               style={{
    //                 width: 25,
    //                 height: 25,
    //                 tintColor: COLORS.gold,
    //               }}
    //             />
    //           </TouchableOpacity>
    //           {/* <View >
    //                     <Icon name="check" size={30} color='#1d56b3' />
    //                 </View>         */}
    //         </View>
    //         <View style={styles.addWrapper}>
    //           <TouchableOpacity>
    //             <Image
    //               source={icons.search}
    //               style={{
    //                 width: 25,
    //                 height: 25,
    //                 tintColor: COLORS.black,
    //               }}
    //             />
    //           </TouchableOpacity>
    //           {/* <View >
    //                     <Icon name="check" size={30} color='#1d56b3' />
    //                 </View>         */}
    //         </View>
    //       </View>
    //     </View>
    //   </View>
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingBottom: 100,
      }}
      style={{
        backgroundColor: COLORS.white,
      }}>
      {renderHeaderSection()}

      {/* {renderCategoryAndRatings()} */}

      {renderMovieDetails()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SIZES.base,
    paddingHorizontal: SIZES.base,
    paddingVertical: 3,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.gray,
  },
  categoryyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    marginLeft: 1,
    paddingHorizontal: 2,
    paddingVertical: 3,
    borderRadius: 8,
    left: 18,
    top: 30,
    // backgroundColor: COLORS.gray,
  },
  addWrapper: {
    width: 70,
    height: 70,
    bottom: 50,
    left: 90,
    top: 25,
    //paddingHorizontal: 10,
    backgroundColor: 'transparent',
    borderRadius: 60,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',

    // alignSelf: 'flex-end',
  },
});

export default MovDetail;
