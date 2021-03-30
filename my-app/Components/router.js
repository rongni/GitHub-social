/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import User from './search';
import Repo from './repo';
import Home, { SEARCH_QUERY } from './home';
import Following from './following';
import Profile from './profile';

// import Follower from './follower_components';
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
    screen: (props) => <Follower {...props} />,
    navigationOptions: { title: 'Follower Profiles' },
  },
  Profile: {
    screen: Profile, navigationOptions: { title: 'Profile' },
  },
  Following: {
    screen: (props) => <Following {...props} />,
    navigationOptions: { title: 'Following Profiles' },
  },
});

const Router = createAppContainer(NavStack);

export default Router;
