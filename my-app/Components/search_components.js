/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';

import { Avatar, Card } from 'react-native-paper';

const UserComponent = ({
  data: { loading, error, search },
  navigation: { navigate },
}) => {
  if (loading) return <Text>fetching posts... </Text>;
  if (error) {
    return (
      <Text>
        Error! $
        {error.message}
      </Text>
    );
  }

  const userList = search.edges; // extracted after response loads

  const styles = StyleSheet.create({
    container: {
	  flex: 1,
    },
    content: {
	  padding: 10,
    },
    card: {
	  margin: 30,
	  borderRadius: 15,
    },
  });

  return (
    <FlatList
      data={userList}
      keyExtractor={(item) => item.node.login.toString()}
      renderItem={({ item }) => (
        <Card style={styles.card} onPress={() => navigate('Profile', { username: item.node.login })}>
          <Avatar.Image source={{ uri: item.node.avatarUrl }} />
          <Card.Title title={item.node.login} />
          <Card.Content>
            <Text>
              Name:
              {item.node.name}
            </Text>
            <Text>
              Bio:
              {item.node.bio}
            </Text>
            <Text>
              Email:
              {item.node.email}
            </Text>
            <Text>
              Website:
              {item.node.websiteUrl}
            </Text>
          </Card.Content>
        </Card>
      )}
    />
  );
};

// const User = graphql(query.fetchUsers, {
//   options: ({ searchQuery }) => ({ variables: { login: searchQuery } }),
// })(UserComponent);

export default UserComponent;
