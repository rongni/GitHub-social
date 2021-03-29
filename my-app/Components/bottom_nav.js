/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import User from './search_components';
import Repo from './repo';
import Home, { SEARCH_QUERY } from './home';
import Following from './following';

import Follower from './follower';

export const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Music', icon: 'queue-music' },
    { key: 'albums', title: 'Albums', icon: 'album' },
    { key: 'recents', title: 'Recents', icon: 'history' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: (props) => <User {...props} searchQuery={SEARCH_QUERY} />,
    albums: Repo,
    recents: Following,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
