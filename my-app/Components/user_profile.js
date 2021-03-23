import React from 'react';
import {
	ScrollView,
	View,
	Image,
	Text,
	FlatList,
	SafeAreaView,
} from 'react-native';
import { graphql } from 'react-apollo';
import query from '../graphql_query';
// import { Avatar ,Card,ListItem, Toolbar } from 'react-native-material-ui';
import { Alert, StyleSheet } from 'react-native';
import {
	Avatar,
	Paragraph,
	Card,
	Button,
	IconButton,
	useTheme,
} from 'react-native-paper';

// interface PrivateRouteProps {
//   data: any;
//   navigation:any;
//   // any other props that come into the component
// }

const UserComponent = ({
	data: { loading, error, search },
	navigation: { navigate },
}) => {
	if (loading) return <Text>fetching posts... </Text>;
	if (error) return <Text>Error! ${error.message}</Text>;

	const userList = search.edges; // extracted after response loads
	// console.log(userList)
	// const classes = useStyles();
	const {
		colors: { background },
	} = useTheme();

	return (
		<FlatList
			data={userList}
			keyExtractor={(item) => item.node.login.toString()}
			renderItem={({ item }) => {
				return (
					<Card style={styles.card}>
						<Avatar.Image source={{ uri: item.node.avatarUrl }} />
						<Card.Title title={item.node.login} />
						<Card.Content>
							<Text>Name: {item.node.name}</Text>
							<Text>Bio: {item.node.bio}</Text>
							<Text>Email: {item.node.email}</Text>
							<Text>Website: {item.node.websiteUrl}</Text>
							<Text>Profile creation date: {item.node.createdAt}</Text>
							<Text onPress={() => navigate('Follower')}>
								followers: {item.node.followers.totalCount}
							</Text>
							<Text onPress={() => navigate('Following')}>
								following: {item.node.following.totalCount}
							</Text>
							<Text
								onPress={() => navigate('Repo', { username: item.node.login })}
							>
								Total Repos: {item.node.repositories.totalCount}
							</Text>
						</Card.Content>
					</Card>
				);
			}}
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
		margin: 30,
		borderRadius: 15,
	},
});

const User = graphql(query.fetchUsers, {
	options: ({ searchQuery }) => ({ variables: { login: searchQuery } }),
})(UserComponent);

export default User;
