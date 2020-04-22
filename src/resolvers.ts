import { GraphQLScalarType, Kind } from 'graphql';
import graphqlFields from 'graphql-fields';

import User from './models/User';
import Profile from './models/Profile';
import Subscription from './models/Subscription';

export default {
	User: User.resolver,
	Profile: Profile.resolver,
	Subscription: Subscription.resolver,
	Query: {
		async users(_, __, context, info) {
			console.log('users resolver');
			const fields = graphqlFields(info);

			const filteredQuery = User.filterQueryToRelationMappings(fields);

			const users = await User.query()
				.debug()
				.withGraphFetched(filteredQuery);

			return users;
		},
		async usersWithoutGraphFetched(_, __, context, info) {
			console.log('usersWithoutGraphFetched resolver');
			// const fields = graphqlFields(info);

			// const filteredQuery = User.filterQueryToRelationMappings(fields);

			const users = await User.query().debug();

			++context.x;

			return users;
		},
		async user(_, { id }, context, info) {
			console.log('user resolver');

			const fields = graphqlFields(info);

			const filteredQuery = User.filterQueryToRelationMappings(fields);

			const user = await User.query()
				.findById(id)
				.withGraphFetched(filteredQuery);

			return user;
		},
		async profile(_, { id }, context, info) {
			console.log('profile resolver');

			const fields = graphqlFields(info);

			const filteredQuery = Profile.filterQueryToRelationMappings(fields);

			const profile = await Profile.query()
				.findById(id)
				.withGraphFetched(filteredQuery);

			return profile;
		},
		async subscription(_, { id }, context, info) {
			console.log('subscription resolver');

			const fields = graphqlFields(info);

			const filteredQuery = Subscription.filterQueryToRelationMappings(
				fields
			);

			const subscription = await Subscription.query()
				.findById(id)
				.withGraphFetched(filteredQuery);

			return subscription;
		}
	},
	Mutation: {
		createUser: User.createUser,
		updateProfile: Profile.updateProfile,
		subscribe: Subscription.subscribe
	},
	Date: new GraphQLScalarType({
		name: 'Date',
		description: 'Date custom scalar type',
		parseValue(value) {
			const output = new Date(Number(value));

			return output; // value from the client
		},
		serialize(value) {
			// objection already serializes dates for us
			return value; // value sent to the client
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return new Date(parseInt(ast.value, 10)); // ast value is always in string format
			} else if (ast.kind === Kind.STRING) {
				return new Date(ast.value);
			}

			return null;
		}
	})
};
