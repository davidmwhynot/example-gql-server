import { Model, RelationMappings } from 'objection';
import { v4 } from 'uuid';

import BaseModel from './_BaseModel';
import Profile from './Profile';
import Subscription from './Subscription';

export default class User extends BaseModel {
	id: string;
	username: string;
	password: string;
	profile?: Profile;
	subscriptions?: Array<Subscription>;

	static get tableName(): string {
		return 'user';
	}

	static get idColumn(): string {
		return 'id';
	}

	static get virtualAttributes(): Array<string> {
		return ['__typename'];
	}

	static get __typename(): string {
		return 'User';
	}

	static get relationMappings(): RelationMappings {
		return {
			profile: {
				relation: Model.HasOneRelation,
				modelClass: Profile,
				join: {
					from: 'user.id',
					to: 'profile.userId'
				}
			},
			subscriptions: {
				relation: Model.HasManyRelation,
				modelClass: Subscription,
				join: {
					from: 'user.id',
					to: 'subscription.userId'
				}
			}
		};
	}

	static _resolver = {
		async profile(parent: User, args, context, info) {
			console.log('User.profile resolver');

			const profile = await parent.$relatedQuery('profile');

			return profile;
		},
		async subscriptions(parent: User, args, context, info) {
			console.log('User.subscriptions resolver');

			const subscriptions = await parent.$relatedQuery('subscriptions');
			return subscriptions;
		}
	};

	static async createUser(parent, args, context, info) {
		console.log('User.createUser resolver');

		const user = {
			id: v4(),
			...args.user,
			profile: {
				id: v4(),
				...args.user.profile
			}
		};

		const newUser = await User.query().insertGraphAndFetch(user);

		return newUser;
	}
}
