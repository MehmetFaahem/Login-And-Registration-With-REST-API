import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';

import Navigation from './components/Navigation' 

export default function App() {
  return (
    <>
      <StatusBar backgroundColor='#161717'/>
      <Navigation/>
    </>
  );
}

