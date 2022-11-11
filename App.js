import React from 'react';
import Home from './screens/Home';
import MovDetail from './screens/MovDetail';
import Login from './screens/Login';
import Register from './screens/Register';
import reduxStore from './store/reduxStore';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import Tabs from './navigation/tabs';
import {Provider, useDispatch, useSelector} from 'react-redux';
import Tv from './screens/Tv';
import {HeaderTitle} from 'react-navigation-stack';
import Splash from './screens/Splash';
import Swap from './screens/Swap';
import TvDetails from './screens/TvDetails';
import SearchMovie from './screens/SearchMovie';
import SearchTv from './screens/SearchTv';
import NewListMovie from './screens/NewListMovie';
import NewListTv from './screens/NewListTv';
import PopListMovie from './screens/PopListMovie';
import PopListTv from './screens/PopListTv';
import Settings from './screens/Settings';
import Profile from './screens/Profile';
import RegDummy from './screens/RegDummy';
const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          HeaderTitle: null,
        }}
        initialRouteName={'Splash'}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerTransparent: true}}
        />
        <Stack.Screen
          name="Swap"
          component={Swap}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerShown: false,
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTransparent: false,
            headerTitle: '',
            headerShown: false,
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Tv"
          component={Tv}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerShown: false,
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            //headerTransparent: false,
            headerTitle: 'hi',
            headerShown: false,
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerShown: false,
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerShown: false,
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="RegDummy"
          component={RegDummy}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerShown: false,
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="MovDetail"
          component={MovDetail}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerShown: false,
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="TvDetails"
          component={TvDetails}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerShown: false,
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="SearchMovie"
          component={SearchMovie}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerShown: false,
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="SearchTv"
          component={SearchTv}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerShown: false,
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="NewListMovie"
          component={NewListMovie}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerShown: false,
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="NewListTv"
          component={NewListTv}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerShown: false,
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="PopListMovie"
          component={PopListMovie}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerShown: false,
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="PopListTv"
          component={PopListTv}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerShown: false,
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerShown: false,
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerShown: false,
            headerLeft: null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const App = () => {
  const {store, persistor} = reduxStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
