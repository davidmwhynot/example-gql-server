import { gql } from 'apollo-server-express';

export default gql`
	scalar Date

	enum SubscriptionLevel {
		TRIAL
		PRO
		BUSINESS
	}

	type User {
		id: ID!
		username: String!
		profile: Profile
		subscriptions: [Subscription]
	}

	type Profile {
		id: ID!
		firstName: String
		lastName: String
		age: Int
		user: User
	}

	type Subscription {
		id: ID!
		level: SubscriptionLevel!
		start: Date!
		end: Date!
		user: User
	}

	type Query {
		users: [User]!
		usersWithoutGraphFetched: [User]!

		user(id: ID!): User
		profile(id: ID!): Profile
		subscription(id: ID!): Subscription
	}

	input UserInput {
		username: String!
		password: String!
		profile: ProfileInput!
	}

	input ProfileInput {
		firstName: String
		lastName: String
		age: Int
		user: UserInput
	}

	input SubscriptionInput {
		userId: ID!
		token: String!
		level: SubscriptionLevel
		end: Date!
	}

	type Mutation {
		createUser(user: UserInput!): User
		updateProfile(id: ID!, profile: ProfileInput!): Profile
		subscribe(subscription: SubscriptionInput!): Subscription
	}
`;
