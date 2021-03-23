jest.useFakeTimers();
import React from 'react';
import renderer from 'react-test-renderer';
import Home from './Components/home';
import User from './Components/user_profile';
import Repo from './Components/repo';
import Following from './Components/following';
import Follower from './Components/follower';
const navigation = { navigate: jest.fn() };
import fetch from 'node-fetch';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Router from './Components/router';
import { GITHUB_ACCESS_TOKEN } from './config';
const navigation_two = {
	state: {
		params: { username: 'rongni' },
	},
};
function createClient() {
	const httpLink = createHttpLink({
		uri: 'https://api.github.com/graphql',
		fetch,
	});

	// apply widdleware to add access token to request
	let middlewareLink = new ApolloLink((operation, forward) => {
		operation.setContext({
			headers: {
				authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
			},
		});
		return forward(operation);
	});
	const link = middlewareLink.concat(httpLink);

	// Initialize Apollo Client with URL to our server
	return new ApolloClient({
		link: link,
		cache: new InMemoryCache(),
	});
}

it('renders correctly', () => {
	const component = renderer.create(
		<ApolloProvider client={createClient()}>
			<Repo navigation={navigation_two} />
		</ApolloProvider>
	);

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
it('renders correctly', () => {
	const component = renderer.create(
		<ApolloProvider client={createClient()}>
			<User searchQuery='rongni' navigation={navigation} />
		</ApolloProvider>
	);

	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

it('renders correctly', () => {
	const rendered = renderer.create(<Home navigation={navigation} />).toJSON();
	expect(rendered).toMatchSnapshot();
});
it('renders correctly', () => {
	const rendered = renderer.create(<Follower />).toJSON();
	expect(rendered).toMatchSnapshot();
});
it('renders correctly', () => {
	const rendered = renderer.create(<Following />).toJSON();
	expect(rendered).toMatchSnapshot();
});
describe('<Follower />', () => {
	it('has 1 child', () => {
		const tree = renderer.create(<Follower />).toJSON();
		expect(tree.children.length).toBe(1);
	});
});

describe('<Following />', () => {
	it('has 1 child', () => {
		const tree = renderer.create(<Following />).toJSON();
		expect(tree.children.length).toBe(1);
	});
});

describe('<Home />', () => {
	it('has 2 child', () => {
		const tree = renderer.create(<Home navigation={navigation} />).toJSON();
		expect(tree.children.length).toBe(2);
	});
});

describe('<User />', () => {
	it('has 1 child', () => {
		const tree = renderer
			.create(
				<ApolloProvider client={createClient()}>
					<User searchQuery='rongni' navigation={navigation} />
				</ApolloProvider>
			)
			.toJSON();
		expect(tree.children.length).toBe(1);
	});
});
describe('<Repo />', () => {
	it('has 1 child', () => {
		const tree = renderer
			.create(
				<ApolloProvider client={createClient()}>
					<Repo navigation={navigation_two} />
				</ApolloProvider>
			)
			.toJSON();
		expect(tree.children.length).toBe(1);
	});
});

describe('<Profile />', () => {
	it('loading', () => {
		const tree = renderer
			.create(
				<ApolloProvider client={createClient()}>
					<User searchQuery='rongni' navigation={navigation} />
				</ApolloProvider>
			)
			.toJSON();
		expect(tree.children).toStrictEqual(['fetching posts... ']);
	});
});

describe('<Repository />', () => {
	it('loading ', () => {
		const tree = renderer
			.create(
				<ApolloProvider client={createClient()}>
					<Repo navigation={navigation_two} />
				</ApolloProvider>
			)
			.toJSON();
		expect(tree.children).toStrictEqual(['fetching posts... ']);
	});
});
