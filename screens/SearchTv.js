import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {dummyData, COLORS, SIZES, FONTS, icons, images} from '../constants';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import {getNewMovies, getPopularMovies} from '../../redux/actions';
import {ProgressBar, HeaderButton} from '../components';
const SearchTv = ({navigation}) => {
  //const {newMovies, popularMovies} = useSelector(state => state);
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(getPopularMovies());
  //     dispatch(getNewMovies());
  //   }, []);

  const [text, setText] = useState('');
  const [movies, setmovies] = useState([]);

  const setname = async () => {
    //console.log(text);

    const url = 'http://47.254.174.28/series/idbyTitle/' + text + '/';

    const response = await fetch(url);
    const responseJson = await response.json();
    //console.log(responseJson);
    if (responseJson) {
      //console.log(data);
      const upcoming = [];
      for (var index = 0; index < responseJson.results.length; index++) {
        //const dt = [];
        const MOVI_URL =
          'http://47.254.174.28/series/id/' +
          responseJson.results[index].imdb_id +
          '/';
        const mov = await fetch(MOVI_URL);
        const dt = await mov.json();
        await fetch(MOVI_URL)
          .then(responseNEW => responseNEW.json())
          .then(jsonNew => {
            upcoming.push(jsonNew.results);
          })
          .catch(error => console.error(error));
        setmovies(upcoming);
        //console.log(upcoming);
      }
    } else {
      console.log('unable to fetch');
    }

    //setmovies(responseJson.results);
  };
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
          style={{right: 10}}
          onPress={() => navigation.goBack()}
        />
        <Text style={{fontSize: 22}}>Back</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        marginTop: Platform.OS === 'ios' ? 50 : 20,
      }}>
      {renderBack()}
      <View style={styles.pane}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {/* <TouchableOpacity>
            <Icon
              name="arrow-back"
              size={35}
              style={{paddingRight: 10}}
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity> */}
          <TextInput
            placeholder="Search for TV Series here"
            placeholderTextColor={'#000000'}
            style={styles.searchBox}
            value={text}
            onChangeText={text => setText(text)}
          />

          <FontAwesome
            name={'search'}
            size={22}
            color={'black'}
            style={styles.icon}
            onPress={setname}
          />
        </View>
      </View>

      <FlatList
        data={movies}
        numColumns={3}
        keyExtractor={(item, index) => item.imdb_id}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TvDetails', item);
              }}>
              <Image source={{uri: item.banner}} style={styles.image0} />
              <Text
                style={{
                  marginTop: 8,
                  color: 'black',
                  fontSize: 14,
                  textAlign: 'center',

                  fontWeight: '600',
                  width: 120,
                  //...FONTS.h4,
                }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default SearchTv;
const styles = StyleSheet.create({
  pane: {
    flexDirection: 'row',
    padding: 10,
    //left: 30,
  },
  searchBox: {
    backgroundColor: '#C0C0C0',
    padding: 20,
    color: 'black',
    fontSize: 16,
    //fontWeight: 'bold',
    // textAlign: 'center',
    width: '93%',
    borderRadius: 15,
    //     borderTopRightRadius: 15,
    //     borderBottomRightRadius: 15,
  },
  icon: {
    // backgroundColor: '#C0C0C0',
    padding: 20,
    right: 60,
    borderRadius: 5,
    // borderTopLeftRadius: 15,
    // borderBottomLeftRadius: 15,
  },

  image: {
    height: 200,
    width: 120,
    borderRadius: 5,
    alignSelf: 'center',
    margin: 1,
  },

  top: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  list: {
    alignSelf: 'center',
  },
  image0: {
    height: 200,
    width: 125,
    borderRadius: 5,
    margin: 2,
  },
});

//http://47.254.174.28/movie/imdb_id/byTitle/ get by title
