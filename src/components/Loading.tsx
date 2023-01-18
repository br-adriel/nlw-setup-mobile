import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#09090a',
      }}
    >
      <ActivityIndicator color='#7c3aed' />
    </View>
  );
};

export default Loading;
