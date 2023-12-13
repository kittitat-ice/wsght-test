import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Routes from './src/navigation/Routes';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import './src/i18n/i18n';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Routes />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
