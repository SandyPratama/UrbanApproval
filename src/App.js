import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import Navigation from './components/navigation';
import Colors from './helpers/Colors';
import { store, persist } from './reducers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    persist(() => {
      setTimeout(() => {
        setReady(true);
      }, 1000);
    });
  });

  const loading = (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );

  const loaded = (
    <Provider store={store}>

      <Navigation />
    </Provider>
  );

  return ready ? loaded : loading;
}
