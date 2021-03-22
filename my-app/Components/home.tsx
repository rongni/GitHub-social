import * as React from 'react';
import { View } from 'react-native';

import {
	TextInput,
	Button,
	DefaultTheme,
	Provider as PaperProvider,
	Avatar,
} from 'react-native-paper';

export let SEARCH_QUERY = '';

const theme = {
	...DefaultTheme,
	roundness: 2,
	colors: {
		...DefaultTheme.colors,
		primary: '#3498db',
		accent: '#f1c40f',
	},
};

const Home = ({ navigation: { navigate } }) => {
	const [text, setText] = React.useState('');

	SEARCH_QUERY = text;

	return (
		<PaperProvider theme={theme}>
			<TextInput
				label='Search Github'
				value={text}
				onChangeText={(text) => setText(text)}
				theme={theme}
				textAlign={'center'}
				style={{ height: 60, justifyContent: 'center' }}
			/>
			<Button onPress={() => navigate('User')}>Search</Button>
		</PaperProvider>
	);
};

export default Home;
