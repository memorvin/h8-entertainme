import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import store from './store'
import RootNavigation from './navigations/RootNavigation'
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from './graphql'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <NavigationContainer> 
            <RootNavigation />
          </NavigationContainer>
        </Provider>
      </ApolloProvider>
    );
  }

}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
