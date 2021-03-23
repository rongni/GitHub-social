/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import { Card } from 'react-native-paper';

const RepoComponent = ({ data: { loading, error, user } }) => {
	if (loading) return <Text>fetching posts... </Text>;
	if (error) {
		return <Text>Error!</Text>;
	}

	const responseData = user.repositories.nodes;
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
			data={responseData}
			keyExtractor={(item) => item.name.toString()}
			renderItem={({ item }) => (
				<Card style={styles.card}>
					<Card.Title title={item.name} />
					<Card.Content>
						<Text>
							Repository Name:
							{item.name}
						</Text>
						<Text>
							Owner Name:
							{item.owner.login}
						</Text>
						<Text>
							Description:
							{item.description}
						</Text>
					</Card.Content>
				</Card>
			)}
		/>
	);
};

export default RepoComponent;
