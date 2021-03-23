/* eslint-disable max-len */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import User from './user_profile';
import Repo from './repo';
import Home from './home';
import Following from './following';
import { SEARCH_QUERY } from './home';
import Follower from './follower';

const NavStack = createStackNavigator({
	Home: { screen: Home, navigationOptions: { title: 'Home' } },

	// eslint-disable-next-line react/jsx-filename-extension
	User: {
		screen: (props) => <User {...props} searchQuery={SEARCH_QUERY} />,
		navigationOptions: { title: 'Profile' },
	},
	// Repo: { screen: props => <Repo {...props} searchQuery={SEARCH_QUERY} />, navigationOptions: {title: "Repositories Details"}},
	Repo: { screen: Repo, navigationOptions: { title: 'Repositories Details' } },
	Follower: {
		screen: Follower,
		navigationOptions: { title: 'Follower Profiles' },
	},
	Following: {
		screen: Following,
		navigationOptions: { title: 'Following Profiles' },
	},
});

const Router = createAppContainer(NavStack);

export default Router;
