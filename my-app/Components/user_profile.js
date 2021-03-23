/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import { graphql } from 'react-apollo';
import { Avatar, Card } from 'react-native-paper';
import query from '../query_help';

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
  // console.log(userList)
  // const classes = useStyles();
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
        <Card style={styles.card}>
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
            <Text>
              Profile creation date:
              {item.node.createdAt}
            </Text>
            <Text onPress={() => navigate('Follower')}>
              followers:
              {' '}
              {item.node.followers.totalCount}
            </Text>
            <Text onPress={() => navigate('Following')}>
              following:
              {' '}
              {item.node.following.totalCount}
            </Text>
            <Text
              onPress={() => navigate('Repo', { username: item.node.login })}
            >
              Total Repos:
              {' '}
              {item.node.repositories.totalCount}
            </Text>
          </Card.Content>
        </Card>
      )}
    />
  );
};

const User = graphql(query.fetchUsers, {
  options: ({ searchQuery }) => ({ variables: { login: searchQuery } }),
})(UserComponent);

export default User;
