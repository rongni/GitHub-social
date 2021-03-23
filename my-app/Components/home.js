/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-shadow */
/* eslint-disable no-const-assign */
/* eslint-disable react/prop-types */
import * as React from 'react';

import {
  TextInput,
  Button,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

export const SEARCH_QUERY = '';

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3497db',
    accent: '#f1c40f',
  },
};

const Home = ({ navigation: { navigate } }) => {
  const [text, setText] = React.useState('');

  SEARCH_QUERY = text;

  return (
    <PaperProvider theme={theme}>
      <TextInput
        label="Search Profile"
        value={text}
        onChangeText={(text) => setText(text)}
        theme={theme}
        textAlign="center"
        style={{ height: 60, justifyContent: 'center' }}
      />
      <Button onPress={() => navigate('User')}>Search</Button>
    </PaperProvider>
  );
};

export default Home;
