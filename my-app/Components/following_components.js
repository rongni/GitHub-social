/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-use-before-define */
import { withNavigation } from 'react-navigation';
import React from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

const FollowingComponent = ({ data: { loading, error, user }, navigation: { navigate } }) => {
  if (loading) return <Text>fetching posts... </Text>;
  if (error) {
    return (
      <Text>
        {error.message}
      </Text>
    );
  }

  const responseData = user.following.nodes;
  return (
    <FlatList
      data={responseData}
      keyExtractor={(item) => item.login.toString()}
      renderItem={({ item }) => (
        <Card style={styles.card} testID="following button" onPress={() => navigate('Profile', { username: item.login })}>
          <Card.Cover source={{ uri: item.avatarUrl }} />
          <Card.Title title={item.login} />
          <Card.Content>
            <Text>
              Name:
              {item.name}
            </Text>
            <Text>
              User Name:
              {item.login}
            </Text>
          </Card.Content>
        </Card>
      )}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 10,
  },
  card: {
    margin: 8,
    borderRadius: 15,
  },
});

export default withNavigation(FollowingComponent);
